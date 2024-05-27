import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar.mts';
import timeline from "vitepress-markdown-timeline";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "lab blog",
  description: "A VitePress Site",
  server:{ host: '127.0.0.1', port: 3000 },
  themeConfig: {
    logo: '/b.jpg',
    nav: nav,
    sidebar: {
	  '/column/Algorithm/': [
     // 第一部分
    {
      text: '论文指导',
      items: [
        {
          text: '环境安装',
          link: '/column/Algorithm/Stack'
        },
        {
          text: '模型训练',
          link: '/column/Algorithm/Queue'
        }
      ]
    },
    // 第二部分
    {
      text: '结果分析',
      items: [
        {
          text: '测试',
          link: '/column/Algorithm/Dictionary'
        },
        {
          text: '真实图像预测',
          link: '/column/Algorithm/Tree'
        }
      ]
    }
  ],
  '/column/Writing/': [
     // 第一部分
    {
      text: '第一部分',
      items: [
        {
          text: '摘要',
          link: '/column/Writing/Abstract'
        },
        {
          text: '介绍',
          link: '/column/Writing/Introduction'
        }
      ]
    },
    // 第二部分
    {
      text: '第二部分',
      items: [
        {
          text: '实验',
          link: '/column/Writing/Experiment'
        },
        {
          text: '结果',
          link: '/column/Writing/Results'
        }
      ]
    }
  ]
},

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
	footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>'
    },
	markdown: { 
    
    lineNumbers: true, 
    config: (md) => {
      md.use(timeline);
      },
    }, 
	i18nRouting: true,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
