import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const copySymlinksPath = path.join(projectRoot, 'scripts', 'copy-symlinks.js')
const sidebarPath = path.join(projectRoot, 'docs', '.vitepress', 'utils', 'sidebar.ts')

// 需要排除的目录
const excludedDirs = [
  'node_modules',
  'docs',
  'scripts',
  '.git',
  '.github',
  'public',
  'dist',
  '.claude',
  '.vscode'
]

// 获取URL友好的名称
function toUrlFriendly(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim()
}

// 读取 copy-symlinks.js 中的 symlinkMap
function getSymlinkMap() {
  const content = fs.readFileSync(copySymlinksPath, 'utf-8')
  const match = content.match(/const symlinkMap = \{([\s\S]*?)\}/)
  if (!match) return {}

  const map = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const cleanLine = line.trim()
    if (cleanLine && cleanLine.includes(':')) {
      const parts = cleanLine.split(':').map(s => s.trim().replace(/['",]/g, ''))
      if (parts[0] && parts[1]) {
        map[parts[0]] = parts[1]
      }
    }
  }

  return map
}

// 读取 sidebar.ts 中的 nameMap
function getNameMap() {
  const content = fs.readFileSync(sidebarPath, 'utf-8')
  const match = content.match(/const nameMap: Record<string, string> = \{([\s\S]*?)\}/)
  if (!match) return {}

  const map = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const cleanLine = line.trim()
    if (cleanLine && cleanLine.includes(':')) {
      const parts = cleanLine.split(':').map(s => s.trim().replace(/['",]/g, ''))
      if (parts[0] && parts[1]) {
        map[parts[0]] = parts[1]
      }
    }
  }

  return map
}

// 获取所有内容文件夹
function getContentFolders() {
  const items = fs.readdirSync(projectRoot, { withFileTypes: true })
  return items
    .filter(item => item.isDirectory() && !excludedDirs.includes(item.name))
    .map(item => item.name)
    .sort()
}

// 修复 copy-symlinks.js
function fixCopySymlinks(symlinkMap, folders) {
  const content = fs.readFileSync(copySymlinksPath, 'utf-8')
  const targets = Object.values(symlinkMap)

  const newEntries = []
  for (const folder of folders) {
    if (!targets.includes(folder)) {
      const key = toUrlFriendly(folder)
      newEntries.push(`  '${key}': '${folder}'`)
    }
  }

  if (newEntries.length === 0) {
    console.log('✅ copy-symlinks.js 无需更新')
    return
  }

  // 找到 symlinkMap 的结束位置
  const mapEndMatch = content.match(/(\n  \}[^}]*$)/m)
  if (!mapEndMatch) {
    console.error('❌ 无法解析 copy-symlinks.js')
    return
  }

  const insertPosition = content.lastIndexOf('\n  }')
  const newContent =
    content.slice(0, insertPosition) +
    ',\n' +
    newEntries.join(',\n') +
    content.slice(insertPosition)

  fs.writeFileSync(copySymlinksPath, newContent, 'utf-8')
  console.log(`✅ 已更新 copy-symlinks.js，添加 ${newEntries.length} 个新配置`)
}

// 修复 sidebar.ts
function fixSidebar(nameMap, folders) {
  const content = fs.readFileSync(sidebarPath, 'utf-8')

  const newEntries = []
  for (const folder of folders) {
    if (!(folder in nameMap)) {
      // 使用原始文件夹名作为显示名称
      newEntries.push(`    '${folder}': '${folder}'`)
    }
  }

  if (newEntries.length === 0) {
    console.log('✅ sidebar.ts 无需更新')
    return
  }

  // 找到 nameMap 的结束位置
  const mapEndMatch = content.match(/(\n    \}[^}]*$)/m)
  if (!mapEndMatch) {
    console.error('❌ 无法解析 sidebar.ts')
    return
  }

  const insertPosition = content.lastIndexOf('\n  }')
  const newContent =
    content.slice(0, insertPosition) +
    ',\n' +
    newEntries.join(',\n') +
    content.slice(insertPosition)

  fs.writeFileSync(sidebarPath, newContent, 'utf-8')
  console.log(`✅ 已更新 sidebar.ts，添加 ${newEntries.length} 个新配置`)
}

// 主函数
function main() {
  console.log('⚠️  fix-config.js 暂时禁用（正在进行重构）')
  console.log('✅ 跳过配置修复，直接启动服务')
  // console.log('🔧 自动修复配置文件...\n')
  
  // const folders = getContentFolders()
  // const symlinkMap = getSymlinkMap()
  // const nameMap = getNameMap()
  
  // console.log(`📁 找到 ${folders.length} 个内容文件夹\n`)
  
  // fixCopySymlinks(symlinkMap, folders)
  // fixSidebar(nameMap, folders)
  
  // console.log('\n✨ 配置修复完成!')
  // console.log('\n💡 下一步:')
  // console.log('   1. 运行 npm run check-config 验证配置')
  // console.log('   2. 运行 npm run build 重新构建')
}

main()
