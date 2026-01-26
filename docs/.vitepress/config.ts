import { defineConfig } from 'vitepress'
import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

// 获取目录下的所有markdown文件
function getMarkdownFiles(dirPath) {
  const files = []
  if (fs.existsSync(dirPath)) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true })
    items.forEach(item => {
      if (item.isFile() && item.name.endsWith('.md')) {
        files.push(item.name)
      }
    })
  }
  return files.sort()
}

// 生成AI知识库侧边栏
function generateAISidebar() {
  const aiBase = path.join(__dirname, '../ai')
  const categories = []

  if (!fs.existsSync(aiBase)) {
    return []
  }

  const dirs = fs.readdirSync(aiBase, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()

  dirs.forEach(dir => {
    const dirPath = path.join(aiBase, dir)
    const files = getMarkdownFiles(dirPath)

    if (files.length > 0) {
      const items = files.map(file => ({
        text: file.replace('.md', ''),
        link: `/ai/${dir}/${file.replace('.md', '')}`
      }))

      // 使用中文目录名
      const displayName = getDisplayName(dir)

      categories.push({
        text: displayName,
        collapsed: false,
        items
      })
    }
  })

  return categories
}

// 获取中文显示名称
function getDisplayName(dir) {
  const nameMap = {
    'claudecode': 'Claude Code',
    'cursor': 'Cursor',
    'mcp': 'MCP',
    'prompt': 'Prompt',
    'rules': 'Rules',
    'skills': 'Skills',
    'hao-de-rules': '好的Rules',
    'chang-yong-skills': '常用Skills',
    'bu-shu-ai': '部署AI',
    'shi-yong-ai-ji-qiao': '使用AI技巧',
    'kai-fa-ai-ying-yong': '开发AI应用'
  }
  return nameMap[dir] || dir
}

export default defineConfig({
  title: 'Awesome AI Pedia',
  description: 'AI知识库与博客',
  lang: 'zh-CN',
  base: '/Awesome-AI-Pedia/',
  lastUpdated: true,
  cleanUrls: true,

  // 忽略死链接检查
  ignoreDeadLinks: true,

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI知识库', link: '/ai/' },
      { text: '博客', link: '/blog/' },
      { text: '指南', link: '/guide/' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏
    sidebar: {
      '/ai/': generateAISidebar(),
      '/blog/': [
        {
          text: '📚 博客文章',
          collapsed: false,
          items: [
            { text: 'AI开发实践', link: '/blog/ai-development/' },
            { text: '智能助手配置', link: '/blog/ai-assistant/' },
            { text: 'VitePress使用指南', link: '/blog/vitepress-guide/' }
          ]
        }
      ],
      '/guide/': [
        {
          text: '📖 使用指南',
          collapsed: false,
          items: [
            { text: '快速开始', link: '/guide/getting-started/' },
            { text: '目录结构说明', link: '/guide/directory/' },
            { text: '部署指南', link: '/guide/deployment/' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/qdleader/Awesome-AI-Pedia' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/qdleader/Awesome-AI-Pedia/edit/master/docs/:path',
      text: '在GitHub上编辑此页'
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲配置
    outline: {
      label: '页面目录',
      level: 'deep'
    },

    // 返回顶部按钮
    returnToTopLabel: '返回顶部',

    // 外部链接图标
    externalLinkIcon: true,

    // 搜索
    search: {
      provider: 'local'
    },

    // 自定义主题色
    darkModeSearchPlaceholder: '搜索...',
    lightModeSearchPlaceholder: '搜索...'
  },

  // Vite配置
  vite: {
    server: {
      port: 3000,
      open: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './docs')
      }
    }
  },

  // Markdown配置
  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2, 3, 4] },
    config(md) {
      // 添加自定义markdown插件
    }
  },

  // 构建配置
  build: {
    outDir: '../dist',
    assetsDir: 'assets'
  },

  // 本地开发服务器
  srcDir: '.',
  cacheDir: '.vitepress/.cache'
})
