# Awesome AI Pedia 📚

[![Deploy to GitHub Pages](https://github.com/yourusername/awesome-ai-pedia/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/awesome-ai-pedia/actions/workflows/deploy.yml)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![VitePress](https://img.shields.io/badge/VitePress-1.3+-blue.svg)](https://vitepress.vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一个基于 **VitePress** 构建的现代化AI知识库与博客网站，支持自动目录映射、侧边栏折叠/展开、暗黑模式等功能。

## ✨ 特性

### 🚀 核心功能

- ⚡ **基于VitePress**: 基于Vue 3和Vite构建，极速的开发体验
- 📱 **响应式设计**: 完美适配桌面端、平板和移动设备
- 🌓 **暗黑模式**: 支持亮色/暗色主题切换
- 🎨 **自定义主题**: 支持自定义主题色和样式
- 📝 **Markdown增强**: 支持代码高亮、目录生成、数学公式
- 🔍 **全文搜索**: 内置本地搜索功能

### 📚 博客功能

- 📅 **文章元数据**: 自动显示发布时间、作者、阅读时间
- 🏷️ **标签系统**: 支持文章标签分类
- 📊 **阅读统计**: 支持阅读量统计
- 📂 **自动目录**: 自动根据文件结构生成导航
- 🔽 **侧边栏折叠**: 支持侧边栏折叠/展开功能

### 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **静态生成**: VitePress
- **样式**: CSS3 + CSS变量
- **图标**: SVG图标库

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/yourusername/awesome-ai-pedia.git
cd awesome-ai-pedia

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 查看网站。

### 构建部署

```bash
# 构建静态文件
npm run build

# 预览构建结果
npm run serve
```

## 📖 使用指南

### 添加新文章

1. 在 `docs/blog/` 下创建新目录
2. 添加 `index.md` 文件
3. 在文章顶部添加 Front Matter：

```markdown
---
title: 文章标题
date: 2024-01-26
author: 你的名字
readingTime: 5 分钟阅读
tags:
  - 标签1
  - 标签2
description: 文章描述
---

# 文章内容

在这里编写你的文章...
```

### 目录结构

```
awesome-ai-pedia/
├── docs/                      # 文档根目录
│   ├── .vitepress/            # VitePress配置
│   │   ├── config.ts          # 主配置文件
│   │   ├── theme.ts           # 主题配置
│   │   ├── custom.css          # 自定义样式
│   │   └── components/         # 自定义组件
│   │       └── BlogMeta.vue    # 博客元数据组件
│   ├── blog/                   # 博客文章
│   ├── guide/                  # 使用指南
│   ├── public/                 # 静态资源
│   └── index.md                # 首页
├── .github/workflows/         # GitHub Actions
│   └── deploy.yml              # 部署工作流
└── package.json                # 项目配置
```

### 自定义配置

#### 修改主题色

编辑 `docs/.vitepress/custom.css`：

```css
:root {
  --vp-c-brand: #646cff;        /* 主色调 */
  --vp-c-brand-light: #7c82ff;   /* 浅色变体 */
  --vp-c-brand-dark: #4f55d4;   /* 深色变体 */
}
```

#### 添加自定义组件

在 `docs/.vitepress/components/` 下创建 `.vue` 文件：

```vue
<template>
  <div class="custom-component">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.custom-component {
  /* 样式 */
}
</style>
```

## 🚀 部署

### GitHub Pages（推荐）

1. Fork 此仓库
2. 进入仓库 Settings > Pages
3. Source 选择 "GitHub Actions"
4. 推送代码到 `main` 分支

详细说明请查看：[部署指南](docs/guide/deployment/)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/awesome-ai-pedia)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/awesome-ai-pedia)

## 🎨 截图

### 首页

![Homepage](docs/.vitepress/public/images/homepage.png)

### 文章页面

![Article](docs/.vitepress/public/images/article.png)

### 暗黑模式

![Dark Mode](docs/.vitepress/public/images/dark-mode.png)

## 📋 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建静态文件
npm run serve        # 预览构建结果
npm run lint         # 代码检查
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 贡献流程

1. Fork 此仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 提交规范

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

## 📝 文章规范

### Front Matter

所有文章必须包含以下字段：

- `title`: 文章标题（必需）
- `date`: 发布日期，格式：YYYY-MM-DD（必需）
- `author`: 作者姓名（必需）
- `readingTime`: 预计阅读时间（必需）
- `description`: 文章描述（必需）
- `tags`: 标签数组（可选）

### 写作规范

1. **标题层级**: 合理使用 H1-H6，保持层级清晰
2. **代码块**: 标注语言，支持语法高亮
3. **图片**: 存放在 `docs/public/images/` 目录
4. **链接**: 内部链接使用相对路径，外部链接会自动添加图标
5. **长度**: 建议单篇文章长度在 1000-5000 字

## 🔧 自定义配置

### 修改站点信息

编辑 `docs/.vitepress/config.ts`：

```typescript
export default defineConfig({
  title: '你的博客名称',
  description: '博客描述',
  lang: 'zh-CN',
  // ...其他配置
})
```

### 添加导航栏项

```typescript
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '博客', link: '/blog/' },
    { text: '分类', items: [...] },
    { text: '关于', link: '/about' }
  ]
}
```

### 添加侧边栏

```typescript
sidebar: {
  '/blog/': [
    {
      text: '📚 博客文章',
      collapsed: false,
      items: [
        { text: '文章标题', link: '/blog/article/' }
      ]
    }
  ]
}
```

## 📊 SEO优化

- ✅ 自动生成sitemap
- ✅ Open Graph标签支持
- ✅ Twitter Card支持
- ✅ 结构化数据标记
- ✅ 语义化HTML标签
- ✅ 图片alt属性
- ✅ 内部链接优化

## 🛡️ 安全

- HTTPS强制重定向（生产环境）
- XSS防护
- 内容安全策略（CSP）
- 安全的依赖管理

## 📈 性能优化

- ⚡ 静态资源CDN加速
- 📦 代码分割和懒加载
- 🗜️ Gzip/Brotli压缩
- 💾 浏览器缓存策略
- 🖼️ 图片懒加载
- 🔄 Service Worker支持（PWA）

## 📚 学习资源

- [VitePress官方文档](https://vitepress.vuejs.org/)
- [Vue.js官方指南](https://cn.vuejs.org/)
- [Vite配置指南](https://vitejs.cn/)
- [Markdown语法指南](https://www.markdownguide.org/)

## 🐛 常见问题

### Q: 如何修改代码高亮主题？

A: VitePress使用Shiki进行代码高亮，可以在`config.ts`中配置主题。

### Q: 如何添加评论功能？

A: 可以集成Giscus、Valine等评论系统。

### Q: 如何实现全文搜索？

A: 使用Algolia DocSearch或内置的本地搜索。

### Q: 如何自定义字体？

A: 在`custom.css`中引入字体，并在配置中设置。

## 📄 许可证

[MIT License](LICENSE)


## ⭐ 支持

如果这个项目对你有帮助，请给它一个⭐️！

---

**Made with ❤️ by [Your Name](https://github.com/yourusername)**
