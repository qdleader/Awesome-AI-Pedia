import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { getProjectRoot, generateNav, generateAllSidebars } from './utils/sidebar'

const projectRoot = getProjectRoot()

export default defineConfig({
  title: 'Awesome AI Pedia',
  description: 'AI知识库与博客',
  lang: 'zh-CN',
  
  // 🆕 指定源目录为项目根目录
  srcDir: '../../',
  
  // 🆕 排除不需要的目录和文件
  srcExclude: [
    'node_modules/**',
    'scripts/**',
    '.git/**',
    '.github/**',
    'dist/**',
    'anime-video/**',
    '.agent/**',
    '.claude/**',
    '.vscode/**',
    '*.lock',
    'package.json',
    'package-lock.json',
    '*.sh'
  ],
  
  base: '/Awesome-AI-Pedia/',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  appearance: 'dark', // 默认使用暗黑主题

  themeConfig: {
    nav: generateNav(projectRoot),

    // 🆕 动态生成所有内容目录的侧边栏
    sidebar: generateAllSidebars(projectRoot),

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
