# Hook 配置方式


**方式一:通过 /hooks 命令**

```bash
# 在 Claude Code 中
/hooks
```

**方式二:通过配置文件**

在 `~/.claude/settings.json` 或项目 `.claude/settings.json` 中配置:

```json
{
  "hooks": {
    "user-prompt-submit-hook": {
      "command": "npm run validate-prompt",
      "enabled": true
    },
    "tool-use-hook": {
      "command": "~/.claude/hooks/check-permission.sh",
      "enabled": true,
      "blocking": true
    },
    "after-tool-use-hook": {
      "command": "echo 'Tool used: {{toolName}}' >> ~/.claude/hooks.log",
      "enabled": true
    }
  }
}
```