# C-CAM: Causal CAM for Weakly Supervised Semantic Segmentation on Medical Image

<ArticleMetadata/>

::: tip

西安交通大学

:::

## 摘要

Recently, many excellent weakly supervised semantic segmentation (WSSS) works are proposed based on class activation mapping (CAM). However, there are few works that consider the characteristics ofmedical images. In this paper, we find that there are mainly two challenges of medical images in WSSS: i) the boundary of object foreground and background is not clear; ii) the co-occurrence phenomenon is very severe in training stage. We thus propose a Causal CAM (C-CAM) method to overcome the above challenges. Our method is motivated by two cause-effect chains including category-causality chain and anatomy-
causality chain. The category-causality chain represents the image content (cause) affects the category (effect). The anatomy-causality chain represents the anatomical structure (cause) affects the organ segmentation (effect). Extensive experiments were conducted on three public medical image data sets. Our C-CAM generates the best pseudo masks with the DSC of 77.26%, 80.34% and 78.15% on ProMRI, ACDC and CHAOS compared with other CAM-like methods. The pseudo masks ofC-CAM are further used to improve the segmentation performance for organ segmentation tasks. Our C-CAM achieves DSC of 83.83% on
ProMRI and DSC of87.54% on ACDC, which outperforms state-of-the-art WSSS methods. Our code is available at https://github.com/Tian-lab/C-CAM.

## 翻译

近年来，人们提出了许多基于**类激活映射**的弱监督语义分割(WSSS)方法。然而，很少有工作考虑到医学图像的特点。在本文中，我们发现医学图像在WSSS中主要存在两个挑战:1)**目标前景和背景的边界不清晰**;Ii)**训练阶段共现现象非常严重**。因此，我们提出了一种因果CAM (C-CAM)方法来克服上述挑战。我们的方法是由两个因果链驱动的，包括范畴因果链和解剖因果链。范畴-因果链表示图像内容(因)影响范畴(果)。解剖-因果链表示解剖结构(因)影响器官分割(果)。在三个公共医学图像数据集上进行了大量的实验。与其他类cam方法相比，我们的C-CAM在ProMRI、ACDC和CHAOS上的DSC分别为77.26%、80.34%和78.15%，生成的伪掩膜效果最好。进一步利用c - cam的伪掩膜来提高器官分割任务的分割性能。我们的C-CAM在ProMRI上的DSC为83.83%，在ACDC上的DSC为87.54%，优于最先进的WSSS方法。我们的代码可在https://github.com/Tian-lab/C-CAM上获得。

## 研究背景

本文聚焦医学图像弱监督语义分割（WSSS），其研究背景主要源于以下方面：

- **语义分割现状**：深度学习推动语义分割广泛研究，传统范式依赖大量像素级标注数据，但获取此类标注耗时且成本高，因此WSSS应运而生。其中，图像级标签获取最易却也最具挑战性，现有基于类激活映射（CAM）的WSSS方法多针对自然图像。
- **医学图像挑战**：与自然图像相比，医学图像在基于图像级标签的WSSS中存在两大挑战。一是前景与背景边界模糊，使CAM模型难以准确分类；二是训练阶段共现现象严重，不同器官常同时出现在同一图像中，仅依靠图像级标签，CAM模型难以激活正确的共现器官。
- **现有方法不足**：多数基于CAM的WSSS方法未考虑医学图像的上述特性，无法在医学图像上取得良好效果。

## 研究现状



- **弱监督语义分割（WSSS）**：基于类激活映射（CAM）的方法是主流，多数聚焦于自然图像，利用图像级标签等弱标注，常见流程为生成种子区域、细化种子生成伪掩码、用伪掩码训练分割模型。
- **解剖先验**：在图像分割中融入先验知识可提升性能，医学图像的解剖先验更具影响力，但现有方法需专业知识或复杂模型。
- **计算机视觉中的因果关系**：因果关系在计算机视觉任务中应用广泛，有助于提供更好的学习和可解释模型，但在医学图像弱监督语义分割中应用较少。



## 提出的模型

![Snipaste_2025-04-16_13-28-49](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-16_13-28-49.png)

- **全局采样模块（Global Sampling Module）**：将训练图像输入纯CAM（P - CAM）模型生成粗分割掩码，该模块最终输出包含类别和解剖信息的全局上下文图$M_{GC}$。

- 因果模块（Causality Module）

  ：基于两条因果链设计，分别为类别因果链和解剖因果链。

  - **类别因果链（Category - Causality Chain）**：将粗分割掩码和全局上下文图输入重塑层，通过两个卷积层投影到同一空间，计算类别感知注意力向量$A_{category}$，最终得到图像特定的类别因果图$M_{c}$。
  - **解剖因果链（Anatomy - Causality Chain）**：设计一个0/1指示器表示医学图像的解剖信息，计算解剖因果图$M_{S}$，将其与仅包含类别因果的显著图$CAM_{cc}$相乘得到最终显著图$CAM_{ac}$，进而生成伪分割掩码$S_{pseudo}$



### 模型优势

- **引入因果关系**：C-CAM是首个将**因果关系**引入医学图像弱监督语义分割的方法，生成的伪分割掩码边界更清晰、形状更准确。
- **解决关键问题**：类别因果链缓解了边界模糊问题，解剖因果链解决了共现问题。
- **实验效果好**：在三个公共医学图像数据集（ProMRI、ACDC和CHAOS）上的实验表明，C-CAM生成的伪掩码在DSC指标上表现优异，训练的分割网络**U-Net**达到了最先进的性能。

## 实验（Compared with SOTA）

> 数据集：ProMRI、ACDC、CHAOS



1. **与其他CAM类方法比较**：将C - CAM与Grad - CAM、Grad - CAM++等CAM类定位方法比较，使用相同的训练基线模型，测试所有背景阈值，展示不同方法伪掩码的最佳DSC结果。结果显示，C - CAM在三个医学图像数据集上生成的伪掩码性能最佳，在CHAOS的所有类别上表现良好。
2. **参数敏感性实验**：评估背景阈值对生成伪分割掩码的影响，比较几种不同的CAM类方法。多数CAM类方法对背景阈值敏感，而C - CAM在背景阈值范围为0.3 - 0.9时，显著性图的DSC能稳定在较高值，表明其对背景阈值的鲁棒性。
3. **显著性图可视化**：直观展示C - CAM的优势。结合类别因果关系，C - CAM能解决模糊边界问题，在ProMRI和ACDC数据集上，其显著性图的前景和背景边界清晰；借助解剖因果关系，能显著缓解共现问题，且错误激活的无关背景区域更少。
4. **与其他WSSS方法比较**：用生成的伪分割掩码在全监督下训练U - Net模型，将测试数据的最终分割结果与其他先进的WSSS方法比较。在ProMRI数据集上，对于整个前列腺，C - CAM的DSC最高（83.83%），标准差最低（5.14%），在平均表面距离（ASD）和平均绝对距离（MAD）指标上也表现最佳；在ACDC数据集上，C - CAM在所有三个指标上均取得最佳性能。



![Snipaste_2025-04-16_13-38-40](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-16_13-38-40.png)



## 实验（Ablation Experiments）:1st_place_medal:

1. **消融实验**：分析C - CAM各模块的作用。结果表明，与P - CAM相比，类别因果关系和解剖因果关系都提高了三个数据集上伪掩码的准确性。解剖因果关系在ProMRI上提升2.43%，在ACDC上提升1.79%，在CHAOS多标签分割任务中提升显著（18.3%）；结合类别因果关系后，ProMRI、ACDC和CHAOS数据集的DSC分别进一步提升4.22%、3.46%和5.41%；再训练一个亲和模型后，三个数据集上生成的伪分割掩码的DSC分别达到77.26%、80.34%和78.15%。



![Snipaste_2025-04-16_13-37-24](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-16_13-37-24.png)

## 结论

作者提出了用于医**学图像弱监督语义分割**（**WSSS**）的因果类激活映射（C-CAM）方法，得出以下结论：
1. **方法有效性**：C-CAM集成类别因果链和解剖因果链生成准确的伪分割掩码，能缓解前景与背景边界模糊问题，解决器官共现问题，生成的显著图边界清晰，符合解剖学知识。 
2. **性能优越性**：C-CAM在ProMRI、ACDC和CHAOS数据集上优于六种先进的类CAM方法；用其伪掩码训练的U-Net分割网络在ProMRI和ACDC数据集上达到了先进水平。 
3. **局限性与展望**：C-CAM难以分割形状复杂的物体，未来可结合少量强标签和大量弱标签，提供更准确的类别和解剖信息。 


