<div align="center">

# 🦞 Awesome AI Pedia

**一个全面的 AI 知识库与博客平台**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success?style=flat-square)](https://qdleader.github.io/Awesome-AI-Pedia/)
[![VitePress](https://img.shields.io/badge/VitePress-1.3.4-646cff?style=flat-square)](https://vitepress.vuejs.org/)
[![Vue](https://img.shields.io/badge/Vue-3.5.11-4FC08D?style=flat-square)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

[� 在线访问](https://qdleader.github.io/Awesome-AI-Pedia/) | [🚀 快速开始](#-快速开始) | [�📚 文档](https://qdleader.github.io/Awesome-AI-Pedia/guide/)

</div>

---

## ✨ 项目简介

**Awesome AI Pedia** 是一个基于 VitePress 构建的现代化 AI 知识库与博客平台，旨在为开发者提供全面的 AI 工具使用指南、最佳实践和实战经验分享。

### 🎯 核心特性

- **📚 11个AI分类** - 涵盖 Claude Code、Cursor、MCP、Prompt、Rules、Skills 等全方位 AI 知识
- **🔄 自动目录映射** - 新增目录自动生成侧边栏，无需手动配置
- **🎨 现代化设计** - 基于 VitePress，支持暗黑模式、代码高亮、响应式布局
- **⚡ 快速部署** - 支持 GitHub Actions 自动部署到 GitHub Pages
- **💡 实战导向** - 从实际项目出发，提供可落地的解决方案
- **🔍 智能搜索** - 内置全文搜索，快速定位所需内容

---

## 📂 知识库分类

### 🤖 Claude Code
Claude AI 编码助手的完整使用指南
- 安装与配置
- 常用命令速查
- Browser 工具使用
- 自动提醒配置
- Settings.json 配置详解

### 🎯 Cursor
Cursor AI 编辑器的使用方法和最佳实践
- 常用功能详解
- 中文对话设置
- 区域限制解决方案
- 菜单栏自定义
- 版本管理

### 🔌 MCP (Model Context Protocol)
模型上下文协议相关资源与实践
- Figma MCP 集成
- 蓝湖 MCP 使用
- 飞书 MCP 配置
- Playwright MCP 自动化
- Context7 MCP
- Chrome DevTools MCP
- 天气预报 MCP 实战
- 网页发布 MCP

### 💬 Prompt
提示词工程和优化技巧
- React + UI 设计师 Prompt
- SVG 海报设计专家 Prompt
- 提示词优化网站推荐
- 提示词最佳实践

### 📋 Rules
各种 AI 编码规则和最佳实践
- Next.js + React + TypeScript Rules
- Vue.js + TypeScript Rules
- NuxtJS Rules
- Flutter Rules
- Expo React Native Rules
- Spring Boot Rules
- HTML & CSS Best Practices
- Claude + Cursor 高级提示词

### 🛠️ Skills
AI 技能集合和实用工具
- Skills 概念与使用
- MCP 与 Skills 的区别
- Skills 安装指南
- 自定义 Skills 开发

### 🚀 部署 AI
AI 应用部署相关知识
- 部署策略
- 环境配置
- 性能优化
- 监控与维护

### 💡 使用 AI 技巧
AI 工具使用技巧与经验分享
- 高效使用方法
- 常见问题解决
- 最佳实践总结

### 🔧 开发 AI 应用
AI 应用开发相关问题与解决方案
- 开发环境搭建
- 常见问题排查
- 性能优化建议

### ⭐ 好的 Rules
精选优质 Rules 集合
- 社区推荐 Rules
- 实战验证的最佳配置

### 💼 常用 Skills
常用 Skills 工具集
- 高频使用的 Skills
- 实用工具推荐

---

## 🚀 快速开始

### 方法一：使用启动脚本（推荐）

```bash
# 克隆项目
git clone https://github.com/qdleader/Awesome-AI-Pedia.git
cd Awesome-AI-Pedia

# 给脚本添加执行权限（仅需执行一次）
chmod +x start.sh

# 运行启动脚本
./start.sh
```

脚本会自动：
- ✅ 检查 Node.js 环境
- ✅ 安装项目依赖
- ✅ 启动开发服务器

### 方法二：手动启动

```bash
# 1. 克隆项目
git clone https://github.com/qdleader/Awesome-AI-Pedia.git
cd Awesome-AI-Pedia

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问 http://localhost:5173
```

---

## 📁 项目结构

```
Awesome-AI-Pedia/
├── claudeCode/              # Claude Code 相关文档
├── cursor/                  # Cursor 相关文档
├── mcp/                     # MCP 相关文档
├── prompt/                  # Prompt 相关文档
├── rules/                   # Rules 相关文档
├── skills/                  # Skills 相关文档
├── 部署ai/                  # AI 部署相关文档
├── 使用ai技巧/              # AI 使用技巧
├── 开发ai应用相关问题/       # AI 应用开发问题
├── 好的rules/              # 优秀的 Rules
├── 常用skills/             # 常用 Skills
├── docs/                   # VitePress 配置与文档
│   ├── .vitepress/         # VitePress 配置
│   │   ├── config.ts       # 主配置文件
│   │   ├── utils/          # 工具函数
│   │   │   └── sidebar.ts  # 自动侧边栏生成
│   │   └── theme/          # 主题配置
│   ├── ai/                 # AI 知识库（符号链接）
│   ├── blog/               # 博客文章
│   ├── guide/              # 使用指南
│   ├── public/             # 静态资源
│   └── index.md            # 首页
├── scripts/                # 脚本工具
├── .github/                # GitHub Actions 配置
│   └── workflows/
│       └── deploy.yml      # 自动部署配置
├── package.json            # 项目配置
├── start.sh                # 启动脚本
├── QUICKSTART.md           # 快速开始指南
├── DEPLOYMENT_SUCCESS.md   # 部署成功说明
└── README.md               # 项目说明（本文件）
```

---

## 🛠️ 技术栈

- **框架**: [VitePress 1.3.4](https://vitepress.vuejs.org/) - 基于 Vite 和 Vue 的静态站点生成器
- **前端**: [Vue 3.5.11](https://vuejs.org/) - 渐进式 JavaScript 框架
- **工具库**: [@vueuse/core 11.1.0](https://vueuse.org/) - Vue 组合式 API 工具集
- **构建工具**: [Vite](https://vitejs.dev/) - 下一代前端构建工具
- **部署**: [GitHub Pages](https://pages.github.com/) + [GitHub Actions](https://github.com/features/actions)
- **Node.js**: 22.22.0 (通过 Volta 管理)

---

## 📝 常用命令

```bash
# 开发
npm run dev      # 启动开发服务器（http://localhost:5173）

# 构建
npm run build    # 构建生产版本到 docs/.vitepress/dist

# 预览
npm run serve    # 预览构建结果
```

---

## 📖 如何添加内容

### 方式一：在现有分类中添加文档

```bash
# 在对应目录下创建 .md 文件
echo "# 新文章标题\n\n文章内容..." > claudeCode/新技巧.md

# 提交并推送
git add .
git commit -m "添加: Claude Code 新技巧"
git push
```

### 方式二：添加新的分类

```bash
# 1. 在项目根目录创建新文件夹
mkdir 新分类

# 2. 添加 index.md 和其他文档
echo "# 新分类\n\n分类介绍..." > 新分类/index.md

# 3. 在 docs/ai/ 下创建符号链接
cd docs/ai
ln -s ../../新分类 new-category

# 4. 提交并推送
git add .
git commit -m "添加: 新分类"
git push
```

### 文档格式规范

每个 Markdown 文件可以包含 Front Matter：

```markdown
---
title: 文章标题
description: 文章描述
date: 2026-01-27
tags: [AI, Claude, 教程]
---

# 文章标题

文章内容...
```

---

## 🚀 部署说明

### 自动部署（推荐）

项目已配置 GitHub Actions，推送到 `main` 分支后会自动部署到 GitHub Pages。

1. 推送代码到 GitHub
2. GitHub Actions 自动构建
3. 部署到 `gh-pages` 分支
4. 访问 https://qdleader.github.io/Awesome-AI-Pedia/

### 手动部署

```bash
# 构建
npm run build

# 部署到 GitHub Pages
# 确保 docs/.vitepress/config.ts 中的 base 配置正确
git add docs/.vitepress/dist -f
git commit -m "部署: 更新站点"
git subtree push --prefix docs/.vitepress/dist origin gh-pages
```

---

## 🎨 自定义配置

### 修改主题色

编辑 `docs/.vitepress/theme/custom.css`:

```css
:root {
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
  --vp-c-brand-3: #535bf2;
}
```

### 修改导航栏

编辑 `docs/.vitepress/config.ts` 中的 `nav` 配置：

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: 'AI知识库', link: '/ai/' },
  { text: '博客', link: '/blog/' },
  { text: '指南', link: '/guide/' },
  // 添加新的导航项
  { text: '新分类', link: '/new-category/' }
]
```

### 自定义侧边栏

侧边栏通过 `docs/.vitepress/utils/sidebar.ts` 自动生成，支持：
- 自动读取目录结构
- 自动提取文档标题
- 支持多级嵌套
- 支持折叠/展开

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. **Fork** 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m '添加: 某个很棒的功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 **Pull Request**

### Commit 规范

- `添加:` 新增功能或文档
- `修复:` 修复 Bug
- `更新:` 更新现有内容
- `优化:` 性能或代码优化
- `文档:` 文档相关更改
- `部署:` 部署相关更改

---

## 📄 许可证

本项目采用 [MIT](./LICENSE) 许可证。

---

## 🙏 致谢

- [VitePress](https://vitepress.vuejs.org/) - 强大的静态站点生成器
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [GitHub Pages](https://pages.github.com/) - 免费的静态网站托管服务
- 所有贡献者和使用者

---

## 📞 联系方式

- **在线访问**: https://qdleader.github.io/Awesome-AI-Pedia/
- **GitHub Issues**: https://github.com/qdleader/Awesome-AI-Pedia/issues
- **GitHub Discussions**: https://github.com/qdleader/Awesome-AI-Pedia/discussions

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

Made with ❤️ by [qdleader](https://github.com/qdleader)

</div>
