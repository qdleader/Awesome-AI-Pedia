<template>
  <!-- 小清新装饰层 -->
  <div class="fresh-decorations">
    <!-- 浮动气泡 -->
    <div class="floating-bubbles">
      <div class="bubble" style="left: 10%; width: 60px; height: 60px; animation-delay: 0s;"></div>
      <div class="bubble" style="left: 20%; width: 40px; height: 40px; animation-delay: 2s;"></div>
      <div class="bubble" style="left: 35%; width: 80px; height: 80px; animation-delay: 4s;"></div>
      <div class="bubble" style="left: 50%; width: 50px; height: 50px; animation-delay: 1s;"></div>
      <div class="bubble" style="left: 65%; width: 35px; height: 35px; animation-delay: 3s;"></div>
      <div class="bubble" style="left: 80%; width: 55px; height: 55px; animation-delay: 5s;"></div>
      <div class="bubble" style="left: 90%; width: 45px; height: 45px; animation-delay: 2.5s;"></div>
    </div>

    <!-- 粒子效果 -->
    <div class="particles">
      <div class="particle" style="left: 15%; top: 20%; animation-delay: 0s;"></div>
      <div class="particle" style="left: 25%; top: 40%; animation-delay: 0.5s;"></div>
      <div class="particle" style="left: 45%; top: 30%; animation-delay: 1s;"></div>
      <div class="particle" style="left: 55%; top: 60%; animation-delay: 1.5s;"></div>
      <div class="particle" style="left: 70%; top: 25%; animation-delay: 2s;"></div>
      <div class="particle" style="left: 85%; top: 50%; animation-delay: 2.5s;"></div>
      <div class="particle" style="left: 30%; top: 70%; animation-delay: 0.8s;"></div>
      <div class="particle" style="left: 60%; top: 15%; animation-delay: 1.8s;"></div>
      <div class="particle" style="left: 75%; top: 65%; animation-delay: 2.2s;"></div>
      <div class="particle" style="left: 40%; top: 45%; animation-delay: 1.2s;"></div>
    </div>
  </div>
</template>

<style scoped>
/* 装饰层容器 */
.fresh-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* 浮动气泡 */
.floating-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bubble {
  position: absolute;
  bottom: -100px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.4) 0%,
    rgba(224, 247, 250, 0.3) 100%
  );
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 8px 32px rgba(100, 108, 255, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  animation: floatUp 20s infinite ease-in-out;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) translateX(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50vh) translateX(20px) scale(1);
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) translateX(-20px) scale(0.8);
    opacity: 0;
  }
}

/* 粒子效果 */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, 
    rgba(100, 108, 255, 0.8) 0%,
    rgba(116, 123, 255, 0.4) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
  box-shadow: 0 0 10px rgba(100, 108, 255, 0.5);
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0;
    transform: scale(0.5);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 暗黑模式适配 */
.dark .fresh-decorations {
  opacity: 0.6;
}

.dark .bubble {
  background: linear-gradient(135deg, 
    rgba(100, 108, 255, 0.2) 0%,
    rgba(116, 123, 255, 0.15) 100%
  );
  border-color: rgba(100, 108, 255, 0.3);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .bubble {
    animation-duration: 15s;
  }
}
</style>
