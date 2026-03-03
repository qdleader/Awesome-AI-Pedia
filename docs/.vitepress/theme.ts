import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './custom.css'
import './styles/home.css'
import BlogMeta from './components/BlogMeta.vue'
import LobsterAnimation from './components/LobsterAnimation.vue'
import FreshDecorations from './components/FreshDecorations.vue'
import NavigationCards from './components/NavigationCards.vue'
import FeatureCards from './components/FeatureCards.vue'
import WaveDivider from './components/WaveDivider.vue'

/**
 * 展开左侧侧边栏的第一个折叠项
 */
function expandFirstSidebarItem() {
  const sidebar = document.querySelector('.VPSidebar')
  if (!sidebar) return

  const firstCollapsedItem = sidebar.querySelector('.VPSidebarItem.level-0.is-collapsed')
  if (firstCollapsedItem) {
    const toggleButton = firstCollapsedItem.querySelector('.VPSidebarItemToggle')
    if (toggleButton && toggleButton instanceof HTMLElement) {
      toggleButton.click()
    }
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer': () => h(BlogMeta)
    })
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('BlogMeta', BlogMeta)
    app.component('LobsterAnimation', LobsterAnimation)
    app.component('FreshDecorations', FreshDecorations)
    app.component('NavigationCards', NavigationCards)
    app.component('FeatureCards', FeatureCards)
    app.component('WaveDivider', WaveDivider)

    // 监听路由变化，自动展开左侧侧边栏的第一条
    if (router) {
      router.onAfterRouteChanged = () => {
        setTimeout(expandFirstSidebarItem, 100)
      }
    }

    // 初始化时也执行一次
    if (typeof window !== 'undefined') {
      setTimeout(expandFirstSidebarItem, 300)
    }
  }
}
