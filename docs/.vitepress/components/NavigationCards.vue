<template>
  <div class="nav-cards-container">
    <div 
      v-for="card in navigationCards" 
      :key="card.category"
      class="nav-card" 
      :data-category="card.category"
    >
      <div class="nav-card-icon">{{ card.icon }}</div>
      <div class="nav-card-content">
        <h3 class="nav-card-title">{{ card.title }}</h3>
        <p class="nav-card-desc">{{ card.description }}</p>
        <a :href="card.link" class="nav-card-link">
          <span>探索更多</span>
          <svg class="nav-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      <div class="nav-card-bg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigationCards = [
  {
    category: 'claudecode',
    icon: '🤖',
    title: 'Claude Code',
    description: 'Claude AI编码助手的使用技巧和配置',
    link: '/Awesome-AI-Pedia/ai/claudecode/'
  },
  {
    category: 'cursor',
    icon: '🎯',
    title: 'Cursor',
    description: 'Cursor AI编辑器的使用方法和最佳实践',
    link: '/Awesome-AI-Pedia/ai/cursor/'
  },
  {
    category: 'prompt',
    icon: '💬',
    title: 'Prompt',
    description: '提示词工程和优化技巧',
    link: '/Awesome-AI-Pedia/ai/prompt/'
  },
  {
    category: 'mcp',
    icon: '🔌',
    title: 'MCP',
    description: '模型上下文协议相关资源',
    link: '/Awesome-AI-Pedia/ai/mcp/'
  },
  {
    category: 'rules',
    icon: '📋',
    title: 'Rules',
    description: '各种AI编码规则和最佳实践',
    link: '/Awesome-AI-Pedia/ai/rules/'
  },
  {
    category: 'skills',
    icon: '🛠️',
    title: 'Skills',
    description: 'AI技能集合和实用工具',
    link: '/Awesome-AI-Pedia/ai/skills/'
  }
]
</script>

<style scoped>
/* Navigation Cards Container */
.nav-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 0 1rem;
}

/* Navigation Card */
.nav-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--vp-c-divider);
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    var(--vp-c-brand-1) 0%, 
    var(--vp-c-brand-2) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.nav-card:hover::before {
  opacity: 0.05;
}

.nav-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--vp-c-brand-1);
}

/* Background Gradient */
.nav-card-bg {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, 
    var(--vp-c-brand-1) 0%, 
    transparent 70%);
  opacity: 0;
  transition: all 0.6s ease;
  z-index: 0;
}

.nav-card:hover .nav-card-bg {
  opacity: 0.08;
  transform: translate(-25%, -25%);
}

/* Card Icon */
.nav-card-icon {
  position: relative;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  filter: grayscale(0.3);
}

.nav-card:hover .nav-card-icon {
  transform: scale(1.15) rotate(5deg);
  filter: grayscale(0) drop-shadow(0 4px 8px rgba(100, 108, 255, 0.3));
}

/* Card Content */
.nav-card-content {
  position: relative;
  z-index: 1;
}

.nav-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  transition: color 0.3s ease;
}

.nav-card:hover .nav-card-title {
  color: var(--vp-c-brand-1);
}

.nav-card-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 1.5rem 0;
  transition: color 0.3s ease;
}

.nav-card:hover .nav-card-desc {
  color: var(--vp-c-text-1);
}

/* Card Link */
.nav-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-card-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.nav-card:hover .nav-card-link::after {
  width: calc(100% - 28px);
}

.nav-card-link span {
  transition: transform 0.3s ease;
}

.nav-card:hover .nav-card-link span {
  transform: translateX(4px);
}

/* Arrow Icon */
.nav-card-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.nav-card:hover .nav-card-arrow {
  transform: translateX(6px);
  animation: arrowBounce 0.6s ease infinite;
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateX(6px);
  }
  50% {
    transform: translateX(10px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-cards-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
  }
  
  .nav-card {
    padding: 1.5rem;
  }
  
  .nav-card-icon {
    font-size: 3rem;
  }
  
  .nav-card-title {
    font-size: 1.3rem;
  }
}

/* Dark Mode Enhancements */
.dark .nav-card {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

.dark .nav-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.dark .nav-card:hover::before {
  opacity: 0.1;
}
</style>
