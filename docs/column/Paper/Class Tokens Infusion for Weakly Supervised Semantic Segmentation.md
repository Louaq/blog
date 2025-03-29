# Class Tokens Infusion for Weakly Supervised Semantic Segmentation

<ArticleMetadata/>

KAIST



::: tip

不推荐阅读

:::

## 摘要

**Weakly Supervised Semantic Segmentation (WSSS)** relies on Class Activation Maps (CAMs) to extract spatial information from image-level labels. With the success of Vision Transformer (ViT), the migration of ViT is actively conducted in WSSS. This work proposes a novel WSSS framework with Class Token Infusion (CTI). By infusing the class tokens from images, we guide class tokens to possess class-specific distinct characteristics and global-local consistency. For this, we devise two kinds of token infusion: 1) Intra-image Class Token Infusion (I-CTI) and 2)Cross-image Class Token Infusion (C-CTI). In I-CTI, we infuse the class tokens from the same but differently augmented images and thus make CAMs consistent among var-
ious deformations (i.e. view, color). In C-CTI, by infusing the class tokens from the other images and imposing the resulting CAMs to be similar, it learns class-specific distinct characteristics. Besides the CTI, we bring the background (BG) concept into ViT with the BG token to reduce the false positive activation ofCAMs. We demonstrate the effectiveness ofour method on PASCAL VOC 2012 and MS COCO 2014 datasets, achieving state-of-the-art results in weakly supervised semantic segmentation. The code is available at https://github.com/yoon307/CTI.

## 翻译

弱监督语义分割(WSSS)依靠类激活图(CAMs)从图像级标签中提取空间信息。随着视觉transformer(ViT)的成功，视觉transformer的迁移在WSSS中得到了积极的开展。本文提出了一种基于类标记注入(CTI)的WSSS框架。通过注入来自图像的类标记，我们引导类标记具有特定于类的独特特征和全局-局部一致性。为此，我们设计了两种标记注入:1)图像内类标记注入(I-CTI)和2)跨图像类标记注入(C-CTI)。在I-CTI中，我们从相同但不同的增强图像中注入类标记，从而使cam在各种变形(即视图，颜色)之间保持一致。在C-CTI中，通过注入来自其他图像的类标记并强制生成的cam相似，它学习特定于类的独特特征。除了CTI之外，我们还通过BG标记将背景(BG)概念引入ViT，以减少cam的误报激活。我们在PASCAL VOC 2012和MS COCO 2014数据集上证明了我们的方法的有效性，在弱监督语义分割中取得了最先进的结果。代码可在https://github.com/yoon307/CTI上获得。



## 研究背景

本文聚焦于弱监督语义分割（WSSS）领域，旨在解决现有方法存在的问题，具体研究背景如下： 
- **WSSS的兴起**：全监督语义分割虽在多领域表现出色，但标注成本高、耗时长。为减轻标注负担，WSSS应运而生，其利用图像级标签、涂鸦和边界框等弱监督信息进行研究，其中仅利用图像级分类标签的设置最具实用性和挑战性。
-  **现有方法的局限性**：传统WSSS研究多依赖卷积神经网络（CNNs）生成类激活图（CAMs），但CNN的感受野有限，导致CAMs存在稀疏性问题，仅关注物体的判别区域。Vision Transformer（ViT）虽能缓解该问题，但原始ViT使用单类令牌进行分类，定位图缺乏类别特异性，且基于多类令牌的ViT仍存在类令牌特征表示相关性高、CAMs过度扩展导致假阳性区域增加等问题。



## 研究现状

- **弱监督语义分割（WSSS）**：利用图像级标签、涂鸦、边界框等弱监督信息进行研究，其中基于图像级分类标签的研究最具挑战性。主要通过类激活图（CAMs）定位目标，为提高CAMs精度，出现了对抗擦除、局部 - 全局一致性等方法，也有不少工作对CAMs进行后处理以获取可靠标签。
- **基于视觉Transformer（ViT）的WSSS**：ViT凭借自注意力机制能捕捉长距离依赖，缓解了CAMs稀疏性问题。一些工作采用多类令牌或直接用补丁令牌训练分类器来提取特定类别的激活图。



## 提出的模型



本文提出了一种基于视觉Transformer（ViT）的弱监督语义分割（WSSS）框架，该框架引入了类令牌注入（Class Token Infusion，CTI）和背景令牌（Background Token，BGT）两种方法，以解决传统多类令牌WSSS方法的局限性，生成更精确的类激活图（Class Activation Maps，CAMs）。

### 整体框架

使用三个配对图像进行训练，将每个图像分割成 $N \times N$ 个补丁并嵌入为补丁令牌 $T_{patch}$，同时使用 $C$ 个前景类令牌 $T_{cls - fg}$ 和 1 个背景类令牌 $T_{cls - bg}$ 组成输入类令牌 $T_{cls}$。将类令牌和补丁令牌连接形成输入令牌 $T_{input}$，添加位置嵌入后输入到 $L$ 个Transformer块中。从最后一个Transformer块的补丁令牌输出 $T_{L_{patch}}$ 中获取CAMs $M$，并通过池化类令牌输出 $T_{L_{cls}}$ 得到类预测 $y_{pred}$，使用多标签软边缘损失计算分类损失 $L_{cls}$ 和补丁级分类损失 $L_{cls - patch}$。



![Snipaste_2025-03-29_21-01-48](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-29_21-01-48.png)

## 实验（Compared with SOTA）

>1. **数据集**：选用PASCAL VOC 2012和MS - COCO 2014这两个广泛使用的基准数据集。前者包含20个前景对象类和1个背景类，有10582、1449和1456张图像分别用于训练集、验证集和测试集；后者更具挑战性，有82k训练集和40k验证集，包含80个前景对象类和1个背景类。
>2. **评估指标**：采用平均交并比（mIoU）评估语义分割性能，在验证集上评估语义分割模型，在训练集上评估类激活图（CAMs）性能，PASCAL VOC 2012测试集结果通过在线官方服务器评估。





1. **PASCAL VOC数据集**：在训练集上，所提方法在CAMs（种子）和伪像素级真值（掩码）方面性能均优于其他方法，相比第二好的结果，种子性能提升1.8%p，掩码性能提升0.9%p。在语义分割性能上，基于高质量标签训练的模型在验证集和测试集上均大幅超越现有技术，且语义分割模型性能优于伪标签，比第二好的模型在验证集上有超过1.7%p的提升。
2. **MS COCO数据集**：在该数据集上训练和评估模型，虽数据集类别多、场景复杂，但所提方法取得45.4%的mIoU，显示出良好的泛化能力，有效减少了ViT - based WSSS方法在该数据集上因错误激活和类间激活重叠导致的性能差距。







## 实验（Ablation Experiments）:1st_place_medal:

1. 组件分析
   - 引入背景类令牌（BGT）和背景CAMs概念到ViT，相比基线有2.9%p的提升。
   - 提出的图像内类令牌注入（I - CTI）额外带来1.1%p的性能提升。
   - 结合图像间类令牌注入（C - CTI），性能提升至69.5%。
2. **背景类令牌的重要性**：训练无BGT但有BG CAM的基线模型，结果比基线下降4.1%p，凸显BGT在训练BG CAM中的重要性。
3. **类令牌注入的作用**：通过t - SNE可视化不同层的类令牌，表明所提方法的类令牌在各层特征空间区分度好，生成的CAMs更具独特性，不侵犯其他类区域，而基线的类令牌区分度差，CAMs存在错误激活区域。
4. **注入索引的影响**：改变注入索引L1从2到10（总层数L为12），mIoU性能在L1设为3时最高，虽不同索引有轻微性能差异，但均高于无CTI的情况，因此将注入索引设为3。

## 结论

作者旨在增强ViT中类别令牌的特定类别表示能力，以实现图像中物体的清晰定位，得出以下结论：
1. **提出CTI方法**：提出两种类别令牌注入（CTI）方法，即图像内类别令牌注入（I - CTI）和跨图像类别令牌注入（C - CTI）。I - CTI使激活图具有全局 - 局部一致性，C - CTI让类别令牌和激活图具备跨图像的一致特定类别知识。 
2. **引入背景令牌**：将背景令牌（BGT）引入ViT，有效解决了激活图过度扩展问题，减少了错误激活。
3. **实验验证有效性**：在PASCAL VOC 2012和MS COCO 2014数据集上的大量实验结果，支持了所提方法的有效性和泛化性，该方法在两个数据集上均达到了最先进水平。 





