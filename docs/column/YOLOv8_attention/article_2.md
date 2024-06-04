 # Triplet Attention

一、本文介绍
------

本文给大家带来的改进是Triplet Attention三重注意力机制。这个机制，它通过三个不同的视角来分析输入的数据，就好比三个人从不同的角度来观察同一幅画，然后共同决定哪些部分最值得注意。三重注意力机制的主要思想是在网络中引入了一种新的注意力模块，这个模块包含三个分支，分别关注图像的不同维度。比如说，一个分支可能专注于图像的宽度，另一个分支专注于高度，第三个分支则聚焦于图像的深度，即色彩和纹理等特征。这样一来，网络就能够更全面地理解图像内容，就像是得到了一副三维眼镜，能够看到图片的立体效果一样。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/436eb37c9cfc49338f0e980477b6a7ca.png)

二、Triplet Attention机制原理
-----------------------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/21f4c3086fe74094b00c13f23b037bf7.png)

**论文地址：[官方论文地址](https://arxiv.org/pdf/2010.03045.pdf "官方论文地址")**

**代码地址：[官方代码地址](https://github.com/landskape-ai/triplet-attention/blob/master/MODELS/triplet_attention.py "官方代码地址")**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/73a37b777550424085542dee78991cfa.png)

* * *

### 2.1 Triplet Attention的基本原理 

**三重注意力**（**Triplet Attention**）的基本原理是利用三支结构捕获输入数据的跨维度交互，从而计算注意力权重。这个方法能够构建输入通道或空间位置之间的相互依赖性，而且计算代价小。三重注意力由三个分支组成，每个分支负责捕获空间维度H或W与通道维度C之间的交互特征。通过对每个分支中的输入张量进行排列变换，然后通过Z池操作和一个大小为k×k的卷积层，生成注意力权重。这些权重是通过一个S形激活层生成的，然后应用于排列变换后的输入张量，再变换回原来的输入形状 

**三重注意力（Triplet Attention）的主要改进点包括：**

1.  **跨维度的注意力权重计算**: 通过一个创新的三支结构捕获通道、高度、宽度三个维度之间的交互关系来计算注意力权重。
    
2.  **旋转操作和残差变换**: 通过旋转输入张量和应用残差变换来建立不同维度间的依赖，这是三重注意力机制中的关键步骤。
    
3.  **维度间依赖性的重要性**: 强调在计算注意力权重时，捕获跨维度依赖性的重要性，这是三重注意力的核心直觉和设计理念。
    

下面的图片是三重注意力的一个抽象表示图，展示了三个分支如何捕获跨维度交互。图中的每个子图表示三重注意力中的一个分支： 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cd07e86ad1904ef5b5ad378aba8ce069.png)

**1\. 分支（a）:** 这个分支直接处理输入张量，没有进行旋转，然后通过残差变换来提取特征。

**2\. 分支（b）:** 这个分支首先沿着宽度（W）和通道（C）的维度旋转输入张量，然后进行残差变换。

**3\. 分支（c）:** 这个分支沿着高度（H）和通道（C）的维度旋转输入张量，之后同样进行残差变换。

> **总结**：通过这样的设计，三重注意力模型能够有效地捕获输入张量中的空间和通道维度之间的交互关系。这种方法使模型能够构建通道与空间位置之间的相互依赖性，提高模型对特征的理解能力。

* * *

### 2.2 Triplet Attention和其它简单注意力机制的对比 

**下面的图片是论文中三重注意力机制和其它注意力机制的一个对比大家有兴趣可以看看，横向扩展以下自己的知识库。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3dadcfbcbac847beb98dd37e6519d6fd.png)

**这张图片是一幅对比不同注意力模块的图示，其中包括：**

**1.Squeeze Excitation (SE) Module:**  
这个模块使用全局平均池化 (Global Avg Pool) 生成通道描述符，接着通过两个全连接层（1x1 Conv），中间使用ReLU激活函数，最后通过Sigmoid函数生成每个通道的权重。

**2\. Convolutional Block Attention Module (CBAM):**  
首先使用全局平均池化和全局最大池化（GAP + GMP）结合，再通过一个卷积层和ReLU激活函数，最后经过另一个卷积层和Sigmoid函数生成注意力权重。

**3\. Global Context (GC) Module:**  
从一个1x1卷积层开始，经过Softmax函数进行归一化，接着进行另一个1x1卷积，然后使用LayerNorm和最终的1x1卷积，通过广播加法结合原始特征图。

**4\. Triplet Attention (我们的方法):**  
分为三个分支，每个分支进行不同的处理：通道池化后的7x7卷积，Z池化，再接一个7x7卷积，然后是批量归一化和Sigmoid函数。每个分支都有一个Permute操作来调整维度。最后，三个分支的结果通过平均池化聚合起来生成最终的注意力权重。

每种模块都设计用于处理特征图（C x H x W），其中C是通道数，H是高度，W是宽度。这些模块通过不同方式计算注意力权重，增强网络对特征的重要部分的关注度，从而在各种视觉任务中提高性能。图片中的符号⊗代表矩阵乘法，⊕代表广播元素级加法。

* * *

### 2.3 Triplet Attention的实现流程

**下面的图片是三重注意力（Triplet Attention）的具体实现流程图**。图中详细展示了三个分支如何处理输入张量，并最终合成三重注意力。下面是对这个过程的描述： 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7cf05ae8a9b242a49d82fe06047acba3.png)

1.  **上部分支**: 负责计算通道维度C和空间维度W的注意力权重。这个分支对输入张量进行Z池化（Z-Pool）操作，然后通过一个卷积层（Conv），接着用Sigmoid函数生成注意力权重。
    
2.  **中部分支**: 负责捕获通道维度C与空间维度H和W之间的依赖性。这个分支首先进行相同的Z池化和卷积操作，然后同样通过Sigmoid函数生成注意力权重。
    
3.  **下部分支**: 用于捕获空间维度之间的依赖性。这个分支保持输入的身份（Identity，即不改变输入），执行Z池化和卷积操作，之后也通过Sigmoid函数生成注意力权重。

每个分支在生成注意力权重后，会对输入进行排列（Permutation），然后将三个分支的输出进行平均聚合（Avg），**最终得到三重注意力输出。**

这种结构通过不同的旋转和排列操作，能够综合不同维度上的信息，更好地捕获数据的内在特征，同时这种方法在计算上是高效的，并且可以作为一个模块加入到现有的网络架构中，增强网络对复杂数据结构的理解和处理能力。

三、**Triplet Attention的完整代码**
----------------------------

### 3.1 Triplet Attention的核心代码

大家复制代码的时候需要注意这是一种**无参数的注意力机制**，所以在看第四章添加教程的时候需要按照无参数的注意力机制进行添加。 

```python
class BasicConv(nn.Module):
    def __init__(self, in_planes, out_planes, kernel_size, stride=1, padding=0, dilation=1, groups=1, relu=True,
                 bn=True, bias=False):
        super(BasicConv, self).__init__()
        self.out_channels = out_planes
        self.conv = nn.Conv2d(in_planes, out_planes, kernel_size=kernel_size, stride=stride, padding=padding,
                              dilation=dilation, groups=groups, bias=bias)
        self.bn = nn.BatchNorm2d(out_planes, eps=1e-5, momentum=0.01, affine=True) if bn else None
        self.relu = nn.ReLU() if relu else None
 
    def forward(self, x):
        x = self.conv(x)
        if self.bn is not None:
            x = self.bn(x)
        if self.relu is not None:
            x = self.relu(x)
        return x
 
 
class ZPool(nn.Module):
    def forward(self, x):
        return torch.cat((torch.max(x, 1)[0].unsqueeze(1), torch.mean(x, 1).unsqueeze(1)), dim=1)
 
 
class AttentionGate(nn.Module):
    def __init__(self):
        super(AttentionGate, self).__init__()
        kernel_size = 7
        self.compress = ZPool()
        self.conv = BasicConv(2, 1, kernel_size, stride=1, padding=(kernel_size - 1) // 2, relu=False)
 
    def forward(self, x):
        x_compress = self.compress(x)
        x_out = self.conv(x_compress)
        scale = torch.sigmoid_(x_out)
        return x * scale
 
 
class TripletAttention(nn.Module):
    def __init__(self, no_spatial=False):
        super(TripletAttention, self).__init__()
        self.cw = AttentionGate()
        self.hc = AttentionGate()
        self.no_spatial = no_spatial
        if not no_spatial:
            self.hw = AttentionGate()
 
    def forward(self, x):
        x_perm1 = x.permute(0, 2, 1, 3).contiguous()
        x_out1 = self.cw(x_perm1)
        x_out11 = x_out1.permute(0, 2, 1, 3).contiguous()
        x_perm2 = x.permute(0, 3, 2, 1).contiguous()
        x_out2 = self.hc(x_perm2)
        x_out21 = x_out2.permute(0, 3, 2, 1).contiguous()
        if not self.no_spatial:
            x_out = self.hw(x)
            x_out = 1 / 3 * (x_out + x_out11 + x_out21)
        else:
            x_out = 1 / 2 * (x_out11 + x_out21)
        return x_out
```

* * *

### 3.2 修改了Triplet Attention机制的C2f和Bottleneck 

这个机制可以直接使用在主干上，也可以用在残差中也就是下面这个代码具体那种看你自己选择，同时大家也可以放在其他的位置即插即用。 

```python
class Bottleneck_TripletAt(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = Conv(c_, c2, k[1], 1, g=g)
        self.TripleAt = TripletAttention()
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        """'forward()' applies the YOLO FPN to input data."""
        return x + self.TripleAt(self.cv2(self.cv1(x))) if self.add else self.TripleAt(self.cv2(self.cv1(x)))
 
 
 
class C2f_TripletAt(nn.Module):
    """Faster Implementation of CSP Bottleneck with 2 convolutions."""
 
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):
        """Initialize CSP bottleneck layer with two convolutions with arguments ch_in, ch_out, number, shortcut, groups,
        expansion.
        """
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(Bottleneck_TripletAt(self.c, self.c, shortcut, g, k=((3, 3), (3, 3)), e=1.0) for _ in range(n))
 
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

四、手把手教你添加**Triplet Attention**
------------------------------

### 4.1 **Triplet Attention**的添加教程

添加教程这里不再重复介绍、因为专栏内容有许多，添加过程又需要截特别图片会导致文章大家读者也不通顺如果你已经会添加注意力机制了，可以跳过本章节，**如果你还不会，大家可以看我下面的文章**，里面详细的介绍了拿到一个任意机制(C2f、Conv、Bottleneck、Loss、DetectHead)如何添加到你的网络结构中去。

**这里需要注意的是我上面提供了两段代码一个是C2f-Triplet Attention一个是Triplet Attention的本体代码，这两种方法的添加方式有些不同。**

**最后强调一下Triplet Attention是一种无参数的注意力机制如果你想要放在主干上就按照无参数的注意力机制配置就可以，但是如果你想要放在残差中配置C2f的时候就需要按照C2f的配置来添加。**

* * *

### 4.2 **Triplet Attention**的yaml文件和训练截图

#### 4.2.1 **Triplet Attention**的yaml文件一(推荐)

**下面的配置文件为我修改的C2f-Triplet Attention**的位置(上面的实验结果图三是用这个方法跑出来的)。

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
  - [-1, 3, C2f_TripletAt, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_TripletAt, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_TripletAt, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 **Triplet Attention**的yaml文件二

**这个文件是另一种添加的方式，添加的位置是检测头和Neck中间的位置，对应实验结果的图二(中间)。**

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
  - [-1, 1, TripletAttention, []] # 16
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 19 (P4/16-medium)
  - [-1, 1, TripletAttention, []] # 20
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 23 (P5/32-large)
  - [-1, 1, TripletAttention, []] # 24
 
  - [[16, 20, 24], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 **D**\-LKA的训练过程截图 

**下面是添加了D**\-LKA**的训练截图。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7102f4b5be2c483c9dcc7cde73e9d461.png)​​​​​

五、**Triplet Attention**可添加的位置
-----------------------------

### 5.1 推荐**Triplet Attention**可添加的位置 

**Triplet Attention**是一种即插即用的模块，其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入**Triplet Attention**(**yaml文件一**)。
>     
> 2.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加修改后的C2f\_**Triplet Attention**可以帮助模型更有效地融合不同层次的特征(**yaml文件二**)。
>     

**文字大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

* * *

### **5.2 图示D**\-LKA**可添加的位置** 

![2949694815404620bdfb5875286c8e73.png](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2949694815404620bdfb5875286c8e73.png)​​​​​

