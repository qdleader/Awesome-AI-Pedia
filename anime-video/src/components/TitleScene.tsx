import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

interface TitleSceneProps {
  title: string;
  subtitle: string;
}

export const TitleScene: React.FC<TitleSceneProps> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  // 标题动画 - 弹簧效果
  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 副标题动画 - 延迟出现
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleY = interpolate(frame, [30, 50], [50, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 背景粒子动画
  const particles = Array.from({length: 50}, (_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    const distance = interpolate(frame, [0, 60], [0, 300], {
      extrapolateRight: 'clamp',
    });
    const x = width / 2 + Math.cos(angle) * distance;
    const y = height / 2 + Math.sin(angle) * distance;
    const opacity = interpolate(frame, [0, 30, 60], [0, 1, 0], {
      extrapolateRight: 'clamp',
    });

    return {x, y, opacity, size: 3 + (i % 5)};
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 背景粒子效果 */}
      {particles.map((particle, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: '#fff',
            opacity: particle.opacity,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}

      {/* 主标题 */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#fff',
            margin: 0,
            textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.1em',
            fontFamily: 'Arial Black, sans-serif',
          }}
        >
          {title}
        </h1>

        {/* 副标题 */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 30,
          }}
        >
          <h2
            style={{
              fontSize: 48,
              fontWeight: 300,
              color: '#fff',
              margin: 0,
              textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.2em',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {subtitle}
          </h2>
        </div>
      </div>

      {/* 装饰线条 */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: interpolate(frame, [40, 70], [0, 600], {
            extrapolateRight: 'clamp',
          }),
          height: 4,
          background: 'linear-gradient(90deg, transparent, #fff, transparent)',
          opacity: interpolate(frame, [40, 70], [0, 0.8], {
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};
