import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar.mts';
import { sidebar } from './relaConf/sidebar.mts';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "lab-demo",
  description: "A VitePress Site",
  server:{ host: '127.0.0.1', port: 3000 },
  themeConfig: {
    logo: '/b.jpg',
    nav: nav,
    sidebar: sidebar,
	lastUpdated: {
	  text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
	},
	editLink: {
      pattern: 'https://github.com/Louaq/blog/tree/main/docs/:path',
      text: '在github上编辑此页面'
    },
	outline:{
		level: [2, 6],
		label: '目录'
	},
	search: {
		provider: 'local'
	},
	i18nRouting: true,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
