 # SAC

一、本文介绍
------

本文给大家带来的改进机制是**可切换的空洞卷积**（Switchable Atrous Convolution, **SAC**）是一种创新的卷积网络机制，专为增强物体检测和分割任务中的特征提取而设计。SAC的**核心思想**是在相同的输入特征上应用不同的空洞率进行卷积，并通过特别设计的开关函数来融合这些不同卷积的结果。这种方法使得网络能够更灵活地适应不同尺度的特征，从而更准确地识别和分割图像中的物体。 **通过本文你能够了解到**：可切换的空洞卷积的基本原理和框架，能够在你自己的网络结构中进行添加(**值得一提的是一个SAConv大概可以降低0.3GFLOPs**)。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f0691a08e44c4509bf82049900d76053.png)

二、SAConv的机制原理介绍
---------------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cb811ce9d34b4e31ade9e8e28b5645b5.png)

 **论文地址：**[官方论文地址](https://ar5iv.labs.arxiv.org/html/2006.02334 "官方论文地址")

**代码地址：**[官方代码地址](https://github.com/joe-siyuan-qiao/DetectoRS/tree/master "官方代码地址")

 ![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e672a6fad00a4c33b2ce0752bf35c16b.png)

**可切换的空洞卷积**（**Switchable Atrous Convolution，简称SAC**）是一种高级的卷积机制，用于在物体检测和分割任务中增强特征提取。以下是SAC的主要原理和机制：

**1\. 不同空洞率的应用:** SAC的核心思想是对相同的输入特征应用不同的空洞率进行卷积。**空洞卷积**通过在卷积核中引入额外的空间（即空洞），扩大了感受野，而不增加参数数量或计算量。SAC利用这一点来捕获不同尺度的特征。

**2\. 开关函数的使用:** SAC的另一个关键特点是使用开关函数来组合不同空洞率卷积的结果。这些开关函数是空间依赖的，意味着特征图的每个位置可能有不同的开关来控制SAC的输出，从而使网络对于特征的大小和尺度更加灵活。

**3\. 转换机制:** SAC能够将传统的卷积层转换为SAC层。这是通过在不同空洞率的卷积操作中使用相同的权重（除了一个可训练的差异）来实现的。这种转换机制包括一个平均池化层和一个1x1卷积层，以实现开关功能。

**4\. 结构设计:** SAC的架构包括三个主要部分：两个全局上下文模块分别位于SAC组件的前后。这些模块有助于更全面地理解图像内容，使SAC组件能够在更宽泛的上下文中有效地工作。

> **总结**：SAC通过这些创新的设计和机制，提高了网络在处理不同尺度和复杂度的特征时的适应性和准确性，从而在物体检测和分割领域显示出显著的性能提升。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0a091a3eab014a6ab0e821350107163c.png)

 上图我们能看到其中的关键点如下->

*   **双重观察机制**: SAC特别设计了一种机制，它能够对输入特征进行两次观察，但每次使用不同的空洞率。这意味着，同一组输入特征会被两种不同配置的卷积核处理，其中每种配置对应一种特定的空洞率。这样做可以捕获不同尺度的特征信息，从而更全面地理解和分析输入数据。
    
*   **开关函数的应用**: 不同空洞率得到的输出结果随后通过开关函数结合在一起。这些开关决定了如何从两次卷积中选择或融合信息，从而生成最终的输出特征。开关的运作方式可能依赖于特征本身的特性，如其空间位置等。

> **总结**：SAC通过这种“双重观察并结合”的策略，能够有效地处理复杂的特征模式，特别是在尺度变化较大的情况下。这种方法不仅提高了特征提取的灵活性和适应性，而且还提升了物体检测和分割任务中的准确性和效率。

![](https://img-blog.csdnimg.cn/9020ea11215443e9ab28a7908839e329.png)

在上图中展示了可切换的空洞卷积（Switchable Atrous Convolution, SAC）的具体实现方式。这里的关键点包括：

1.  **转换传统卷积层为SAC**: 他们将骨干网络ResNet中的每一个3x3卷积层都转换为SAC。这种转换使得卷积计算可以在不同的空洞率之间软切换。
    
2.  **权重共享与训练差异**: 重要的一点是，尽管SAC在不同的空洞率间进行切换，但所有这些操作共享相同的权重，只有一个可训练的差异。这种设计减少了模型复杂性，同时保持了灵活性。
    
3.  **全局上下文模块**: SAC结构还包括两个全局上下文模块，这些模块为特征添加了图像级的信息。全局上下文模块有助于网络更好地理解和处理图像的整体内容，从而提高特征提取的质量和准确性。
    

> **总结**：SAC通过这些机制，允许网络在不同的空洞率之间灵活切换，同时通过全局上下文模块和共享权重的策略，有效地提升了特征的提取和处理能力。这些特性使得SAC在物体检测和分割任务中表现出色。

**下面是部分的检测效果图->** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/397e3e386358406687b6d1771f99cdf8.png)

* * *

三、SAConv代码复现 
-------------

```python
import torch
import torch.nn as nn
from ultralytics.nn.modules.conv import autopad, Conv
 
__all__ = ['SAConv2d', 'C2f_SAConv']
 
class ConvAWS2d(nn.Conv2d):
    def __init__(self,
                 in_channels,
                 out_channels,
                 kernel_size,
                 stride=1,
                 padding=0,
                 dilation=1,
                 groups=1,
                 bias=True):
        super().__init__(
            in_channels,
            out_channels,
            kernel_size,
            stride=stride,
            padding=padding,
            dilation=dilation,
            groups=groups,
            bias=bias)
        self.register_buffer('weight_gamma', torch.ones(self.out_channels, 1, 1, 1))
        self.register_buffer('weight_beta', torch.zeros(self.out_channels, 1, 1, 1))
 
    def _get_weight(self, weight):
        weight_mean = weight.mean(dim=1, keepdim=True).mean(dim=2,
                                                            keepdim=True).mean(dim=3, keepdim=True)
        weight = weight - weight_mean
        std = torch.sqrt(weight.view(weight.size(0), -1).var(dim=1) + 1e-5).view(-1, 1, 1, 1)
        weight = weight / std
        weight = self.weight_gamma * weight + self.weight_beta
        return weight
 
    def forward(self, x):
        weight = self._get_weight(self.weight)
        return super()._conv_forward(x, weight, None)
 
    def _load_from_state_dict(self, state_dict, prefix, local_metadata, strict,
                              missing_keys, unexpected_keys, error_msgs):
        self.weight_gamma.data.fill_(-1)
        super()._load_from_state_dict(state_dict, prefix, local_metadata, strict,
                                      missing_keys, unexpected_keys, error_msgs)
        if self.weight_gamma.data.mean() > 0:
            return
        weight = self.weight.data
        weight_mean = weight.data.mean(dim=1, keepdim=True).mean(dim=2,
                                                                 keepdim=True).mean(dim=3, keepdim=True)
        self.weight_beta.data.copy_(weight_mean)
        std = torch.sqrt(weight.view(weight.size(0), -1).var(dim=1) + 1e-5).view(-1, 1, 1, 1)
        self.weight_gamma.data.copy_(std)
 
 
class SAConv2d(ConvAWS2d):
    def __init__(self,
                 in_channels,
                 out_channels,
                 kernel_size,
                 s=1,
                 p=None,
                 g=1,
                 d=1,
                 act=True,
                 bias=True):
        super().__init__(
            in_channels,
            out_channels,
            kernel_size,
            stride=s,
            padding=autopad(kernel_size, p, d),
            dilation=d,
            groups=g,
            bias=bias)
        self.switch = torch.nn.Conv2d(
            self.in_channels,
            1,
            kernel_size=1,
            stride=s,
            bias=True)
        self.switch.weight.data.fill_(0)
        self.switch.bias.data.fill_(1)
        self.weight_diff = torch.nn.Parameter(torch.Tensor(self.weight.size()))
        self.weight_diff.data.zero_()
        self.pre_context = torch.nn.Conv2d(
            self.in_channels,
            self.in_channels,
            kernel_size=1,
            bias=True)
        self.pre_context.weight.data.fill_(0)
        self.pre_context.bias.data.fill_(0)
        self.post_context = torch.nn.Conv2d(
            self.out_channels,
            self.out_channels,
            kernel_size=1,
            bias=True)
        self.post_context.weight.data.fill_(0)
        self.post_context.bias.data.fill_(0)
 
        self.bn = nn.BatchNorm2d(out_channels)
        self.act = Conv.default_act if act is True else act if isinstance(act, nn.Module) else nn.Identity()
 
    def forward(self, x):
        # pre-context
        avg_x = torch.nn.functional.adaptive_avg_pool2d(x, output_size=1)
        avg_x = self.pre_context(avg_x)
        avg_x = avg_x.expand_as(x)
        x = x + avg_x
        # switch
        avg_x = torch.nn.functional.pad(x, pad=(2, 2, 2, 2), mode="reflect")
        avg_x = torch.nn.functional.avg_pool2d(avg_x, kernel_size=5, stride=1, padding=0)
        switch = self.switch(avg_x)
        # sac
        weight = self._get_weight(self.weight)
        out_s = super()._conv_forward(x, weight, None)
        ori_p = self.padding
        ori_d = self.dilation
        self.padding = tuple(3 * p for p in self.padding)
        self.dilation = tuple(3 * d for d in self.dilation)
        weight = weight + self.weight_diff
        out_l = super()._conv_forward(x, weight, None)
        out = switch * out_s + (1 - switch) * out_l
        self.padding = ori_p
        self.dilation = ori_d
        # post-context
        avg_x = torch.nn.functional.adaptive_avg_pool2d(out, output_size=1)
        avg_x = self.post_context(avg_x)
        avg_x = avg_x.expand_as(out)
        out = out + avg_x
        return self.act(self.bn(out))
 
 
class Bottleneck_SAConv(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = SAConv2d(c_, c2, k[1], 1, g=g)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
 
class C2f_SAConv(nn.Module):
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
            Bottleneck_SAConv(self.c, self.c, shortcut, g, k=((3, 3), (3, 3)), e=1.0) for _ in range(n))
 
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

四、手把手教你添加SAConv 
----------------

### 4.1 SAConv的添加教程

#### 4.1.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c119d0726c94484e88d3f61eeec03265.png)



* * *

#### 4.1.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

* * *

#### 4.1.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)​

* * *

#### 4.1.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cce195e39f8c4538847905dda7c0128f.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

### 4.2 SAConv的yaml文件和训练截图

#### 5.2.1 SAConv的yaml文件

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
  - [-1, 3, C2f_SAConv, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, C2f_SAConv, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, C2f_SAConv, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32
  - [-1, 3, C2f_SAConv, [1024, True]]
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

#### 5.2.2 SAConv的训练过程截图 

> **下面是添加了**SAConv**的训练截图。**
> 
> **下面的是将**SAConv**机制添加到了C2f和Bottleneck。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c390bfa52b3b4fc1b42af2dd43a1bb58.png)

* * *

五、SAConv可添加的位置
--------------

### 5.1 推荐SAConv可添加的位置 

SAConv**可以是一种即插即用的卷积**，其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入SAConv
>     
> 2.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加修改后的C2f和SAConv可以帮助模型更有效地融合不同层次的特征。
>     
> 3.  **检测头中的卷积**：在最终的输出层前加入SAConv可以使模型在做出最终预测之前，更加集中注意力于最关键的特征。
>     

**文字大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

### **5.2图示**LSKAttention**可添加的位置** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2949694815404620bdfb5875286c8e73.png)
