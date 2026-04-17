# ClawBot 完整安装指南

> 📌 **推荐新教程**: [ClawBot 安装教程：从零开始到接入飞书！](https://github.com/xianyu110/openclaw-feishu)

## 📑 目录

- [简介](#简介)
- [系统要求](#系统要求)
- [安装步骤](#安装步骤)
- [配置自定义中转站](#配置自定义中转站)
- [验证和测试](#验证和测试)
- [常见踩坑点](#常见踩坑点)
- [常见问题 FAQ](#常见问题-faq)
- [常用命令](#常用命令)
- [配置文件位置](#配置文件位置)
- [安全建议](#安全建议)

---

## 🦞 简介

ClawBot 是一个开源的本地 AI 助手，支持通过消息应用 或 Web UI 与 AI 模型交互。

### 核心特点

- 🦞 **完全开源**，数据本地存储
- 💬 **支持多种消息平台**（Telegram、WhatsApp、Discord 等 12+ 平台）
- 🌐 **提供 Web 控制面板**
- 🔧 **可自定义 AI 模型和 API 端点**

---

## 💻 系统要求

### 必需条件

- **Node.js**: 22.0.0 或更高版本
- **操作系统**: macOS、Linux 或 Windows

### 可选条件

- **Xcode**（仅 macOS，如需构建原生应用）
- **消息平台账号**（Telegram Bot Token、Discord Bot 等）

---

## 📦 安装步骤

### 1. 升级 Node.js 版本

ClawBot 要求 Node.js 22+，使用 nvm 管理版本：

```bash
# 安装 Node.js 22
nvm install 22

# 设置为默认版本
nvm use 22
nvm alias default 22

# 验证版本
node --version  # 应显示 v22.x.x
```

### 2. 选择安装方式

#### 方式一：npm 安装（推荐）

```bash
npm install -g clawdbot
```

#### 方式二：一键安装脚本

```bash
curl -fsSL https://clawd.bot/install.sh | bash
```

#### 方式三：从源码安装

```bash
# 克隆仓库
git clone https://github.com/clawdbot/clawdbot.git
cd clawdbot

# 安装依赖
pnpm install

# 构建
pnpm build

# 链接 CLI
npm link
```

### 3. 初始化配置

安装完成后运行配置向导：

```bash
clawdbot onboard
```

#### 配置向导流程

##### 步骤 1：安全确认

```
◇ Security ───────────────────────────────────────────────────────╮
│ Clawdbot agents can run commands, read/write files, and act    │
│ through any tools you enable.                                   │
│ Please read: https://docs.clawd.bot/security                    │
├──────────────────────────────────────────────────────────────────╯
◇ I understand this is powerful and inherently risky. Continue?
│ Yes
```

##### 步骤 2：选择 AI 后端

```
◇ Model/auth provider
│ Anthropic
◆ Anthropic auth method
│ ● Anthropic token (paste setup-token) ← 推荐 Claude Max 用户
│ ○ Anthropic token (Claude Code CLI)
│ ○ Anthropic API key
```

**认证方式对比：**

| 认证方式 | 适用人群 | 费用 | 获取方式 |
|---------|---------|------|---------|
| setup-token | Claude Max 订阅用户 | 包含在订阅中 | `claude setup-token` |
| Claude Code CLI | Claude Code 用户 | 包含在订阅中 | 自动获取 |
| API Key | API 付费用户 | 按使用量付费 | Anthropic 控制台 |

##### 步骤 3：生成 setup-token（Claude Max 用户）

在另一个终端运行：

```bash
claude setup-token
```

复制生成的 token，粘贴到配置向导中：

```
◇ Paste Anthropic setup-token
│ sk-ant-oat01-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...
◇ Token name (blank = default)
│ default
◇ Default model
│ Keep current (default: anthropic/claude-opus-4-5)
```

> 💡 **提示**: Claude Max 订阅用户不需要单独购买 API Key，使用 setup-token 即可复用订阅额度。

##### 步骤 4：配置消息平台（可选）

```
◇ Channel status ────────────────────────────╮
│ Telegram: not configured                   │
│ WhatsApp: not configured                   │
│ Discord: not configured                    │
│ ...共支持 12+ 平台                          │
├─────────────────────────────────────────────╯
◇ Select channel (QuickStart)
│ Telegram (Bot API)
```

**获取 Telegram Bot Token：**

1. 在 Telegram 中搜索 `@BotFather`
2. 发送 `/newbot`
3. 按提示输入 Bot 名称和用户名
4. 复制 Bot Token

##### 步骤 5：完成配置

```
◇ Telegram: ok (@YourBotName) (1416ms)
  Agents: main (default)
  Heartbeat interval: 1h (main)
◇ Control UI ─────────────────────────────────────────────────────╮
│ Web UI: http://127.0.0.1:18789/                                 │
│ Web UI (with token): http://127.0.0.1:18789/?token=your-token   │
│ Gateway WS: ws://127.0.0.1:18789                                │
├──────────────────────────────────────────────────────────────────╯
└ Onboarding complete.
```


### 2. 访问 Web UI

打开浏览器访问：

```
http://127.0.0.1:18789/?token=你的token
```

**Web UI 功能：**

- 💬 **Chat**: 直接与 AI 对话
- 📊 **Overview**: 查看系统状态
- 🔌 **Channels**: 管理消息通道
- ⚙️ **Config**: 修改配置

### 3. 发送测试消息

在 Web UI 的 Chat 界面：

1. 输入消息：`Hello, can you hear me?`
2. 点击 Send 按钮
3. 等待 AI 回复

**预期结果：**

- 状态显示 "Health OK"
- 收到 AI 的回复消息
- 右上角显示 token 使用情况


## ⚠️ 常见踩坑点

### ❌ 踩坑 1：环境变量配置无效

**错误做法：**

```xml
<!-- 在 LaunchAgent 中设置环境变量（无效！） -->
<key>ANTHROPIC_BASE_URL</key>
<string>https://code.claude-opus.top/api</string>
```

**问题原因**: ClawBot 不支持通过 `ANTHROPIC_BASE_URL` 环境变量来设置自定义 API 端点。

**✅ 正确做法**: 在 `~/.clawdbot/clawdbot.json` 配置文件中添加：

```json
{
  "models": {
    "providers": {
      "anthropic": {
        "baseUrl": "https://code.claude-opus.top/api",
        "apiKey": "cr_你的密钥",
        "api": "anthropic-messages",
        "models": []
      }
    }
  }
}
```

### ❌ 踩坑 2：缺少 models 字段

**错误配置：**

```json
{
  "models": {
    "providers": {
      "anthropic": {
        "baseUrl": "https://code.claude-opus.top/api",
        "apiKey": "cr_xxx",
        "api": "anthropic-messages"
        // 缺少 models 字段！
      }
    }
  }
}
```

**错误信息：**

```
Invalid config at ~/.clawdbot/clawdbot.json:
- models.providers.anthropic.models: Invalid input: expected array
```

**✅ 正确做法**: 必须包含 `models` 字段，即使是空数组：

```json
{
  "models": {
    "providers": {
      "anthropic": {
        "baseUrl": "https://code.claude-opus.top/api",
        "apiKey": "cr_xxx",
        "api": "anthropic-messages",
        "models": []  // 必须有这一行！
      }
    }
  }
}
```


### ❌ 踩坑 ：Node.js 版本过低

**错误信息：**

```
clawdbot requires Node >=22.0.0. Detected: node 20.19.0
```

**✅ 解决方案：**

```bash
nvm install 22
nvm use 22
nvm alias default 22
node --version  # 应显示 v22.x.x
```

### ❌ 踩坑 ：中转 API 需要特定 User-Agent

**症状**: API 返回 403 错误，提示 "本服务仅限 Claude Code 官方客户端使用"

**问题原因**: 某些中转站要求特定的 User-Agent header。

**✅ 解决方案**: 在模型配置中添加 `headers` 字段：

```json
{
  "models": {
    "providers": {
      "code-claude-opus": {
        "baseUrl": "https://code.claude-opus.top/api",
        "apiKey": "cr_你的密钥",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "claude-opus-4-20250514",
            "name": "Claude Opus 4",
            "headers": {
              "User-Agent": "Claude-Code/1.0.0"
            },
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```

### ❌ 踩坑 6：忘记重启 Gateway

**问题**: 修改配置后没有重启 Gateway，配置不生效。

**✅ 解决方案：**

```bash
# 每次修改配置后都要重启
clawdbot gateway restart

```

---


### Q3: Assistant 不回复消息

**症状：**

- Web UI 发送消息后无响应
- 日志显示请求完成但耗时很短（< 1 秒）
- 没有错误信息

**解决方案：**

1. 确认使用配置文件方式（见"配置自定义中转站"章节）
2. 检查配置文件格式正确
3. 重启 Gateway
4. 在 Web UI 中发送测试消息

### Q4: 如何查看详细日志？

```bash
# Gateway 主日志
tail -f ~/.clawdbot/logs/gateway.log

# 错误日志
tail -f ~/.clawdbot/logs/gateway.err.log

# 详细调试日志（JSON 格式）
tail -f /tmp/clawdbot/clawdbot-$(date +%Y-%m-%d).log

# 过滤错误信息
tail -f /tmp/clawdbot/clawdbot-$(date +%Y-%m-%d).log | grep -i "error\|fail"
```

### Q5: 如何完全重置配置？

```bash
# 1. 备份当前配置
cp -r ~/.clawdbot ~/.clawdbot.backup

# 2. 停止 Gateway
clawdbot gateway stop

# 3. 删除配置
rm -rf ~/.clawdbot

# 4. 重新运行配置向导
clawdbot onboard
```

---

## 🛠️ 常用命令

### Gateway 管理

```bash
# 查看状态
clawdbot channels status

# 深度检查
clawdbot channels status --deep

# 重启 Gateway
clawdbot gateway restart

# 停止 Gateway
launchctl unload ~/Library/LaunchAgents/com.clawdbot.gateway.plist

# 启动 Gateway
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.clawdbot.gateway.plist
```

### 配置管理

```bash
# 交互式配置
clawdbot configure

# 配置特定部分
clawdbot configure --section gateway
clawdbot configure --section channels
clawdbot configure --section model

# 设置配置项
clawdbot config set gateway.mode local
clawdbot config set channels.telegram.enabled false

# 查看配置
cat ~/.clawdbot/clawdbot.json
```

### 日志查看

```bash
# Gateway 主日志
tail -f ~/.clawdbot/logs/gateway.log

# 错误日志
tail -f ~/.clawdbot/logs/gateway.err.log

# 详细日志（JSON 格式）
tail -f /tmp/clawdbot/clawdbot-$(date +%Y-%m-%d).log
```

### 诊断工具

```bash
# 运行诊断
clawdbot doctor

# 自动修复问题
clawdbot doctor --fix

# 安全审计
clawdbot security audit --deep
```

### Web UI

```bash
# 打开 Web UI（浏览器）
clawdbot dashboard

# 获取带 token 的 URL（不打开浏览器）
clawdbot dashboard --no-open
```

### TUI（终端界面）

```bash
# 启动 TUI
clawdbot tui

# TUI 快捷键
# Ctrl+C: 退出
# Enter: 发送消息
# Shift+Enter: 换行
```

### 更新

```bash
# 从源码更新
cd /path/to/clawdbot
git pull --rebase
pnpm install
pnpm build
clawdbot gateway restart

# 从 npm 更新（全局安装）
npm install -g clawdbot@latest
```

---

## 📂 配置文件位置

| 文件 | 路径 | 说明 |
|-----|------|------|
| 主配置文件 | `~/.clawdbot/clawdbot.json` | 包含所有核心配置 |
| 鉴权配置 | `~/.clawdbot/agents/main/agent/auth-profiles.json` | API 密钥和认证信息 |
| Gateway 日志 | `~/.clawdbot/logs/gateway.log` | Gateway 主日志 |
| 错误日志 | `~/.clawdbot/logs/gateway.err.log` | Gateway 错误日志 |
| 详细日志 | `/tmp/clawdbot/clawdbot-YYYY-MM-DD.log` | 详细调试日志 |
| LaunchAgent | `~/Library/LaunchAgents/com.clawdbot.gateway.plist` | macOS 自动启动配置 |

---

## 🔒 安全建议

### 1. 保护 API Key

```bash
# 设置配置文件权限
chmod 600 ~/.clawdbot/clawdbot.json
chmod 600 ~/.clawdbot/agents/main/agent/auth-profiles.json

# 不要将 API Key 提交到 Git
echo ".clawdbot/" >> ~/.gitignore
```

### 2. Gateway Token

- 定期更换 Gateway token
- 不要在公共网络上暴露 Gateway 端口
- 使用强随机 token

### 3. 网络安全

```bash
# 仅允许本地访问（推荐）
clawdbot config set gateway.bind loopback

# 如需远程访问，使用 SSH 隧道
ssh -L 18789:localhost:18789 user@remote-host
```

### 4. 数据备份

```bash
# 定期备份配置
cp -r ~/.clawdbot ~/.clawdbot.backup-$(date +%Y%m%d)

# 备份重要对话
cp -r ~/.clawdbot/agents/main/conversations ~/backups/
```

---

## 📚 参考资源

- **官方文档**: [https://docs.clawd.bot](https://docs.clawd.bot)
- **GitHub 仓库**: [https://github.com/clawdbot/clawdbot](https://github.com/clawdbot/clawdbot)
- **安全指南**: [https://docs.clawd.bot/security](https://docs.clawd.bot/security)
- **飞书接入教程**: [https://github.com/xianyu110/openclaw-feishu](https://github.com/xianyu110/openclaw-feishu)

---

## 📝 总结

### 关键要点

1. ✅ 必须使用 **Node.js 22+**
2. ✅ 通过 **配置文件** 而非环境变量设置 API 端点
3. ✅ `models` 字段必须存在（即使为空数组）
4. ✅ 每次修改配置后必须 **重启 Gateway**
5. ✅ 某些中转站需要特定的 **User-Agent**

### 快速参考

```bash
# 安装
npm install -g clawdbot

# 配置
clawdbot onboard

# 重启
clawdbot gateway restart

# 状态检查
clawdbot channels status

# 打开 Web UI
clawdbot dashboard
```

---

🎉 **祝你使用愉快！**
