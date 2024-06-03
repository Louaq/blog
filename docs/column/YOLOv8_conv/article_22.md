# ADown模块 

一、本文介绍 
-------

本文给大家带来的改进机制是利用2024/02/21号最新发布的**YOLOv9其中提出的ADown模块来改进我们的Conv模块**，其中YOLOv9针对于这个模块并没有介绍，只是在其项目文件中用到了，我将其整理出来用于我们的YOLOv8的项目，经过实验我发现该卷积模块（作为下采样模块）首先可以大幅度降低参数值**（v8n大约六十万）**，其次其精度上也有很高的提升，同时**本文的内容目前网络上并无其它人总结（也是最新发布的，可以说BUff是集满了）**大家可以尝试以下在自己数据集上的效果。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f5ef403f76a543d0a0148a333a39608b.png)

* * *

二、框架图
-----

 ![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9fc430ef400243b4b1ed90e39b882356.png)

> 这张图（图3）展示了可编程梯度信息（PGI）及其相关网络架构和方法。图中展示了四种不同的网络设计：
>
> **a) PAN (Path Aggregation Network)**：这种网络结构主要用于改进特征融合，以提高目标检测的性能。然而，由于信息瓶颈的存在，网络中可能会丢失一些信息。
>
> **b) RevCol (Reversible Columns)**：这是一种旨在减少信息丢失的网络设计。它通过可逆的列结构来尝试维持信息流通不受损失，但如图中“Heavy Cost”所示，这种结构会增加计算成本。
>
> **c) 深度监督**：这种方法通过在网络的多个层次中插入额外的监督信号来提高学习的效率和最终模型的性能。图中显示了通过深度监督连接的各个层。
>
> **d) 可编程梯度信息 (PGI)**：PGI是作者提出的一种新方法（**我理解的这种方法就是在前向传播的过程中没有跳级链接）**，它主要由三个部分组成：  
>
>    1. 主分支：用于推理的架构。  
>    2. 辅助可逆分支：生成可靠的梯度，以供给主分支进行反向传播。  
>    3. 多级辅助信息：控制主分支学习可规划的多级语义信息。
>
> PGI的目的是通过辅助可逆分支（如图中虚线框所示）来解决信息瓶颈问题，以便在不增加推理成本的情况下为深度网络提供更可靠的梯度。通过这种设计，即使是轻量级和浅层的神经网络也可以实现有效的信息保留和准确的梯度更新。如图中的深色方框所示的主分支，通过辅助可逆分支提供的可靠梯度信息，可以获得更有效的目标任务特征，而不会因为信息瓶颈而损失重要信息。
>
> **图中的符号代表不同的操作**：灰色圆形代表池化操作，白色圆形代表上采样操作，灰色方块代表预测头，蓝色方块代表辅助分支，深色方块代表主分支。这种设计允许网络在保持高效计算的同时，也能够处理复杂的目标检测任务。

* * *

### 2.1 Programmable Gradient Information​​可编程梯度信息

为了解决前述问题，我们提出了一种新的辅助监督框架，称为可编程梯度信息（PGI），如图3（d）所示。PGI主要包括三个部分，即（1）主分支，（2）辅助可逆分支和（3）多级辅助信息。从图3（d）我们可以看到，PGI的推理过程只使用主分支，因此不需要任何额外的推理成本。至于其他两个部分，它们用于解决或减缓深度学习方法中的几个重要问题。其中，辅助可逆分支旨在处理由神经网络加深造成的问题。网络加深将导致信息瓶颈，这将使得损失函数无法生成可靠的梯度。至于多级辅助信息，它旨在处理由深度监督造成的误差累积问题，特别是对于具有多个预测分支的架构和轻量型模型。接下来，我们将逐步介绍这两个部分​​。 

* * *

#### 2.1.1 Auxiliary Reversible Branch辅助可逆分支

在PGI中，我们提出了辅助可逆分支来生成可靠的梯度并更新网络参数。通过提供从数据到目标的映射信息，损失函数可以提供指导，并避免从与目标关系较小的不完整前馈特征中找到错误相关性的可能性。我们提出通过引入可逆架构来维持完整信息，但在可逆架构中添加主分支将消耗大量的推理成本。我们分析了图3（b）的架构，并发现在深层到浅层添加额外连接时，推理时间将增加20%。当我们反复将输入数据添加到网络的高分辨率计算层（黄色框），推理时间甚至超过了两倍。

由于我们的目标是使用可逆架构来获取可靠的梯度，因此“可逆”并不是推理阶段的唯一必要条件。鉴于此，我们将可逆分支视为深度监督分支的扩展，并设计了如图3（d）所示的辅助可逆分支。至于主分支，由于信息瓶颈可能会丢失重要信息的深层特征，将能够从辅助可逆分支接收可靠的梯度信息。这些梯度信息将推动参数学习，以帮助提取正确和重要的信息，并使主分支能够获取更有效的目标任务特征。此外，由于复杂任务需要在更深的网络中进行转换，可逆架构在浅层网络上的表现不如在一般网络上。我们提出的方法不强迫主分支保留完整的原始信息，而是通过辅助监督机制生成有用的梯度来更新它。这种设计的优势是，所提出的方法也可以应用于较浅的网络。最后，由于辅助可逆分支可以在推理阶段移除，因此可以保留原始网络的推理能力。我们还可以在PGI中选择任何可逆架构来充当辅助可逆分支的角色。

* * *

#### 2.1.2 Multi-level Auxiliary Information多级辅助信息

在本节中，我们将讨论多级辅助信息是如何工作的。包含多个预测分支的深度监督架构如图3（c）所示。对于对象检测，可以使用不同的特征金字塔来执行不同的任务，例如它们可以一起检测不同大小的对象。因此，连接到深度监督分支后，浅层特征将被引导学习小对象检测所需的特征，此时系统将将其他大小的对象位置视为背景。然而，上述行为将导致深层特征金字塔丢失很多预测目标对象所需的信息。对于这个问题，我们认为每个特征金字塔都需要接收所有目标对象的信息，以便后续主分支能够保留完整信息来学习对各种目标的预测。

多级辅助信息的概念是在辅助监督的特征金字塔层之间和主分支之间插入一个集成网络，然后使用它来结合不同预测头返回的梯度，如图3（d）所示。然后，多级辅助信息将汇总包含所有目标对象的梯度信息，并将其传递给主分支然后更新参数。此时，主分支的特征金字塔层次的特性不会被某些特定对象的信息所主导。因此，我们的方法可以缓解深度监督中的断裂信息问题。此外，任何集成网络都可以在多级辅助信息中使用。因此，我们可以规划所需的语义级别来指导不同大小的网络架构的学习。

* * *

### 2.2 Generalized ELAN

在本节中，我们描述了提出的新网络架构 - GELAN。通过结合两种神经网络架构CSPNet和ELAN，这两种架构都是以梯度路径规划设计的，我们设计了考虑了轻量级、推理速度和准确性的广义高效层聚合网络（GELAN）。其整体架构如图4所示。我们推广了ELAN的能力，ELAN原本只使用卷积层的堆叠，到一个新的架构，可以使用任何计算块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/46b1bc49cbc8418a92eb97c8cf9acca9.png)

> 这张图（图4）展示了广义高效层聚合网络（GELAN）的架构，以及它是如何从CSPNet和ELAN这两种神经网络架构演变而来的。这两种架构都设计有梯度路径规划。
> 
> **a) CSPNet**：在CSPNet的架构中，输入通过一个转换层被分割为两部分，然后分别通过任意的计算块。之后，这些分支被重新合并（通过concatenation），并再次通过转换层。
> 
> **b) ELAN**：与CSPNet相比，ELAN采用了堆叠的卷积层，其中每一层的输出都会与下一层的输入相结合，再经过卷积处理。
> 
> **c) GELAN**：结合了CSPNet和ELAN的设计，提出了GELAN。它采用了CSPNet的分割和重组的概念，并在每一部分引入了ELAN的层级卷积处理方式。不同之处在于GELAN不仅使用卷积层，还可以使用任何计算块，使得网络更加灵活，能够根据不同的应用需求定制。
> 
> GELAN的设计考虑到了轻量化、推理速度和精确度，以此来提高模型的整体性能。图中显示的模块和分区的可选性进一步增加了网络的适应性和可定制性。GELAN的这种结构允许它支持多种类型的计算块，这使得它可以更好地适应各种不同的计算需求和硬件约束。
> 
> 总的来说，GELAN的架构是为了提供一个更加通用和高效的网络，可以适应从轻量级到复杂的深度学习任务，同时保持或增强计算效率和性能。通过这种方式，GELAN旨在解决现有架构的限制，提供一个可扩展的解决方案，以适应未来深度学习的发展。
> 
> **大家看图片一眼就能看出来它融合了什么，就是将CSPHet的anyBlock模块堆叠的方式和ELAN融合到了一起。**

目前针对该结构并无原理介绍，下面的图片为我个人经过代码复现的结构图，结构上也是非常的简单。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/816ff24242ce4af6930e832c3724a93a.png)



三、 核心代码
-------

**核心代码的使用方式看章节四！**

```python
import torch
import torch.nn as nn
 
 
__all__ = ['ADown']
 
def autopad(k, p=None, d=1):  # kernel, padding, dilation
    # Pad to 'same' shape outputs
    if d > 1:
        k = d * (k - 1) + 1 if isinstance(k, int) else [d * (x - 1) + 1 for x in k]  # actual kernel-size
    if p is None:
        p = k // 2 if isinstance(k, int) else [x // 2 for x in k]  # auto-pad
    return p
 
 
class Conv(nn.Module):
    # Standard convolution with args(ch_in, ch_out, kernel, stride, padding, groups, dilation, activation)
    default_act = nn.SiLU()  # default activation
 
    def __init__(self, c1, c2, k=1, s=1, p=None, g=1, d=1, act=True):
        super().__init__()
        self.conv = nn.Conv2d(c1, c2, k, s, autopad(k, p, d), groups=g, dilation=d, bias=False)
        self.bn = nn.BatchNorm2d(c2)
        self.act = self.default_act if act is True else act if isinstance(act, nn.Module) else nn.Identity()
 
    def forward(self, x):
        return self.act(self.bn(self.conv(x)))
 
    def forward_fuse(self, x):
        return self.act(self.conv(x))
 
 
class ADown(nn.Module):
    def __init__(self, c1, c2):  # ch_in, ch_out, shortcut, kernels, groups, expand
        super().__init__()
        self.c = c2 // 2
        self.cv1 = Conv(c1 // 2, self.c, 3, 2, 1)
        self.cv2 = Conv(c1 // 2, self.c, 1, 1, 0)
 
    def forward(self, x):
        x = torch.nn.functional.avg_pool2d(x, 2, 1, 0, False, True)
        x1,x2 = x.chunk(2, 1)
        x1 = self.cv1(x1)
        x2 = torch.nn.functional.max_pool2d(x2, 3, 2, 1)
        x2 = self.cv2(x2)
        return torch.cat((x1, x2), 1)
 
 
 
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
 
 
 
 
if __name__ == '__main__':
    x = torch.randn(1, 32, 16, 16)
    model = ADown(32, 32)
    print(model(x).shape)
```

* * *

四、手把手教你添加ADown机制
----------------

###  4.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn/modules文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2aac2e0aaca4444386a452e5dfb98e24.png)





* * *

### 4.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0ee3621867f5429395322ecd03d95a7f.png)

* * *

### 4.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)​

* * *

### 4.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cec5bfb62f114501a13099ff717b1a57.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

* * *

五、ADown的yaml文件和运行记录
-------------------

### 5.1 ADown的yaml文件

**主干和Neck全部用上该卷积轻量化到机制的yaml文件。**

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
  - [-1, 1, ADown, [128]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, ADown, [256]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, ADown, [512]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, ADown, [1024]]  # 7-P5/32
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
 
  - [-1, 1, ADown, [256]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, ADown, [512]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

### 5.2 ADown的yaml文件

**仅作为主干上特征提取的Conv来用。**

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
  - [-1, 1, ADown, [128]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, ADown, [256]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, ADown, [512]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, ADown, [1024]]  # 7-P5/32
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

### 5.3 训练代码 

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

### 5.4 ADown的训练过程截图 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8f4b7d9240c24c458147e39d5ecca712.png)

 

