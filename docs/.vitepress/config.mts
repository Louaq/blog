import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar.mts';
import timeline from "vitepress-markdown-timeline";
import taskLists from 'markdown-it-task-checkbox'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "lab blog",
  description: "A VitePress Site",
  head: [
    ['link',{ rel: 'icon', href: '/icon.png'}],
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
	  math: true,
	  lineNumbers: true
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
   ],
   '/column/YOLOv8_conv/': [
     // 第一部分
    {
      text: '第一部分',
	  collapsed: false,
      items: [
        {
          text: 'ACKconv',
          link: '/column/YOLOv8_conv/article_1'
        },
        {
          text: 'DWRSeg',
          link: '/column/YOLOv8_conv/article_2'
        },
		{
          text: 'SPD-Conv空间深度转换卷积',
          link: '/column/YOLOv8_conv/article_3'
        },
		{
          text: 'CG block',
          link: '/column/YOLOv8_conv/article_4'
        },
		{
          text: 'Diverse Branch Block多元分支模块',
          link: '/column/YOLOv8_conv/article_5'
        },
		{
          text: 'RFAConv注意力机制',
          link: '/column/YOLOv8_conv/article_6'
        },
		{
          text: 'SCConv空间和通道重构卷积',
          link: '/column/YOLOv8_conv/article_7'
        }
      ]
    },
	{
	  text: '第二部分',
	  collapsed: false,
	  items: [
        {
          text: 'DCNV4',
          link: '/column/YOLOv8_conv/article_8'
        },
        {
          text: 'MSBlock',
          link: '/column/YOLOv8_conv/article_9'
        },
		{
          text: 'OREPA',
          link: '/column/YOLOv8_conv/article_10'
        },
		{
          text: 'ODConv',
          link: '/column/YOLOv8_conv/article_11'
        },
		{
          text: 'SAC',
          link: '/column/YOLOv8_conv/article_12'
        },
		{
          text: '动态蛇形卷积',
          link: '/column/YOLOv8_conv/article_13'
        },
		{
          text: '多个位置替换可变形卷积',
          link: '/column/YOLOv8_conv/article_14'
        }
      ]
	},
	{
	  text: '第三部分',
	  collapsed: false,
	  items: [
        {
          text: 'DynamicConv',
          link: '/column/YOLOv8_conv/article_15'
        },
        {
          text: 'CSPHet',
          link: '/column/YOLOv8_conv/article_16'
        },
		{
          text: 'Haar小波的下采样HWD替换传统下采样',
          link: '/column/YOLOv8_conv/article_17'
        },
		{
          text: '轻量化的C2f',
          link: '/column/YOLOv8_conv/article_18'
        },
		{
          text: 'FasterBlock',
          link: '/column/YOLOv8_conv/article_19'
        },
		{
          text: 'GELAN',
          link: '/column/YOLOv8_conv/article_20'
        },
		{
          text: 'CSPPC',
          link: '/column/YOLOv8_conv/article_21'
        },
		{
          text: 'ADown模块',
          link: '/column/YOLOv8_conv/article_22'
        }
      ]
	}
   ],
    '/column/YOLOv8_attention/': [
     // 第一部分
    {
      text: '第一部分',
	  collapsed: false,
      items: [
        {
          text: 'BiFormer',
          link: '/column/YOLOv8_attention/article_1'
        },
        {
          text: 'Triplet Attention',
          link: '/column/YOLOv8_attention/article_2'
        },
		{
          text: '多尺度空洞注意力',
          link: '/column/YOLOv8_attention/article_3'
        },
		{
          text: 'LSKAttention',
          link: '/column/YOLOv8_attention/article_4'
        },
		{
          text: 'HAttention注意力机制',
          link: '/column/YOLOv8_attention/article_5'
        },
		{
          text: '聚焦线性注意力',
          link: '/column/YOLOv8_attention/article_6'
        },
		{
          text: '可变形大核注意力',
          link: '/column/YOLOv8_attention/article_7'
        }
			
      ],
    },
	{
	   text: '第二部分',
	   collapsed: false,
	   items: [
	     {
          text: 'DAT',
          link: '/column/YOLOv8_attention/article_8'
         },
		 {
          text: 'ACmix',
          link: '/column/YOLOv8_attention/article_9'
         },
		 {
          text: 'RCS-OSA模块',
          link: '/column/YOLOv8_attention/article_10'
         }	   
	   
	   ]
	
	},
   ],
	'/column/ai/': [
	{
		text: '第一部分',
		collapsed: false,
		items: [
			{
				text: 'Python的基础知识',
				link: '/column/ai/day01'
					
			},
			{
				text: '列表',
				link: '/column/ai/day02'
					
			},				
		]
	
	}
	  	    
	],
    '/column/wallpaper/': [
		{
		text: '第一部分',
		collapsed: false,
		items: [
			{
				text: 'WLOP_08',
				link: '/column/wallpaper/wlop_08'
					
			},
			{
				text: 'WLOP_09',
				link: '/column/wallpaper/wlop_09'
					
			},
				
		  ]
        }
      ],
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
      message: 'Released under the MIT License.', 
      copyright: 'Copyright © 2013-2024 present louaq', 
    },
	 
	i18nRouting: true,
  }
})
