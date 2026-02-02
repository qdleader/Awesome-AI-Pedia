import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取目录下的所有markdown文件
export function getMarkdownFiles(dirPath: string): string[] {
  const files: string[] = []
  if (fs.existsSync(dirPath)) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true })
    items.forEach((item: fs.Dirent) => {
      if (item.isFile() && item.name.endsWith('.md')) {
        files.push(item.name)
      }
    })
  }
  return files.sort()
}

// 获取中文显示名称
export function getDisplayName(dir: string): string {
  const nameMap: Record<string, string> = {
    'antigravity': 'Antigravity',
    'claudecode': 'Claude Code',
    'claudeCode': 'Claude Code',
    'cursor': 'Cursor',
    'mcp': 'MCP',
    'openclaw': 'openclaw',
    'prompt': 'Prompt',
    'rules': 'Rules',
    'skills': 'Skills',
    'hao-de-rules': '好的Rules',
    '好的rules': '好的Rules',
    'chang-yong-skills': '常用Skills',
    '常用skills': '常用Skills',
    'bu-shu-ai': '部署AI',
    '部署ai': '部署AI',
    'shi-yong-ai-ji-qiao': '使用AI技巧',
    '使用ai技巧': '使用AI技巧',
    'kai-fa-ai-ying-yong': '开发AI应用',
    '开发ai应用相关问题': '开发AI应用',
    'bu-ke-bu-zhi-de-ai-zhi-shi': '不可不知的AI知识',
    '不可不知的Ai知识': '不可不知的AI知识',
    // prompt 子目录
    '图片': '图片',
    '常用类提示词': '常用类提示词',
    '开发类提示词': '开发类提示词',
    '提示词': '提示词',
    '项目初始化': '项目初始化',
    // 其他子目录
    '其他': '其他'
  }
  return nameMap[dir] || dir
}

// 获取URL友好的路径名
export function getUrlFriendlyName(dir: string): string {
  const urlMap: Record<string, string> = {
    'claudeCode': 'claudecode',
    '好的rules': 'hao-de-rules',
    '常用skills': 'chang-yong-skills',
    '部署ai': 'bu-shu-ai',
    '使用ai技巧': 'shi-yong-ai-ji-qiao',
    '开发ai应用相关问题': 'kai-fa-ai-ying-yong',
    '不可不知的Ai知识': 'bu-ke-bu-zhi-de-ai-zhi-shi'
  }
  return urlMap[dir] || dir.toLowerCase()
}

// 生成AI知识库侧边栏
// 递归生成侧边栏项目
function generateSidebarItems(dirPath: string, urlBasePath: string): Array<any> {
  const items: Array<any> = []
  
  if (!fs.existsSync(dirPath)) return items
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  
  // 先添加 md 文件
  const mdFiles = entries
    .filter((e: fs.Dirent) => e.isFile() && e.name.endsWith('.md') && e.name !== 'index.md')
    .map((e: fs.Dirent) => e.name)
    .sort()
  
  mdFiles.forEach((file: string) => {
    const fileName = file.replace('.md', '')
    items.push({
      text: fileName,
      link: `${urlBasePath}/${fileName}`
    })
  })
  
  // 再添加子目录
  const subDirs = entries
    .filter((e: fs.Dirent) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e: fs.Dirent) => e.name)
    .sort()
  
  subDirs.forEach((subDir: string) => {
    const subDirPath = path.join(dirPath, subDir)
    const subItems = generateSidebarItems(subDirPath, `${urlBasePath}/${subDir}`)
    
    if (subItems.length > 0) {
      items.push({
        text: getDisplayName(subDir),
        collapsed: true,
        items: subItems
      })
    }
  })
  
  return items
}

export function generateAISidebar(baseDir: string) {
  // baseDir 是项目根目录，ai 文件夹在 docs/ai 下
  const aiBase = path.join(baseDir, 'docs', 'ai')
  const categories: Array<any> = []

  if (!fs.existsSync(aiBase)) {
    return []
  }

  const dirs = fs.readdirSync(aiBase, { withFileTypes: true })
    .filter((d: fs.Dirent) => d.isDirectory())
    .map((d: fs.Dirent) => d.name)
    .sort()

  dirs.forEach((dir: string) => {
    const dirPath = path.join(aiBase, dir)
    const items = generateSidebarItems(dirPath, `/ai/${dir}`)

    if (items.length > 0) {
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

// 动态生成侧边栏
// 递归生成动态侧边栏项目
function generateDynamicSidebarItems(dirPath: string, urlBasePath: string): Array<any> {
  const items: Array<any> = []
  
  if (!fs.existsSync(dirPath)) return items
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  
  // 先添加 md 文件
  const mdFiles = entries
    .filter((e: fs.Dirent) => e.isFile() && e.name.endsWith('.md') && e.name !== 'index.md')
    .map((e: fs.Dirent) => e.name)
    .sort()
  
  mdFiles.forEach((file: string) => {
    const fileName = file.replace('.md', '')
    items.push({
      text: fileName,
      link: `${urlBasePath}/${fileName}`
    })
  })
  
  // 再添加子目录
  const subDirs = entries
    .filter((e: fs.Dirent) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e: fs.Dirent) => e.name)
    .sort()
  
  subDirs.forEach((subDir: string) => {
    const subDirPath = path.join(dirPath, subDir)
    const subItems = generateDynamicSidebarItems(subDirPath, `${urlBasePath}/${subDir}`)
    
    if (subItems.length > 0) {
      items.push({
        text: getDisplayName(subDir),
        collapsed: true,
        items: subItems
      })
    }
  })
  
  return items
}

// 🆕 修改为从根目录读取
export function generateDynamicSidebar(folderName: string, baseDir: string) {
  // 直接从根目录读取，不再使用 ai 子目录
  const folderPath = path.join(baseDir, folderName)
  
  if (!fs.existsSync(folderPath)) {
    return []
  }

  const urlFriendlyDir = getUrlFriendlyName(folderName)
  // URL 路径不再包含 /ai/ 前缀
  const items = generateDynamicSidebarItems(folderPath, `/${urlFriendlyDir}`)
  
  if (items.length === 0) {
    return []
  }

  return [
    {
      text: getDisplayName(folderName),
      collapsed: false,
      items
    }
  ]
}

// 🆕 生成所有内容目录的侧边栏配置
export function generateAllSidebars(baseDir: string) {
  const sidebarConfig: Record<string, any> = {}
  
  // 需要排除的目录
  const excludedDirs = [
    'node_modules',
    'docs',
    'scripts',
    '.git',
    '.github',
    '.vitepress',
    'public',
    'dist',
    'anime-video',
    '.agent',
    '.claude'
  ]
  
  // 获取所有内容目录
  const allRootItems = fs.readdirSync(baseDir, { withFileTypes: true })
  const contentDirs = allRootItems
    .filter((item: fs.Dirent) => 
      item.isDirectory() && 
      !excludedDirs.includes(item.name) &&
      !item.name.startsWith('.')
    )
    .map((item: fs.Dirent) => item.name)
  
  // 为每个内容目录生成侧边栏
  contentDirs.forEach((dir: string) => {
    const urlPath = getUrlFriendlyName(dir)
    const sidebar = generateDynamicSidebar(dir, baseDir)
    if (sidebar.length > 0) {
      sidebarConfig[`/${urlPath}/`] = sidebar
    }
  })
  
  // 添加固定的侧边栏 (博客和指南，它们在 docs/ 目录下)
  sidebarConfig['/docs/blog/'] = [
    {
      text: '📚 博客文章',
      collapsed: false,
      items: [
        { text: 'AI开发实践', link: '/docs/blog/ai-development/' },
        { text: '智能助手配置', link: '/docs/blog/ai-assistant/' },
        { text: 'VitePress使用指南', link: '/docs/blog/vitepress-guide/' }
      ]
    }
  ]
  
  sidebarConfig['/docs/guide/'] = [
    {
      text: '📖 使用指南',
      collapsed: false,
      items: [
        { text: '快速开始', link: '/docs/guide/getting-started/' },
        { text: '目录结构说明', link: '/docs/guide/directory/' },
        { text: '部署指南', link: '/docs/guide/deployment/' }
      ]
    }
  ]
  
  return sidebarConfig
}

// 动态生成顶部导航栏
export function getProjectRoot(): string {
  return path.resolve(__dirname, '../../../');
}

// 动态生成顶部导航栏
export function generateNav(baseDir: string) {
  const rootDir = baseDir
  const navItems: Array<any> = []

  const excludedDirs = [
    'node_modules',
    'docs',
    'scripts',
    '.git',
    '.vitepress',
    '.github',
    'public',
    'dist',
    '.claude'
  ]

  const allRootItems = fs.readdirSync(rootDir, { withFileTypes: true })

  const contentDirs = allRootItems
    .filter((item: fs.Dirent) => item.isDirectory() && !excludedDirs.includes(item.name))
    .map((item: fs.Dirent) => item.name)
    .sort()

  // 首先添加首页
  navItems.push({ text: '首页', link: '/' })

  // 添加所有导航项
  contentDirs.forEach((dir: string) => {
    const urlPath = getUrlFriendlyName(dir)
    navItems.push({
      text: getDisplayName(dir),
      link: `/${urlPath}/`  // 🆕 移除 /ai/ 前缀
    })
  })

  // 根据导航项总数动态决定是否需要分组
  // 10个以内：全部平铺显示
  // 超过10个：前10个平铺，其余放入"更多"菜单
  if (navItems.length > 10) {
    const visibleItems = navItems.slice(0, 10)
    const moreItems = navItems.slice(10)

    return [
      ...visibleItems,
      {
        text: '更多',
        items: moreItems
      }
    ]
  }

  return navItems
}
