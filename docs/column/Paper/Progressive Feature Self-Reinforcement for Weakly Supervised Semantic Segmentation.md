# Progressive Feature Self-Reinforcement for Weakly Supervised Semantic Segmentation
<ArticleMetadata/>
**Zhejiang Lab、Xidian University、Zhejiang University、University of Manchester**


## 摘要
<sapn class="marker-text">这里是重点</sapn>
Compared to conventional semantic segmentation with pixel-level supervision, **weakly supervised semantic segmentation(WSSS)** with image-level labels poses the challenge that it commonly focuses on the most discriminative regions, resulting in a disparity between weakly and fully supervision scenarios. A typical manifestation is the diminished precision on object boundaries, leading to deteriorated accuracy of WSSS. To alleviate this issue, we propose to adaptively partition the image content into certain regions (e.g., confident
foreground and background) and uncertain regions (e.g., object boundaries and misclassified categories) for separate processing. For uncertain cues, we propose an adaptive masking strategy and seek to recover the local information with self-distilled knowledge.We further assume that confident regions should be robust enough to preserve the global semantics, and introduce a complementary self-distillation method that constrains semantic consistency between confident regions and an augmented view with the same class labels. Extensive experiments conducted on PASCAL VOC 2012 and MS COCO 2014 demonstrate that our proposed single-stage approach for WSSS not only outperforms state-of-the-art counterparts but also surpasses multi-stage methods that trade complexity foraccuracy.

## 翻译

相较于需要像素级标注的传统语义分割方法，仅使用图像级标签的**弱监督语义分割 (Weakly Supervised Semantic Segmentation, WSSS)** 面临一个关键挑战：这类方法通常会过度关注最具区分度的区域，导致弱监督与全监督方法间存在显著性能差异。这种现象的典型表现是物体边界区域的识别精度下降，从而影响 WSSS 的整体准确性。为解决这一问题，我们提出将图像内容自适应划分为确定区域（如高置信度的前景和背景）与不确定区域（如物体边界和易混淆类别）进行差异化处理。针对不确定区域，我们设计了一种自适应掩码策略，通过**自蒸馏知识 (self-distilled knowledge)** 来恢复局部特征信息。同时我们提出，确定区域应当具备足够的鲁棒性以保持全局语义特征，为此开发了互补式自蒸馏方法，通过约束高置信区域与经过数据增强的同类别图像视图之间的语义一致性来强化模型。在 PASCAL VOC 2012 和 MS COCO 2014 数据集上的大量实验表明，我们提出的单阶段 WSSS 方法不仅超越了当前最先进的同类方案，其性能表现甚至优于那些通过增加模型复杂度来提升准确率的多阶段方法。

## 研究背景

本文聚焦于弱监督语义分割（WSSS）领域，旨在解决现有方法存在的问题，提升分割性能。研究背景如下：

- **WSSS的优势与挑战**：与传统的像素级监督语义分割相比，WSSS使用如边界框、涂鸦、点和图像级标签等“弱”标签，可降低标注成本。其中，图像级标签最为经济，但难以利用。 -
-  **现有方法的局限性**：基于图像级标签的WSSS常用方法是先训练图像分类网络，生成类激活图（CAMs）作为种子区域，再将其细化为伪分割标签来监督分割网络。然而，CAMs本质上存在缺陷，它主要关注对象最具判别性的区域，导致前景对象与背景的边界区域以及多语义不同对象内的误分类区域存在高度不确定性，影响分割精度。 
-  **本文的研究目标**：为解决上述问题，本文提出一种渐进式特征自我强化方法，通过自适应划分图像内容为确定区域和不确定区域并分别处理，以明确不确定区域的视觉语义，提高WSSS性能。 

## 研究现状

- **弱监督语义分割方法**：多阶段方法先通过分类模型生成类激活图（CAMs）作为伪标签，再训练分割模型评估性能，部分采用视觉变换器提升长程建模能力；单阶段方法将分类、伪标签细化和分割联合训练，但性能常不如多阶段方法。
- **自蒸馏方法**：将自监督学习与知识蒸馏结合，动态构建教师网络，简化训练过程并取得不错效果。

## 提出的模型

![Snipaste_2025-03-13_10-23-43](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-13_10-23-43.png)



采用**编码器 - 解码器**架构实现图像级监督的语义分割。

- **编码器**：使用在 ImageNet 上预训练的 ViT - B 视觉变压器，由图像级类标签监督。采用补丁令牌对比（PTC）进行亲和性学习，以约束最后一层补丁令牌之间的亲和性，防止过度平滑。
- **解码器**：借鉴 DeepLab 中的轻量级卷积解码器，由类激活映射（CAMs）生成的伪分割标签监督。
- **聚合模块**：将patch token汇总为一个类token。
- **投影器**：由 3 层感知器和权重归一化的全连接层组成，将所有令牌转换到合适的特征空间进行特征学习。
- **自蒸馏机制**：通过学生和教师管道实现自蒸馏，以改进模型训练。



## 实验（Compared with SOTA）

> 数据集：PASCAL VOC 2012、MS COCO 2014

![Snipaste_2025-03-13_10-26-30](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-13_10-26-30.png)



![Snipaste_2025-03-13_10-26-43](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-13_10-26-43.png)



- **PASCAL VOC 2012**：提出的特征自强化（FSR）方法在验证集和测试集上的mIoU分别达到75.7%和75.0%，显著优于其他单阶段方法，甚至超过了一些复杂的多阶段方法，如比BECO分别高2.0%和1.5%。与使用图像级标签和现成显著性图的多阶段方法相比，也取得了更优的性能。
- **MS COCO 2014**：在验证集上mIoU达到45.5%，优于之前的单阶段解决方案，略高于多阶段的MCTformer + 0.2%，进一步证明了该方法的优越性。





## 实验（Alabtion Experiments）

- **不确定特征选择分析**：比较了基于边缘和基于CAM的两种严格选择不确定特征的方法，基于CAM的选择略优于基于边缘的选择，且当基于CAM的选择不那么严格时，性能进一步提升，经验上掩码比率r = 0.4效果最佳。不确定特征掩码在大多数情况下比随机特征掩码性能更高，表明强化不确定特征对语义澄清很重要。

- **特征自强化分析**

  展示了FSR在不确定区域（unc.FSR）和确定区域（cer.FSR）的消融结果。unc.FSR在伪标签和预测标签上都有显著提升，证明了强化不确定特征的有效性。结合unc.FSR和cer.FSR可以进一步提高伪标签和预测标签的质量，表明强化确定特征与unc.FSR互补，增强了全局理解。

  - **unc.FSR分析**：通过分析注意力机制，计算每个注意力头在Transformer层上的平均注意力熵。应用unc.FSR时，深层（如第7 - 11层）的熵更高且更集中，表明unc.FSR通过提高深层的上下文程度有利于语义分割。
  - **cer.FSR分析**：将确定特征的注意力聚合（MCA）与全局平均池化（GAP）和全局最大池化（GMP）两种传统方法进行比较。GAP性能优于GMP，MCA大幅优于GAP，表明注意力加权机制优于平均加权。可视化的类到补丁注意力图显示类令牌可以自适应地学习关注目标区域。

- **数据增强**：与其他数据增强方法的比较结果表明，数据增强对性能的影响有限。例如，加入高斯模糊或日光化处理时，性能在预期范围内波动；使用强大的AutoAugment时，结果略有下降，因为强增强可能会干扰分割目标。



## 结论

作者提出了一种**基于语义不确定性引导的弱监督语义分割方法**，并将其集成到单阶段框架中，在PASCAL VOC 2012和MS COCO 2014基准上验证了有效性。具体结论如下： 1. **方法设计有效**：设计了基于激活的掩码策略，利用自蒸馏知识恢复局部信息，并引入自蒸馏方法增强语义一致性，能有效估计边界。 2. **性能表现优异**：在两个基准测试中，所提方法显著优于其他单阶段方法，甚至超过了一些复杂的多阶段方法，证明了基于Transformer的单阶段训练的有效性。 3. **消融实验验证**：消融实验表明，增强不确定特征和确定特征对语义分割都很重要，两者结合可进一步提高伪标签和预测标签的质量。 



> 启发：弱监督语义分割、自蒸馏


