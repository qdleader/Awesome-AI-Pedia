# Claude Code 完全指南:使用方式、技巧与最佳实践


## 目录

- [一、Claude Code 简介](#一claude-code-简介)
- [二、安装与配置](#二安装与配置)
- [三、核心概念详解](#三核心概念详解)
- [四、高级功能](#四高级功能)
- [五、实用技巧与快捷操作](#五实用技巧与快捷操作)
- [六、最佳实践](#六最佳实践)
- [七、实战案例](#七实战案例)
- [八、常见问题与解决方案](#八常见问题与解决方案)
- [九、高级集成与扩展](#九高级集成与扩展)

## 三、核心概念详解


### 3.2 Hooks(钩子)

#### Hook 配置方式


#### Hook 实战示例

**拦截危险命令:**

```bash
#!/bin/bash
# ~/.claude/hooks/check-dangerous.sh

# 读取工具调用信息
TOOL_NAME=$(jq -r '.toolName' <<< "$CLAUDE_HOOK_INPUT")

# 危险操作列表
DANGEROUS_TOOLS=("rm" "delete" "format" "shutdown")

if [[ " ${DANGEROUS_TOOLS[@]} " =~ " ${TOOL_NAME} " ]]; then
    echo "⚠️ 警告:即将执行危险操作 - $TOOL_NAME"
    echo "请确认是否继续? (yes/no)"
    read -r confirmation
    if [[ "$confirmation" != "yes" ]]; then
        exit 1  # 阻止操作
    fi
fi
```

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

### 3.3 Plugins(插件)

#### 什么是 Plugins?

Plugins 是打包在一起的扩展集合,可以包含:
- 5 个 Skills
- 10 个斜杠命令
- 3 个 MCP 服务器配置
- 2 个 SubAgent 定义
- 若干 Hooks

**Plugins vs Skills:**

| 特性 | Skills | Plugins |
|-----|--------|---------|
| 范围 | 单一功能 | 功能集合 |
| 复杂度 | 简单 | 复杂 |
| 依赖 | 无 | 可能有 |

#### Plugin 安装与使用

**从市场安装:**

```bash
claude plugin install <plugin-name>
```

**从本地安装:**

```bash
# 安装本地插件
claude plugin install ./my-plugin

# 或使用完整路径
claude plugin install /path/to/my-plugin
```

**从GitHub安装:**

```bash
# 直接从GitHub仓库安装
claude plugin install github:user/repo
```

**查看已安装 Plugins:**

```bash
claude /plugin
```

**卸载 Plugin:**

```bash
claude plugin uninstall <plugin-name>
```

### 3.4 MCP Servers(模型上下文协议服务器)

#### 什么是 MCP?

MCP (Model Context Protocol) 是 AI 的扩展接口标准,通过添加 MCP 服务器可以扩展 Claude Code 获取外部工具、资源、服务的能力。

**核心概念:**
- **Tools:** 可调用的功能
- **Resources:** 可访问的数据
- **Prompts:** 预定义的提示词模板

#### 常用 MCP 服务器

- **chrome-devtools:** Chrome 浏览器自动化
- **github:** GitHub 集成
- **postgres:** PostgreSQL 数据库
- **filesystem:** 文件系统访问
- **slack:** Slack 集成

#### MCP 安装方式

**方式一:命令行安装**

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

**方式二:配置文件安装**

编辑 `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"],
      "disabled": false
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/db"
      }
    }
  }
}
```

**验证安装:**

```bash
# 在 Claude Code 中
/mcp

# 或通过命令行
claude mcp list
claude mcp test chrome-devtools
```

#### Chrome DevTools MCP 实战

**安装:**

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

**使用示例:**

```bash
# 在 Claude Code 中
用Chrome浏览器打开 https://example.com,然后通过 chrome devtools mcp 完成以下任务:
1. 截取页面截图
2. 提取所有链接
3. 分析页面结构
4. 获取页面性能数据
```

**26个内置工具包括:**
- `chrome_navigate`: 导航到指定 URL
- `chrome_screenshot`: 截取页面截图
- `chrome_click`: 点击元素
- `chrome_fill`: 填写表单
- `chrome_select`: 选择元素
- `chrome_evaluate`: 执行 JavaScript
- 等等...

### 3.5 Subagents(子代理)

#### 什么是 Subagents?

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

#### Subagent 使用示例

**场景:完成一个功能开发**

```bash
# 主任务
我需要完成用户认证功能,请帮我:
1. 使用 code-reviewer agent 审查现有认证代码
2. 使用 test-writer agent 编写测试用例
3. 使用 doc-generator agent 更新 API 文档

这三个任务并行执行
```

Claude Code 会自动:
1. 创建三个独立的子代理
2. 分配各自的上下文(200K × 3)
3. 并行执行任务
4. 汇总结果返回

#### 实战子代理案例

来自 Claude Code 创始人 Boris Cherny 的实际使用案例:

**code-simplifier:**

```markdown
# .claude/agents/code-simplifier.md

你是一个代码精简专家。在 Claude 完成工作后,你的任务是:
1. 分析代码的复杂度和可读性
2. 识别可以简化的逻辑
3. 提供优化建议但保持功能不变
4. 优先考虑性能和可维护性
```

**verify-app:**

```markdown
# .claude/agents/verify-app.md

你是一个端到端测试专家。你的任务是验证应用功能:
1. 运行完整的测试套件
2. 检查所有关键路径
3. 验证边界情况
4. 确保用户体验"感觉对劲"
5. 如果发现问题,提供详细的修复步骤
```

**使用方式:**

```bash
# 在 Claude Code 中
使用 code-simplifier agent 优化刚才写的代码
使用 verify-app agent 验证应用是否正常工作
```

### 3.6 CLAUDE.md(项目记忆文件)

#### 什么是 CLAUDE.md?

CLAUDE.md 是 Claude Code 的"项目记忆文件",记录项目结构、构建命令、代码规范、架构决策等信息,让 Claude Code 快速理解项目上下文。

#### CLAUDE.md 的作用

- 项目上下文记忆
- 代码规范说明
- 构建命令记录
- 架构决策文档
- 团队协作指南

#### CLAUDE.md 最佳位置

**优先级:** 特定规则 > 模块配置 > 项目配置 > 用户配置

- `~/.claude/CLAUDE.md` - 用户级全局配置
- `项目根目录/CLAUDE.md` - 项目级配置
- `src/auth/CLAUDE.md` - 模块级配置
- `.claude/rules/auth.md` - 特定规则

## 四、高级功能

### 4.1 Plan 模式(规划模式)

#### 什么是 Plan 模式?

Plan 模式是一种"先规划、后执行"的工作模式,Claude 会先分析项目架构、依赖关系并起草实现方案,确认后才开始编写代码。

Anthropic 开发者关系负责人 Ado Kukic 有 90% 的时间都在使用这个模式。

**核心价值:** 在这个模式下,Claude 会阅读代码、分析架构、起草计划,但绝不修改代码。直到你批准计划,它才会动手。你是架构师,它是执行者。

#### 进入 Plan 模式

**快捷键:**

```bash
# 按两次 Shift+Tab
Shift+Tab, Shift+Tab
```

**命令方式:**

```bash
/plan
```

#### Plan 模式工作流程

1. **探索阶段**
   - 读取相关文件
   - 分析代码结构
   - 理解依赖关系

2. **规划阶段**
   - 设计实现方案
   - 列出具体步骤
   - 识别潜在风险

3. **确认阶段**
   - 展示完整计划
   - 等待用户反馈
   - 根据反馈调整

4. **执行阶段**
   - 按计划实施
   - 实时反馈进度
   - 处理异常情况

#### Plan 模式最佳实践

**适合场景:**
- ✅ 复杂功能开发(多文件、多步骤)
- ✅ 架构重构
- ✅ 性能优化
- ✅ 代码迁移
- ✅ 不熟悉的项目

**不适合场景:**
- ❌ 简单 bug 修复
- ❌ 单行代码修改
- ❌ 文档查询
- ❌ 快速原型验证

### 4.2 Sandbox 模式(沙箱模式)

#### 什么是 Sandbox 模式?

Sandbox 模式通过定义允许的操作范围,拦截危险操作,提高安全性。

**核心机制:**
- 白名单机制
- 黑名单机制
- 权限控制
- 操作审计

#### 配置 Sandbox 模式

**方式一:通过 /permissions 命令**

```bash
claude /permissions
```

**方式二:配置文件**

编辑 `~/.claude/settings.json`:

```json
{
  "permissions": {
    "allow": {
      "bash": [
        "npm install",
        "npm test",
        "npm run build",
        "git *",
        "node -v",
        "npm -v"
      ],
      "write": [
        "src/**/*",
        "tests/**/*",
        "*.md"
      ],
      "read": [
        "**/*"
      ]
    },
    "deny": {
      "bash": [
        "rm -rf *",
        "format *",
        "shutdown",
        "reboot"
      ],
      "write": [
        "node_modules/**/*",
        ".git/**/*",
        "/etc/*",
        "/usr/*"
      ]
    }
  }
}
```

## 五、实用技巧与快捷操作

### 5.1 基础操作技巧

#### 项目初始化(/init)

```bash
# 自动生成 CLAUDE.md
/init

# 或手动指定
claude /init "这是一个 Node.js + React 项目"
```

#### 快速引用上下文(@提及)

```bash
# 引用单个文件
@src/auth.ts

# 引用整个目录
@src/components/

# 引用多个文件
@src/auth.ts @src/user.ts @src/database.ts

# 引用 MCP 服务器
@mcp:github

# 模糊匹配
@auth  # 自动匹配 auth.ts, auth.controller.ts 等
```

#### 即时执行 Bash 命令(!前缀)

```bash
# 查看状态
!git status

# 运行测试
!npm test

# 查看进程
!ps aux | grep node

# 组合使用
!git diff && echo "=== Changes Summary ==="
```

#### 回退操作(双击 ESC)

```bash
ESC ESC
```

**选项:**
- 仅回退对话
- 仅回退代码
- 同时回退对话和代码

**注意:** 已执行的 Bash 命令无法回退

## 六、最佳实践

### 6.1 项目组织最佳实践

#### 目录结构规范

```
project/
├── .claude/              # Claude Code 配置
│   ├── settings.json     # 项目级设置
│   ├── agents.json       # 子代理配置
│   ├── rules/            # 模块化规则
│   │   ├── auth.md
│   │   ├── database.md
│   │   └── api.md
│   └── mcp.json          # MCP 配置
├── src/                  # 源代码
├── tests/                # 测试代码
├── docs/                 # 文档
├── CLAUDE.md             # 项目主配置
└── README.md             # 项目说明
```

## 七、实战案例

### 7.1 案例1:批量文件重命名

**需求:** 将文件夹中所有文件名改为规范的英文名称

**实现:**

```bash
# 拖拽文件夹到 Claude Code
请将文件夹中的所有文件名改成规范的英文名称,只改名字,不改序号

# Claude Code 自动:
# 1. 读取文件夹内容
# 2. 分析文件名
# 3. 批量重命名
# 4. 报告结果
```

### 7.2 案例2:自动化数据抓取

**需求:** 抓取公众号多页文章数据并导出 Excel

**实现:**

```bash
# 使用 Chrome DevTools MCP
用Chrome浏览器打开这个链接:[公众号链接]
然后通过 chrome devtools mcp 完成:
1. 获取第1、2、3页每篇文章的详细数据
2. 包括标题、阅读量、点赞量、发布时间等
3. 保存到 Excel 表格中

# Claude Code 自动:
# 1. 启动 Chrome
# 2. 导航到页面
# 3. 翻页抓取数据
# 4. 生成 Excel 报告
```

### 7.3 案例3:代码质量审查

**需求:** 审查 PR 的代码变更

**实现:**

```bash
# 使用 code-reviewer subagent
使用 code-reviewer agent 审查这个 PR:
- 代码质量
- 安全漏洞
- 性能问题
- 最佳实践

@src/ @tests/

# Claude Code 自动:
# 1. 读取所有相关文件
# 2. 应用审查标准
# 3. 生成详细报告
# 4. 提供修复建议
```

### 7.4 案例4:自动化测试生成

**需求:** 为新功能编写测试

**实现:**

```bash
# 使用 test-writer subagent
使用 test-writer agent 为用户认证功能编写测试:
- 单元测试
- 集成测试
- E2E 测试
- 边界情况测试

@src/auth.ts @src/auth.controller.ts

# Claude Code 自动:
# 1. 分析代码逻辑
# 2. 识别测试场景
# 3. 编写测试用例
# 4. 运行测试验证
```

## 八、常见问题与解决方案

### 8.1 安装问题

**Q: npm install 失败怎么办?**

A: 
1. 检查 Node.js 版本是否符合要求
2. 清除 npm 缓存: `npm cache clean --force`
3. 使用国内镜像: `npm config set registry https://registry.npmmirror.com`

### 8.2 配置问题

**Q: 环境变量配置后不生效?**

A:
1. 确认已重启终端
2. 运行 `source ~/.bashrc` 或 `source ~/.zshrc`
3. 检查环境变量是否正确设置: `echo $ANTHROPIC_BASE_URL`

### 8.3 使用问题

**Q: Claude Code 响应很慢?**

A:
1. 检查网络连接
2. 尝试切换到更快的模型
3. 减少上下文大小
4. 使用 Plan 模式分步执行

## 九、高级集成与扩展

### 9.1 LSP 集成

#### 什么是 LSP?

LSP (Language Server Protocol) 是语言服务器协议,通过集成 LSP,Claude Code 现在的代码理解能力达到了 IDE 级别。

#### LSP 的强大能力

```bash
# Claude Code 现在可以:
- 看到实时报错和警告
- 跳转到定义
- 查看类型信息
- 理解符号引用
- 分析代码结构
```

**实战案例:**

```bash
# Claude Code 可以像 IDE 一样理解代码
@src/auth.ts 这个函数的返回类型是什么?
# (Claude 会使用 LSP 查看准确的类型定义)

这个函数在哪里被调用了?
# (Claude 会使用 LSP 查找所有引用)

这里有个类型错误,怎么修复?
# (Claude 会看到实时报错并提供建议)
```

#### 配置 LSP

Claude Code 会自动检测项目中的 LSP 服务器:

```bash
# TypeScript 项目
# 自动使用 tsserver

# Python 项目
# 自动使用 pylsp

# Go 项目
# 自动使用 gopls
```

**手动配置 LSP:**

```json
// ~/.claude/settings.json
{
  "lsp": {
    "typescript": {
      "command": "typescript-language-server",
      "args": ["--stdio"]
    },
    "python": {
      "command": "pylsp",
      "args": ["--stdio"]
    }
  }
}
```

## 总结

Claude Code 真的很强,是一个强大的系统级 AI Agent,用好这个工具能为自己提高很多工作效率。

### 核心能力清单

- ✅ 系统级操作能力
- ✅ 自然语言交互
- ✅ 多任务并行处理
- ✅ 可扩展架构
- ✅ IDE 级代码理解
- ✅ 自动化工作流

### 顶级开发者的秘诀

1. **善用 Plan 模式** - 复杂任务先规划后执行
2. **配置 Hooks** - 自动化代码格式化和质量检查
3. **使用 Subagents** - 并行处理多个任务
4. **编写 CLAUDE.md** - 让 AI 理解项目上下文
5. **集成 MCP** - 扩展 AI 能力边界
6. **利用 LSP** - 获得 IDE 级代码理解

### 设计哲学

Claude Code 的设计哲学是让开发者专注于创造性工作,把重复性、机械性的工作交给 AI。通过合理配置和使用,可以大幅提升开发效率和代码质量。

---

**参考资源:**
- [Claude Code 官方文档](https://docs.anthropic.com/claude-code)
- [Skills 官方仓库](https://github.com/anthropics/skills)
- [MCP 协议文档](https://modelcontextprotocol.io)
