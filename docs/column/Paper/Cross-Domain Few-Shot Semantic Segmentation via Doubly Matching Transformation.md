# Cross-Domain Few-Shot Semantic Segmentation via Doubly Matching Transformation :1st_place_medal:
<ArticleMetadata/>
Nanjing University of Aeronautics and Astronautics 、State Key Laboratory of Integrated Services Networks, Xidian University



## **摘要**

>Cross-Domain Few-shot Semantic Segmentation (CD-FSS) aims to train generalized models that can segment classes from different domains with a few labeled images. Previous works have proven the effectiveness of feature transformation in ad-
>dressing CD-FSS. However, they completely rely on support images for feature transformation, and repeatedly utilizing a few support images for each class may easily lead to overfitting and overlooking intra-class appearance differences. In this paper,
>we propose a Doubly Matching Transformation-based Network (DMTNet) to solve the above issue. Instead of completely relying on support images, we propose Self-Matching Transformation (SMT) to construct query-specific transformation matri-
>ces based on query images themselves to transform domain-specific query features into domain-agnostic ones. Calculating query-specific transformation matrices can prevent overfitting, especially for the meta-testing stage where only one or several images are used as support images to segment hundreds or thousands of images. After obtaining domain-agnostic features, we exploit a Dual Hypercorrelation Construction (DHC) module to explore the hypercorrelations between the query im-
>age with the foreground and background of the support image, based on which foreground and background prediction maps are generated and supervised, respectively, to enhance the segmentation result. In addition, we propose a Test-time Self-Finetuning (TSF) strategy to more accurately self-tune the query prediction in unseen domains. Extensive experiments on four popular datasets show that DMTNet achieves superior performance over state-of-the-art approaches. Code is available at
>https://github.com/ChenJiayi68/DMTNet.
>
>



## **翻译**

>**跨域少样本语义分割（CD-FSS）**旨在训练能够以少量标注图像对不同领域进行分割的通用模型。以往的研究已经证明了特征转换在解决CD-FSS问题中的有效性。然而，这些方法完全依赖于支持图像进行特征转换，而重复利用少量支持图像来处理每个类别，容易导致过拟合，并忽视类内外观的差异。为了解决上述问题，本文提出了一种基于双重匹配转换的网络（DMTNet）。我们并不完全依赖支持图像，而是提出了自匹配转换（SMT），通过查询图像自身构建特定的转换矩阵，将领域特定的查询特征转换为领域无关的特征。计算查询特定的转换矩阵有助于防止过拟合，特别是在元测试阶段，此时仅使用一张或几张图像作为支持图像来对数百或数千张图像进行分割。在获得领域无关特征后，我们利用双重超相关构建（DHC）模块，探索查询图像与支持图像前景和背景之间的超相关性，基于此生成前景和背景的预测图并进行监督，从而增强分割结果。此外，我们还提出了一种测试时自我微调（TSF）策略，以更准确地在未知领域自我调整查询预测。在四个流行数据集上的大量实验表明，DMTNet在性能上优于现有的最先进方法。相关代码可在 https://github.com/ChenJiayi68/DMTNet 获取。





## **研究背景**

> **语义分割**近年来依赖大规模标注数据集取得快速发展，但实际场景中收集大量训练数据耗时且成本高。少样本语义分割（FSS）应运而生，旨在用少量标注支持图像实现查询图像的准确分割，常采用元学习，但在实际应用中，源数据集和目标数据集存在较大领域差距，导致FSS模型对未见领域的泛化能力较差。 为解决FSS模型在跨领域场景下性能显著下降的问题，跨领域少样本语义分割（CD - FSS）被提出。现有主要的CD - FSS方法PATNet通过将特定领域特征转换为领域无关特征来消除领域差距，但在元测试阶段仅基于少量支持图像的转换矩阵为大量查询图像生成领域无关特征，易导致过拟合。此外，多数现有CD - FSS方法在分割过程中只关注前景目标区域，忽略背景区域。 基于上述问题，本文提出一种基于**双重匹配变换的网络（DMTNet）**，以解决特征变换过度依赖支持图像、类内外观差异以及信息利用不充分等关键问题。 



## **研究现状**

- **少样本语义分割（FSS）**：现有方法分为基于度量和基于关系两类。前者将支持图像表示为类原型，通过非参数测量工具分割查询图像；后者构建支持 - 查询对的密集对应关系。但在源域和目标域差距大时，性能会下降。
- **跨域语义分割**：分为域**自适应语义分割（DASS）**和**域泛化语义分割（DGSS）**。DASS通过联合使用源域和目标域数据训练模型；DGSS通过归一化和白化（NW）、域随机化（DR）等方法缩小域差距。
- **跨域少样本语义分割（CD - FSS）**：近期提出了一些方法，如PixDA、RTD、PATNet等，旨在解决少样本和域差距问题。

## **提出的模型**

![Snipaste_2025-03-10_10-05-44](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-10_10-05-44.png)



**本文提出了一种基于双重匹配变换的网络（Doubly Matching Transformation-based Network，DMTNet）用于跨域少样本语义分割（Cross-Domain Few-shot Semantic Segmentation，CD-FSS）**







1. **自匹配变换模块（Self-Matching Transformation，SMT）**

   - **相似性自匹配**：通过查询特征与支持图像的前景和背景原型之间的基于相似性的自匹配，为查询图像生成粗略的分割掩码。将支持特征划分为多个局部特征，通过测量支持局部原型与查询全局特征之间的相似性，生成更细粒度的预测查询掩码，并使用二元交叉熵（BCE）损失函数进行监督。

   - **自适应特征变换**：为支持和查询特征分别构建专门的变换矩阵，确保在自适应变换过程中前景对象的不变性。通过求解线性方程得到变换矩阵，同时提出整合支持图像的广义逆来优化查询图像的广义逆。

     

2. **双超相关构建模块（Dual Hypercorrelation Construction，DHC）**：探索查询特征与支持图像的前景和背景特征在无域特征空间中的密集相关性。分别基于支持前景特征和背景特征与查询特征构建4D相关张量，将得到的密集相关图输入到4D卷积金字塔编码器和2D卷积金字塔解码器中，生成预测的查询前景掩码和背景掩码，并使用BCE损失函数进行训练监督。

   

3. **测试时自微调策略（Test-time Self-Finetuning，TSF）**：在元测试阶段，通过尝试预测支持图像的真实掩码来微调网络，使模型学习目标域的风格信息，从而为查询图像生成更准确的掩码。只微调编码器的少数参数，避免对支持图像过拟合。





## **实验（Compared with SOTA）**



> 数据集：PASCAL VOC 2012、ISIC2018、Chest X-ray、 Deepglobe、 and FSS-1000



![Snipaste_2025-03-10_10-10-33](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-10_10-10-33.png)

![Snipaste_2025-03-10_10-14-22](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-10_10-14-22.png)



与迁移学习、少样本语义分割和跨域少样本语义分割的几种先进方法进行比较，**DMTNet在四个数据集的平均结果上表现优异**，在1 - shot设置下达到**59.74%**的平均IoU，在5 - shot设置下达到**66.01%**的平均IoU。与最先进的PATNet相比，在1 - shot和5 - shot设置下分别提高了3.68%和4.02%。





## **实验（Ablation Study）**

验证了SMT、DHC和TSF三个关键模块的有效性，使用所有三个模块时模型性能最佳，移除任何一个模块都会导致平均性能下降。同时，通过实验确定了TSF策略中微调编码器层能取得最佳性能。







![Snipaste_2025-03-10_10-12-18](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-10_10-12-18.png)





![Snipaste_2025-03-10_10-12-35](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-10_10-12-35.png)



## **结论**

**作者提出用于跨域少样本语义分割的DMTNet，并得出以下结论：**



1.  **DMTNet利用SMT模块基于自身原型为支持和查询图像计算变换矩阵，将特定领域特征自适应转换为通用特征，避免过度依赖支持图像导致过拟合。** 
2.  **DHC模块在通用特征空间中探索查询图像与支持图像前景和背景的双重超相关性，生成并监督前景和背景预测掩码，提升分割效果。** 
3.  **在元测试阶段，TSF策略微调少量参数，使模型学习目标域风格信息，进一步提高分割性能。**
4.  **大量实验表明，DMTNet在四个具有不同领域差距的数据集上有效，达到了当前最优性能。** 
