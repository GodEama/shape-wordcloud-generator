class WordCloudApp {
    constructor() {
        this.selectedImage = null;
        this.customDict = new Set(); // 自定义词典
        this.initializeElements();
        this.bindEvents();
        this.updateControlValues();
        this.loadCustomDict(); // 加载自定义词典
    }

    // 创建图片遮罩函数
    initializeElements() {
        // 获取DOM元素
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.previewContainer = document.getElementById('previewContainer');
        this.previewImage = document.getElementById('previewImage');
        this.changeImageBtn = document.getElementById('changeImage');
        this.textInput = document.getElementById('textInput');
        this.txtUploadBtn = document.getElementById('txtUploadBtn');
        this.txtFileInput = document.getElementById('txtFileInput');
        this.txtFileName = document.getElementById('txtFileName');
        this.maxWordsSlider = document.getElementById('maxWords');
        this.maxWordsValue = document.getElementById('maxWordsValue');
        this.fontSizeSlider = document.getElementById('fontSize');
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.colorScheme = document.getElementById('colorScheme');
        this.backgroundColor = document.getElementById('backgroundColor');
        this.backgroundColorValue = document.getElementById('backgroundColorValue');
        this.generateBtn = document.getElementById('generateBtn');
        this.resultSection = document.getElementById('resultSection');
        this.wordcloudCanvas = document.getElementById('wordcloudCanvas');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.regenerateBtn = document.getElementById('regenerateBtn');
        
        // 词频统计相关元素
        this.wordFrequencySection = document.getElementById('wordFrequencySection');
        this.frequencyList = document.getElementById('frequencyList');
        this.toggleFrequencyBtn = document.getElementById('toggleFrequencyBtn');
    }

    bindEvents() {
        // 文件上传相关事件
        this.uploadArea.addEventListener('click', () => this.imageInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        this.imageInput.addEventListener('change', this.handleImageSelect.bind(this));
        this.changeImageBtn.addEventListener('click', () => this.imageInput.click());

        // TXT文件上传相关事件
        this.txtUploadBtn.addEventListener('click', () => this.txtFileInput.click());
        this.txtFileInput.addEventListener('change', this.handleTxtFileSelect.bind(this));

        // 控制面板事件
        this.maxWordsSlider.addEventListener('input', this.updateControlValues.bind(this));
        this.fontSizeSlider.addEventListener('input', this.updateControlValues.bind(this));
        this.backgroundColor.addEventListener('input', this.updateControlValues.bind(this));
        this.textInput.addEventListener('input', this.checkGenerateButton.bind(this));

        // 按钮事件
        this.generateBtn.addEventListener('click', this.generateWordCloud.bind(this));
        this.downloadBtn.addEventListener('click', this.downloadWordCloud.bind(this));
        this.regenerateBtn.addEventListener('click', this.generateWordCloud.bind(this));
        this.toggleFrequencyBtn.addEventListener('click', this.toggleFrequencyDisplay.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processImage(files[0]);
        }
    }

    handleImageSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processImage(file);
        }
    }

    processImage(file) {
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImage.src = e.target.result;
            this.uploadArea.style.display = 'none';
            this.previewContainer.style.display = 'block';
            
            // 创建图片对象用于生成遮罩
            const img = new Image();
            img.onload = () => {
                this.selectedImage = img;
                this.checkGenerateButton();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    updateControlValues() {
        this.maxWordsValue.textContent = this.maxWordsSlider.value;
        this.fontSizeValue.textContent = this.fontSizeSlider.value;
        this.backgroundColorValue.textContent = this.backgroundColor.value;
    }

    handleTxtFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.processTxtFile(file);
        }
    }

    processTxtFile(file) {
        if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {
            alert('请选择TXT文本文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            this.textInput.value = content;
            this.txtFileName.textContent = file.name;
            this.txtFileName.style.display = 'inline';
            this.checkGenerateButton();
        };
        reader.onerror = () => {
            alert('文件读取失败，请重试！');
        };
        reader.readAsText(file, 'UTF-8');
    }

    checkGenerateButton() {
        const hasText = this.textInput.value.trim().length > 0;
        this.generateBtn.disabled = !hasText;
    }

    // 加载自定义词典
    async loadCustomDict() {
        try {
            // 尝试从文件加载
            const response = await fetch('./custom-dict.txt');
            if (response.ok) {
                const text = await response.text();
                const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
                words.forEach(word => this.customDict.add(word));
                console.log(`自定义词典从文件加载成功，共 ${this.customDict.size} 个词语`);
                console.log('词典内容预览:', Array.from(this.customDict).slice(0, 10));
                return;
            }
        } catch (error) {
            console.warn('从文件加载自定义词典失败，使用内置词典:', error);
        }
        
        // 如果文件加载失败，使用内置词典
        const builtInDict = [
            // 用户指定的词语
            '陈平安', '齐静春', '宁姚',
            
            // 技术相关词汇
            '人工智能', '机器学习', '深度学习', '自然语言处理', '计算机视觉',
            '数据科学', '大数据', '云计算', '区块链', '物联网',
            '虚拟现实', '增强现实', '神经网络', '算法优化', '软件工程',
            
            // 开发相关
            '前端开发', '后端开发', '全栈开发', '移动开发', '游戏开发',
            '数据库', '操作系统', '网络安全', '信息安全', '用户体验',
            '产品设计', '项目管理', '敏捷开发', 'DevOps', '微服务',
            
            // 技术栈
            'JavaScript', 'Python', 'Java', 'React', 'Vue', 'Angular',
            'Node.js', 'Express', 'Spring', 'Django', 'Flask',
            'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
            
            // 业务相关
            '容器化', '自动化测试', '持续集成', '持续部署', '版本控制',
            '代码审查', '性能优化', '系统架构', '分布式系统', '负载均衡',
            '缓存策略', '消息队列', '搜索引擎', '推荐系统', '内容管理',
            
            // 行业应用
            '电子商务', '在线教育', '远程办公', '视频会议', '即时通讯',
            '社交网络', '内容创作', '数字营销', '搜索引擎优化', '用户增长',
            '数据分析', '商业智能', '决策支持', '风险管理', '合规管理',
            
            // 管理相关
            '质量保证', '客户服务', '供应链管理', '库存管理', '财务管理',
            '人力资源', '企业文化', '团队协作', '沟通技巧', '领导力',
            '创新思维', '批判性思维', '问题解决', '时间管理', '压力管理',
            
            // 新兴技术
            '智能制造', '工业互联网', '数字化转型', '智慧城市', '智能交通',
            '智能家居', '智能医疗', '智能教育', '智能金融', '智能零售',
            '智能农业', '智能物流', '智能客服', '语音识别', '图像识别',
            '自动驾驶', '机器人技术', '量子计算', '边缘计算', '5G技术'
        ];
        
        builtInDict.forEach(word => this.customDict.add(word));
        console.log(`内置自定义词典加载成功，共 ${this.customDict.size} 个词语`);
        console.log('词典内容预览:', Array.from(this.customDict).slice(0, 10));
    }

    // 检查词语是否在自定义词典中
    isInCustomDict(text, startIndex, length) {
        const word = text.substr(startIndex, length);
        return this.customDict.has(word);
    }

    // 使用segmentit进行中文分词
    segmentText(text) {
        const words = [];
        
        // 首先使用自定义词典进行预处理
        const customWords = this.extractCustomWords(text);
        
        try {
            // 检查segmentit是否可用
            if (typeof Segmentit !== 'undefined') {
                console.log('使用segmentit进行分词');
                
                // 创建分词实例
                const { Segment, useDefault } = Segmentit;
                const segmentit = useDefault(new Segment());
                
                // 使用segmentit进行分词
                const segments = segmentit.doSegment(text);
                
                segments.forEach(item => {
                    // segmentit返回的是对象数组，需要提取word属性
                    const word = typeof item === 'object' ? item.w : item;
                    const cleanWord = word.trim();
                    
                    // 过滤条件更严格
                    if (cleanWord.length > 0) {
                        // 过滤纯标点符号、纯空格、纯特殊字符
                        if (!/^[\s\p{P}\p{S}]+$/u.test(cleanWord)) {
                            // 中文词语：长度大于等于2，过滤单字符
                            if (/[\u4e00-\u9fa5]/.test(cleanWord)) {
                                if (cleanWord.length >= 2) {
                                    words.push(cleanWord);
                                }
                            }
                            // 英文词语：长度大于等于2
                            else if (/^[a-zA-Z]+$/.test(cleanWord)) {
                                if (cleanWord.length >= 2) {
                                    words.push(cleanWord.toLowerCase());
                                }
                            }
                            // 数字：长度大于等于1
                            else if (/^\d+$/.test(cleanWord)) {
                                if (cleanWord.length >= 1) {
                                    words.push(cleanWord);
                                }
                            }
                            // 混合词语（中英文数字组合）
                            else if (/[\u4e00-\u9fa5a-zA-Z0-9]/.test(cleanWord)) {
                                if (cleanWord.length >= 2) {
                                    words.push(cleanWord);
                                }
                            }
                        }
                    }
                });
                
                // 合并自定义词典的结果
                customWords.forEach(word => words.push(word));
                
                console.log('segmentit分词结果:', words.slice(0, 20));
                console.log('自定义词典匹配:', customWords);
                return words;
            }
        } catch (error) {
            console.warn('segmentit分词失败，使用备用分词方法:', error);
        }
        
        // 备用分词方法（原来的逻辑）
        console.log('使用备用分词方法');
        
        // 移除标点符号，保留中文、英文、数字和空格
        const cleanText = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ');
        
        // 按空格分割
        const segments = cleanText.split(/\s+/).filter(word => word.length > 0);
        
        segments.forEach(segment => {
            // 处理英文单词
            if (/^[a-zA-Z]+$/.test(segment)) {
                if (segment.length >= 2) {
                    words.push(segment.toLowerCase());
                }
            }
            // 处理数字
            else if (/^\d+$/.test(segment)) {
                if (segment.length >= 1) {
                    words.push(segment);
                }
            }
            // 处理中文
            else if (/[\u4e00-\u9fa5]/.test(segment)) {
                // 双字词
                for (let i = 0; i < segment.length - 1; i++) {
                    const word = segment.substr(i, 2);
                    if (/^[\u4e00-\u9fa5]{2}$/.test(word)) {
                        words.push(word);
                    }
                }
                
                // 三字词
                for (let i = 0; i < segment.length - 2; i++) {
                    const word = segment.substr(i, 3);
                    if (/^[\u4e00-\u9fa5]{3}$/.test(word)) {
                        words.push(word);
                    }
                }
                
                // 四字词
                for (let i = 0; i < segment.length - 3; i++) {
                    const word = segment.substr(i, 4);
                    if (/^[\u4e00-\u9fa5]{4}$/.test(word)) {
                        words.push(word);
                    }
                }
            }
        });
        
        // 合并自定义词典的结果
        customWords.forEach(word => words.push(word));
        
        return words;
    }

    // 从文本中提取自定义词典中的词语
    extractCustomWords(text) {
        const foundWords = [];
        const usedPositions = new Set();
        
        // 按词语长度从长到短排序，优先匹配长词
        const sortedDict = Array.from(this.customDict).sort((a, b) => b.length - a.length);
        
        sortedDict.forEach(word => {
            let startIndex = 0;
            while (true) {
                const index = text.indexOf(word, startIndex);
                if (index === -1) break;
                
                // 检查这个位置是否已经被其他词语占用
                let canUse = true;
                for (let i = index; i < index + word.length; i++) {
                    if (usedPositions.has(i)) {
                        canUse = false;
                        break;
                    }
                }
                
                if (canUse) {
                    foundWords.push(word);
                    // 标记这些位置已被使用
                    for (let i = index; i < index + word.length; i++) {
                        usedPositions.add(i);
                    }
                }
                
                startIndex = index + 1;
            }
        });
        
        return foundWords;
    }



    // 停用词列表
    getStopWords() {
        return new Set([
            // 中文停用词
            '的', '了', '在', '是', '我', '有', '和', '就', '不', '人',
            '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去',
            '你', '会', '着', '没有', '看', '好', '自己', '这', '那', '来',
            '他', '她', '它', '我们', '你们', '他们', '什么', '怎么', '为什么',
            '时候', '地方', '可以', '应该', '能够', '需要', '希望', '想要',
            '但是', '因为', '所以', '如果', '虽然', '然后', '还是', '或者',
            '而且', '不过', '只是', '已经', '还有', '没有', '可能', '应该',
            '一些', '这些', '那些', '每个', '所有', '任何', '其他', '另外',
            '比如', '例如', '等等', '之后', '之前', '当时', '现在', '以后',
            '以前', '今天', '明天', '昨天', '这里', '那里', '哪里', '怎样',
            '多少', '几个', '第一', '第二', '最后', '开始', '结束', '中间',
            '左边', '右边', '上面', '下面', '里面', '外面', '前面', '后面',
            '旁边', '附近', '远处', '这样', '那样', '怎么样', '为了', '由于',
            '关于', '对于', '根据', '按照', '通过', '经过', '除了', '包括',
            '特别', '尤其', '主要', '基本', '完全', '非常', '十分', '相当',
            '比较', '更加', '最', '太', '挺', '还', '再', '又', '才', '就',
            '只', '都', '也', '还', '却', '但', '而', '或', '及', '与',
            '同', '跟', '给', '被', '把', '让', '使', '叫', '请', '要',
            '想', '愿', '肯', '敢', '能', '会', '可', '应', '该', '得',
            '需', '必', '须', '要', '想', '希', '望', '期', '待', '盼',
            
            // 英文停用词
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
            'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
            'before', 'after', 'above', 'below', 'between', 'among', 'this',
            'that', 'these', 'those', 'some', 'any', 'all', 'each', 'every',
            'a', 'an', 'as', 'are', 'was', 'were', 'been', 'be', 'have',
            'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'shall', 'is', 'am',
            'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her',
            'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
            'mine', 'yours', 'hers', 'ours', 'theirs', 'myself', 'yourself',
            'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves',
            'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why',
            'how', 'if', 'unless', 'until', 'while', 'although', 'though',
            'because', 'since', 'so', 'than', 'such', 'both', 'either',
            'neither', 'not', 'no', 'nor', 'only', 'own', 'same', 'so',
            'than', 'too', 'very', 'just', 'now', 'here', 'there', 'then',
            'once', 'again', 'also', 'still', 'yet', 'already', 'always',
            'never', 'sometimes', 'often', 'usually', 'rarely', 'seldom',
            
            // 单字符和数字（可选）
            '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ]);
    }

    // 词频统计（带停用词过滤）
    countWords(words) {
        const stopWords = this.getStopWords();
        const wordCount = {};
        let filteredCount = 0;
        
        words.forEach(word => {
            if (word.length > 0) {
                // 检查是否为停用词
                if (!stopWords.has(word.toLowerCase()) && !stopWords.has(word)) {
                    // 过滤纯标点符号和特殊字符
                    if (!/^[^\u4e00-\u9fa5a-zA-Z0-9]+$/.test(word)) {
                        wordCount[word] = (wordCount[word] || 0) + 1;
                    } else {
                        filteredCount++;
                    }
                } else {
                    filteredCount++;
                }
            }
        });
        
        console.log('原始词语数量:', words.length);
        console.log('过滤停用词和标点符号:', filteredCount, '个');
        console.log('有效词语统计:', Object.keys(wordCount).length, '个不同词语');
        
        // 转换为数组并排序
        let sortedWords = Object.entries(wordCount)
            .map(([word, count]) => [word, count])
            .sort((a, b) => b[1] - a[1]);
        
        // 保存完整的词频数据供显示使用
        this.fullWordFrequency = sortedWords;
        
        // 显示前20个高词频词语
        console.log('\n=== 前20个高词频词语 ===');
        const top20 = sortedWords.slice(0, 20);
        top20.forEach((item, index) => {
            console.log(`${index + 1}. "${item[0]}" - 出现 ${item[1]} 次`);
        });
        console.log('========================\n');
        
        // 严格按照设置的最大词数限制
        const maxWords = parseInt(this.maxWordsSlider.value);
        sortedWords = sortedWords.slice(0, maxWords);
        
        console.log(`最终生成了 ${sortedWords.length} 个词语（设置最大值：${maxWords}），前10个:`, sortedWords.slice(0, 10));
        return sortedWords;
    }

    // 生成填充词语
    generateFillWords(count) {
        const commonWords = [
            '的', '了', '在', '是', '我', '有', '和', '就', '不', '人',
            '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去',
            '你', '会', '着', '没有', '看', '好', '自己', '这', '那', '来',
            '他', '她', '它', '我们', '你们', '他们', '什么', '怎么', '为什么',
            '时候', '地方', '可以', '应该', '能够', '需要', '希望', '想要',
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
            'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
            'before', 'after', 'above', 'below', 'between', 'among', 'this',
            'that', 'these', 'those', 'some', 'any', 'all', 'each', 'every'
        ];
        
        const fillWords = [];
        for (let i = 0; i < count && i < commonWords.length; i++) {
            fillWords.push([commonWords[i], Math.floor(Math.random() * 5) + 1]);
        }
        
        return fillWords;
    }

    // 获取颜色方案
    getColorScheme() {
        const scheme = this.colorScheme.value;
        
        switch (scheme) {
            case 'blue':
                return () => `hsl(${200 + Math.random() * 60}, 70%, ${30 + Math.random() * 40}%)`;
            case 'red':
                return () => `hsl(${350 + Math.random() * 20}, 70%, ${30 + Math.random() * 40}%)`;
            case 'green':
                return () => `hsl(${100 + Math.random() * 60}, 70%, ${30 + Math.random() * 40}%)`;
            case 'purple':
                return () => `hsl(${260 + Math.random() * 60}, 70%, ${30 + Math.random() * 40}%)`;
            case 'orange':
                return () => `hsl(${20 + Math.random() * 40}, 70%, ${30 + Math.random() * 40}%)`;
            default: // random
                return () => `hsl(${Math.random() * 360}, 70%, ${30 + Math.random() * 40}%)`;
        }
    }

    // 生成图片遮罩
    generateImageMask(image, width, height) {
        // 创建临时canvas来处理图片
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        
        // 绘制图片到临时canvas
        tempCtx.fillStyle = '#ffffff';
        tempCtx.fillRect(0, 0, width, height);
        
        // 计算图片缩放比例，保持宽高比
        const scale = Math.min(width / image.width, height / image.height);
        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;
        const offsetX = (width - scaledWidth) / 2;
        const offsetY = (height - scaledHeight) / 2;
        
        tempCtx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
        
        // 获取图片数据
        const imageData = tempCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // 创建遮罩数组
        const mask = [];
        for (let y = 0; y < height; y++) {
            mask[y] = [];
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const alpha = data[index + 3];
                
                // 判断是否为透明或接近白色的像素
                const isTransparent = alpha < 128;
                const isWhite = r > 240 && g > 240 && b > 240;
                
                // 如果是透明或白色，则不允许放置词语（0），否则允许（1）
                mask[y][x] = (isTransparent || isWhite) ? 0 : 1;
            }
        }
        
        console.log('生成图片遮罩，尺寸:', width, 'x', height);
        return mask;
    }

    // 检查位置是否在遮罩范围内
    checkMaskPosition(x, y, width, height, mask) {
        if (!mask) return true; // 如果没有遮罩，允许所有位置
        
        const maskHeight = mask.length;
        const maskWidth = mask[0] ? mask[0].length : 0;
        
        // 检查词语的四个角是否都在允许的区域内
        const corners = [
            [x, y],
            [x + width, y],
            [x, y + height],
            [x + width, y + height]
        ];
        
        for (const [px, py] of corners) {
            const maskX = Math.floor(px);
            const maskY = Math.floor(py);
            
            if (maskX < 0 || maskX >= maskWidth || maskY < 0 || maskY >= maskHeight) {
                return false; // 超出边界
            }
            
            if (mask[maskY][maskX] === 0) {
                return false; // 在禁止区域
            }
        }
        
        return true;
    }

    // 将十六进制颜色转换为RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 }; // 默认白色
    }

    // 替换背景颜色
    replaceBackgroundColor(canvas, backgroundColor) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const bgColor = this.hexToRgb(backgroundColor);
        
        // 遍历所有像素，将非文字区域的像素替换为用户选择的背景颜色
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const alpha = data[i + 3];
            
            // 检查是否为文字像素
            // 排除黑色背景和白色背景，保留彩色文字
            const isBlackOrNearBlack = (r < 20 && g < 20 && b < 20);
            const isWhiteOrNearWhite = (r > 240 && g > 240 && b > 240);
            const isTextPixel = !isBlackOrNearBlack && !isWhiteOrNearWhite && alpha > 200;
            
            // 如果不是文字像素，则替换为背景颜色
            if (!isTextPixel) {
                data[i] = bgColor.r;       // R
                data[i + 1] = bgColor.g;   // G
                data[i + 2] = bgColor.b;   // B
                data[i + 3] = 255;         // A
            }
        }
        
        // 将处理后的数据绘制回画布
        ctx.putImageData(imageData, 0, 0);
    }

    generateWordCloud() {
        const text = this.textInput.value.trim();
        if (!text) {
            alert('请输入文本内容！');
            return;
        }

        console.log('开始生成词云...');
        
        // 分词和词频统计
        const words = this.segmentText(text);
        const wordList = this.countWords(words);
        
        console.log('词汇列表前10个:', wordList.slice(0, 10));
        console.log('词汇列表格式检查:', wordList.slice(0, 3).map(item => `"${item[0]}" (频率: ${item[1]})`));
        
        // 验证数据格式：WordCloud库期望 [[word, frequency], ...] 格式
        if (wordList.length > 0 && (!Array.isArray(wordList[0]) || wordList[0].length !== 2)) {
            console.error('词汇列表格式错误，期望 [[word, frequency], ...] 格式');
            return;
        }
        
        // 获取canvas
        const canvas = document.getElementById('wordcloudCanvas');
        if (!canvas) {
            alert('Canvas元素未找到');
            return;
        }
        
        // 根据是否有图片设置画布尺寸
        if (this.selectedImage) {
            // 如果有图片，使用图片的宽高比
            const minWidth = 1000;  // 最小宽度要求
            const imageRatio = this.selectedImage.width / this.selectedImage.height;
            
            // 始终保持图片宽高比，以最小宽度为基准计算
            canvas.width = minWidth;
            canvas.height = minWidth / imageRatio;
        } else {
            // 没有图片时使用默认尺寸，确保宽度不小于1000
            canvas.width = 1000;
            canvas.height = 600;
        }
        
        // 获取配置
        const baseFontSize = parseInt(this.fontSizeSlider.value);
        const colorFunction = this.getColorScheme();
        const userBackgroundColor = this.backgroundColor.value;
        
        // 如果有图片遮罩，创建正确的遮罩
        if (this.selectedImage) {
            console.log('创建图片遮罩');
            const ctx = canvas.getContext('2d');
            
            // 创建临时canvas来处理图片遮罩
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            
            // 在临时canvas上绘制图片
            tempCtx.fillStyle = '#ffffff';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempCtx.drawImage(this.selectedImage, 0, 0, tempCanvas.width, tempCanvas.height);
            
            // 获取图片数据
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;
            
            // 在主canvas上先填充用户选择的背景颜色
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = userBackgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 创建遮罩：图片背景区域设为黑色（阻止文字），图片主体区域设为白色（允许文字）
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const alpha = data[i + 3];
                
                // 如果是透明像素或接近白色背景（图片外的区域）
                if (alpha < 50 || (r > 240 && g > 240 && b > 240)) {
                    // 设为黑色（阻止词语放置在背景区域）
                    data[i] = 0;       // R
                    data[i + 1] = 0;   // G
                    data[i + 2] = 0;   // B
                    data[i + 3] = 255; // A
                } else {
                    // 图片主体区域设为白色（词语会放置在这里）
                    data[i] = 255;     // R
                    data[i + 1] = 255; // G
                    data[i + 2] = 255; // B
                    data[i + 3] = 255; // A
                }
            }
            
            // 将处理后的遮罩绘制到主画布
            ctx.putImageData(imageData, 0, 0);
            
            console.log('图片遮罩创建完成');
        } else {
            // 没有图片时，直接填充用户选择的背景颜色
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = userBackgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // WordCloud配置
        const options = {
            list: wordList,
            gridSize: 4,
            weightFactor: function(size) {
                // size是词频，确保高频词有更大的字体
                // 使用对数缩放避免字体差异过大，同时保证明显的大小区别
                const minSize = baseFontSize * 0.3;
                const maxSize = baseFontSize * 2.5;
                const scaledSize = Math.log(size + 1) * baseFontSize * 0.8;
                return Math.max(minSize, Math.min(maxSize, scaledSize));
            },
            fontFamily: 'Times, serif',
            color: colorFunction,
            rotateRatio: 0.2,
            rotationSteps: 1,
            backgroundColor: '#ffffff',
            minSize: Math.max(baseFontSize * 0.3, 8),
            drawOutOfBound: false,
            shrinkToFit: true,
            ellipticity: 0.65,
            shuffle: false, // 不打乱顺序，保持按词频排序
            origin: [canvas.width / 2, canvas.height / 2],
            wait: 10,
            clearCanvas: false, // 不清除画布，保留遮罩
            drawMask: false,
            maskColor: '#000000'
        };
        
        console.log('WordCloud配置:', options);
        
        // 生成词云
        try {
            WordCloud(canvas, options);
            
            // 词云生成完成后，将黑色背景替换为用户选择的背景颜色
            setTimeout(() => {
                this.replaceBackgroundColor(canvas, userBackgroundColor);
                console.log('背景颜色替换完成');
                this.showResult();
            }, 100);
        } catch (error) {
            console.error('词云生成失败:', error);
            alert('词云生成失败，请检查输入内容');
        }
    }

    showLoading() {
        // 显示加载状态
        this.generateBtn.querySelector('.btn-text').style.display = 'none';
        this.generateBtn.querySelector('.btn-loading').style.display = 'inline-flex';
        this.generateBtn.disabled = true;
    }

    showResult() {
        // 显示结果
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
        this.hideLoading();
    }

    hideLoading() {
        // 恢复按钮状态
        this.generateBtn.querySelector('.btn-text').style.display = 'inline';
        this.generateBtn.querySelector('.btn-loading').style.display = 'none';
        this.generateBtn.disabled = false;
    }

    downloadWordCloud() {
        const canvas = document.getElementById('wordcloudCanvas');
        const link = document.createElement('a');
        link.download = 'wordcloud.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    // 切换词频统计显示
    toggleFrequencyDisplay() {
        if (this.wordFrequencySection.style.display === 'none' || !this.wordFrequencySection.style.display) {
            this.showFrequencyDisplay();
            this.toggleFrequencyBtn.textContent = '隐藏词频统计';
        } else {
            this.hideFrequencyDisplay();
            this.toggleFrequencyBtn.textContent = '显示词频统计';
        }
    }

    // 显示词频统计
    showFrequencyDisplay() {
        if (!this.fullWordFrequency || this.fullWordFrequency.length === 0) {
            alert('请先生成词云！');
            return;
        }

        this.wordFrequencySection.style.display = 'block';
        this.displayWordFrequency();
    }

    // 隐藏词频统计
    hideFrequencyDisplay() {
        this.wordFrequencySection.style.display = 'none';
    }

    // 显示词频统计数据
    displayWordFrequency() {
        const top20 = this.fullWordFrequency.slice(0, 20);
        
        this.frequencyList.innerHTML = '';
        
        top20.forEach((item, index) => {
            const [word, count] = item;
            
            const frequencyItem = document.createElement('div');
            frequencyItem.className = 'frequency-item';
            
            frequencyItem.innerHTML = `
                <span class="frequency-rank">${index + 1}</span>
                <span class="frequency-word">${word}</span>
                <span class="frequency-count">${count}次</span>
            `;
            
            this.frequencyList.appendChild(frequencyItem);
        });
        
        console.log('词频统计显示完成，共显示前20个高频词语');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new WordCloudApp();
});