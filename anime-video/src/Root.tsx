import {Composition} from 'remotion';
import {AnimeVideo} from './compositions/AnimeVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AnimeVideo"
        component={AnimeVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "动漫世界",
          subtitle: "探索无限可能"
        }}
      />
    </>
  );
};
