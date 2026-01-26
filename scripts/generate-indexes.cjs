const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const contentDirs = [
  'claudeCode',
  'cursor',
  'mcp',
  'prompt',
  'rules',
  'skills',
  '部署ai',
  '使用ai技巧',
  '开发ai应用相关问题',
  '好的rules',
  '常用skills'
];

const nameMap = {
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
};

function getDisplayName(dir) {
  return nameMap[dir] || dir;
}

function generateIndex() {
  contentDirs.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.md') && f !== 'index.md')
        .sort();

      const displayName = getDisplayName(dir);
      
      let content = `---
layout: doc
title: ${displayName}
---

# ${displayName}

本分类包含以下内容：

<div class="article-list">
`;

      files.forEach(file => {
        const title = file.replace('.md', '');
        content += `
  <div class="article-item">
    <div class="article-item-title">
      <a href="./${title}">${title}</a>
    </div>
  </div>`;
      });

      content += `
</div>

<style>
.article-list {
  margin-top: 2rem;
}
.article-item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.article-item-title {
  font-size: 1.2rem;
  font-weight: 500;
}
.article-item-title a {
  color: var(--vp-c-brand);
  text-decoration: none;
}
.article-item-title a:hover {
  text-decoration: underline;
}
</style>
`;

      const indexPath = path.join(dirPath, 'index.md');
      fs.writeFileSync(indexPath, content);
      console.log(`Generated ${indexPath}`);
    }
  });
}

generateIndex();
