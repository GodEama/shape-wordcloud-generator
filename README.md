# Shape WordCloud Generator | 形状词云生成器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://godeama.github.io/shape-wordcloud-generator/)

<div align="center">

## 🎯 [**在线体验 Live Demo**](https://godeama.github.io/shape-wordcloud-generator/) 🎯

**[点击这里直接使用词云生成器 Click here to use the generator](https://godeama.github.io/shape-wordcloud-generator/)**

</div>

[English](#english) | [中文](#中文)

---

## English

A powerful, client-side word cloud generator that creates custom-shaped word clouds based on uploaded images. Built with pure vanilla JavaScript, this tool offers an intuitive interface for generating beautiful visualizations from text data.

---

## 中文

一个功能强大的客户端词云生成器，可以根据上传的图片创建自定义形状的词云。使用纯JavaScript构建，为文本数据可视化提供直观易用的界面。

## 🌟 Features | 功能特点

### Core Functionality
- **Custom Shape Generation**: Upload any image to use as a word cloud template
- **Intelligent Text Processing**: Advanced tokenization supporting both Chinese and English text
- **Multiple Input Methods**: Direct text input or TXT file upload
- **Real-time Preview**: Instant visualization updates as you adjust parameters
- **High-Quality Export**: Download generated word clouds as PNG images

### Advanced Capabilities
- **Multi-language Support**: Comprehensive Chinese and English text processing
- **Color Schemes**: Multiple predefined color palettes with custom background options
- **Parameter Control**: Fine-tune word count, font size, and layout density
- **Responsive Design**: Optimized for desktop and mobile devices
- **Background Removal**: Intelligent background color replacement for better text visibility

### Technical Features
- **Client-side Processing**: No server required, complete privacy protection
- **Canvas-based Rendering**: High-performance graphics using HTML5 Canvas API
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Word Frequency Analysis**: Built-in text analysis with stop word filtering

### 核心功能
- **自定义形状生成**: 上传任意图片作为词云模板
- **智能文本处理**: 支持中英文混合文本的高级分词技术
- **多种输入方式**: 支持直接文本输入或TXT文件上传
- **实时预览**: 参数调整时即时更新可视化效果
- **高质量导出**: 将生成的词云下载为PNG图片

### 高级功能
- **多语言支持**: 全面的中英文文本处理能力
- **配色方案**: 多种预设调色板和自定义背景选项
- **参数控制**: 精细调节词数、字体大小和布局密度
- **响应式设计**: 完美适配桌面端和移动设备
- **背景移除**: 智能背景色替换，提升文字可见度

### 技术特性
- **客户端处理**: 无需服务器，完全保护隐私
- **Canvas渲染**: 使用HTML5 Canvas API实现高性能图形处理
- **拖拽界面**: 直观的文件上传和视觉反馈
- **词频分析**: 内置文本分析和停用词过滤功能

## 🎯 Live Demo | 在线演示

### 🌐 Try it Online | 在线体验

**🌍 International Access | 国际访问**
- **📱 [GitHub Pages](https://godeama.github.io/shape-wordcloud-generator)** - Global access | 全球访问

**🇨🇳 China Access | 国内访问**
- **📱 [Gitee Pages](https://gxjios.gitee.io/shape-wordcloud-generator)** - Fast access in China | 国内高速访问

> **Note**: Choose the platform that works best for your location:
> - **GitHub Pages**: Better for international users
> - **Gitee Pages**: Optimized for users in China
> - **Local Access**: Download and open `index.html` in your browser

> **注意**: 请选择适合您所在地区的平台：
> - **GitHub Pages**: 适合国际用户
> - **Gitee Pages**: 为中国用户优化
> - **本地访问**: 下载并在浏览器中打开 `index.html`

### 🖼️ Demo Screenshots | 演示截图

The main interface (`index.html`) provides:

主界面 (`index.html`) 提供：

- **🎨 Intuitive Upload Interface** - Drag & drop image upload area
- **📝 Flexible Text Input** - Direct input or TXT file upload
- **⚙️ Real-time Controls** - Adjust parameters and see instant previews
- **🎨 Color Customization** - Multiple color schemes and custom backgrounds
- **📊 Word Frequency Analysis** - Built-in text analysis tools
- **💾 High-Quality Export** - Download as PNG images

- **🎨 直观的上传界面** - 拖拽式图片上传区域
- **📝 灵活的文本输入** - 直接输入或TXT文件上传
- **⚙️ 实时控制** - 调整参数并查看即时预览
- **🎨 颜色自定义** - 多种配色方案和自定义背景
- **📊 词频分析** - 内置文本分析工具
- **💾 高质量导出** - 下载为PNG图片

## 🚀 Quick Start | 快速开始

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional dependencies or installations required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GodEama/shape-wordcloud-generator.git
   cd shape-wordcloud-generator
   ```

2. **Launch the application**
   ```bash
   # Option 1: Direct browser access
   open index.html
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **Access the application**
   - **Direct**: Open `index.html` in your browser
   - **Server**: Navigate to `http://localhost:8000`
   - **Online**: Visit the GitHub Pages URL (if deployed)

### 系统要求
- 支持JavaScript的现代浏览器
- 无需额外依赖或安装

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/GodEama/shape-wordcloud-generator.git
   cd shape-wordcloud-generator
   ```

2. **启动应用**
   ```bash
   # 方式1: 直接浏览器访问
   open index.html
   
   # 方式2: 本地服务器（推荐）
   python -m http.server 8000
   # 然后访问: http://localhost:8000
   ```

3. **访问应用**
   - **直接访问**: 在浏览器中打开 `index.html`
   - **服务器访问**: 访问 `http://localhost:8000`
   - **在线访问**: 访问GitHub Pages网址（如已部署）

## 📖 Usage Guide | 使用指南

### Basic Workflow

1. **Image Upload**
   - Click the upload area or drag & drop an image file
   - Supported formats: PNG, JPG, JPEG
   - Recommended: High-contrast images with clear silhouettes

2. **Text Input**
   - **Manual Input**: Type or paste text directly into the text area
   - **File Upload**: Click "Upload TXT File" to import text from a file
   - Supports UTF-8 encoding for international characters

3. **Parameter Adjustment**
   - **Max Words**: Control the number of words displayed (10-200)
   - **Font Size**: Adjust text size for optimal visibility (10-100px)
   - **Color Scheme**: Choose from predefined palettes or custom colors
   - **Background Color**: Set custom background colors

4. **Generation & Export**
   - Click "Generate Word Cloud" to create visualization
   - Use "Regenerate" for different layouts with same parameters
   - Download results as high-resolution PNG images

### Advanced Features

#### Custom Dictionary
The application includes a comprehensive custom dictionary (`custom-dict.txt`) for improved Chinese text segmentation. You can modify this file to add domain-specific terms.

#### Word Frequency Analysis
- Toggle word frequency display to analyze text composition
- View detailed statistics of word occurrences
- Identify key terms and themes in your content

#### Background Processing
- Automatic background color detection and removal
- Smart contrast adjustment for better text visibility
- Preserves colored text while removing uniform backgrounds

### 基本使用流程

1. **图片上传**
   - 点击上传区域或拖拽图片文件
   - 支持格式: PNG、JPG、JPEG
   - 建议: 使用高对比度、轮廓清晰的图片

2. **文本输入**
   - **手动输入**: 直接在文本框中输入或粘贴文本
   - **文件上传**: 点击"上传TXT文件"导入文本文件
   - 支持UTF-8编码，完美处理中文字符

3. **参数调整**
   - **最大词数**: 控制显示的词汇数量 (10-200)
   - **字体大小**: 调整文字大小以获得最佳视觉效果 (10-100px)
   - **配色方案**: 从预设调色板中选择或自定义颜色
   - **背景颜色**: 设置自定义背景颜色

4. **生成与导出**
   - 点击"生成词云"创建可视化效果
   - 使用"重新生成"在相同参数下获得不同布局
   - 将结果下载为高分辨率PNG图片

### 高级功能

#### 自定义词典
应用包含一个全面的自定义词典 (`custom-dict.txt`)，用于改进中文文本分词。你可以修改此文件来添加特定领域的术语。

#### 词频分析
- 切换词频显示来分析文本组成
- 查看词汇出现次数的详细统计
- 识别内容中的关键词和主题

#### 背景处理
- 自动背景色检测和移除
- 智能对比度调整，提升文字可见度
- 保留彩色文字，同时移除单一背景

## 🏗️ Project Structure | 项目结构

```
shape-wordcloud-generator/
├── index.html              # 🎯 Main Demo Page | 主演示页面 (点击体验!)
├── css/
│   └── style.css          # Styling and responsive design | 样式和响应式设计
├── js/
│   ├── app.js             # Core application logic | 核心应用逻辑
│   └── wordcloud2.js      # WordCloud2 library | WordCloud2库
├── custom-dict.txt        # Custom dictionary for text processing | 文本处理自定义词典
├── .gitignore             # Git ignore rules | Git忽略规则
├── LICENSE                # MIT License | MIT许可证
└── README.md              # Project documentation | 项目文档
```

### 📁 Key Files | 核心文件

- **`index.html`** 🎯 - **Main application interface** | **主应用界面**
  - Complete word cloud generator with intuitive UI | 完整的词云生成器，界面直观
  - Drag & drop image upload | 拖拽式图片上传
  - Real-time parameter controls | 实时参数控制
  - **[Click to open](https://godeama.github.io/shape-wordcloud-generator/)** | **[点击打开](https://godeama.github.io/shape-wordcloud-generator/)**

- **`css/style.css`** - Modern responsive styling | 现代响应式样式
- **`js/app.js`** - Core functionality and text processing | 核心功能和文本处理
- **`js/wordcloud2.js`** - WordCloud rendering engine | 词云渲染引擎
- **`custom-dict.txt`** - Chinese text segmentation dictionary | 中文分词词典

## 🛠️ Technical Architecture | 技术架构

### Frontend Stack | 前端技术栈
- **HTML5**: Semantic markup with modern web standards | 符合现代Web标准的语义化标记
- **CSS3**: Grid and Flexbox layouts with responsive design | Grid和Flexbox布局的响应式设计
- **Vanilla JavaScript**: ES6+ features for optimal performance | ES6+特性实现最佳性能
- **Canvas API**: Hardware-accelerated graphics rendering | 硬件加速图形渲染

### Key Libraries | 核心库
- **WordCloud2.js**: Core word cloud generation engine | 核心词云生成引擎
- **Custom Segmentation**: Proprietary Chinese text processing | 专有中文文本处理

### Browser Compatibility | 浏览器兼容性
- Chrome 60+ | Chrome 60+
- Firefox 55+ | Firefox 55+
- Safari 12+ | Safari 12+
- Edge 79+ | Edge 79+

## 🎨 Customization

### Adding Color Schemes
```javascript
// In app.js, extend the color schemes object
const colorSchemes = {
    'custom-theme': [
        '#FF6B6B', '#4ECDC4', '#45B7D1',
        '#96CEB4', '#FFEAA7', '#DDA0DD'
    ]
};
```

### Custom Stop Words
Modify the `getStopWords()` method in `app.js` to add language-specific stop words:

```javascript
getStopWords() {
    return new Set([
        // Add your custom stop words here
        'custom', 'words', 'to', 'filter'
    ]);
}
```

## 🚀 Deployment | 部署

### 📱 Entry Point | 入口文件

The main application is accessible through **`index.html`** - this is your entry point for the word cloud generator.

主应用通过 **`index.html`** 访问 - 这是词云生成器的入口文件。

### Static Hosting | 静态托管

This application is designed for static hosting and can be deployed to:

该应用专为静态托管设计，可以部署到以下平台：

- **GitHub Pages**: Enable in repository settings | 在仓库设置中启用
  - Your demo will be available at: `https://godeama.github.io/shape-wordcloud-generator/`
  - 演示地址将是: `https://godeama.github.io/shape-wordcloud-generator/`
- **Netlify**: Drag & drop deployment | 拖拽部署
- **Vercel**: Connect GitHub repository | 连接GitHub仓库
- **AWS S3**: Static website hosting | 静态网站托管
- **Any CDN**: Upload files to content delivery network | 上传文件到内容分发网络

### Configuration | 配置

No build process or server-side configuration required. Simply upload all files to your hosting provider.

无需构建过程或服务器端配置。只需将所有文件上传到您的托管服务提供商即可。

**Important**: Make sure `index.html` is in the root directory for proper access.

**重要**: 确保 `index.html` 在根目录中以便正确访问。

## 🤝 Contributing | 贡献

We welcome contributions to improve the Shape WordCloud Generator!

我们欢迎为形状词云生成器的改进做出贡献！

### Development Setup | 开发设置
1. Fork the repository | 分叉仓库
2. Create a feature branch: `git checkout -b feature-name` | 创建功能分支
3. Make your changes and test thoroughly | 进行更改并彻底测试
4. Commit with descriptive messages: `git commit -m "Add feature description"` | 提交并附上描述性信息
5. Push to your fork: `git push origin feature-name` | 推送到您的分叉
6. Submit a pull request | 提交拉取请求

### Contribution Guidelines | 贡献指南
- Follow existing code style and conventions | 遵循现有的代码风格和约定
- Add comments for complex logic | 为复杂逻辑添加注释
- Test across multiple browsers | 在多个浏览器中测试
- Update documentation for new features | 为新功能更新文档

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Shape WordCloud Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- [WordCloud2.js](https://github.com/timdream/wordcloud2.js) - Core word cloud generation library
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Graphics rendering
- Community contributors and testers

## 📞 Support | 支持

For questions, bug reports, or feature requests:

如有问题、错误报告或功能请求：

- **Issues**: [GitHub Issues](https://github.com/GodEama/shape-wordcloud-generator/issues) | 问题反馈
- **Discussions**: [GitHub Discussions](https://github.com/GodEama/shape-wordcloud-generator/discussions) | 讨论交流
- **Documentation**: [Wiki](https://github.com/GodEama/shape-wordcloud-generator/wiki) | 文档说明

---

**Made with ❤️ for the open source community | 为开源社区用心制作 ❤️**

<!-- GitHub Pages deployment trigger -->