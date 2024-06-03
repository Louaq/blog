# OREPA 

一、本文介绍
------

本文给大家带来的改进机制是一种重参数化的卷积模块**OREPA**，这种重参数化模块非常适合用于二次创新，我们可以将其替换网络中的其它卷积模块可以不影响推理速度的同时让模型学习到更多的特征。**OREPA**是通过**在线卷积重参数化（Online Convolutional Re-parameterization）**来减少深度学习模型训练的成本和复杂性。这种方法主要包括**两个阶段**：首先，利用一个特殊的线性缩放层来优化在线块的性能；其次，通过将复杂的训练时模块压缩成一个单一的卷积来减少训练开销。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1a1a6f9f899049f296a3ed14f1c8eacb.png)

二、OREPA原理
---------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6b348fa0f29449d38dbbd218e526e060.png)

**论文地址：[官方论文地址](https://arxiv.org/pdf/2204.00826.pdf "官方论文地址")**

**代码地址：[官方代码地址](http://https//github.com/JUGGHM/OREPA_CVPR2022. "官方代码地址")**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/71b305411a0e456999fc169ca370e710.png)

### 2.1  OREPA的基本原理

**OREPA**是通过**在线卷积重参数化（Online Convolutional Re-parameterization）**来减少深度学习模型训练的成本和复杂性。这种方法主要包括**两个阶段**：首先，利用一个特殊的线性缩放层来优化在线块的性能；其次，通过将复杂的训练时模块压缩成一个单一的卷积来减少训练开销。OREPA能够显著降低训练时的内存和计算成本，同时提高训练速度，并在标准的计算机视觉任务如图像分类、物体检测和语义分割等方面取得了更好的性能表现。

**OREPA（在线卷积重参数化）的基本原理可以分为以下几点：**

**1\. 两阶段流程**：OREPA采用两个阶段来实现其目标。首先是在线优化阶段，其次是压缩训练时模块阶段。

**2\. 线性缩放层**：引入线性缩放层来优化在线模块，以更有效地进行训练。

**3\. 训练时模块压缩**：将复杂的训练时模块压缩成一个单一的卷积操作，以减少训练开销。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/55abba5b333a44db9baa2a1abc161093.png)

这张图展示了**在线卷积重参数化（OREPA）流程的具体步骤：**

**1\. 移除（Remove）**：首先移除原型块中的非线性层，如ReLU和批量归一化（BN）。

**2\. 添加缩放（Add Scaling）**：引入缩放层来优化卷积层的输出。

**3\. 添加归一化（Add Norm）**：最后，添加归一化来进行模型的性能优化和提升。

通过这一系列步骤，OREPA方法在训练阶段有效地简化了模型的复杂性，优化了训练效率，并为高性能模型的构建提供了一种新的方法论。

* * *

### 2.2 **两阶段流程**

下面为大家展示了**在线重参数化（OREPA）的两个阶段：**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b11e070188eb43ebaffdf53f7012159b.png)

**1\. 块线性化（Block Linearization）**：在这个阶段，原型重参数化块中的所有非线性组件被移除，只留下卷积和批量归一化（BN）层，并加入缩放层以优化性能。

**2\. 块挤压（Block Squeezing）**：随后，这个过程将上述线性化的块合并成一个单独的卷积层（OREPA Conv），这样可以显著减少训练成本，同时保持高性能。

* * *

### 2.3 **线性缩放层**

**线性缩放层**在OREPA中是一个关键的组成部分，它允许模型在训练过程中进行更有效的权重更新。这一层的目的是在**保持训练时复杂性管理**的同时，提高模型在学习特征时的灵活性和适应性。通过对权重进行合适的缩放，这一层有助于模型在整个训练过程中维持稳定的梯度流动，这对于深度学习模型的优化至关重要。这种线性缩放层通过在训练时对卷积层的输出进行缩放，使模型可以更快地收敛，同时减少资源的消耗。

下面这张图展示了**在线卷积重参数化（OREPA）框架中提出的四个组件：**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e3b8e6ccfcef417bafb623cdfe9dc3c5.png)

 **(a) 频率先验过滤器**：一个结合了1x1卷积和3x3频率先验滤波器的结构，随后是一个缩放层。  
 **(b) 线性深度可分离卷积（Linear DW sepconv）**：包含了3x3深度可分离卷积（DW Conv），后面跟着1x1逐点卷积（PW Conv）和缩放层。  
 **(c) 重参数1x1卷积**：由两个1x1卷积层组成，其中每个层后都接有一个缩放层，这些层被用来重参数化更大的卷积结构。

 **(d) 线性深层干细胞（Linear deep stem）**：由三个3x3卷积层组成，这种结构旨在处理输入数据的最初几层，以提高模型的初期特征提取能力。

* * *

### 2.4 **训练时模块压缩**

在OREPA框架中，**训练时模块压缩**指的是在训练阶段，通过**线性化处理和结构简化**将原本复杂的卷积网络块转换为一个简单的卷积层。这种方法减少了模型训练时的内存占用和计算成本。具体来说，它涉及到移除非线性激活函数、合并多个卷积层，并引入缩放层来调整卷积层权重的规模。

 这张图展示了**不同卷积层结构在训练阶段和推理阶段的对比**：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/befc20de61f24f7f9307b727423daf0a.png)

 **(a)** 是一个标准的卷积层，没有重参数化（No Re-param）。  
 **(b)** 展示了一个典型的结构重参数化块（Structural Re-param）。  
 **(c)** 是论文中提出的在线重参数化块（OREPA），即在线卷积重参数化。  
 **(d)** 是部署时的结构，所有训练阶段的结构在推理时都转换为这个简单的卷积结构。

> 在训练阶段，OREPA的设计允许将多个卷积层和批量归一化（BN）层通过重参数化合并为一个卷积层，以减少训练时的复杂性和内存需求。在推理时，不论训练时的结构如何复杂，所有模型都被简化为单一的卷积层，这有助于提高推理速度并降低推理时的资源消耗。

下图为大家展示的是**OREPA块的设计**，它在训练和推理过程中对应于一个**3x3的卷积**。这个设计通过将一系列卷积层、池化层和频率先验层，并带有缩放层，最终通过一个挤压操作将这些层合并成一个单独的OREPA卷积层。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/d1fc248718954403b05a8041d139cd43.png)

三、OREPA的核心代码
------------

**代码的使用方式看章节四！**

```python
import math
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from torch.nn import init
 
__all__ = ['OREPA', 'C2f_OREPA']
 
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
 
def transI_fusebn(kernel, bn):
    gamma = bn.weight
    std = (bn.running_var + bn.eps).sqrt()
    return kernel * ((gamma / std).reshape(-1, 1, 1, 1)), bn.bias - bn.running_mean * gamma / std
 
 
def transVI_multiscale(kernel, target_kernel_size):
    H_pixels_to_pad = (target_kernel_size - kernel.size(2)) // 2
    W_pixels_to_pad = (target_kernel_size - kernel.size(3)) // 2
    return F.pad(kernel, [W_pixels_to_pad, W_pixels_to_pad, H_pixels_to_pad, H_pixels_to_pad])
 
 
class OREPA(nn.Module):
    def __init__(self,
                 in_channels,
                 kernel_size=3,
                 stride=1,
                 padding=None,
                 groups=1,
                 dilation=1,
                 act=True,
                 internal_channels_1x1_3x3=None,
                 deploy=False,
                 single_init=False,
                 weight_only=False,
                 init_hyper_para=1.0, init_hyper_gamma=1.0):
        super(OREPA, self).__init__()
        self.deploy = deploy
        out_channels = in_channels
        self.nonlinear = Conv.default_act if act is True else act if isinstance(act, nn.Module) else nn.Identity()
        self.weight_only = weight_only
 
        self.kernel_size = kernel_size
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.groups = groups
 
        self.stride = stride
        padding = autopad(kernel_size, padding, dilation)
        self.padding = padding
        self.dilation = dilation
 
        if deploy:
            self.orepa_reparam = nn.Conv2d(in_channels=in_channels, out_channels=out_channels, kernel_size=kernel_size,
                                           stride=stride,
                                           padding=padding, dilation=dilation, groups=groups, bias=True)
 
        else:
 
            self.branch_counter = 0
 
            self.weight_orepa_origin = nn.Parameter(
                torch.Tensor(out_channels, int(in_channels / self.groups), kernel_size, kernel_size))
            init.kaiming_uniform_(self.weight_orepa_origin, a=math.sqrt(0.0))
            self.branch_counter += 1
 
            self.weight_orepa_avg_conv = nn.Parameter(
                torch.Tensor(out_channels, int(in_channels / self.groups), 1,
                             1))
            self.weight_orepa_pfir_conv = nn.Parameter(
                torch.Tensor(out_channels, int(in_channels / self.groups), 1,
                             1))
            init.kaiming_uniform_(self.weight_orepa_avg_conv, a=0.0)
            init.kaiming_uniform_(self.weight_orepa_pfir_conv, a=0.0)
            self.register_buffer(
                'weight_orepa_avg_avg',
                torch.ones(kernel_size,
                           kernel_size).mul(1.0 / kernel_size / kernel_size))
            self.branch_counter += 1
            self.branch_counter += 1
 
            self.weight_orepa_1x1 = nn.Parameter(
                torch.Tensor(out_channels, int(in_channels / self.groups), 1,
                             1))
            init.kaiming_uniform_(self.weight_orepa_1x1, a=0.0)
            self.branch_counter += 1
 
            if internal_channels_1x1_3x3 is None:
                internal_channels_1x1_3x3 = in_channels if groups <= 4 else 2 * in_channels
 
            if internal_channels_1x1_3x3 == in_channels:
                self.weight_orepa_1x1_kxk_idconv1 = nn.Parameter(
                    torch.zeros(in_channels, int(in_channels / self.groups), 1, 1))
                id_value = np.zeros(
                    (in_channels, int(in_channels / self.groups), 1, 1))
                for i in range(in_channels):
                    id_value[i, i % int(in_channels / self.groups), 0, 0] = 1
                id_tensor = torch.from_numpy(id_value).type_as(
                    self.weight_orepa_1x1_kxk_idconv1)
                self.register_buffer('id_tensor', id_tensor)
 
            else:
                self.weight_orepa_1x1_kxk_idconv1 = nn.Parameter(
                    torch.zeros(internal_channels_1x1_3x3,
                                int(in_channels / self.groups), 1, 1))
                id_value = np.zeros(
                    (internal_channels_1x1_3x3, int(in_channels / self.groups), 1, 1))
                for i in range(internal_channels_1x1_3x3):
                    id_value[i, i % int(in_channels / self.groups), 0, 0] = 1
                id_tensor = torch.from_numpy(id_value).type_as(
                    self.weight_orepa_1x1_kxk_idconv1)
                self.register_buffer('id_tensor', id_tensor)
                # init.kaiming_uniform_(
                # self.weight_orepa_1x1_kxk_conv1, a=math.sqrt(0.0))
            self.weight_orepa_1x1_kxk_conv2 = nn.Parameter(
                torch.Tensor(out_channels,
                             int(internal_channels_1x1_3x3 / self.groups),
                             kernel_size, kernel_size))
            init.kaiming_uniform_(self.weight_orepa_1x1_kxk_conv2, a=math.sqrt(0.0))
            self.branch_counter += 1
 
            expand_ratio = 8
            self.weight_orepa_gconv_dw = nn.Parameter(
                torch.Tensor(in_channels * expand_ratio, 1, kernel_size,
                             kernel_size))
            self.weight_orepa_gconv_pw = nn.Parameter(
                torch.Tensor(out_channels, int(in_channels * expand_ratio / self.groups), 1, 1))
            init.kaiming_uniform_(self.weight_orepa_gconv_dw, a=math.sqrt(0.0))
            init.kaiming_uniform_(self.weight_orepa_gconv_pw, a=math.sqrt(0.0))
            self.branch_counter += 1
 
            self.vector = nn.Parameter(torch.Tensor(self.branch_counter, self.out_channels))
            if weight_only is False:
                self.bn = nn.BatchNorm2d(self.out_channels)
 
            self.fre_init()
 
            init.constant_(self.vector[0, :], 0.25 * math.sqrt(init_hyper_gamma))  # origin
            init.constant_(self.vector[1, :], 0.25 * math.sqrt(init_hyper_gamma))  # avg
            init.constant_(self.vector[2, :], 0.0 * math.sqrt(init_hyper_gamma))  # prior
            init.constant_(self.vector[3, :], 0.5 * math.sqrt(init_hyper_gamma))  # 1x1_kxk
            init.constant_(self.vector[4, :], 1.0 * math.sqrt(init_hyper_gamma))  # 1x1
            init.constant_(self.vector[5, :], 0.5 * math.sqrt(init_hyper_gamma))  # dws_conv
 
            self.weight_orepa_1x1.data = self.weight_orepa_1x1.mul(init_hyper_para)
            self.weight_orepa_origin.data = self.weight_orepa_origin.mul(init_hyper_para)
            self.weight_orepa_1x1_kxk_conv2.data = self.weight_orepa_1x1_kxk_conv2.mul(init_hyper_para)
            self.weight_orepa_avg_conv.data = self.weight_orepa_avg_conv.mul(init_hyper_para)
            self.weight_orepa_pfir_conv.data = self.weight_orepa_pfir_conv.mul(init_hyper_para)
 
            self.weight_orepa_gconv_dw.data = self.weight_orepa_gconv_dw.mul(math.sqrt(init_hyper_para))
            self.weight_orepa_gconv_pw.data = self.weight_orepa_gconv_pw.mul(math.sqrt(init_hyper_para))
 
            if single_init:
                #   Initialize the vector.weight of origin as 1 and others as 0. This is not the default setting.
                self.single_init()
 
    def fre_init(self):
        prior_tensor = torch.Tensor(self.out_channels, self.kernel_size,
                                    self.kernel_size)
        half_fg = self.out_channels / 2
        for i in range(self.out_channels):
            for h in range(3):
                for w in range(3):
                    if i < half_fg:
                        prior_tensor[i, h, w] = math.cos(math.pi * (h + 0.5) *
                                                         (i + 1) / 3)
                    else:
                        prior_tensor[i, h, w] = math.cos(math.pi * (w + 0.5) *
                                                         (i + 1 - half_fg) / 3)
 
        self.register_buffer('weight_orepa_prior', prior_tensor)
 
    def weight_gen(self):
        weight_orepa_origin = torch.einsum('oihw,o->oihw',
                                           self.weight_orepa_origin,
                                           self.vector[0, :])
 
        weight_orepa_avg = torch.einsum('oihw,hw->oihw', self.weight_orepa_avg_conv, self.weight_orepa_avg_avg)
        weight_orepa_avg = torch.einsum(
            'oihw,o->oihw',
            torch.einsum('oi,hw->oihw', self.weight_orepa_avg_conv.squeeze(3).squeeze(2),
                         self.weight_orepa_avg_avg), self.vector[1, :])
 
        weight_orepa_pfir = torch.einsum(
            'oihw,o->oihw',
            torch.einsum('oi,ohw->oihw', self.weight_orepa_pfir_conv.squeeze(3).squeeze(2),
                         self.weight_orepa_prior), self.vector[2, :])
 
        weight_orepa_1x1_kxk_conv1 = None
        if hasattr(self, 'weight_orepa_1x1_kxk_idconv1'):
            weight_orepa_1x1_kxk_conv1 = (self.weight_orepa_1x1_kxk_idconv1 +
                                          self.id_tensor).squeeze(3).squeeze(2)
        elif hasattr(self, 'weight_orepa_1x1_kxk_conv1'):
            weight_orepa_1x1_kxk_conv1 = self.weight_orepa_1x1_kxk_conv1.squeeze(3).squeeze(2)
        else:
            raise NotImplementedError
        weight_orepa_1x1_kxk_conv2 = self.weight_orepa_1x1_kxk_conv2
 
        if self.groups > 1:
            g = self.groups
            t, ig = weight_orepa_1x1_kxk_conv1.size()
            o, tg, h, w = weight_orepa_1x1_kxk_conv2.size()
            weight_orepa_1x1_kxk_conv1 = weight_orepa_1x1_kxk_conv1.view(
                g, int(t / g), ig)
            weight_orepa_1x1_kxk_conv2 = weight_orepa_1x1_kxk_conv2.view(
                g, int(o / g), tg, h, w)
            weight_orepa_1x1_kxk = torch.einsum('gti,gothw->goihw',
                                                weight_orepa_1x1_kxk_conv1,
                                                weight_orepa_1x1_kxk_conv2).reshape(
                o, ig, h, w)
        else:
            weight_orepa_1x1_kxk = torch.einsum('ti,othw->oihw',
                                                weight_orepa_1x1_kxk_conv1,
                                                weight_orepa_1x1_kxk_conv2)
        weight_orepa_1x1_kxk = torch.einsum('oihw,o->oihw', weight_orepa_1x1_kxk, self.vector[3, :])
 
        weight_orepa_1x1 = 0
        if hasattr(self, 'weight_orepa_1x1'):
            weight_orepa_1x1 = transVI_multiscale(self.weight_orepa_1x1,
                                                  self.kernel_size)
            weight_orepa_1x1 = torch.einsum('oihw,o->oihw', weight_orepa_1x1,
                                            self.vector[4, :])
 
        weight_orepa_gconv = self.dwsc2full(self.weight_orepa_gconv_dw,
                                            self.weight_orepa_gconv_pw,
                                            self.in_channels, self.groups)
        weight_orepa_gconv = torch.einsum('oihw,o->oihw', weight_orepa_gconv,
                                          self.vector[5, :])
 
        weight = weight_orepa_origin + weight_orepa_avg + weight_orepa_1x1 + weight_orepa_1x1_kxk + weight_orepa_pfir + weight_orepa_gconv
 
        return weight
 
    def dwsc2full(self, weight_dw, weight_pw, groups, groups_conv=1):
 
        t, ig, h, w = weight_dw.size()
        o, _, _, _ = weight_pw.size()
        tg = int(t / groups)
        i = int(ig * groups)
        ogc = int(o / groups_conv)
        groups_gc = int(groups / groups_conv)
        weight_dw = weight_dw.view(groups_conv, groups_gc, tg, ig, h, w)
        weight_pw = weight_pw.squeeze().view(ogc, groups_conv, groups_gc, tg)
 
        weight_dsc = torch.einsum('cgtihw,ocgt->cogihw', weight_dw, weight_pw)
        return weight_dsc.reshape(o, int(i / groups_conv), h, w)
 
    def forward(self, inputs=None):
        if hasattr(self, 'orepa_reparam'):
            return self.nonlinear(self.orepa_reparam(inputs))
 
        weight = self.weight_gen()
 
        if self.weight_only is True:
            return weight
 
        out = F.conv2d(
            inputs,
            weight,
            bias=None,
            stride=self.stride,
            padding=self.padding,
            dilation=self.dilation,
            groups=self.groups)
        return self.nonlinear(self.bn(out))
 
    def get_equivalent_kernel_bias(self):
        return transI_fusebn(self.weight_gen(), self.bn)
 
    def switch_to_deploy(self):
        if hasattr(self, 'or1x1_reparam'):
            return
        kernel, bias = self.get_equivalent_kernel_bias()
        self.orepa_reparam = nn.Conv2d(in_channels=self.in_channels, out_channels=self.out_channels,
                                       kernel_size=self.kernel_size, stride=self.stride,
                                       padding=self.padding, dilation=self.dilation, groups=self.groups, bias=True)
        self.orepa_reparam.weight.data = kernel
        self.orepa_reparam.bias.data = bias
        for para in self.parameters():
            para.detach_()
        self.__delattr__('weight_orepa_origin')
        self.__delattr__('weight_orepa_1x1')
        self.__delattr__('weight_orepa_1x1_kxk_conv2')
        if hasattr(self, 'weight_orepa_1x1_kxk_idconv1'):
            self.__delattr__('id_tensor')
            self.__delattr__('weight_orepa_1x1_kxk_idconv1')
        elif hasattr(self, 'weight_orepa_1x1_kxk_conv1'):
            self.__delattr__('weight_orepa_1x1_kxk_conv1')
        else:
            raise NotImplementedError
        self.__delattr__('weight_orepa_avg_avg')
        self.__delattr__('weight_orepa_avg_conv')
        self.__delattr__('weight_orepa_pfir_conv')
        self.__delattr__('weight_orepa_prior')
        self.__delattr__('weight_orepa_gconv_dw')
        self.__delattr__('weight_orepa_gconv_pw')
 
        self.__delattr__('bn')
        self.__delattr__('vector')
 
    def init_gamma(self, gamma_value):
        init.constant_(self.vector, gamma_value)
 
    def single_init(self):
        self.init_gamma(0.0)
        init.constant_(self.vector[0, :], 1.0)
 
 
 
class Bottleneck(nn.Module):
    # Standard bottleneck with DCN
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):  # ch_in, ch_out, shortcut, groups, kernels, expand
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
 
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = OREPA(c_, k[1], 1, groups=g)
        self.add = shortcut and c1 == c2
 
    def forward(self, x):
        return x + self.cv2(self.cv1(x)) if self.add else self.cv2(self.cv1(x))
 
 
class C2f_OREPA(nn.Module):
    # CSP Bottleneck with 2 convolutions
    def __init__(self, c1, c2, n=1, shortcut=False, g=1, e=0.5):  # ch_in, ch_out, number, shortcut, groups, expansion
        super().__init__()
        self.c = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, 2 * self.c, 1, 1)
        self.cv2 = Conv((2 + n) * self.c, c2, 1)  # optional act=FReLU(c2)
        self.m = nn.ModuleList(Bottleneck(self.c, self.c, shortcut, g, k=(3, 3), e=1.0) for _ in range(n))
 
    def forward(self, x):
        y = list(self.cv1(x).split((self.c, self.c), 1))
        y.extend(m(y[-1]) for m in self.m)
        return self.cv2(torch.cat(y, 1))
 
 
```

* * *

四、手把手教你添加OREPA模块
----------------

### 4.1 修改一

第一还是建立文件，我们找到如下ultralytics/nn/modules文件夹下建立一个目录名字呢就是'Addmodules'文件夹，然后在其内部建立一个新的py文件将核心代码复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/58a4c688b17c4e429ac35c99e42e4fb8.png)

* * *

### 4.2 修改二 

第二步我们在该目录下创建一个新的py文件名字为'\_\_init\_\_.py'，然后在其内部导入我们的检测头如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/196c97d41ad543b4a414587b24f23d3b.png)

* * *

### 4.3 修改三 

第三步我门中到如下文件'ultralytics/nn/tasks.py'进行导入和注册我们的模块。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/67b28bda87e44d3285f0241acd165256.png)

* * *

### 4.4 修改四 

按照我的添加在parse\_model里添加即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/42098d5101794e01ad1776b146ea7885.png)

**到此就修改完成了，大家可以复制下面的yaml文件运行。**

* * *

五、OREPA的yaml文件和运行记录
-------------------

### 5.1 OREPA的yaml文件一

**下面的添加**OREPA**是我实验结果的版本。**

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
  - [-1, 3, C2f_OREPA, [512]]  # 12
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [[-1, 4], 1, Concat, [1]]  # cat backbone P3
  - [-1, 3, C2f_OREPA, [256]]  # 15 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f_OREPA, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f_OREPA, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

* * *

### 5.2 OREPA的yaml文件二

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
  - [-1, 1, OREPA, [3, 2]]  # 1-P2/4
  - [-1, 3, C2f, [128, True]]
  - [-1, 1, OREPA, [3, 2]]  # 3-P3/8
  - [-1, 6, C2f, [256, True]]
  - [-1, 1, OREPA, [3, 2]]  # 5-P4/16
  - [-1, 6, C2f, [512, True]]
  - [-1, 1, OREPA, [3, 2]]  # 7-P5/32
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

### 5.3 OREPA的训练过程截图 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bc6f35a1c3ea4f03af80b2a3a2e2748f.png)

