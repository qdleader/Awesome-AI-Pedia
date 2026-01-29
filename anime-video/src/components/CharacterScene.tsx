import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

export const CharacterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  // 角色入场动画
  const characterSpring = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 80,
      stiffness: 100,
    },
  });

  const characterX = interpolate(characterSpring, [0, 1], [-300, 0]);
  const characterRotation = interpolate(characterSpring, [0, 1], [-15, 0]);

  // 光晕效果
  const glowOpacity = interpolate(
    Math.sin((frame / 15) * Math.PI),
    [-1, 1],
    [0.3, 0.8]
  );

  // 能量波纹
  const rippleScale = interpolate(frame % 60, [0, 60], [0.8, 1.5], {
    easing: Easing.out(Easing.cubic),
  });
  const rippleOpacity = interpolate(frame % 60, [0, 60], [0.8, 0], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 背景星星 */}
      {Array.from({length: 100}).map((_, i) => {
        const x = (i * 137.5) % width;
        const y = (i * 197.3) % height;
        const twinkle = Math.sin((frame + i * 10) / 20);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 2,
              height: 2,
              borderRadius: '50%',
              backgroundColor: '#fff',
              opacity: 0.3 + twinkle * 0.3,
            }}
          />
        );
      })}

      {/* 角色容器 */}
      <div
        style={{
          transform: `translateX(${characterX}px) rotate(${characterRotation}deg)`,
          position: 'relative',
        }}
      >
        {/* 能量波纹 */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            borderRadius: '50%',
            border: '3px solid #00d4ff',
            opacity: rippleOpacity,
          }}
        />

        {/* 角色主体 - 简化的动漫风格人物 */}
        <svg width="300" height="400" viewBox="0 0 300 400">
          {/* 光晕 */}
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="url(#glow)"
            opacity={glowOpacity}
          />

          {/* 头部 */}
          <ellipse cx="150" cy="100" rx="80" ry="90" fill="#ffd6a5" />

          {/* 眼睛 */}
          <ellipse cx="120" cy="90" rx="15" ry="20" fill="#2d3561" />
          <ellipse cx="180" cy="90" rx="15" ry="20" fill="#2d3561" />
          <circle cx="125" cy="88" r="5" fill="#fff" />
          <circle cx="185" cy="88" r="5" fill="#fff" />

          {/* 嘴巴 */}
          <path
            d="M 130 120 Q 150 130 170 120"
            stroke="#ff6b9d"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* 头发 */}
          <path
            d="M 70 100 Q 70 30 150 20 Q 230 30 230 100"
            fill="#4a5568"
          />
          <path
            d="M 80 80 Q 90 40 120 50"
            fill="#4a5568"
          />
          <path
            d="M 220 80 Q 210 40 180 50"
            fill="#4a5568"
          />

          {/* 身体 */}
          <rect x="100" y="180" width="100" height="150" rx="20" fill="#667eea" />

          {/* 手臂 */}
          <ellipse
            cx="80"
            cy="220"
            rx="20"
            ry="60"
            fill="#667eea"
            transform="rotate(-20 80 220)"
          />
          <ellipse
            cx="220"
            cy="220"
            rx="20"
            ry="60"
            fill="#667eea"
            transform="rotate(20 220 220)"
          />

          {/* 能量光效 */}
          <circle cx="80" cy="250" r="15" fill="#00d4ff" opacity="0.6">
            <animate
              attributeName="r"
              values="15;20;15"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="220" cy="250" r="15" fill="#00d4ff" opacity="0.6">
            <animate
              attributeName="r"
              values="15;20;15"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>

          {/* 渐变定义 */}
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* 角色名称 */}
        <div
          style={{
            marginTop: 30,
            textAlign: 'center',
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#00d4ff',
              margin: 0,
              textShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
              fontFamily: 'Arial Black, sans-serif',
            }}
          >
            英雄登场
          </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};
