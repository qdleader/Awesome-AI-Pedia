<template>
  <div>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
        /* 探头动画 (Peekaboo) */
        .head-group {
            animation: peek 6s ease-in-out infinite;
            transform-origin: bottom center;
        }

        @keyframes peek {
            0%, 100% { transform: translateY(60px); }
            20%, 80% { transform: translateY(0); }
        }

        /* 眼球转动动画 (Look Around) */
        .pupils {
            animation: curious-eyes 6s ease-in-out infinite;
        }

        @keyframes curious-eyes {
            0%, 25%, 75%, 100% { transform: translate(0, 0); }
            35%, 45% { transform: translate(2px, -1px); }
            55%, 65% { transform: translate(-2px, -1px); }
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

    <defs>
        <linearGradient id="panda-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2c2c2e"></stop>
            <stop offset="100%" stop-color="#1c1c1e"></stop>
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

    <!-- 爪子 -->
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

        <!-- 眼睛 (眼球) -->
        <circle cx="44" cy="77" r="5" fill="white"></circle>
        <circle cx="76" cy="77" r="5" fill="white"></circle>
        
        <!-- 动态瞳孔 -->
        <g class="pupils">
            <circle cx="45" cy="76" r="2.5" fill="#1c1c1e"></circle>
            <circle cx="77" cy="76" r="2.5" fill="#1c1c1e"></circle>
            <!-- 眼神亮斑 -->
            <circle cx="45.5" cy="75.2" r="1" fill="white"></circle>
            <circle cx="77.5" cy="75.2" r="1" fill="white"></circle>
        </g>

        <!-- 鼻子 -->
        <path d="M57 88 C57 88 60 92 63 88" stroke="#2c2c2e" stroke-width="3" stroke-linecap="round"></path>
        
        <!-- 腮红 -->
        <circle cx="28" cy="90" r="6" fill="#ffb6c1" opacity="0.5"></circle>
        <circle cx="92" cy="90" r="6" fill="#ffb6c1" opacity="0.5"></circle>
    </g>
</svg>
  </div>

</template>
