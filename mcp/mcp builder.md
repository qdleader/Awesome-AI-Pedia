# MCP Builder：高质量 MCP Server 开发指南

MCP Builder 是开发、测试和优化 MCP (Model Context Protocol) Server 的权威指南。它旨在帮助开发者构建能够让 LLM 有效与外部服务交互的高质量工具。

---

## 🚀 核心工作流：四阶段开发法

创建一个高质量的 MCP Server 分为四个关键阶段：

### 第一阶段：深度研究与规划 (Deep Research & Planning)
1. **理解现代 MCP 设计**：
   - **API 覆盖 vs. 工作流工具**：平衡全面 API 端点覆盖与专用工作流工具。优先考虑全面的 API 覆盖，让 Agent 具备灵活组合操作的能力。
   - **工具命名与发现**：使用一致的前缀（如 `github_create_issue`）和动作导向的命名。
   - **上下文管理**：提供简洁且聚焦的数据，支持过滤和分页，避免无关信息干扰。
   - **可操作的错误消息**：错误信息应指导 Agent 解决问题，并提供具体建议。
2. **研究协议文档**：
   - 从 [modelcontextprotocol.io/sitemap.xml](https://modelcontextprotocol.io/sitemap.xml) 获取协议地图。
   - **技巧**：访问特定页面时，可以尝试在 URL 后添加 `.md` 后缀来直接获取 Markdown 格式内容（例如：`https://modelcontextprotocol.io/specification/draft.md`）。
3. **规划实施方案**：分析目标服务的 API 文档，确定核心端点、认证要求及数据模型。

### 第二阶段：实施阶段 (Implementation)
1. **设置项目结构**：
   - **TypeScript (推荐)**：使用 MCP SDK，支持 Zod 模式验证。
   - **Python**：使用 FastMCP / Python SDK，支持 Pydantic 模型。
2. **构建核心基础设施**：
   - 实现带认证的 API 客户端。
   - 编写统一的错误处理助手。
   - 支持分页和响应格式化（JSON/Markdown）。
3. **实现工具 (Tools)**：
   - **输入模式**：使用 Zod 或 Pydantic 定义严格的约束、描述和示例。
   - **输出模式**：定义 `outputSchema` 和 `structuredContent` 以帮助客户端处理数据。
   - **注解 (Annotations)**：正确标记 `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint` 等。

### 第三阶段：审查与测试 (Review & Testing)
1. **代码质量审查**：
   - 遵循 DRY 原则，避免重复代码。
   - 确保类型全覆盖（Full type coverage）。
   - 提供清晰、准确的工具描述。
2. **构建与验证**：
   - 使用 **MCP Inspector** (`npx @modelcontextprotocol/inspector`) 进行实时测试。
   - 验证编译是否通过（如 `npm run build` 或 `python -m py_compile`）。

### 第四阶段：创建评估 (Create Evaluations)
构建 10 个以上复杂、真实的评估问题。评估文件通常使用 XML 格式存储：

```xml
<evaluation>
  <qa_pair>
    <question>具体的、复杂的、需要多步工具调用的问题...</question>
    <answer>唯一且可比对的标准答案</answer>
  </qa_pair>
</evaluation>
```

**评估要求**：
- **独立性**：各问题互不依赖。
- **只读性**：仅执行非破坏性操作（Read-only）。
- **复杂性**：需要多次工具调用和深度探索。
- **稳定性**：答案不会随时间轻易改变。

---

## 🛠️ 推荐技术栈

| 维度 | 推荐选择 (Recommended) | 理由 |
| :--- | :--- | :--- |
| **编程语言** | **TypeScript** | SDK 支持度最高，类型安全，AI 生成代码效果更好。 |
| **验证库** | **Zod** (TS) / **Pydantic** (Py) | 强大的模式验证和清晰的元数据描述。 |
| **传输协议** | **stdio** (本地) / **HTTP** (远程) | 灵活适配各种运行环境。 |
| **数据格式** | **无状态 JSON** | 易于扩展和维护。 |

---


## ✨ 质量标准清单 (Quality Checklist)

- [ ] 符合 DRY 原则，无冗余代码。
- [ ] 错误响应具备可操作性（Actionable instructions）。
- [ ] 所有的工具（Tools）都有准确的模式（Schema）描述和示例。
- [ ] 关键操作已添加 Hint 注解。
- [ ] 包含 10 个以上的评估案例（Evaluations）。
- [ ] 处理了分页和长内容限制。

---
> 来源参考：
> - [Anthropic MCP Builder Skill](https://github.com/anthropics/skills/blob/main/skills/mcp-builder/SKILL.md)
