---
title: 目录结构说明
description: 详细了解博客项目的目录结构和各个文件的作用
---

# 目录结构说明

本文档详细说明了Awesome AI Pedia博客项目的目录结构，帮助你更好地理解和管理项目。

## 项目根目录

```
awesome-ai-pedia/
├── docs/                      # 文档根目录
├── public/                    # 静态资源目录
├── package.json              # 项目依赖和脚本
├── README.md                  # 项目说明文档
└── .gitignore                 # Git忽略文件
```

## docs/ 目录

`docs/`目录是VitePress的核心目录，包含所有的页面内容和配置文件。

### docs/.vitepress/ 子目录

存放VitePress的配置文件：

```
.vitepress/
├── config.ts              # 主配置文件（必需）
├── theme.ts               # 自定义主题配置
├── custom.css             # 自定义样式
├── components/             # 自定义组件
│   └── BlogMeta.vue       # 博客元数据组件
└── cache/                 # 缓存目录（自动生成）
```

#### config.ts

主配置文件，定义：
- 站点元数据（标题、描述、语言）
- 导航栏配置
- 侧边栏配置
- 主题设置
- 构建选项

#### theme.ts

自定义主题配置：
- 扩展默认主题
- 注册全局组件
- 自定义布局

#### custom.css

自定义样式文件：
- 主题色配置
- 组件样式覆盖
- 响应式设计
- 动画效果

#### components/

存放Vue组件：
- `BlogMeta.vue`: 显示文章时间、作者、阅读量
- 可添加更多自定义组件

### docs/blog/ 目录

博客文章目录，支持多级分类：

```
blog/
├── ai-development/         # AI开发分类
│   └── index.md          # 分类索引页
├── ai-assistant/          # AI助手分类
│   └── index.md          # 分类索引页
└── vitepress-guide/       # VitePress指南
    └── index.md          # 分类索引页
```

**命名规则：**
- 目录名使用中划线分隔：`my-category`
- 必须包含`index.md`文件
- MD文件支持Front Matter元数据

### docs/guide/ 目录

使用指南目录：

```
guide/
├── getting-started/       # 快速开始
│   └── index.md
├── directory/             # 目录说明
│   └── index.md
└── deployment/            # 部署指南
    └── index.md
```

### docs/public/ 目录

静态资源目录，这些文件会直接复制到构建输出：

```
public/
├── images/               # 图片资源
│   ├── logo.png         # 网站logo
│   └── banner.jpg       # 首页banner
├── favicon.ico          # 网站图标
└── robots.txt           # 搜索引擎配置
```

### docs/index.md

网站首页文件，支持hero配置和功能卡片。

## public/ 目录

项目根级别的public目录，用于存放根级别的静态资源。

## 文件命名规范

### Markdown文件

- **首页**: `index.md`
- **普通页面**: 使用有意义的名称，如`about.md`
- **分类目录**: 使用中划线分隔，如`ai-development/`

### 图片文件

- **Logo**: `logo.png`
- **图标**: 使用`favicon.ico`
- **文章图片**: 存放在`public/images/`下，使用描述性名称

## Front Matter字段

每个Markdown文件顶部的YAML格式元数据：

```markdown
---
title: 页面标题                    # 页面标题（必需）
date: 2024-01-26                   # 日期（必需）
author: 作者姓名                   # 作者（必需）
readingTime: 5 分钟阅读            # 阅读时间（必需）
tags:                             # 标签数组
  - 标签1
  - 标签2
description: 页面描述               # SEO描述（必需）
image: /images/cover.jpg           # 封面图（可选）
---
```

## 自动生成内容

### 侧边栏

侧边栏内容可以在`config.ts`中静态定义，也可以通过代码自动生成：

```typescript
async function generateSidebar() {
  // 读取所有Markdown文件
  // 生成侧边栏结构
  return sidebar
}
```

### 导航栏

在`config.ts`的`themeConfig.nav`中配置：

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  {
    text: '分类',
    items: [
      { text: '开发技巧', link: '/blog/development/' }
    ]
  }
]
```

## 最佳实践

### 1. 文件组织

- 将相关主题的文章放在同一分类下
- 使用描述性的文件名和目录名
- 保持目录层级不超过3级

### 2. 图片管理

- 图片统一存放在`public/images/`下
- 使用相对路径引用：`/images/logo.png`
- 图片大小建议小于500KB

### 3. 内容结构

- 每篇文章包含完整的Front Matter
- 使用标题层级构建清晰的目录
- 适当使用代码块和示例

### 4. 链接管理

- 内部链接使用相对路径：`/blog/article/`
- 外部链接自动添加图标（已在主题中配置）
- 确保所有链接都有意义和描述性

## 常见问题

### Q: 如何添加新分类？

A: 在`docs/blog/`下创建新目录，添加`index.md`文件，然后在`config.ts`的侧边栏配置中添加条目。

### Q: 如何修改主题色？

A: 编辑`docs/.vitepress/custom.css`，修改CSS变量：

```css
:root {
  --vp-c-brand: #646cff;
}
```

### Q: 如何添加自定义页面？

A: 在`docs/`下创建新的Markdown文件，如`about.md`，然后在导航栏配置中添加链接。

### Q: 如何隐藏页面？

A: 在Front Matter中添加`sidebar: false`：

```markdown
---
sidebar: false
---
```

## 参考资源

- [VitePress目录结构文档](https://vitepress.vuejs.org/guide/directory-structure)
- [Vue.js组件系统](https://cn.vuejs.org/guide/components)
- [Vite构建配置](https://vitejs.cn/config/)
