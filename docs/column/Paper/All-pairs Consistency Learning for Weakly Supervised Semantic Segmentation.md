# All-pairs Consistency Learning for Weakly Supervised Semantic Segmentation

<ArticleMetadata/>

澳大利亚国立大学、OpenNLPLab、上海人工智能实验室、厦门大学、OPPO研究院

::: tip

启发

:::





## 摘要

In this work, we propose a new **transformer-based regularization** to better localize objects for **Weakly supervised semantic segmentation (WSSS)**. In image-level WSSS, Class Activation Map (CAM) is adopted to generate object localization as pseudo segmentation labels. To address the partial activation issue of the CAMs, consistency regularization is employed to maintain activation intensity invariance across various image augmentations. However, such methods ignore pair-wise relations among regions within each CAM, which capture context and should also be invariant across image views. To this end, we propose a new
all-pairs consistency regularization (ACR). Given a pair of augmented views, our approach regularizes the activation intensities between a pair of augmented views, while also ensuring that the affinity across regions within each view remains consistent. We adopt vision transformers as the self-attention mechanism naturally embeds pair-wise affinity. This enables us to simply regularize the distance between the attention matrices of augmented image pairs. Additionally, we introduce a novel class-wise localization
method that leverages the gradients ofthe class token. Our method can be seamlessly integrated into existing WSSS methods using transformers without modifying the architectures. We evaluate our method on PASCAL VOC and MS COCO datasets. Our method produces noticeably better class localization maps (67.3% mIoU on PASCAL VOC train), resulting in superior WSSS performances.

## 翻译

在这项工作中，我们提出了一种新的**基于变换的正则化方法**来更好地定位弱监督语义分割(WSSS)的对象。在图像级WSSS中，采用类激活图(Class Activation Map, CAM)生成目标定位作为伪分割标签。为了解决cam的部分激活问题，采用一致性正则化方法在不同的图像增强中保持激活强度的不变性。然而，这些方法忽略了每个CAM内区域之间的成对关系，这种关系捕获上下文，并且应该在图像视图之间保持不变。为此，我们提出了一种新的全对一致性正则化(ACR)。给定一对增强视图，我们的方法规范了一对增强视图之间的激活强度，同时还确保每个视图中跨区域的亲和性保持一致。我们采用视觉Transformer作为自注意力机制机制，自然嵌入成对的亲和力。这使我们能够简单地正则化增广图像对的注意矩阵之间的距离。此外，我们引入了一种新的类智能定位方法，利用类标记的梯度。我们的方法可以使用Transformer无缝集成到现有的WSSS方法中，而无需修改体系结构。我们在PASCAL VOC和MS COCO数据集上评估了我们的方法。我们的方法产生了明显更好的类定位图(在PASCAL VOC训练上有67.3%的mIoU)，从而获得了卓越的WSSS性能。



## 研究背景

本文聚焦于弱监督语义分割（WSSS）领域，旨在解决现有方法的局限性，具体研究背景如下：
- **WSSS的意义与挑战**：WSSS旨在利用图像级标签、点、涂鸦和边界框等弱标签，缓解像素级标注的繁琐和高成本问题。其中，图像级WSSS仅使用类别标签监督像素级预测，尤为具有挑战性。 
- **现有方法的不足**：现有图像级WSSS方法通常依赖基于卷积神经网络的类激活图（CAM）生成伪分割标签，但CAM存在激活不完整和不准确的问题，这是由于图像标签和像素级分割监督之间的差距导致的。
- **一致性正则化的局限**：现有工作使用增强不变一致性来改进CAM，考虑了区域激活一致性，但忽略了跨视图的成对一致性，即区域亲和性一致性。激活一致性只能发现新视图中的激活，无法解决未激活区域和背景噪声问题。
- **本文的研究动机**：鉴于亲和性是上下文编码的一种方式，且上下文对像素级预测至关重要，本文提出全对一致性正则化（ACR）方法，同时强制区域激活一致性和区域亲和性一致性，以提高WSSS的性能。 



## 研究现状

- **弱监督语义分割方法多样**：采用图像级标签、涂鸦、点和边界框等弱标签，避免像素级标注的繁琐。图像级弱监督语义分割常依赖类激活图（CAM）生成伪分割标签，且有多种方法对其进行优化。

- **一致性正则化受关注**：不同类型的一致性被提出用于优化初始种子，如CAM一致性、特征一致性等。

- **亲和性学习细化**：成对亲和性常被用于优化初始种子，在CNN和Transformer时代都有相关研究。

  

## 提出的模型

![Snipaste_2025-04-07_13-44-09](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-07_13-44-09.png)



本文提出了一种名为**全对一致性正则化**（**All-pairs Consistency Regularization，ACR**）的模型，用于弱监督语义分割（Weakly Supervised Semantic Segmentation，WSSS）任务。



### 核心思想

在图像级弱监督语义分割中，**类激活图**（**Class Activation Map，CAM**）常被用于生成目标定位作为伪分割标签，但存在部分激活问题。现有方法采用一致性正则化来保持不同图像增强下的激活强度不变性，但忽略了每个CAM内区域之间的成对关系。因此，ACR模型旨在同时确保区域激活一致性和区域亲和性一致性，以更好地定位目标。



### 模型设计

- **基于视觉Transformer**：选择视觉Transformer作为基础模型，因为其自注意力机制可以自然地编码区域之间的依赖关系，适合建模两种一致性，且无需引入额外模块。
- 注意力一致性正则化
  - **区域激活一致性**：通过比较原始图像和增强图像的类到块注意力（class-to-patch attention），计算两者之间的ℓ1损失，以鼓励网络生成对变换不变的目标定位。
  - **区域亲和性一致性**：比较原始图像和增强图像的块到块注意力（patch-to-patch attention），计算两者之间的ℓ1损失，以鼓励图像区域之间的成对关系对变换不变。
  - **变换逆操作**：为了解决图像增强后注意力矩阵空间顺序不一致的问题，引入变换逆操作，恢复注意力矩阵的原始空间顺序，以便直接计算两个注意力矩阵之间的距离。
- 基于梯度的Transformer类定位图生成
  - **梯度计算**：通过反向传播分类分数，计算类到块注意力的类特定梯度，去除负值并重塑为h×w的图，得到类定位图。
  - **亲和性细化**：利用学习到的块间亲和性对激活图进行细化，结合区域激活一致性和区域亲和性一致性，生成最终的类定位图。









## 实验（Compared with SOTA）

数据集：**PASCAL VOC、MS COCO**



#### MS COCO

表1展示了在MS COCO上的分割结果。本文方法实现了45%的分割平均交并比（mIoU），明显优于现有方法。值得注意的是，该结果不依赖任何额外的显著性信息，但超过了所有先前的WSSS方法，包括使用显著性信息的方法。MS COCO是一个更大的数据集，有更多语义类别和包含多个对象的复杂图像。这一结果表明，显著性信息可能会阻碍WSSS方法在复杂场景中的扩展性，因此本文方法未纳入显著性信息。该结果证明了全对一致性正则化（ACR）能够在具有挑战性的场景中生成可靠的类别定位图。MS COCO的每类结果报告在补充材料中。

![Snipaste_2025-04-07_13-50-42](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-07_13-50-42.png)



#### PASCAL VOC

- **种子性能**：表2报告了类别定位图的mIoU，包括有无亲和性细化的性能。结果显示，即使没有亲和性细化，ACR*仍优于大多数现有的非显著性方法（mIoU为59.4%）。本文的ACR显著改善了初始种子，证明了所提出的ACR的有效性。在没有显著性信息辅助的情况下，先前最佳方法[66]也采用变压器亲和性来细化种子，而ACR比其高出5.2%。图5展示了定性结果。此外，图6展示了在包含多个对象的复杂场景中的种子，ACR学习到精确的亲和性，有助于形成具有精确边界的完整对象形状。
- **伪标签性能**：表2的最后一列显示了伪分割标签的性能。遵循常见做法，采用PSA [2]将激活图（种子）处理为像素级伪分割标签。实验发现PSA容易受到误报样本（即过度激活）的影响。为避免过度激活，使用ACR*训练PSA网络，然后训练好的PSA网络将细化ACR种子（67.3%）为伪标签。结果表明，本文方法显著改善了伪标签。
- **语义分割性能**：表3展示了在PASCAL VOC上的语义分割结果。ACR在验证集和测试集上分别取得了71.2%和70.9%的有竞争力的结果，优于先前的非显著性方法。图7显示，使用本文伪标签训练的分割模型可以产生准确和完整的预测。PASCAL VOC的每类结果报告在补充材料中。

![Snipaste_2025-04-07_13-51-40](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-07_13-51-40.png)





## 实验（Ablation Experiments）:1st_place_medal:



本文提出在分类训练期间同时正则化区域激活和区域亲和性。表4对这两个正则化项进行了消融实验。首先观察到，即使在基线模型中，区域亲和性也能显著提高种子质量，这验证了视觉变压器的上下文编码能力。通过引入这两个正则化项，发现它们分别对性能有显著提升。同时使用两个正则化项取得了最优结果，与普通变压器基线（51.1%）相比，整体mIoU提高了15.8%，证明了ACR的有效性。



![Snipaste_2025-04-07_13-53-12](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-07_13-53-12.png)



## 结论

作者提出了一种名为**全对一致性正则化（ACR）的训练框架**，用于从变压器生成更好的类定位图。研究结果表明，ACR在分类训练中利用区域激活一致性和区域亲和一致性，通过变压器的自注意力机制同时规范这两种一致性。仅使用一个类令牌，ACR就能学习精确的对象定位和准确的成对亲和性，以提取对象范围。其类定位图显著优于先前方法，在PASCAL VOC和MS COCO数据集上取得了最先进的性能。此外，ACR可以无缝集成到视觉变压器网络中，无需额外修改，这有助于其他基于变压器的任务。因此，作者认为ACR是一种简单而有效的方法，能够为弱监督语义分割提供更好的初始种子。 





