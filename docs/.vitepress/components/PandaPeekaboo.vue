<template>
  <div class="panda-container">
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="panda-svg">
      <defs>
        <linearGradient id="panda-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--panda-black)"></stop>
          <stop offset="100%" stop-color="var(--panda-dark)"></stop>
        </linearGradient>
        
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 爪子 (搭在边缘的感觉) -->
      <g class="paw">
        <rect x="25" y="105" width="20" height="15" rx="10" fill="url(#panda-grad)"></rect>
        <rect x="75" y="105" width="20" height="15" rx="10" fill="url(#panda-grad)"></rect>
      </g>

      <!-- 头部组 -->
      <g class="head-group">
        <!-- 耳朵 -->
        <circle cx="35" cy="40" r="12" fill="url(#panda-grad)" class="ear ear-left"></circle>
        <circle cx="85" cy="40" r="12" fill="url(#panda-grad)" class="ear ear-right"></circle>
        
        <!-- 大白脸 -->
        <circle cx="60" cy="75" r="40" fill="white" filter="url(#soft-shadow)"></circle>
        
        <!-- 黑眼圈 -->
        <ellipse cx="42" cy="78" rx="12" ry="15" fill="url(#panda-grad)" transform="rotate(-15, 42, 78)"></ellipse>
        <ellipse cx="78" cy="78" rx="12" ry="15" fill="url(#panda-grad)" transform="rotate(15, 78, 78)"></ellipse>

        <!-- 眼睛 (眼白) -->
        <circle cx="44" cy="77" r="5" fill="white"></circle>
        <circle cx="76" cy="77" r="5" fill="white"></circle>
        
        <!-- 动态瞳孔 -->
        <g class="pupils">
          <circle cx="45" cy="76" r="2.5" fill="var(--panda-dark)"></circle>
          <circle cx="77" cy="76" r="2.5" fill="var(--panda-dark)"></circle>
          <!-- 双重亮斑,更有神 -->
          <circle cx="45.5" cy="75.2" r="1" fill="white"></circle>
          <circle cx="77.5" cy="75.2" r="1" fill="white"></circle>
        </g>

        <!-- 鼻子 (倒三角小鼻子) -->
        <path d="M57 88 C57 88 60 92 63 88" stroke="var(--panda-black)" stroke-width="3" stroke-linecap="round"></path>
        
        <!-- 腮红 -->
        <circle cx="28" cy="90" r="6" fill="var(--blush)" opacity="0.5"></circle>
        <circle cx="92" cy="90" r="6" fill="var(--blush)" opacity="0.5"></circle>
      </g>
    </svg>
  </div>
</template>

<style scoped>
:root {
  --panda-black: #2c2c2e;
  --panda-dark: #1c1c1e;
  --panda-white: #ffffff;
  --blush: #ffb6c1;
}

.panda-container {
  width: 350px;
  height: 300px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 40px;
}

.panda-svg {
  width: 100%;
  height: 100%;
}

/* 探头动画 (Peekaboo) */
.head-group {
  animation: peek 6s ease-in-out infinite;
  transform-origin: bottom center;
}

@keyframes peek {
  0%, 100% { transform: translateY(60px); } /* 藏在下面 */
  20%, 80% { transform: translateY(0); }    /* 探出头来 */
}

/* 眼球转动动画 (Look Around) */
.pupils {
  animation: curious-eyes 6s ease-in-out infinite;
}

@keyframes curious-eyes {
  0%, 25%, 75%, 100% { transform: translate(0, 0); } /* 看中间 */
  35%, 45% { transform: translate(2px, -1px); }      /* 看向右上 */
  55%, 65% { transform: translate(-2px, -1px); }     /* 看向左上 */
}

/* 耳朵轻微扇动 */
.ear {
  animation: ear-shake 6s ease-in-out infinite;
}
.ear-left { transform-origin: 35px 40px; }
.ear-right { transform-origin: 85px 40px; animation-delay: 0.2s; }

@keyframes ear-shake {
  0%, 25%, 75%, 100% { transform: rotate(0deg); }
  30%, 70% { transform: rotate(-5deg); }
}

/* 爪子动画 */
.paw {
  animation: paw-move 6s ease-in-out infinite;
}

@keyframes paw-move {
  0%, 100% { transform: translateY(40px); }
  20%, 80% { transform: translateY(0); }
}
</style>
