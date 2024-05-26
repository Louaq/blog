import { DefaultTheme } from 'vitepress';
export const writingSidebar: DefaultTheme.Sidebar = {
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
};
