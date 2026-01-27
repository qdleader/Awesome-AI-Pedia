import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { generateAISidebar, generateDynamicSidebar, generateNav, getDisplayName, getUrlFriendlyName, getMarkdownFiles, getProjectRoot } from './utils/sidebar.js'

const projectRoot = getProjectRoot();

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
    // 导航栏 - 动态生成
    nav: generateNav(projectRoot),

    // 侧边栏
    sidebar: (() => {
      const sidebar: DefaultTheme.Sidebar = {
        '/ai/': generateAISidebar(projectRoot),
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
      }

      const contentDirs = generateNav(projectRoot).slice(1).map((navItem: any) => getUrlFriendlyName(navItem.text))

      contentDirs.forEach((dir: any) => {
        const urlPath = getUrlFriendlyName(dir)
        sidebar[`/ai/${urlPath}/`] = generateDynamicSidebar(dir, projectRoot)
      })
      return sidebar
    })(),

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

  },

  // Vite配置
  vite: {
    build: {
      outDir: '../dist',
      assetsDir: 'assets'
    },
    server: {
      port: 3000,
      open: true
    },
    resolve: {
      alias: {
        '@': `${projectRoot}/docs`
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

  // 本地开发服务器
  srcDir: '.',
  cacheDir: '.vitepress/.cache'
})