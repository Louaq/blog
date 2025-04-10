# SFC: Shared Feature Calibration in Weakly Supervised Semantic Segmentation

<ArticleMetadata/>

西交利物浦大学、利物浦大学、Metavisioncn

::: tip

长尾分布、弱监督语义分割

:::

## 摘要

Image-level weakly supervised semantic segmentation has received increasing attention due to its low annotation cost.
Existing methods mainly rely on **Class Activation Mapping (CAM)** to obtain pseudo-labels for training semantic segmentation models. In this work, we are the first to demonstrate that long-tailed distribution in training data can cause the CAM calculated through classifier weights over-activated for head classes and under-activated for tail classes due to the shared features among head- and tail- classes. This degrades pseudo-label quality and further influences final semantic segmentation performance. To address this issue, we propose a Shared Feature Calibration (SFC) method for CAM generation. Specifically, we leverage the class prototypes that carry positive shared features and propose a Multi-Scaled Distribution-Weighted (MSDW) consistency loss for narrowing the gap between the CAMs generated through classifier weights and class prototypes during training. The MSDW loss counterbalances over-activation and under-activation by calibrating the shared features in head-/tail-class classifier weights. Experimental results show that our SFC significantly improves CAM boundaries and achieves new state-of-the-art performances. The project is available at https://github.com/Barrett-python/SFC.

## 翻译

图像级弱监督语义分割因其标注成本低而受到越来越多的关注。现有方法主要依靠类激活映射(Class Activation Mapping, CAM)获取伪标签，用于训练语义分割模型。在这项工作中，我们首次证明了训练数据中的长尾分布会导致通过分类器权重计算的CAM由于头类和尾类之间的共享特征而对头类过度激活而对尾类激活不足。这降低了伪标签的质量，并进一步影响最终的语义分割性能。为了解决这一问题，我们提出了一种用于CAM生成的共享特征校准(SFC)方法。具体来说，我们利用带有正共享特征的类原型，并提出了多尺度分布加权(MSDW)一致性损失，以缩小训练期间通过分类器权重和类原型生成的cam之间的差距。MSDW损失通过校准头/尾类分类器权重中的共享特征来平衡过度激活和欠激活。实验结果表明，我们的SFC显著改善了CAM边界，实现了新的最先进的性能。该项目可在https://github.com/Barrett-python/SFC上获得。



## 研究背景

**图像级弱监督语义分割（WSSS）**因标注成本低而备受关注，现有方法多依赖**类激活映射**（CAM）生成伪标签来训练语义分割模型。然而，研究发现WSSS的训练数据呈长尾分布，这使得头类和尾类之间的共享特征成分在头类分类器权重中倾向于为正，在尾类分类器权重中倾向于为负。 具体而言，头类权重接收的正梯度多于负梯度，尾类权重则相反。这导致包含共享特征的像素被头类分类器权重激活，而包含尾类特征的像素未被尾类权重激活，使得通过分类器权重计算的CAM对头部类过度激活，对尾部类激活不足，进而降低了伪标签的质量，影响了最终的WSSS性能。 目前，尚未有工作针对长尾分布训练数据导致的过激活和欠激活问题进行研究。因此，本文旨在分析该问题产生的原因，并提出共享特征校准（SFC）方法来解决这一问题，以提高CAM质量和WSSS性能。



## 研究现状

- **弱监督语义分割（WSSS）**：伪标签生成基于注意力映射，关键在于生成高质量的**类激活映射**（CAM）。已有方法采用启发式策略、自监督学习、对比学习等生成CAM，还使用**CRF、IRN等方法对初始映射进行细化**。此外，视觉-语言预训练成为解决下游视觉 - 语言任务（包括WSSS）的流行方法。
- **分类中的共享特征**：分类是语义分割的上游任务，现有方法多提取判别性部分特征进行分类，避免共享特征影响分类性能。而WSSS不能仅依赖判别性特征构建完整CAM，部分方法冻结预训练编码器的若干层以避免遗忘非判别性特征。

## 提出的模型

![Snipaste_2025-04-10_13-57-44](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-10_13-57-44.png)

本文提出了一种名为**共享特征校准**（**Shared Feature Calibration，SFC**）的方法，用于解决弱监督语义分割（Weakly Supervised Semantic Segmentation，WSSS）中因训练数据**长尾分布**导致的类激活映射（Class Activation Mapping，CAM）过激活和欠激活问题。以下是该模型的详细介绍：
1. **模型背景**：图像级弱监督语义分割因标注成本低而受到广泛关注。现有方法主要依赖CAM获取伪标签来训练语义分割模型，但训练数据的长尾分布会使头类别的CAM过激活，尾类别的CAM欠激活，从而降低伪标签质量，影响最终分割性能。 
2. **模型结构**    - **图像库重采样（Image Bank Re-sampling，IBR）**：维护一个图像库，存储每个前景类别的最新图像。在训练时，从图像库中均匀采样图像并与原始训练批次拼接，以增加尾类别样本的采样频率，有效校准尾类别分类器权重中的共享特征。   
	- **多尺度分布加权一致性损失（Multi-Scaled Distribution-Weighted，MSDW）**：提出两个分布加权一致性损失$L_{P_{DW}}$和$L_{W_{DW}}$，分别用于缩小原型CAM和分类器权重CAM之间的差距，以及缩小原始图像和下采样图像的分类器权重CAM之间的差距。通过计算缩放分布系数$DC_c$对一致性损失进行重新加权，使总需求较高的类别分配更高的一致性损失。
3. **模型推理**：最终的CAM通过将分类器权重CAM和原型CAM相加得到，即$(M_{final})_{\tilde{c}} = (M_{W}(F, W, I))_{\tilde{c}} + (M_{P}(F, P))_{\tilde{c}}$，共同解决过激活和欠激活问题。 
4. **实验结果**：在PASCAL VOC 2012和MS COCO 2014两个基准数据集上进行实验，结果表明SFC方法显著提高了CAM的边界质量，在弱监督语义分割任务中取得了新的最先进性能。 综上所述，SFC方法通过图像库重采样和多尺度分布加权一致性损失，有效解决了长尾分布下共享特征导致的CAM过激活和欠激活问题，提高了弱监督语义分割的性能。 

## 实验（Compared with SOTA）

> 数据集：PASCAL VOC 2021、MS COCO 2014

- **伪标签质量比较**：评估伪标签生成过程中中间和最终结果的质量。比较分类模型生成的初始CAM、经过CRF和IRN后处理的CAM。实验结果表明，SFC生成的CAM明显优于以往方法，在PASCAL VOC数据集上，SFC的CAM比现有方法高2.6%；经过CRF处理后mIoU达到69.4%，再经过IRN处理后mIoU提高到73.7%，比AMN方法高1.5%。

![Snipaste_2025-04-10_14-01-54](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-10_14-01-54.png)





- **弱监督语义分割性能比较**：将经过CRF和IRN后处理的伪掩码作为真实标签，以全监督方式训练语义分割模型。在PASCAL VOC 2012的验证集和测试集上，使用ImageNet预训练骨干网络，SFC方法的mIoU分别达到71.2%和72.5%，优于仅使用图像级标签或同时使用图像级标签和显著性图的其他弱监督语义分割方法。在MS COCO 2014验证集上，使用ResNet101骨干网络，SFC方法的mIoU达到46.8%，比AMN方法高2.1%。

![Snipaste_2025-04-10_14-02-00](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-10_14-02-00.png)



![Snipaste_2025-04-10_14-03-21](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-10_14-03-21.png)





## 实验（Ablation Experiments）:1st_place_medal:



- **SFC组件有效性验证**：验证图像库重采样（IBR）和多尺度分布加权（MSDW）一致性损失（包括LP DW和LW DW）的有效性。结果表明，IBR可提高分类器权重CAM的mIoU，增加尾部类别的采样频率能提升LMSDW的有效性；LW DW可增强LP DW带来的性能提升，但单独使用LW DW无法校准下采样特征空间中的共享特征，性能会显著下降。
- **DC系数有效性研究**：研究式（6）中DC系数的有效性。结果显示，DC系数能有效调整每个类别的一致性损失权重，带来显著的性能提升。
- **CAM组合性能比较**：比较推理时单独使用MW、MP和组合使用Mfinal的性能。结果表明，组合使用Mfinal的性能最高，说明在SFC中用MP补充MW效果更好。
- **不同类别集性能增益分析**：分析有无DC系数时不同类别集的平均性能增益。结果显示，使用DC系数时，头部和尾部类别能获得更多的mIoU增益。



![Snipaste_2025-04-10_14-04-01](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-10_14-04-01.png)



## 结论

作者得出以下结论：
1. 首次指出在长尾场景下，**头类和尾类的共享特征**会使头类的分类器权重生成的类激活映射（CAM）扩大，尾类的CAM缩小，导致伪标签质量下降，影响弱监督语义分割（WSSS）最终性能。
2. 提出共享特征校准（SFC）方法，通过图像库重采样（IBR）和多尺度分布加权（MSDW）一致性损失，平衡不同分类器权重中的共享特征比例，避免共享特征导致的**过激活和欠激活**问题。
3. 实验表明，SFC显著改善了CAM边界，在**Pascal VOC 2012**和**MS COCO 2014**数据集上仅使用图像级标签就取得了新的最优WSSS性能，为提高图像级弱监督语义分割中CAM的准确性提供了新视角，未来将探索其他可能的解决方案。 
