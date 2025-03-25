# Towards Open-Vocabulary Semantic Segmentation Without Semantic Labels

<ArticleMetadata/>

韩国科学技术院、Korea University、Google Research

::: tip

晦涩

:::

## 摘要

Large-scale vision-language models like CLIP have demonstrated impressive open-vocabulary capabilities for image-level tasks, excelling in recognizing what objects are present. However, they struggle with pixel-level recognition tasks like semantic segmentation, which additionally require understanding where the objects are located. In this work, we propose a novel method, PixelCLIP, to adapt the CLIP image encoder for pixel-level understanding by guiding the model on where, which is achieved using unlabeled images and masks generated from vision foundation models such as SAM and DINO. To address the challenges of leveraging masks without semantic labels, we devise an online clustering algorithm using learnable class names to acquire general semantic concepts. PixelCLIP shows significant performance improvements over CLIP and competitive results compared to caption supervised methods in open-vocabulary semantic segmentation. Project page is available at https://cvlab-kaist.github.io/PixelCLIP

## 翻译

像CLIP这样的大规模视觉语言模型已经为图像级任务展示了令人印象深刻的开放词汇表能力，在识别存在的对象方面表现出色。然而，他们在像语义分割这样的像素级识别任务中挣扎，这还需要理解物体的位置。在这项工作中，我们提出了一种新的方法，PixelCLIP，通过引导模型在哪里来调整CLIP图像编码器以进行像素级理解，这是使用从视觉基础模型(如SAM和DINO)生成的未标记图像和掩码来实现的。为了解决在没有语义标签的情况下利用掩码的挑战，我们设计了一种使用可学习类名来获取一般语义概念的在线聚类算法。在开放词汇语义分割中，与字幕监督方法相比，PixelCLIP表现出了显著的性能改进和竞争结果。项目页面可访问https://cvlab-kaist.github.io/PixelCLIP





## 研究背景

**语义分割**是计算机视觉中的基础任务，旨在为图像中每个像素识别类别标签。但传统分割数据集获取密集标注的语义标签需大量人力，限制了其可扩展性。 近年来，大规模预训练视觉-语言模型（如CLIP、ALIGN）推动了开放词汇语义分割的发展，能将语义分割推广到无限类别的范围。然而，这些模型在进行语义分割时仍需像素级语义标签。 部分研究尝试在无密集标注语义标签的情况下进行开放词汇语义分割，利用图像级语义标签（如图像标题）增强预训练视觉 - 语言模型。但图像标题通常只提供图像中有什么，而不包含物体位置信息，导致模型只能隐式学习物体位置，性能不佳或需大量图像-标题对来弥补弱监督。 因此，本文提出一种新方法PixelCLIP，不依赖语义标签，而是利用视觉基础模型（如DINO、SAM）生成的掩码引导预训练视觉 - 语言模型（如CLIP）关注物体位置，以实现开放词汇语义分割，解决现有方法的不足。 



## 研究现状

- **大模型助力开放词汇语义分割**：大规模预训练视觉 - 语言模型，如CLIP和ALIGN，推动了开放词汇语义分割的发展，可将语义分割推广到无限类别的范围。
- **弱监督方法兴起**：部分研究尝试在无密集标注语义标签的情况下进行开放词汇语义分割，利用图像级语义标签（如图像字幕）增强预训练模型，但存在信息缺失问题。
- **视觉基础模型应用**：如DINO和SAM等视觉基础模型可生成细粒度掩码，但掩码无语义标签。



## 提出的模型

![Snipaste_2025-03-25_16-05-19](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-25_16-05-19.png)



1. 掩码集成到CLIP特征
   - 由于没有语义标签，作者通过掩码池化将无标签掩码集成到CLIP图像特征图中，得到每个掩码的CLIP特征。
   - 利用这些特征计算图像 - 掩码相似度图，并使用二元掩码损失对模型进行监督，以微调CLIP图像编码器。
   - 为了缓解相似度图和掩码之间的分辨率差距，使用轻量级解码器进行上采样。
2. 掩码的语义聚类
   - **在线聚类**：为了解决DINO和SAM生成的掩码过度分割问题，作者提出使用可学习的类提示将语义相似的掩码聚类成全局共享的簇。每个簇由CLIP文本特征表示为质心，通过优化图像 - 文本相似度和熵正则化来确定掩码的分配。
   - **动量编码器**：为了稳定训练过程，使用动量编码器来提取掩码池化特征，避免训练过程中的不稳定性和预训练知识的遗忘。



## 实验（Compared with SOTA）



1. **开放词汇语义分割**：PixelCLIP在所有基准测试中均显著优于CLIP，平均mIoU提高了16.2。与使用图像级监督的方法相比，PixelCLIP在不使用语义标签的情况下表现出竞争力，甚至在某些基准测试中超过了这些方法。
2. **零样本掩码分类**：PixelCLIP可以直接应用于现有的使用CLIP作为零样本掩码分类器的框架，通过简单替换CLIP模型和权重，即可带来即时的性能提升。

![Snipaste_2025-03-25_16-08-46](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-25_16-08-46.png)



## 实验（Ablation Experiments）:1st_place_medal:



1. **消融研究**：通过消融研究验证了模型设计的关键组件，包括全局语义聚类、可学习类提示和动量编码器的重要性。同时，研究了聚类数量、可学习提示令牌长度等因素对模型性能的影响。

![Snipaste_2025-03-25_16-09-10](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-25_16-09-10.png)



## 结论

作者提出了**PixelCLIP框架用于开放词汇语义分割**，得出以下结论：
1. **方法有效性**：PixelCLIP通过利用无标签图像和掩码微调预训练**视觉-语言模型**，在开放词汇语义分割任务中显著提升了CLIP的性能，平均mIoU提高了16.2，且优于使用图像级语义标签的方法。
2. **聚类与提示学习作用**：提出的全局语义聚类和可学习类提示方法，能有效解决无标签掩码带来的挑战，使模型学习到通用语义概念，对框架性能提升至关重要。
3.  **适用性与改进**：PixelCLIP可应用于现有利用CLIP进行零样本掩码分类的框架，简单替换CLIP即可带来即时改进。 



