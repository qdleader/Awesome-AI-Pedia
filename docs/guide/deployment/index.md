---
title: 部署指南
description: 学习如何将VitePress博客部署到各种平台
---

# 部署指南

本文档详细说明如何将Awesome AI Pedia博客部署到各种平台，包括GitHub Pages、Vercel、Netlify等。

## 本地构建

在部署之前，先在本地测试构建：

```bash
# 安装依赖
npm install

# 构建静态文件
npm run build

# 预览构建结果
npm run serve
```

构建完成后，`dist`目录包含所有静态文件。

## 部署到GitHub Pages

GitHub Pages是最简单的部署方式，完全免费。

### 方式一：GitHub Actions（推荐）

#### 1. 创建工作流文件

创建`.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run build
        env:
          # 如果使用Algolia搜索
          VITE_ALGOLIA_APP_ID: ${{ secrets.VITE_ALGOLIA_APP_ID }}
          VITE_ALGOLIA_API_KEY: ${{ secrets.VITE_ALGOLIA_API_KEY }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 2. 配置仓库

1. 进入GitHub仓库的**Settings** > **Pages**
2. Source选择**GitHub Actions**
3. 保存设置

#### 3. 提交代码

```bash
git add .
git commit -m "feat: 添加GitHub Actions部署配置"
git push origin main
```

#### 4. 查看部署

进入**Actions**页面查看部署进度：
`https://github.com/username/repo/actions`

部署完成后，访问：
`https://username.github.io/repo-name/`

### 方式二：手动部署

```bash
# 构建项目
npm run build

# 安装gh-pages
npm install -g gh-pages

# 部署到GitHub Pages
gh-pages -d dist
```

## 部署到Vercel

Vercel提供免费的静态网站托管服务。

### 1. 安装Vercel CLI

```bash
npm install -g vercel
```

### 2. 部署

```bash
vercel
```

按提示操作：
- 设置并部署：Y
- 链接到现有项目：N
- 项目名称：输入项目名
- 目录：`docs`（因为VitePress配置在docs目录）

### 3. 配置

创建`vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### 4. 自动部署

连接GitHub仓库后，每次推送代码会自动部署。

## 部署到Netlify

Netlify是另一个优秀的静态网站托管平台。

### 1. 安装Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. 部署

```bash
netlify deploy --prod
```

按提示操作。

### 2. 配置文件

创建`netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 部署到Cloudflare Pages

Cloudflare提供全球CDN加速。

### 1. 安装Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录Cloudflare

```bash
wrangler login
```

### 3. 创建项目

```bash
wrangler pages project create awesome-ai-pedia
```

### 4. 部署

```bash
npm run build
wrangler pages deploy dist
```

## 部署到云服务器

如果你有自己的云服务器（如阿里云、腾讯云等），可以通过以下方式部署。

### 1. 构建项目

```bash
npm run build
```

### 2. 上传文件

将`dist`目录上传到服务器：

```bash
# 使用rsync（推荐）
rsync -avz --delete dist/ user@server:/var/www/html/

# 或使用scp
scp -r dist/* user@server:/var/www/html/
```

### 3. 配置Nginx

创建Nginx配置文件：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # 支持SPA路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 开启gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### 4. 重启Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 自定义域名配置

### GitHub Pages

1. 在`public`目录创建`CNAME`文件：
```bash
echo "your-domain.com" > public/CNAME
```

2. 在域名服务商处添加CNAME记录：
```
类型: CNAME
名称: www（或@）
值: username.github.io
```

### Vercel

1. 在Vercel控制台进入项目设置
2. 点击**Domains**
3. 添加自定义域名
4. 按提示配置DNS记录

### Netlify

1. 在Netlify控制台进入站点设置
2. 点击**Domain management**
3. 添加自定义域名

### Cloudflare Pages

1. 在Cloudflare控制台进入项目
2. 点击**Custom domains**
3. 添加域名并配置DNS记录

## HTTPS配置

大多数平台（Vercel、Netlify、Cloudflare Pages）都自动提供HTTPS。

如果你使用自己的服务器，可以使用Let's Encrypt获取免费SSL证书：

```bash
# 安装certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：
0 12 * * * /usr/bin/certbot renew --quiet
```

## 性能优化

### 1. 启用CDN

所有主要平台都提供CDN加速，确保已启用。

### 2. 资源压缩

在`vite.config.ts`中启用压缩：

```typescript
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Awesome AI Pedia',
        short_name: 'AI Pedia',
        theme_color: '#646cff'
      }
    })
  ]
})
```

### 3. 图片优化

- 使用WebP格式
- 压缩图片大小
- 使用懒加载

### 4. 缓存策略

配置适当的缓存头：

```
Cache-Control: public, max-age=31536000  # 静态资源
Cache-Control: public, max-age=3600      # HTML文件
```

## 监控与分析

### Google Analytics

在`config.ts`中添加：

```typescript
export default defineConfig({
  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_TRACKING_ID');
    `]
  ]
})
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

在`theme.ts`中导入：

```typescript
import { inject } from '@vercel/analytics'
inject()
```

## 常见问题

### Q: 部署后页面404？

A: 需要配置服务器支持SPA路由（Nginx的`try_files`配置）。

### Q: 资源加载失败？

A: 检查`base`配置是否正确。

```typescript
export default defineConfig({
  base: '/repo-name/',  // GitHub Pages
  // 或
  base: '/',  // 自定义域名
})
```

### Q: 部署失败？

A: 检查构建日志，常见问题：
- Node.js版本不兼容
- 依赖安装失败
- 构建脚本错误

### Q: 如何备份？

A: Git仓库本身就是备份，也可以定期导出静态文件。

## 推荐部署方案

- **个人博客**: GitHub Pages（免费、简单）
- **团队项目**: Vercel（免费、自动部署）
- **企业应用**: 云服务器（可控、灵活）
- **全球加速**: Cloudflare Pages（CDN强大）

## 参考资源

- [VitePress部署文档](https://vitepress.vuejs.org/guide/deploying)
- [GitHub Pages指南](https://pages.github.com/)
- [Vercel文档](https://vercel.com/docs)
- [Netlify文档](https://docs.netlify.com/)
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
