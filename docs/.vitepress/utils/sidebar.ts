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
    'claudecode': 'Claude Code',
    'claudeCode': 'Claude Code',
    'cursor': 'Cursor',
    'mcp': 'MCP',
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
    '开发ai应用相关问题': '开发AI应用'
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
    '开发ai应用相关问题': 'kai-fa-ai-ying-yong'
  }
  return urlMap[dir] || dir.toLowerCase()
}

// 生成AI知识库侧边栏
export function generateAISidebar(baseDir: string) {
  const aiBase = path.join(baseDir, 'ai')
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
    const files = getMarkdownFiles(dirPath)

    if (files.length > 0) {
      // 使用 URL 友好的目录名
      const urlFriendlyDir = dir
      
      const items = files.map((file: string) => {
        const fileName = file.replace('.md', '')
        return {
          text: fileName,
          link: `/ai/${urlFriendlyDir}/${fileName}`
        }
      })

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
export function generateDynamicSidebar(folderName: string, baseDir: string) {
  const folderPath = path.join(baseDir, folderName)
  const files = getMarkdownFiles(folderPath)

  if (files.length === 0) {
    return []
  }

  const urlFriendlyDir = getUrlFriendlyName(folderName)
  
  const items = files.map((file: string) => {
    const fileName = file.replace('.md', '')
    return {
      text: fileName,
      link: `/ai/${urlFriendlyDir}/${fileName}`
    }
  })

  return [
    {
      text: getDisplayName(folderName),
      collapsed: false,
      items
    }
  ]
}

// 动态生成顶部导航栏
export function getProjectRoot(): string {
  return path.resolve(__dirname, '../../../');
}

// 动态生成顶部导航栏
export function generateNav(baseDir: string) {
  const rootDir = baseDir
  const navItems: Array<{ text: string; link: string }> = [
    { text: '首页', link: '/' }
  ]

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

  contentDirs.forEach((dir: string) => {
    const urlPath = getUrlFriendlyName(dir)
    navItems.push({
      text: getDisplayName(dir),
      link: `/ai/${urlPath}/`
    })
  })

  return navItems
}
