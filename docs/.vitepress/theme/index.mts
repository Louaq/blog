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
import backtotop from "./components/backtotop.vue"
import MyLayout from './components/MyLayout.vue'
import notice from "./components/notice.vue"
import 'virtual:group-icons.css' //代码组样式 //
import DataPanel from "./components/DataPanel.vue"
import confetti from "./components/confetti.vue"
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import { useLive2d } from 'vitepress-theme-website'
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
export default {
  extends: DefaultTheme,
  enhanceApp({app, router}) { 
    // 注册全局组件
    app.component('MyLayout', MyLayout)
    app.component('DataPanel' , DataPanel)
    app.component('notice', notice)
    app.component('backtotop', backtotop)

    if (inBrowser){
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
        NProgress.done() // 停止进度条
      }
    }
  },
  Layout() { 
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(notice), // 使用layout-top插槽
      'doc-footer-before': () => h(backtotop), 
    })
  },
  setup() {
    const route = useRoute();
    //看板娘 //
    useLive2d({
      enable: true,
      model: {
        url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hibiki/hibiki.model.json'
      },
      display: {
        position: 'right',
        width: '135px',
        height: '300px',
        xOffset: '35px',
        yOffset: '5px'
      },
      mobile: {
        show: true
      },
      react: {
        opacity: 0.8
      }
    });
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