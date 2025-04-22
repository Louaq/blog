# Rolling-Unet: Revitalizing MLP’s Ability to Efficiently Extract Long-Distance Dependencies for Medical Image Segmentation

<ArticleMetadata/>

北京化工大学

::: tip

会议论文写作模板，复现论文代码

:::

## 摘要

**Medical image segmentation** methods based on deep learning network are mainly divided into CNN and Transformer. However, CNN struggles to capture long-distance dependencies, while Transformer suffers from high computational complexity and poor local feature learning. To efficiently extract and fuse local features and long-range dependencies, this paper proposes Rolling-Unet, which is a CNN model combined with MLP. Specifically, we propose the core R-MLP module, which is responsible for learning the long-distance dependency in a single direction of the whole image. By controlling and combining R-MLP modules in different directions, OR-MLP and DOR-MLP modules are formed to capture long-distance dependencies in multiple directions. Further, Lo2 block is proposed to encode both local context information and long-distance dependencies without excessive
computational burden. Lo2 block has the same parameter size and computational complexity as a 3×3 convolution. The experimental results on four public datasets show that Rolling-Unet achieves superior performance compared to the state-of-
the-art methods.

## 翻译

基于深度学习网络的医学图像分割方法主要分为CNN和transformer。然而，CNN很难捕获长距离依赖关系，而transformer则存在计算复杂度高和局部特征学习能力差的问题。为了有效地提取和融合局部特征和远程依赖关系，本文提出了一种结合MLP的CNN模型rollling - unet。具体来说，我们提出了核心R-MLP模块，该模块负责学习整个图像在单一方向上的长距离依赖关系。通过对不同方向的R-MLP模块进行控制和组合，形成OR-MLP和DOR-MLP模块，以捕获多方向的远程依赖关系。此外，在不增加计算负担的情况下，提出了Lo2块对本地上下文信息和远程依赖关系进行编码。Lo2块具有与3×3卷积相同的参数大小和计算复杂度。在四个公共数据集上的实验结果表明，RollingUnet的性能优于当前的方法。

## 研究背景

这篇文章聚焦于医疗图像分割领域，旨在解决现有方法在提取和融合局部特征与长距离依赖关系方面的不足，具体研究背景如下： 
1. **CNN的局限性**：基于卷积神经网络（CNN）的医疗图像分割方法虽有发展，如U-Net及其变体，但卷积操作的固有局部性使其难以学习清晰的全局和远程语义信息。 
2. **Transformer的问题**：受自然语言处理中Transformer成功的启发，研究者将其引入视觉领域，但它需要大量训练数据，计算复杂度高，且在捕捉局部特征方面表现不佳，如Vision Transformer和Swin Transformer等。 
3. **CNN与Transformer结合的不足**：一些方法尝试结合CNN和Transformer，但仍无法很好地平衡性能和计算成本。
4. **MLP的困境**：多层感知器（MLP）理论上是通用逼近器，但计算量大、易过拟合，输入扁平化限制分辨率，虽有改进工作，但在医疗图像分割领域应用较少，且现有模型难以兼顾局部和全局特征。 因此，文章提出Rolling-Unet，结合CNN和MLP，以有效提取和融合局部特征与长距离依赖关系，实现更准确的医疗图像分割。 

## 研究现状

- **CNN 方法**：以 U-Net 为代表，后续有 UNet++、Att - UNet 等改进模型，通过引入注意力机制、图像金字塔等技术提升性能，但受卷积操作局部性限制，**难以学习全局和远程语义信息**。
- **Transformer 方法**：如 Vision Transformer、Swin Transformer 等被引入医学图像领域，能捕捉远程依赖，但**计算复杂度高，对训练数据量要求大**，且在捕捉局部特征方面表现不佳。
- **CNN 与 Transformer 结合方法**：如 MedT、UCTransNet 等，尝试融合二者优势，但仍难以平衡性能和计算成本。
- **MLP 方法**：MLP - Mixer 复兴了 MLP 在图像任务中的应用，后续工作引入局部先验，但大多仅具备局部感受野，在医学图像领域基于 MLP 的分割模型较少。

## 提出的模型

![Snipaste_2025-04-22_20-04-47](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-22_20-04-47.png)





![Snipaste_2025-04-22_20-10-46](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-22_20-10-46.png)





![Snipaste_2025-04-22_20-10-52](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-22_20-10-52.png)



### 核心模块

1. **R-MLP模块**：负责学习整个图像在单个方向上的长距离依赖关系。对特征矩阵中每个通道层的特征图沿同一方向进行滚动操作（包括移位和裁剪两步），然后在每个空间位置索引处进行通道投影以编码长距离依赖。该操作初步降低了MLP对位置信息的敏感性，使用权重共享进一步减少了这种敏感性。
2. **OR-MLP模块**：通过先沿宽度方向应用R - MLP，再沿高度方向应用R - MLP，形成正交滚动MLP模块，能够捕获多个方向的远程依赖关系。
3. **DOR-MLP模块**：将两个互补的OR - MLP模块并行化，可捕获宽度、高度、正对角线和负对角线四个方向的长距离依赖关系。
4. **Lo2块**：由DOR - MLP模块和深度可分离卷积（DSC）模块并行组成，能够同时提取图像的局部上下文信息和长距离依赖关系，且参数和计算量与3×3卷积处于同一水平。
5. **Feature Incentive Block (特征激励块)**：用于编码器的第4层和瓶颈层，主要对特征和通道数量变化进行编码。在编码器第4层采用GELU激活函数和LayerNorm；在解码器第4层，由卷积块、RELU激活函数和BatchNorm组成。

### 网络架构

Rolling-Unet采用U-Net的U形框架，包括**编码器-解码器结构**、**瓶颈层**和**跳跃连接**。编码器 解码器有四个下采样和上采样阶段，分别通过最大池化和双线性插值实现。前三层包含标准的3×3卷积块，第四层和瓶颈层使用特征激励块和Lo2块。跳跃连接通过相加融合相同尺度的特征。

## 实验（Compared with SOTA）

> 数据集：
>
> ISIC 2018：用于皮肤病诊断的图像数据集，包含多种皮肤病的图像和相应的标签
>
> BUSI：乳腺超声图像
>
> CHASEDB1：眼底血管分割
>
> GlaS：结直肠腺体组织的分割任务



- **对比方法**：将Rolling - Unet与其他先进方法进行对比，包括基于CNN的U - Net、UNet++、Att - Unet、DconnNet；基于Transformer的UCTransNet、MedT；基于MLP的UNeXt。
- **评估指标**：采用交并比（IoU）、F1分数和95%豪斯多夫距离（HD95）作为评估指标。
- **实验结果**：Rolling - Unet在所有数据集上均优于其他方法。在BUSI和ISIC 2018数据集上优势显著，能更有效地提取远程依赖关系以提升分割性能。在ISIC 2018上改变图像大小的实验进一步验证了这一点，只有Rolling - Unet和UNeXt在图像尺寸增大时性能保持稳定。在GlaS和CHASEDB1数据集上，虽无方法取得显著优势，但Rolling - Unet表现最佳且标准差小。



![Snipaste_2025-04-22_20-17-07](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-22_20-17-07.png)





## 实验（Ablation Experiments）:1st_place_medal:

在ISIC 2018数据集（图像大小为512）上进行消融实验，以研究各因素对模型性能的影响。

- **Lo2模块分析**：Lo2块由DOR - MLP和DSC模块并行组成。实验表明，无论DSC模块是否存在，R - MLP、OR - MLP和DOR - MLP的性能逐步提升，证明了所提模块捕获长距离依赖的有效性，且与DSC模块结合可进一步提升性能，说明融合远程依赖和局部上下文信息至关重要。
- **R - MLP作用验证**：将Rolling - Unet中的R - MLP替换为常规MLP，模型失去捕获长距离依赖的能力，性能显著下降。
- **模块组合方式探究**：对比DOR - MLP和DSC的不同组合方式（先执行DOR - MLP再执行DSC、先执行DSC再执行DOR - MLP、并行连接），结果表明并行连接效果最佳，说明提取局部特征和远程依赖的顺序不重要，同时提取后融合效果最好。



![Snipaste_2025-04-22_20-17-45](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-22_20-17-45.png)

## 结论

作者提出的Rolling-Unet模型能在不增加计算成本的情况下捕获长距离依赖关系，且性能优于现有方法。具体结论如下： 

1. 多方向的远程依赖并非严格意义上的全局感受野，是MLP的一种折中，但R - MLP模块灵活，组合使用可捕获大规模区域甚至全局特征，未来将深入探索。 
2. 在四个不同数据集上，Rolling - Unet在初级和次级模型中表现最佳，尤其在BUSI和ISIC 2018数据集上优势显著，能有效提取目标轮廓，提升分割性能。 
3. 消融实验表明，融合远程依赖和局部上下文信息至关重要，同时提取并融合二者效果最佳。未来，作者还将研究其在三维医学图像分割及其他图像任务中的潜力。 









