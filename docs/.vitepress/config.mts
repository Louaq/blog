import { defineConfig } from 'vitepress'
import { nav } from './relaConf/navbar.mts';
import timeline from "vitepress-markdown-timeline";
import taskLists from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { La51Plugin } from 'vitepress-plugin-51la'
import vitepressProtectPlugin from "vitepress-protect-plugin"
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
      groupIconVitePlugin(),
      La51Plugin({
        id: '3LPXyA1ZitpV3O1s',
        ck: '3LPXyA1ZitpV3O1s',
        autoTrack:true
      }),
      vitepressProtectPlugin({
        disableF12: true, // 禁用F12开发者模式
        disableCopy: false, // 禁用文本复制
        disableSelect: false, // 禁用文本选择
      }),
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
        text: '论文阅读',
	      collapsed: true,
          items: [
              {
                text: 'latex环境配置',
                link: '/column/Paper/Visual Studio Code latex'
              },
              {
                text: 'Segment Anything',
                link: '/column/Paper/Segment Anything'
              },
              {
                text: '领域泛化语义分割',
                link: '/column/Paper/DGSS'
              },
              {
                text: '基于分层编码器的开放词汇语义分割',
                link: '/column/Paper/SED'
              },
              {
                text: '超高分辨率分割',
                link: '/column/Paper/High_Quality_Segmentation'
              },
              {
                text: '夜间场景语义分割',
                link: '/column/Paper/Night-time_Semantic_Segmentation'
              },
              {
                text: '提示词迁移的少样本分割',
                link: '/column/Paper/PAT'
              },
              {
                text: '多模态图像分割',
                link: '/column/Paper/Prompting_Multi-Moda_Segmetation'
              },
              {
                text: '基于Transformer的自适应原型匹配网络',
                link: '/column/Paper/A Transformer-basedAdaptivePrototypeMatchingNetwork'
              },
              {
                text: '跨领域少样本语义分割',
                link: '/column/Paper/Cross-Domain Few-Shot Semantic Segmentation via Doubly Matching Transformation'
              },
              {
                text: '相关内在特征增强的少样本与意义分割',
                link: '/column/Paper/Relevant Intrinsic Feature Enhancement Network for Few-Shot Semantic Segmentation'
              },
              {
                text: '基于涂鸦的无监督语义分割',
                link: '/column/Paper/Scribble-Supervised Semantic Segmentation with Prototype-based Feature Augmentation'
              },
              {
                text: '面向弱监督语义分割的渐进式特征自增强',
                link: '/column/Paper/Progressive Feature Self-Reinforcement for Weakly Supervised Semantic Segmentation'
              },
              {
                text: '基于自监督Vit的语义分割',
                link: '/column/Paper/Self-supervised_ViT'
              },
              {
                text: '医学图像分割：基于解耦特征查询',
                link: '/column/Paper/LearningGeneralizedMedicalImageSegmentationfromDecoupledFeatureQueries'
              },
              {
                text: '基于语句嵌入的多领域语义分割',
                link: '/column/Paper/Scaling_UpMulti-domain_Semantic_Segmentation_with_Sentence'
              },
              {
                text: '基于涂鸦的弱监督语义分割',
                link: '/column/Paper/Scribbl_Hides_Class_Promoting_Scribble-Based_Weakly-Supervised_Semantic_Segmentation_with Its Class Label'
              },

          ] 
      },
      {
        text: '语义分割论文阅读',
	      collapsed: false,
        items:[
          {
            text: '涂鸦监督语义分割的确定性和一致性(CC4S)',
            link: '/column/Paper/CC4S Encouraging Certainty and Consistency in Scribble-Supervised Semantic Segmentation'
          },
          {
            text: '基于关联匹配的标签传播半监督语义分割',
            link: 'column/Paper/CorrMatch Label Propagation via Correlation Matching for Semi-Supervised Semantic Segmentation'
          },
          {
            text: '基于LLM的开放词汇语义分割',
            link: '/column/Paper/LLMFormer Large LanguageModel for Open-Vocabulary Semantic'
          },
          {
            text: '无需语义标签的开放词汇语义分割(文章晦涩，不建议阅读)',
            link: '/column/Paper/Towards Open-Vocabulary Semantic Segmentation Without Semantic Labels'
          },
          {
            text: '面向开放词汇图像分割的通用片段嵌入',
            link: '/column/Paper/USE Universal Segment Embeddings for Open-Vocabulary Image Segmentation'
          }








          

        ]
      }
    ],
    '/column/image_segmentation/': [
      {
        text: '图像分割原理及概念',
        collapsed: false,
          items: [
              {
                text: '语义分割概述',
                link: '/column/image_segmentation/20250224-语义分割概述'
              },
              {
                text: '语义分割上采样',
                link: '/column/image_segmentation/220250224-语义分割上采样'
              },
              {
                text: '图像分割基础',
                link: '/column/image_segmentation/图像分割基础'
              },
              {
                text: '语义分割基础模型',
                link: '/column/image_segmentation/语义分割基础模型'

              },
              {
                text: 'FCN模型讲解',
                link: '/column/image_segmentation/FCN模型讲解'

              }
          ] 
      },
      {
        text: '卷积网络',
        collapsed: false,
        items:[
          {
            text: '卷积网络',
            link: '/column/image_segmentation/20250312-Pytorch教程'
          },

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
    message: `Released under the <a href="https://mit-license.org/">MIT License.</a> | 
    本站访客数 <span id="busuanzi_value_site_uv"></span> 人次`,
      copyright: `Copyright © 2024-${new Date().getFullYear()}` ,  
    },
	 
	i18nRouting: true,
  }
})
