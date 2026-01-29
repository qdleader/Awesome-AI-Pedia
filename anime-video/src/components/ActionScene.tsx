import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

export const ActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  // 能量球动画
  const energyBallX = interpolate(frame, [0, 80], [100, width - 100], {
    easing: Easing.inOut(Easing.cubic),
  });

  const energyBallY = interpolate(
    frame,
    [0, 40, 80],
    [height / 2, height / 2 - 100, height / 2],
    {
      easing: Easing.inOut(Easing.quad),
    }
  );

  // 爆炸效果
  const explosionScale = interpolate(frame, [80, 100], [0, 3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const explosionOpacity = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 冲击波
  const shockwaveScale = interpolate(frame, [80, 120], [0, 5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockwaveOpacity = interpolate(frame, [80, 120], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 速度线
  const speedLines = Array.from({length: 20}, (_, i) => {
    const y = (i / 20) * height;
    const length = interpolate(frame, [0, 80], [0, 300], {
      extrapolateRight: 'clamp',
    });
    return {y, length};
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(45deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* 速度线效果 */}
      {speedLines.map((line, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: width - line.length,
            top: line.y,
            width: line.length,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #fff)',
            opacity: 0.3,
          }}
        />
      ))}

      {/* 能量球轨迹 */}
      {frame < 80 && (
        <div
          style={{
            position: 'absolute',
            left: energyBallX - 50,
            top: energyBallY - 50,
            width: 100,
            height: 100,
          }}
        >
          {/* 主能量球 */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ff00ff 0%, #00ffff 100%)',
              boxShadow: '0 0 50px #ff00ff, 0 0 100px #00ffff',
              animation: 'pulse 0.5s infinite',
            }}
          />

          {/* 能量粒子 */}
          {Array.from({length: 8}).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 60;
            const x = 50 + Math.cos(angle + frame * 0.1) * distance;
            const y = 50 + Math.sin(angle + frame * 0.1) * distance;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  boxShadow: '0 0 10px #fff',
                }}
              />
            );
          })}
        </div>
      )}

      {/* 爆炸效果 */}
      {frame >= 80 && (
        <div
          style={{
            position: 'absolute',
            left: width - 100,
            top: height / 2,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* 主爆炸 */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff 0%, #ff6b00 50%, transparent 100%)',
              transform: `scale(${explosionScale})`,
              opacity: explosionOpacity,
              boxShadow: '0 0 100px #ff6b00',
            }}
          />

          {/* 爆炸碎片 */}
          {Array.from({length: 12}).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = explosionScale * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#ffaa00',
                  opacity: explosionOpacity,
                  boxShadow: '0 0 20px #ff6b00',
                }}
              />
            );
          })}
        </div>
      )}

      {/* 冲击波 */}
      {frame >= 80 && (
        <div
          style={{
            position: 'absolute',
            left: width - 100,
            top: height / 2,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '5px solid #00ffff',
              transform: `scale(${shockwaveScale})`,
              opacity: shockwaveOpacity,
            }}
          />
        </div>
      )}

      {/* 动作文字 */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 0 20px #ff00ff, 0 0 40px #00ffff',
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: '0.1em',
            margin: 0,
          }}
        >
          {frame < 80 ? '必杀技!' : '轰!!!'}
        </h1>
      </div>

      {/* 屏幕闪光效果 */}
      {frame >= 80 && frame <= 85 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#fff',
            opacity: interpolate(frame, [80, 85], [0.8, 0]),
          }}
        />
      )}
    </AbsoluteFill>
  );
};
