# antigravity Skills 全局安装与配置


## 1. 核心概念
在 Antigravity 中，技能系统分为两层：

Skills (全局库)：实际的代码、脚本和指南，存储在系统级目录（如 ~/.gemini/antigravity/skills）。它们是“能力”的本体。

Workflows (项目级)：存储在项目根目录的 .agent/workflows 中。它们是“遥控器”，定义了如何在当前项目中调用全局的 Skills。
这种分离设计确保了你的项目代码库保持轻量，同时又能复用强大的全局能力。

## 2. 全局安装 Skills

### 2.1 准备目录
首先，确保全局 Skills 目录存在。Antigravity 通常使用以下路径：
```ts
mkdir -p ~/.gemini/antigravity/skills
cd ~/.gemini/antigravity/skills
```

### 2.2 安装 Anthropic 官方 Skills
这是基础技能库，包含前端设计、文档编写、测试等通用能力。
```ts
git clone https://github.com/anthropics/skills.git
```

### 2.3 安装 UI-UX-Pro-Max
这是进阶的前端设计技能，包含智能配色、排版和反模式检查。
```ts
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
```