# Relevant Intrinsic Feature Enhancement Network for Few-Shot Semantic Segmentation

University of Chinese Academy of Sciences、Chinese Academy of Sciences、Alibaba group





## **摘要**

For few-shot semantic segmentation, the primary task is to extract class-specific intrinsic information from limited labeled data. However, the semantic ambiguity and inter-class similarity of previous methods limit the accuracy of pixel-level foreground-background classification. To alleviate these issues, we propose the Relevant Intrinsic Feature Enhancement Network (RiFeNet). To improve the semantic consistency of foreground instances, we propose an unlabeled branch as an efficient data utilization method, which teaches the model how to extract intrinsic features robust to intra-class differences. Notably, during testing, the proposed unlabeled branch is excluded without extra unlabeled data and computation. Furthermore, we extend the inter-class variability between foreground and background by proposing a novel multi-level prototype generation and interaction module. The different-grained complementarity between global and local prototypes allows for better distinction between similar categories. The qualitative and quantitative performance of RiFeNet surpasses the state-of-the-art methods on PASCAL−5i and COCO benchmarks.



## **翻译**

对于**少样本语义分割任务**，核心挑战在于如何从有限标注数据中提取类别本质特征。传统方法常受限于语义模糊性和类间相似性，导致前景-背景的像素级分类精度不足。为此，我们提出相关本质特征增强网络 (Relevant Intrinsic Feature Enhancement Network, RiFeNet)。该网络创新性地引入无标注分支训练策略，通过指导模型提取对类内差异具有鲁棒性的本质特征，显著提升了前景实例的语义一致性。值得一提的是，该无标注分支在测试阶段可完全移除，无需额外无标注数据支持且不增加计算负担。

为增强类间区分度，我们设计了多层次原型生成与交互模块。该模块通过建立全局原型（表征整体类别特征）与局部原型（捕捉细节特征）之间的多粒度互补关系，有效提升相似类别的可区分性。实验表明，RiFeNet 在 PASCAL-5i 和 COCO 基准测试中，无论是定性可视化结果还是定量评估指标，均超越了当前最先进的语义分割方法。







## **研究背景**

**语义分割**是计算机视觉领域的基础且关键任务，在医疗图像理解、工业缺陷检测等众多视觉任务中应用广泛。随着卷积神经网络和基于Transformer方法的发展，全监督语义分割取得显著成功，但获取像素级标注需大量人力和成本。因此，少样本语义分割范式受到关注，该范式让模型利用少量标注数据学习分割，再迁移到查询输入进行测试。

 然而，以往少样本语义分割方法存在语义模糊和类间相似性问题，影响分割效果。对于前景对象，同一类不同实例存在语义模糊，类内差异会导致查询图像出现语义错误；在区分前景和背景方面，类间相似性使像素级二分类困难，不同类但纹理相似的对象同时出现时，前景和背景的局部特征易混淆。 为解决这些问题，本文提出相关内在特征增强网络（RiFeNet），旨在提高少样本任务中前景分割性能，增强前景语义一致性，扩大前景和背景的类间差异。 





## **研究现状**

- **语义分割**：自全卷积网络（FCN）将语义分割转化为像素级分类后，编码器 - 解码器架构被广泛应用，近期研究聚焦于多尺度特征融合、注意力模块插入和上下文先验等。受视觉变压器启发，相关方法在语义分割任务中表现良好，但难以应对稀疏训练数据。
- **少样本分割**：主流方法分为原型提取和空间相关两类。空间相关方法虽保留空间结构，但计算复杂度高、参数多；原型学习方法以较低计算成本取得不错效果，如SG - ONE、PFENet等。
- **少样本分割中无标签数据利用**：少数研究探索了无标签数据的利用，如PPNet和Soopil的方法，但都需额外无标签数据，与原始少样本任务设置不符





## **提出的模型**

本文提出了**相关内在特征增强网络（Relevant Intrinsic Feature Enhancement Network，RiFeNet）**，用于解决少样本语义分割任务中存在的语义模糊和类间相似性问题，以下是该模型的详细介绍： 

1. **整体架构**：RiFeNet由三个共享主干网络的分支组成，在传统的支持 - 查询框架基础上增加了一个无标签分支，帮助模型学习保证语义一致性。其前向传播过程包含三个主要模块：   
   - **多级原型生成模块**：从支持特征中提取全局原型，从查询分支中提取局部原型，为更好的类间区分提供多粒度证据。    
   - **多级原型交互模块**：构建不同粒度原型之间的交互，增强特征挖掘能力，以进行准确的识别。   
   -  - **特征激活模块**：使用n层Transformer编码器进行特征激活，激活包含目标类对象的像素并停用其他像素，提供最终的分割结果。 
2. **无标签数据特征增强**：引入辅助无标签分支作为有效的数据利用方法，通过对训练样本的子集进行重采样作为无标签数据，并应用相同的分割损失，教导模型避免学习有标签输入的特定样本偏差。无标签分支与查询分支共享参数，使用相互生成的伪标签进行训练。 
3.  **多级原型处理**    
   - **全局支持原型生成**：通过对全局特征进行掩码平均池化，从支持特征中提取全局原型，以捕获高维类别级别的类别信息。    
   - **局部查询原型生成**：从查询分支中额外提取局部原型，为二进制分类提供细粒度信息。使用先验掩码和局部平均池化，并通过1×1卷积和通道注意力机制进行细化。
   - -**多级原型交互**：将生成的全局和局部原型扩展到特征图的大小，然后与查询特征和先验掩码连接，经过1×1卷积和激活操作，得到增强的查询特征。 
4. **特征激活**：使用Transformer编码器对增强的查询特征进行自注意力和交叉注意力处理，输出经过调整大小后传递给分类头，得到最终的逐像素分割结果。
5.  **损失函数**：RiFeNet的损失函数是主损失和自监督损失的加权和。主损失使用DICE损失计算查询输入的预测结果与真实标签之间的差异，自监督损失用于无标签分支的训练，权重β经验性地设置为0.5。 实验结果表明，RiFeNet在PASCAL - 5i和COCO数据集上的表现优于现有方法，证明了其在少样本语义分割任务中的有效性。



## **实验（Compared with SOTA）**

数据集：PASCAL-5${^i}$ 、COCO

![Snipaste_2025-03-11_09-38-26](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-11_09-38-26.png)



- **PASCAL - 5i数据集**：RiFeNet在大多数实验场景下优于最佳方法。在单样本设置下比CyCTR高约3.5%，五样本设置下高约2%。与现有最先进的DCAMA相比，使用ResNet50骨干时，单样本设置下高出2.5%；使用ResNet101时，高出2.7%。单样本设置下增益更大，原因是随着有标签图像增加，无标签数据与有标签图像的比例从2降至0.4，无标签分支的积极影响减小。



- **COCO数据集**：在该数据集的复杂场景下，RiFeNet在单样本设置的几乎所有分割中仍比当前最佳的DCAMA高出0.8%。定性结果也证明了RiFeNet的有效性，在支持集和查询集中前景对象姿态、外观和拍摄角度差异较大的情况下，RiFeNet在保持前景语义一致性方面有显著改进，在处理前景与背景相似性问题上表现更好。

## **实验（Ablation Experiments）**

- **关键组件有效性**：在单样本设置下，使用无标签分支或多级别原型交互均可使性能提升约2%，两者结合时，RiFeNet在基线基础上提高3.1%。
- **多级别原型设计选择**：实验证明了为无标签分支添加引导等操作的合理性和可靠性。
- **无标签分支设计选择**：无引导查询原型的无标签分支性能比基线更差，增加基线的训练迭代次数对性能影响不大，证明该方法的有效性源于学习到的判别性和语义特征，而非数据的多次采样。
- **不同超参数**：在单样本元训练过程中，无标签图像数量设置为2时效果最佳。初始时，随着无标签图像数量增加，模型分割效果提升；数量继续增加，准确率反而下降，原因是无标签增强效果过强会使特征挖掘注意力转向无标签分支，干扰查询预测，导致特征模糊。

## **结论**

在少样本分割任务中，传统方法存在**语义模糊和类间相似性问题**。为此，作者提出了**相关内在特征增强网络（RiFeNet）**。该网络引入无标签分支，在不增加额外数据的情况下，约束前景语义一致性，提高了前景的类内泛化能力。同时，提出多级原型生成与交互模块，进一步增强了背景和前景的区分度。 实验表明，RiFeNet在PASCAL - 5i和COCO基准测试中超越了现有技术水平，定性结果也证明了其有效性。消融实验显示，无标签增强和多级原型策略共同作用时，RiFeNet性能提升显著。综上，RiFeNet是一种有效的少样本语义分割模型。 























