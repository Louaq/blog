import DefaultTheme from 'vitepress/theme'
import Mycomponent from "./components/Layout.vue"
import DefaultTheme from 'vitepress/theme-without-fonts'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import "vitepress-markdown-timeline/dist/theme/index.css";
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick, h } from 'vue';
import { useRoute } from 'vitepress';
import './style/fonts.css'
import './style/index.css'
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import backtotop from "./components/backtotop.vue"
import MyLayout from './components/MyLayout.vue'
import notice from "./components/notice.vue"
import 'virtual:group-icons.css' //代码组样式 //
export default {
  extends: DefaultTheme,
  Layout() { 
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(backtotop), // 使用doc-footer-before插槽
    })
  },
  enhanceApp({app, router}) {
    app.component('Mycomponent' , Mycomponent);
	if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
	
	
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    const { frontmatter } = useData();
    giscusTalk({
      repo: 'Louaq/blog', 
      repoId: 'R_kgDOMAoWzQ',
      category: 'Announcements', 
      categoryId: 'DIC_kwDOMAoWzc4Cfpm5', 
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      true
    )
	
  }
  
}