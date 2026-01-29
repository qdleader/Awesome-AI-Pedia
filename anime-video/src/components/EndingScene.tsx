import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  // 文字弹簧动画
  const textSpring = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const textScale = interpolate(textSpring, [0, 1], [0.5, 1]);
  const textOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 感谢文字
  const thanksOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 星星雨效果
  const stars = Array.from({length: 100}, (_, i) => {
    const x = (i * 137.5) % width;
    const startY = -50 - (i * 23) % 200;
    const y = startY + (frame * 5) % (height + 200);
    const opacity = interpolate(y, [0, height], [0, 1, 0]);
    return {x, y, opacity, size: 2 + (i % 4)};
  });

  // 彩虹渐变背景
  const gradientRotation = (frame * 2) % 360;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientRotation}deg, #ee7752 0%, #e73c7e 25%, #23a6d5 50%, #23d5ab 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 星星雨 */}
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            backgroundColor: '#fff',
            opacity: star.opacity,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}

      {/* 主要内容 */}
      <div
        style={{
          transform: `scale(${textScale})`,
          opacity: textOpacity,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* 完结文字 */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.5)',
            fontFamily: 'Arial Black, sans-serif',
            marginBottom: 40,
          }}
        >
          完
        </div>

        {/* 感谢观看 */}
        <div
          style={{
            opacity: thanksOpacity,
          }}
        >
          <h2
            style={{
              fontSize: 48,
              fontWeight: 300,
              color: '#fff',
              margin: 0,
              textShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.3em',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            感谢观看
          </h2>
        </div>

        {/* 装饰圆环 */}
        {Array.from({length: 3}).map((_, i) => {
          const delay = i * 10;
          const ringScale = interpolate(
            frame - delay,
            [0, 60],
            [0.8, 1.5],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );
          const ringOpacity = interpolate(
            frame - delay,
            [0, 60],
            [0.6, 0],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 300 + i * 50,
                height: 300 + i * 50,
                borderRadius: '50%',
                border: '3px solid #fff',
                transform: `scale(${ringScale})`,
                opacity: ringOpacity,
              }}
            />
          );
        })}
      </div>

      {/* 底部装饰 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 20,
          opacity: thanksOpacity,
        }}
      >
        {['♥', '★', '♥'].map((symbol, i) => (
          <div
            key={i}
            style={{
              fontSize: 40,
              color: '#fff',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              animation: `float ${1 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
