 # DAT

一、本文介绍
------

本文给大家带来的是YOLOv8改进**DAT**(**Vision Transformer with Deformable Attention**)的教程，其发布于2022年CVPR2022上同时被评选为Best Paper，由此可以证明其是一种十分有效的改进机制，其主要的核心思想是：**引入可变形注意力机制和动态采样点(听着是不是和可变形动态卷积DCN挺相似)**。同时在网络结构中引入一个DAT计算量由8.9GFLOPs涨到了9.4GFLOPs。本文的讲解主要包含三方面：DAT的网络结构思想、DAttention的代码复现，如何添加DAttention到你的结构中实现涨点，下面先来分享我测试的对比图(因为资源有限，我只用了100张图片的数据集进行了100个epoch的训练，虽然这个实验不能产生确定性的结论，但是可以作为一个参考)。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c79f15358c3c4d12b512a652666f4aa1.png)

二、DAT的网络结构思想
------------

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2d87d1a9e0ce4517900ffebf21dd5e5d.png)

**论文地址**： [DAT论文地址](https://openaccess.thecvf.com/content/CVPR2022/papers/Xia_Vision_Transformer_With_Deformable_Attention_CVPR_2022_paper.pdf "DAT论文地址")

**官方地址**：[官方代码的地址](https://github.com/LeapLabTHU/DAT "官方代码的地址")

**代码地址**：文末有修改了官方代码BUG的代码块复制粘贴即可

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/86d5eb08c3f64ce180b19180de965e98.png)

* * *

### **2.1 DAT的主要思想和改进**

**DAT（Vision Transformer with Deformable Attention）**是一种引入了可变形注意力机制的视觉**Transformer**，DAT的核心思想主要包括以下几个方面：

1.  **可变形注意力（Deformable Attention）**：传统的Transformer使用标准的自注意力机制，这种机制会处理图像中的所有像素，导致计算量很大。而DAT引入了可变形注意力机制，它只关注图像中的一小部分关键区域。这种方法可以显著减少计算量，同时保持良好的性能。
    
2.  **动态采样点**：在可变形注意力机制中，DAT动态地选择采样点，而不是固定地处理整个图像。这种动态选择机制使得模型可以更加集中地关注于那些对当前任务最重要的区域。
    
3.  **即插即用**：DAT的设计允许它适应不同的图像大小和内容，使其在多种视觉任务中都能有效工作，如图像分类、对象检测等。

> **总结**：DAT通过引入可变形注意力机制，改进了视觉Transformer的效率和性能，使其在处理复杂的视觉任务时更加高效和准确。

* * *

### **2.2 DAT的网络结构图** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/788dfa46625d43c2b5a2ea6c1bd0edd1.png)

(a) 展示了可变形注意力的信息流。左侧部分，一组参考点均匀地放置在特征图上，这些点的偏移量是由查询通过偏移网络学习得到的。然后，如右侧所示，根据变形点从采样特征中投影出变形的键和值。相对位置偏差也通过变形点计算，增强了输出转换特征的多头注意力。为了清晰展示，图中仅显示了4个参考点，但在实际实现中实际上有更多的点。

(b) 展示了偏移生成网络的详细结构，每层输入和输出特征图的大小都有标注(**这个Offset network在网络的代码中需要控制可添加可不添加**)。

通过上面的方式产生多种参考点分布在图像上，从而提高检测的效率，**最终的效果图如下：**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/17fc459e8ba9419cae117fbb881f1542.png)

* * *

### **2.3 DAT和其他机制的对比**

DAT与其他视觉Transformer模型和CNN模型中的DCN（可变形卷积网络）的对比图如下，突出了它们处理查询的不同方法(**图片展示的很直观，不给大家描述过程了**)：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/231f9c9593d14fc79d0df06d41da562b.png)

三、DAT即插即用的代码块
-------------

下面的代码是DAT的网络结构代码，官方的代码中存在许多bug而且参数都未定义，这里我替大家都行了修改而且在使用时无需手动添加任何参数(**但是本文的方法需要按照有参的注意力机制添加但是只是不需要进行传入参数在yaml文件中**)。

```python
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import einops
from timm.models.layers import to_2tuple, trunc_normal_
 
class LayerNormProxy(nn.Module):
 
    def __init__(self, dim):
        super().__init__()
        self.norm = nn.LayerNorm(dim)
 
    def forward(self, x):
        x = einops.rearrange(x, 'b c h w -> b h w c')
        x = self.norm(x)
        return einops.rearrange(x, 'b h w c -> b c h w')
 
 
class DAttentionBaseline(nn.Module):
 
    def __init__(
            self, q_size=(224,224), kv_size=(224,224), n_heads=8, n_head_channels=32, n_groups=1,
            attn_drop=0.0, proj_drop=0.0, stride=1,
            offset_range_factor=-1, use_pe=True, dwc_pe=True,
            no_off=False, fixed_pe=False, ksize=9, log_cpb=False
    ):
 
        super().__init__()
        n_head_channels = int(q_size / 8)
        q_size = (q_size, q_size)
 
        self.dwc_pe = dwc_pe
        self.n_head_channels = n_head_channels
        self.scale = self.n_head_channels ** -0.5
        self.n_heads = n_heads
        self.q_h, self.q_w = q_size
        # self.kv_h, self.kv_w = kv_size
        self.kv_h, self.kv_w = self.q_h // stride, self.q_w // stride
        self.nc = n_head_channels * n_heads
        self.n_groups = n_groups
        self.n_group_channels = self.nc // self.n_groups
        self.n_group_heads = self.n_heads // self.n_groups
        self.use_pe = use_pe
        self.fixed_pe = fixed_pe
        self.no_off = no_off
        self.offset_range_factor = offset_range_factor
        self.ksize = ksize
        self.log_cpb = log_cpb
        self.stride = stride
        kk = self.ksize
        pad_size = kk // 2 if kk != stride else 0
 
 
        self.conv_offset = nn.Sequential(
            nn.Conv2d(self.n_group_channels, self.n_group_channels, kk, stride, pad_size, groups=self.n_group_channels),
            LayerNormProxy(self.n_group_channels),
            nn.GELU(),
            nn.Conv2d(self.n_group_channels, 2, 1, 1, 0, bias=False)
        )
 
        if self.no_off:
            for m in self.conv_offset.parameters():
                m.requires_grad_(False)
 
        self.proj_q = nn.Conv2d(
            self.nc, self.nc,
            kernel_size=1, stride=1, padding=0
        )
 
        self.proj_k = nn.Conv2d(
            self.nc, self.nc,
            kernel_size=1, stride=1, padding=0)
 
        self.proj_v = nn.Conv2d(
            self.nc, self.nc,
            kernel_size=1, stride=1, padding=0
        )
        self.proj_out = nn.Conv2d(
            self.nc, self.nc,
            kernel_size=1, stride=1, padding=0
        )
 
        self.proj_drop = nn.Dropout(proj_drop, inplace=True)
        self.attn_drop = nn.Dropout(attn_drop, inplace=True)
 
        if self.use_pe and not self.no_off:
            if self.dwc_pe:
                self.rpe_table = nn.Conv2d(
                    self.nc, self.nc, kernel_size=3, stride=1, padding=1, groups=self.nc)
            elif self.fixed_pe:
                self.rpe_table = nn.Parameter(
                    torch.zeros(self.n_heads, self.q_h * self.q_w, self.kv_h * self.kv_w)
                )
                trunc_normal_(self.rpe_table, std=0.01)
            elif self.log_cpb:
                # Borrowed from Swin-V2
                self.rpe_table = nn.Sequential(
                    nn.Linear(2, 32, bias=True),
                    nn.ReLU(inplace=True),
                    nn.Linear(32, self.n_group_heads, bias=False)
                )
            else:
                self.rpe_table = nn.Parameter(
                    torch.zeros(self.n_heads, self.q_h * 2 - 1, self.q_w * 2 - 1)
                )
                trunc_normal_(self.rpe_table, std=0.01)
        else:
            self.rpe_table = None
 
    @torch.no_grad()
    def _get_ref_points(self, H_key, W_key, B, dtype, device):
 
        ref_y, ref_x = torch.meshgrid(
            torch.linspace(0.5, H_key - 0.5, H_key, dtype=dtype, device=device),
            torch.linspace(0.5, W_key - 0.5, W_key, dtype=dtype, device=device),
            indexing='ij'
        )
        ref = torch.stack((ref_y, ref_x), -1)
        ref[..., 1].div_(W_key - 1.0).mul_(2.0).sub_(1.0)
        ref[..., 0].div_(H_key - 1.0).mul_(2.0).sub_(1.0)
        ref = ref[None, ...].expand(B * self.n_groups, -1, -1, -1)  # B * g H W 2
 
        return ref
 
    @torch.no_grad()
    def _get_q_grid(self, H, W, B, dtype, device):
 
        ref_y, ref_x = torch.meshgrid(
            torch.arange(0, H, dtype=dtype, device=device),
            torch.arange(0, W, dtype=dtype, device=device),
            indexing='ij'
        )
        ref = torch.stack((ref_y, ref_x), -1)
        ref[..., 1].div_(W - 1.0).mul_(2.0).sub_(1.0)
        ref[..., 0].div_(H - 1.0).mul_(2.0).sub_(1.0)
        ref = ref[None, ...].expand(B * self.n_groups, -1, -1, -1)  # B * g H W 2
 
        return ref
 
    def forward(self, x):
        x = x
        B, C, H, W = x.size()
        dtype, device = x.dtype, x.device
 
        q = self.proj_q(x)
        q_off = einops.rearrange(q, 'b (g c) h w -> (b g) c h w', g=self.n_groups, c=self.n_group_channels)
        offset = self.conv_offset(q_off).contiguous()  # B * g 2 Hg Wg
        Hk, Wk = offset.size(2), offset.size(3)
        n_sample = Hk * Wk
 
        if self.offset_range_factor >= 0 and not self.no_off:
            offset_range = torch.tensor([1.0 / (Hk - 1.0), 1.0 / (Wk - 1.0)], device=device).reshape(1, 2, 1, 1)
            offset = offset.tanh().mul(offset_range).mul(self.offset_range_factor)
 
        offset = einops.rearrange(offset, 'b p h w -> b h w p')
        reference = self._get_ref_points(Hk, Wk, B, dtype, device)
 
        if self.no_off:
            offset = offset.fill_(0.0)
 
        if self.offset_range_factor >= 0:
            pos = offset + reference
        else:
            pos = (offset + reference).clamp(-1., +1.)
 
        if self.no_off:
            x_sampled = F.avg_pool2d(x, kernel_size=self.stride, stride=self.stride)
            assert x_sampled.size(2) == Hk and x_sampled.size(3) == Wk, f"Size is {x_sampled.size()}"
        else:
            x_sampled = F.grid_sample(
                input=x.reshape(B * self.n_groups, self.n_group_channels, H, W),
                grid=pos[..., (1, 0)],  # y, x -> x, y
                mode='bilinear', align_corners=True)  # B * g, Cg, Hg, Wg
 
        x_sampled = x_sampled.reshape(B, C, 1, n_sample)
        # self.proj_k.weight = torch.nn.Parameter(self.proj_k.weight.float())
        # self.proj_k.bias = torch.nn.Parameter(self.proj_k.bias.float())
        # self.proj_v.weight = torch.nn.Parameter(self.proj_v.weight.float())
        # self.proj_v.bias = torch.nn.Parameter(self.proj_v.bias.float())
        # 检查权重的数据类型
        q = q.reshape(B * self.n_heads, self.n_head_channels, H * W)
 
        k = self.proj_k(x_sampled).reshape(B * self.n_heads, self.n_head_channels, n_sample)
        v = self.proj_v(x_sampled).reshape(B * self.n_heads, self.n_head_channels, n_sample)
 
        attn = torch.einsum('b c m, b c n -> b m n', q, k)  # B * h, HW, Ns
        attn = attn.mul(self.scale)
 
        if self.use_pe and (not self.no_off):
 
            if self.dwc_pe:
                residual_lepe = self.rpe_table(q.reshape(B, C, H, W)).reshape(B * self.n_heads, self.n_head_channels,
                                                                              H * W)
            elif self.fixed_pe:
                rpe_table = self.rpe_table
                attn_bias = rpe_table[None, ...].expand(B, -1, -1, -1)
                attn = attn + attn_bias.reshape(B * self.n_heads, H * W, n_sample)
            elif self.log_cpb:
                q_grid = self._get_q_grid(H, W, B, dtype, device)
                displacement = (
                            q_grid.reshape(B * self.n_groups, H * W, 2).unsqueeze(2) - pos.reshape(B * self.n_groups,
                                                                                                   n_sample,
                                                                                                   2).unsqueeze(1)).mul(
                    4.0)  # d_y, d_x [-8, +8]
                displacement = torch.sign(displacement) * torch.log2(torch.abs(displacement) + 1.0) / np.log2(8.0)
                attn_bias = self.rpe_table(displacement)  # B * g, H * W, n_sample, h_g
                attn = attn + einops.rearrange(attn_bias, 'b m n h -> (b h) m n', h=self.n_group_heads)
            else:
                rpe_table = self.rpe_table
                rpe_bias = rpe_table[None, ...].expand(B, -1, -1, -1)
                q_grid = self._get_q_grid(H, W, B, dtype, device)
                displacement = (
                            q_grid.reshape(B * self.n_groups, H * W, 2).unsqueeze(2) - pos.reshape(B * self.n_groups,
                                                                                                   n_sample,
                                                                                                   2).unsqueeze(1)).mul(
                    0.5)
                attn_bias = F.grid_sample(
                    input=einops.rearrange(rpe_bias, 'b (g c) h w -> (b g) c h w', c=self.n_group_heads,
                                           g=self.n_groups),
                    grid=displacement[..., (1, 0)],
                    mode='bilinear', align_corners=True)  # B * g, h_g, HW, Ns
 
                attn_bias = attn_bias.reshape(B * self.n_heads, H * W, n_sample)
                attn = attn + attn_bias
 
        attn = F.softmax(attn, dim=2)
        attn = self.attn_drop(attn)
 
        out = torch.einsum('b m n, b c n -> b c m', attn, v)
 
        if self.use_pe and self.dwc_pe:
            out = out + residual_lepe
        out = out.reshape(B, C, H, W)
 
        y = self.proj_drop(self.proj_out(out))
        h, w = pos.reshape(B, self.n_groups, Hk, Wk, 2), reference.reshape(B, self.n_groups, Hk, Wk, 2)
 
        return y
```

四、添加DAT到你的网络中
-------------



### 4.1 DAT的yaml文件和训练过程

 下面是DAttention的训练过程和我添加的位置截图。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c3cc6aba31334a138cb489512a9a99d2.png)

**yaml文件截图如下**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7433751eb87543cea6a925878e91d6aa.png)

五、DAT可添加的位置
-----------

### 5.1推荐DAT可添加的位置 

DAT可以是一种即插即用的注意力机制，其可以添加的位置有很多，添加的位置不同效果也不同，所以我下面推荐几个添加的位，置大家可以进行参考，当然不一定要按照我推荐的地方添加。

> 1.  **残差连接中**：在残差网络的残差连接中加入注意力机制(这个位置我推荐的原因是因为DCN放在残差里面效果挺好的大家可以尝试)
>     
> 2.  **特征金字塔（SPPF）**：在特征金字塔网络之前，可以帮助模型更好地融合不同尺度的特征。
>     
> 3.  **Neck部分**：YOLOv8的Neck部分负责特征融合，这里添加注意力机制可以帮助模型更有效地融合不同层次的特征。
>     
> 4.  **输出层前**：在最终的输出层前加入注意力机制可以使模型在做出最终预测之前，更加集中注意力于最关键的特征。
>     

**大家可能看我描述不太懂，大家可以看下面的网络结构图中我进行了标注。**

### **5.2图示DAT可添加的位置** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3efa1bc815b6491db9c4fba4b986936b.png)
