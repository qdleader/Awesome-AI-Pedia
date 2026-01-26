import { defineConfig } from 'vitepress'
import { glob } from 'glob'
import matter from 'gray-matter'
import path from 'path'

// 自动从目录结构生成侧边栏
async function generateSidebar() {
  const sidebar = {}

  // 读取所有markdown文件
  const files = glob.sync('docs/**/*.md', { ignore: ['docs/index.md', 'docs/.vitepress/**'] })

  files.forEach(file => {
    const parts = file.replace(/^docs\//, '').split('/')
    const isIndex = parts[parts.length - 1] === 'index.md'
    const section = isIndex ? parts[0] : parts.slice(0, -1).join('/') || 'root'

    if (!sidebar[section]) {
      sidebar[section] = []
    }

    const filePath = path.join(file)
    const content = matter.read(file).data

    const item = {
      text: content.title || parts[parts.length - 1].replace(/\.md$/, ''),
      link: '/' + filePath.replace(/^docs\//, '').replace(/\.md$/, ''),
    }

    if (content.date) {
      item.text = `📅 ${item.text}`
    }

    sidebar[section].push(item)
  })

  // 对每个section进行排序
  Object.keys(sidebar).forEach(section => {
    sidebar[section].sort((a, b) => {
      const aHasDate = a.text.includes('📅')
      const bHasDate = b.text.includes('📅')
      if (aHasDate && bHasDate) return 0
      if (aHasDate) return -1
      if (bHasDate) return 1
      return 0
    })
  })

  return sidebar
}

export default defineConfig({
  title: 'Awesome AI Pedia',
  description: 'AI知识库与博客',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '指南', link: '/guide/' },
      {
        text: '分类',
        items: [
          { text: '开发技巧', link: '/blog/development/' },
          { text: 'AI应用', link: '/blog/ai-applications/' },
          { text: '工具推荐', link: '/blog/tools/' }
        ]
      },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏
    sidebar: {
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
      { icon: 'github', link: 'https://github.com/yourusername/awesome-ai-pedia' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/yourusername/awesome-ai-pedia/edit/master/docs/:path',
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
  cacheDir: '.vitepress/.cache',

  // 自动生成侧边栏（可选的动态方式）
  async sidebar() {
    return await generateSidebar()
  }
})
