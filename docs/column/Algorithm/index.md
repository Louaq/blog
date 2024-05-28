---

---

# 说明文档

> 这篇文档主要介绍《基于YOLOv8的农田病虫害检测与分析》的代码实现部分，整篇论文的目的主要是改进YOLOv8的网络结构，使其在检测病虫害的精度和实时性上有所提升。接下来，我将介绍如何从零开始搭建起本项目。



::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::



<img src="https://img.shields.io/badge/-Spring-6DB33F?logo=Spring&logoColor=FFF" alt="Spring" style="display: inline-block;" />&nbsp;

<img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Ant%20Design-C0C0C0?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Webpack-D3D3D3?logo=Webpack&logoColor=8DD6F9" alt="Webpack" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Axios-C0C0C0?logo=Axios&logoColor=5A29E4" alt="Axios" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-ESLint-C0C0C0?logo=ESLint&logoColor=4B32C3" alt="ESLint" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-jQuery-0769AD?logo=jQuery&logoColor=FFF" alt="jQuery" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Bootstrap-7952B3?logo=Bootstrap&logoColor=FFF" alt="BootStrap" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-ECharts-C0C0C0?logo=Apache-ECharts&logoColor=AA344D" alt="ECharts" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-JavaScript-A9A9A9?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-HTML5-A9A9A9?logo=HTML5&logoColor=E34F26" alt="HTML5" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" style="display: inline-block;" />&nbsp;   <img src="https://img.shields.io/badge/-Less-D3D3D3?logo=Less&logoColor=1D365D" alt="Less" style="display: inline-block;" />&nbsp;

油管链接图标：[Youtube](https://www.youtube.com/)

B站链接图标：[哔哩哔哩](https://www.bilibili.com/)

<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://vitepress.yiov.top/logo.png" />
    </div>
  </a>
</div>






