 # SCConv

一、本文介绍
------

本文给大家带来的改进内容是**SCConv**，即空间和通道重构卷积，是一种发布于2023.9月份的一个新的改进机制。它的核心创新在于能够同时处理图像的空间**（形状、结构）**和通道（**色彩、深度）**信息，这样的处理方式使得SCConv在分析图像时更加精细和高效。这种技术不仅适用于复杂场景的图像处理，还能在普通的对象检测任务中提供更高的精确度**(亲测在小目标检测和正常的物体检测中都有效提点)**。SCConv的这种能力，特别是在处理大量数据和复杂图像时的优势。本文通过先介绍SCConv的基本网络结构和原理当大家对该卷积有一个大概的了解，然后教大家如何将该卷积添加到自己的网络结构中**(值得一提的是该卷积的GFLOPs降低了0.3左右适合轻量化的读者)** 。

![44308abda9734a91ad908faca9a7fd5a.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/44308abda9734a91ad908faca9a7fd5a.png)

* * *

 二、网络结构讲解
---------

![51a53656d50a4c3d8715d8357595201d.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/51a53656d50a4c3d8715d8357595201d.png)

**论文地址：**[官方论文地址](https://openaccess.thecvf.com/content/CVPR2023/papers/Li_SCConv_Spatial_and_Channel_Reconstruction_Convolution_for_Feature_Redundancy_CVPR_2023_paper.pdf "官方论文地址")

**代码地址：[官方代码地址](https://github.com/cheng-haha/ScConv/blob/main/ScConv.py "官方代码地址")**

![107067b614d447b58528d6c435965dd2.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/107067b614d447b58528d6c435965dd2.png)

* * *

### 2.1 SCConv的主要思想

**SCConv（空间和通道重构卷积**）的高效卷积模块，以减少卷积神经网络（CNN）中的空间和通道冗余。SCConv旨在通过优化特征提取过程，减少计算资源消耗并提高网络性能。该模块包括两个单元：

**1.空间重构单元（SRU）**：SRU通过分离和重构方法来减少空间冗余。

**2.通道重构单元（CRU）**：CRU采用分割-变换-融合策略来减少通道冗余。

**下面是SCConv的结构示意图->**

![c0aa4cd5b2f24a59b39a078abc29e91d.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c0aa4cd5b2f24a59b39a078abc29e91d.png)

**下面我将分别解释这两个单元->**

* * *

### 2.2 **空间重构单元（SRU）**

**空间重构单元**（**SRU**）是SCConv模块的一部分，负责减少特征在空间维度上的冗余。SRU接收输入特征，并通过以下步骤处理：

1\. 组归一化（Group Normalization）：首先对输入特征进行归一化，以减少不同特征图之间的尺度差异。  
2\. 权重生成：通过应用归一化和激活函数，如Sigmoid，从归一化的特征图中生成权重。  
3\. 特征分离：根据生成的权重，对输入特征进行分离，形成多个子特征集。  
4\. 特征重构：最后，这些分离出来的特征集经过变换和重组，产生空间精炼的特征输出，以便进一步处理。

![6c0b287f19104d6cad1a886d2fd587b9.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6c0b287f19104d6cad1a886d2fd587b9.png)

上图展示了空间重构单元（SRU）的架构。SRU的工作流程如下：

1\. 输入特征X：首先进行组归一化（GN）处理。  
2\. 分离：通过一系列的权重 ${W_1}$, ${W_2}$, ..., ${W_C}$对特征进行加权，这些权重是通过输入特征的通道![eq?%5Cgamma_1%2C%20%5Cgamma_2%2C%20...%2C%20%5Cgamma_c](https://latex.csdn.net/eq?%5Cgamma_1%2C%20%5Cgamma_2%2C%20...%2C%20%5Cgamma_c) 经过归一化和非线性激活函数（如Sigmoid)计算得到的。  
3\. 重构：加权后的特征被分割成两个部分 ${X^1_{W}}$ 和${X^2_{W}}$ ，然后这两部分各自经过变换，最终通过加法和拼接操作重构，得到空间精炼特征${X_{W}}$ 。

> **总结**：这个单元的设计目的是为了减少输入特征的空间冗余，从而提高卷积神经网络处理特征的效率。

* * *

### 2.3 **通道重构单元（CRU）**

**通道重构单元**（**CRU**）是SCConv模块的一部分，旨在减少卷积神经网络特征的通道冗余。CRU对经过空间重构单元（SRU）处理后的特征进一步操作，通过以下步骤减少通道冗余：

![f3d201d671a64fcbbea33a99438fb3d8.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f3d201d671a64fcbbea33a99438fb3d8.png)

上图详细展示了通道重构单元（CRU）的架构，该单元从空间精炼特征${X_{W}}$ 开始进行处理。CRU的工作流程包括以下几个步骤：

1\. 分割（Split）：特征 ${X_{W}}$  被分割成两部分，通过不同比例的${a}$ 和${(1-a)}$  路径进行不同的1x1卷积处理。  
2\. 变换（Transform）：通过全局卷积（GWC）和点卷积（PWC）进一步变换这两部分特征。  
3\. 融合（Fuse）：两个变换后的特征 ${Y_1}$ 和 ${Y_2}$ 经过池化和SoftMax加权融合，形成最终的通道精炼特征 ${Y}$。

> **总结：**这种结构旨在通过细致地处理各个通道，减少不必要的信息，并提高网络的整体性能和效率。通过这一过程，CRU有效地提高了特征的表征效率，同时减少了模型的参数数量和计算成本。

* * *

三、SCConv代码
----------

### 3.1 SCConv核心代码

**该代码为SCConv的本体，使用方式请看章节四。**

```cobol
import torch
import torch.nn.functional as F
import torch.nn as nn
 
 
class GroupBatchnorm2d(nn.Module):
    def __init__(self, c_num: int,
                 group_num: int = 16,
                 eps: float = 1e-10
                 ):
        super(GroupBatchnorm2d, self).__init__()
        assert c_num >= group_num
        self.group_num = group_num
        self.weight = nn.Parameter(torch.randn(c_num, 1, 1))
        self.bias = nn.Parameter(torch.zeros(c_num, 1, 1))
        self.eps = eps
 
    def forward(self, x):
        N, C, H, W = x.size()
        x = x.view(N, self.group_num, -1)
        mean = x.mean(dim=2, keepdim=True)
        std = x.std(dim=2, keepdim=True)
        x = (x - mean) / (std + self.eps)
        x = x.view(N, C, H, W)
        return x * self.weight + self.bias
 
 
class SRU(nn.Module):
    def __init__(self,
                 oup_channels: int,
                 group_num: int = 16,
                 gate_treshold: float = 0.5,
                 torch_gn: bool = True
                 ):
        super().__init__()
 
        self.gn = nn.GroupNorm(num_channels=oup_channels, num_groups=group_num) if torch_gn else GroupBatchnorm2d(
            c_num=oup_channels, group_num=group_num)
        self.gate_treshold = gate_treshold
        self.sigomid = nn.Sigmoid()
 
    def forward(self, x):
        gn_x = self.gn(x)
        w_gamma = self.gn.weight / sum(self.gn.weight)
        w_gamma = w_gamma.view(1, -1, 1, 1)
        reweigts = self.sigomid(gn_x * w_gamma)
        # Gate
        w1 = torch.where(reweigts > self.gate_treshold, torch.ones_like(reweigts), reweigts)  # 大于门限值的设为1，否则保留原值
        w2 = torch.where(reweigts > self.gate_treshold, torch.zeros_like(reweigts), reweigts)  # 大于门限值的设为0，否则保留原值
        x_1 = w1 * x
        x_2 = w2 * x
        y = self.reconstruct(x_1, x_2)
        return y
 
    def reconstruct(self, x_1, x_2):
        x_11, x_12 = torch.split(x_1, x_1.size(1) // 2, dim=1)
        x_21, x_22 = torch.split(x_2, x_2.size(1) // 2, dim=1)
        return torch.cat([x_11 + x_22, x_12 + x_21], dim=1)
 
 
class CRU(nn.Module):
    '''
    alpha: 0<alpha<1
    '''
 
    def __init__(self,
                 op_channel: int,
                 alpha: float = 1 / 2,
                 squeeze_radio: int = 2,
                 group_size: int = 2,
                 group_kernel_size: int = 3,
                 ):
        super().__init__()
        self.up_channel = up_channel = int(alpha * op_channel)
        self.low_channel = low_channel = op_channel - up_channel
        self.squeeze1 = nn.Conv2d(up_channel, up_channel // squeeze_radio, kernel_size=1, bias=False)
        self.squeeze2 = nn.Conv2d(low_channel, low_channel // squeeze_radio, kernel_size=1, bias=False)
        # up
        self.GWC = nn.Conv2d(up_channel // squeeze_radio, op_channel, kernel_size=group_kernel_size, stride=1,
                             padding=group_kernel_size // 2, groups=group_size)
        self.PWC1 = nn.Conv2d(up_channel // squeeze_radio, op_channel, kernel_size=1, bias=False)
        # low
        self.PWC2 = nn.Conv2d(low_channel // squeeze_radio, op_channel - low_channel // squeeze_radio, kernel_size=1,
                              bias=False)
        self.advavg = nn.AdaptiveAvgPool2d(1)
 
    def forward(self, x):
        # Split
        up, low = torch.split(x, [self.up_channel, self.low_channel], dim=1)
        up, low = self.squeeze1(up), self.squeeze2(low)
        # Transform
        Y1 = self.GWC(up) + self.PWC1(up)
        Y2 = torch.cat([self.PWC2(low), low], dim=1)
        # Fuse
        out = torch.cat([Y1, Y2], dim=1)
        out = F.softmax(self.advavg(out), dim=1) * out
        out1, out2 = torch.split(out, out.size(1) // 2, dim=1)
        return out1 + out2
 
 
class ScConv(nn.Module):
    def __init__(self,
                 op_channel: int,
                 group_num: int = 4,
                 gate_treshold: float = 0.5,
                 alpha: float = 1 / 2,
                 squeeze_radio: int = 2,
                 group_size: int = 2,
                 group_kernel_size: int = 3,
                 ):
        super().__init__()
        self.SRU = SRU(op_channel,
                       group_num=group_num,
                       gate_treshold=gate_treshold)
        self.CRU = CRU(op_channel,
                       alpha=alpha,
                       squeeze_radio=squeeze_radio,
                       group_size=group_size,
                       group_kernel_size=group_kernel_size)
 
    def forward(self, x):
        x = self.SRU(x)
        x = self.CRU(x)
        return x
 
 
if __name__ == '__main__':
    x = torch.randn(1, 32, 16, 16)
    model = ScConv(32)
    print(model(x).shape)
```

* * *

### 3.2 在SCConv外层套用函数代码

**因为以上的代码不能够直接使用在我们的YOLOv8中会报错而且参数对不上，我对其外层嵌套了一个模块。** 

```cobol
class SCConv_yolov8(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size=1, stride=1, g=1, dilation=1):
        super().__init__()
        self.conv = Conv(in_channels, out_channels, k=1)
 
        self.RFAConv = ScConv(out_channels)
 
        self.bn = nn.BatchNorm2d(out_channels)
 
        self.gelu = nn.GELU()
 
    def forward(self, x):
        x = self.conv(x)
 
        x = self.RFAConv(x)
 
        x = self.gelu(self.bn(x))
        return x
```

* * *

### 3.3 修改了SCConv的C2f和Bottleneck模块

```cobol
class Bottleneck_SCConv(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = SCConv_yolov8(c_, c2, k[1], 1, g=g)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
 
class C2f_SCConv(nn.Module):
    """Faster Implementation of CSP Bottleneck with 2 convolutions."""
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):
        """Initialize CSP bottleneck layer with two convolutions with arguments ch_in, ch_out, number, shortcut, groups,
        expansion.
        """
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(Bottleneck_SCConv(self.c, self.c, shortcut, g, k=((3, 3), (3, 3)), e=1.0) for _ in range(n))
 
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
```

* * *

四、手把手教你添加SCConv和C2f\_SCConv模块
-----------------------------

### 4.1 SCConv的添加教程

添加教程这里不再重复介绍、因为专栏内容有许多，添加过程又需要截特别图片会导致文章大家读者也不通顺如果你已经会添加注意力机制了，可以跳过本章节，**如果你还不会，大家可以看我下面的文章**，里面详细的介绍了拿到一个任意机制(C2f、Conv、Bottleneck、Loss、DetectHead)如何添加到你的网络结构中去。

**这个卷积也可以放在C2f和Bottleneck中进行使用可以即插即用，个人觉得放在Bottleneck中效果比较好。**

* * *

### 4.2 SCConv的yaml文件和训练截图

#### 4.2.1 SCConv的yaml文件

**下面的配置文件为我修改的**SCConv**的位置。**

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
  - [-1, 3, C2f_SCConv, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_SCConv, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_SCConv, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 SCConv的训练过程截图 

> **下面是添加了**SCConv**的训练截图。**
> 
> **下面的是将**SCConv**机制添加到了C2f和Bottleneck。**

![bffb59f35cec47e5ae19b71e10294b4b.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bffb59f35cec47e5ae19b71e10294b4b.png)​​​

* * *

五、SCConv可添加的位置
--------------

### 5.1 推荐SCConv可添加的位置 

**SCConv是一种即插即用的模块，**其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入SCConv
>     
> 2.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加修改后的C2f\_SCConv可以帮助模型更有效地融合不同层次的特征。
>     
> 3.  **检测头中的卷积**：在最终的输出层前加入SCConv可以使模型在做出最终预测之前，更加集中注意力于最关键的特征。
>     

**文字大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

* * *

### **5.2 图示**SCConv**可添加的位置** 

![2949694815404620bdfb5875286c8e73.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2949694815404620bdfb5875286c8e73.png)​​​

