# heygen-com/skills

`heygen-com/skills` 是由 HeyGen 官方提供的 AI Agent Skill 集合。HeyGen 是全球领先的 AI 数字人视频生成平台，通过这些 Skill，开发者可以让 AI 直接调用 HeyGen API 来创作高质量的虚拟人物视频。

---

## 🚀 快速开始

### 安装方式
在你的项目终端中运行：
```bash
npx skills add heygen-com/skills
```

### 使用前提
使用此 Skill 需要在环境变量中配置 HeyGen API Key：
```bash
export HEYGEN_API_KEY=你的API密钥
```

---

## 核心技能列表

该仓库包含了多个针对不同场景优化的子技能：

1.  **`heygen` (主技能)**：全功能 API 技能，支持视频生成、文本转语音、翻译等。
2.  **`text-to-speech`**：专门用于将文本转换为语音（基于 Starfish TTS 模型），适用于播客或配音。
3.  **`video-translate`**：专注于视频翻译和自动配音，保留原视频风格的同时进行多语言转换。
4.  **`heygen-best-practices`**：知识库型技能，提供编写 HeyGen API 代码时的最佳实践指南。

---

## 主要功能特性

- **超写实数字人**：支持 500+ 精选数字人形象，涵盖不同年龄、性别和职业风格。
- **声音克隆与合成**：支持 300+ 种声音，复盖 175+ 种语言，支持情感化语音输出及自定义声音克隆。
- **程序化视频生成**：支持与 Remotion 集成，实现自动化的视频合成流。
- **透明背景视频**：可生成带有透明通道的数字人视频，方便后期合成。

---

## 使用场景

- **自动化内容创作**：批量生成产品介绍、新闻播报或教学视频。
- **个性化视频营销**：为不同客户生成定制化的数字人问候视频。
- **多语言本地化**：快速将现有视频翻译成多种语言并保持口型同步。

---

**官方仓库**：[heygen-com/skills](https://github.com/heygen-com/skills)