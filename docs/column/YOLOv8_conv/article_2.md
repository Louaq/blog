 # DWRSeg

一、本文介绍
------

本文内容给大家带来的**DWRSeg**中的DWR模块来改进YOLOv8中的C2f和Bottleneck模块，主要针对的是小目标检测，主要创新点可以总结如下：**多尺度特征提取机制的深入研究和创新的DWR模块和SIR模块的提出，**这种方法使得网络能够更灵活地适应不同尺度的特征，从而更准确地识别和分割图像中的物体。 **通过本文你能够了解到：DWRSeg**的基本原理和框架，并且能够在你自己的网络结构中进行添加**(DWRSeg需要增加一定的计算量一个DWR模块大概增加0.4GFLOPs)。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e52410c27fb5459ea2c8e76b461cd3a2.png)

二、DWRSeg的原理介绍
-------------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/64d7ca43ebd54ec79d2d158bb3c824c8.png)

**论文地址**：[官方论文地址](https://arxiv.org/pdf/2212.01173v3.pdf "官方论文地址")

**代码地址**：该代码目前还未开源，我根据论文内容进行了复现内容在文章末尾。

 ![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a30df5c6bfb0493585544da10e4f3200.png)

* * *

### 2.1 DWRSeg的主要思想 

**DWRSeg的主要创新点可以总结如下：**

1.  **多尺度特征提取机制的深入研究**：利用深度分离扩张卷积进行多尺度特征提取，并设计了一种高效的两步残差特征提取方法（区域残差化 – 语义残差化）。**这种方法显著提高了实时语义分割中捕获多尺度信息的效率。**
    
2.  **创新的DWR模块和SIR模块的提出**：提出了一个新颖的DWR（扩张残差）模块和SIR（简单反向残差）模块。这些模块具有精心设计的接收场大小，分别用于网络的上层和下层。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8789fccb207c44aea8e653d6b243a18f.png)

DWRSeg网络在实时语义分割领域取得了一定的效果**从论文的结果来看下图**，特别是在提高处理速度和减轻模型负担的方面。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0cd42f44ccdd4cada6a9ccd72aa38b9c.png)

* * *

### 2.2 **多尺度特征提取机制的深入研究**

利用深度分离扩张卷积进行多尺度特征提取。**主要内容可以总结如下：**

1.  **两步残差特征提取方法**：该方法包括区域残差化（Region Residualization）和语义残差化（Semantic Residualization），旨在提高实时语义分割中多尺度信息捕获的效率​​。
    
2.  **区域残差化**：这一步骤中，首先将区域特征图分成几组，然后对这些组进行不同速率的深度分离扩张卷积。这样做可以智慧地根据第二步中的接收场大小来学习特征图，以反向匹配接收场​​。
    
3.  **语义残差化**：在这一步中，仅使用一个具有期望接收场的深度分离扩张卷积对每个简洁的区域形式特征图进行基于语义的形态学过滤。这改变了多速率深度分离扩张卷积在特征提取中的角色，从尝试获取尽可能多的复杂语义信息转变为对每个简洁表达的特征图进行简单的形态学过滤​​。
    
4.  **精细化的扩张率和容量设计**：为了充分利用每个网络阶段可以实现的不同区域大小的特征图，需要精心设计扩张率和深度分离卷积的容量，以匹配每个网络阶段的不同接收场要求​​。
    

通过这种多尺度特征提取机制的深入研究和创新设计，论文提高了实时语义分割任务中多尺度信息捕获的效率**第一小节的图片**。

* * *

### 2.3 **创新的DWR模块和SIR模块的提出**

**提出的DWR模块和SIR模块的创新点如下：**

> **DWR（Dilation-wise Residual）模块(本文复现的就是这个DWR模块)**
> 
> *   **应用场景**：DWR模块主要应用于网络的高阶段，采用设计的两步特征提取方法​​。
> *   **特征提取**：该模块利用两步残差特征提取方法（区域残差化 – 语义残差化），有效提高实时语义分割中多尺度信息捕获的效率。
> *   **接收场大小设计**：DWR模块针对网络的上层设计了精细化的接收场大小。

> **SIR（Simple Inverted Residual）模块**
> 
> *   **应用场景**：SIR模块专门为网络的低阶段设计，以满足小接收场的需求，保持高效的特征提取效率​​。
> *   **结构调整**：
> 
> 1.  移除了多分支扩张卷积结构，仅保留第一分支，以压缩接收场。
> 2.  移除了对提取效果贡献较小的3x3深度分离卷积（语义残差化），因为输入特征图的大尺寸和弱语义使得单通道卷积收集的信息太少。因此，在低阶段，单步特征提取比两步特征提取更高效。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/504301eb7ae64f8e8be45c04a4d06e81.png)

**总结**：这两个模块的设计改进对于提高实时语义分割网络的性能至关重要，高效处理多尺度上下文信息的能力方面。

三、DWR模块代码
---------

**使用方法请看章节四**

```python
import torch
import torch.nn as nn
 
__all__ = ['C2f_DWRSeg']
 
 
def autopad(k, p=None, d=1):  # kernel, padding, dilation
    """Pad to 'same' shape outputs."""
    if d > 1:
        k = d * (k - 1) + 1 if isinstance(k, int) else [d * (x - 1) + 1 for x in k]  # actual kernel-size
    if p is None:
        p = k // 2 if isinstance(k, int) else [x // 2 for x in k]  # auto-pad
    return p
 
 
class Conv(nn.Module):
    """Standard convolution with args(ch_in, ch_out, kernel, stride, padding, groups, dilation, activation)."""
    default_act = nn.SiLU()  # default activation
 
    def __init__(self, c1, c2, k=1, s=1, p=None, g=1, d=1, act=True):
        """Initialize Conv layer with given arguments including activation."""
        super().__init__()
        self.conv = nn.Conv2d(c1, c2, k, s, autopad(k, p, d), groups=g, dilation=d, bias=False)
        self.bn = nn.BatchNorm2d(c2)
        self.act = self.default_act if act is True else act if isinstance(act, nn.Module) else nn.Identity()
 
    def forward(self, x):
        """Apply convolution, batch normalization and activation to input tensor."""
        return self.act(self.bn(self.conv(x)))
 
    def forward_fuse(self, x):
        """Perform transposed convolution of 2D data."""
        return self.act(self.conv(x))
 
 
class DWR(nn.Module):
    def __init__(self, dim) -> None:
        super().__init__()
 
        self.conv_3x3 = Conv(dim, dim // 2, 3)
 
        self.conv_3x3_d1 = Conv(dim // 2, dim, 3, d=1)
        self.conv_3x3_d3 = Conv(dim // 2, dim // 2, 3, d=3)
        self.conv_3x3_d5 = Conv(dim // 2, dim // 2, 3, d=5)
 
        self.conv_1x1 = Conv(dim * 2, dim, k=1)
 
    def forward(self, x):
        conv_3x3 = self.conv_3x3(x)
        x1, x2, x3 = self.conv_3x3_d1(conv_3x3), self.conv_3x3_d3(conv_3x3), self.conv_3x3_d5(conv_3x3)
        x_out = torch.cat([x1, x2, x3], dim=1)
        x_out = self.conv_1x1(x_out) + x
        return x_out
 
 
class DWRSeg_Conv(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size=1, stride=1, groups=1, dilation=1):
        super().__init__()
        self.conv = Conv(in_channels, out_channels, k=1)
 
        self.dcnv3 = DWR(out_channels)
 
        self.bn = nn.BatchNorm2d(out_channels)
        self.gelu = nn.GELU()
 
    def forward(self, x):
        x = self.conv(x)
 
        x = self.dcnv3(x)
 
        x = self.gelu(self.bn(x))
        return x
 
class Bottleneck_DWRSeg(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = DWRSeg_Conv(c_, c2, k[1], 1, groups=g)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
 
class C2f_DWRSeg(nn.Module):
    """Faster Implementation of CSP Bottleneck with 2 convolutions."""
 
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):
        """Initialize CSP bottleneck layer with two convolutions with arguments ch_in, ch_out, number, shortcut, groups,
        expansion.
        """
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(
            Bottleneck_DWRSeg(self.c, self.c, shortcut, g, k=((3, 3), (3, 3)), e=1.0) for _ in range(n))
 
    def forward(self, x):
        """Forward pass through C2f layer."""
        y = list(self.cv1(x).chunk(2, 1))
        y.extend(m(y[-1]) for m in self.m)
        return self.cv2(torch.cat(y, 1))
 
    def forward_split(self, x):
        """Forward pass using split() instead of chunk()."""
        y = list(self.cv1(x).split((self.c, self.c), 1))
        y.extend(m(y[-1]) for m in self.m)
        return self.cv2(torch.cat(y, 1))
```

* * *

四、手把手教你添加DWR和C2f\_DWR模块
-----------------------

### 4.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn/modules文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/110e628ca4344fb190a52b02dd919d29.png)



* * *

### 4.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/547d6d62020b4327904d1199c493d1d4.png)

* * *

### 4.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)

* * *

### 4.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/510da947f91e47c09e7b4b64cfbd4d5b.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

* * *

### 4.2 DWR的yaml文件和训练截图

#### 4.2.1 DWR的yaml文件

**下面的配置文件我修改的地址。**

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
  - [-1, 1, Conv, [128, 3, 2]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32
  - [-1, 3, C2f, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]  # 9
 
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4
  - [-1, 3, C2f, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, C2f_DWRSeg, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_DWRSeg, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_DWRSeg, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 DWR的训练过程截图 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b49c3d31fdf84c45b4824db0d0924b08.png)​

* * *

五、DWR可添加的位置
-----------

### 5.1 推荐DWR可添加的位置 

**DWR是一种即插即用的模块，**其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入DWR
>     
> 2.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加修改后的C2f\_DWR可以帮助模型更有效地融合不同层次的特征。
>     
> 3.  **检测头中的卷积**：在最终的输出层前加入DWR可以使模型在做出最终预测之前，更加集中注意力于最关键的特征。
>     

**文字大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

### **5.2图示**DWR**可添加的位置** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2949694815404620bdfb5875286c8e73.png)​

