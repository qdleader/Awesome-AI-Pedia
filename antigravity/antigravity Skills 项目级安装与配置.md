# antigravity Skills 项目级安装与配置

要在某个项目中使用这些技能，你需要创建 Workflow 文件。建议将 .agent/ 添加到 .gitignore 中，以免污染代码库。

## 配置技能列表查询的skills

在项目的根目录下
mkdir -p .agent/workflows/

cd .agent/workflows/

mkdir list-skills.md

```js
---
description: List all available agent skills installed in the global workspace.
---
 
# List Available Skills (Global)
 
1.  **Check Global Skills Directory**:
    - List directories in `~/.gemini/antigravity/skills/skills/skills`.
2.  **Display Skills**:
    - Show the list of available skills to the user.
    - Provide a brief description if possible (by reading `SKILL.md`).
 
// turbo 3. **Run Command**:
`bash ls ~/.gemini/antigravity/skills/skills/skills`
```



输入/list-skills 会列出所有的skills

