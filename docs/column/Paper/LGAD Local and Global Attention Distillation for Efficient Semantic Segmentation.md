# LGAD: Local and Global Attention Distillation for Efficient Semantic Segmentation

<ArticleMetadata/>

Shaoxing University、Central South University

## 摘要

Efficient **semantic segmentation** is essential for a wide array of computer vision applications, and knowledge distillation has emerged as a promising methodology for model compression and efficiency. However, we observed that an excess of positive pixels can dilute attention weights, hindering the student model’s learning process. To tackle this significant challenge, we introduce the Local and Global Attention Distillation (LGAD) framework, a pioneering block-based technique that distills both local and global attention. The LGAD framework segments feature maps and output probabilities into well-defined local and global blocks, effectively mitigating the dilution of attention weights. By doing so, it enhances the distinction between positive and negative pixels, particularly amplifying the focus on salient regions within each local and global block. We have conducted comprehensive experiments on three benchmark datasets, Cityscapes, CamVid, and Pascal VOC 2012. The experiment results demonstrate the effectiveness of our proposed LGAD and confirm its superiority over several state-of-the-art distillation methods for semantic segmentation.

::: tip

**正像素：通常表示目标、高亮度、激活区域或有效数据。**

**负像素：通常表示背景、低亮度、抑制区域或噪声/无效数据**

:::

## 翻译

高效的语义分割对于广泛的计算机视觉应用至关重要，知识蒸馏已经成为一种很有前途的模型压缩和效率方法。然而，我们观察到过多的正像素会稀释注意力权重，阻碍学生模型的学习过程。为了应对这一重大挑战，我们引入了局部和全局注意力蒸馏(LGAD)框架，这是一种开创性的基于块的技术，可以提取局部和全局注意力。LGAD框架将特征图和输出概率分割为定义良好的局部和全局块，有效地减轻了注意力权重的稀释。通过这样做，它增强了正像素和负像素之间的区别，特别是放大了对每个局部和全局块内显著区域的关注。我们在cityscape、CamVid和Pascal VOC 2012三个基准数据集上进行了全面的实验。实验结果证明了我们所提出的语义分割方法的有效性，并证实了它比几种最先进的语义分割方法的优越性。

## 研究背景



语义分割在**自动驾驶、机器人导航**等众多实际应用中至关重要，深度卷积神经网络（DCNNs）成为主流方法，如PSPNet、DeepLab系列等。然而，这些模型存在存储和计算开销大的问题，限制了其在现实场景中的部署，因此开发紧凑且高效的分割模型成为研究热点。 知识蒸馏是一种有前景的模型压缩技术，可通过将大而复杂模型（教师模型）的知识转移到小模型（学生模型）来提升学生模型性能。已有研究者将知识蒸馏引入高效语义分割并提出多种框架，但现有知识蒸馏方法主要集中于全局交互的蒸馏。 研究发现过多正像素会稀释注意力权重，导致正、负像素注意力值差距小，阻碍学生模型识别和学习特征。如图1所示，正像素注意力值约为0.0004，背景像素近于零。为解决这一挑战，作者提出了**Local and Global Attention Distillation（LGAD）**框架，旨在通过将特征图和输出概率划分为局部和全局块，增强正、负像素注意力值差距，提升学生模型的语义分割性能。 

## 研究现状



- **语义分割模型**：**深度卷积神经网络（DCNNs）**成为主流方法，如PSPNet、DeepLab系列等取得了不错的性能，但存在存储和计算开销大的问题。为解决此问题，出现了一些**轻量级框架**，如ENet、SegNet等，还有基于**Vision Transformer**的语义分割框架。
- **知识蒸馏**：作为模型压缩的有效技术，被广泛应用于语义分割。现有方法主要集中在对齐中间特征图和输出概率，如SKDS、IFVD、IDD等，但大多聚焦于全局交互的蒸馏。

## 提出的模型

![Snipaste_2025-03-31_10-44-32](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-31_10-44-32.png)

本文提出了用于高效**语义分割的局部和全局注意力蒸馏（Local and Global Attention Distillation，LGAD）**框架。

**模型组件**

- **局部注意力特征蒸馏（Local Attention Feature Distillation）**：聚焦于蒸馏教师模型中间特征图中的有价值知识，让学生模型关注教师模型表示中的关键区域。
- **局部注意力输出蒸馏（Local Attention Output Distillation）**：旨在蒸馏分割输出中的有价值知识，使学生模型获得教师模型关注特定感兴趣区域并进行精确预测的能力。
- **全局注意力特征蒸馏（Global Attention Feature Distillation）**：与局部注意力特征蒸馏类似，但侧重于全局层面的特征蒸馏。
- **全局注意力输出蒸馏（Global Attention Output Distillation）**：与局部注意力输出蒸馏类似，但侧重于全局层面的输出蒸馏



**损失函数**：总损失函数为$L = L_{seg} + \lambda_1 \cdot (L_{lafd} + L_{gafd}) + \lambda_2 \cdot (L_{laod} + L_{gaod})$，其中$L_{seg}$是语义分割的交叉熵损失，$\lambda_1 = 30$和$\lambda_2 = 3$是两个超参数，用于平衡LGAD框架中不同组件的影响。



## 实验（Compared with SOTA）

数据集：Cityscapes、Pascal VOC 2012、CamVid

评估指标：mIoU、模型参数、浮点运算次数（FLOPs）



- **Cityscapes**：在验证集上，对于PSPNet - R18学生模型，LGAD将mIoU提升了7.12%，优于SKDS、IFVD、CWD和APD等方法；对于PSPNet - B0学生模型，LGAD使mIoU提升了7.39%，也超过了对比方法。
- **CamVid**：在测试集上，LGAD能提升两个学生模型的性能。对于PSPNet - R18，提升了2.9%，超过SKDS、IFVD和CWD；对于PSPNet - B0，提升了3.5%，同样优于对比方法。
- **Pascal VOC 2012**：在验证集上，LGAD大幅提升了两个学生模型的性能。对于PSPNet - R18，mIoU提升了5.39%；对于PSPNet - B0，提升了2.98%，均超过了对比方法。

![Snipaste_2025-03-31_10-48-49](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-31_10-48-49.png)





![Snipaste_2025-03-31_10-48-58](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-31_10-48-58.png)



![Snipaste_2025-03-31_10-49-03](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-31_10-49-03.png)









## 实验（Ablation Experiments）:1st_place_medal:



- **不同损失项的有效性**：在Cityscapes验证集上，以PSPNet - R18为学生模型进行实验。结果表明，局部和全局注意力输出蒸馏损失（Llaod和Lgaod）能独立提升学生模型性能，且二者结合效果更佳；局部和全局注意力特征蒸馏损失（Llafd和Lgafd）同时应用时也能进一步提升性能；当四个蒸馏损失项都应用时，提升达到7.12%，验证了LGAD的有效性和整合局部与全局注意力蒸馏的重要性。
- **窗口大小的影响**：研究了不同局部块数量（P×P）和全局块数量（G×G）对蒸馏的影响，设置P = G = {1, 2, 4, 8}。结果显示，窗口数量为2×2时带来最高的mIoU值76.22%，随着窗口数量增加，学生模型的mIoU得分略有下降，这表明窗口数量过大时，学生模型可能难以有效学习。



![Snipaste_2025-03-31_10-49-40](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-31_10-49-40.png)



## 结论

作者针对**知识蒸馏**在语义分割中存在的正像素过多稀释注意力权重、阻碍学生模型学习的问题，提出了**Local and Global Attention Distillation（LGAD）框架**。该框架将特征图和输出概率划分为块，设计局部和全局注意力蒸馏方法，增强了学生模型识别和学习判别特征的能力。 通过在Cityscapes、CamVid和Pascal VOC 2012三个基准数据集上的大量实验，验证了LGAD框架的有效性，且其性能优于多个现有最先进的知识蒸馏方法。作者认为该方法在语义分割领域引入了有意义的进展，为开发轻量级且准确的密集预测模型提供了有价值的见解。 





