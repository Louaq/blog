import { DefaultTheme } from 'vitepress';
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  {
    text: '个人成长',
    items: [
      {
        text: '大江南北游记',
        link: '/column/Travel/' // 表示docs/column/Travel/index.md
      },
      {
        text: '所思·所想',
        link: '/column/Growing/' // 表示docs/column/Growing/index.md
      },
	  {
        text: 'Gallery',
        link: '/column/wallpaper/' // 表示docs/column/wallpaper/index.md
      },
	  {
        text: '团队',
        link: '/column/Team/' // 表示docs/column/Growing/index.md
      }
    ]
  },
  {
    text: '毕业设计',
    items: [
      {
        text: '毕业设计说明文档',
        link: '/column/Algorithm/' // 对应docs/column/Algorithm下的idnex.md文件
      },
	  {
        text: '论文写作思路',
        link: '/column/Writing/' // 对应docs/column/Algorithm下的idnex.md文件
      }
    ]
  },
  {
    text: '🍉YOLOv8改进',
    items: [
      {
        text: '基础部分',
        link: '/column/YOLOv8_root/' 
      },
	  {
        text: '卷积部分',
        link: '/column/YOLOv8_conv/' 
      },
	  {
	    text: '注意力机制',
		link: '/column/YOLOv8_attention/'	  
	  }
    ]
  },
  {
	text: '💻深度学习和人工智能',
	items: [
      {
        text: 'Python基础',
        link: '/column/ai/' 
      },
	  {
        text: 'Pytorch',
        link: '/column/Pytorch/' 
      },
	  {
	    text: '深度学习',
		link: '/column/deepLearning/'	  
	  },
	  {
		text: '论文阅读',
		link: '/column/Paper/'
	  
	  }
    ]
  
  
  
  
  
  }
];
