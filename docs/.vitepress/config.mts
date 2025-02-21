import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar.mts';
import timeline from "vitepress-markdown-timeline";
import taskLists from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "lab blog",
  description: "A VitePress Site",
  head: [
    ['link',{ rel: 'icon', href: '/blog/icon.png'}],
	  [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],

    [
      'script',
      { id: 'register-sw' },
      `;(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
        }
      })()`
    ]
  ],
  sitemap: {
    hostname: 'https://http://localhost:5173/blog/.com',
  },
  markdown: { 
    config: (md) => {
      md.use(timeline);
	    md.use(taskLists, {
        disabled: true,
        divWrap: false,
        divClass: 'checkbox',
        idPrefix: 'cbx_',
        ulClass: 'task-list',
        liClass: 'task-list-item',
      });
      md.use(groupIconMdPlugin);
	  
    },
	  image: {
        lazyLoading: true
      },
	  math: true,
	  lineNumbers: true
  },
  vite: { 
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
  },
  themeConfig: {
    darkModeSwitchLabel: '深浅模式',
    logo: '/b.jpg',
    nav: nav,
	sidebarMenuLabel:'目录',
	returnToTopLabel:'返回顶部',
  sidebar: {
    '/column/Paper/': [
      {
        text: 'Latex',
	      collapsed: false,
          items: [
              {
                text: 'latex环境配置',
                link: '/column/Paper/Visual Studio Code latex'
              }
          ] 
      },
    ]
 
  },

	lastUpdated: {
	  text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
	},
	editLink: {
      pattern: 'https://github.com/Louaq/blog/tree/main/docs/:path',
      text: '在github上编辑此页面'
    },
	outline:{
		level: [2, 6],
		label: '当前大纲'
	},
	docFooter: { 
      prev: '上一页', 
      next: '下一页'
    }, 
	search: {
		provider: 'local'
	},
	footer: { 
      message: 'Released under the <a href="https://mit-license.org/">MIT License.</a>', 
      copyright: `Copyright © 2024-${new Date().getFullYear()}` ,  
    },
	 
	i18nRouting: true,
  }
})
