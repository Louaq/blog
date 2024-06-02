 # Context Guided Block

一、本文介绍
------

本文给大家带来的是改进机制是一种替换Conv的模块**Context Guided Block (CG block)** ，其是在CGNet论文中提出的一种模块，其基本原理是**模拟人类视觉系统依赖上下文信息来理解场景**。CG block 用于捕获局部特征、周围上下文和全局上下文，并将这些**信息融合**起来以提高准确性。**(经过我检验分别在三种数据集上，大中小均进行了150轮次的实验，均有一定程度上的涨点，下面我选取了一种中等大小的数据集的结果进行了对比)**，同时本文的修改方法和之前的普通卷积模块也有所不同，大家需要注意看章节四进行修改。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f15084a6bccc4358a6f70b8c55d6559c.png)

* * *

**二、ContextGuidedBlock\_Down模块原理**
----------------------------------

![](https://img-blog.csdnimg.cn/direct/3a84787d86844123b85ad23eafd4f36d.png)​

**论文地址：[官方论文地址](https://arxiv.org/pdf/1811.08201.pdf "官方论文地址")**

**代码地址：[官方代码地址](https://github.com/wutianyiRosun/CGNet "官方代码地址")**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e7b46a2e1fe840c79fc6fdeed35e4cd1.png)​

* * *

### **2.1  ContextGuidedBlock\_Down的基本原理**

**Context Guided Block (CG block)** 在CGNet中的基本原理是**模拟人类视觉系统依赖上下文信息来理解场景**。CG block 用于捕获局部特征、周围上下文和全局上下文，并将这些信息融合起来以提高语义分割的准确性。这一模块包含以下部分：

**1\. 局部特征提取器（floc）：** 使用标准卷积层学习局部特征。  
**2\. 周围上下文提取器（fsur）：** 使用空洞/膨胀卷积层来学习更大接收野的周围上下文。  
**3\. 联合特征提取器（fjoi）：** 通过连接层和批量归一化（BN）以及参数化ReLU（PReLU）操作来融合局部特征和周围上下文的输出，获取联合特征。  
**4\. 全局上下文提取器（fglo）**：使用全局平均池化层聚合全局上下文，并通过多层感知器来进一步提取全局上下文。然后，使用缩放层以提取的全局上下文对联合特征进行加权，以强调有用的组件并抑制无用的组件。

这个过程是自适应的，因为提取的全局上下文是基于输入图像生成的。CG block 的设计允许CGNet能够有效地从底层到顶层聚合上下文信息，并在**语义层面**（来自深层）和**空间层面**（来自浅层）捕获上下文信息，这对于语义分割至关重要。

下面就为大家展示了**三种用于语义分割的不同架构**：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/efda067b88c84fe9ba032745c8e11886.png)



**(a) FCN-shape（全卷积网络形状）：** 此模型遵循图像分类的设计原则，忽略了上下文信息。它可能使用一系列卷积和池化层来处理输入图像，并生成输出，但没有显式地对各个层次的特征周围上下文进行建模。

**(b) FCN-CM（全卷积网络-上下文模块）：** 此模型只在编码阶段后捕获上下文信息，通过执行一个上下文模块来从语义层次提取上下文信息。

**(c) 我们提出的CGNet（上下文引导网络）：** 捕获所有阶段的上下文特征，从语义层次和空间层次两方面进行。

>  **总结**：CGB\_Down的设计旨在充分利用局部特征、周围上下文和全局上下文，通过这种结构设计，CGNet能够在局部和全局上下文之间建立联系，这对于准确分类图像中的每个像素至关重要。此外，CGB\_Down还采用了残差学习来帮助学习复杂特征并在训练期间改善梯度的反向传播。

* * *

### 2.2  **局部特征提取器**

**局部特征提取器**（记为${floc(*)}$）是上下文引导块（CG block）的一个组成部分，专门用于**学习输入数据中的局部特征**。在CGNet的设计中，这个局部特征提取器通过**标准的3×3卷积层**实现，其目的是从图像中的局部区域提取特征。这些局部特征随后与周围上下文特征结合，形成了网络对各个区域的全面理解，这对于语义分割尤为重要。

CGNet使用的局部特征提取器与**周围上下文提取器**（${fsur(*)}$）一起工作，确保模型不仅能够理解每个像素或局部区域的信息，而且还能理解这些区域在整体上下文中的关系。这种提取器能够捕捉到的细节和局部变化信息对于精确地分类图像中的每个像素至关重要，特别是在需要细粒度预测的任务中，如在复杂场景中区分不同的物体和表面。

CGNet的结构设计还包括**减少参数数量**，其中局部特征提取器和周围上下文提取器采用了**通道卷积（channel-wise convolutions）**，以减少跨通道的计算成本并大幅节约内存。这种设计允许CGNet即使在资源受限的环境中（如移动设备）也能有效运行，同时保持高准确率和实时性。

* * *

### 2.3  **周围上下文提取器**

**周围上下文提取器**（${f_{sur}(*)}$）在CGNet架构中的**作用和原理**包括：

**1\. 提取更广泛的上下文信息**：周围上下文提取器使用扩展卷积（例如空洞卷积）来增加感受野的大小，从而捕获更宽广的上下文信息。这允许模型观察到更大区域的特征，而不仅仅是局部的细节。

**2\. 辅助局部特征理解**：通过结合局部特征和周围上下文（${f_{sur}(*)}$）能够提供额外的信息，帮助模型更好地理解复杂的场景。例如，在辨识一个物体时，除了物体本身的特征外，它的周围环境也提供了重要的线索。

**3\. 改进语义分割的准确性**：研究表明，周围上下文的信息对于提高语义分割的准确性非常有益。在不同的架构实验中，引入${f_{sur}(*)}$都能显著提升分割的准确率。

**4\. 在网络的所有块中使用**：为了充分利用周围上下文的优势，${f_{sur}(*)}$在CGNet的所有块中都有应用，以保证整个网络都能受益于周围上下文信息的提取。

**5\. 空间金字塔池化**：在一些变体中，${f_{sur}(*)}$可能会采用空间金字塔池化来聚合不同尺度的上下文信息，这有助于模型捕捉从最小的细节到整体布局的不同层面的信息。

> **总结**：通过这些设计，周围上下文提取器加强了CGNet处理各种尺度信息的能力，这在处理高分辨率图像和复杂场景的语义分割任务中尤其重要。 

* * *

### 2.4  **联合特征提取器**

**联合特征提取器**（$f_{joi}(*)$）在CGNet中的作用是整合由局部特征提取器和周围上下文提取器提取的特征。这些特征分别捕捉到了输入数据的细节（局部特征）和更广阔区域内的信息（周围上下文）。联合特征提取器的设计目的是为了使得网络能够同时考虑局部和上下文信息，从而提高语义分割的准确性。**下面是它的一些关键点：**

**1\. 特征融合**：联合特征提取器通过连接（concatenation）操作将局部特征和周围上下文特征结合起来，形成一个综合的特征表示。

**2\. 增强特征表示**：联合后的特征通过批量归一化（Batch Normalization, BN）和参数化的线性单元（Parametric ReLU, PReLU）等操作进行进一步的加工，以增强特征表示的能力。

**3\. 全局上下文的整合**：在某些设计中，联合特征还会与全局上下文特征（$f_{glo}(*)$）结合，以利用整个输入图像的信息来进一步优化特征。

联合特征提取器是上下文引导网络**实现其高效语义分割能力的关键连接点**，它允许网络在局部精细度和全局上下文间达到平衡.

下图为大家展示了**上下文引导网络（Context Guided Network, CGNet）的架构**。这个网络通过以下阶段处理输入图像来生成预测：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a6bee5d5d0f74121bbf20053d83c2653.png)​

**1\. Stage 1**：包含连续的3x3卷积层，这些层负责提取输入图像的初步特征。

**2\. Stage 2**：由多个CG块组成，数量用"M"表示。每个CG块都结合了局部特征提取器和周围上下文提取器，它们一起工作以捕获更复杂的局部和上下文信息。

**3\. Stage 3**：包含更多的CG块，数量用"N"表示，这一阶段进一步提炼特征，以捕捉更高层次的上下文信息。

**4\. 1x1 Conv**：一个1x1的卷积层用于将特征映射到目标类别的数量，为最终的上采样和分类做准备。

**5\. 上采样（Upsample）**：使用上采样或逆卷积操作将特征图尺寸扩大回输入图像的尺寸。

**6\. 预测（Prediction）**：最终的预测图，其中每个像素被分配了一个类别标签，展示了对输入图像进行语义分割的结果。

> **总结**：CGNet的设计旨在实现高效的语义分割，通过在网络的不同阶段利用局部和全局上下文信息来提高准确率，同时保持模型的轻量级特性。这使CGNet特别适合于资源受限的设备，如移动设备或嵌入式系统。在图中的预测示例中，可以看到网络已经将不同的交通参与者和背景要素成功地分割出来，用不同的颜色标记不同的类别。

* * *

### 2.5  **全局上下文提取器**

**全局上下文提取器**（${f_{glo}(*)}$）在CGNet中的作用是**捕获并利用整个输入图像的全局信息**，以增强联合特征提取器学习到的特征。**以下是它的基本原理**：

**1\. 全局特征汇总**：全局上下文提取器通过**全局平均池化**（Global Average Pooling, GAP）来聚合整个特征图的全局信息。这个步骤产生一个全局特征向量，它捕获了输入图像中每个通道的平均响应。

**2\. 多层感知机处理**：全局特征向量随后通过一个**多层感知机**（Multilayer Perceptron, MLP）进一步处理。MLP能够学习特征间的复杂非线性关系，进一步细化全局上下文特征。

**3\. 特征重标定**：提取的全局上下文通过**缩放层**（scale layer）与联合特征结合。这个操作相当于将全局上下文信息作为权重，通道级别地重新标定联合特征，强调有用的特征部分，抑制不重要的特征部分。

**4\. 自适应性**：全局上下文提取器的操作是自适应的，因为提取的全局上下文是根据输入图像生成的，使得网络能够针对不同的图像生成定制化的全局上下文。

**5\. 提高分割准确性**：在消融研究中，使用全局上下文提取器可以提高分割的准确性。这证明了全局上下文在提升模型性能方面的价值。

提供了**上下文引导块（Context Guided block）的概览**。在图中的全局上下文提取器${f_{glo}(*)}$部分，展示了使用**全局平均池化**（GAP）来提取全图的上下文信息，然后通过**两个全连接层**（FC）对这些信息进行进一步的处理。这有助于网络理解整个图像的全局信息，这对于分类图像中的局部区域特别重要，尤其是在这些局部区域的类别可能依赖于全局上下文的情况下。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e12ec53c9fc8498a90cba0b1bc97fb58.png)​

这些组件共同工作，提高了网络对复杂场景中各种尺度的特征的理解能力，使得CGNet能够更准确地进行语义分割。通过这样的设计，CGNet能够在局部和全局上下文之间建立联系，这对于准确分类图像中的每个像素至关重要。

* * *

三、**ContextGuided的核心代码**
------------------------

我们复制下面的代码'ultralytics/nn/modules'到该目录下，创建一个py文件粘贴进去，我这里起名为ContextGuided**(这里有一个注意点是不要和定义的类重名有时候会报错)。

```python
import torch
import torch.nn as nn
 
__all__ = ['C2f_Context', 'ContextGuidedBlock_Down']
 
class ConvBNPReLU(nn.Module):
    def __init__(self, nIn, nOut, kSize, stride=1):
        """
        args:
            nIn: number of input channels
            nOut: number of output channels
            kSize: kernel size
            stride: stride rate for down-sampling. Default is 1
        """
        super().__init__()
        if isinstance(kSize, tuple):
            kSize = kSize[0]
        padding = int((kSize - 1) / 2)
        self.conv = nn.Conv2d(nIn, nOut, (kSize, kSize), stride=stride, padding=(padding, padding), bias=False)
        self.bn = nn.BatchNorm2d(nOut, eps=1e-03)
        self.act = nn.PReLU(nOut)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: transformed feature map
        """
        output = self.conv(input)
        output = self.bn(output)
        output = self.act(output)
        return output
 
 
class BNPReLU(nn.Module):
    def __init__(self, nOut):
        """
        args:
           nOut: channels of output feature maps
        """
        super().__init__()
        self.bn = nn.BatchNorm2d(nOut, eps=1e-03)
        self.act = nn.PReLU(nOut)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: normalized and thresholded feature map
        """
        output = self.bn(input)
        output = self.act(output)
        return output
 
 
class ConvBN(nn.Module):
    def __init__(self, nIn, nOut, kSize, stride=1):
        """
        args:
           nIn: number of input channels
           nOut: number of output channels
           kSize: kernel size
           stride: optinal stide for down-sampling
        """
        super().__init__()
        if isinstance(kSize, tuple):
            kSize = kSize[0]
        padding = int((kSize - 1) / 2)
        self.conv = nn.Conv2d(nIn, nOut, (kSize, kSize), stride=stride, padding=(padding, padding), bias=False)
        self.bn = nn.BatchNorm2d(nOut, eps=1e-03)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: transformed feature map
        """
        output = self.conv(input)
        output = self.bn(output)
        return output
 
 
class Conv(nn.Module):
    def __init__(self, nIn, nOut, kSize, stride=1):
        """
        args:
            nIn: number of input channels
            nOut: number of output channels
            kSize: kernel size
            stride: optional stride rate for down-sampling
        """
        super().__init__()
        if isinstance(kSize, tuple):
            kSize = kSize[0]
        padding = int((kSize - 1) / 2)
        self.conv = nn.Conv2d(nIn, nOut, (kSize, kSize), stride=stride, padding=(padding, padding), bias=False)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: transformed feature map
        """
        output = self.conv(input)
        return output
 
 
class ChannelWiseConv(nn.Module):
    def __init__(self, nIn, nOut, kSize, stride=1):
        """
        Args:
            nIn: number of input channels
            nOut: number of output channels, default (nIn == nOut)
            kSize: kernel size
            stride: optional stride rate for down-sampling
        """
        super().__init__()
        if isinstance(kSize, tuple):
            kSize = kSize[0]
        padding = int((kSize - 1) / 2)
        self.conv = nn.Conv2d(nIn, nOut, (kSize, kSize), stride=stride, padding=(padding, padding), groups=nIn,
                              bias=False)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: transformed feature map
        """
        output = self.conv(input)
        return output
 
 
class DilatedConv(nn.Module):
    def __init__(self, nIn, nOut, kSize, stride=1, d=1):
        """
        args:
           nIn: number of input channels
           nOut: number of output channels
           kSize: kernel size
           stride: optional stride rate for down-sampling
           d: dilation rate
        """
        super().__init__()
        if isinstance(kSize, tuple):
            kSize = kSize[0]
        padding = int((kSize - 1) / 2) * d
        self.conv = nn.Conv2d(nIn, nOut, (kSize, kSize), stride=stride, padding=(padding, padding), bias=False,
                              dilation=d)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: transformed feature map
        """
        output = self.conv(input)
        return output
 
 
class ChannelWiseDilatedConv(nn.Module):
    def __init__(self, nIn, nOut, kSize, stride=1, d=1):
        """
        args:
           nIn: number of input channels
           nOut: number of output channels, default (nIn == nOut)
           kSize: kernel size
           stride: optional stride rate for down-sampling
           d: dilation rate
        """
        super().__init__()
        if isinstance(kSize, tuple):
            kSize = kSize[0]
        padding = int((kSize - 1) / 2) * d
        self.conv = nn.Conv2d(nIn, nOut, (kSize, kSize), stride=stride, padding=(padding, padding), groups=nIn,
                              bias=False, dilation=d)
 
    def forward(self, input):
        """
        args:
           input: input feature map
           return: transformed feature map
        """
        output = self.conv(input)
        return output
 
class FGlo(nn.Module):
    """
    the FGlo class is employed to refine the joint feature of both local feature and surrounding context.
    """
 
    def __init__(self, channel, reduction=16):
        super(FGlo, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Sequential(
            nn.Linear(channel, channel // reduction),
            nn.ReLU(inplace=True),
            nn.Linear(channel // reduction, channel),
            nn.Sigmoid()
        )
 
    def forward(self, x):
        b, c, _, _ = x.size()
        y = self.avg_pool(x).view(b, c)
        y = self.fc(y).view(b, c, 1, 1)
        return x * y
 
class ContextGuidedBlock_Down(nn.Module):
    """
    the size of feature map divided 2, (H,W,C)---->(H/2, W/2, 2C)
    """
 
    def __init__(self, nIn, dilation_rate=2, reduction=16):
        """
        args:
           nIn: the channel of input feature map
           nOut: the channel of output feature map, and nOut=2*nIn
        """
        super().__init__()
 
        nOut = nIn
 
        self.conv1x1 = ConvBNPReLU(nIn, nOut, 3, 2)  # size/2, channel: nIn--->nOut
 
        self.F_loc = ChannelWiseConv(nOut, nOut, 3, 1)
        self.F_sur = ChannelWiseDilatedConv(nOut, nOut, 3, 1, dilation_rate)
 
        self.bn = nn.BatchNorm2d(2 * nOut, eps=1e-3)
        self.act = nn.PReLU(2 * nOut)
        self.reduce = Conv(2 * nOut, nOut, 1, 1)  # reduce dimension: 2*nOut--->nOut
 
        self.F_glo = FGlo(nOut, reduction)
 
    def forward(self, input):
        output = self.conv1x1(input)
        loc = self.F_loc(output)
        sur = self.F_sur(output)
 
        joi_feat = torch.cat([loc, sur], 1)  # the joint feature
        joi_feat = self.bn(joi_feat)
        joi_feat = self.act(joi_feat)
        joi_feat = self.reduce(joi_feat)  # channel= nOut
 
        output = self.F_glo(joi_feat)  # F_glo is employed to refine the joint feature
 
        return output
 
 
class ContextGuidedBlock(nn.Module):
    def __init__(self, nIn, nOut, dilation_rate=2, reduction=16, add=True):
        """
        args:
           nIn: number of input channels
           nOut: number of output channels,
           add: if true, residual learning
        """
        super().__init__()
        n = int(nOut / 2)
        self.conv1x1 = ConvBNPReLU(nIn, n, 1, 1)  # 1x1 Conv is employed to reduce the computation
        self.F_loc = ChannelWiseConv(n, n, 3, 1)  # local feature
        self.F_sur = ChannelWiseDilatedConv(n, n, 3, 1, dilation_rate)  # surrounding context
        self.bn_prelu = BNPReLU(nOut)
        self.add = add
        self.F_glo = FGlo(nOut, reduction)
 
    def forward(self, input):
        output = self.conv1x1(input)
        loc = self.F_loc(output)
        sur = self.F_sur(output)
 
        joi_feat = torch.cat([loc, sur], 1)
 
        joi_feat = self.bn_prelu(joi_feat)
 
        output = self.F_glo(joi_feat)  # F_glo is employed to refine the joint feature
        # if residual version
        if self.add:
            output = input + output
        return output
 
 
class Bottleneck_Context(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = ContextGuidedBlock_Down(c_)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
class C2f_Context(nn.Module):
    """Faster Implementation of CSP Bottleneck with 2 convolutions."""
 
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):
        """Initialize CSP bottleneck layer with two convolutions with arguments ch_in, ch_out, number, shortcut, groups,
        expansion.
        """
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(ContextGuidedBlock(self.c, self.c) for _ in range(n))
 
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

四、 手把手教你添加ContextGuided(注意看此处)
------------------------------

本文的内容是替换传统卷积的下采样方法，其使用方式和之前的都不太一样，所以下面的修改教程大家需要仔细的看一下**(大部分都一样只是需要多添加一行代码)**。

### **4.1 修改一**

我们复制下面的代码'ultralytics/nn/modules'到该目录下，创建一个py文件粘贴进去，我这里起名为ContextGuide，如下图所示->

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6b75e374b09f48e081c3a245b14f5a29.png)



* * *

### 4.2 修改二 

找到如下的文件''ultralytics/nn/tasks.py''，在文件的开头处导入我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3e86ac6ec6844eb89522ea0ea1de95be.png)​



### 4.3 修改三 

找到parse\_model的方法，在下面注册我们的模块，按照图片进行三处修改！！！。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/826eff16146843598bdee99f23addf72.png)​

**到此就添加成功了，只需要配置yaml文件使用我们的模块即可。**

* * *

五、ContextGuided的yaml文件
----------------------

### 5.1 yaml文件1(实验版本)

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
  - [-1, 3, C2f_Context, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, C2f_Context, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, C2f_Context, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32
  - [-1, 3, C2f_Context, [1024, True]]
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

### 5.2 yaml文件2 

此版本的效果我没有试验过，具体情况不知道，建议大家先使用yaml文件一验证效果之后，在探索yaml文件2的效果。

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
  - [-1, 1, ContextGuidedBlock_Down, []]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, ContextGuidedBlock_Down, []]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, ContextGuidedBlock_Down, []]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, ContextGuidedBlock_Down, []]  # 7-P5/32
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
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

六、成功运行记录 
---------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/4c9c1c67dbc24c5a9b195e9454c9fd7b.png)​

