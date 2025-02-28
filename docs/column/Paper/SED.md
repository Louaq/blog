# SED:A Simple Encoder-Decoder for Open-Vocabulary Semantic Segmentation 

## **天津大学，重庆大学等**

> 摘要：Open-vocabulary semantic segmentation strives to distinguish pixels into different semantic groups from an open
> set of categories. Most existing methods explore utilizing pre-trained vision-language models, in which the key is to
> adapt the image-level model for pixel-level segmentation task. In this paper, we propose a simple encoder-decoder,
> named SED, for open-vocabulary semantic segmentation, which comprises a hierarchical encoder-based cost map generation and a gradual fusion decoder with category early rejection. The hierarchical encoder-based cost map generation employs hierarchical backbone, instead ofplain transformer, to predict pixel-level image-text cost map.
> Compared to plain transformer, hierarchical backbone better captures local spatial information and has linear computational complexity with respect to input size. Our gradual fusion decoder employs a top-down structure to com-
> bine cost map and the feature maps of different backbone levels for segmentation. To accelerate inference speed, we
> introduce a category early rejection scheme in the decoder that rejects many no-existing categories at the early layer
> ofdecoder, resulting in at most 4.7 times acceleration without accuracy degradation. Experiments are performed on
> multiple open-vocabulary semantic segmentation datasets, which demonstrates the efficacy ofour SED method. When
> using ConvNeXt-B, our SED method achieves mIoU score of 31.6% on ADE20K with 150 categories at 82 millisecond (ms) per image on a single A6000. Our source code is available at https://github.com/xb534/SED

> 翻译：开放词汇语义分割旨在将像素划分到一个开放类别集中的不同语义组。大多数现有的方法尝试使用预训练的视觉-语言模型，关键是将图像级的模型适应为像素级的分割任务。本文提出了一种简单的编码器-解码器架构，称为SED，用于开放词汇语义分割。SED包含两部分：基于层次编码器的成本图生成和逐渐融合的解码器，并且具有类别早期拒绝的功能。基于层次编码器的成本图生成使用层次化的骨干网络，而不是传统的Transformer，来预测像素级的图像-文本成本图。与普通的Transformer相比，层次化骨干网络能够更好地捕捉局部空间信息，并且计算复杂度与输入的大小成线性关系。我们的逐渐融合解码器采用自上而下的结构，将成本图与不同层级骨干网络的特征图进行融合，完成分割任务。为了提高推理速度，我们在解码器中引入了类别早期拒绝方案，通过在解码器的早期层次中剔除不存在的类别，从而在不牺牲精度的情况下，实现最多4.7倍的加速。我们在多个开放词汇语义分割数据集上进行了实验，验证了SED方法的有效性。当使用ConvNeXt-B时，SED方法在ADE20K数据集上，针对150个类别的mIoU得分为31.6%，每张图像的推理时间为82毫秒（ms），运行于单个A6000显卡。我们的源代码可以通过https://github.com/xb534/SED下载。



**研究背景：** **传统的方法只能分割训练集的种类，不能识别出来在训练集中没有的未知场景**，同时两阶段和单阶段的方法都存在不足。两阶段的框架存在不足：计算效率低，没有充分利用上下文信息；单阶段的框架存在不足：对于低分辨率的输入，主干网络对空间信息变得不敏感，即使加入额外的网络来提供空间信息，也会增加计算资源，分割种类的增加也会增加计算资源。





**研究现状：**

- **语义分割方法**：传统语义分割方法主要有基于FCN和基于Transformer的方法。前者通过融合深浅层特征、利用空间金字塔网络或注意力模块等提取上下文信息；后者将Transformer用作骨干网络或分割解码器。
- **视觉-语言模型**：早期基于预训练的视觉和语言模型开发，后如CLIP从大规模图像-文本对数据中学习视觉特征，ALIGN从噪声图像-文本数据集中学习，在零样本任务上表现出色。
- **开放词汇语义分割**：早期通过学习特征映射对齐视觉和文本特征，CLIP成功后，出现基于两阶段和单阶段框架的方法。两阶段先生成掩码提案再分类，单阶段直接扩展视觉-语言模型进行分割。





**研究方法：**

- **Hierarchical Encoder-based Cost Map（基于分层编码器的代价图）**





- **Gradual Fusion Decoder（渐进式融合编码器）**







- **Category Early Rejection（类别早期拒接）**



![Snipaste_2025-02-28_08-53-28](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-28_08-53-28.png)





**实验设定（对比实验+消融实验）**

> 训练集：COCO-Stuff 的训练集，包含大约 118k 密集标注的 171 类目标。
> 测试集：跨数据集测试。
> ADE20K，包含 20K training 和 2K validation => A-150 和 A-847。
> PASCAL VOC，包含 1.5k training 和 1.5k validation => PAS-20。
> PASCAL-Context 来自原始的 PASCAL VOC 数据集 => PC-59 和 PC-459。



> 模型设定：
> 基于 ConvNeXt-B/L 视觉编码器形式的预训练 CLIP。
> 类别模板数量 P PP 同 CAT-Seg 一致，均为 80。
> 文本编码器冻结，只训练图像编码器和解码器。



> GPU: 4xA6000
> 图像编码器学习率多乘以一个 0.01 倍的因子。
> 共 80k 次迭代。
> 训练时剪裁图像 768 × 768 大小，测试时直接放缩图像到 768 × 768大小。

![Snipaste_2025-02-28_08-59-08](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-28_08-59-08.png)



![Snipaste_2025-02-28_08-59-43](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-28_08-59-43.png)







**实验结果：本文的SED方法都表现出较好的效果，缩短了推理时间**

![Snipaste_2025-02-28_09-00-24](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-28_09-00-24.png)





**结论与不足**

作者提出了用于**开放词汇语义分割**的SED方法，得出以下结论：

1. **方法构成**：SED由基于分层编码器的代价图生成和带有类别早期拒绝的渐进式融合解码器组成。先利用分层编码器生成像素级图像 - 文本代价图，再基于此和分层编码器的不同特征图，用渐进式融合解码器生成高分辨率特征图进行分割。
2. **速度提升**：在解码器中引入类别早期拒绝方案，能提前拒绝不存在的类别，有效提升推理速度。
3. **效果验证**：在多个数据集（ADE20K、PASCAL VOC、PASCA-Context）上的实验表明，SED在准确性和速度方面均有效。不过，模型在识别近义词类别时存在困难，未来将探索设计类别注意力策略或使用大规模细粒度数据集来解决该挑战。





**不足：**

**类别识别局限**：模型有时难以区分近义词类别，在对语义相近的类别进行分类和分割时存在困难，影响了对复杂场景的理解和处理能力

