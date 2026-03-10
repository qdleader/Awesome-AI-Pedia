# Everything Claude Code 深度学习指南

## 1. 快速入门
**Everything Claude Code** 是 Anthropic 黑客马拉松获胜项目，包含 15+ 代理、30+ 技能、20+ 命令及自动化钩子。
- **安装**:
  1. 添加市场: `/plugin marketplace add affaan-m/everything-claude-code`
  2. 安装插件: `/plugin install everything-claude-code@everything-claude-code`
  3. 配置规则: `cp -r everything-claude-code/rules/* ~/.claude/rules/`

## 2. 核心概念
- **Skills (技能)**: 工作流定义与领域知识封装 (位于 `~/.claude/skills/`)。提供 Codemaps 辅助导航，减少重复提示。
- **Commands (命令)**: 存储在 `~/.claude/commands/` 的快速执行提示词，如 `/plan`, `/tdd`, `/code-review`, `/verify`。
- **Agents (子代理)**: 任务委托机制。例如 `planner` (规划)、`architect` (架构)、`tdd-guide` (测试)、`code-reviewer` (审查) 等。支持 Opus、Sonnet 或 Haiku 模型根据任务复杂度切换。
- **Hooks (钩子)**: 事件驱动自动化。支持 `PreToolUse` (工具前验证)、`Stop` (会话结束评估) 等 10+ 触发时机。
- **Rules (规则)**: 始终遵循的最佳实践，存储在 `~/.claude/rules/`。
- **MCPs**: 连接外部服务 (Supabase, GitHub, Chrome 等)。注意上下文窗口消耗。
- **Plugins**: 打包工具包。

## 3. 设计理念
- **Token 优化**: 采用子代理架构，根据任务匹配模型 (如简单任务用 Haiku，复杂逻辑用 Opus)。
- **内存持久化**: 跨会话保存状态，使用会话存储文件 (`.tmp` 或 `sessions/`)。
- **持续学习**: 通过 `Stop Hook` 自动从会话中提取有效模式并存为新技能。
- **验证循环**: 强制质量检查 (Build -> Types -> Lint -> Tests -> Security -> Diff)。

## 4. 核心工作流
- **规划-实现-验证 (PIV) 循环**: `/plan` 生成详细计划 -> 用户确认 -> `implementation` -> `/verify` 自动报告。
- **TDD 工作流**: 测试优先原则，要求 80%+ 测试覆盖率。

## 5. SKILL 详解
- **TDD Workflow SKILL**: 覆盖单元、集成和 E2E 测试模式。
- **Continuous Learning SKILL**: 评估会话长度 (默认 10+ 消息) 并自动提取知识。
- **Verification Loop SKILL**: 提供全面的验证报告 (PASS/FAIL 及错误计数)。
