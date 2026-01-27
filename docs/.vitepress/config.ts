import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { getProjectRoot, generateNav, generateAISidebar, generateDynamicSidebar, getUrlFriendlyName } from './utils/sidebar'

const projectRoot = getProjectRoot()

export default defineConfig({
  title: 'Awesome AI Pedia',
  description: 'AI知识库与博客',
  lang: 'zh-CN',
  base: '/Awesome-AI-Pedia/',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  appearance: 'dark', // 默认使用暗黑主题

  themeConfig: {
    nav: generateNav(projectRoot),

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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qdleader/Awesome-AI-Pedia' }
    ],

    editLink: {
      pattern: 'https://github.com/qdleader/Awesome-AI-Pedia/edit/master/docs/:path',
      text: '在GitHub上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面目录',
      level: 'deep'
    },

    returnToTopLabel: '返回顶部',

    externalLinkIcon: true,

    search: {
      provider: 'local'
    },
  },

  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2, 3, 4] }
  }
})
