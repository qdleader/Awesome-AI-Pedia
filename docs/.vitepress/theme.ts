import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './styles/home.css'
import BlogMeta from './components/BlogMeta.vue'
import LobsterAnimation from './components/LobsterAnimation.vue'
import FreshDecorations from './components/FreshDecorations.vue'
import NavigationCards from './components/NavigationCards.vue'
import FeatureCards from './components/FeatureCards.vue'
import WaveDivider from './components/WaveDivider.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer': () => h(BlogMeta)
    })
  },
  enhanceApp({ app, router }: { app: any; router: any }) {
    app.component('BlogMeta', BlogMeta)
    app.component('LobsterAnimation', LobsterAnimation)
    app.component('FreshDecorations', FreshDecorations)
    app.component('NavigationCards', NavigationCards)
    app.component('FeatureCards', FeatureCards)
    app.component('WaveDivider', WaveDivider)
  }
}
