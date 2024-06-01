import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar.mts';
import timeline from "vitepress-markdown-timeline";
import taskLists from 'markdown-it-task-checkbox'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "lab blog",
  description: "A VitePress Site",
  server:{ host: '127.0.0.1', port: 3000 },
  head: [
    ['link',{ rel: 'icon', href: '/logo.png'}],
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
	  
      },
	  image: {
        lazyLoading: true
      },
	  math: true
    },
  themeConfig: {
    darkModeSwitchLabel: '深浅模式',
    logo: '/b.jpg',
    nav: nav,
	sidebarMenuLabel:'目录',
	returnToTopLabel:'返回顶部',
    sidebar: {
   '/column/Algorithm/': [
     // 第一部分
    {
      text: '论文指导',
	  collapsed: false,
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
	  collapsed: false,
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
	  collapsed: false,
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
	  collapsed: false,
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
   ],
   '/column/YOLOv8_root/': [
     // 第一部分
    {
      text: '第一部分',
	  collapsed: false,
      items: [
        {
          text: 'YOLOv8简介',
          link: '/column/YOLOv8_root/article_1'
        },
        {
          text: '恒源云训练数据',
          link: '/column/YOLOv8_root/article_2'
        },
		{
          text: 'YOLOv8目录结构',
          link: '/column/YOLOv8_root/article_3'
        },
		{
          text: 'YOLOv8网络结构分析',
          link: '/column/YOLOv8_root/article_4'
        },
		{
          text: 'YOLOv8可视化热力图',
          link: '/column/YOLOv8_root/article_5'
        },
		{
          text: 'YOLOv8参数分析',
          link: '/column/YOLOv8_root/article_6'
        },
		{
          text: '改进YOLOv8',
          link: '/column/YOLOv8_root/article_7'
        }
      ]
    },
    // 第二部分
    {
      text: '第二部分',
	  collapsed: false,
      items: [
        {
          text: 'Roboflow',
          link: '/column/YOLOv8_root/article_8'
        },
        {
          text: '数据增强',
          link: '/column/YOLOv8_root/article_9'
        },
		{
          text: '可视化热力图',
          link: '/column/YOLOv8_root/article_10'
        },
		{
          text: '评估指标',
          link: '/column/YOLOv8_root/article_11'
        },
		{
          text: 'YOLOv8绘图功能',
          link: '/column/YOLOv8_root/article_12'
        },
		{
          text: '自定义数据集',
          link: '/column/YOLOv8_root/article_13'
        },
		{
          text: '报错',
          link: '/column/YOLOv8_root/article_14'
        }
      ]
    }
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
      message: 'Released under the MIT License.', 
      copyright: 'Copyright © 2019-2024present louaq', 
    },
	 
	i18nRouting: true,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
	  {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: 'https://weixin.qq.com/',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat'
      }

    ]
  }
})
