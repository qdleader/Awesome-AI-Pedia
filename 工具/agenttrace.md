# agenttrace：查看 AI 编程 Agent 会话成本和慢任务

**agenttrace** 是一个本地优先的终端 TUI 和报告生成工具，用来查看 AI 编程 Agent 的历史会话。它会读取本机已有日志，汇总 cost、token、耗时、工具失败、重试和健康度，帮助你快速判断哪次任务最贵、最慢，或者最值得优先排查。

项目地址：[https://github.com/luoyuctl/agenttrace](https://github.com/luoyuctl/agenttrace)

---

## 适合解决什么问题？

如果你经常同时使用 Claude Code、Codex CLI、Gemini CLI、Aider、OpenCode、OpenClaw、Cursor 导出记录等工具，通常会遇到几个问题：

- 不知道一段时间里各个 Agent 总共用了多少 token 和大概成本。
- 某次任务明显很慢，但最终回答看不出卡在哪里。
- Agent 出现工具失败、重试、长时间空转、上下文压力时，原始 JSONL 日志很难直接读。
- 想在 CI 或自动化流程里对 Agent 会话健康度做一个基本质量门禁。

agenttrace 的定位不是替代这些编程 Agent，而是给它们已有的本地会话日志加一个可读的观测层。

---

## 支持哪些日志来源？

agenttrace 支持多种本地 AI 编程工具的会话记录，包括：

- Claude Code
- Codex CLI
- Gemini CLI
- Qwen Code
- Cline
- Aider
- Cursor 导出记录
- Hermes Agent
- OpenCode
- OpenClaw
- Pi / Oh My Pi
- Kimi CLI
- Copilot 风格日志
- 通用 JSON / JSONL trace

实际使用时，它会优先自动发现常见日志目录，也可以通过 `-d` 指定项目或日志目录。

---

## 安装方式

macOS / Linux 可以直接安装单文件二进制：

```bash
curl -sL https://raw.githubusercontent.com/luoyuctl/agenttrace/master/install.sh | sh
```

也可以使用 Homebrew：

```bash
brew install luoyuctl/tap/agenttrace
```

如果本机有 Go 环境：

```bash
go install github.com/luoyuctl/agenttrace/cmd/agenttrace@latest
```

Windows PowerShell：

```powershell
iwr -useb https://raw.githubusercontent.com/luoyuctl/agenttrace/master/install.ps1 | iex
```

---

## 常用命令

启动 TUI：

```bash
agenttrace
```

检查本机可识别的日志来源：

```bash
agenttrace --doctor
```

生成 JSON 概览，适合接入脚本：

```bash
agenttrace --overview -f json
```

生成 HTML 报告：

```bash
agenttrace --overview -f html -o agenttrace-overview.html
```

用健康度和失败规则做质量门禁：

```bash
agenttrace --overview \
  --fail-under-health 80 \
  --fail-on-critical \
  --max-tool-fail-rate 15
```

---

## 什么时候值得用？

当你只是偶尔让 AI 写一小段代码时，直接看工具输出就够了。

当你已经开始把 Claude Code、Codex、OpenCode、OpenClaw、Aider 这类工具用于日常开发、批量任务或长时间自动化时，agenttrace 会更有价值：它能把“这次 Agent 到底发生了什么”从零散日志变成可排序、可过滤、可导出的会话视图。
