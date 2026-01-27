---
layout: home
hero:
  name: Awesome AI Pedia
  text: AI知识库与博客
  tagline: 探索AI的无限可能，分享开发经验与技术洞察
  actions:
    - theme: brand
      text: 浏览知识库
      link: /ai/
    - theme: alt
      text: 查看博客
      link: /blog/
    - theme: alt
      text: 使用指南
      link: /guide/
features:
  - icon: 📚
    title: 11个AI分类
    details: 涵盖Claude Code、Cursor、MCP、Prompt、Rules等全方位AI知识
  - icon: 🚀
    title: 现代化技术栈
    details: 基于VitePress构建，支持Markdown、代码高亮、暗黑模式
  - icon: 💡
    title: 实战经验分享
    details: 从实际项目出发，提供可落地的解决方案
  - icon: 🔄
    title: 自动目录映射
    details: 新增目录自动生成侧边栏，无需手动配置
---

<div class="lobster-animation-container">
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="lobster-svg">
    <!-- Lobster Claw Silhouette -->
    <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#lobster-gradient)" class="claw-body"></path>
    <!-- Left Claw -->
    <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#lobster-gradient)" class="claw-left"></path>
    <!-- Right Claw -->
    <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#lobster-gradient)" class="claw-right"></path>
    <!-- Antenna -->
    <path d="M45 15 Q35 5 30 8" stroke="var(--vp-c-brand-1, #646cff)" stroke-width="2" stroke-linecap="round" class="antenna antenna-left"></path>
    <path d="M75 15 Q85 5 90 8" stroke="var(--vp-c-brand-1, #646cff)" stroke-width="2" stroke-linecap="round" class="antenna antenna-right"></path>
    <!-- Eyes -->
    <circle cx="45" cy="35" r="6" fill="var(--vp-c-bg, #ffffff)" class="eye"></circle>
    <circle cx="75" cy="35" r="6" fill="var(--vp-c-bg, #ffffff)" class="eye"></circle>
    <circle cx="46" cy="34" r="2" fill="var(--vp-c-brand-1, #646cff)" class="eye-glow"></circle>
    <circle cx="76" cy="34" r="2" fill="var(--vp-c-brand-1, #646cff)" class="eye-glow"></circle>
    <defs>
      <linearGradient id="lobster-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--vp-c-brand-1, #646cff)"></stop>
        <stop offset="100%" stop-color="var(--vp-c-brand-2, #747bff)"></stop>
      </linearGradient>
    </defs>
  </svg>
</div>

## 快速导航

<div class="blog-grid">

<div class="blog-card">
  <div class="blog-card-title">🤖 Claude Code</div>
  <div class="blog-card-desc">Claude AI编码助手的使用技巧和配置</div>
  <a href="/Awesome-AI-Pedia/ai/claudecode/" class="blog-card-link">查看 →</a>
</div>

<div class="blog-card">
  <div class="blog-card-title">🎯 Cursor</div>
  <div class="blog-card-desc">Cursor AI编辑器的使用方法和最佳实践</div>
  <a href="/Awesome-AI-Pedia/ai/cursor/" class="blog-card-link">查看 →</a>
</div>

<div class="blog-card">
  <div class="blog-card-title">💬 Prompt</div>
  <div class="blog-card-desc">提示词工程和优化技巧</div>
  <a href="/Awesome-AI-Pedia/ai/prompt/" class="blog-card-link">查看 →</a>
</div>

<div class="blog-card">
  <div class="blog-card-title">🔌 MCP</div>
  <div class="blog-card-desc">模型上下文协议相关资源</div>
  <a href="/Awesome-AI-Pedia/ai/mcp/" class="blog-card-link">查看 →</a>
</div>

<div class="blog-card">
  <div class="blog-card-title">📋 Rules</div>
  <div class="blog-card-desc">各种AI编码规则和最佳实践</div>
  <a href="/Awesome-AI-Pedia/ai/rules/" class="blog-card-link">查看 →</a>
</div>

<div class="blog-card">
  <div class="blog-card-title">🛠️ Skills</div>
  <div class="blog-card-desc">AI技能集合和实用工具</div>
  <a href="/Awesome-AI-Pedia/ai/skills/" class="blog-card-link">查看 →</a>
</div>

</div>

<style>
/* Lobster Animation Container */
.lobster-animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.lobster-svg {
  width: 120px;
  height: 120px;
  animation: float 3s ease-in-out infinite;
}

/* Floating animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Claw animations */
.claw-left {
  transform-origin: 20px 50px;
  animation: clawLeft 2s ease-in-out infinite;
}

.claw-right {
  transform-origin: 100px 50px;
  animation: clawRight 2s ease-in-out infinite;
}

@keyframes clawLeft {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-15deg);
  }
}

@keyframes clawRight {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
}

/* Antenna animations */
.antenna-left {
  transform-origin: 45px 15px;
  animation: antennaLeft 1.5s ease-in-out infinite;
}

.antenna-right {
  transform-origin: 75px 15px;
  animation: antennaRight 1.5s ease-in-out infinite;
}

@keyframes antennaLeft {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-10deg);
  }
}

@keyframes antennaRight {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

/* Eye glow animation */
.eye-glow {
  animation: eyeBlink 2s ease-in-out infinite;
}

@keyframes eyeBlink {
  0%, 90%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  95% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

/* Blog card styles */
.blog-card-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.blog-card-link:hover {
  text-decoration: underline;
}
</style>
