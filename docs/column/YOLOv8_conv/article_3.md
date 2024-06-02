 # SPD-Conv

一、本文介绍
------

本文给大家带来的改进内容是**SPD-Conv**（空间深度转换卷积）技术。SPD-Conv是一种创新的**空间编码**技术，它通过更有效地处理图像数据来改善深度学习模型的表现。SPD-Conv的基本概念：它是一种将图像空间信息转换为深度信息的技术，从而使得卷积神经网络（CNN）能更加有效地学习图像特征。这种方法通过减少信息损失和提高特征提取的准确性，优化了模型对小物体和低分辨率图像的处理能力。**我在YOLOv8中利用SPD-Conv被用于替换传统的步长卷积和池化层，在不牺牲精确度的情况下减少计算复杂度（精度甚至略有提升）**。本文后面会有SPD-Conv的代码和使用方法，手把手教你添加到自己的网络结构中。**(值得一提的是该卷积模块可以做到轻量化模型的作用GFLOPs由8.9降低到8.2，参数量也有一定降低)**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/591c7650b8f14166aba061360c1d710a.png)

二、SPD-Conv构建块原理
---------------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8890a43d17544315852a8b6abba5f707.png)

**论文地址：[论文官方地址](https://arxiv.org/pdf/2208.03641.pdf "论文官方地址")**

**代码地址：[代码官方地址](https://github.com/LabSAINT/SPD-Conv "代码官方地址")**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/102dc7aa1ac4495f82f26a85aec18553.png)

* * *

### 2.1 SPD-Conv的基本原理

**SPD-Conv（空间到深度卷积）**的基本原理是用于改进传统**卷积神经网络**（CNN）中对小物体和低分辨率图像处理的性能。它主要通过以下几个关键步骤实现：

**1\. 替换步长卷积和池化层**：SPD-Conv设计用来替代传统CNN架构中的步长卷积层和池化层。步长卷积和池化层在处理低分辨率图像或小物体时会导致细粒度信息的丢失。

**2\. 空间到深度（SPD）层**：SPD层的作用是降采样特征图的通道维度，同时保留信息。这种方式可以避免传统方法中的信息丢失。

**3\. 非步长卷积层**：在SPD层之后，SPD-Conv使用一个非步长（即步长为1）的卷积层。这有助于在降低通道数量的同时利用可学习的参数对特征进行处理。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f8723874d6534aab92dc1f4ff0a7328b.png)

以下是我对这个图的理解：

**1\. 特征图 (a)**：传统的特征图，具有通道数 ${C_1}$，高度和宽度。  
**2\. 空间到深度变换 (b)**：通过空间到深度操作，将像素的空间块重新排列到深度/通道维度，增加通道数到 ${4C_1}$，同时将空间维度缩小2倍。  
**3\. 通道合并 (c)**：不同的通道组在通道维度上进行合并。  
**4\. 加法操作 (d)**：合并的特征图可能会与其他处理过的特征图（图中未详细展示）进行加法操作。  
**5\. 非步长卷积 (e)**：对结果特征图应用步长为1的卷积，减少通道维度至${C_2}$，同时保持空间分辨率，其仍是原始大小的1/2。

#### 2.1.1**替换步长卷积和池化层**

论文中提出的SPD-Conv构建块是**为了替代传统CNN中的步长卷积和池化层**。步长卷积和池化层在处理低分辨率图像和小物体时会导致信息的丢失。SPD-Conv使用空间到深度（SPD）层，该层将特征图的空间维度转换成深度维度，通过增加通道数来保留更多信息。随后是非步长卷积层，它保持了空间维度，减少了通道数。这种替代方法避免了信息的丢失，并允许网络捕获更精细的特征，从而提高了在复杂任务上的性能。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6e01de3118c146b388802d1387ea589e.png)

上图是SPD-Conv论文中的一个图表，展示了如何在YOLOv5的结构中实施SPD-Conv(在YOLOv8中同样适用）。**图中标红的部分代表了SPD-Conv替换传统卷积操作的地方**。YOLOv5的架构被分为三个主要部分：

**1\. 主干网络（Backbone）**：这是特征提取的核心部分，每个SPD和Conv层的组合都替换了原始YOLOv5中的步长卷积层。  
**2\. 颈部（Neck）**：这部分用于进一步处理特征图，以获得不同尺度的特征，从而提高检测不同大小物体的能力。它也包含SPD和Conv层的组合，以优化特征提取。  
**3\. 头部（Head）**：这是决策部分，用于物体检测任务，包括定位和分类。头部保持了YOLO原始架构的设计。

直连线表示直接的前向连接，虚线代表跳跃连接，用于整合不同层次的特征。

* * *

#### 2.1.2 **空间到深度（SPD）层**

**空间到深度（SPD）层**是SPD-Conv中的一个关键组件，其作用是将输入特征图的空间块（像素块）重新排列进入深度（通道）维度，以此来增加通道数，同时减少空间分辨率，但不丢失信息。通过这种方式，这一转换允许CNN捕捉和保留在处理小物体和低分辨率图像时经常丢失的精细信息。SPD层后面紧跟的是非步长卷积层，它进一步处理重新排列后的特征图，确保有效特征的提取和使用​​。通过这种方法，SPD-Conv能够在特征提取阶段保留更丰富的信息，从而提高模型对于小物体和低分辨率图像的识别性能。

* * *

#### 2.1.3 **非步长卷积层**

在SPD-Conv的背景下，**非步长卷积层**采用的是步长为1的卷积操作，意味着在卷积过程中，滤波器（或称为卷积核）会在输入特征图上逐像素移动，没有跳过任何像素。这样可以确保在特征图的每个位置都能应用卷积核，最大程度地保留信息，并生成丰富的特征表示。非步长卷积层是紧随空间到深度（SPD）层的一个重要组成部分。在SPD层将输入特征图的空间信息重新映射到深度（通道）维度后，非步长卷积层（即步长为1的卷积层）被用来处理这些重新排列的特征图。由于步长为1，这个卷积层不会导致任何进一步的空间分辨率降低，这允许网络在不损失细节的情况下减少特征图的通道数。这种方法有助于改善特征的表征，特别是在处理小物体或低分辨率图像时，这些场景在传统CNN结构中往往会丢失重要信息。

* * *

### 2.2 检测效果

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f082c9f4da51461aac3cdea4ab8a8758.png)

**上图比较了**标准YOLOv5m模型和集成了SPD-Conv的改进版本YOLOv5-SPD-m的性能。紫色框表示标准YOLOv5m的预测，绿色框显示了YOLOv5-SPD-m的预测。蓝色框代表地面真相（ground truth）。红色箭头突出了两个模型预测之间的差异。

从图像中我们可以看出，YOLOv5-SPD-m（绿色框）的预测与地面真相更为接近，与YOLOv5m（紫色框）的预测相比，这表明将SPD-Conv整合进YOLOv5能增强模型准确检测物体的能力，这对于需要精确定位和识别的应用来说至关重要，例如自动驾驶或监控。

* * *

**三、SPD-Conv完整代码**
------------------

使用方式看章节四！

```python
import torch
import torch.nn as nn
 
 
__all__ = ['SPDConv']
 
def autopad(k, p=None, d=1):  # kernel, padding, dilation
    """Pad to 'same' shape outputs."""
    if d > 1:
        k = d * (k - 1) + 1 if isinstance(k, int) else [d * (x - 1) + 1 for x in k]  # actual kernel-size
    if p is None:
        p = k // 2 if isinstance(k, int) else [x // 2 for x in k]  # auto-pad
    return p
 
 
 
class SPDConv(nn.Module):
    """Standard convolution with args(ch_in, ch_out, kernel, stride, padding, groups, dilation, activation)."""
    default_act = nn.SiLU()  # default activation
 
    def __init__(self, c1, c2, k=1, s=1, p=None, g=1, d=1, act=True):
        """Initialize Conv layer with given arguments including activation."""
        super().__init__()
        c1 = c1 * 4
        self.conv = nn.Conv2d(c1, c2, k, s, autopad(k, p, d), groups=g, dilation=d, bias=False)
        self.bn = nn.BatchNorm2d(c2)
        self.act = self.default_act if act is True else act if isinstance(act, nn.Module) else nn.Identity()
 
    def forward(self, x):
        x = torch.cat([x[..., ::2, ::2], x[..., 1::2, ::2], x[..., ::2, 1::2], x[..., 1::2, 1::2]], 1)
        """Apply convolution, batch normalization and activation to input tensor."""
        return self.act(self.bn(self.conv(x)))
 
    def forward_fuse(self, x):
        """Perform transposed convolution of 2D data."""
        x = torch.cat([x[..., ::2, ::2], x[..., 1::2, ::2], x[..., ::2, 1::2], x[..., 1::2, 1::2]], 1)
        return self.act(self.conv(x))
 
 
```

* * *

四、手把手教你添加SPD-Conv
-----------------

### 4.1 SPD-Conv的添加教程

#### 4.1.1修改一

第一还是建立文件，我们找到如下ultralytics/nn文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/aaf6b9d4b17645e79f08f6ad4e4618a2.png)



* * *

#### 4.1.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/27de1d168c134ad1bfe130ee36888a35.png)

* * *

#### **4.1.3 修改三** 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)​

* * *

#### 4.1.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/545650b8855743138e3cd3587508604c.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

* * *

### 4.2 SPD-Conv的yaml文件和训练截图(仔细看这个否则会报错)

#### 4.2.1 SPD-Conv的yaml文件

**下面的配置文件为我修改的**SPD-Conv**的位置（这里需要注意的是你可以和初始的yaml对比一下修改了SPD-Conv的参数被修改了，你如果不修改该卷积那么则不需要修改另外两个参数）。**

```python
# Ultralytics YOLO 🚀, AGPL-3.0 license
# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect
 
# Parameters
nc: 80  # number of classes
scales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
  # [depth, width, max_channels]
  n: [0.33, 0.25, 1024]  # YOLOv8n summary: 225 layers,  3157200 parameters,  3157184 gradients,   8.9 GFLOPs
  s: [0.33, 0.50, 1024]  # YOLOv8s summary: 225 layers, 11166560 parameters, 11166544 gradients,  28.8 GFLOPs
  m: [0.67, 0.75, 768]   # YOLOv8m summary: 295 layers, 25902640 parameters, 25902624 gradients,  79.3 GFLOPs
  l: [1.00, 1.00, 512]   # YOLOv8l summary: 365 layers, 43691520 parameters, 43691504 gradients, 165.7 GFLOPs
  x: [1.00, 1.25, 512]   # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOPs
 
# YOLOv8.0n backbone
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]]  # 0-P1/2
  - [-1, 1, SPDConv, [128]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, SPDConv, [256]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, SPDConv, [512]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, SPDConv, [1024]]  # 7-P5/32
  - [-1, 3, C2f, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]  # 9
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4
  - [-1, 3, C2f, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, C2f, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, SPDConv, [256]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, SPDConv, [512]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 SPD-Conv的训练过程截图 

**下面是添加了**SPD-Conv**的训练截图。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a8fdc3abea824051854bf619cad3739f.png)​​​

* * *

五、SPD-Conv可添加的位置
----------------

### 5.1 推荐SPD-Conv可添加的位置 

SPD-Conv**是一种即插即用的模块**，其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入SPD-Conv
>     
> 2.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加修改后的C2f\_SPD-Conv可以帮助模型更有效地融合不同层次的特征。
>     
> 3.  **检测头中的卷积**：在最终的输出层前加入SPD-Conv可以使模型在做出最终预测之前，更加集中注意力于最关键的特征。
>     

**文字大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

* * *

### **5.2 图示**SPD-Conv**可添加的位置** 

![2949694815404620bdfb5875286c8e73.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2949694815404620bdfb5875286c8e73.png)​​​

* * *

