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
      const [key, value] = cleanLine.split(':').map(s => s.trim().replace(/['",]/g, ''))
      if (key && value) {
        map[key] = value
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
      const [key, value] = cleanLine.split(':').map(s => s.trim().replace(/['",]/g, ''))
      if (key && value) {
        map[key] = value
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

// 检查配置
function checkConfig() {
  console.log('🔍 检查配置文件...\n')

  const folders = getContentFolders()
  const symlinkMap = getSymlinkMap()
  const nameMap = getNameMap()

  // 反转 symlinkMap 以便快速查找
  const symlinkTargets = Object.values(symlinkMap)

  console.log(`📁 找到 ${folders.length} 个内容文件夹:\n`)

  const issues = []

  for (const folder of folders) {
    const isInSymlink = symlinkTargets.includes(folder)
    const isInNameMap = folder in nameMap

    const symlinkKey = isInSymlink
      ? Object.keys(symlinkMap).find(key => symlinkMap[key] === folder)
      : null

    let status = '✅'
    let message = ''

    if (!isInSymlink) {
      status = '❌'
      message = ` [未在 copy-symlinks.js 中配置]`
      issues.push({
        type: 'symlink',
        folder,
        fix: `在 copy-symlinks.js 的 symlinkMap 中添加: '${folder.toLowerCase().replace(/\s+/g, '-')}': '${folder}'`
      })
    }

    if (!isInNameMap) {
      status = '⚠️ '
      message += ` [未在 sidebar.ts 的 nameMap 中配置]`
      issues.push({
        type: 'nameMap',
        folder,
        fix: `在 sidebar.ts 的 nameMap 中添加: '${folder}': '显示名称'`
      })
    }

    console.log(`${status} ${folder}${message}`)
  }

  console.log('\n' + '='.repeat(60))

  if (issues.length > 0) {
    console.log('\n⚠️  发现 ' + issues.length + ' 个配置问题:\n')

    const symlinkIssues = issues.filter(i => i.type === 'symlink')
    const nameMapIssues = issues.filter(i => i.type === 'nameMap')

    if (symlinkIssues.length > 0) {
      console.log('📝 需要在 copy-symlinks.js 中添加以下配置:')
      console.log('```javascript')
      for (const issue of symlinkIssues) {
        console.log(`  ${issue.fix}`)
      }
      console.log('```\n')
    }

    if (nameMapIssues.length > 0) {
      console.log('📝 需要在 sidebar.ts 中添加以下配置:')
      console.log('```typescript')
      for (const issue of nameMapIssues) {
        console.log(`  ${issue.fix}`)
      }
      console.log('```\n')
    }

    console.log('💡 提示: 运行 npm run fix-config 自动修复这些问题\n')
    return false
  } else {
    console.log('\n✅ 所有文件夹配置正确!\n')
    return true
  }
}

// 主函数
function main() {
  const isValid = checkConfig()
  process.exit(isValid ? 0 : 1)
}

main()
