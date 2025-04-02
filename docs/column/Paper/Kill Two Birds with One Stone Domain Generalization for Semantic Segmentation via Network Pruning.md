# Kill Two Birds with One Stone Domain Generalization for Semantic Segmentation via Network Pruning

<ArticleMetadata/>


> **浙江大学、内华达大学**

::: tip

启发

:::

## 摘要

**Deep model**s are notoriously known to perform poorly when encountering new domains with different statistics. To alleviate this issue, we present a new domain generalization method based on network pruning, dubbed NPDG. Our core idea is to prune the filters or attention heads that are more sensitive to domain shift while preserving those domain-invariant ones. To this end, we propose a new pruning policy tailored to improve generalization ability, which identifies the filter and head sensibility of domain shift by judging its activation variance among different domains (unary manner) and its correlation to other filter (binary manner). To better reveal those potentially sensitive filters and heads, we present a differentiable style perturbation scheme to imitate the domain variance dynamically. NPDG is trained on a single source domain and can be applied to both CNN- and Transformer-based backbones. To our knowledge, we are among the pioneers in tackling domain generalization in segmentation via network pruning. NPDG not only improves the generalization ability of a segmentation model but also decreases its computation cost. Extensive experiments demonstrate the state-of-the-art generalization performance of NPDG with a lighter-weight structure.

## 翻译

众所周知，深度模型在遇到具有不同统计数据的新领域时表现不佳。为了解决这个问题，我们提出了一种新的基于**网络剪枝**的域泛化方法，称为NPDG。我们的核心思想是剪枝过滤器或注意头，更敏感的领域转移，同时保留那些领域不变的。为此，我们提出了一种新的剪枝策略来提高泛化能力，该策略通过判断不同域之间的激活方差(一元方式)和与其他滤波器的相关性(二值方式)来识别滤波器和域漂移的头部敏感性。为了更好地揭示那些潜在的敏感滤波器和头部，我们提出了一种可微风格的摄动方案来动态地模拟域方差。NPDG在单一源域上训练，可以应用于基于CNN和transformer的主干。据我们所知，我们是通过网络剪枝处理分割领域泛化的先驱之一。NPDG不仅提高了分割模型的泛化能力，而且降低了分割模型的计算量。大量的实验证明了具有较轻重量结构的NPDG具有最先进的泛化性能。

## 研究背景

‍深度学习方法在训练和测试数据独立同分布时，能在各种视觉任务中取得显著成功。然而在实际应用中，深度模型部署到统计特性不同的新环境时，性能会大幅下降。为缓解这一问题，**领域泛化**（**DG**）被提出，旨在增强深度神经网络对未见目标分布的泛化能力。 与领域自适应（DA）不同，DG在训练时无法获取目标域数据，更具挑战性。DG研究主要分为多源和单源两种设置，多源DG假设各源域存在共享因素，但多源样本获取和标注耗时费力，单源DG更具现实意义，因此成为研究热点。 现有单源DG方法多通过数据增强或风格迁移创建多个增强域来模拟未见域，但数据生成与下游任务独立，导致结果欠佳。还有方法尝试让模型学习域不变表示或解耦潜在表示，但存在网络结构或损失函数设计复杂，以及域无关特征占用存储空间和推理时间的问题。 基于此，本文提出一种基于网络剪枝的单源领域泛化方法NPDG，旨在解决上述问题，提高模型泛化能力并降低计算成本。 

‍

## 研究现状

‍

- **领域适应与泛化**：领域适应（DA）和领域泛化（DG）旨在让模型在未标记目标域表现良好。DA可获取目标数据，有分布对齐、合成样本等策略；DG无法获取目标数据，更具挑战性，分为多源和单源方法，单源DG因数据收集和标注成本高而受关注。
- **网络剪枝**：旨在减少网络复杂度，分为非结构化和结构化剪枝。多数现有方法用于图像分类，未考虑领域差距，部分跨领域剪枝方法聚焦粗粒度视觉任务。





## 提出的模型（NPDG）

‍

1. 可微风格扰动（Differentiable Style Perturbation, DSP）模块：
   - 受AdaIN启发，通过额外的领域变分自编码器（D - VAE）将风格统计信息编码为标准分布，动态生成具有高多样性的域外数据，以匹配模型的剪枝状态。
   - 训练目标是最小化包含AdaIN损失、KL散度损失和重建损失的总损失。
   - 在部署阶段，通过干扰采样向量ε生成任意新领域，且梯度可直接反向传播到ε，使整个生成过程可微。
2. 网络剪枝策略：
   - 为每个滤波器引入可学习的缩放因子γ，通过联合训练后缩放因子接近零的滤波器被认为是要被修剪的。
   - 对于基于CNN的骨干网络，将γ重新用于批量归一化（BN）层；对于基于Transformer的模型，为每个注意力激活分配缩放因子。
   - 训练目标包括任务损失和稀疏正则化项，通过修改稀疏正则化函数F(γ)来重新加权香草L1正则化，以抑制对域敏感的滤波器或注意力头。
3. 滤波器/头敏感性度量：
   - **一元滤波器/头敏感性（Unary Filter/Head Sensitivity）**：测量第i个滤波器/头在域转移下的激活方差，通过对共享相同内容但不同风格的小批量图像进行前向传播，计算激活图的方差并归一化得到wU i。
   - **二元滤波器/头敏感性（Binary Filter/Head Sensitivity）**：考虑域转移下滤波器之间的二元关系，通过计算协方差矩阵并对其行求和得到wB i，以识别与同一层中其他滤波器高度相关的滤波器。
   - 最终的滤波器敏感性w由一元和二元滤波器敏感性加权求和得到，即w = λwU + (1 - λ)wB，其中λ是控制两者相对重要性的超参数。



‍![Snipaste_2025-04-02_14-31-14](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_14-31-14.png)

‍

‍

## 实验（Compared with SOTA）

> **数据集：GTA5、SYNTHIA、Cityscapes、BDD100K、Mapillary**

‍

- **与基于DG的方法比较**：在合成到真实、真实到合成和跨真实的DG任务中，NPDG与多个先进的DG方法对比。仅使用DSP就能大幅提升基线方法的mIoU，在此基础上进行域敏感滤波器剪枝可进一步提高泛化能力。与SHADE方法相比，NPDG在多数情况下表现更优，且模型结构更轻、计算成本更低。在使用Transformer作为分割骨干时，NPDG在所有目标数据集上至少比基线模型提高4%，在7个DG任务中的3个达到了最优结果。
- **鲁棒性**：通过给出实验的标准差评估NPDG的鲁棒性。各剪枝迭代可能导致模型结构略有不同，使指标有轻微波动，但方差不大。较高的剪枝率会导致更大的偏差，与仅使用DSP的模型相比，域敏感滤波器剪枝带来了显著提升。
- **效率**：与现有DG方法相比，NPDG能用更轻量级的模型达到最优的分割精度，节省超过17 GFLOPs和35M参数。但进一步提高剪枝率（超过30%）会损害泛化性能，因为分割是细粒度任务，过多剪枝会降低语义边界的分割精度。

‍

‍

‍**与网络剪枝（NP）方法比较**：选择在普通分类和分割任务中有效的NP方法，在ResNet - 101和VGG - 16上评估剪枝性能。由于这些方法在滤波器或权重剪枝时未考虑域偏移，在新域中的性能比未剪枝的基线模型下降。其中，SFP方法的GFLOPs和内存成本最低，而基于Network Slimming的方法（包括NPDG）在隐式训练过程中剪枝滤波器，大量剪枝滤波器位于浅层。

‍

‍![Snipaste_2025-04-02_14-35-11](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_14-35-11.png)

‍![Snipaste_2025-04-02_14-35-18](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_14-35-18.png)

‍







## 实验（Ablation Experiments）🥇

‍对NPDG的核心组件（DSP模块、一元和二元滤波器敏感性）进行消融研究。所有组件都有助于提高基线模型的泛化性能，DSP生成的新变体域比随机采样策略效果更好。结合一元和二元滤波器敏感性可使mIoU达到最高，表明两者具有互补作用。

‍![Snipaste_2025-04-02_14-37-26](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_14-37-26.png)

# ‍超参数研究

- **一元和二元权重的比例λ**：通过网格搜索确定λ值，ResNet101和MiT - B5模型在λ = 0.4时性能最优，表明一元和二元敏感性剪枝都有贡献，二元剪枝效果略更明显。
- **剪枝率r**：剪枝率是灵活参数，在分割任务中，过高的剪枝率会导致边缘模糊，影响分割性能。实验表明，最优剪枝率在20% - 40%之间，约30%时泛化效果最佳。可使用验证集找到剪枝率和mIoU的精确权衡，实际应用中，若没有验证集，使用约30%的剪枝率通常可行。
- **剪枝阈值t**：剪枝阈值不是非常敏感的超参数，在一定范围内取值均可。只要稀疏训练迭代次数足够，就能识别出满足要求的滤波器。一般设置t = 0.1。



![Snipaste_2025-04-02_14-38-01](C:\Users\YangYang\Desktop\Snipaste_2025-04-02_14-38-01.png)

## 结论

作者提出了一种基于**网络剪枝**的**领域泛化**方法NPDG，得出以下结论：
1. **创新性**：NPDG通过定制的剪枝策略，从一元和二元分析辨别滤波器对领域偏移的敏感性，同时引入可微风格扰动方案动态模拟领域变化，助力识别敏感滤波器，是利用网络剪枝解决领域泛化问题的先驱。 
2. **有效性**：在CNN和Transformer架构上的大量实验表明，NPDG能以更轻量级的模型实现语义分割泛化的最优性能。 
3. **局限性与展望**：当前NPDG主要考虑风格差异导致的领域偏移，难以识别所有因素，未来将全面解决领域偏移问题。此外，目前依赖经验值选择超参数，未来需开发测试时训练的方法确定超参数。 





























