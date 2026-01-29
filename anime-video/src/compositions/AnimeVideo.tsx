import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';
import {TitleScene} from '../components/TitleScene';
import {CharacterScene} from '../components/CharacterScene';
import {ActionScene} from '../components/ActionScene';
import {EndingScene} from '../components/EndingScene';

interface AnimeVideoProps {
  title: string;
  subtitle: string;
}

export const AnimeVideo: React.FC<AnimeVideoProps> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#0a0e27'}}>
      {/* 场景1: 标题场景 (0-90帧, 3秒) */}
      <Sequence from={0} durationInFrames={90}>
        <TitleScene title={title} subtitle={subtitle} />
      </Sequence>

      {/* 场景2: 角色登场 (90-210帧, 4秒) */}
      <Sequence from={90} durationInFrames={120}>
        <CharacterScene />
      </Sequence>

      {/* 场景3: 动作场景 (210-360帧, 5秒) */}
      <Sequence from={210} durationInFrames={150}>
        <ActionScene />
      </Sequence>

      {/* 场景4: 结束场景 (360-450帧, 3秒) */}
      <Sequence from={360} durationInFrames={90}>
        <EndingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
