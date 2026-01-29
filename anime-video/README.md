# 🎬 动漫视频项目

使用 Remotion 创建的动漫风格视频项目。

## ✨ 特性

- 🎨 **精美的动漫风格视觉效果**
- ⚡ **流畅的动画过渡**
- 🎭 **多场景组合**
  - 标题场景 - 粒子效果和弹簧动画
  - 角色登场 - SVG 动漫角色和能量效果
  - 动作场景 - 能量球、爆炸和冲击波
  - 结束场景 - 星星雨和彩虹背景
- 🎵 **支持音频配乐**

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动预览

```bash
npm start
```

这将打开 Remotion Studio,你可以在浏览器中实时预览和编辑视频。

### 渲染视频

```bash
npm run build -- --codec=h264
```

渲染完成后,视频将保存在 `out` 目录中。

## 📁 项目结构

```
anime-video/
├── src/
│   ├── Root.tsx                    # Remotion 根组件
│   ├── compositions/
│   │   └── AnimeVideo.tsx          # 主视频组合
│   └── components/
│       ├── TitleScene.tsx          # 标题场景
│       ├── CharacterScene.tsx      # 角色场景
│       ├── ActionScene.tsx         # 动作场景
│       └── EndingScene.tsx         # 结束场景
├── package.json
├── remotion.config.ts              # Remotion 配置
└── tsconfig.json                   # TypeScript 配置
```

## 🎨 自定义

### 修改标题和副标题

在 `src/Root.tsx` 中修改 `defaultProps`:

```tsx
defaultProps={{
  title: "你的标题",
  subtitle: "你的副标题"
}}
```

### 调整视频时长

在 `src/Root.tsx` 中修改 `durationInFrames`:

```tsx
durationInFrames={450}  // 15秒 (30fps)
```

### 修改分辨率

在 `src/Root.tsx` 中修改 `width` 和 `height`:

```tsx
width={1920}
height={1080}
```

## 🎬 场景说明

### 1. 标题场景 (0-3秒)
- 粒子爆发效果
- 标题弹簧动画
- 副标题淡入
- 装饰线条

### 2. 角色登场 (3-7秒)
- 星空背景
- SVG 动漫角色
- 能量波纹效果
- 光晕动画

### 3. 动作场景 (7-12秒)
- 能量球飞行
- 速度线效果
- 爆炸动画
- 冲击波扩散

### 4. 结束场景 (12-15秒)
- 星星雨效果
- 彩虹渐变背景
- 完结文字
- 装饰圆环

## 📚 技术栈

- **Remotion** - React 视频创建框架
- **React** - UI 库
- **TypeScript** - 类型安全

## 🎯 渲染选项

### 渲染为 MP4 (H.264)
```bash
npm run build -- --codec=h264
```

### 渲染为 WebM
```bash
npm run build -- --codec=vp8
```

### 渲染特定帧
```bash
npx remotion still src/Root.tsx AnimeVideo out/frame.png --frame=100
```

### 自定义输出路径
```bash
npm run build -- --codec=h264 --out=my-video.mp4
```

## 💡 提示

1. 使用 Remotion Studio 可以实时预览所有场景
2. 可以通过调整 `interpolate` 参数来微调动画效果
3. 添加音频文件到 `public` 目录,然后使用 `<Audio>` 组件
4. 使用 `<Sequence>` 组件可以轻松添加更多场景

## 📖 更多资源

- [Remotion 官方文档](https://www.remotion.dev/docs)
- [Remotion 示例](https://www.remotion.dev/showcase)
- [React 文档](https://react.dev)

## 🎉 开始创作

现在你可以开始创作自己的动漫视频了!修改组件、调整动画、添加音效,打造独一无二的作品!
