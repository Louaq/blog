 # FasterBlock改进特征提取网络

一、本文介绍
------

本文给大家带来的改进机制是利用FasterNet的FasterBlock改进特征提取网络，将其用来改进ResNet网络，其旨在**提高计算速度而不牺牲准确性**，特别是在视觉任务中。它通过一种称为**部分卷积（PConv）**的新技术来减少冗余计算和内存访问。这种方法使得FasterNet在多种设备上运行速度比其他网络快得多，同时在各种视觉任务中保持高准确率，同时本文的内容为我独家创新，全网仅此一份，**同时本文的改进机制参数量下降70W，V8n的计算量为6.5GFLOPs**。

<img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/263096a59a4c469daee18054a06e8bd6.png" style="zoom:67%;" />

* * *

二、FasterNet原理
-------------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0fdba2a1271447d391ee78944c58b6c9.png) **论文地址：**[官方论文地址](https://arxiv.org/pdf/2303.03667v3.pdf "官方论文地址")

 **代码地址：**[官方代码地址](https://github.com/JierunChen/FasterNet "官方代码地址")

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2891470b72b94cf898b23908cc811104.png)

* * *

### 2.1 FasterNet的基本原理

**FasterNet**是一种高效的神经网络架构，旨在**提高计算速度而不牺牲准确性**，特别是在视觉任务中。它通过一种称为**部分卷积（PConv）**的新技术来减少冗余计算和内存访问。这种方法使得FasterNet在多种设备上运行速度比其他网络快得多，同时在各种视觉任务中保持高准确率。例如，FasterNet在ImageNet-1k数据集上的表现超过了其他模型，如**MobileViT-XXS**，展现了其在速度和准确度方面的优势。

**FasterNet的基本原理可以总结为以下几点：**

**1\. 部分卷积（PConv）:** FasterNet引入了部分卷积（PConv），这是一种新型的卷积方法，它通过只处理输入通道的一部分来减少计算量和内存访问。

**2\. 加速神经网络**: FasterNet利用PConv的优势，实现了在多种设备上比其他现有神经网络更快的运行速度，同时保持了较高的准确度。

下面为大家展示的是**FasterNet的整体架构**。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/11bd85615c694d4282f9615d7a205445.png)

它包括四个层次化的阶段，每个阶段由一系列FasterNet块组成，并由嵌入或合并层开头。最后三层用于特征分类。在每个FasterNet块中，PConv层之后是两个点状卷积（PWConv）层。为了保持特征多样性并实现更低的延迟，仅在中间层之后放置了**归一化和激活层**。

* * *

### 2.2 **部分卷积**

**部分卷积（PConv）**是一种卷积神经网络中的操作，旨在提高计算效率。它通过**只在输入特征图的一部分上执行卷积操作**，而非传统卷积操作中的全面应用。这样，PConv可以减少不必要的计算和内存访问，因为它忽略了输入中认为是冗余的部分。这种方法特别适合在资源有限的设备上运行深度学习模型，因为它可以在不牺牲太多性能的情况下，显著降低计算需求。

下面我为大家展示了FasterNet中的**部分卷积（PConv）与传统卷积和深度卷积/分组卷积的比较**：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e44845d610364a948d0164ea55bf228f.png)

PConv通过仅对输入通道的一小部分应用滤波器，同时保持其余通道不变，实现了快速和高效的特性提取。PConv的计算复杂度（**FLOPs**）低于常规卷积，但高于深度卷积/分组卷积，这样在减少计算资源的同时提高了运算性能。

* * *

### 2.3 **加速神经网络**

**加速神经网络**主要通过优化计算路径、减少模型大小和复杂性、提高操作效率，以及使用高效的硬件实现等方式来降低模型的推理时间。这些方法包括

**简化网络层**、**使用更快的激活函数**、**采用量化技术**将**浮点运算转换为整数运算**，以及使用特殊的算法来减少内存访问次数等。通过这些策略，可以在不损害模型准确性的前提下，使神经网络能够更快地处理数据和做出预测。

* * *

三、FasterBlock的核心代码
------------------

```python
import torch
import torch.nn as nn
from timm.models.layers import DropPath
 
__all__ = ['C2f_FasterBlock']
 
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
        x = x.clone()  # !!! Keep the original input intact for the residual connection later
        x[:, :self.dim_conv3, :, :] = self.partial_conv3(x[:, :self.dim_conv3, :, :])
 
        return x
 
    def forward_split_cat(self, x):
        # for training/inference
        x1, x2 = torch.split(x, [self.dim_conv3, self.dim_untouched], dim=1)
        x1 = self.partial_conv3(x1)
        x = torch.cat((x1, x2), 1)
 
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
 
 
class FasterBlock(nn.Module):
 
    def __init__(self,
                 inc,
                 dim,
                 n_div=4,
                 mlp_ratio=2,
                 drop_path=0.1,
                 layer_scale_init_value=0.0,
                 act_layer='RELU',
                 norm_layer='BN',
                 pconv_fw_type='split_cat'
                 ):
 
        super().__init__()
        self.dim = dim
        self.inc = inc
        self.mlp_ratio = mlp_ratio
        self.drop_path = DropPath(drop_path) if drop_path > 0. else nn.Identity()
        self.n_div = n_div
 
        mlp_hidden_dim = int(dim * mlp_ratio)
 
        mlp_layer = [
            nn.Conv2d(dim, mlp_hidden_dim, 1, bias=False),
            nn.BatchNorm2d(mlp_hidden_dim),
            nn.ReLU(),
            nn.Conv2d(mlp_hidden_dim, dim, 1, bias=False)
        ]
 
        self.mlp = nn.Sequential(*mlp_layer)
 
        self.spatial_mixing = Partial_conv3(
            dim,
            n_div,
            pconv_fw_type
        )
 
        if inc != dim:  # 在输入和输出不等时添加额外处理一步
            self.firstConv = Conv(inc, dim, 1)
 
        if layer_scale_init_value > 0:
            self.layer_scale = nn.Parameter(layer_scale_init_value * torch.ones((dim)), requires_grad=True)
            self.forward = self.forward_layer_scale
        else:
            self.forward = self.forward
 
    def forward(self, x):
        if self.inc != self.dim:
            x = self.firstConv(x)
        shortcut = x
        x = self.spatial_mixing(x)
        x = shortcut + self.drop_path(self.mlp(x))
        return x
 
    def forward_layer_scale(self, x):
        if self.inc != self.dim:
            x = self.firstConv(x)
        shortcut = x
        x = self.spatial_mixing(x)
        x = shortcut + self.drop_path(
            self.layer_scale.unsqueeze(-1).unsqueeze(-1) * self.mlp(x))
        return x
 
 
class C2f_FasterBlock(nn.Module):
    """Faster Implementation of CSP Bottleneck with 2 convolutions."""
 
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):
        """Initialize CSP bottleneck layer with two convolutions with arguments ch_in, ch_out, number, shortcut, groups,
        expansion.
        """
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(FasterBlock(self.c, self.c) for _ in range(n))
 
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
 
 
if __name__ == "__main__":
    # Generating Sample image
    image_size = (1, 64, 240, 240)
    image = torch.rand(*image_size)
 
    # Model
    model = C2f_FasterBlock(64, 64)
 
    out = model(image)
    print(out.size())
```

四、 手把手教你添加FasterBlock机制 
------------------------

### 4.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn/modules文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/923e1ccca6c14fe59de8b94a1427728b.png)



* * *

### 4.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/18282d97051a47d799abb207d73a2e0e.png)

* * *

### 4.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)

* * *

### 4.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3a03c16d5b8a457c9ca40c8e5ca926f7.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

五、FasterBlock的yaml文件和运行记录
-------------------------

### 5.1 FasterBlock的yaml文件

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
  - [-1, 3, C2f_FasterBlock, [128, True]]
  - [-1, 1, Conv, [256, 3, 2]]  # 3-P3/8
  - [-1, 6, C2f_FasterBlock, [256, True]]
  - [-1, 1, Conv, [512, 3, 2]]  # 5-P4/16
  - [-1, 6, C2f_FasterBlock, [512, True]]
  - [-1, 1, Conv, [1024, 3, 2]]  # 7-P5/32
  - [-1, 3, C2f_FasterBlock, [1024, True]]
  - [-1, 1, SPPF, [1024, 5]]  # 9
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 6], 1, Concat, [1]]  # cat backbone P4
  - [-1, 3, C2f_FasterBlock, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, C2f_FasterBlock, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_FasterBlock, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_FasterBlock, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

### 5.2 训练代码 

大家可以创建一个py文件将我给的代码复制粘贴进去，配置好自己的文件路径即可运行。

```python
import warnings
warnings.filterwarnings('ignore')
from ultralytics import YOLO
 
if __name__ == '__main__':
    model = YOLO('ultralytics/cfg/models/v8/yolov8-C2f-FasterBlock.yaml')
    # model.load('yolov8n.pt') # loading pretrain weights
    model.train(data=r'替换数据集yaml文件地址',
                # 如果大家任务是其它的'ultralytics/cfg/default.yaml'找到这里修改task可以改成detect, segment, classify, pose
                cache=False,
                imgsz=640,
                epochs=150,
                single_cls=False,  # 是否是单类别检测
                batch=4,
                close_mosaic=10,
                workers=0,
                device='0',
                optimizer='SGD', # using SGD
                # resume='', # 如过想续训就设置last.pt的地址
                amp=False,  # 如果出现训练损失为Nan可以关闭amp
                project='runs/train',
                name='exp',
                )
```

* * *

### 5.3 FasterBlock的训练过程截图 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/de4d96bf338349a88486b8a767f21a28.png)

