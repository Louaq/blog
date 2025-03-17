# Learning Generalized Medical Image Segmentation from Decoupled Feature Queries

Jarvis Research Center、Wuhan University、Guangxi Medical University

## 摘要

Domain generalized medical image segmentation requires models to learn from multiple source domains and generalize well to arbitrary unseen target domain. Such a task is both technically challenging and clinically practical, due to the domain shift problem (i.e., images are collected from different hospitals and scanners). Existing methods focused on either learning shape-invariant representation or reaching consensus among the source domains. An ideal generalized representation is supposed to show similar pattern responses within the same channel for cross-domain images. However, to deal with the significant distribution discrepancy, the network tends to capture similar patterns by mul-tiple channels, while different cross-domain patterns are also allowed to rest in the same channel. To address this issue, we propose to leverage channel-wise decoupled deep features as queries. With the aid of cross-attention mechanism, the long-range dependency between deep and shallow features can be fully mined via self-attention and then guides the learning of
generalized representation. Besides, a relaxed deep whitening transformation is proposed to learn channel-wise decoupled features in a feasible way. The proposed decoupled feature query (DFQ) scheme can be seamlessly integrate into the Transformer segmentation model in an end-to-end manner. Extensive experiments show its state-of-the-art performance, notably outperforming the runner-up by 1.31% and 1.98% with DSC metric on generalized fundus and prostate benchmarks, respectively. Source code is available at https://github.com/BiQiWHU/DFQ.

## 翻译

**域泛化医学图像分割**任务要求模型能够从多个源域学习，并有效泛化到任意未知目标域。这种任务不仅在技术上具有挑战性，同时也具有重要的临床应用价值，其核心难点在于域偏移问题 (即医学图像采集自不同医院和扫描设备) 。现有方法主要聚焦于学习形状不变性表征或实现源域间的特征共识。理想的泛化表征应确保跨域图像在相同特征通道上呈现相似的模式响应。然而，面对显著的分布差异，网络往往通过多个通道捕捉相似模式，而不同跨域模式又可能共存于同一通道。针对这一矛盾，我们提出基于通道解耦深度特征的查询机制。通过交叉注意力机制，深度特征与浅层特征间的长程依赖关系可经由自注意力充分挖掘，从而指导泛化表征的学习。此外，我们开发了一种自适应深度白化变换，以更灵活的方式实现通道解耦特征学习。所提出的解耦特征查询 (DFQ) 框架能够以端到端方式无缝集成于Transformer分割模型。大量实验验证了该方案的先进性，在眼底和前列腺的泛化性基准测试中，其Dice相似系数 (DSC) 指标分别以1.31%和1.98%的优势显著超越次优方法。项目代码已开源：https://github.com/BiQiWHU/DFQ。



## 研究背景

1. **数据分布差异**：多数现有医学图像分割方法假定训练和测试样本遵循相同统计分布，但实际中，医学图像来自不同医院、由不同水平的标注者标注，存在显著的领域偏移问题，导致模型泛化能力要求高。 
2. **现有方法不足**：过去医学图像分割的领域适应研究需目标域样本参与训练，只能泛化到训练中见过的目标域。现有领域泛化医学图像分割方法主要分为学习形状不变特征和明确学习多源域间的域间偏移两类，但难以应对不同成像条件下任意未见领域的特征分布变化。 
3. **特征问题**：领域偏移使深度学习模型同一通道中不同领域的医学图像激活模式差异大，浅层特征的特征不对齐问题明显，网络为捕捉各领域模式会在多通道学习相似模式，导致特征冗余，影响模型对未见领域的泛化能力。 



## 研究现状

- **医学图像分割技术发展**：深度学习技术推动医学图像分割发展，早期U - Net及其变体占主导，后DeepLab及改进模型成为趋势，近期Vision Transformer因强大特征表示能力受关注，且弱监督、半监督和多标注场景下的分割研究也有开展。
- **领域泛化研究**：计算机视觉和机器学习领域对领域泛化广泛研究，计算机视觉中领域泛化分割多聚焦驾驶场景，医学图像分割领域泛化旨在从源域学习泛化到任意未见目标域的语义表示，现有方法分学习形状不变特征和学习域间偏移两类

## 提出的模型

![Snipaste_2025-03-17_16-06-07](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-17_16-06-07.png)



1. 减少通道冗余
   - **问题**：为应对不同领域间的分布差异，深度神经网络倾向于在多个通道中提取相似模式，导致特征冗余。
   - **解决方案**：提出松弛深度白化变换（RDWT）。传统的深度白化变换（DWT）在学习解相关表示时存在问题，可能无法有效消除通道相关性。而RDWT通过在计算协方差矩阵之前对特征进行归一化，只关注通道之间的相关性，更有效地减少了特征冗余。
2. 从解耦特征查询中学习
   - **问题**：通道解耦特征虽增强了深度神经网络在跨领域场景中的表示能力，但松弛白化变换损失无法保证不同领域的医学图像在同一通道上显示相似的特征响应。
   - **解决方案**：利用自注意力机制中固有的长距离依赖关系。在解码高层特征时，查询由深层特征生成，键和值基于浅层特征。深层特征查询对不同领域浅层表示的一致性施加了隐式约束。
3. 解码泛化表示
   - **方法**：通过一个由权重$W_1$和偏置$b_1$参数化的线性层对学习到的泛化表示进行特征融合，然后将结果输入到语义分割头进行最终预测。
   - **损失函数**：总损失函数$L$是标准的二元交叉熵损失和Dice损失（记为$L_{seg}$）与每个特征的$L_{i_{RDWT}}$的组合，即$L = L_{seg} + λ · \sum_{i=1}^{4}L_{i_{RDWT}}$，其中$λ$设置为$1 × 10^{-4}$。





## 实验（Compared with SOTA）



![Snipaste_2025-03-17_16-04-46](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-17_16-04-46.png)



![Snipaste_2025-03-17_16-05-05](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-17_16-05-05.png)



![Snipaste_2025-03-17_16-05-13](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-17_16-05-13.png)

1. 与现有最优方法对比
   - **前列腺分割基准**：论文提出的方法显著优于现有最优方法。与次优方法相比，在第一、二、四、五和六个领域的ASD指标分别提高了0.14%、0.18%、0.49%、0.38%和0.26%；DSC指标在六个领域中的五个领域超过了所有现有方法，最高提升了2.08%。
   - **眼底图像分割基准**：该方法同样显著优于现有最优方法。与次优的RAM - DSIR方法相比，平均DSC提高了1.63%，ASD改善了0.80%。
2. 对DFQ的理解
   - **减少通道冗余**：通过计算并可视化特征查询的协方差矩阵，发现所提出的DFQ方案在消除非对角元素方面表现最佳。
   - **跨领域特征对齐**：通过t - SNE可视化特征空间，表明DFQ使来自不同领域的样本更均匀地混合，有助于最小化领域差距。
3. **可视化分割结果**：与现有方法相比，所提出的方法显示出更精确和合理的预测。

## 实验（Ablation Experiments）:1st_place_medal:

- **各组件实验**：DFQ框架由分割骨干网络、特征查询和松弛深度白化变换（RDWT）三个关键组件组成。实验表明，使用特征查询使DSC提高了0.94%，ASD提高了0.88%；RDWT进一步使DSC提高了1.16%，ASD提高了0.68%。
- **各尺度实验**：研究了解耦查询和风格不变的键与值的影响。结果显示，使用风格解耦的键和值（F1）以及风格解耦的查询（F2、F3、F4）都对分割结果有积极贡献，其中风格解耦查询的贡献更大。



## 结论

1. **方法创新**：为解决跨领域医学图像的特征不对齐问题，提出了放松的深度白化变换（RDWT），增强了通道表示能力并减少通道冗余；创新性地使用解耦的深度特征作为查询，引导整个框架学习不同领域相似的通道特征模式。

   

2.  **性能表现**：大量实验表明，该方法在前列腺和眼底图像分割基准测试中显著优于现有最先进的方法，在多个指标上取得了最佳性能，如在眼底和前列腺基准测试中，DSC指标分别至少高出1.31%和1.98%，展现出了卓越的领域泛化能力。 





