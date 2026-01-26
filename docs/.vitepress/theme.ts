import { h } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogMeta from './components/BlogMeta.vue'

export default DefaultTheme({
  extends: DefaultTheme,
  Layout() {
    const route = useRoute()
    return h(DefaultTheme.Layout, null, {
      'doc-footer': () => h(BlogMeta)
    })
  },
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('BlogMeta', BlogMeta)
  }
})
