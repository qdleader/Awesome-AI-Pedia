import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const aiDir = path.join(projectRoot, 'docs', 'ai')

// 符号链接映射
const symlinkMap = {
  'bu-shu-ai': '部署ai',
  'chang-yong-skills': '常用skills',
  'claudecode': 'claudeCode',
  'cursor': 'cursor',
  'hao-de-rules': '好的rules',
  'kai-fa-ai-ying-yong': '开发ai应用相关问题',
  'mcp': 'mcp',
  'prompt': 'prompt',
  'rules': 'rules',
  'shi-yong-ai-ji-qiao': '使用ai技巧',
  'skills': 'skills'
}

console.log('🔗 开始处理符号链接...\n')

// 复制目录内容
function copyDirectory(src, dest) {
  // 如果目标是符号链接,先删除
  if (fs.existsSync(dest)) {
    const stats = fs.lstatSync(dest)
    if (stats.isSymbolicLink()) {
      fs.unlinkSync(dest)
      console.log(`  ✓ 删除符号链接: ${path.basename(dest)}`)
    } else if (stats.isDirectory()) {
      // 如果已经是真实目录,先清空
      fs.rmSync(dest, { recursive: true, force: true })
      console.log(`  ✓ 清空现有目录: ${path.basename(dest)}`)
    }
  }

  // 创建目标目录
  fs.mkdirSync(dest, { recursive: true })

  // 读取源目录
  const items = fs.readdirSync(src, { withFileTypes: true })

  for (const item of items) {
    const srcPath = path.join(src, item.name)
    const destPath = path.join(dest, item.name)

    if (item.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else if (item.isFile()) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// 处理每个符号链接
for (const [linkName, targetDir] of Object.entries(symlinkMap)) {
  const linkPath = path.join(aiDir, linkName)
  const targetPath = path.join(projectRoot, targetDir)

  console.log(`📁 处理: ${linkName} -> ${targetDir}`)

  if (!fs.existsSync(targetPath)) {
    console.log(`  ⚠️  源目录不存在: ${targetPath}`)
    continue
  }

  try {
    copyDirectory(targetPath, linkPath)
    console.log(`  ✅ 成功复制\n`)
  } catch (error) {
    console.error(`  ❌ 复制失败: ${error.message}\n`)
  }
}

console.log('✨ 符号链接处理完成!')
