import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogMeta from './components/BlogMeta.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer': () => h(BlogMeta)
    })
  },
  enhanceApp({ app, router }) {
    app.component('BlogMeta', BlogMeta)
  }
}
