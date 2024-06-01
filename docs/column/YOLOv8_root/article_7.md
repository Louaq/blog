 

# 改进方法

一、本文介绍
------

本篇文章的内容是在大家得到一个改进版本的C2f一个新的注意力机制、或者一个新的卷积模块、或者是检测头的时候如何替换我们YOLOv8模型中的原有的模块，从而用你的模块去进行训练模型或者检测。因为最近开了一个专栏里面涉及到挺多改进的地方，不能每篇文章都去讲解一遍如何修改，就想着在这里单独出一期文章进行一个总结性教程，大家可以从我的其它文章中拿到修改后的代码，从这篇文章学会如何去添加到你的模型结构中去。

**本文目前的改进教程包括：注意力机制、C2f(改进后的)、卷积(主干上的)、Neck、检测头、损失函数。**

二、导入修改内容
--------

大家拿到任何一个代码，想要加入到模型的内部，我们都需要先将其导入到模型的内部，才可以将其添加到模型的结构中去，下面的代码是一个ODConv，和我创建的一个ODConv\_yolo的类(**官方的代码报错进行一定的处理想知道为啥可以看我单独讲解它的博客)**， **我们先拿其进行举例。**

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.autograd
 
 
class Attention(nn.Module):
    def __init__(self, in_planes, out_planes, kernel_size, groups=1, reduction=0.0625, kernel_num=4, min_channel=16):
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
        kernel_size = kernel_size[0]
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
 
```

拿到这种代码之后，一般都很长，有一些博主推荐直接将其复制粘贴到YOLOv8的"ultralytics/nn/modules/conv.py"或者"ultralytics/nn/modules/block.py"目录下面，这种方法可不可以？答案是可以的，但是我建议大家最好新建一个文件在conv.py的同级目录下，为什么这么做，因为我们修改的模块越来越多，你往conv.py文件或则block.py文件里面加的代码越来越多很容易就把代码改崩溃了，最后就跌卸载进行重新下载包，我们通过建立文件导入其中类的形式，如果我们不用了，也不会对我们的代码做出任何影响，实在不行把新建立的文件删除了都可以，下面开始进行实际操作的讲解。

* * *

### **2.1创建新文件导入新模块**

我们将我们得到的任何一个Conv或者想要修改的任何一个模块都可以像下面的图片一样直接建立一个文件复制粘贴进去即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/ce4f8d312ef545e9a768fa6b06b69b43.png)

建立好上面的文件之后，我们此时呢有两种情况，一周呢官方的代码可以直接使用，另一种呢需要进行一定的处理，我们下面分别进行讲解两种情况。

#### 2.1.1情况一

这种情况是官方的代码可以直接使用，此时我们直接修改"ultralytics/nn/modules/\_\_init\_\_.py"文件就可以了，**修改如下->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/eebd7993421342cc9c108e9dd77d456d.png)

#### 2.1.2情况二 

**另一种情况(绝大多数)：**官方的代码不能直接使用我们本文的例子ODConv就是这种情况，所以我们需要对其进行一定的处理，**我们找到如下的文件->"ultralytics/nn/modules/conv.py"****对其进行修改如下->**  

**修改一、导入模块**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e2852f1a374a42008ea6f512e61e4b06.png)

**修改二、将额外处理代码添加至conv模块** 

**将如下代码添加至该文件中的末尾处->** 

```python
 
class ODConv2d_yolo(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size=1, stride=1, groups=1, dilation=1):
        super().__init__()
        self.conv = Conv(in_channels, out_channels, k=1)
        self.dcnv3 = ODConv2d(out_channels,out_channels, kernel_size=kernel_size, stride=stride, groups=groups,
                                   dilation=dilation)
        self.bn = nn.BatchNorm2d(out_channels)
        self.gelu = nn.GELU()
 
    def forward(self, x):
        x = self.conv(x)
 
        x = self.dcnv3(x)
 
        x = self.gelu(self.bn(x))
        return x
```

**修改三、配置头文件**

**修改如下->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9403dabab53549e584d09095d0285d35.png)

**修改四 、重复情况一的步骤**

修改"ultralytics/nn/modules/\_\_init\_\_.py"文件如下

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5da07a515e4749689bec635dce5aee81.png)

> 总结：通过建立文件这种方法导入想要加入到模型中的模块(这里举例的是ODConv2d)其已经在我们新创建的.py文件中定义好了然后直接导过来就可以用了，从而不修改原有的conv.py文件就做到了，这样就算我们随时不用了，直接删除文件然后需要改的地方也很直观，否则时间久了代码早晚跌崩溃。

* * *

**三、Conv模块**
------------

上面我们已经把定义好的卷积模块代码中了，此时我们还需要配置其位置，当然不同的模块导入的方式也有可能略有不同。

### 3.1修改一

我们找到如下的文件"ultralytics/nn/tasks.py"，**图片如下->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c6285b309a9543c293cdbda304530fb1.png)

我们先把我们在上面"ultralytics/nn/modules/\_\_init\_\_.py" 文件的函数头中导入的类，在下面的地方导入进"ultralytics/nn/tasks.py"文件中，**修改内容如下->** 

![](https://img-blog.csdnimg.cn/7b55e7634ed84ab2a3cd770b557437b2.png)

### 3.2修改二

我们在这个文件中找到一个方法(def定义的就叫方法)，因为其代码很长，我们一行一行搜索很麻烦，我们适用文件搜索功能(快捷键Ctrl + F)，**弹出快捷栏如下->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/dbed0272f4384e20bd10935d52b7e582.png)

我们搜索下面这个代码"parse\_model" 然后进行翻滚很容易就找到了下面的部分，同时进行红框内部的修改![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cc2cf56e682c4e70b77d643d5ae73339.png)

### 3.3修改三 

到此我们就已经将我们定义的三个模块添加到我们的模型中了，已经可以修改yaml文件进行网络结构的配置了，**我们找到该文件"ultralytics/cfg/models/v8/yolov8.yaml"进行配置。**

我们可以在其中的任何一个位置进行替换，当然我们的替换要符合逻辑，类似于之前这个位置是Conv那么你可以将你修改的卷积替换上，之前这个位置是C2f那么你就将修改后的C2f替换上。

我们在yaml文件中进行了如下修改。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a0650ef92bfa4ede8a0742b2c63b0864.png)

到此我们就配置完成了此时进行训练就可以开始训练了~

![](https://img-blog.csdnimg.cn/1b203dfd520c485abff413ec42c82e6f.png)

四、C2f、Bottleneck模块
------------------

下面我们拿修改后的C2f、和Bottleneck举例，这两个模块定义在该文件中"ultralytics/nn/modules/block.py"，所以如果我们想添加修改后的C2f和Bottleneck**(这俩一般配套使用)，就需要在该文件中进行修改，修改步骤如下->**

### **4.1修改一**

找到该文件"ultralytics/nn/modules/block.py"，进行如下修改->

![](https://img-blog.csdnimg.cn/ce5daec01b9145b89f69d8b693807a7b.png)

### 4.2步骤二 

添加修改后的C2f和Bottleneck模块，这里起名为C2f\_ODConv和Bottleneck\_ODConv，

```python
class Bottleneck_ODConv(nn.Module):
    """Standard bottleneck."""
 
    def __init__(self, c1, c2, shortcut=True, g=1, k=(3, 3), e=0.5):
        """Initializes a bottleneck module with given input/output channels, shortcut option, group, kernels, and
        expansion.
        """
        super().__init__()
        c_ = int(c2 * e)  # hidden channels
        self.cv1 = Conv(c1, c_, k[0], 1)
        self.cv2 = ODConv2d_yolo(c_, c2, k[1], 1, groups=g)
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



将以上代码复制到文件"ultralytics/nn/modules/block.py"的末尾， 

### 4.3修改三

修改头文件如下->

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/137b6bb3442e4176a8d737c6e977df32.png)

### 4.4修改四

找到文件"ultralytics/nn/modules/\_\_init\_\_.py"，修改如下->

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cd33a227588f4579a03f7f4090a296c4.png)

### 4.5修改五

找到该文件我们找到如下的文件"ultralytics/nn/tasks.py"进行修改**(其实和卷积模块的一模一样)，**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/44360406bdca4f4680b90965aeacb719.png)

### 4.6修改六

我们在这个文件中找到一个方法(def定义的就叫方法)，因为其代码很长，我们一行一行搜索很麻烦，我们适用文件搜索功能(快捷键Ctrl + F)，**弹出快捷栏如下->**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/dbed0272f4384e20bd10935d52b7e582.png)

我们搜索下面这个代码"parse\_model" 然后进行翻滚很容易就找到了下面的部分，同时进行红框内部的修改

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0151bad9da5b4bd4bc30afb661d3ab10.png)

### 4.7修改七

到此我们就已经将我们定义的三个模块添加到我们的模型中了，已经可以修改yaml文件进行网络结构的配置了，**我们找到该文件"ultralytics/cfg/models/v8/yolov8.yaml"进行配置。**

我们可以在其中的任何一个位置进行替换，当然我们的替换要符合逻辑，类似于之前这个位置是Conv那么你可以将你修改的卷积替换上，之前这个位置是C2f那么你就将修改后的C2f替换上。

**在yaml文件中进行了如下修改。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/ba32db68de6f4dd5afd652ad24232e5b.png)

到此就完成了修改C2f和Bottleneck模块了，已经可以开始进行训练了~

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/69793fb0635c40ef8ab41f0a5e772b54.png)

> 至于修改这个ODConv的 效果如何可以看我的其它博客里面有详细的讲解~

* * *

五、注意力机制(上采样修改方法同此处有参数注意力机制)
---------------------------

修改注意力机制的部分其实和上面都是类似只是在修改如下文件的时候有点不一样"ultralytics/nn/tasks.py"，但是需要注意的是**注意力机制分为两种，**一种是有参数的注意力机制我们需要像其中传入参数，一种是无参数的注意力机制这两种机制的添加呢稍微有一些不同，**我会在下面进行标注大家仔细看**

### 5.1修改一 

这里我们拿Biformer注意力机制为例(我们拿有参数的注意力机制为例)，首先我们找到该目录'ultralytics/nn/modules'该目录的构造如下->

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a03d6ec7b75a477fa76c753bdfcce0b0.png)

我们在其中创建一个名字为Biformer的py文件如图所示，我们在其中复制如下代码即可

```python
"""
Bi-Level Routing Attention.
"""
from typing import Tuple, Optional
import torch
import torch.nn as nn
import torch.nn.functional as F
from einops import rearrange
from torch import Tensor, LongTensor
 
class TopkRouting(nn.Module):
    """
    differentiable topk routing with scaling
    Args:
        qk_dim: int, feature dimension of query and key
        topk: int, the 'topk'
        qk_scale: int or None, temperature (multiply) of softmax activation
        with_param: bool, wether inorporate learnable params in routing unit
        diff_routing: bool, wether make routing differentiable
        soft_routing: bool, wether make output value multiplied by routing weights
    """
 
    def __init__(self, qk_dim, topk=4, qk_scale=None, param_routing=False, diff_routing=False):
        super().__init__()
        self.topk = topk
        self.qk_dim = qk_dim
        self.scale = qk_scale or qk_dim ** -0.5
        self.diff_routing = diff_routing
        # TODO: norm layer before/after linear?
        self.emb = nn.Linear(qk_dim, qk_dim) if param_routing else nn.Identity()
        # routing activation
        self.routing_act = nn.Softmax(dim=-1)
 
    def forward(self, query: Tensor, key: Tensor) -> Tuple[Tensor]:
        """
        Args:
            q, k: (n, p^2, c) tensor
        Return:
            r_weight, topk_index: (n, p^2, topk) tensor
        """
        if not self.diff_routing:
            query, key = query.detach(), key.detach()
        query_hat, key_hat = self.emb(query), self.emb(key)  # per-window pooling -> (n, p^2, c)
        attn_logit = (query_hat * self.scale) @ key_hat.transpose(-2, -1)  # (n, p^2, p^2)
        topk_attn_logit, topk_index = torch.topk(attn_logit, k=self.topk, dim=-1)  # (n, p^2, k), (n, p^2, k)
        r_weight = self.routing_act(topk_attn_logit)  # (n, p^2, k)
 
        return r_weight, topk_index
 
 
class KVGather(nn.Module):
    def __init__(self, mul_weight='none'):
        super().__init__()
        assert mul_weight in ['none', 'soft', 'hard']
        self.mul_weight = mul_weight
 
    def forward(self, r_idx: Tensor, r_weight: Tensor, kv: Tensor):
        """
        r_idx: (n, p^2, topk) tensor
        r_weight: (n, p^2, topk) tensor
        kv: (n, p^2, w^2, c_kq+c_v)
        Return:
            (n, p^2, topk, w^2, c_kq+c_v) tensor
        """
        # select kv according to routing index
        n, p2, w2, c_kv = kv.size()
        topk = r_idx.size(-1)
        # print(r_idx.size(), r_weight.size())
        # FIXME: gather consumes much memory (topk times redundancy), write cuda kernel?
        topk_kv = torch.gather(kv.view(n, 1, p2, w2, c_kv).expand(-1, p2, -1, -1, -1),
                               # (n, p^2, p^2, w^2, c_kv) without mem cpy
                               dim=2,
                               index=r_idx.view(n, p2, topk, 1, 1).expand(-1, -1, -1, w2, c_kv)
                               # (n, p^2, k, w^2, c_kv)
                               )
 
        if self.mul_weight == 'soft':
            topk_kv = r_weight.view(n, p2, topk, 1, 1) * topk_kv  # (n, p^2, k, w^2, c_kv)
        elif self.mul_weight == 'hard':
            raise NotImplementedError('differentiable hard routing TBA')
        # else: #'none'
        #     topk_kv = topk_kv # do nothing
 
        return topk_kv
 
 
class QKVLinear(nn.Module):
    def __init__(self, dim, qk_dim, bias=True):
        super().__init__()
        self.dim = dim
        self.qk_dim = qk_dim
        self.qkv = nn.Linear(dim, qk_dim + qk_dim + dim, bias=bias)
 
    def forward(self, x):
        q, kv = self.qkv(x).split([self.qk_dim, self.qk_dim + self.dim], dim=-1)
        return q, kv
        # q, k, v = self.qkv(x).split([self.qk_dim, self.qk_dim, self.dim], dim=-1)
        # return q, k, v
 
 
class BiLevelRoutingAttention(nn.Module):
    """
    n_win: number of windows in one side (so the actual number of windows is n_win*n_win)
    kv_per_win: for kv_downsample_mode='ada_xxxpool' only, number of key/values per window. Similar to n_win, the actual number is kv_per_win*kv_per_win.
    topk: topk for window filtering
    param_attention: 'qkvo'-linear for q,k,v and o, 'none': param free attention
    param_routing: extra linear for routing
    diff_routing: wether to set routing differentiable
    soft_routing: wether to multiply soft routing weights
    """
 
    def __init__(self, dim, n_win=7, num_heads=8, qk_dim=None, qk_scale=None,
                 kv_per_win=4, kv_downsample_ratio=4, kv_downsample_kernel=None, kv_downsample_mode='identity',
                 topk=4, param_attention="qkvo", param_routing=False, diff_routing=False, soft_routing=False,
                 side_dwconv=3,
                 auto_pad=True):
        super().__init__()
        # local attention setting
        self.dim = dim
        self.n_win = n_win  # Wh, Ww
        self.num_heads = num_heads
        self.qk_dim = qk_dim or dim
        assert self.qk_dim % num_heads == 0 and self.dim % num_heads == 0, 'qk_dim and dim must be divisible by num_heads!'
        self.scale = qk_scale or self.qk_dim ** -0.5
 
        ################side_dwconv (i.e. LCE in ShuntedTransformer)###########
        self.lepe = nn.Conv2d(dim, dim, kernel_size=side_dwconv, stride=1, padding=side_dwconv // 2,
                              groups=dim) if side_dwconv > 0 else \
            lambda x: torch.zeros_like(x)
 
        ################ global routing setting #################
        self.topk = topk
        self.param_routing = param_routing
        self.diff_routing = diff_routing
        self.soft_routing = soft_routing
        # router
        assert not (self.param_routing and not self.diff_routing)  # cannot be with_param=True and diff_routing=False
        self.router = TopkRouting(qk_dim=self.qk_dim,
                                  qk_scale=self.scale,
                                  topk=self.topk,
                                  diff_routing=self.diff_routing,
                                  param_routing=self.param_routing)
        if self.soft_routing:  # soft routing, always diffrentiable (if no detach)
            mul_weight = 'soft'
        elif self.diff_routing:  # hard differentiable routing
            mul_weight = 'hard'
        else:  # hard non-differentiable routing
            mul_weight = 'none'
        self.kv_gather = KVGather(mul_weight=mul_weight)
 
        # qkv mapping (shared by both global routing and local attention)
        self.param_attention = param_attention
        if self.param_attention == 'qkvo':
            self.qkv = QKVLinear(self.dim, self.qk_dim)
            self.wo = nn.Linear(dim, dim)
        elif self.param_attention == 'qkv':
            self.qkv = QKVLinear(self.dim, self.qk_dim)
            self.wo = nn.Identity()
        else:
            raise ValueError(f'param_attention mode {self.param_attention} is not surpported!')
 
        self.kv_downsample_mode = kv_downsample_mode
        self.kv_per_win = kv_per_win
        self.kv_downsample_ratio = kv_downsample_ratio
        self.kv_downsample_kenel = kv_downsample_kernel
        if self.kv_downsample_mode == 'ada_avgpool':
            assert self.kv_per_win is not None
            self.kv_down = nn.AdaptiveAvgPool2d(self.kv_per_win)
        elif self.kv_downsample_mode == 'ada_maxpool':
            assert self.kv_per_win is not None
            self.kv_down = nn.AdaptiveMaxPool2d(self.kv_per_win)
        elif self.kv_downsample_mode == 'maxpool':
            assert self.kv_downsample_ratio is not None
            self.kv_down = nn.MaxPool2d(self.kv_downsample_ratio) if self.kv_downsample_ratio > 1 else nn.Identity()
        elif self.kv_downsample_mode == 'avgpool':
            assert self.kv_downsample_ratio is not None
            self.kv_down = nn.AvgPool2d(self.kv_downsample_ratio) if self.kv_downsample_ratio > 1 else nn.Identity()
        elif self.kv_downsample_mode == 'identity':  # no kv downsampling
            self.kv_down = nn.Identity()
        elif self.kv_downsample_mode == 'fracpool':
            # assert self.kv_downsample_ratio is not None
            # assert self.kv_downsample_kenel is not None
            # TODO: fracpool
            # 1. kernel size should be input size dependent
            # 2. there is a random factor, need to avoid independent sampling for k and v
            raise NotImplementedError('fracpool policy is not implemented yet!')
        elif kv_downsample_mode == 'conv':
            # TODO: need to consider the case where k != v so that need two downsample modules
            raise NotImplementedError('conv policy is not implemented yet!')
        else:
            raise ValueError(f'kv_down_sample_mode {self.kv_downsaple_mode} is not surpported!')
 
        # softmax for local attention
        self.attn_act = nn.Softmax(dim=-1)
 
        self.auto_pad = auto_pad
 
    def forward(self, x, ret_attn_mask=False):
        """
        x: NHWC tensor
        Return:
            NHWC tensor
        """
        x = rearrange(x, "n c h w -> n h w c")
        # NOTE: use padding for semantic segmentation
        ###################################################
        if self.auto_pad:
            N, H_in, W_in, C = x.size()
 
            pad_l = pad_t = 0
            pad_r = (self.n_win - W_in % self.n_win) % self.n_win
            pad_b = (self.n_win - H_in % self.n_win) % self.n_win
            x = F.pad(x, (0, 0,  # dim=-1
                          pad_l, pad_r,  # dim=-2
                          pad_t, pad_b))  # dim=-3
            _, H, W, _ = x.size()  # padded size
        else:
            N, H, W, C = x.size()
            assert H % self.n_win == 0 and W % self.n_win == 0  #
        ###################################################
 
        # patchify, (n, p^2, w, w, c), keep 2d window as we need 2d pooling to reduce kv size
        x = rearrange(x, "n (j h) (i w) c -> n (j i) h w c", j=self.n_win, i=self.n_win)
 
        #################qkv projection###################
        # q: (n, p^2, w, w, c_qk)
        # kv: (n, p^2, w, w, c_qk+c_v)
        # NOTE: separte kv if there were memory leak issue caused by gather
        q, kv = self.qkv(x)
 
        # pixel-wise qkv
        # q_pix: (n, p^2, w^2, c_qk)
        # kv_pix: (n, p^2, h_kv*w_kv, c_qk+c_v)
        q_pix = rearrange(q, 'n p2 h w c -> n p2 (h w) c')
        kv_pix = self.kv_down(rearrange(kv, 'n p2 h w c -> (n p2) c h w'))
        kv_pix = rearrange(kv_pix, '(n j i) c h w -> n (j i) (h w) c', j=self.n_win, i=self.n_win)
 
        q_win, k_win = q.mean([2, 3]), kv[..., 0:self.qk_dim].mean(
            [2, 3])  # window-wise qk, (n, p^2, c_qk), (n, p^2, c_qk)
 
        ##################side_dwconv(lepe)##################
        # NOTE: call contiguous to avoid gradient warning when using ddp
        lepe = self.lepe(rearrange(kv[..., self.qk_dim:], 'n (j i) h w c -> n c (j h) (i w)', j=self.n_win,
                                   i=self.n_win).contiguous())
        lepe = rearrange(lepe, 'n c (j h) (i w) -> n (j h) (i w) c', j=self.n_win, i=self.n_win)
 
        ############ gather q dependent k/v #################
 
        r_weight, r_idx = self.router(q_win, k_win)  # both are (n, p^2, topk) tensors
 
        kv_pix_sel = self.kv_gather(r_idx=r_idx, r_weight=r_weight, kv=kv_pix)  # (n, p^2, topk, h_kv*w_kv, c_qk+c_v)
        k_pix_sel, v_pix_sel = kv_pix_sel.split([self.qk_dim, self.dim], dim=-1)
        # kv_pix_sel: (n, p^2, topk, h_kv*w_kv, c_qk)
        # v_pix_sel: (n, p^2, topk, h_kv*w_kv, c_v)
 
        ######### do attention as normal ####################
        k_pix_sel = rearrange(k_pix_sel, 'n p2 k w2 (m c) -> (n p2) m c (k w2)',
                              m=self.num_heads)  # flatten to BMLC, (n*p^2, m, topk*h_kv*w_kv, c_kq//m) transpose here?
        v_pix_sel = rearrange(v_pix_sel, 'n p2 k w2 (m c) -> (n p2) m (k w2) c',
                              m=self.num_heads)  # flatten to BMLC, (n*p^2, m, topk*h_kv*w_kv, c_v//m)
        q_pix = rearrange(q_pix, 'n p2 w2 (m c) -> (n p2) m w2 c',
                          m=self.num_heads)  # to BMLC tensor (n*p^2, m, w^2, c_qk//m)
 
        # param-free multihead attention
        attn_weight = (
                                  q_pix * self.scale) @ k_pix_sel  # (n*p^2, m, w^2, c) @ (n*p^2, m, c, topk*h_kv*w_kv) -> (n*p^2, m, w^2, topk*h_kv*w_kv)
        attn_weight = self.attn_act(attn_weight)
        out = attn_weight @ v_pix_sel  # (n*p^2, m, w^2, topk*h_kv*w_kv) @ (n*p^2, m, topk*h_kv*w_kv, c) -> (n*p^2, m, w^2, c)
        out = rearrange(out, '(n j i) m (h w) c -> n (j h) (i w) (m c)', j=self.n_win, i=self.n_win,
                        h=H // self.n_win, w=W // self.n_win)
 
        out = out + lepe
        # output linear
        out = self.wo(out)
 
        # NOTE: use padding for semantic segmentation
        # crop padded region
        if self.auto_pad and (pad_r > 0 or pad_b > 0):
            out = out[:, :H_in, :W_in, :].contiguous()
 
        if ret_attn_mask:
            return out, r_weight, r_idx, attn_weight
        else:
            return rearrange(out, "n h w c -> n c h w")
```





### 5.2修改二

我们找到该文件'ultralytics/nn/tasks.py'在其中添加如下一行代码

```python
from ultralytics.nn.modules.Biformer import BiLevelRoutingAttention as Biformer
```

添加完之后的效果如下图->

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a316b651b57644c1af46020f5c4b37db.png)

### 5.3修改三

**这里需要注意体现出两种注意力机制的修改方式~**

#### 5.2.1有参数的注意力机制修改

现在我们已经将Biformer文件导入了模型中了，下一步我们就需要添加该机制到模型中让我们可以使用它，我们在步骤二的文件中''ultralytics/nn/tasks.py''按快捷键Ctrl+F可以进行文件搜索。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9830d7746d6644a2a0371b21b62a3d73.png)

当然如果你不想用快捷键也可以自己寻找大概在 650行左右，有一个方法的名字叫"parse\_model"

我们找到该方法对其进行修改，添加如下图所示内容。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5205e02daf914fcf8bf92cc79af7d654.png)

这里我们定义了一个字典，我们以后在想导入其它的注意力机制就可以重复步骤一和步骤二，然后在步骤三这里定义的字典中添加你导入的注意力机制名字即可。 

#### 5.2.2无参数的注意力机制修改

无参数的注意力机制直接修改完步骤二就可以，直接跳过本步骤的修改直接进行配置注意力机制即可，无参数的注意力机制的修改三不用进行任何修改~

### 5.4配置注意力机制

恭喜你，到这里我们就已经成功的导入了注意力机制，离修改模型只差最后一步，我们需要找到如下文件进行修改"ultralytics/cfg/models/v8/yolov8.yaml",找到这个文件之后初始如下所示，

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f8eb256281234a99b6384b35c0fb452b.png)

我们可以在某一层中添加Biformer注意力机制，具体添加到哪里由你自己决定，我这里建议添加到  [Neck](https://so.csdn.net/so/search?q=Neck&spm=1001.2101.3001.7020)层，也就是我们的特征融合层，添加之后的效果如下，这里我在三个地方添加了Biformer注意力机制。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/758406743b2e4a09a1ea90b016933e69.png)

**OK到此我们就添加了注意力机制到我们的模型里面了，下面我来讲一下添加的注意力机制中的参数是如何来的，**

*   首先-1这里我们不用管， 它代表上一个层的输入输入-1就是让模型自动帮我们算输入的大小！
*   数字1代表这里我们的Biformer注意力机制执行一次
*   Biformer代表我们的注意力机制名字，本来类的名字不是这个我在前面导入的时候给他另命名了前面有讲到
*   \[7，8\]这里是根据Biformer定义的时候来的，你只需要输入前两个即可**(需要注意的是无参数的注意力机制这里什么都不用填写可以看看你的无参数注意力机制需要什么那种超参数你给予赋值即可，不用从模型中获取任何的其它参数)。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3904a1bfffa541b4a48ac49b3af96fb6.png)

当然这两个参数你可以换，调成其它的试试效果。



* * *

六、检测头
-----

对于检测头部分的更新，比其它的部分都要复杂一点，需要修改的地方也比较多，所以希望大家仔细看好每一步，如果有报错也可以在评论区提问，我的修改教程在其它的文章里都有运行截图和结果对比，是肯定能够完美运行的。

这里举例的代码是我对于2023年新提出的AFPN进行了修改然后适配YOLOv8的整体结构提出的检测头，本来该结构是四个检测头部分，但是我去除掉了一个适配yolov8，当然在我单独AFPN的文章里会用到四头的（增加辅助训练头，针对小目标检测）讲解，但这里是添加类教程需要具有通用性所以给大家介绍的是正常三个检测头的。

```python
import math
from collections import OrderedDict
import torch
import torch.nn as nn
import torch.nn.functional as F
from ultralytics.nn.modules import DFL
from ultralytics.nn.modules.conv import Conv
from ultralytics.utils.tal import dist2bbox, make_anchors
 
__all__ =['Detect_AFPN']
 
def BasicConv(filter_in, filter_out, kernel_size, stride=1, pad=None):
    if not pad:
        pad = (kernel_size - 1) // 2 if kernel_size else 0
    else:
        pad = pad
    return nn.Sequential(OrderedDict([
        ("conv", nn.Conv2d(filter_in, filter_out, kernel_size=kernel_size, stride=stride, padding=pad, bias=False)),
        ("bn", nn.BatchNorm2d(filter_out)),
        ("relu", nn.ReLU(inplace=True)),
    ]))
 
 
class BasicBlock(nn.Module):
    expansion = 1
 
    def __init__(self, filter_in, filter_out):
        super(BasicBlock, self).__init__()
        self.conv1 = nn.Conv2d(filter_in, filter_out, 3, padding=1)
        self.bn1 = nn.BatchNorm2d(filter_out, momentum=0.1)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(filter_out, filter_out, 3, padding=1)
        self.bn2 = nn.BatchNorm2d(filter_out, momentum=0.1)
 
    def forward(self, x):
        residual = x
 
        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)
 
        out = self.conv2(out)
        out = self.bn2(out)
 
        out += residual
        out = self.relu(out)
 
        return out
 
 
class Upsample(nn.Module):
    def __init__(self, in_channels, out_channels, scale_factor=2):
        super(Upsample, self).__init__()
 
        self.upsample = nn.Sequential(
            BasicConv(in_channels, out_channels, 1),
            nn.Upsample(scale_factor=scale_factor, mode='bilinear')
        )
 
 
    def forward(self, x):
        x = self.upsample(x)
 
        return x
 
 
class Downsample_x2(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(Downsample_x2, self).__init__()
 
        self.downsample = nn.Sequential(
            BasicConv(in_channels, out_channels, 2, 2, 0)
        )
 
    def forward(self, x, ):
        x = self.downsample(x)
 
        return x
 
 
class Downsample_x4(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(Downsample_x4, self).__init__()
 
        self.downsample = nn.Sequential(
            BasicConv(in_channels, out_channels, 4, 4, 0)
        )
 
    def forward(self, x, ):
        x = self.downsample(x)
 
        return x
 
 
class Downsample_x8(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(Downsample_x8, self).__init__()
 
        self.downsample = nn.Sequential(
            BasicConv(in_channels, out_channels, 8, 8, 0)
        )
 
    def forward(self, x, ):
        x = self.downsample(x)
 
        return x
 
 
class ASFF_2(nn.Module):
    def __init__(self, inter_dim=512):
        super(ASFF_2, self).__init__()
 
        self.inter_dim = inter_dim
        compress_c = 8
 
        self.weight_level_1 = BasicConv(self.inter_dim, compress_c, 1, 1)
        self.weight_level_2 = BasicConv(self.inter_dim, compress_c, 1, 1)
 
        self.weight_levels = nn.Conv2d(compress_c * 2, 2, kernel_size=1, stride=1, padding=0)
 
        self.conv = BasicConv(self.inter_dim, self.inter_dim, 3, 1)
 
    def forward(self, input1, input2):
        level_1_weight_v = self.weight_level_1(input1)
        level_2_weight_v = self.weight_level_2(input2)
 
        levels_weight_v = torch.cat((level_1_weight_v, level_2_weight_v), 1)
        levels_weight = self.weight_levels(levels_weight_v)
        levels_weight = F.softmax(levels_weight, dim=1)
 
        fused_out_reduced = input1 * levels_weight[:, 0:1, :, :] + \
                            input2 * levels_weight[:, 1:2, :, :]
 
        out = self.conv(fused_out_reduced)
 
        return out
 
 
class ASFF_3(nn.Module):
    def __init__(self, inter_dim=512):
        super(ASFF_3, self).__init__()
 
        self.inter_dim = inter_dim
        compress_c = 8
 
        self.weight_level_1 = BasicConv(self.inter_dim, compress_c, 1, 1)
        self.weight_level_2 = BasicConv(self.inter_dim, compress_c, 1, 1)
        self.weight_level_3 = BasicConv(self.inter_dim, compress_c, 1, 1)
 
        self.weight_levels = nn.Conv2d(compress_c * 3, 3, kernel_size=1, stride=1, padding=0)
 
        self.conv = BasicConv(self.inter_dim, self.inter_dim, 3, 1)
 
    def forward(self, input1, input2, input3):
        level_1_weight_v = self.weight_level_1(input1)
        level_2_weight_v = self.weight_level_2(input2)
        level_3_weight_v = self.weight_level_3(input3)
 
        levels_weight_v = torch.cat((level_1_weight_v, level_2_weight_v, level_3_weight_v), 1)
        levels_weight = self.weight_levels(levels_weight_v)
        levels_weight = F.softmax(levels_weight, dim=1)
 
        fused_out_reduced = input1 * levels_weight[:, 0:1, :, :] + \
                            input2 * levels_weight[:, 1:2, :, :] + \
                            input3 * levels_weight[:, 2:, :, :]
 
        out = self.conv(fused_out_reduced)
 
        return out
 
 
class ASFF_4(nn.Module):
    def __init__(self, inter_dim=512):
        super(ASFF_4, self).__init__()
 
        self.inter_dim = inter_dim
        compress_c = 8
 
        self.weight_level_0 = BasicConv(self.inter_dim, compress_c, 1, 1)
        self.weight_level_1 = BasicConv(self.inter_dim, compress_c, 1, 1)
        self.weight_level_2 = BasicConv(self.inter_dim, compress_c, 1, 1)
 
        self.weight_levels = nn.Conv2d(compress_c * 3, 3, kernel_size=1, stride=1, padding=0)
 
        self.conv = BasicConv(self.inter_dim, self.inter_dim, 3, 1)
 
    def forward(self, input0, input1, input2):
        level_0_weight_v = self.weight_level_0(input0)
        level_1_weight_v = self.weight_level_1(input1)
        level_2_weight_v = self.weight_level_2(input2)
 
 
        levels_weight_v = torch.cat((level_0_weight_v, level_1_weight_v, level_2_weight_v), 1)
        levels_weight = self.weight_levels(levels_weight_v)
        levels_weight = F.softmax(levels_weight, dim=1)
 
        fused_out_reduced = input0 * levels_weight[:, 0:1, :, :] + \
                            input1 * levels_weight[:, 1:2, :, :] + \
                            input2 * levels_weight[:, 2:3, :, :]
 
 
        out = self.conv(fused_out_reduced)
 
        return out
 
 
class BlockBody(nn.Module):
    def __init__(self, channels=[64, 128, 256, 512]):
        super(BlockBody, self).__init__()
 
        self.blocks_scalezero1 = nn.Sequential(
            BasicConv(channels[0], channels[0], 1),
        )
        self.blocks_scaleone1 = nn.Sequential(
            BasicConv(channels[1], channels[1], 1),
        )
        self.blocks_scaletwo1 = nn.Sequential(
            BasicConv(channels[2], channels[2], 1),
        )
 
 
        self.downsample_scalezero1_2 = Downsample_x2(channels[0], channels[1])
        self.upsample_scaleone1_2 = Upsample(channels[1], channels[0], scale_factor=2)
 
        self.asff_scalezero1 = ASFF_2(inter_dim=channels[0])
        self.asff_scaleone1 = ASFF_2(inter_dim=channels[1])
 
        self.blocks_scalezero2 = nn.Sequential(
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
        )
        self.blocks_scaleone2 = nn.Sequential(
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
        )
 
        self.downsample_scalezero2_2 = Downsample_x2(channels[0], channels[1])
        self.downsample_scalezero2_4 = Downsample_x4(channels[0], channels[2])
        self.downsample_scaleone2_2 = Downsample_x2(channels[1], channels[2])
        self.upsample_scaleone2_2 = Upsample(channels[1], channels[0], scale_factor=2)
        self.upsample_scaletwo2_2 = Upsample(channels[2], channels[1], scale_factor=2)
        self.upsample_scaletwo2_4 = Upsample(channels[2], channels[0], scale_factor=4)
 
        self.asff_scalezero2 = ASFF_3(inter_dim=channels[0])
        self.asff_scaleone2 = ASFF_3(inter_dim=channels[1])
        self.asff_scaletwo2 = ASFF_3(inter_dim=channels[2])
 
        self.blocks_scalezero3 = nn.Sequential(
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
        )
        self.blocks_scaleone3 = nn.Sequential(
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
        )
        self.blocks_scaletwo3 = nn.Sequential(
            BasicBlock(channels[2], channels[2]),
            BasicBlock(channels[2], channels[2]),
            BasicBlock(channels[2], channels[2]),
            BasicBlock(channels[2], channels[2]),
        )
 
        self.downsample_scalezero3_2 = Downsample_x2(channels[0], channels[1])
        self.downsample_scalezero3_4 = Downsample_x4(channels[0], channels[2])
        self.upsample_scaleone3_2 = Upsample(channels[1], channels[0], scale_factor=2)
        self.downsample_scaleone3_2 = Downsample_x2(channels[1], channels[2])
        self.upsample_scaletwo3_4 = Upsample(channels[2], channels[0], scale_factor=4)
        self.upsample_scaletwo3_2 = Upsample(channels[2], channels[1], scale_factor=2)
 
        self.asff_scalezero3 = ASFF_4(inter_dim=channels[0])
        self.asff_scaleone3 = ASFF_4(inter_dim=channels[1])
        self.asff_scaletwo3 = ASFF_4(inter_dim=channels[2])
 
        self.blocks_scalezero4 = nn.Sequential(
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
            BasicBlock(channels[0], channels[0]),
        )
        self.blocks_scaleone4 = nn.Sequential(
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
            BasicBlock(channels[1], channels[1]),
        )
        self.blocks_scaletwo4 = nn.Sequential(
            BasicBlock(channels[2], channels[2]),
            BasicBlock(channels[2], channels[2]),
            BasicBlock(channels[2], channels[2]),
            BasicBlock(channels[2], channels[2]),
        )
 
 
    def forward(self, x):
        x0, x1, x2 = x
 
        x0 = self.blocks_scalezero1(x0)
        x1 = self.blocks_scaleone1(x1)
        x2 = self.blocks_scaletwo1(x2)
 
 
        scalezero = self.asff_scalezero1(x0, self.upsample_scaleone1_2(x1))
        scaleone = self.asff_scaleone1(self.downsample_scalezero1_2(x0), x1)
 
        x0 = self.blocks_scalezero2(scalezero)
        x1 = self.blocks_scaleone2(scaleone)
 
        scalezero = self.asff_scalezero2(x0, self.upsample_scaleone2_2(x1), self.upsample_scaletwo2_4(x2))
        scaleone = self.asff_scaleone2(self.downsample_scalezero2_2(x0), x1, self.upsample_scaletwo2_2(x2))
        scaletwo = self.asff_scaletwo2(self.downsample_scalezero2_4(x0), self.downsample_scaleone2_2(x1), x2)
 
        x0 = self.blocks_scalezero3(scalezero)
        x1 = self.blocks_scaleone3(scaleone)
        x2 = self.blocks_scaletwo3(scaletwo)
 
        scalezero = self.asff_scalezero3(x0, self.upsample_scaleone3_2(x1), self.upsample_scaletwo3_4(x2))
        scaleone = self.asff_scaleone3(self.downsample_scalezero3_2(x0), x1, self.upsample_scaletwo3_2(x2))
        scaletwo = self.asff_scaletwo3(self.downsample_scalezero3_4(x0), self.downsample_scaleone3_2(x1), x2)
 
 
        scalezero = self.blocks_scalezero4(scalezero)
        scaleone = self.blocks_scaleone4(scaleone)
        scaletwo = self.blocks_scaletwo4(scaletwo)
 
 
        return scalezero, scaleone, scaletwo
 
class AFPN(nn.Module):
    def __init__(self,
                 in_channels=[256, 512, 1024, 2048],
                 out_channels=128):
        super(AFPN, self).__init__()
 
        self.fp16_enabled = False
 
        self.conv0 = BasicConv(in_channels[0], in_channels[0] // 8, 1)
        self.conv1 = BasicConv(in_channels[1], in_channels[1] // 8, 1)
        self.conv2 = BasicConv(in_channels[2], in_channels[2] // 8, 1)
        # self.conv3 = BasicConv(in_channels[3], in_channels[3] // 8, 1)
 
        self.body = nn.Sequential(
            BlockBody([in_channels[0] // 8, in_channels[1] // 8, in_channels[2] // 8])
        )
 
        self.conv00 = BasicConv(in_channels[0] // 8, out_channels, 1)
        self.conv11 = BasicConv(in_channels[1] // 8, out_channels, 1)
        self.conv22 = BasicConv(in_channels[2] // 8, out_channels, 1)
        # self.conv33 = BasicConv(in_channels[3] // 8, out_channels, 1)
 
        # init weight
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.xavier_normal_(m.weight, gain=0.02)
            elif isinstance(m, nn.BatchNorm2d):
                torch.nn.init.normal_(m.weight.data, 1.0, 0.02)
                torch.nn.init.constant_(m.bias.data, 0.0)
 
    def forward(self, x):
        x0, x1, x2 = x
 
        x0 = self.conv0(x0)
        x1 = self.conv1(x1)
        x2 = self.conv2(x2)
        # x3 = self.conv3(x3)
 
        out0, out1, out2 = self.body([x0, x1, x2])
 
        out0 = self.conv00(out0)
        out1 = self.conv11(out1)
        out2 = self.conv22(out2)
 
 
        return out0, out1, out2
 
 
class Detect_AFPN(nn.Module):
    """YOLOv8 Detect head for detection models."""
    dynamic = False  # force grid reconstruction
    export = False  # export mode
    shape = None
    anchors = torch.empty(0)  # init
    strides = torch.empty(0)  # init
 
    def __init__(self, nc=80, channel=128,  ch=()):
        """Initializes the YOLOv8 detection layer with specified number of classes and channels."""
        super().__init__()
        self.nc = nc  # number of classes
        self.nl = len(ch)  # number of detection layers
        self.reg_max = 16  # DFL channels (ch[0] // 16 to scale 4/8/12/16/20 for n/s/m/l/x)
        self.no = nc + self.reg_max * 4  # number of outputs per anchor
        self.stride = torch.zeros(self.nl)  # strides computed during build
        c2, c3 = max((16, ch[0] // 4, self.reg_max * 4)), max(ch[0], min(self.nc, 100))  # channels
        self.cv2 = nn.ModuleList(
            nn.Sequential(Conv(channel, c2, 3), Conv(c2, c2, 3), nn.Conv2d(c2, 4 * self.reg_max, 1)) for x in ch)
        self.cv3 = nn.ModuleList(nn.Sequential(Conv(channel, c3, 3), Conv(c3, c3, 3), nn.Conv2d(c3, self.nc, 1)) for x in ch)
        self.dfl = DFL(self.reg_max) if self.reg_max > 1 else nn.Identity()
        self.AFPN = AFPN(ch, channel)
 
    def forward(self, x):
        """Concatenates and returns predicted bounding boxes and class probabilities."""
        x = list(self.AFPN(x))
        shape = x[0].shape  # BCHW
        for i in range(self.nl):
            x[i] = torch.cat((self.cv2[i](x[i]), self.cv3[i](x[i])), 1)
        if self.training:
            return x
        elif self.dynamic or self.shape != shape:
            self.anchors, self.strides = (x.transpose(0, 1) for x in make_anchors(x, self.stride, 0.5))
            self.shape = shape
 
        x_cat = torch.cat([xi.view(shape[0], self.no, -1) for xi in x], 2)
        if self.export and self.format in ('saved_model', 'pb', 'tflite', 'edgetpu', 'tfjs'):  # avoid TF FlexSplitV ops
            box = x_cat[:, :self.reg_max * 4]
            cls = x_cat[:, self.reg_max * 4:]
        else:
            box, cls = x_cat.split((self.reg_max * 4, self.nc), 1)
        dbox = dist2bbox(self.dfl(box), self.anchors.unsqueeze(0), xywh=True, dim=1) * self.strides
 
        if self.export and self.format in ('tflite', 'edgetpu'):
            # Normalize xywh with image size to mitigate quantization error of TFLite integer models as done in YOLOv5:
            # https://github.com/ultralytics/yolov5/blob/0c8de3fca4a702f8ff5c435e67f378d1fce70243/models/tf.py#L307-L309
            # See this PR for details: https://github.com/ultralytics/ultralytics/pull/1695
            img_h = shape[2] * self.stride[0]
            img_w = shape[3] * self.stride[0]
            img_size = torch.tensor([img_w, img_h, img_w, img_h], device=dbox.device).reshape(1, 4, 1)
            dbox /= img_size
 
        y = torch.cat((dbox, cls.sigmoid()), 1)
        return y if self.export else (y, x)
 
    def bias_init(self):
        """Initialize Detect() biases, WARNING: requires stride availability."""
        m = self  # self.model[-1]  # Detect() module
        # cf = torch.bincount(torch.tensor(np.concatenate(dataset.labels, 0)[:, 0]).long(), minlength=nc) + 1
        # ncf = math.log(0.6 / (m.nc - 0.999999)) if cf is None else torch.log(cf / cf.sum())  # nominal class frequency
        for a, b, s in zip(m.cv2, m.cv3, m.stride):  # from
            a[-1].bias.data[:] = 1.0  # box
            b[-1].bias.data[:m.nc] = math.log(5 / m.nc / (640 / s) ** 2)  # cls (.01 objects, 80 classes, 640 img)
```

### 7.1 修改一

首先我们将上面的代码复制粘贴到'ultralytics/nn/modules' 目录下新建一个py文件复制粘贴进去，具体名字自己来定，我这里起名为AFPN.py。

(在这里说一下大家可以看到我每个修改教程都会单独拿出来一个新的未修改任何东西yolov8仓库，避免因为之前其它的修改而导致给大家的修改教程有问题，所以有的时候大家部分的代码不能跑可能是因为大家修改了其它的机制，导致修改了源代码可能会导致跑不了，所以有的错误我没有大家的代码实在是不好给大家解决问题，后期针对这个问题我会上传修改好了的文件，**我收集了大概80余种YOLOv8的改进方式，到时候大家直接可以拿着我代码进行组合从而避免各种的报错问题，所以大家可以提早关注本专栏。**)

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0716362c915841f7bd31d777b4e124cb.png)

### 7.2 修改二

我们新建完上面的文件之后，找到如下的文件'ultralytics/nn/tasks.py'。这里需要修改的地方有点多，总共有7处，但都很简单。首先我们在该文件的头部导入我们AFPN文件中的检测头。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a1c04986e6c6425e9e6b1f8e9a2a888a.png)

### 7.3 修改三 

找到如下的代码进行将检测头添加进去，这里给大家推荐个快速搜索的方法用ctrl+f然后搜索Detect然后就能快速查找了。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0bc972e1c7254424afb3f87713c1938b.png)

### 7.4 修改四 

同理将我们的检测头添加到如下的代码里。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/d8723f55d2934ab4a86461627b06278e.png)

### 7.5 修改五 

同理

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c732ad32ac664a359fce26ff86f8d2fb.png)

### 7.6 修改六 

同理

### ![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b456089e45af49159edc2c733300a61b.png)

### 7.7 修改七 

同理

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c9c08db5c011416cb00ba0d543959587.png)

### 7.8 修改八

这里有一些不一样，我们需要加一行代码

```python
else:  return 'detect'
```

为啥呢不一样，因为这里的m在代码执行过程中会将你的代码自动转换为小写，所以直接else方便一点，以后出现一些其它分割或者其它的教程的时候在提供其它的修改教程。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1db90013ad2a4205aeff11a4b9f2b03b.png)

### 7.9 修改九 

这里也有一些不一样，需要自己手动添加一个括号，提醒一下大家不要直接添加，和我下面保持一致。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9f3d2394f61b48eba100bc2b49c5429d.png)

### 7.10 修改十 

这个代码的yaml文件和正常的对比也需要修改一下，**如下->**

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
 
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 12], 1, Concat, [1]]  # cat head P4
  - [-1, 3, C2f, [512]]  # 18 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]]
  - [[-1, 9], 1, Concat, [1]]  # cat head P5
  - [-1, 3, C2f, [1024]]  # 21 (P5/32-large)
 
  - [[15, 18, 21], 1, Detect_AFPN, [nc, 256]]  # Detect(P3, P4, P5)
```

**最后提供一下完美运行的图片。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/918c93129d19436198dbbc4ece4ca8ce.png)

八、损失函数
------

当我们想要在YOLOv8中添加算是函数时候我们需要进行以下的操作，同时我我们引入Focus的思想时候需要进行如何的操作，大家可以按照如下的步骤进行操作即可。

我们提供的代码是最新的Inner实现的各种损失的思想，给大家进行尝试。

大家可以用下面的代码块一和代码块二进行操作。

**代码块一**

```python
 
class WIoU_Scale:
    ''' monotonous: {
            None: origin v1
            True: monotonic FM v2
            False: non-monotonic FM v3
        }
        momentum: The momentum of running mean'''
 
    iou_mean = 1.
    monotonous = False
    _momentum = 1 - 0.5 ** (1 / 7000)
    _is_train = True
 
    def __init__(self, iou):
        self.iou = iou
        self._update(self)
 
    @classmethod
    def _update(cls, self):
        if cls._is_train: cls.iou_mean = (1 - cls._momentum) * cls.iou_mean + \
                                         cls._momentum * self.iou.detach().mean().item()
 
    @classmethod
    def _scaled_loss(cls, self, gamma=1.9, delta=3):
        if isinstance(self.monotonous, bool):
            if self.monotonous:
                return (self.iou.detach() / self.iou_mean).sqrt()
            else:
                beta = self.iou.detach() / self.iou_mean
                alpha = delta * torch.pow(gamma, beta - delta)
                return beta / alpha
        return 1
 
 
def bbox_iou(box1, box2, xywh=True, ratio=1, GIoU=False, DIoU=False, CIoU=False, SIoU=False,
             EIoU=False, WIoU=False, MPDIoU=False, LMPDIoU=False, Inner=False, Focal=False, alpha=1, gamma=0.5,
             scale=False, eps=1e-7):
    if Inner:
        (x1, y1, w1, h1), (x2, y2, w2, h2) = box1.chunk(4, -1), box2.chunk(4, -1)
        w1_, h1_, w2_, h2_ = w1 / 2, h1 / 2, w2 / 2, h2 / 2
 
        # Inner-IoU      #Inner-IoU        #Inner-IoU        #Inner-IoU        #Inner-IoU        #Inner-IoU        #Inner-IoU
        b1_x1, b1_x2, b1_y1, b1_y2 = x1 - w1_ * ratio, x1 + w1_ * ratio, \
                                     y1 - h1_ * ratio, y1 + h1_ * ratio
        b2_x1, b2_x2, b2_y1, b2_y2 = x2 - w2_ * ratio, x2 + w2_ * ratio, \
                                     y2 - h2_ * ratio, y2 + h2_ * ratio
        inter = (torch.min(b1_x2, b2_x2) - torch.max(b1_x1, b2_x1)).clamp(0) * \
                (torch.min(b1_y2, b2_y2) - torch.max(b1_y1, b2_y1)).clamp(0)
        union = w1 * ratio * h1 * ratio + w2 * ratio * h2 * ratio - inter + eps
 
        iou = inter / union  # inner_iou
 
    else:
        # Returns the IoU of box1 to box2. box1 is 4, box2 is nx4
        if xywh:  # transform from xywh to xyxy
            (x1, y1, w1, h1), (x2, y2, w2, h2) = box1.chunk(4, -1), box2.chunk(4, -1)
            w1_, h1_, w2_, h2_ = w1 / 2, h1 / 2, w2 / 2, h2 / 2
            b1_x1, b1_x2, b1_y1, b1_y2 = x1 - w1_, x1 + w1_, y1 - h1_, y1 + h1_
            b2_x1, b2_x2, b2_y1, b2_y2 = x2 - w2_, x2 + w2_, y2 - h2_, y2 + h2_
        else:  # x1, y1, x2, y2 = box1
            b1_x1, b1_y1, b1_x2, b1_y2 = box1.chunk(4, -1)
            b2_x1, b2_y1, b2_x2, b2_y2 = box2.chunk(4, -1)
            w1, h1 = b1_x2 - b1_x1, b1_y2 - b1_y1 + eps
            w2, h2 = b2_x2 - b2_x1, b2_y2 - b2_y1 + eps
 
            # Intersection area
        inter = (b1_x2.minimum(b2_x2) - b1_x1.maximum(b2_x1)).clamp_(0) * \
                (b1_y2.minimum(b2_y2) - b1_y1.maximum(b2_y1)).clamp_(0)
 
        # Union Area
        union = w1 * h1 + w2 * h2 - inter + eps
 
        # IoU
        iou = inter / union
 
 
 
    if CIoU or DIoU or GIoU or EIoU or SIoU or WIoU or MPDIoU or LMPDIoU:
        cw = b1_x2.maximum(b2_x2) - b1_x1.minimum(
            b2_x1)  # convex (smallest enclosing box) width
        ch = b1_y2.maximum(b2_y2) - b1_y1.minimum(b2_y1)  # convex height
        if CIoU or DIoU or EIoU or SIoU or WIoU or MPDIoU or LMPDIoU:  # Distance or Complete IoU
            # https://arxiv.org/abs/1911.08287v1
            c2 = (cw ** 2 + ch ** 2) ** alpha + eps  # convex diagonal squared
            rho2 = (((b2_x1 + b2_x2 - b1_x1 - b1_x2) ** 2 + (
                    b2_y1 + b2_y2 - b1_y1 - b1_y2) ** 2) / 4) ** alpha  # center dist ** 2
            if CIoU:  # https://github.com/Zzh-tju/DIoU-SSD-pytorch/blob/master/utils/box/box_utils.py#L47
                v = (4 / math.pi ** 2) * (torch.atan(w2 / h2) - torch.atan(w1 / h1)).pow(2)
                with torch.no_grad():
                    alpha_ciou = v / (v - iou + (1 + eps))
                if Focal:
                    return iou - (rho2 / c2 + torch.pow(v * alpha_ciou + eps, alpha)), torch.pow(
                        inter / (union + eps),
                        gamma)  # Focal_CIoU
                else:
                    return iou - (rho2 / c2 + torch.pow(v * alpha_ciou + eps, alpha))  # CIoU
            elif MPDIoU:
                d1 = (b2_x1 - b1_x1) ** 2 + (b2_y1 - b1_y1) ** 2
                d2 = (b2_x2 - b1_x2) ** 2 + (b2_y2 - b1_y2) ** 2
                w = (b2_x2 - b2_x1)  # x2 - x1
                h = (b2_y2 - b2_y1)  # y2 - y1
                if Focal:
                    return iou - ((d1 + d2) / (w ** 2 + h ** 2)), torch.pow(inter / (union + eps),
                                                                            gamma)  # Focal_MPDIoU
                else:
                    return iou - (d1 + d2) / (w ** 2 + h ** 2)
            elif LMPDIoU:
                d1 = (b2_x1 - b1_x1) ** 2 + (b2_y1 - b1_y1) ** 2
                d2 = (b2_x2 - b1_x2) ** 2 + (b2_y2 - b1_y2) ** 2
                w = (b2_x2 - b2_x1)  # x2 - x1
                h = (b2_y2 - b2_y1)  # y2 - y1
                if Focal:
                    return 1 - (iou - (d1 + d2) / (w ** 2 + h ** 2)), torch.pow(inter / (union + eps),
                                                                                gamma)  # Focal_MPDIo  # MPDIoU
                else:
                    return 1 - iou + d1 / (w ** 2 + h ** 2) + d2 / (w ** 2 + h ** 2)
            elif EIoU:
                rho_w2 = ((b2_x2 - b2_x1) - (b1_x2 - b1_x1)) ** 2
                rho_h2 = ((b2_y2 - b2_y1) - (b1_y2 - b1_y1)) ** 2
                cw2 = torch.pow(cw ** 2 + eps, alpha)
                ch2 = torch.pow(ch ** 2 + eps, alpha)
                if Focal:
                    return iou - (rho2 / c2 + rho_w2 / cw2 + rho_h2 / ch2), torch.pow(
                        inter / (union + eps),
                        gamma)  # Focal_EIou
                else:
                    return iou - (rho2 / c2 + rho_w2 / cw2 + rho_h2 / ch2)  # EIou
            elif SIoU:
                # SIoU Loss https://arxiv.org/pdf/2205.12740.pdf
                s_cw = (b2_x1 + b2_x2 - b1_x1 - b1_x2) * 0.5 + eps
                s_ch = (b2_y1 + b2_y2 - b1_y1 - b1_y2) * 0.5 + eps
                sigma = torch.pow(s_cw ** 2 + s_ch ** 2, 0.5)
                sin_alpha_1 = torch.abs(s_cw) / sigma
                sin_alpha_2 = torch.abs(s_ch) / sigma
                threshold = pow(2, 0.5) / 2
                sin_alpha = torch.where(sin_alpha_1 > threshold, sin_alpha_2, sin_alpha_1)
                angle_cost = torch.cos(torch.arcsin(sin_alpha) * 2 - math.pi / 2)
                rho_x = (s_cw / cw) ** 2
                rho_y = (s_ch / ch) ** 2
                gamma = angle_cost - 2
                distance_cost = 2 - torch.exp(gamma * rho_x) - torch.exp(gamma * rho_y)
                omiga_w = torch.abs(w1 - w2) / torch.max(w1, w2)
                omiga_h = torch.abs(h1 - h2) / torch.max(h1, h2)
                shape_cost = torch.pow(1 - torch.exp(-1 * omiga_w), 4) + torch.pow(1 - torch.exp(-1 * omiga_h), 4)
                if Focal:
                    return iou - torch.pow(0.5 * (distance_cost + shape_cost) + eps, alpha), torch.pow(
                        inter / (union + eps), gamma)  # Focal_SIou
                else:
                    return iou - torch.pow(0.5 * (distance_cost + shape_cost) + eps, alpha)  # SIou
            elif WIoU:
                self = WIoU_Scale(1 - (inter / union))
                dist = getattr(WIoU_Scale, '_scaled_loss')(self)
                return iou * dist # WIoU https://arxiv.org/abs/2301.10051
 
            if Focal:
                return iou - rho2 / c2, torch.pow(inter / (union + eps), gamma)  # Focal_DIoU
            else:
                return iou - rho2 / c2  # DIoU
 
        c_area = cw * ch + eps  # convex area
        if Focal:
            return iou - torch.pow((c_area - union) / c_area + eps, alpha), torch.pow(
                inter / (union + eps),
                gamma)  # Focal_GIoU https://arxiv.org/pdf/1902.09630.pdf
        else:
            return iou - torch.pow((c_area - union) / c_area + eps,
                                   alpha)  # GIoU https://arxiv.org/pdf/1902.09630.pdf
    if Focal:
        return iou, torch.pow(inter / (union + eps), gamma)  # Focal_IoU
    else:
        return iou  # IoU
```

**代码块二** 

```python
        if type(iou) is tuple:
            if len(iou) == 2:
                # Focus Loss 时返回的是元组类型,进行额外处理
                loss_iou = ((1.0 - iou[0]) * iou[1].detach() * weight).sum() / target_scores_sum
            else:
                loss_iou = (iou[0] * iou[1] * weight).sum() / target_scores_sum
 
        else:
            # 正常的损失函数
            loss_iou = ((1.0 - iou) * weight).sum() / target_scores_sum
```

### 8.1 修改一

第一步我们需要找到如下的文件ultralytics/utils/metrics.py,找到如下的代码，下面的图片是原先的代码部分截图的正常样子，然后我们将整个代码块一将下面的**整个方法(这里这是部分截图)****内容全部替换**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e7a59a4795ac45e29c2ee02d373394e9.png)

### 8.2 修改二

第二步我们找到另一个文件如下->"ultralytics/utils/loss.py"，我们找到如下的代码块，将代码块二替换其中的第74行，

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8def94a1508f453eb2e075fcec50a7e9.png)

同时在上面的第73行(我说的我图片这里的不一定代表你那里，替换成如下的形式，因为我们这里用的Inner的思想的IoU所以我们的红框内和原先的也是不一样需要修改的，大家可以看到这里用到的是Inner\_CIoU如果你想使用其它的IoU可以直接将Innner\_CIoU更改其他的如果都是False则默认适用Inner\_IoU即普通版本。

### 8.3 修改三

修改完上面的第二步，我们需要找到如下文件"ultralytics/utils/tal.py"，在这个文件中我们找到如下的代码块，我这里已经修改完了**(这里不要开启Focus的如果步骤二开启这里也不要开启，同时现在修改了，如果你想要使用inner就设置inner为True，举例如果你使用WIoU，如果不设置inner则此时为WIoU，如果你设置inner为True，那么此时使用的就是inner\_WIoU)**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/81b4d3c028e04a49beb3c84fd8f5e256.png)

九、Backbone(主干)
--------------

 这个主干的网络结构添加起来算是所有的改进机制里最麻烦的了，因为有一些网略结构可以用yaml文件搭建出来，有一些网络结构其中的一些细节根本没有办法用yaml文件去搭建，用yaml文件去搭建会损失一些细节部分(而且一个网络结构设计很多细节的结构修改方式都不一样，一个一个去修改大家难免会出错)，所以这里让网络直接返回整个网络，然后修改部分 yolo代码以后就都以这种形式添加了，以后我提出的网络模型基本上都会通过这种方式修改，我也会进行一些模型细节改进。创新出新的网络结构大家直接拿来用就可以的。**下面开始添加教程->**

**(同时每一个后面都有代码，大家拿来复制粘贴替换即可，但是要看好了不要复制粘贴替换多了)**

**EfficientViT的网络结构代码** 

```python
import torch.nn as nn
import torch
from inspect import signature
from timm.models.efficientvit_mit import val2tuple, ResidualBlock
from torch.cuda.amp import autocast
import torch.nn.functional as F
 
class LayerNorm2d(nn.LayerNorm):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        out = x - torch.mean(x, dim=1, keepdim=True)
        out = out / torch.sqrt(torch.square(out).mean(dim=1, keepdim=True) + self.eps)
        if self.elementwise_affine:
            out = out * self.weight.view(1, -1, 1, 1) + self.bias.view(1, -1, 1, 1)
        return out
 
 
REGISTERED_NORM_DICT: dict[str, type] = {
    "bn2d": nn.BatchNorm2d,
    "ln": nn.LayerNorm,
    "ln2d": LayerNorm2d,
}
 
# register activation function here
REGISTERED_ACT_DICT: dict[str, type] = {
    "relu": nn.ReLU,
    "relu6": nn.ReLU6,
    "hswish": nn.Hardswish,
    "silu": nn.SiLU,
}
 
 
class FusedMBConv(nn.Module):
    def __init__(
        self,
        in_channels: int,
        out_channels: int,
        kernel_size=3,
        stride=1,
        mid_channels=None,
        expand_ratio=6,
        groups=1,
        use_bias=False,
        norm=("bn2d", "bn2d"),
        act_func=("relu6", None),
    ):
        super().__init__()
        use_bias = val2tuple(use_bias, 2)
        norm = val2tuple(norm, 2)
        act_func = val2tuple(act_func, 2)
 
        mid_channels = mid_channels or round(in_channels * expand_ratio)
 
        self.spatial_conv = ConvLayer(
            in_channels,
            mid_channels,
            kernel_size,
            stride,
            groups=groups,
            use_bias=use_bias[0],
            norm=norm[0],
            act_func=act_func[0],
        )
        self.point_conv = ConvLayer(
            mid_channels,
            out_channels,
            1,
            use_bias=use_bias[1],
            norm=norm[1],
            act_func=act_func[1],
        )
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.spatial_conv(x)
        x = self.point_conv(x)
        return x
 
 
class DSConv(nn.Module):
    def __init__(
        self,
        in_channels: int,
        out_channels: int,
        kernel_size=3,
        stride=1,
        use_bias=False,
        norm=("bn2d", "bn2d"),
        act_func=("relu6", None),
    ):
        super(DSConv, self).__init__()
 
        use_bias = val2tuple(use_bias, 2)
        norm = val2tuple(norm, 2)
        act_func = val2tuple(act_func, 2)
 
        self.depth_conv = ConvLayer(
            in_channels,
            in_channels,
            kernel_size,
            stride,
            groups=in_channels,
            norm=norm[0],
            act_func=act_func[0],
            use_bias=use_bias[0],
        )
        self.point_conv = ConvLayer(
            in_channels,
            out_channels,
            1,
            norm=norm[1],
            act_func=act_func[1],
            use_bias=use_bias[1],
        )
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.depth_conv(x)
        x = self.point_conv(x)
        return x
 
 
class MBConv(nn.Module):
    def __init__(
        self,
        in_channels: int,
        out_channels: int,
        kernel_size=3,
        stride=1,
        mid_channels=None,
        expand_ratio=6,
        use_bias=False,
        norm=("bn2d", "bn2d", "bn2d"),
        act_func=("relu6", "relu6", None),
    ):
        super(MBConv, self).__init__()
 
        use_bias = val2tuple(use_bias, 3)
        norm = val2tuple(norm, 3)
        act_func = val2tuple(act_func, 3)
        mid_channels = mid_channels or round(in_channels * expand_ratio)
 
        self.inverted_conv = ConvLayer(
            in_channels,
            mid_channels,
            1,
            stride=1,
            norm=norm[0],
            act_func=act_func[0],
            use_bias=use_bias[0],
        )
        self.depth_conv = ConvLayer(
            mid_channels,
            mid_channels,
            kernel_size,
            stride=stride,
            groups=mid_channels,
            norm=norm[1],
            act_func=act_func[1],
            use_bias=use_bias[1],
        )
        self.point_conv = ConvLayer(
            mid_channels,
            out_channels,
            1,
            norm=norm[2],
            act_func=act_func[2],
            use_bias=use_bias[2],
        )
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.inverted_conv(x)
        x = self.depth_conv(x)
        x = self.point_conv(x)
        return x
 
 
class EfficientViTBlock(nn.Module):
    def __init__(
        self,
        in_channels: int,
        heads_ratio: float = 1.0,
        dim=32,
        expand_ratio: float = 4,
        norm="bn2d",
        act_func="hswish",
    ):
        super(EfficientViTBlock, self).__init__()
        self.context_module = ResidualBlock(
            LiteMLA(
                in_channels=in_channels,
                out_channels=in_channels,
                heads_ratio=heads_ratio,
                dim=dim,
                norm=(None, norm),
            ),
            IdentityLayer(),
        )
        local_module = MBConv(
            in_channels=in_channels,
            out_channels=in_channels,
            expand_ratio=expand_ratio,
            use_bias=(True, True, False),
            norm=(None, None, norm),
            act_func=(act_func, act_func, None),
        )
        self.local_module = ResidualBlock(local_module, IdentityLayer())
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.context_module(x)
        x = self.local_module(x)
        return x
 
class ResBlock(nn.Module):
    def __init__(
        self,
        in_channels: int,
        out_channels: int,
        kernel_size=3,
        stride=1,
        mid_channels=None,
        expand_ratio=1,
        use_bias=False,
        norm=("bn2d", "bn2d"),
        act_func=("relu6", None),
    ):
        super().__init__()
        use_bias = val2tuple(use_bias, 2)
        norm = val2tuple(norm, 2)
        act_func = val2tuple(act_func, 2)
 
        mid_channels = mid_channels or round(in_channels * expand_ratio)
 
        self.conv1 = ConvLayer(
            in_channels,
            mid_channels,
            kernel_size,
            stride,
            use_bias=use_bias[0],
            norm=norm[0],
            act_func=act_func[0],
        )
        self.conv2 = ConvLayer(
            mid_channels,
            out_channels,
            kernel_size,
            1,
            use_bias=use_bias[1],
            norm=norm[1],
            act_func=act_func[1],
        )
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.conv1(x)
        x = self.conv2(x)
        return x
 
 
 
class LiteMLA(nn.Module):
    r"""Lightweight multi-scale linear attention"""
 
    def __init__(
        self,
        in_channels: int,
        out_channels: int,
        heads: int or None = None,
        heads_ratio: float = 1.0,
        dim=8,
        use_bias=False,
        norm=(None, "bn2d"),
        act_func=(None, None),
        kernel_func="relu6",
        scales: tuple[int, ...] = (5,),
        eps=1.0e-15,
    ):
        super(LiteMLA, self).__init__()
        self.eps = eps
        heads = heads or int(in_channels // dim * heads_ratio)
 
        total_dim = heads * dim
 
        use_bias = val2tuple(use_bias, 2)
        norm = val2tuple(norm, 2)
        act_func = val2tuple(act_func, 2)
 
        self.dim = dim
        self.qkv = ConvLayer(
            in_channels,
            3 * total_dim,
            1,
            use_bias=use_bias[0],
            norm=norm[0],
            act_func=act_func[0],
        )
        self.aggreg = nn.ModuleList(
            [
                nn.Sequential(
                    nn.Conv2d(
                        3 * total_dim,
                        3 * total_dim,
                        scale,
                        padding=get_same_padding(scale),
                        groups=3 * total_dim,
                        bias=use_bias[0],
                    ),
                    nn.Conv2d(3 * total_dim, 3 * total_dim, 1, groups=3 * heads, bias=use_bias[0]),
                )
                for scale in scales
            ]
        )
        self.kernel_func = build_act(kernel_func, inplace=False)
 
        self.proj = ConvLayer(
            total_dim * (1 + len(scales)),
            out_channels,
            1,
            use_bias=use_bias[1],
            norm=norm[1],
            act_func=act_func[1],
        )
 
    @autocast(enabled=False)
    def relu_linear_att(self, qkv: torch.Tensor) -> torch.Tensor:
        B, _, H, W = list(qkv.size())
 
        if qkv.dtype == torch.float16:
            qkv = qkv.float()
 
        qkv = torch.reshape(
            qkv,
            (
                B,
                -1,
                3 * self.dim,
                H * W,
            ),
        )
        qkv = torch.transpose(qkv, -1, -2)
        q, k, v = (
            qkv[..., 0 : self.dim],
            qkv[..., self.dim : 2 * self.dim],
            qkv[..., 2 * self.dim :],
        )
 
        # lightweight linear attention
        q = self.kernel_func(q)
        k = self.kernel_func(k)
 
        # linear matmul
        trans_k = k.transpose(-1, -2)
 
        v = F.pad(v, (0, 1), mode="constant", value=1)
        kv = torch.matmul(trans_k, v)
        out = torch.matmul(q, kv)
        out = torch.clone(out)
        out = out[..., :-1] / (out[..., -1:] + self.eps)
 
        out = torch.transpose(out, -1, -2)
        out = torch.reshape(out, (B, -1, H, W))
        return out
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # generate multi-scale q, k, v
        qkv = self.qkv(x)
        multi_scale_qkv = [qkv]
        device, types = qkv.device, qkv.dtype
        for op in self.aggreg:
            if device.type == 'cuda' and types == torch.float32:
                qkv = qkv.to(torch.float16)
            x1 = op(qkv)
            multi_scale_qkv.append(x1)
        multi_scale_qkv = torch.cat(multi_scale_qkv, dim=1)
        out = self.relu_linear_att(multi_scale_qkv)
        out = self.proj(out)
        return out
 
    @staticmethod
    def configure_litemla(model: nn.Module, **kwargs) -> None:
        eps = kwargs.get("eps", None)
        for m in model.modules():
            if isinstance(m, LiteMLA):
                if eps is not None:
                    m.eps = eps
 
 
def build_kwargs_from_config(config: dict, target_func: callable) -> dict[str, any]:
    valid_keys = list(signature(target_func).parameters)
    kwargs = {}
    for key in config:
        if key in valid_keys:
            kwargs[key] = config[key]
    return kwargs
 
 
 
def build_norm(name="bn2d", num_features=None, **kwargs) -> nn.Module or None:
    if name in ["ln", "ln2d"]:
        kwargs["normalized_shape"] = num_features
    else:
        kwargs["num_features"] = num_features
    if name in REGISTERED_NORM_DICT:
        norm_cls = REGISTERED_NORM_DICT[name]
        args = build_kwargs_from_config(kwargs, norm_cls)
        return norm_cls(**args)
    else:
        return None
 
def get_same_padding(kernel_size: int or tuple[int, ...]) -> int or tuple[int, ...]:
    if isinstance(kernel_size, tuple):
        return tuple([get_same_padding(ks) for ks in kernel_size])
    else:
        assert kernel_size % 2 > 0, "kernel size should be odd number"
        return kernel_size // 2
 
 
def build_act(name: str, **kwargs) -> nn.Module or None:
    if name in REGISTERED_ACT_DICT:
        act_cls = REGISTERED_ACT_DICT[name]
        args = build_kwargs_from_config(kwargs, act_cls)
        return act_cls(**args)
    else:
        return None
 
 
class ConvLayer(nn.Module):
    def __init__(
        self,
        in_channels: int,
        out_channels: int,
        kernel_size=3,
        stride=1,
        dilation=1,
        groups=1,
        use_bias=False,
        dropout=0,
        norm="bn2d",
        act_func="relu",
    ):
        super(ConvLayer, self).__init__()
 
        padding = get_same_padding(kernel_size)
        padding *= dilation
 
        self.dropout = nn.Dropout2d(dropout, inplace=False) if dropout > 0 else None
        self.conv = nn.Conv2d(
            in_channels,
            out_channels,
            kernel_size=(kernel_size, kernel_size),
            stride=(stride, stride),
            padding=padding,
            dilation=(dilation, dilation),
            groups=groups,
            bias=use_bias,
        )
        self.norm = build_norm(norm, num_features=out_channels)
        self.act = build_act(act_func)
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        if self.dropout is not None:
            x = self.dropout(x)
        device, type = x.device, x.dtype
        choose = False
        if device.type == 'cuda' and type == torch.float32:
            x = x.to(torch.float16)
            choose = True
        x = self.conv(x)
        if self.norm:
            x = self.norm(x)
        if self.act:
            x = self.act(x)
        if choose:
            x = x.to(torch.float16)
        return x
 
 
class IdentityLayer(nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return x
 
 
class OpSequential(nn.Module):
    def __init__(self, op_list: list[nn.Module or None]):
        super(OpSequential, self).__init__()
        valid_op_list = []
        for op in op_list:
            if op is not None:
                valid_op_list.append(op)
        self.op_list = nn.ModuleList(valid_op_list)
 
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        for op in self.op_list:
            x = op(x)
        return x
 
 
 
class EfficientViTBackbone(nn.Module):
    def __init__(
        self,
        width_list: list[int],
        depth_list: list[int],
        in_channels=3,
        dim=32,
        expand_ratio=4,
        norm="ln2d",
        act_func="hswish",
    ) -> None:
        super().__init__()
 
        self.width_list = []
        # input stem
        self.input_stem = [
            ConvLayer(
                in_channels=3,
                out_channels=width_list[0],
                stride=2,
                norm=norm,
                act_func=act_func,
            )
        ]
        for _ in range(depth_list[0]):
            block = self.build_local_block(
                in_channels=width_list[0],
                out_channels=width_list[0],
                stride=1,
                expand_ratio=1,
                norm=norm,
                act_func=act_func,
            )
            self.input_stem.append(ResidualBlock(block, IdentityLayer()))
        in_channels = width_list[0]
        self.input_stem = OpSequential(self.input_stem)
        self.width_list.append(in_channels)
 
        # stages
        self.stages = []
        for w, d in zip(width_list[1:3], depth_list[1:3]):
            stage = []
            for i in range(d):
                stride = 2 if i == 0 else 1
                block = self.build_local_block(
                    in_channels=in_channels,
                    out_channels=w,
                    stride=stride,
                    expand_ratio=expand_ratio,
                    norm=norm,
                    act_func=act_func,
                )
                block = ResidualBlock(block, IdentityLayer() if stride == 1 else None)
                stage.append(block)
                in_channels = w
            self.stages.append(OpSequential(stage))
            self.width_list.append(in_channels)
 
        for w, d in zip(width_list[3:], depth_list[3:]):
            stage = []
            block = self.build_local_block(
                in_channels=in_channels,
                out_channels=w,
                stride=2,
                expand_ratio=expand_ratio,
                norm=norm,
                act_func=act_func,
                fewer_norm=True,
            )
            stage.append(ResidualBlock(block, None))
            in_channels = w
 
            for _ in range(d):
                stage.append(
                    EfficientViTBlock(
                        in_channels=in_channels,
                        dim=dim,
                        expand_ratio=expand_ratio,
                        norm=norm,
                        act_func=act_func,
                    )
                )
            self.stages.append(OpSequential(stage))
            self.width_list.append(in_channels)
        self.stages = nn.ModuleList(self.stages)
 
    @staticmethod
    def build_local_block(
        in_channels: int,
        out_channels: int,
        stride: int,
        expand_ratio: float,
        norm: str,
        act_func: str,
        fewer_norm: bool = False,
    ) -> nn.Module:
        if expand_ratio == 1:
            block = DSConv(
                in_channels=in_channels,
                out_channels=out_channels,
                stride=stride,
                use_bias=(True, False) if fewer_norm else False,
                norm=(None, norm) if fewer_norm else norm,
                act_func=(act_func, None),
            )
        else:
            block = MBConv(
                in_channels=in_channels,
                out_channels=out_channels,
                stride=stride,
                expand_ratio=expand_ratio,
                use_bias=(True, True, False) if fewer_norm else False,
                norm=(None, None, norm) if fewer_norm else norm,
                act_func=(act_func, act_func, None),
            )
        return block
 
    def forward(self, x: torch.Tensor) -> dict[str, torch.Tensor]:
        outputs = []
        for stage_id, stage in enumerate(self.stages):
            x = stage(x)
            if x.device.type == 'cuda':
                x = x.to(torch.float16)
            outputs.append(x)
        return outputs
 
 
def efficientvit_backbone_b0(**kwargs) -> EfficientViTBackbone:
    backbone = EfficientViTBackbone(
        width_list=[3, 16, 32, 64, 128],
        depth_list=[1, 2, 2, 2, 2],
        dim=16,
        **build_kwargs_from_config(kwargs, EfficientViTBackbone),
    )
    return backbone
 
def efficientvit_backbone_b1(**kwargs) -> EfficientViTBackbone:
    backbone = EfficientViTBackbone(
        width_list=[3, 32, 64, 128, 256],
        depth_list=[1, 2, 3, 3, 4],
        dim=16,
        **build_kwargs_from_config(kwargs, EfficientViTBackbone),
    )
    return backbone
 
 
def efficientvit_backbone_b2(**kwargs) -> EfficientViTBackbone:
    backbone = EfficientViTBackbone(
        width_list=[3, 48, 96, 192, 384],
        depth_list=[1, 3, 4, 4, 6],
        dim=32,
        **build_kwargs_from_config(kwargs, EfficientViTBackbone),
    )
    return backbone
 
 
def efficientvit_backbone_b3(**kwargs) -> EfficientViTBackbone:
    backbone = EfficientViTBackbone(
        width_list=[3, 64, 128, 256, 512],
        depth_list=[1, 4, 6, 6, 9],
        dim=32,
        **build_kwargs_from_config(kwargs, EfficientViTBackbone),
    )
    return backbone
```

* * *

### 修改一

我们复制网络结构代码到“ultralytics/nn/modules”目录下创建一个py文件复制粘贴进去 ，我这里起的名字是EfficientV2。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/46343640e06a4dcba3cc3536b1f44d9f.png)

* * *

### 修改二

找到如下的文件"ultralytics/nn/tasks.py" 在开始的部分导入我们的模型如下图。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/026f4c06acf14e6f94d01c71216738db.png)

```python
from .modules.EfficientV2 import efficientvit_backbone_b0,efficientvit_backbone_b1,efficientvit_backbone_b2,efficientvit_backbone_b3
```

* * *

### 修改三 

**添加如下两行代码！！！**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1655de23b1834dfca4f304336f0f2c19.png)

* * *

### 修改四

找到七百多行大概把具体看图片，按照图片来修改就行，添加红框内的部分，注意没有()只是函数名。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c1dde522a44248d9bea5d7c8b311b326.png)

```python
elif m in {efficientvit_backbone_b0, efficientvit_backbone_b1, efficientvit_backbone_b2, efficientvit_backbone_b3}: 
m = m()            
c2 = m.width_list  # 返回通道列表            
backbone = True
```

* * *

### 修改五 

下面的两个红框内都是需要改动的。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6437a57f982c4388a83b7be05cf64448.png)

```python
if isinstance(c2, list): 
 m_ = m
 m_.backbone = True
else:
  m_ = nn.Sequential(*(m(*args) for _ in range(n))) if n > 1 else m(*args)  # module           t = str(m)[8:-2].replace('__main__.', '')
  
  m.np = sum(x.numel() for x in m_.parameters())  # number params
  m_.i, m_.f, m_.type = i + 4 if backbone else i, f, t  # attach index, 'from' index, type
```

* * *

### 修改六 

如下的也需要修改，全部按照我的来。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7b6a03061e7e4846b51bc282e88bead8.png)

代码如下把原先的代码替换了即可。 

```python
        save.extend(x % (i + 4 if backbone else i) for x in ([f] if isinstance(f, int) else f) if x != -1)  # append to savelist
        layers.append(m_)
        if i == 0:
            ch = []
        if isinstance(c2, list):
            ch.extend(c2)
            if len(c2) != 5:
                ch.insert(0, 0)
        else:
            ch.append(c2)
```



### 修改七

修改七和前面的都不太一样，需要修改前向传播中的一个部分， 已经离开了parse\_model方法了。

可以在图片中开代码行数，没有离开task.py文件都是同一个文件。 同时这个部分有好几个前向传播都很相似，大家不要看错了，**是70多行左右的！！！，同时我后面提供了代码，大家直接复制粘贴即可，有时间我针对这里会出一个视频。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c2ad3781e93f4f01ac1cfab9b90ed1bb.png)

**代码如下->**

```python
    def _predict_once(self, x, profile=False, visualize=False):
        """
        Perform a forward pass through the network.
        Args:
            x (torch.Tensor): The input tensor to the model.
            profile (bool):  Print the computation time of each layer if True, defaults to False.
            visualize (bool): Save the feature maps of the model if True, defaults to False.
        Returns:
            (torch.Tensor): The last output of the model.
        """
        y, dt = [], []  # outputs
        for m in self.model:
            if m.f != -1:  # if not from previous layer
                x = y[m.f] if isinstance(m.f, int) else [x if j == -1 else y[j] for j in m.f]  # from earlier layers
            if profile:
                self._profile_one_layer(m, x, dt)
            if hasattr(m, 'backbone'):
                x = m(x)
                if len(x) != 5: # 0 - 5
                    x.insert(0, None)
                for index, i in enumerate(x):
                    if index in self.save:
                        y.append(i)
                    else:
                        y.append(None)
                x = x[-1] # 最后一个输出传给下一层
            else:
                x = m(x)  # run
                y.append(x if m.i in self.save else None)  # save output
            if visualize:
                feature_visualization(x, m.type, m.i, save_dir=visualize)
        return x
```

* * *

### 修改八

需要额外修改一处， 我们找到如下文件'ultralytics/utils/torch\_utils.py'按照如下的图片进行修改。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/24068f6039b94ceeb91e98642c00e594.png)

到这里就完成了修改部分，但是这里面细节很多，大家千万要注意不要替换多余的代码，导致报错，也不要拉下任何一步，都会导致运行失败，而且报错很难排查！！！很难排查！！！ 

### 修改九

**复制如下yaml文件进行运行！！！** 

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
  - [-1, 1, efficientvit_backbone_b0, []]  # 4
  - [-1, 1, SPPF, [1024, 5]]  # 5
 
# YOLOv8.0n head
head:
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']] # 6
  - [[-1, 3], 1, Concat, [1]]  # 7 cat backbone P4
  - [-1, 3, C2f, [512]]  # 8
 
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']] # 9
  - [[-1, 2], 1, Concat, [1]]  # 10 cat backbone P3
  - [-1, 3, C2f, [256]]  # 11 (P3/8-small)
 
  - [-1, 1, Conv, [256, 3, 2]] # 12
  - [[-1, 8], 1, Concat, [1]]  # 13 cat head P4
  - [-1, 3, C2f, [512]]  # 14 (P4/16-medium)
 
  - [-1, 1, Conv, [512, 3, 2]] # 15
  - [[-1, 5], 1, Concat, [1]]  # 16 cat head P5
  - [-1, 3, C2f, [1024]]  # 17 (P5/32-large)
 
  - [[11, 14, 17], 1, Detect, [nc]]  # Detect(P3, P4, P5)
```

