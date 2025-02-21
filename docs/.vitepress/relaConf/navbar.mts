import { DefaultTheme } from 'vitepress';
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  {
    text: '论文阅读笔记',
    link: '/column/Paper/' // 表示docs/index.md
  },
  {
    text: 'Pytorch笔记',
    link: '/column/Pytorch/' // 表示docs/index.md
  },
  {
    text: '深度学习笔记',
    link: '/column/deepLearning/' // 表示docs/index.md
  }
];
