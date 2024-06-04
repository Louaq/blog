 

一、本文介绍
------

 本文给大家带来的改进机制是**RCS-YOLO**提出的**RCS-OSA**模块，其全称是"Reduced Channel Spatial Object Attention"，意即"减少通道的空间对象注意力"。这个模块的主要功能是通过减少[特征图](https://so.csdn.net/so/search?q=%E7%89%B9%E5%BE%81%E5%9B%BE&spm=1001.2101.3001.7020)的通道数量，同时关注空间维度上的重要特征，来提高模型的处理效率和检测精度。**亲测在小目标检测和大尺度目标检测的数据集上都有大幅度的涨点效果(mAP直接涨了大概有0.6左右**)**。**同时本文对RCS-OSA模块的框架原理进行了详细的分析，不光让大家会添加到自己的模型在写论文的时候也能够有一定的参照，最后本文会手把手教你添加RCS-OSA模块到网络结构中。

![](https://img-blog.csdnimg.cn/direct/592d45c5117e495e8af0a622fd31d2d8.png)

**推荐指数：⭐⭐⭐⭐⭐**

**涨点效果：⭐⭐⭐⭐⭐**

> **专栏目录：**[YOLOv8改进有效系列目录 | 包含卷积、主干、检测头、注意力机制、Neck上百种创新机制](https://snu77.blog.csdn.net/article/details/135309007 "YOLOv8改进有效系列目录 | 包含卷积、主干、检测头、注意力机制、Neck上百种创新机制")****

> **专栏回顾：******[YOLOv8改进系列专栏——本专栏持续复习各种顶会内容——科研必备](https://blog.csdn.net/java1314777/category_12483754.html "YOLOv8改进系列专栏——本专栏持续复习各种顶会内容——科研必备")********    

**目录**

**[一、本文介绍](#t1)**

**[二、RCS-OSA模块原理](#t2)**

**[2.1 RCS-OSA的基本原理](#t3)**

**[2.2 RCS](#t4)**

**[2.3 RCS模块](#t5)**

**[2.4 OSA](#t6)**

**[2.5 特征级联](#t7)**

**[三、RCS-OSA核心代码](#t8)**

**[四、手把手教你添加RCS-OSA模块](#t9)**

**[4.1 RCS-OSA添加步骤](#t10)**

**[4.1.1 步骤一](#t11)**

**[4.1.2 步骤二](#t12)**

**[4.1.3 步骤三](#t13)**

**[4.2 RCS-OSA的yaml文件和训练截图](#t14)**

**[4.2.1 RCS-OSA的yaml版本一(推荐)](#t15)**

**[4.2.2 RCS-OSA的yaml版本二](#t16)**

**[4.2.2 RCS-OSA的训练过程截图](#t17)** 

**[五、本文总结](#t18)**

* * *

二、RCS-OSA模块原理
-------------

![](https://img-blog.csdnimg.cn/direct/8cb2f5fd479f4a1693730eae5a0b4e8f.png)

**论文地址：**[官方论文地址](https://arxiv.org/ftp/arxiv/papers/2307/2307.16412.pdf "官方论文地址")

**代码地址：**[官方代码地址](https://github.com/mkang315/RCS-YOLO/blob/main/cfg/training/rcs3-yolo.yaml "官方代码地址")

![](https://img-blog.csdnimg.cn/direct/601c2be721734ce1ad5550bfb37383f0.png)

* * *

### 2.1 RCS-OSA的基本原理

**RCSOSA（RCS-One-Shot Aggregation）**是**RCS-YOLO中提出的一种结构**，我们可以将主要原理概括如下：

**1\. RCS（Reparameterized Convolution based on channel Shuffle）**: 结合了通道混洗，通过重参数化卷积来增强网络的特征提取能力。

**2\. RCS模块:** 在训练阶段，利用多分支结构学习丰富的特征表示；在推理阶段，通过结构化重参数化简化为单一分支，减少内存消耗。

**3\. OSA（One-Shot Aggregation）:** 一次性聚合多个特征级联，减少网络计算负担，提高计算效率。

**4\. 特征级联:** RCS-OSA模块通过堆叠RCS，确保特征的复用并加强不同层之间的信息流动。

* * *

### 2.2 **RCS**

RCS（**基于通道Shuffle的重参数化卷积**）是**RCS-YOLO的核心组成部分**，旨在训练阶段通过多分支结构学习丰富的特征信息，并在推理阶段通过简化为单分支结构来减少内存消耗，实现快速推理。此外，RCS利用**通道分割和通道Shuffle操作**来降低计算复杂性，同时保持通道间的信息交换，这样在推理阶段相比普通的3×3卷积可以减少一半的计算复杂度。通过结构重参数化，RCS能够在训练阶段从输入特征中学习深层表示，并在推理阶段实现快速推理，同时减少内存消耗。

* * *

### 2.3 **RCS模块**

RCS（**基于通道Shuffle的重参数化卷积**）模块中，结构在**训练阶段**使用多个分支，包括1x1和3x3的卷积，以及一个直接的连接（Identity），用于学习丰富的特征表示。在**推理阶段**，结构被重参数化成一个单一的3x3卷积，以减少计算复杂性和内存消耗，同时保持训练阶段学到的特征表达能力。这与RCS的设计理念紧密相连，即在不牺牲性能的情况下提高计算效率。

![](https://img-blog.csdnimg.cn/direct/a458150c59d9451db0840343a69e6178.png)

上图为大家展示了RCS的结构，分为**训练阶段（a部分）**和**推理阶段（b部分）**。在训练阶段，输入通过通道分割，一部分输入经过RepVGG块，另一部分保持不变。然后通过1x1卷积和3x3卷积处理RepVGG块的输出，与另一部分输入进行通道Shuffle和连接。在推理阶段，原来的多分支结构被简化为一个单一的3x3 RepConv块。这种设计允许在训练时学习复杂特征，在推理时减少计算复杂度。黑色边框的矩形代表特定的模块操作，渐变色的矩形代表张量的特定特征，矩形的宽度代表张量的通道数。 

* * *

### 2.4 **OSA**

OSA（One-Shot Aggregation）是一个关键的模块，旨在**提高网络在处理密集连接时的效率**。OSA模块通过表示具有多个感受野的多样化特征，并在最后的特征映射中仅聚合一次所有特征，从而克服了DenseNet中密集连接的低效率问题。

OSA模块的使用有两个主要目的：

**1\. 提高特征表示的多样性：**OSA通过聚合具有不同感受野的特征来增加网络对于不同尺度的敏感性，这有助于提升模型对不同大小目标的检测能力。

**2\. 提高效率：**通过在网络的最后一部分只进行一次特征聚合，OSA减少了重复的特征计算和存储需求，从而提高了网络的计算和能源效率。

在RCS-YOLO中，OSA模块被进一步与**RCS（基于通道Shuffle的重参数化卷积）**相结合，形成RCS-OSA模块。这种结合不仅保持了低成本的内存消耗，而且还实现了语义信息的有效提取，对于构建轻量级和大规模的对象检测器尤为重要。

下面我将为大家展示RCS-OSA（One-Shot Aggregation of RCS）的结构。

![](https://img-blog.csdnimg.cn/direct/0af965b12aad43579fbc2e8b3c27ece0.png)

在RCS-OSA模块中，输入被分为**两部分**，一部分直接通过，另一部分通过堆叠的RCS模块进行处理。处理后的特征和直接通过的特征在**通道混洗（Channel Shuffle）**后合并。这种结构设计用于增强模型的特征提取和利用效率，是RCS-YOLO架构中的一个关键组成部分旨在通过一次性聚合来提高模型处理特征的能力，同时保持计算效率。

* * *

### 2.5 **特征级联**

**特征级联（feature cascade）**是一种技术，通过在网络的**一次性聚合（one-shot aggregate）**路径上维持有限数量的特征级联来实现的。在RCS-YOLO中，特别是在RCS-OSA（RCS-Based One-Shot Aggregation）模块中，只保留了三个特征级联。

特征级联的目的是**为了减轻网络计算负担并降低内存占用**。这种方法可以有效地聚合不同层次的特征，提高模型的语义信息提取能力，同时避免了过度复杂化网络结构所带来的低效率和高资源消耗。

下面为大家提供的图像展示的是**RCS-YOLO的整体架构**，其中包括RCS-OSA模块。RCS-OSA在模型中用于堆叠RCS模块，以确保特征的复用并加强不同层之间的信息流动。图中显示的多层RCS-OSA模块的排列和组合反映了它们如何一起工作以优化特征传递和提高检测性能。

![](https://img-blog.csdnimg.cn/direct/22539b73994f4ead8b6d283889e6bf9b.png)

**总结：**RCS-YOLO主要由RCS-OSA（蓝色模块）和RepVGG（橙色模块）构成。这里的n代表堆叠RCS模块的数量。n\_cls代表检测到的对象中的类别数量。图中的IDetect是从YOLOv7中借鉴过来的，表示使用二维卷积神经网络的检测层。这个架构通过堆叠的RCS模块和RepVGG模块，以及两种类型的检测层，实现了对象检测的任务。 

* * *

三、RCS-OSA核心代码
-------------

在这里说一下这个原文是RCS-YOLO我们只是用其中的RCS-OSA模块来替换我们YOLOv8中的C2f模块，但是在RCS-YOLO中还有一个RepVGG模块(大家在下面的代码中可以看到)，这个模块可以替换Conv，但是如果都替换的话我觉得那就是RCS-YOLO了没啥区别了，所以我下面的改进和这篇文章只用了RCS-OSA模块来替换C2f，如果你对RCS-YOLO感兴趣的话，我后面也会提高RCS-YOLO的yaml文件供大家参考。

```cobol
import torch.nn as nnimport torchimport torch.nn.functional as Fimport numpy as npimport math # build RepVGG block# -----------------------------def conv_bn(in_channels, out_channels, kernel_size, stride, padding, groups=1):    result = nn.Sequential()    result.add_module('conv', nn.Conv2d(in_channels=in_channels, out_channels=out_channels,                                        kernel_size=kernel_size, stride=stride, padding=padding, groups=groups,                                        bias=False))    result.add_module('bn', nn.BatchNorm2d(num_features=out_channels))     return result class SEBlock(nn.Module):    def __init__(self, input_channels):        super(SEBlock, self).__init__()        internal_neurons = input_channels // 8        self.down = nn.Conv2d(in_channels=input_channels, out_channels=internal_neurons, kernel_size=1, stride=1,                              bias=True)        self.up = nn.Conv2d(in_channels=internal_neurons, out_channels=input_channels, kernel_size=1, stride=1,                            bias=True)        self.input_channels = input_channels     def forward(self, inputs):        x = F.avg_pool2d(inputs, kernel_size=inputs.size(3))        x = self.down(x)        x = F.relu(x)        x = self.up(x)        x = torch.sigmoid(x)        x = x.view(-1, self.input_channels, 1, 1)        return inputs * x class RepVGG(nn.Module):     def __init__(self, in_channels, out_channels, kernel_size=3,                 stride=1, padding=1, dilation=1, groups=1, padding_mode='zeros', deploy=False, use_se=False):        super(RepVGG, self).__init__()        self.deploy = deploy        self.groups = groups        self.in_channels = in_channels         padding_11 = padding - kernel_size // 2         self.nonlinearity = nn.SiLU()        # self.nonlinearity = nn.ReLU()         if use_se:            self.se = SEBlock(out_channels, internal_neurons=out_channels // 16)        else:            self.se = nn.Identity()         if deploy:            self.rbr_reparam = nn.Conv2d(in_channels=in_channels, out_channels=out_channels, kernel_size=kernel_size,                                         stride=stride,                                         padding=padding, dilation=dilation, groups=groups, bias=True,                                         padding_mode=padding_mode)         else:            self.rbr_identity = nn.BatchNorm2d(                num_features=in_channels) if out_channels == in_channels and stride == 1 else None            self.rbr_dense = conv_bn(in_channels=in_channels, out_channels=out_channels, kernel_size=kernel_size,                                     stride=stride, padding=padding, groups=groups)            self.rbr_1x1 = conv_bn(in_channels=in_channels, out_channels=out_channels, kernel_size=1, stride=stride,                                   padding=padding_11, groups=groups)            # print('RepVGG Block, identity = ', self.rbr_identity)     def get_equivalent_kernel_bias(self):        kernel3x3, bias3x3 = self._fuse_bn_tensor(self.rbr_dense)        kernel1x1, bias1x1 = self._fuse_bn_tensor(self.rbr_1x1)        kernelid, biasid = self._fuse_bn_tensor(self.rbr_identity)        return kernel3x3 + self._pad_1x1_to_3x3_tensor(kernel1x1) + kernelid, bias3x3 + bias1x1 + biasid     def _pad_1x1_to_3x3_tensor(self, kernel1x1):        if kernel1x1 is None:            return 0        else:            return torch.nn.functional.pad(kernel1x1, [1, 1, 1, 1])     def _fuse_bn_tensor(self, branch):        if branch is None:            return 0, 0        if isinstance(branch, nn.Sequential):            kernel = branch.conv.weight            running_mean = branch.bn.running_mean            running_var = branch.bn.running_var            gamma = branch.bn.weight            beta = branch.bn.bias            eps = branch.bn.eps        else:            assert isinstance(branch, nn.BatchNorm2d)            if not hasattr(self, 'id_tensor'):                input_dim = self.in_channels // self.groups                kernel_value = np.zeros((self.in_channels, input_dim, 3, 3), dtype=np.float32)                for i in range(self.in_channels):                    kernel_value[i, i % input_dim, 1, 1] = 1                self.id_tensor = torch.from_numpy(kernel_value).to(branch.weight.device)            kernel = self.id_tensor            running_mean = branch.running_mean            running_var = branch.running_var            gamma = branch.weight            beta = branch.bias            eps = branch.eps        std = (running_var + eps).sqrt()        t = (gamma / std).reshape(-1, 1, 1, 1)        return kernel * t, beta - running_mean * gamma / std     def forward(self, inputs):        if hasattr(self, 'rbr_reparam'):            return self.nonlinearity(self.se(self.rbr_reparam(inputs)))         if self.rbr_identity is None:            id_out = 0        else:            id_out = self.rbr_identity(inputs)         return self.nonlinearity(self.se(self.rbr_dense(inputs) + self.rbr_1x1(inputs) + id_out))     def fusevggforward(self, x):        return self.nonlinearity(self.rbr_dense(x)) # RepVGG block end# ----------------------------- class SR(nn.Module):    # Shuffle RepVGG    def __init__(self, c1, c2):        super().__init__()        c1_ = int(c1 // 2)        c2_ = int(c2 // 2)        self.repconv = RepVGG(c1_, c2_)     def forward(self, x):        x1, x2 = x.chunk(2, dim=1)        out = torch.cat((x1, self.repconv(x2)), dim=1)        out = self.channel_shuffle(out, 2)        return out     def channel_shuffle(self, x, groups):        batchsize, num_channels, height, width = x.data.size()        channels_per_group = num_channels // groups        x = x.view(batchsize, groups, channels_per_group, height, width)        x = torch.transpose(x, 1, 2).contiguous()        x = x.view(batchsize, -1, height, width)        return x  def make_divisible(x, divisor):    # Returns nearest x divisible by divisor    if isinstance(divisor, torch.Tensor):        divisor = int(divisor.max())  # to int    return math.ceil(x / divisor) * divisor class RCSOSA(nn.Module):    # VoVNet with Res Shuffle RepVGG    def __init__(self, c1, c2, n=1, se=False, e=0.5, stackrep=True):        super().__init__()        n_ = n // 2        c_ = make_divisible(int(c1 * e), 8)        # self.conv1 = Conv(c1, c_)        self.conv1 = RepVGG(c1, c_)        self.conv3 = RepVGG(int(c_ * 3), c2)        self.sr1 = nn.Sequential(*[SR(c_, c_) for _ in range(n_)])        self.sr2 = nn.Sequential(*[SR(c_, c_) for _ in range(n_)])         self.se = None        if se:            self.se = SEBlock(c2)     def forward(self, x):        x1 = self.conv1(x)        x2 = self.sr1(x1)        x3 = self.sr2(x2)        x = torch.cat((x1, x2, x3), 1)        return self.conv3(x) if self.se is None else self.se(self.conv3(x)) if __name__ == '__main__':    m = RCSOSA(256, 256)    im = torch.randn(2, 256, 13, 13)    y = m(im)    print(y.shape)
```

* * *

四、手把手教你添加RCS-OSA模块
------------------

### 4.1 RCS-OSA添加步骤

#### 4.1.1 步骤一

首先我们找到如下的目录'ultralytics/nn/modules'，然后在这个目录下创建一个py文件，名字为RCSOSA即可，然后将RCS-OSA的核心代码复制进去。

#### 4.1.2 步骤二

之后我们找到'ultralytics/nn/tasks.py'文件，在其中注册我们的RCS-OSA模块。

首先我们需要在文件的开头导入我们的RCS-OSA模块，**如下图所示->**

![](https://img-blog.csdnimg.cn/direct/fbc0423ed26641c19db0b1fa6efce16f.png)

#### 4.1.3 步骤三

我们找到parse\_model这个方法，可以用搜索也可以自己手动找，大概在六百多行吧。 我们找到如下的地方，然后将RCS-OSA添加进去即可

![](https://img-blog.csdnimg.cn/direct/e8e18ce2b34a4f8a86ab6fa69e89df53.png)

到此我们就注册成功了，可以修改yaml文件中输入RCSOSA使用这个模块了。

* * *

### 4.2 RCS-OSA的yaml文件和训练截图

**下面推荐几个版本的yaml文件给大家，大家可以复制进行训练，但是组合用很多具体那种最有效果都不一定，针对不同的数据集效果也不一样，我不可每一种都做实验，所以我下面推荐了几种我自己认为可能有效果的配合方式，你也可以自己进行组合。**

* * *

#### 4.2.1 RCS-OSA的yaml版本一(推荐)

**下面的配置文件为我修改的**RCS-OSA**的位置(我的对比实验是用这个版本跑出来的)。**

 **此版本的GFLOPs大概涨到了24.4GFOPs，参数量为407120 parameters。**

```cobol
# Ultralytics YOLO 🚀, AGPL-3.0 license# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect # Parametersnc: 80  # number of classesscales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'  # [depth, width, max_channels]  n: [0.33, 0.25, 1024]  # YOLOv8n summary: 225 layers,  3157200 parameters,  3157184 gradients,   8.9 GFLOPs  s: [0.33, 0.50, 1024]  # YOLOv8s summary: 225 layers, 11166560 parameters, 11166544 gradients,  28.8 GFLOPs  m: [0.67, 0.75, 768]   # YOLOv8m summary: 295 layers, 25902640 parameters, 25902624 gradients,  79.3 GFLOPs  l: [1.00, 1.00, 512]   # YOLOv8l summary: 365 layers, 43691520 parameters, 43691504 gradients, 165.7 GFLOPs  x: [1.00, 1.25, 512]   # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOPs # YOLOv8.0n backbonebackbone:  # [from, repeats, module, args]  - [-1, 1, Conv, [64, 3, 2]]  # 0-P1/2  - [-1, 1, Conv, [128, 3, 2]]  # 1-P2/4  - [-1, 3, RCSOSA, [128, True]]  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8  - [-1, 6, RCSOSA, [256, True]]  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16  - [-1, 6, RCSOSA, [512, True]]  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32  - [-1, 3, RCSOSA, [1024, True]]  - [-1, 1, SPPF, [1024, 5]]  # 9 # YOLOv8.0n headhead:  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4  - [-1, 3, RCSOSA, [512]]  # 12   - [-1, 1, nn.Upsample, [None, 2, 'nearest']]  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3  - [-1, 3, RCSOSA, [256]]  # 15 (P3/8-small)   - [-1, 1, Conv, [256, 3, 2]]  - [[-1, 12], 1, Concat, [1]]  # cat head P4  - [-1, 3, RCSOSA, [512]]  # 18 (P4/16-medium)   - [-1, 1, Conv, [512, 3, 2]]  - [[-1, 9], 1, Concat, [1]]  # cat head P5  - [-1, 3, RCSOSA, [1024]]  # 21 (P5/32-large)   - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 RCS-OSA的yaml版本二

**添加的版本二具体那种适合你需要大家自己多做实验来尝试。**

```cobol
# Ultralytics YOLO 🚀, AGPL-3.0 license# YOLOv8 object detection model with P3-P5 outputs. For Usage examples see https://docs.ultralytics.com/tasks/detect # Parametersnc: 80  # number of classesscales: # model compound scaling constants, i.e. 'model=yolov8n.yaml' will call yolov8.yaml with scale 'n'  # [depth, width, max_channels]  n: [0.33, 0.25, 1024]  # YOLOv8n summary: 225 layers,  3157200 parameters,  3157184 gradients,   8.9 GFLOPs  s: [0.33, 0.50, 1024]  # YOLOv8s summary: 225 layers, 11166560 parameters, 11166544 gradients,  28.8 GFLOPs  m: [0.67, 0.75, 768]   # YOLOv8m summary: 295 layers, 25902640 parameters, 25902624 gradients,  79.3 GFLOPs  l: [1.00, 1.00, 512]   # YOLOv8l summary: 365 layers, 43691520 parameters, 43691504 gradients, 165.7 GFLOPs  x: [1.00, 1.25, 512]   # YOLOv8x summary: 365 layers, 68229648 parameters, 68229632 gradients, 258.5 GFLOPs # YOLOv8.0n backbonebackbone:  # [from, repeats, module, args]  - [-1, 1, Conv, [64, 3, 2]]  # 0-P1/2  - [-1, 1, Conv, [128, 3, 2]]  # 1-P2/4  - [-1, 3, RCSOSA, [128, True]]  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8  - [-1, 6, RCSOSA, [256, True]]  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16  - [-1, 6, RCSOSA, [512, True]]  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32  - [-1, 3, RCSOSA, [1024, True]]  - [-1, 1, SPPF, [1024, 5]]  # 9 # YOLOv8.0n headhead:  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4  - [-1, 3, C2f, [512]]  # 12   - [-1, 1, nn.Upsample, [None, 2, 'nearest']]  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3  - [-1, 3, C2f, [256]]  # 15 (P3/8-small)   - [-1, 1, Conv, [256, 3, 2]]  - [[-1, 12], 1, Concat, [1]]  # cat head P4  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)   - [-1, 1, Conv, [512, 3, 2]]  - [[-1, 9], 1, Concat, [1]]  # cat head P5  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)   - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

#### 4.2.2 RCS-OSA的训练过程截图 

**下面是添加了**RCS-OSA**的训练截图。**

**大家可以看下面的运行结果和添加的位置所以不存在我发的代码不全或者运行不了的问题大家有问题也可以在评论区评论我看到都会为大家解答(我知道的)。**

![](https://img-blog.csdnimg.cn/direct/45152fe3035048a99b4afd4a04279586.png)

​​​​​​

* * *

五、本文总结
------

到此本文的正式分享内容就结束了，在这里给大家推荐我的YOLOv8改进有效涨点专栏，本专栏目前为新开的平均质量分98分，后期我会根据各种最新的前沿顶会进行论文复现，也会对一些老的改进机制进行补充，**目前本专栏免费阅读(暂时，大家尽早关注不迷路~)**，如果大家觉得本文帮助到你了，订阅本专栏，关注后续更多的更新~

> **专栏回顾：******[YOLOv8改进系列专栏——本专栏持续复习各种顶会内容——科研必备](https://blog.csdn.net/java1314777/category_12483754.html "YOLOv8改进系列专栏——本专栏持续复习各种顶会内容——科研必备")********

![](https://img-blog.csdnimg.cn/direct/bd80c2385d0548e9a87edc73f9261794.gif)​

文章知识点与官方知识档案匹配，可进一步学习相关知识

[OpenCV技能树](https://edu.csdn.net/skill/opencv/opencv-a181ede3b8c7487fbcc212796c27ce77?utm_source=csdn_ai_skill_tree_blog)[OpenCV中的深度学习](https://edu.csdn.net/skill/opencv/opencv-a181ede3b8c7487fbcc212796c27ce77?utm_source=csdn_ai_skill_tree_blog)[图像分类](https://edu.csdn.net/skill/opencv/opencv-a181ede3b8c7487fbcc212796c27ce77?utm_source=csdn_ai_skill_tree_blog)26890 人正在系统学习中

![](https://img-blog.csdnimg.cn/2e7f14b9651748c9a17c305b24cffc4c.png)

购买专栏的读者，可加Qq加交流群

![](https://g.csdnimg.cn/extension-box/1.1.6/image/qq.png) QQ名片

![](https://g.csdnimg.cn/extension-box/1.1.6/image/ic_move.png)

本文转自 <https://snu77.blog.csdn.net/article/details/134865182>，如有侵权，请联系删除。