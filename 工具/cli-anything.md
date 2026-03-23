# cli-anything: 让所有软件成为 Agent 原生工具

**CLI-Anything** 是由 **香港大学数据科学实验室 (HKUDS)** 发起的一个开源项目。它的核心目标是：**将任何软件转换为 Agent 原生 (Agent-native) 工具，使其能够被 AI Agent 稳定地控制和操作。**

理解它最直观的一句话：
> **CLI-Anything 就是：把原本只能“由人点击 GUI 界面”使用的软件，变成 AI 也能通过结构化指令稳定调用的命令行工具。**

---

## 🚀 为什么需要 CLI-Anything？

目前 AI Agent 在逻辑推理方面表现出色，但在直接操作真实的专业软件（如 GIMP、Blender、LibreOffice）时仍然面临巨大挑战：
- **GUI 自动化太脆弱**：页面稍微改变、分辨率波动或弹窗遮挡都会导致操作失败。
- **API 覆盖不全**：许多专业软件没有完整的 API，或者 API 文档极其复杂，Agent 难以掌握。
- **功能受限的重新实现**：一些简化的替代方案丢失了原软件的专业能力（如滤镜、渲染引擎）。

**CLI-Anything 的路线**：不靠“眼睛”瞎点，而是通过自动化流程为软件套上一层“命令行壳子”，让 AI 像调用工具一样精确调用软件能力。

---

## 🛠️ 它如何工作？（七阶段自动化流程）

CLI-Anything 通过以下七步自动化流程，将软件源代码转化为功能完备的 CLI 封装器：

1.  **分析 (Analysis)**：扫描源代码，将原本的 GUI 操作或内部逻辑映射到可调用的接口。
2.  **设计 (Design)**：规划命令的分组（Commands）、状态模型（State Model）和输出格式。
3.  **实现 (Implementation)**：构建基于 Click 的 CLI，支持 **REPL（交互模式）**、**JSON 输出** 以及 **撤销/重做** 功能。
4.  **规格说明与测试规划**：生成 `TEST.md`，定义详细的单元测试和端到端 (E2E) 测试计划。
5.  **编写测试 (Writing Tests)**：自动实现完整的测试套件。
6.  **文档化 (Documentation)**：更新技术文档，并记录测试执行结果，确保工具可靠。
7.  **发布 (Publishing)**：生成 `setup.py` 并安装至系统路径，Agent 可直接通过命令发现功能。

---



## 🌟 核心优势：为什么它对 Agent 友好？

-   **结构化与可组合**：纯文本命令天然匹配 LLM 的输入格式，可自由串联成复杂工作流。
-   **自描述性**：Agent 只需运行 `--help` 就能自动发现所有功能和参数。
-   **确定性 JSON 输出**：Agent 接收到的不是模糊的屏幕截图，而是结构化的执行结果。
-   **确定且可靠**：具备撤销/重做和验证机制，Agent 的行为可预测、可纠错。
-   **轻量通用**：几乎零开销，跨平台运行，不依赖庞大的 GUI 环境。

---

## 💻 典型用法示例

你可以让 CLI-Anything 针对某个 GitHub 仓库或本地源码目录生成工具：

```bash
# 为 GIMP 生成 CLI 封装
cli-anything generate https://github.com/GNOME/gimp
```

生成的工具（如 `cli-anything-gimp`）可以如下使用：

```bash
# AI 调用的示例指令
cli-anything-gimp image open "photo.jpg"
cli-anything-gimp layer add --name "filter_layer"
cli-anything-gimp filter appliquer-gaussien --radius 10
cli-anything-gimp image export "output.png" --json
```

---

## 🔗 集成与未来

CLI-Anything 致力于构建一个 **Agent 原生软件生态**：
- **插件市场**：支持以类似插件的形式托管在 GitHub 上。
- **深度集成**：已支持与 **Claude Code**、**OpenClaw**、**Ollama** 等工具集成。
- **自主进化**：最终目标是实现 Agent 能够“自主发现新软件 -> 自主构建 CLI -> 分享给其他 Agent”。

---

## 💡 总结

CLI-Anything 正在补齐 AI 基础设施中的关键一环：**让软件从 Human-first (人优先) 进化为 Human + Agent 同等可用。** 它让老牌、深厚的专业软件在 AI 时代焕发新生，成为 Agent 手中真正的武器。

---
