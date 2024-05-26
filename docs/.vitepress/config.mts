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
