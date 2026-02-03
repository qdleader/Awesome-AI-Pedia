
# 什么是 Hooks?

Hooks 是在特定事件触发时自动执行的脚本,用于自定义工作流、拦截危险操作、自动格式化代码等。

**核心价值:**
- 自动化工作流
- 安全防护
- 代码质量保证

## Hook 事件类型

- **user-prompt-submit-hook:** 用户提交提示词前触发
- **tool-use-hook:** 工具使用前触发(可阻塞)
- **after-tool-use-hook:** 工具使用后触发
- **after-write-hook:** 文件写入后触发
- **task-complete-hook:** 任务完成后触发
