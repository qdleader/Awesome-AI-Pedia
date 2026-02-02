



# 如何编写自己的 Skills

**Skill 目录结构:**

```ts
my-skill/
├── skill.json      # Skill 元数据
├── skill.md        # Skill 文档
├── api/            # API 定义(可选)
└── tools/          # 自定义工具(可选)
```

**skill.json 示例:**

```json
{
  "name": "my-custom-skill",
  "description": "我的自定义技能",
  "version": "1.0.0",
  "author": "Your Name",
  "categories": ["automation"],
  "license": "MIT",
  "skill": {
    "file": "skill.md",
    "description": "这个技能用于..."
  }
}
```

**skill.md 示例:**

```markdown
# My Custom Skill

这个技能帮助用户快速完成[特定任务]。

## 使用场景
- 场景1:描述...
- 场景2:描述...

## 使用方式
用户只需要告诉你要完成什么,这个技能就会自动:
1. 分析需求
2. 执行步骤
3. 返回结果

## 注意事项
- 注意事项1
- 注意事项2
```

**安装本地 Skill:**

```bash
# 将技能复制到 Claude Code 配置目录
cp -r my-skill ~/.claude/skills/

# 或使用安装命令
npx skills-installer install ./my-skill --client claude-code
```