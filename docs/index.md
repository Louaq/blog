---
# 提供三种布局，doc、page和home
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page
title: 我的博客
titleTemplate: Hi，终于等到你，还好没放弃
editLink: true
lastUpdated: true

hero:
    name: 程序猿
    text: Stay foolish, Stay hungry.
    tagline: /斜杠青年/人间清醒/工具控/
    image:
        # 首页右边的图片
        src: /logo.png
        # 图片的描述
        alt: avatar
    # 按钮相关
    actions:
    - theme: brand
      text: 进入主页
      link: https://github.com/Louaq
    - theme: alt
      text: 个人成长
      link: /column/Growing/
# 按钮下方的描述
features:
  - icon: 🤹
    title: Python
    details: 电子信息研究生
    link: /column/views/guide
  - icon: 👩
    title: 深度学习
    details: 计算机视觉，YOLO算法
  - icon: 🧩
    title: 热爱编码
    details: 是个平平无奇但是又很热爱学习的青年。
  - icon: 🚀
    title: 快速发布网站
    details: 使用静态 HTML 进行快速初始加载，使用客户端路由进行快速加载后导航


---

