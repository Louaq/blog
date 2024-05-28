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
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/Louaq' },
    ]
  },
  {
    text: 'VitePress',
    link: 'https://vitepress.dev/zh/' 
  }
];
