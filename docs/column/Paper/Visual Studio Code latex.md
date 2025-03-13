# vscode配置Latex环境
<ArticleMetadata/>
**LaTeX** 作为一种强大的排版系统，对于理工科，特别是公式比较多的数学专业（秃头专业），其重要性自不必多说，不在本文探讨范围之内。

而选择一个比较好的编译器是很重要的，至少对笔者而言是如此。笔者前期使用的是**TeXstudio**进行文档的编译的，但是其编译速度比较慢，并且页面不是很美观。最让人头疼的是，当公式比较长的时候，使用的括号就比较多，但**Texstudio**的代码高亮功能实在是…（它对于括号根本就没有高亮，头秃）

而**Visual Studio Code**呢？话不多说，直接上图！  
![展示图](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/5b90636b6875472ff796fe988e98826e.png)

可以看到，它不仅能够对代码高亮，不同级别括号用不同颜色标注了，颜值也很高。且 vscode 最突出的特点就是其强大的插件功能，每个使用者都能够根据自己的需求和想法下载相应的插件，从而将之配置为高度个性化的编辑器。可以这么说，每个使用者的 vscode 都不一样，为其专属定制编辑器。

笔者配置了好久，找了很多资料，很多博主也只是贴上了配置代码，没有详细的介绍说明。为了让更多人能够有一个比较清晰的了解，以此可以随时对自己的配置代码进行更改，故笔者写下了此文。希望能够对大家有所帮助。

注 1： 本文使用图片均为笔者自身编辑器截图或笔者朋友的编辑器截图（经过对方同意），且所有引用在文中或文末注明了来源，其余均为原创内容（代码不算哈哈哈）。

注 2： 若您的 vscode 页面和笔者所用图片中展示的页面有略微不同，均为笔者所安装的其余插件以及其余设置所致，并不影响本文中所说的所有配置，您无需担心，只需按照图片中所指向图标进行配置即可。

注 3： 文末有完整的个人配置代码（有的地方需要更改路径，有具体说明）。

1 TeX Live 下载与安装
----------------

笔者选用的 Tex 系统是 TeX Live ，如果您想了解 TeX Live 和 MiKTeX 的区别，可以查看此篇文章：[https://www.cnblogs.com/liuliang1999/p/12656706.html](https://www.cnblogs.com/liuliang1999/p/12656706.html)

接下来是 TeX Live 的**下载与安装说明**：

① 通过网址 ：[http://tug.org/texlive/acquire-iso.html](http://tug.org/texlive/acquire-iso.html) 进入 ISO 下载页面，点击图示红框圈画位置进入随机的镜像网站。

![下载网址](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/b238c6ecae7799a007459ab0cacddfdc.png)  
② 可以看到的是，笔者进入了清华大学镜像网站，点击红框圈画链接进行 TeX Live 下载。

![下载](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/4cea74b28cf59bd59bd28cb03bdcb6e4.png)

③ 如果**下载速度过慢**，可以返回前一页面，进行重新点击，随机进入另一镜像网站进行下载尝试，直到下载速度在您的可接受范围内即可。或者在前一页面，点击 **“mirror list”** 进入镜像列表

![mirror list](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/2a9a2b2fa4447587774d4f2f4eb1c9fb.png)

然后手动选择某一镜像网站进行下载：

![镜像列表选择](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/45f4adf32411091223ef279f96fda7ed.png)

④ 找到下载好的压缩包，右键，在打开方式中选择\*\*“Windows 资源管理器"\*\*打开

![资源管理器打开](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/db2bbda5fb583717e095af7edf5465a6.png)

⑤ 找到 **“install-tl-windows”** 文件，为了后面不必要的麻烦，右键**以管理员身份运行**

![以管理员身份运行](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/b666c4f9426f2fdf0a4a69bc86413ada.png)

⑥ 会先出现下图，无需理会，等会儿会消失

![出现狮子](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/94aa279e1d0f6a59c34d95f4e85e0666.png)

⑦ \*\*基本更改：\*\*出现下图后，需要进行路径的更改；由于 TeX Live 自带的 TeXworks 不怎么好用，并且此文主要将 vscode 作为 LaTeX 的编辑器，故而取消 **安装 TeXworks 前端**的选项，再点击安装

![修改路径](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/5382a34df2373e3c3febc4172ad4af1d.png)

⑧ **个性化安装：** 如果您需要个性化程度高的话，那么可以点击上图左下角的 **Advancde** ，根据您的需要进行相应的更改，但**建议**在不明白各个选项的作用时，不要对其进行修改，以免后期使用产生奇怪的问题。要注意的是，**Adjust searchpath** 这个选项一定要选中，将之添加到环境变量，否则后期手动添加比较麻烦；  
而对于我们大部分人来说，只需要更改下图框选出的部分即可，也就是上图所完成的功能，再点击**安装**即可

![advanced](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/64e11c5a3bfce6dae1620833aa528df6.png)

⑨ \*\*进行安装：\*\*接着就会出现下图，具体的安装指标已在下图标明，可根据其数字来判断安装所需时间。

![安装ing](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/22a9567ff88b850c6de3365fd1bd570e.png)

当上面标示的时间安装完之后，会出现一些配置文件的安装运行写入，进行等待即可，几分钟左右：

![安装后续](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/4bd5a634521b8a18328976fa6884d688.png)

当出现下图所示弹窗时，说明安装完毕，点击关闭即可。

![欢迎进入](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/dd26e23808c26c27614803e4fbca04ca.png)

⑩ **检查安装是否正常：** 按win + R 打开**运行**，输入`cmd`，打开命令行窗口；然后输入命令`xelatex -v` ，如下图

![安装检查](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/4042a6e9ec2aa56e6b1442fa1d4c96a0.png)

如上图所示，若输出了一些版本信息，则安装正常。

2 vscode下载与安装
-------------

官网下载： [Click here to download Visual Studio Code](https://code.visualstudio.com/).

点进去之后就可以进行下载了。具体安装过程与常见的软件安装过程一致，这里就不作赘述。笔者只对几个要点进行提及：

① 记得**修改安装路径**

② 根据个人想法可以选择是否在开始菜单文件夹创建 vscode 的快捷方式

![在这里插入图片描述](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/b52103381640e671ae6421fd329a600e.png)

③ 一定要选上"添加到PATH”这个选项，能省很多麻烦。其余如图所示，自行选择。

![在这里插入图片描述](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/c721d489a01c6fde012b9777eaae64ea.png)

安装好之后，打开 vscode，应如下图页面所示：

![启动页面](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/56e8910ef21f541e6a699bb00f0a4f57.png)

3 中文语言环境配置
----------

vscode的中文环境需要下载插件来进行支持。如下图所示：

① 点击拓展图标，打开拓展；

② 输入"Chinese"，选择第一个Chinese (Simplified) Language Pack for Visual Studio Code插件；

③ 点击"install"进行安装，等待安装完成；

![下载中文插件](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/e74e7680283789d9bec131c5f69234d7.png)

④ 点击页面右下角跳出窗口中的"Restart now"，进行 vscode 重启。

![vscode重启](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/02a0f5f7d9a509bab220dfc4fd2b26b9.png)

⑤ 完成中文环境配置，显示如下：

![中文环境启动页面](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/57e75ca8310629f3fc4e2daf27cc8610.png)

4 LaTeX的支持插件 LaTeX Workshop安装
-----------------------------

① 点击拓展图标，打开拓展；

② 输入"latex workshop"，选择第一个LaTeX Workshop插件；

③ 点击"install"进行安装，等待安装完成；

![latex workshop安装](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/254d1f24e8a90b349a77958b5c192d4d.png)

④ 若在安装完该插件之后在 vscode 页面右下角跳出如下弹窗，无需在意，只是提醒该插件已经更新到了8.11.1版本。若您想要了解新版本增加的功能，可以点击"Change log"进行查看；若不想了解，点击 “Disable this message” 即可。

![弹窗](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/c96cdbe7e01da3ff326da9df306918d1.png)

5 打开LaTeX环境设置页面
---------------

① 点击设置图标

② 点击设置

③ 转到 UI 设置页面

![打开设置](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/2ee6e759bdd67de85e8380d332db1a1a.png)

④ 点击下图 1 处打开 json 文件，进入代码设置页面

![json设置](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/b8d742a52940e90d31777f7efd9943f1.png)

注 4 ： UI 设置页面和代码设置页面均为设置页面，其功能是一样的。不同的是，UI 设置页面交互能力较强，但一些设置需要去寻找，比较麻烦；而代码设置页面虽然相对 UI 而言不那么直观，但却可以对自己想要的功能直接进行代码编写，且代码设置可以直接克隆别人的代码到自己的编辑器中，从而直接完成相应设置，比较便捷。

注 5 ： 可以直接按Ctrl + ，进入设置页面。

6 LaTeX环境的代码配置
--------------

### 6.1 LaTeX配置代码展示

先给出效果图：

![LaTeX代码配置](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/43a5acbf6be4a170f4a9dbdbbcff2209.png)

LaTeX 配置代码如下（不包含外部 pdf 查看器设置）：

```txt
{
    "latex-workshop.latex.autoBuild.run": "never",
    "latex-workshop.showContextMenu": true,
    "latex-workshop.intellisense.package.enabled": true,
    "latex-workshop.message.error.show": false,
    "latex-workshop.message.warning.show": false,
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOCFILE%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ],
    "latex-workshop.latex.recipes": [
        {
            "name": "XeLaTeX",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "PDFLaTeX",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "BibTeX",
            "tools": [
                "bibtex"
            ]
        },
        {
            "name": "LaTeXmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "xelatex -> bibtex -> xelatex*2",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        },
    ],
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ],
    "latex-workshop.latex.autoClean.run": "onFailed",
    "latex-workshop.latex.recipe.default": "lastUsed",
    "latex-workshop.view.pdf.internal.synctex.keybinding": "double-click"
}
```

注 6 ： 若您不想要配置外部查看器以及了解内部查看和外部查看之间切换操作，可以直接复制上述代码至 json 文件中，即可完成 LaTeX 的配置，从而可以对 LaTeX 代码进行编译。

注 7 ： 根据 json 文件编写规则，每个代码语句（除了代码块儿最后一句）都需要加上英文状态下的`,`，否则就会报错；而每个代码块儿的最后一句是不需要加上`,`的。从上文整个代码块儿可以看出此规则。

如果您日后需要在上述代码之后再添加其他代码，请记得在最后一句

```txt
"latex-workshop.view.pdf.internal.synctex.keybinding": "double-click"
```

后添加上`,`，即变为

```txt
"latex-workshop.view.pdf.internal.synctex.keybinding": "double-click",
......
```

其中的`......`为您添加的其余代码。

**切记！**

### 6.2 LaTeX配置代码解读

如果您对此不感兴趣，可以跳过该小节。下面进行代码**注释解读**：

```txt
"latex-workshop.latex.autoBuild.run": "never"
```

设置何时使用默认的(第一个)编译链自动构建 LaTeX 项目，即什么时候自动进行代码的编译。有三个选项：

1.  **onFileChange**：在检测任何依赖项中的文件更改(甚至被其他应用程序修改)时构建项目，即当检测到代码被更改时就自动编译tex文件；
2.  **onSave** : 当代码被保存时自动编译文件；
3.  **never**: 从不自动编译，即需编写者手动编译文档

此项笔者设置为**never**。

```txt
"latex-workshop.showContextMenu": true
```

启用上下文LaTeX菜单。此菜单默认状态下停用，即变量设置为**false**，因为它可以通过新的 LaTeX 标记使用（新的 LaTeX 标记能够编译文档，将在下文提及）。只需将此变量设置为**true**即可恢复菜单。即此命令设置是否将编译文档的选项出现在鼠标右键的菜单中。

下图展示两者区别，左边为设置**false**情况，右边为设置**true**情况。可以看到的是，设置为**true**时，菜单中多了两个选项，其中多出来的第一个选项为进行tex文件的编译，而第二个选项为进行正向同步，即从代码定位到编译出来的 pdf 文件相应位置，下文会进行提及。  
![无](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/80cef33dcac33ac0e86c82c101461f3b.png)![有](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/1bfedcbe76bb0f0ee3a27db3f6e4d538.png) 
笔者觉得菜单多了此选项较方便，故此项笔者设置为**true**

```txt
"latex-workshop.intellisense.package.enabled": true

```

设置为**true**，则该拓展能够从使用的宏包中自动提取命令和环境，从而补全正在编写的代码。

```txt
"latex-workshop.message.error.show"  : false,
"latex-workshop.message.warning.show": false
```

这两个命令是设置当文档编译错误时是否弹出显示出错和警告的弹窗。因为这些错误和警告信息能够从终端中获取，且弹窗弹出比较烦人，故而笔者设置均设置为**false**。

```txt
"latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOCFILE%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ]
```

这些代码是定义在下文 recipes 编译链中被使用的编译命令，此处为默认配置，不需要进行更改。其中的`name`为这些命令的标签，用作下文 recipes 的引用；而`command`为在该拓展中的编译方式。

可以更改的代码为，将编译方式: pdflatex 、 xelatex 和 latexmk 中的`%DOCFILE`更改为`%DOC`。`%DOCFILE`表明编译器访问没有扩展名的根文件名，而`%DOC`表明编译器访问的是没有扩展名的根文件完整路径。这就意味着，使用`%DOCFILE`可以将文件所在路径设置为中文，但笔者不建议这么做，因为毕竟涉及到代码，当其余编译器引用时该 tex 文件仍需要根文件完整路径，且需要为英文路径。笔者此处设置为`%DOCFILE`仅是因为之前使用 TeXstudio，导致路径已经是中文了。

更多详情可以访问 github 中 LaTeX-Workshop 的 Wiki: [Click here for more details about this.](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile#placeholders)

```txt
"latex-workshop.latex.recipes": [
        {
            "name": "XeLaTeX",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "PDFLaTeX",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "BibTeX",
            "tools": [
                "bibtex"
            ]
        },
        {
            "name": "LaTeXmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "xelatex -> bibtex -> xelatex*2",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        }
    ]
```

此串代码是对编译链进行定义，其中`name`是标签，也就是出现在工具栏中的链名称；`tool`是`name`标签所对应的编译顺序，其内部编译命令来自上文`latex-workshop.latex.recipes`中内容。

定义完成后，能够在 vscode 编译器中能够看到的编译顺序，具体看下图：

![编译链](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/bfcdea57459bf5f1687f3a4c548e868a.png)

可以看到的是，在编译链中定义的命令出现在了vscode右侧的工具栏中。

注 8 ： **PDFLaTeX** 编译模式与 **XeLaTeX** 区别如下：

> 1.  PDFLaTeX 使用的是TeX的标准字体，所以生成PDF时，会将所有的非 TeX 标准字体进行替换，其生成的 PDF 文件默认嵌入所有字体；而使用 XeLaTeX 编译，如果说论文中有很多图片或者其他元素没有嵌入字体的话，生成的 PDF  
>     文件也会有些字体没有嵌入。
>
> 2.  XeLaTeX 对应的 XeTeX 对字体的支持更好，允许用户使用操作系统字体来代替 TeX 的标准字体，而且对非拉丁字体的支持更好。
>
> 3.  PDFLaTeX 进行编译的速度比 XeLaTeX 速度快。
>

注 9 ： 编译链的存在是为了更方便编译，因为如果涉及到\*\*.bib\*\*文件，就需要进行多次不同命令的转换编译，比较麻烦，而编译链就解决了这个问题。

```txt
"latex-workshop.latex.clean.fileTypes": [
        //"*.aux",
       // "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ]
```

这串命令则是设置编译完成后要清除掉的辅助文件类型，若无特殊需求，无需进行更改。

```txt
"latex-workshop.latex.autoClean.run": "onFailed"
```

这条命令是设置什么时候对上文设置的辅助文件进行清除。其变量有：

1.  **onBuilt** : 无论是否编译成功，都选择清除辅助文件；
2.  **onFailed** : 当编译失败时，清除辅助文件；
3.  **never** : 无论何时，都不清除辅助文件。

由于 tex 文档编译有时需要用到辅助文件，比如编译目录和编译参考文献时，如果使用`onBuilt`命令，则会导致编译不出完整结果甚至编译失败；

而有时候将 tex 文件修改后进行编译时，可能会导致 pdf 文件没有正常更新的情况，这个时候可能就是由于辅助文件没有进行及时更新的缘故，需要清除辅助文件了，而`never`命令做不到这一点；

故而笔者使用了`onFailed`，同时解决了上述两个问题。

```txt
"latex-workshop.latex.recipe.default": "lastUsed"
```

该命令的作用为设置 vscode 编译 tex 文档时的默认编译链。有两个变量：

1.  **first** : 使用`latex-workshop.latex.recipes`中的第一条编译链，故而您可以根据自己的需要更改编译链顺序；
2.  **lastUsed** : 使用最近一次编译所用的编译链。

笔者选择使用**lastUsed**。

```txt
"latex-workshop.view.pdf.internal.synctex.keybinding": "double-click"
```

用于反向同步（即从编译出的 pdf 文件指定位置跳转到 tex 文件中相应代码所在位置）的内部查看器的快捷键绑定。变量有两种：

1.  **ctrl-click** ： 为默认选项，使用Ctrl/cmd+鼠标左键单击
2.  **double-click** : 使用鼠标左键双击

此处笔者使用的为**double-click**。

7 tex文件编译
---------

### 7.1 tex测试文件下载

为了测试 vscode 功能是否比较完整，笔者编写了一份简单的 tex 文件，以此测试其是否支持中英文，能否编译目录，能否插入图片，能否进行引用，能否编译参考文献（编译bixtex文件）等功能。

测试所用的 tex 文件可以从 github 下载：[Click here to download the LaTeX testfile for vscode](https://github.com/Ali-loner/Ali-loner.github.io)

**下载步骤**如图：  
![测试文件下载](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/6aca9b730b7c4ee2946a88fbe6ac40ad.png)  
将之下载后，进行解压。

注 10 ： 若因网络原因无法连接到github导致无法下载，可以使用自己的tex文件进行测试，或者复制以下代码进行文档的简单编译测试，但其只能测试一部分功能：

```txt
\documentclass[a4paper]{article}
\usepackage[margin=1in]{geometry} % 设置边距，符合Word设定
\usepackage{ctex}
\usepackage{lipsum}
\title{\heiti\zihao{2} This is a test for vscode}
\author{\songti Ali-loner}
\date{2020.08.02}
\begin{document}
	\maketitle
\begin{abstract}
	\lipsum[2]
\end{abstract}
\tableofcontents
\section{This is a section}
Hello world! 你好，世界 ！
\end{document}
```

### 7.2 tex 测试文件编译

**① 打开测试文件所在文件夹**

![打开文件夹](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/927b15521ea5f9c20d3ba6c426e098ba.png)

**② 点击选中 tex 文件**，进行文件内容查看

![tex文件查看](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/6a28c240c45d77c6972a7e2fb6cd62a8.png)

**③ 开始编译文件。** 由于进行测试的文件中涉及参考文献的引用（**.bib**的编译），故而选择`xelatex -> bibtex -> xelatex*2`编译链。

![开始编译](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/306b76bae450c39ddd5a7cea4074c84a.png)

注 11 ： 为了更方便进行编译，可对其设置快捷键，设置快捷键步骤如下：

![快捷键绑定](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/24c26cd24b87c3f1e59568b8b8e8bb00.png)

笔者将快捷键设置为Ctrl+Alt+R。

**选中tex文件的代码页面**（若未选中，则无法进行编译），然后按下该快捷键，在编辑器页面上端进行编译链选择，如下图：

![快捷键编译](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/cbaed92ca564f9dbbb4204e0d9c2fee7.png)

**④ 编译成功**

当发现页面下方出现 **√** 符号时，说明编译成功，相反，如果出现 **×** 符号，说明编译失败，就要找失败原因了。

**a.** 左侧工具栏

当编译成功后，选中 tex 文件中任意的代码，以此来选中 tex 文件，然后进行图示操作。其中侧边栏所展现的就是上文提及的新的 LaTeX 标记。

![pdf查看](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/04f02e79054c25953a761251a72e8682.png)

**b.** 快捷键

选中 tex 文件中任意的代码，然后按Ctrl+Alt+V，出现编译好的 pdf 页面。该快捷键为默认设置。若您想要更改，可以根据上文进行配置。

![编译成功](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/518090c31940a4a61b55f75a31f7c923.png)

注意到，现在编译的结果为内部查看器查看。

**⑤ 正向同步测试**，即从代码定位到 pdf 页面相应位置。有以下三种方法：

**a.** 使用侧边工具栏

![正向同步1](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/20bc13379b5e1d69eecb53c98175e896.png)

**b.** 使用右键菜单

![正向同步2](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/ac759bac5a92854811260f5ea5f56f0f.png)  
**c.** 使用快捷键

选中需要跳转的代码所在行，按Ctrl+Alt+J，右侧就会跳转到相应行。这里的快捷键为默认设置，可自行通过上文方式设置为您想要的快捷键。

**⑥ 反向同步测试**,即从 pdf 页面定位到代码相应位置

在编译生成的 pdf 上，选中想要跳转行，鼠标左键双击或ctrl+鼠标左键单击，跳转到对应代码。此处快捷键的选择为上文设置，若使用笔者的代码，则为鼠标左键双击。

![反向同步](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/1bc30efe92862befcd35000da3b3eb93.png)

8 SumatraPDF 安装设置（可选）
---------------------

您可自行选择是否需要设置此部分内容。

有的时候，由于想要看到 pdf 文件的完整展现效果，使用内置查看器已无法满足需求，这时可以使用外部查看器进行查看。

外部查看器的优势是能够看到 pdf 文件在查看器中的目录，可以实时进行跳转；且根据笔者使用来看，外部查看器展示出来的 pdf 默认会放大一些，使得字体变大，要更加让人舒服一些。

笔者选择 **SumatraPDF** 作为外部查看器，该软件的优点在于在具有 pdf 阅读功能的同时很轻量，安装包不到 10MB 大小，且支持双向同步功能。通过调整其与 vscode 的窗口位置，能够在拥有这些优势的同时，达到与内置 pdf 查看具有相同的效果。

### 8.1 SumatraPDF下载与安装

官网下载：[Click here to download SumatraPDF](https://www.sumatrapdfreader.org/download-free-pdf-viewer.html)

![sumatraPDF](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/46ef16263fbbb2396ceb7029c1963a32.png)

其安装很简单，与通用软件安装过程一致，记得更改安装路径并记住，下文配置需要使用其路径。

### 8.2 使用SumatraPDF查看的代码配置

#### 8.2.1 代码展示

```txt
{
    "latex-workshop.view.pdf.viewer": "external",
    "latex-workshop.view.pdf.ref.viewer":"auto",
    "latex-workshop.view.pdf.external.viewer.command": "F:/SumatraPDF/SumatraPDF.exe", // 注意修改路径
    "latex-workshop.view.pdf.external.viewer.args": [
        "%PDF%"
    ],
    "latex-workshop.view.pdf.external.synctex.command": "F:/SumatraPDF/SumatraPDF.exe", // 注意修改路径
    "latex-workshop.view.pdf.external.synctex.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "code \"F:/Microsoft VS Code/resources/app/out/cli.js\" -r -g \"%f:%l\"", // 注意修改路径
        "%PDF%"
    ]
}
```

此代码仅为展示所用，让您进行查看，为下文解读之用。如需写入到 json 文件内，可直接完整复制文末笔者的个人配置到自己的编译器内。

#### 8.2.2 代码解读

```txt
"latex-workshop.view.pdf.viewer": "external"
```

设置默认的pdf查看器，有三种变量参数：

1.  **tab** : 使用 vscode 内置 pdf 查看器；
2.  **browser** : 使用电脑默认浏览器进行 pdf 查看；
3.  **external** : 使用外部 pdf 查看器查看。

此处选择 **external** 参数，使用外部查看器。

注 12 ： 此参数为下文进行pdf内部查看和外部查看进行切换的关键参数。

```txt
"latex-workshop.view.pdf.ref.viewer":"auto"
```

设置PDF查看器用于在 **\\ref** 命令上的\[View on PDF\]链接，此命令作用于 **\\ref** 引用查看。有三个参数变量：

1.  **auto** : 由编辑器根据情况自动设置；
2.  **tabOrBrowser** : 使用vscode内置pdf查看器或使用电脑默认浏览器进行pdf查看；
3.  **external** : 使用外部pdf查看器查看。

此处设置为**auto**。

```txt
"latex-workshop.view.pdf.external.viewer.command": "F:/SumatraPDF/SumatraPDF.exe"// 注意修改路径
```

使用外部查看器时要执行的命令，设置外部查看器启动文件**SumatraPDF.exe**文件所在位置，此处需要您根据自身情况进行路径更改，正常情况下只需更改磁盘盘符即可。

**请注意**中间为 " / " 而不是" \\ " ，不然会报错。

```txt
"latex-workshop.view.pdf.external.viewer.args": [
        "%PDF%"
    ]
123代码解读
```

此代码是设置使用外部查看器时，`latex-workshop.view.pdf.external.view .command`的参数。`%PDF%`是用于生成PDF文件的绝对路径的占位符。

```txt
"latex-workshop.view.pdf.external.synctex.command": "F:/SumatraPDF/SumatraPDF.exe" // 注意修改路径
1代码解读
```

此命令是将生成的辅助文件 **.synctex.gz** 转发到外部查看器时要执行的命令,设置其位置参数，您注意更改路径，此路径为 **SumatraPDF.exe** 文件路径。与上文相同。

```txt
"latex-workshop.view.pdf.external.synctex.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "code \"F:/Microsoft VS Code/resources/app/out/cli.js\" -r -g \"%f:%l\""// 注意修改路径
        "%PDF%"
    ]
123456789代码解读
```

设置当 **.synctex.gz** 文件同步到外部查看器时`latex-workshop.view.pdf.external.synctex`的参数。`%LINE%`是行号，`%PDF%`是生成PDF文件的绝对路径的占位符，`%TEX%`是当触发syncTeX被触发时，扩展名为 **.tex** 的 LaTeX 文件路径。

上面代码串中记得进行 **Microsoft VS Code** 路径修改，修改如下图:

![路径修改](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/43de3a7d084a4b2b2eae6a259ba24f33.png)

9 SumatraPDF 的使用
----------------

将完整代码复制到自己的 json 文件内后，即可使用 SumatraPDF作为自己的 pdf 外部查看器了。以下为具体操作：

① 点击编辑页面任意位置来选中 tex 文件；  
② 按Ctrl+Alt+V，打开编译出的 pdf 文件；  
③ 出现如下图页面。可以看到的是，原本内嵌输出的 pdf 变为了在 SumatraPDF 上查看，且侧面带有书签：

![sumatrapdf查看](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/e5003691bd206012a74ecddf6c7bfa82.png)

④ 为了出现和内嵌输出具有相同的效果，可以将 vscode 和 SumatraPDF 进行分屏，且根据需要关闭标签，如下图：

![分屏查看](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/57974febf6f2c77c5b9bb9e22235887d.png)

⑤ 且同样支持双向同步（正向同步和反向同步），其操作步骤与内嵌输出 pdf 时操作步骤相同，此处就不再赘述。查看效果图：

![双向同步](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/6118b9cb1ea3e22d80a5a04edd5fb6a7.png)

10 pdf 内部查看与外部查看的切换
-------------------

以下展示由外部查看转为内部查看的操作，由内转外操作相同。

共有两种操作方式：**UI界面设置** 或 **Json界面设置** 。具体见下图：

![内外切换](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/8fde188378a7f0d0d15e09941768c364.png)

您可根据个人适应选择相应的方法。

11 个人完整配置
---------

```txt
{
 //------------------------------LaTeX 配置----------------------------------
    // 设置是否自动编译
    "latex-workshop.latex.autoBuild.run":"never",
    //右键菜单
    "latex-workshop.showContextMenu":true,
    //从使用的包中自动补全命令和环境
    "latex-workshop.intellisense.package.enabled": true,
    //编译出错时设置是否弹出气泡设置
    "latex-workshop.message.error.show": false,
    "latex-workshop.message.warning.show": false,
    // 编译工具和命令
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOCFILE%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ],
    // 用于配置编译链
    "latex-workshop.latex.recipes": [
        {
            "name": "XeLaTeX",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "PDFLaTeX",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "BibTeX",
            "tools": [
                "bibtex"
            ]
        },
        {
            "name": "LaTeXmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "xelatex -> bibtex -> xelatex*2",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        }
    ],
    //文件清理。此属性必须是字符串数组
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ],
    //设置为onFaild 在构建失败后清除辅助文件
    "latex-workshop.latex.autoClean.run": "onFailed",
    // 使用上次的recipe编译组合
    "latex-workshop.latex.recipe.default": "lastUsed",
    // 用于反向同步的内部查看器的键绑定。ctrl/cmd +点击(默认)或双击
    "latex-workshop.view.pdf.internal.synctex.keybinding": "double-click",



    //使用 SumatraPDF 预览编译好的PDF文件
    // 设置VScode内部查看生成的pdf文件
    "latex-workshop.view.pdf.viewer": "external",
    // PDF查看器用于在\ref上的[View on PDF]链接
    "latex-workshop.view.pdf.ref.viewer":"auto",
    // 使用外部查看器时要执行的命令。此功能不受官方支持。
    "latex-workshop.view.pdf.external.viewer.command": "F:/SumatraPDF/SumatraPDF.exe", // 注意修改路径
    // 使用外部查看器时，latex-workshop.view.pdf.external.view .command的参数。此功能不受官方支持。%PDF%是用于生成PDF文件的绝对路径的占位符。
    "latex-workshop.view.pdf.external.viewer.args": [
        "%PDF%"
    ],
    // 将synctex转发到外部查看器时要执行的命令。此功能不受官方支持。
    "latex-workshop.view.pdf.external.synctex.command": "F:/SumatraPDF/SumatraPDF.exe", // 注意修改路径
    // latex-workshop.view.pdf.external.synctex的参数。当同步到外部查看器时。%LINE%是行号，%PDF%是生成PDF文件的绝对路径的占位符，%TEX%是触发syncTeX的扩展名为.tex的LaTeX文件路径。
    "latex-workshop.view.pdf.external.synctex.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "code \"F:/Microsoft VS Code/resources/app/out/cli.js\" -r -g \"%f:%l\"", // 注意修改路径
        "%PDF%"
    ]
}
```

**写在最后** ： 笔者也只是一个初学者，文中如果出现错误的地方，欢迎您在评论区批评指正，笔者会虚心接受这些产生错误的地方，争取以后学得更扎实再编写这些文字。

另：若您感觉此文写得勉强还行，希望您能够不吝点赞，给笔者一点小小的激励，以此来进行更多更好的文字编写。非常感谢！！！

**注** : 本文转载自https://zhuanlan.zhihu.com/p/166523064