<template>
  <!-- 波浪分隔线 -->
  <div class="wave-divider">
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(180,225,255,0.7)" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(180,225,255,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(180,225,255,0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(180,225,255,1.0)" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 波浪分隔线 */
.wave-divider {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  height: 120px;
  background: transparent;
  margin-bottom: -1px; /* 防止缝隙 */
  overflow: hidden;
}

.waves {
  position: absolute;
  width: 100%;
  height: 120px;
  bottom: 0px; 
  left: 0;
}

/* 视差动画 */
.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .wave-divider {
    height: 60px;
  }
  
  .waves {
    height: 60px;
  }
}

/* 暗黑模式适配 */
.dark .parallax > use:nth-child(1) { fill: rgba(180, 225, 255, 0.3); }
.dark .parallax > use:nth-child(2) { fill: rgba(180, 225, 255, 0.2); }
.dark .parallax > use:nth-child(3) { fill: rgba(180, 225, 255, 0.1); }
.dark .parallax > use:nth-child(4) { fill: rgba(180, 225, 255, 0.4); }
</style>
