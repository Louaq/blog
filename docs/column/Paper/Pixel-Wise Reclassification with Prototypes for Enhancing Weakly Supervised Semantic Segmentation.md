# Pixel-Wise Reclassification with Prototypes for Enhancing Weakly Supervised Semantic Segmentation

<ArticleMetadata/>

天津大学

::: tip

启发、参考文献

:::

## 摘要

Refining the seed region to obtain finely annotated **pseudo masks** for training a segmentation model is a crucial step in the multi-stage weakly supervised semantic segmentation (WSSS) framework. One of the most popular refinement methods, IRN, extends seed regions towards the edges in the image. However, we observed that, due to the lack of guidance from semantic information, IRN’s refinement may lead the generation of partially erroneous refinement directions. To address this issue, we leverage prototypes
to recover the overlooked category semantic information in the refinement stage. We propose a prototype-based pseudo mask reclassification post-processing (PtReCl) to correct misclassified pixels in the pseudo masks, generating refined pseudo masks with more accurate coverage. Experimental evaluations demonstrate that our post-processing approach brings improvements in both pseudo mask quality and segmentation results on PASCAL VOC and MS COCO datasets, achieving state-of-the-art performance on VOC.

## 翻译

在多阶段弱监督语义分割(WSSS)框架中，对种子区域进行细化以获得精细标注的**伪掩膜**用于训练分割模型是至关重要的一步。最流行的细化方法之一是IRN，它将种子区域向图像的边缘扩展。然而，我们观察到，由于缺乏语义信息的指导，IRN的细化可能导致部分错误的细化方向的产生。为了解决这个问题，我们利用原型来恢复细化阶段中被忽略的类别语义信息。我们提出了一种基于原型的伪掩码重分类后处理(PtReCl)来纠正伪掩膜中的错误分类像素，生成更精确覆盖的精细伪掩膜。实验评估表明，我们的后处理方法改善了**PASCAL VOC**和**MS COCO**数据集的伪掩码质量和分割结果，实现了最先进的VOC性能。

## 研究背景

本文聚焦于弱监督语义分割（WSSS）领域，旨在解决现有方法在生成伪掩码时存在的问题，具体研究背景如下：
- **WSSS的目标与流程**：WSSS旨在利用图像级标注数据集完成像素级分类任务，以降低数据标注成本。当前主流方法遵循三阶段流程，其中生成高质量伪掩码对最终分割模型的性能至关重要。 
- **现有方法的局限性**：最常用的细化方法IRN在细化种子区域时，因缺乏语义信息指导，可能导致部分错误的细化方向，产生大量错误的伪掩码。
- **原型学习的潜力**：近年来，研究发现原型学习可助力语义分割，它能从少量类样本中归纳特定类别的特征，实现特征的像素级分类，还能保留更多非学习参数以预测多样特征。 
- **本文的研究动机**：基于上述背景，作者提出基于**原型的伪掩码重分类后处理方法**（**PtReCl**），利用原型的类别区分性恢复伪掩码中误分类的像素，以提高伪掩码质量和分割性能。 



## 研究现状

- **多阶段WSSS框架**：主流方法分三步，先训练分类模型生成种子区域，再用细化方法生成伪掩码，最后用伪掩码训练全监督语义分割模型。
- **CAM方法**：解决CAM作为种子区域时前景覆盖不足问题，如采用擦除、对抗学习、利用ViT上下文建模等方法。
- **细化方法**：主要分为利用显著性检测和随机游走与语义亲和两类，部分方法还借助Transformer中的注意力矩阵。
- **原型学习**：在语义分割中，部分研究将原型用于对比学习或自监督学习，部分用原型替换分类器结构。



## 提出的模型

多阶段弱监督语义分割框架中，细化种子区域以获得精细注释的伪掩码是训练分割模型的关键步骤。现有流行的细化方法IRN在细化过程中缺乏语义信息的引导，可能导致部分错误的细化方向。为解决这一问题，作者提出了**PtReCl**方法。



![Snipaste_2025-04-13_19-21-22](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-13_19-21-22.png)



### 模型流程

1. **种子区域获取**：利用原始的类激活映射（Class Activation Maps, CAM）方法获取种子区域。训练分类模型后，丢弃分类器中的全局平均池化（Global Average Pooling, GAP）层，直接在原始特征图上进行预测，忽略负预测分数并归一化生成CAM。
2. **伪掩码生成**：使用IRN方法对种子区域进行细化，生成伪掩码。
3. **伪掩码恢复网络**：参考Deeplab的结构构建伪分割网络，以伪掩码作为像素级注释，通过空洞空间金字塔池化层（Atrous Spatial Pyramid Pooling, ASPP）提取图像特征并获得像素级预测结果。引入标签条件策略（Label Conditioning strategy），根据图像级类别注释保留相关通道，丢弃无关通道，以减轻无关通道对后续原型准确性的影响。
4. **前景 - 背景原型获取**：依次遍历训练集图像，使用骨干网络提取特征。对于伪掩码中每个类别的前景区域，收集其对应特征到前景特征集；对于非该类别区域，收集其对应特征到背景特征集。使用余弦距离作为度量，采用K - means聚类方法为每个类别获取多个前景和背景原型。
5. **多原型像素级重新分类**：使用伪掩码恢复网络的骨干提取图像特征，利用特定类别的前景和背景原型对像素特征的语义信息进行重新分类。计算每个位置与前景 - 背景原型的余弦相似度，对相似度进行降序排序，选择前m个距离参与像素分类计算，生成像素级重新分类图。
6. **重新细化**：将重新分类图替换IRN中的CAM，再次使用IRN进行细化，增强其边缘信息，得到后处理的伪掩码。
7. **全监督语义分割**：使用后处理的伪掩码训练全监督语义分割模型，如DeeplabV2和UperNet - Swin。

### 模型贡献

- **解决分类错误**：提出PtReCl后处理方法，利用原型的类别区分性，通过前景 - 背景特征恢复伪掩码中误分类的像素。
- **多原型分类**：设计多原型像素级分类方法，利用伪分割网络重建伪掩码并通过聚类方法获取原型，缓解不同类别有效原型数量的差异，获得准确的重新分类图。
- **实验验证**：在PASCAL VOC和MS COCO数据集上进行了广泛实验，结果表明PtReCl方法能有效提高伪掩码的准确性，从而提升分割性能，在VOC数据集上取得了最先进的结果。



## 实验（Compared with SOTA）

数据集：**PASCAL VOC 2012**、**MS COCO 2014**

![Snipaste_2025-04-13_19-25-57](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-13_19-25-57.png)



- **伪掩码增强**：与一些先进的WSSS方法相比，经PtReCl处理后的伪掩码在VOC上提升了8.4%，在COCO上提升了3.4%，在VOC上取得了最佳性能，在COCO上也有出色表现。
- **分割性能提升**：在使用DeepLab作为全监督分割方法的VOC实验中，PtReCl在两种常用预训练ResNet101骨干网络下均取得了最先进的结果。在基于Transformer的分割方法中，使用UperNet - Swin作为骨干网络时，PtReCl也达到了最先进的性能。在COCO上，尽管受噪声影响，PtReCl仍优于除AMN和LPCAM外的其他方法，与基线IRN相比，在验证集上提升了2.2%。

![Snipaste_2025-04-13_19-26-36](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-13_19-26-36.png)





## 实验（Ablation Experiments）:1st_place_medal:

- **有效性验证**：PtReCl在VOC和COCO上分别将伪掩码的mIoU提高了8.4%和3.4%。通过对比不使用原型和使用不同数量原型时的像素级分类结果，验证了多原型像素级分类方法的有效性，当M设为[10, 15, 20]时，重分类图的mIoU最高可达70%。
- **原型数量影响**：研究了调整每个类别的原型数量K（范围从2到30）对重分类效果的影响。重分类图的mIoU随原型数量增加先上升后稳定，最终将类中心数量设为20。在10到30的范围内，重分类图的mIoU波动仅在1%以内，表明在合理范围内改变原型数量对重分类效果影响不大。



![Snipaste_2025-04-13_19-28-20](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-13_19-28-20.png)





![Snipaste_2025-04-13_19-28-28](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-13_19-28-28.png)



![Snipaste_2025-04-13_19-28-33](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-13_19-28-33.png)

## 结论

作者指出广泛使用的**WSSS**方法IRN在细化策略上存在局限，它在不考虑特定像素级语义信息的情况下将种子区域向图像边缘扩展，导致部分错误细化。基于现有的WSSS三阶段框架，作者引入了基于原型的重分类后处理方法，以纠正伪掩码中的像素错误分类，得到更精确的后处理伪掩码。 通过在**VOC和COCO**数据集上的大量实验，结果表明该后处理阶段有效提高了伪掩码的质量和分割模型的性能，在VOC数据集上取得了最先进的成果。 


