# CC4S Encouraging Certainty and Consistency in Scribble-Supervised Semantic Segmentation

Peking University、Shandong Universit

## 摘要

**Deep learning-based** solutions have achieved impressive performance in semantic segmentation but often require large
amounts of training data with fine-grained annotations. To alleviate such requisition, a variety of weakly supervised annotation
strategies have been proposed, among which scribble supervision is emerging as a popular one due to its user-friendly annotation way. However, the sparsity and diversity of scribble annotations make it nontrivial to train a network to produce deterministic and consistent predictions directly. To address these issues, in this paper we propose holistic solutions involving the design of network structure, loss and training procedure, named **CC4S** to improve Certainty and Consistency for Scribble-Supervised Semantic Segmentation. Specifically, to reduce uncertainty, CC4S embeds a random walkmodule into the network structure to make neural representations uniformly distributed within similar semantic regions, which works together with a soft entropy loss function to force the network to produce deterministic predictions. To encourage consistency, CC4S adopts self-supervision training and imposes the consistency loss on the eigenspace of the probability transition matrix in the random walk module (we named neural eigenspace). Such self-supervision inherits the category-level discriminability from the neural eigenspace and meanwhile helps the network focus on producing consistent predictions for the salient parts and neglect semantically heterogeneous backgrounds. Finally, to further improve the performance, CC4S uses the network predictions
as pseudo-labels and retrains the network with an extra color constraint regularizer. From comprehensive experiments, CC4S
achieves comparable performance to those from fully supervised methods and shows promising robustness under extreme supervision cases.

代码： https://github.com/panzhiyi/CC4S.

## 翻译

基于深度学习的方法在语义分割中取得了令人印象深刻的性能，但通常需要大量带有细粒度标注的训练数据。为了减少这种需求，研究者提出了多种弱监督标注策略，其中**涂鸦监督**因其用户友好的标注方式而逐渐流行。然而，涂鸦标注的稀疏性和多样性使得直接训练网络生成确定且一致的预测具有挑战性。为解决这些问题，本文提出了包含网络结构设计、损失函数和训练流程的完整解决方案——CC4S（提升涂鸦监督语义分割确定性与一致性的方法）。具体而言，为降低不确定性，CC4S在网络架构中嵌入**随机游走模块**，使神经表征在相似语义区域内均匀分布。该模块与软熵损失函数共同作用，迫使网络生成确定性预测结果。为增强一致性，CC4S采用自监督训练策略，在随机游走模块的概率转移矩阵特征空间（称为神经特征空间）中施加一致性损失。这种自监督机制既继承了神经特征空间的类别级判别能力，又能促使网络专注于对显著区域生成一致预测，同时忽略语义异构的背景区域。为进一步提升性能，CC4S将网络预测结果作为伪标签，通过引入额外的色彩约束正则化项对网络进行重训练。综合实验表明，CC4S取得了与全监督方法相媲美的性能，在极端监督条件下也展现出良好的鲁棒性。



## 研究背景

本文聚焦于涂鸦监督语义分割领域，旨在解决该领域存在的问题，其研究背景主要如下：

- **数据标注难题**：基于深度学习的语义分割方法虽表现出色，但需大量细粒度标注的训练数据。以Cityscapes为例，手动生成像素级语义分割标注平均耗时3 - 5分钟，收集大规模标注数据集并非易事。
- **弱监督方法兴起**：为缓解数据标注压力，多种弱监督标注策略应运而生，如**图像级监督、边界框监督、点监督和涂鸦监督**等。其中，涂鸦监督因**标注方式友好**且能提供有效监督信息，受到越来越多关注。
- **涂鸦监督现存问题**：尽管涂鸦监督语义分割取得了一定进展，但仍存在预测结果不确定和不一致的问题。标注稀疏会导致预测结果不确定，而标注的多样性会使网络难以学习到稳定一致的分割模式，从而产生不一致的预测结果。 基于以上背景，作者提出了CC4S方法，以提高涂鸦监督语义分割的确定性和一致性，减少标注稀疏和多样性带来的影响。 

![Snipaste_2025-03-20_16-12-13](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-20_16-12-13.png)

## 研究现状

> 弱监督语义分割：分为四种，图像级监督、边界框监督、点监督和涂鸦监督。图像级监督仅为整个图像提供类别标签，缺乏定位信息；边界框监督仍然缺乏可靠和有效的措施来产生高质量的物体掩膜；点监督通过在每个图像对象内标记带有类别信息的点来完成注释；涂鸦监督是一种用户友好的弱监督形式。





> 涂鸦监督语义分割：现有方法包括利用辅助任务信息、图割算法传播标注、在损失函数引入分割正则化等，但仍存在预测不确定和不一致问题。





## 提出的模型

本文提出了一种名为**CC4S（Encouraging Certainty and Consistency in Scribble-Supervised Semantic Segmentation）**的模型，旨在解决涂鸦监督语义分割任务中预测结果的**不确定性和不一致性**问题



核心网络包含两个模块：

- **ResNet骨干网络**：用于提取图像的特征。
- **相似度测量模块（SMM）**：计算每两个神经元之间的转移概率，形成转移矩阵。

![Snipaste_2025-03-20_16-24-44](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-20_16-24-44.png)

#### 减少神经表示的不确定性

#### 神经特征空间的自监督学习

#### 带有颜色约束的伪标签再训练



## 实验（Compared with SOTA）

> 数据集：Pascal VOC 2012 and Pascal Context
>
> 比较的方法：Scribblesup, RAWKS, NCL, GraphNet，KCL, BPG, URSS, PSI, SPML, A2GNN, DBFNet, PCE , CCL , TEL and CDL



![Snipaste_2025-03-20_16-30-25](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-20_16-30-25.png)





## 实验（Ablation Experiments）:1st_place_medal:





![Snipaste_2025-03-20_16-29-58](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-20_16-29-58.png)



## 结论

作者通过研究得出以下结论：

1. 仅使用涂鸦注释进行语义分割会导致预测结果**不确定和不一致**。为此，提出了两种策略，即减少神经表示的不确定性以产生可靠结果，以及在神经特征空间进行自监督以保证输出的一致性。
2.  结合**伪标签再训练**，该方法达到了最先进的性能，甚至可与全标签监督方法相媲美，且整个过程无需额外信息或注释准备要求。
3.  大量的消融实验和中间可视化验证了所提解决方案的有效性。
4.  该方法在涂鸦**随机丢弃或按比例缩小**的困难情况下也能表现良好，具有较强的鲁棒性。 

