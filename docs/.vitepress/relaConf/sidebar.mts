import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
  // /column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
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
  ]
};
