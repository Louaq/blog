 

# 可变形大核注意力（:100:）

**一、本文介绍**
----------

本文给大家带来的改进内容是Deformable-LKA（可变形大核注意力）。Deformable-LKA结合了大卷积核的广阔感受野和可变形卷积的灵活性，有效地处理复杂的视觉信息。这一机制通过动态调整卷积核的形状和大小来适应不同的图像特征，提高了模型对目标形状和尺寸的适应性。在YOLOv8中，Deformable-LKA可以被用于**提升对小目标和不规则形状目标的检测能力**，**特别是在复杂背景或不同光照条件下**。我进行了简单的实验，这一改进显著提高了模型mAP(提高了大概0.8左右)。Deformable-LKA，引入可以将其用在C2f和检测头中进行改进估计效果会更高，所以非常推荐大家使用。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/efc0283dc8d6423db63fbb425a8b9d34.png)

## 二、 Deformable-LKA机制原理







![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/947024a3879d4385a8b2d3e5f2c05660.png)​

**论文地址：**[官方论文地址](https://arxiv.org/pdf/2309.00121.pdf "官方论文地址")

**代码地址：[官方代码地址](https://github.com/xmindflow/deformableLKA/blob/main/2D/deformable_LKA/deformable_LKA.py "官方代码地址")**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bc33d78a133542f2838e656a6d2ef0bd.png)​

* * *

### 2.1 **D**eformable-LKA的基本原理

**Deformable Large Kernel Attention (D-LKA)** 的基本原理是结合了大卷积核和可变形卷积的注意力机制，通过采用大卷积核来模拟类似自我关注的感受野，同时避免了传统自我关注机制的高计算成本。此外，D-LKA通过**可变形卷积**来灵活调整采样网格，使得模型能够更好地适应不同的数据模式。可以将其分为以下几点：

**1\. 大卷积核:** D-LKA 使用大卷积核来捕捉图像的广泛上下文信息，模仿自我关注机制的感受野。

**2\. 可变形卷积:** 结合可变形卷积技术，允许模型的采样网格根据图像特征灵活变形，适应不同的数据模式。

**3\. 2D和3D适应性:** D-LKA的2D和3D版本，使其在处理不同深度的数据时表现出色。

**下面我来分别讲解这三种主要的改进机制->**

### **2.2 大卷积核**

**大卷积核（Large Kernel）**是一种用于捕捉图像中的广泛上下文信息的机制。它模仿自注意力（self-attention）机制的感受野，但是使用更少的参数和计算量。通过**使用深度可分离的卷积（depth-wise convolution）**和**深度可分离的带扩张的卷积（depth-wise dilated convolution）**，可以有效地构造大卷积核。这种方法允许网络在较大的感受野内学习特征，同时通过减少参数数量来降低计算复杂度。在Deformable LKA中，大卷积核与可变形卷积结合使用，进一步增加了模型对复杂图像模式的适应性。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/14fb08d127c640ce9b277d7bdfd905ac.png)



上图为变形大核注意力（Deformable Large Kernel Attention, D-LKA）模块的架构。从图中可以看出，该模块由多个卷积层组成，包括：

1\. 标准的2D卷积（Conv2D）。  
2\. 带有偏移量的变形卷积（Deformable Convolution, Deform-DW Conv2D），允许网络根据输入特征自适应地调整其感受野。  
3\. 偏移场（Offsets Field）的计算，它是由一个标准卷积层生成，用于指导变形卷积层如何调整其采样位置。  
4\. 激活函数GELU，增加非线性。

* * *

### 2.3 **可变形卷积**

**可变形卷积（Deformable Convolution）**被用来增强模型对医学图像中的不规则形状和大小的捕捉能力。可变形卷积通过**添加额外的偏移量**来调整标准卷积的采样位置，从而允许卷积核动态地适应图像的内容。这样的机制使得卷积层能够更加灵活地捕捉到各种形态的结构，特别是在医学图像中常见的不规则和可变形的器官。通过学习图像特征本身来确定这些偏移量，可变形卷积能够提供一种自适应的内核形状，这有助于提升分割的精确性和边缘定义。

* * *

### 2.4 **2D和3D适应性**

2D和3D适应性指的是Deformable Large Kernel Attention（D-LKA）技术**应用于不同维度数据的能力**。**2D D-LKA**专为处理二维图像数据设计，适用于常见的医学成像方法，如X射线或MRI中的单层切片。而**3D D-LKA**则扩展了这种技术，使其能够处理三维数据集，充分利用体积图像数据中的空间上下文信息。3D版本特别擅长于交叉深度数据理解，即能够在多个层面上分析和识别图像特征，这对于体积重建和更复杂的医学成像任务非常有用。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b7199cc994d14de1b1694c18188bed10.png)



上图展示了3D和2D Deformable Large Kernel Attention（D-LKA）模型的网络架构。左侧是3D D-LKA模型，右侧是2D D-LKA模型。

**1\. 3D D-LKA模型（左侧）**：包含多个3D D-LKA块，这些块在下采样和上采样之间交替，用于深度特征学习和分辨率恢复。

**2\. 2D D-LKA模型（右侧）**：利用MaxViT块作为编码器组件，并在不同的分辨率级别上使用2D D-LKA块，通过扩展（Patch Expanding）和D-LKA注意力机制进行特征学习。

* * *

三、**D**\-LKA代码和C2f-**D**\-LKA
-----------------------------

**使用方法看章节四** 

```python
import torchvision
import torch.nn as nn
import torch
 
__all__ = ['C2f_DLKA', 'deformable_LKA_Attention']
 
 
class DeformConv(nn.Module):
 
    def __init__(self, in_channels, groups, kernel_size=(3, 3), padding=1, stride=1, dilation=1, bias=True):
        super(DeformConv, self).__init__()
 
        self.offset_net = nn.Conv2d(in_channels=in_channels,
                                    out_channels=2 * kernel_size[0] * kernel_size[1],
                                    kernel_size=kernel_size,
                                    padding=padding,
                                    stride=stride,
                                    dilation=dilation,
                                    bias=True)
 
        self.deform_conv = torchvision.ops.DeformConv2d(in_channels=in_channels,
                                                        out_channels=in_channels,
                                                        kernel_size=kernel_size,
                                                        padding=padding,
                                                        groups=groups,
                                                        stride=stride,
                                                        dilation=dilation,
                                                        bias=False)
 
    def forward(self, x):
        offsets = self.offset_net(x)
        out = self.deform_conv(x, offsets)
        return out
 
 
class deformable_LKA(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.conv0 = DeformConv(dim, kernel_size=(5, 5), padding=2, groups=dim)
        self.conv_spatial = DeformConv(dim, kernel_size=(7, 7), stride=1, padding=9, groups=dim, dilation=3)
        self.conv1 = nn.Conv2d(dim, dim, 1)
 
    def forward(self, x):
        u = x.clone()
        attn = self.conv0(x)
        attn = self.conv_spatial(attn)
        attn = self.conv1(attn)
        return u * attn
 
 
class deformable_LKA_Attention(nn.Module):
    def __init__(self, d_model):
        super().__init__()
 
        self.proj_1 = nn.Conv2d(d_model, d_model, 1)
        self.activation = nn.GELU()
        self.spatial_gating_unit = deformable_LKA(d_model)
        self.proj_2 = nn.Conv2d(d_model, d_model, 1)
 
    def forward(self, x):
        shorcut = x.clone()
        x = self.proj_1(x)
        x = self.activation(x)
        x = self.spatial_gating_unit(x)
        x = self.proj_2(x)
        x = x + shorcut
        return x
 
 
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
 
 
class Bottleneck_DLKA(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c2, k[0], 1)
        self.cv2 = deformable_LKA_Attention(c2)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
 
class C2f_DLKA(nn.Module):
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
            Bottleneck_DLKA(self.c, self.c, shortcut, g, k=((3, 3), (3, 3)), e=1.0) for _ in range(n))
 
    def forward(self, x):
        """Forward pass through C2f layer."""
        x = self.cv1(x)
        x = x.chunk(2, 1)
        y = list(x)
        # y = list(self.cv1(x).chunk(2, 1))
        y.extend(m(y[-1]) for m in self.m)
        return self.cv2(torch.cat(y, 1))
 
    def forward_split(self, x):
        """Forward pass using split() instead of chunk()."""
        y = list(self.cv1(x).split((self.c, self.c), 1))
        y.extend(m(y[-1]) for m in self.m)
        return self.cv2(torch.cat(y, 1))
 
 
if __name__ == '__main__':
    x = torch.randn(1, 32, 16, 16)
    model = deformable_LKA_Attention(32)
    print(model(x).shape)
```

四、手把手教你添加**D**\-LKA
-------------------

#### 4.1.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn/modules文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/4a540cdf61324eb690176599671a1fe0.png)

* * *

#### 4.1.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

#### 4.1.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)

* * *

#### 4.1.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/164f71aa184742898091fa34473d6f93.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

* * *

### 4.2 **D**\-LKA的yaml文件和训练截图(仔细看这个否则会报错)

#### 4.2.1 **D**\-LKA的yaml文件一(推荐)

**下面的配置文件为我修改的C2f-D**\-LKA**的位置(上面的实验结果是用这个方法跑出来的)。**

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
  - [-1, 1, Conv, [128]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, Conv, [256]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, Conv, [512]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, Conv, [1024]]  # 7-P5/32
  - [-1, 3, C2f, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]  # 9
 
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4
  - [-1, 3, C2f, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, C2f_DLKA, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_DLKA, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_DLKA, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

#### 4.2.2 **D**\-LKA的yaml文件二

**这个文件是另一种添加的方式，和上面的思想也不一样，那个效果更好针对不同的数据集可能也不一样所以大家需要进行尝试。**

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
  - [-1, 3, C2f, [256]]  # 15 (P3/8-small)
  - [-1, 3, deformable_LKA_Attention, []]  # 16 (P5/32-large)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 19 (P4/16-medium)
  - [-1, 3, deformable_LKA_Attention, []]  # 20 (P5/32-large)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 23 (P5/32-large)
  - [-1, 3, deformable_LKA_Attention, []]  # 24 (P5/32-large)
 
  - [[16, 20, 24], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 **D**\-LKA的训练过程截图 

**下面是添加了D**\-LKA**的训练截图。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/819e6701357e4664a9e04645d90b881f.png)​​​​

* * *

五、**D**\-LKA可添加的位置
------------------

### 5.1 推荐**D**\-LKA可添加的位置 

**D**\-LKA**是一种即插即用的模块**，其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入**D\-LKA(yaml文件二)**。
>     
> 2.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加修改后的C2f\_D\-LKA可以帮助模型更有效地融合不同层次的特征(**yaml文件一**)。
>     
> 3.  **检测头中的卷积**：在最终的输出层前加入D\-LKA可以使模型在做出最终预测之前，更加集中注意力于最关键的特征(**我没有进行尝试大家有兴趣的可以试试**)。
>     

**文字大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

* * *

### **5.2 图示D**\-LKA**可添加的位置** 

![2949694815404620bdfb5875286c8e73.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2949694815404620bdfb5875286c8e73.png)​​​​

