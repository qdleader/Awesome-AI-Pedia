# 什么是Subagents


Subagents 是可以并行处理任务的独立 AI 代理,每个子代理拥有独立的 200K 上下文窗口,可以分配不同任务以提高效率。

**核心理念:** 把常用工作流看作自动化运行的"子智能体",就像圣诞老人分派任务给精灵一样,每个子智能体专注于特定领域。

**核心优势:**
- 并行处理多个任务
- 独立的上下文窗口
- 专业化分工
- 提高整体效率

#### Subagent 配置

**方式一:通过 /agents 命令**

```bash
claude /agents
```

**方式二:配置文件**

在 `~/.claude/agents.json` 或项目 `.claude/agents.json` 中配置:

```json
{
  "agents": {
    "code-reviewer": {
      "description": "专门负责代码审查的子代理",
      "model": "claude-opus-4-5",
      "instructions": "你是一个专业的代码审查专家,专注于检查代码质量、安全漏洞和性能问题。",
      "tools": ["read", "search", "git"],
      "permissions": {
        "allowWrite": false
      }
    },
    "test-writer": {
      "description": "专门负责编写测试的子代理",
      "model": "claude-sonnet-4-5",
      "instructions": "你是一个测试工程师,专注于编写全面的单元测试和集成测试。",
      "tools": ["read", "write", "bash"]
    },
    "doc-generator": {
      "description": "专门负责生成文档的子代理",
      "model": "claude-sonnet-4-5",
      "instructions": "你是一个技术文档专家,专注于生成清晰、准确的技术文档。",
      "tools": ["read", "write"]
    }
  }
}
```