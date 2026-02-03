# hooks 自动格式化代码


**自动格式化代码:**

```json
{
  "hooks": {
    "after-write-hook": {
      "command": "if [[ {{filePath}} == *.js ]]; then prettier --write {{filePath}}; fi",
      "enabled": true,
      "blocking": false
    }
  }
}
```

**自动格式化代码(PostToolUse Hook):**

来自创始人的实战经验 - 彻底消灭 CI 里的格式报错:

```json
{
  "hooks": {
    "after-tool-use-hook": {
      "command": "bun run format || true",
      "enabled": true,
      "blocking": false
    }
  }
}
```

**工作原理:**
1. 每次 Claude 使用 `Write` 或 `Edit` 工具后自动触发
2. 运行格式化命令(这里是 `bun run format`)
3. `|| true` 确保即使格式化失败也不阻塞流程
4. 虽然 Claude 已经写得很规范,但这最后 10% 的自动化处理能彻底解决格式问题

**效果:**
- ✅ CI 中不再有格式报错
- ✅ 代码风格始终一致
- ✅ 无需手动运行格式化
- ✅ Git diff 更清晰
