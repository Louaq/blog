# CorrMatch: Label Propagation via Correlation Matching for Semi-Supervised Semantic Segmentation
<ArticleMetadata/>
Nankai University、NKIARI, Shenzhen Futian、SICE, UESTC

## 摘要

This paper presents a simple but performant semi-supervised semantic segmentation approach, called CorrMatch. Previous approaches mostly employ complicated training strategies to leverage unlabeled data but overlook the role ofcorrelation maps in modeling the relationships between pairs oflocations. We observe that the correlation maps not only enable clustering pixels ofthe same category easily but also contain good shape information, which previous works have omitted. Motivated by these, we aim to improve the use efficiency of unlabeled data by designing two novel label propagation strategies. First, we propose to conduct pixel propagation by modeling the pairwise similarities of pixels to spread the high-confidence pixels and dig out more. Then, we perform region propagation to enhance the pseudo labels with accurate class-agnostic masks extracted from the correlation maps. CorrMatch achieves great performance on popular segmentation benchmarks. Taking the DeepLabV3+ with ResNet-101 backbone as our segmentation model, we receive a 76%+ mIoU score on the Pascal VOC 2012 dataset with only 92 annotated images. Code is available at https://github.com/BBBBchan/CorrMatch.

## 翻译

本文提出了一种简单但高性能的半监督语义分割方法 CorrMatch。现有方法大多采用复杂的训练策略来利用未标注数据，但忽视了关联图在建模像素位置关系中的重要作用。我们发现，关联图不仅能够轻松实现同类像素的聚类，还包含了被以往研究忽略的优质形状信息。基于这些观察，我们设计了两种创新的标签传播策略来提升未标注数据的使用效率。首先，我们提出**像素传播策略**，通过建模像素对的相似性关系来扩展高置信度像素区域，并挖掘更多潜在的高置信度像素。其次，我们开发了**区域传播策略**，通过从关联图中提取精确的类别无关掩码来增强伪标签质量。CorrMatch 在主流分割基准测试中表现优异：当使用 ResNet-101 为主干的 DeepLabV3+ 模型时，在仅含 92 张标注图像的 Pascal VOC 2012 数据集上实现了 76%+ 的 mIoU。代码已开源：https://github.com/BBBBchan/CorrMatch。

## 研究背景

本文聚焦半监督语义分割领域，旨在解决深度学习方法对大规模像素级标注数据集的依赖问题，具体研究背景如下： 

- **标注成本高**：基于深度学习的语义分割方法通常需要大量像素级标注图像，但准确标注分割数据集成本高、耗时长，限制了其应用。 
- **半监督学习受关注**：为减少对大规模准确标注数据的需求，研究者提出弱监督、半监督和无监督分割方法。其中，半监督语义分割仅需少量标注数据和大量未标注数据进行训练，更接近现实场景，受到广泛关注。 
- **现有方法存在不足**：现有半监督语义分割方法多采用复杂训练策略，如Mean Teacher架构或自训练策略，需要额外网络或训练阶段，增加了训练复杂度。此外，常用的固定阈值筛选伪标签方法难以有效利用未标注数据。
- **Correlation map的潜力**：像素间的相关性可反映成对相似性，相关性地图不仅能轻松聚类同一类别的像素，还包含良好的形状信息，但以往研究忽略了其在建模位置对关系中的作用。 基于以上背景，作者提出了CorrMatch方法，通过设计两种新颖的标签传播策略，提高未标注数据的使用效率。 

## 研究现状



- **方法多样**：在半监督语义分割领域，已有多种方法被提出，如采用Mean Teacher架构的方法（U2PL、PS - MT等）、基于自训练策略的方法（ST++、SimpleBase等），以及近期的UniMatch等单阶段框架。
- **成果显著**：这些方法在一些公开数据集（如Pascal VOC 2012、Cityscapes）上取得了一定成果，推动了半监督语义分割技术的发展。

## 提出的模型

![Snipaste_2025-03-22_15-03-57](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-22_15-03-57.png)




1. **模型框架**：CorrMatch是一个单阶段框架，基于具有弱到强一致性正则化的简单框架构建。对于有标签图像，使用标准的交叉熵损失；对于无标签图像，主要通过强制预测一致性来利用，同时考虑弱增强和强增强图像在高置信区域的对数似然一致性。
2. 标签传播策略
   - **像素传播**：通过计算相关图并将其传播到预测中，增强模型对像素对之间相似性的整体感知，从而提高无标签数据的利用率。具体步骤为：首先通过网络编码器后的线性层提取特征，计算特征向量对之间的相关性得到相关图；然后将相关图传播到模型的对数似然输出中，得到另一种预测表示；最后计算该预测表示与高置信伪标签之间的相关损失作为监督。
   - **区域传播**：利用相关图中隐含的形状信息来增强伪标签。具体做法是将相关图的每一行进行归一化并转换为二值图，当二值图与高置信区域有较大重叠时，计算高置信形状内每个唯一类别的数量，找到最显著的类别，并将该类别传播到增强的伪标签和扩展的高置信区域中。为了提高效率，采用随机采样的方法。
3. 其他策略
   - **动态阈值**：使用与训练过程相关的动态阈值策略，避免固定阈值过严或过松对模型收敛的不利影响。通过指数移动平均（EMA）根据对数似然输出迭代更新阈值。
   - **损失函数**：整体目标函数是监督损失和无监督损失的组合。监督损失是基本监督损失和监督相关损失的组合；无监督损失包括无监督硬损失、软损失和相关损失。


::: tip

**重要！！！**

:::

## 实验（Compared with SOTA）



数据集：Pascal VOC 2012 、Cityscapes



- **经典Pascal VOC 2012**：在不同分割比例下与其他最先进方法比较，CorrMatch在全分割比例下mIoU达到81.8%，且在各分割比例上均优于现有方法，如比UniMatch在各分割比例上分别高出1.2%、1.3%、0.6%、0.7%和0.6%。
- **aug Pascal VOC 2012**：在不同训练尺寸和分割比例下进行实验，结果显示CorrMatch始终优于现有最佳方法。例如，在321×321训练尺寸下，比监督基线在1/16、1/8和1/4分割比例上分别提高12.0%、7.4%和5.5%，比UniMatch在各分割比例上分别高出1.1%、0.8%和1.1%。
- **Cityscapes**：采用滑动窗口评估和在线难例挖掘（OHEM）损失技术，CorrMatch在所有分割比例下均优于其他方法，比UniMatch在1/16、1/8、1/4和1/2分割比例上分别高出0.7%、0.6%、0.2%和0.9%。

![Snipaste_2025-03-22_15-08-09](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-22_15-08-09.png)

![Snipaste_2025-03-22_15-08-15](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-22_15-08-15.png)





## 实验（Ablation Experiments）:1st_place_medal:



- **组件有效性**：验证了CorrMatch不同组件的有效性，包括硬无监督损失、软损失、标签传播等。完整的CorrMatch在92和1464分割比例下mIoU分别达到76.4%和81.8%，比基线分别提高2.8%和1.8%。动态阈值策略与标签传播策略配合良好。
- **标签传播策略的影响**：像素传播策略带来了一定的性能提升，区域传播策略进一步提高了性能。例如，像素传播策略在92、366和1464分割比例上分别提高1.4%、0.4%和0.8%，区域传播策略在此基础上分别再提高0.6%、0.5%和0.5%。
- **特征提取位置**：默认从骨干网络提取特征，实验表明使用骨干网络特征的性能始终优于其他位置。
- **不同采样策略**：比较了随机采样和均匀采样方法，随机采样效果更好，其中随机采样128个样本时性能最佳。
- **不同初始值**：基于EMA的阈值更新策略对不同初始值不敏感，在训练早期所有阈值都会快速趋近相似值。



![Snipaste_2025-03-22_15-09-01](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-22_15-09-01.png)



![Snipaste_2025-03-22_15-09-06](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-22_15-09-06.png)

# 其他实验

- **统计分析**：统计挖掘比例和有效伪标签比例，结果表明使用标签传播策略后，这两个比例显著高于未使用时，说明未标记数据的利用率得到有效提高。
- **定性分析**：可视化结果显示，使用标签传播策略后，高置信区域的像素数量和完整性明显优于未使用时，能够有效扩展高置信区域并填充正确类别。

![Snipaste_2025-03-22_15-10-04](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-22_15-10-04.png)



## 结论

作者提出了一种名为**CorrMatch的半监督语义分割方法**，通过实验分析得出以下结论： 
- **策略有效**：重新考虑了相关图的使用，设计了**像素传播和区域传播**两种标签传播策略，能利用相关图中的相似性和形状信息，显著扩大高置信度区域，有效提升伪标签的整体质量。 
- **效率提升**：这些策略使模型能更高效地利用未标记数据，解决了传统方法中阈值选择困难、未标记数据利用不充分等问题。 
- **性能优越**：在Pascal VOC 2012和Cityscapes等数据集上，CorrMatch始终优于其他现有方法，取得了新的最先进性能，且推理过程无额外计算负担。 

> 我们提出了CorrMatch，它可以利用标签传播和相关匹配来发现更准确的高置信度区域，用于半监督语义分割。CorrMatch的主要贡献是重新考虑相关映射的使用，并设计了两种标签传播策略来丰富伪标签。利用这些策略，CorrMatch显著扩展了高置信度区域，从而可以更有效地利用未标记的数据。实验证明了我们的cormatch算法优于其他方法。
