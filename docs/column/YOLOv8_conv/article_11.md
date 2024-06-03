# ODConv 

一、本文介绍
------

这篇文章给大家带来的是发表于2022年的**ODConv**(Omni-Dimensional Dynamic Convolution)**中文名字全维度动态卷积**，该卷积可以**即插即用**，可以直接替换网络结构中的任何一个卷积模块，**在本文的末尾提供可以直接替换卷积模块的ODConv，添加ODConv模块的C2f和Bottleneck(配合教程将代码复制粘贴到你自己的代码中即可运行)给大家**，该卷积模块主要具有更小的计算量和更高的精度，其中添加ODConv模块的网络(只替换了一处C2f中的卷积)参数量由8.9GFLOPS减小到8.8GFLOPS，**精度也有提高**下面的图片是精度的对比(因为训练成本我只是用了相同的数据集100张图片除了修改了ODConv以后其他配置都相同下面是效果对比图左面为修改版本，右面为基础版本)

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/96441984e1124a65874cbbe26f4c65f3.png) 

* * *

二、基本原理介绍
--------

![](https://img-blog.csdnimg.cn/7746cbcb513641839f0862bc2cbf1295.png)

**论文地址：[论文地址点击即可跳转阅读](https://openreview.net/pdf?id=DmpCfq6Mg39 "论文地址点击即可跳转阅读")**

**代码地址：文末提供复制粘贴的代码块**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/71538e92b9824062ab2bd1f7ca98f464.png)

* * *

大家估计只是冲着代码来看，估计很少想要看其原理的，**所以我们这里只做略微的介绍和简单的讲解**，最起码知道其基本的原理。

* * *

### 2.1ODConv基本原理介绍 

ODConv的**创新之处**在于它**采用了一种多维注意力机制**。这种机制通过并行策略来学习**卷积核**在核空间所有四个维度（即空间大小、输入通道数和每个卷积层的输出通道数）上的互补注意力。这种方法适用于任何卷积层，增强了网络的灵活性和适应性(这个四个维度的卷积可以在代码中清晰的体现出来)

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a07e54215c004ad6bd3b28face1788dc.png)

ODConv卷积主要的改进机制就是在上面的地方体现出来的，这个变量名aggregate\_weight就是文中提到的四个维度，其中的通道数\[16，16，3，3\]的含义为其具有16个维度，每个卷积核有16个通道，卷积核的大小是3x3，所以这处就是体现其具体改动的地方，这处的代码可以在我文末提供的代码中可以找到如果想要了解可以自己debug看一下。

那么大家可能想问了，它是如何减少计算量的呢？因为他具有16个通道数所以他计算是通过并行的方式，因为这一机制导致它的计算量也变小了(**是不是感觉一举两得**)。

> **总结：其实ODConv就是提出了这么一种具有多维度的卷积核所以其减少了计算量同时提高了检测精度。**

* * *

### **2.2论文总结**

Omni-Dimensional Dynamic Convolution（ODConv）的基本原理是对传统的卷积神经网络（CNN）中卷积层的设计进行创新。在传统的CNN中，每个卷积层通常使用固定的、静态的卷积核来提取特征。相比之下，ODConv引入了一种动态的、多维的注意力机制，对卷积核的设计进行了全面的改进。下面详细介绍其原理：

> 1.  **多维动态注意力机制**：ODConv的核心创新是其多维动态注意力机制。传统的动态卷积通常只在卷积核数量这一个维度上实现动态性，即通过对多个卷积核进行加权组合以适应不同的输入特征。ODConv则进一步扩展了这一概念，它不仅在卷积核数量上动态调整，还涉及到卷积核的其他三个维度：空间大小、输入通道数、输出通道数。这意味着ODConv能够更精细地适应输入数据的特征，从而提高特征提取的效果。
>     
> 2.  **并行策略**：ODConv采用并行策略来同时学习不同维度上的注意力。这种策略允许网络在处理每个维度的特征时更加高效，同时确保各维度之间的互补性和协同作用。
>     

**下面的图片左边的是传统的动态卷积右边是文章中提出的ODConv。** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3f12f29373bc43c9a2150965cde58d77.png)

**ODConv的独特之处**：与DyConv和CondConv不同，ODConv采用了一种新颖的多维注意力机制。这种机制不是仅针对每个卷积核计算一个单一的注意力标量，而是沿着卷积核空间的所有四个维度计算四种类型的注意力：αsi​, αci​, αfi​, 和αwi​。这样的设计允许ODConv在空间大小、输入通道数、过滤器数量（输出通道数）和卷积核数量这四个维度上进行细粒度的动态调整。**这一处在代码中也有清晰的体现如下图->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8dcb36cac2ef447987419a1c6bdcd25f.png)

**并行计算**：ODConv能够以并行的方式计算这四种类型的注意力，这提高了其效率，并允许它更全面地捕捉和利用输入数据的多维特征。

上面提到了每个通道分别计算其注意力机制，那么其是如何生效的呢？并且提高模型精度的呢？ 

下面图片中分别具有a，b，c，d代表四个不同通道的注意力机制生效方式。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1cabbb6a3801429794565c81f47bd401.png)

如何在其四种不同类型的注意力机制中逐步应用到卷积核上的过程的呢，下面是对这一过程的解释：

1.  **位置维度的逐点乘法（Location-wise Multiplication）**：如上图(a)所示，这一步涉及到沿着卷积核的空间维度（即卷积核的高度和宽度）进行的乘法操作。在这里，ODConv计算的位置维度注意力（αsi​）被应用于卷积核的每个空间位置上，这允许网络动态调整卷积核在处理不同空间位置的信息时的重要性。
    
2.  **通道维度的逐通道乘法（Channel-wise Multiplication）**：如上图(b)所示，这一步是沿着输入通道维度进行的乘法操作。在这个阶段，通道维度的注意力（αci​）被应用于卷积核的每个输入通道上，使得网络能够针对不同的输入特征通道动态调整其处理方式。
    
3.  **输出通道维度的逐滤波器乘法（Filter-wise Multiplication）**：如上图(c)所示，这一步是沿着输出通道维度进行的乘法操作。在这里，输出通道维度的注意力（αfi​）影响卷积核的每个输出滤波器，从而使网络能够根据不同输出特征的重要性进行调整。
    
4.  **卷积核维度的逐核乘法（Kernel-wise Multiplication）**：如上图(d)所示，这一步是沿着卷积核维度进行的乘法操作。卷积核维度的注意力（αwi​）在这一阶段被应用，它允许网络动态调整不同卷积核的重要性。
    

通过这种分步骤的乘法操作，ODConv能够在卷积过程中综合考虑空间位置、输入通道、输出通道和卷积核数量等多个维度的信息，从而实现对卷积核的全方位动态调整。这种细致的调整方式使得ODConv能够更精准地提取特征，增强网络的学习和表达能力。论文的方法部分对这些操作的具体数学表达和实现细节。

三、ODConv代码 
-----------

下面的代码就是ODConv的代码，大家可以创建一个同样的文件如下"ultralytics/nn/modules/ODConv.py" ，我们创建该文件之后将下面的代码复制粘贴到其中。

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.autograd
 
 
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
 
class Attention(nn.Module):
    def __init__(self, in_planes, out_planes, kernel_size=3, groups=1, reduction=0.0625, kernel_num=4, min_channel=16):
        super(Attention, self).__init__()
        attention_channel = max(int(in_planes * reduction), min_channel)
        self.kernel_size = kernel_size
        self.kernel_num = kernel_num
        self.temperature = 1.0
 
        self.avgpool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Conv2d(in_planes, attention_channel, 1, bias=False)
        self.bn = nn.BatchNorm2d(attention_channel)
        self.relu = nn.ReLU(inplace=True)
 
        self.channel_fc = nn.Conv2d(attention_channel, in_planes, 1, bias=True)
        self.func_channel = self.get_channel_attention
 
        if in_planes == groups and in_planes == out_planes:  # depth-wise convolution
            self.func_filter = self.skip
        else:
            self.filter_fc = nn.Conv2d(attention_channel, out_planes, 1, bias=True)
            self.func_filter = self.get_filter_attention
 
        if kernel_size == 1:  # point-wise convolution
            self.func_spatial = self.skip
        else:
            self.spatial_fc = nn.Conv2d(attention_channel, kernel_size * kernel_size, 1, bias=True)
            self.func_spatial = self.get_spatial_attention
 
        if kernel_num == 1:
            self.func_kernel = self.skip
        else:
            self.kernel_fc = nn.Conv2d(attention_channel, kernel_num, 1, bias=True)
            self.func_kernel = self.get_kernel_attention
 
        self._initialize_weights()
 
    def _initialize_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
                if m.bias is not None:
                    nn.init.constant_(m.bias, 0)
            if isinstance(m, nn.BatchNorm2d):
                nn.init.constant_(m.weight, 1)
                nn.init.constant_(m.bias, 0)
 
    def update_temperature(self, temperature):
        self.temperature = temperature
 
    @staticmethod
    def skip(_):
        return 1.0
 
    def get_channel_attention(self, x):
        channel_attention = torch.sigmoid(self.channel_fc(x).view(x.size(0), -1, 1, 1) / self.temperature)
        return channel_attention
 
    def get_filter_attention(self, x):
        filter_attention = torch.sigmoid(self.filter_fc(x).view(x.size(0), -1, 1, 1) / self.temperature)
        return filter_attention
 
    def get_spatial_attention(self, x):
        spatial_attention = self.spatial_fc(x).view(x.size(0), 1, 1, 1, self.kernel_size, self.kernel_size)
        spatial_attention = torch.sigmoid(spatial_attention / self.temperature)
        return spatial_attention
 
    def get_kernel_attention(self, x):
        kernel_attention = self.kernel_fc(x).view(x.size(0), -1, 1, 1, 1, 1)
        kernel_attention = F.softmax(kernel_attention / self.temperature, dim=1)
        return kernel_attention
 
    def forward(self, x):
        x = self.avgpool(x)
        x = self.fc(x)
        # x = self.bn(x) # 在外面我提供了一个bn这里会报错
        x = self.relu(x)
        return self.func_channel(x), self.func_filter(x), self.func_spatial(x), self.func_kernel(x)
 
 
class ODConv2d(nn.Module):
    def __init__(self, in_planes, out_planes, kernel_size, stride=1, padding=1, dilation=1, groups=1,
                 reduction=0.0625, kernel_num=4):
        super(ODConv2d, self).__init__()
        in_planes = in_planes
        self.in_planes = in_planes
        self.out_planes = out_planes
        self.kernel_size = kernel_size
        self.stride = stride
        self.padding = padding
        self.dilation = dilation
        self.groups = groups
        self.kernel_num = kernel_num
        self.attention = Attention(in_planes, out_planes, kernel_size, groups=groups,
                                   reduction=reduction, kernel_num=kernel_num)
        self.weight = nn.Parameter(torch.randn(kernel_num, out_planes, in_planes//groups, kernel_size, kernel_size),
                                   requires_grad=True)
        self._initialize_weights()
 
        if self.kernel_size == 1 and self.kernel_num == 1:
            self._forward_impl = self._forward_impl_pw1x
        else:
            self._forward_impl = self._forward_impl_common
 
    def _initialize_weights(self):
        for i in range(self.kernel_num):
            nn.init.kaiming_normal_(self.weight[i], mode='fan_out', nonlinearity='relu')
 
    def update_temperature(self, temperature):
        self.attention.update_temperature(temperature)
 
    def _forward_impl_common(self, x):
        # Multiplying channel attention (or filter attention) to weights and feature maps are equivalent,
        # while we observe that when using the latter method the models will run faster with less gpu memory cost.
        channel_attention, filter_attention, spatial_attention, kernel_attention = self.attention(x)
        batch_size, in_planes, height, width = x.size()
        x = x * channel_attention
        x = x.reshape(1, -1, height, width)
        aggregate_weight = spatial_attention * kernel_attention * self.weight.unsqueeze(dim=0)
        aggregate_weight = torch.sum(aggregate_weight, dim=1).view(
            [-1, self.in_planes // self.groups, self.kernel_size, self.kernel_size])
        output = F.conv2d(x, weight=aggregate_weight, bias=None, stride=self.stride, padding=self.padding,
                          dilation=self.dilation, groups=self.groups * batch_size)
        output = output.view(batch_size, self.out_planes, output.size(-2), output.size(-1))
        output = output * filter_attention
        return output
 
    def _forward_impl_pw1x(self, x):
        channel_attention, filter_attention, spatial_attention, kernel_attention = self.attention(x)
        x = x * channel_attention
        output = F.conv2d(x, weight=self.weight.squeeze(dim=0), bias=None, stride=self.stride, padding=self.padding,
                          dilation=self.dilation, groups=self.groups)
        output = output * filter_attention
        return output
 
    def forward(self, x):
        return self._forward_impl(x)
 
 
class Bottleneck_ODConv(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = ODConv2d(c_, c2, k[1][0], 1, groups=g)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
 
class C2f_ODConv(nn.Module):
    """Faster Implementation of CSP Bottleneck with 2 convolutions."""
 
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):
        """Initialize CSP bottleneck layer with two convolutions with arguments ch_in, ch_out, number, shortcut, groups,
        expansion.
        """
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(Bottleneck_ODConv(self.c, self.c, shortcut, g, k=((3, 3), (3, 3)), e=1.0) for _ in range(n))
 
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

四、在模型中调用ODConv模块
----------------

### 4.1 ODConv添加步骤

#### 4.1.1 步骤一

首先我们找到如下的目录'ultralytics/nn/modules'，然后在这个目录下创建一个py文件，名字为你也可以根据你自己的习惯起即可，然后将核心代码复制进去。

#### 4.1.2 步骤二

之后我们找到'ultralytics/nn/tasks.py'文件，在其中注册我们的模块。

首先我们需要在文件的开头导入我们的模块，**如下图所示->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/582ad683608f477497bc7c7f1a89c140.png)



#### 4.1.3 步骤三

我们找到parse\_model这个方法，可以用搜索也可以自己手动找，大概在六百多行吧。 我们找到如下的地方，然后将模块按照我的方法添加进去即可，模仿我添加即可，其中另外的模块，你没有删除即可，添加红框的内容即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f167e65ab7ab429c9f7727774f23a976.png)​

**到此我们就注册成功了，可以修改yaml文件使用我们添加的模块了。**

* * *

### 4.2 ODConv的yaml文件一

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
  x: [1.00, 1.25, 512]   # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOP
 
# YOLOv8.0 backbone
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
  - [-1, 3, C2f_ODConv, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_ODConv, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_ODConv, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
 
```

* * *

### 4.3 ODConv的yaml文件二

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
  x: [1.00, 1.25, 512]   # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOP
 
# YOLOv8.0 backbone
backbone:
  # [from, repeats, module, args]
  - [-1, 1, Conv, [64, 3, 2]]  # 0-P1/2
  - [-1, 1, ODConv2d, [128, 3, 2]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, ODConv2d, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, ODConv2d, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, ODConv2d, [1024, 3, 2]]  # 7-P5/32
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
 
  - [-1, 1, ODConv2d, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, ODConv2d, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
 
```

