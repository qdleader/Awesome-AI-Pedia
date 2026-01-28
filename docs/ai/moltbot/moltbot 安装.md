# MoltBot 安装

## 下载

```ts
curl -fsSL https://molt.bot/install.sh | bash

```

启动 MoltBot
安装完成后，你可以运行 MoltBot 的命令行界面：

clawdbot
建议首先运行引导式设置（推荐）：

clawdbot onboard
这个引导会帮你自动配置：

选择模型、授权方式

设置消息渠道（如 Telegram/WhatsApp）

初始化工作空间和技能

 

如果你不想使用 CLI 引导，可以手动运行：

clawdbot setup

clawdbot gateway
启动本地 Gateway 后，Clawdbot 的本地控制面板通常会在浏览器打开：
```js
http://127.0.0.1:18789
```

## 初始配置

运行以下命令启动配置向导：

```ts
clawdbot onboard
```