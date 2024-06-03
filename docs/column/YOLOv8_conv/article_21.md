 # CSPPC

一、本文介绍
------

本文给大家带来的改进机制是由我独家研制的，根据PartialConv提出了一种全新的结构**CSPPC**用来替换网络中的C2f，**将其替换我们网络中的C2f参数量后直接下降约百万，计算量GFLOPs降低至6.0GFLOPs同时**，其中的PartialConv作为一种具有高速推理的Conv，其对于网络的速度提升也是非常的有效的，本文的网络结构大家只要使用上，作为一种轻量化的模块来使用，可以说是轻量化中的王者，**同时该结构在我的数据上还伴随着一定幅度涨点约一个点**，同时本文的结构为我独家创新全网无第二份，非常适合大家用来发表论文，**同时文章内包含手撕结构图！**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9060d1254c4f454091c8cad73da5f16e.png)

* * *

二、PConv卷积原理
-----------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1847363dc5724b7ea01c13124a8092c7.png)

**论文地址：[官方论文地址](https://arxiv.org/pdf/2303.03667.pdf "官方论文地址")**

**代码地址：[官方代码地址](https://github.com/JierunChen/FasterNet "官方代码地址")**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8c77d6be779344f2b23eba53a55cfeb4.png)

* * *

### 2.1  PConv卷积的基本原理

**PConv（部分卷积）**的基本原理是利用**特征图的冗余**，从而减少计算和内存访问。具体来说，PConv 只在输入通道的一部分上应用常规卷积进行空间特征提取，而保留剩余通道不变。这种设计的**优势**在于：

1\. 减少计算复杂度：PConv 通过在较少的通道上进行计算，降低了浮点操作（FLOPs）的数量。例如，如果部分率设置为 1/4，则PConv的计算量只有常规卷积的 1/16。

2\. 降低内存访问：与常规卷积相比，PConv减少了内存访问量，这对于输入/输出（I/O）受限的设备尤其有益。

3\. 保持特征信息流：尽管只对输入通道的一部分进行计算，但保留的通道在后续的逐点卷积（PWConv）层中仍然有用，允许特征信息在所有通道中流动。

下图为大家展示了我们提出的**部分卷积（PConv）的概念**。它通过仅在少数输入通道上应用滤波器，同时保留其他通道不变，从而实现快速高效的运算。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/362c72bbd1c8424aa1fa9b41b2755043.png)

与常规卷积相比，PConv降低了FLOPs，同时比深度/分组卷积具有更高的FLOPs。这种方法提升了运算效率，因为它减少了必须执行的计算量，并且减少了内存访问。

图中**(a)**展示了常规卷积，**(b)**展示了深度/分组卷积，而**(c)**则展示了我们的部分卷积方法。在PConv中，一部分通道直接通过身份操作传递，而不进行卷积处理。 

* * *

### 2.2 特征图冗余

**特征图冗余**指的是在卷积神经网络的特征图（也称为激活图）中，不同通道间存在大量相似或重复的信息。在许多情况下，特征图的某些通道可能会包含与其他通道高度相似的特征，这意味着在进行网络的前向传播时，这部分信息的多次处理并没有提供额外的有用信息，反而增加了计算量和内存访问的开销。

在实际应用中，这种冗余性可能会导致计算资源的浪费，因为神经网络会在所有通道上执行卷积运算，包括那些冗余或者不会对网络性能产生显著影响的通道。为了解决这个问题，可以通过各种方法来降低这种冗余，例如：

**1\. 通道剪枝：**通过分析通道的重要性并移除那些对最终性能影响不大的通道来减少冗余。  
**2\. 组卷积：**将输入特征图分成多个组，每个组独立进行卷积运算，可以减少参数数量和计算量。  
**3\. 部分卷积（PConv）：**正如论文中提出的，PConv只在输入通道的一部分上应用卷积，减少了计算上的冗余和内存访问，同时仍能有效提取空间特征。

### 2.3手撕结构图 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/42108ce33a41430ba5825f9c88efe440.png)

* * *

三、CSPPC的核心代码 
-------------

```python
import torch
import torch.nn as nn
 
 
__all__ = ['CSPPC']
 
 
 
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
 
class Partial_conv3(nn.Module):
    def __init__(self, dim, n_div, forward):
        super().__init__()
        self.dim_conv3 = dim // n_div
        self.dim_untouched = dim - self.dim_conv3
        self.partial_conv3 = nn.Conv2d(self.dim_conv3, self.dim_conv3, 3, 1, 1, bias=False)
 
        if forward == 'slicing':
            self.forward = self.forward_slicing
        elif forward == 'split_cat':
            self.forward = self.forward_split_cat
        else:
            raise NotImplementedError
 
    def forward_slicing(self, x):
        # only for inference
        x = x.clone()   # !!! Keep the original input intact for the residual connection later
        x[:, :self.dim_conv3, :, :] = self.partial_conv3(x[:, :self.dim_conv3, :, :])
        return x
 
    def forward_split_cat(self, x):
        # for training/inference
        x1, x2 = torch.split(x, [self.dim_conv3, self.dim_untouched], dim=1)
        x1 = self.partial_conv3(x1)
        x = torch.cat((x1, x2), 1)
        return x
 
 
class CSPPC_Bottleneck(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.DualPConv = nn.Sequential(Partial_conv3(dim, n_div=4, forward='split_cat'), Partial_conv3(dim, n_div=4, forward='split_cat'))
 
    def forward(self, x):
        return self.DualPConv(x)
 
 
class CSPPC(nn.Module):
    # CSP Bottleneck with 2 convolutions
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):  # ch_in, ch_out, number, shortcut, groups, expansion
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(CSPPC_Bottleneck(self.c) for _ in range(n))
 
    def forward(self, x):
        y = list(self.cv1(x).split((self.c, self.c), 1))
        y.extend(m(y[-1]) for m in self.m)
        return self.cv2(torch.cat(y, 1))
 
 
if __name__ == "__main__":
    # Generating Sample image
    image_size = (1, 64, 224, 224)
    image = torch.rand(*image_size)
 
    # Model
    model = CSPPC(64, 128)
 
    out = model(image)
    print(out.size())
```

四、CSPPC的添加方式 
-------------

### 4.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn/modules文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1f3baa3ac748462b809a14d265952935.png)

* * *

### 4.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/93b0b385c24645da873a53b3ce63af42.png)

* * *

### 4.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)

* * *

### 4.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9da52c343cb849c39089d2e021fdf379.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

五、CSPPC的yaml文件和运行记录
-------------------

### 5.1 CSPPC的yaml文件一

**下面的添加CSPPC是我实验结果的版本，大家需要注意的是轻量化的结构往往模型收敛速度都会变慢因为模型变简单了，学习特征的能力变弱了，一般需要加大epochs训练的次数。**

```python
# Ultralytics YOLO 🚀, AGPL-3.0 license
# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect
 
# Parameters
nc: 80  # number of classes
scales:  # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
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
  - [-1, 3, CSPPC, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, CSPPC, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, CSPPC, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32
  - [-1, 3, CSPPC, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]  # 9
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4
  - [-1, 3, CSPPC, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, CSPPC, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, CSPPC, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, CSPPC, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

### 5.2 CSPPC的yaml文件二

```python
# Ultralytics YOLO 🚀, AGPL-3.0 license
# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect
 
# Parameters
nc: 80  # number of classes
scales:  # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
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
  - [-1, 3, CSPPC, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, CSPPC, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, CSPPC, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, CSPPC, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

### 5.3 CSPPC的yaml文件三

```python
# Ultralytics YOLO 🚀, AGPL-3.0 license
# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect
 
# Parameters
nc: 80  # number of classes
scales:  # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'
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
  - [-1, 3, CSPPC, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, CSPPC, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, CSPPC, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32
  - [-1, 3, CSPPC, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]  # 9
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4
  - [-1, 3, C2f, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, C2f, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

### 5.4 CSPPC的训练过程截图 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/85544abaa5754cf6a6b9b82c7d0c3913.png)

