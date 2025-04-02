# DSMF-Net: Dual Semantic Metric Learning Fusion Network for Few-Shot Aerial Image Semantic Segmentation

<ArticleMetadata/>

> **Chinese Academy of Sciences、University of Chinese Academy of Sciences**

## 摘要

**Semantic segmentation** of aerial images is crucial yet resource-intensive. Inspired by human ability to learn rapidly, few-shot semantic segmentation offers a promising solution by utilizing limited labeled data for efficient model training and generalization. However, the intrinsic complexities of aerial images, compounded by scarce samples, often result in inadequate feature representation and semantic ambiguity, detracting from themodel’s performance. In this article, we propose to tackle these challenging problems via dual semantic metric learning and multisemantic features fusion
and introduce a novel few-shot segmentation Network (DSMF-Net). On the one hand, we consider the inherent semantic gap between the feature of graph and grid structures and metric learning of few-shot segmentation. To exploit multiscale global semantic context, we construct scale-aware graph prototypes from different stages of the feature layers based on graph convolutional networks (GCNs), while also incorporating prior-guided metric learning to further enhance context at the high-level convolution features. On the other hand, we design a pyramid-based fusion and condensa-
tion mechanism to adaptively merge and couple the multisemantic information from support and query images. The indication and fusion of different semantic features can effectively emphasize the representation and coupling abilities of the network. We have conducted extensive experiments over the challenging iSAID-5i andDLRSD benchmarks. The experiments have demonstrated our network’s effectiveness and efficiency, yielding on-par performance with the state-of-the-art methods.

## 翻译

**航空图像的语义分割**是一个非常重要的问题。受人类快速学习能力的启发，少射语义分割通过利用有限的标记数据进行有效的模型训练和泛化，提供了一种很有前途的解决方案。然而，航空图像固有的复杂性，加上稀缺的样本，往往导致特征表示不足和语义模糊，从而降低了模型的性能。在本文中，我们提出通过双语义度量学习和多语义特征融合来解决这些具有挑战性的问题，并引入了一种新的少量样本学习分割网络(DSMFNet)。一方面，我们考虑了图和网格结构特征之间固有的语义差距和少量样本学习分割的度量学习。为了利用多尺度全局语义上下文，我们基于图卷积网络(GCNs)从特征层的不同阶段构建了尺度感知的图原型，同时还结合了先验引导的度量学习来进一步增强高级卷积特征的上下文。另一方面，我们设计了一种基于金字塔的融合与凝聚机制来自适应地融合和耦合来自支持和查询图像的多语义信息。不同语义特征的表示和融合可以有效地强调网络的表示和耦合能力。我们对具有挑战性的iSAID-5i和dlrsd基准进行了广泛的实验。实验证明了我们的网络的有效性和效率，产生了与最先进的方法相当的性能。

## 研究背景

本文聚焦于航空影像少样本语义分割问题，研究背景如下：
- **语义分割需求与挑战**：语义分割是计算机视觉基础技术，在城市管理、环境监测等领域应用广泛。但传统航空影像语义分割模型训练需大量标注数据，获取耗时耗力。
- **少样本学习的潜力**：少样本学习受人类学习能力启发，利用少量标注数据进行模型训练和泛化，为解决数据获取难题提供了思路。少样本语义分割作为其延伸，通过利用相关任务或领域的先验知识进行分割任务。
- **航空影像少样本分割的困难**：航空影像由机载或卫星传感器捕获，具有空间分辨率变化大、覆盖范围广的特点。不同语义对象外观差异大，同一类别对象在尺度和结构上也存在显著差异，导致特征表示不足和语义模糊，增加了少样本语义分割的难度。 
- **现有方法的局限性**：现有方法虽有一定进展，但传统卷积神经网络在捕捉航空影像的全局和可变结构关系方面效率较低，特征提取存在特征耦合和细节保留不足的问题，导致特征歧义。 基于以上背景，作者提出DSMF - Net网络，以解决航空影像少样本语义分割中的特征建模不佳和语义模糊问题。 

## 研究现状



- **语义分割**：FCN、U - Net等方法推动了语义分割发展，后续如DeepLabv3 +、PSPNet等通过引入新机制提升性能，但监督分割方法标注要求高。
- **少样本语义分割**：出现半监督、弱监督、无监督学习等方法，近期少样本学习受关注，如OSLSM、PL、PANet等方法不断涌现，部分还探索了知识迁移问题。
- **航空影像少样本语义分割**：不同方法被提出，如Wang等人的原型队列学习法、Yao等人的多原型框架、DMML - Net的深度特征金字塔比较网络等。









## 提出的模型

文章提出了一种名为DSMF - Net（Dual Semantic Metric Learning Fusion Network）的新型少样本分割网络，用于解决航空影像少样本语义分割中特征建模不佳和语义模糊的问题。



1. **图原型度量学习（Graph Prototypes Metric Learning）**
   - **图卷积（Graph Convolution）**：图卷积可有效表示图像中不同像素或区域之间的关系，捕捉长距离依赖和全局上下文信息，有助于减少特征耦合，使模型学习和区分图像内不同的结构和语义关系。
   - **尺度感知图原型（Scale - Aware Graph Prototypes）**：静态网格卷积特征难以捕捉航空影像中的复杂关系，因此引入尺度感知图原型，以图投影的方式利用多尺度全局语义上下文。通过在预训练的ResNet - 50的三个中间阶段输出特征，利用GloRe单元进行全局推理，结合支持掩码加权和全局平均池化生成原型。
   - **原型度量学习（Prototype Metric Learning）**：利用查询特征与原型之间的余弦距离进行度量学习，对查询特征应用相同的图投影操作，通过最小 - 最大归一化得到图原型概率图。
2. **先验引导度量学习（Prior Guided Metric Learning）**：图卷积特征金字塔为图结构数据的特征嵌入和全局信息捕捉提供了基础，但高级卷积特征中的语义信息也不能忽视。因此引入先验引导度量学习，生成高级查询和支持卷积特征之间的相似性度量，通过添加二进制支持掩码减轻背景影响，计算余弦距离并进行最小 - 最大归一化得到先验引导概率图。
3. **语义特征融合模块（SFF）**：构建SFF模块解决特征耦合问题，增强模型对变化的鲁棒性。采用金字塔结构对不同尺度的特征进行上采样和下采样，通过1×1卷积合并特征生成中间尺度特征，最后插值和拼接生成新的融合特征，促进不同尺度特征的有效交互和集成。
4. **损失函数（Loss Function）**：采用交叉熵损失作为主要损失函数$L_{main}$，并引入中间监督$L_{aux}$，总损失L是$L_{main}$和$L_{aux}$的加权和，其中λ设为1.0。



## 实验（Compared with SOTA）

数据集：iSAID-5i、DLRSD



- **SAID - 5i数据集**：将提出的模型与其他流行方法进行比较，结果表明该模型明显优于当代少样本分割模型，随着骨干网络的增强，性能提升。在不同设置下，模型在各折数据上均有显著的mIoU提升，且通过配对t检验验证了模型性能提升的显著性。
- **DLRSD数据集**：在更具挑战性的DLRSD数据集上进行实验，结果显示该模型的mIoU得分高于其他方法，尤其在处理复杂场景和具有细微视觉差异的对象时表现出色。

![Snipaste_2025-04-02_09-35-15](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_09-35-15.png)



![Snipaste_2025-04-02_09-35-38](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_09-35-38.png)



## 实验（Ablation Experiments）:1st_place_medal:

- 消融实验：使用ResNet - 50骨干网络在1 - shot设置下进行广泛的消融实验，分析提出模块的有效性和不同设置的影响。
  - **GPML模块**：通过实验表明，基于图结构的GPML模块相比基于卷积结构的原型学习，能进一步提高模型性能，更好地捕捉航空图像中对象之间的复杂关系。
  - **SFF模块**：实验验证了SFF模块在不同尺度下的特征融合策略的有效性，特别是引入图结构和合并操作后，模型的平均性能显著提升。
  - **效率评估**：通过比较不同网络的参数数量和每秒帧数（FPS），证明了提出的模型在保持较低参数数量的同时，实现了较高的FPS，在少样本航空图像分割中具有高效性。



![Snipaste_2025-04-02_09-36-29](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_09-36-29.png)



![Snipaste_2025-04-02_09-36-39](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-02_09-36-39.png)



## 结论

作者聚焦于**航拍影像少样本语义分割**中特征建模不佳和语义模糊的问题，提出了名为**DSMF-Net**的少样本分割网络。该网络采用**双度量学习和多语义信息融合**，增强了模型的解析和表达能力。具体而言，通过尺度感知图原型以图投影方式挖掘多尺度全局语义上下文，集成先验引导度量学习增强高层语义上下文，设计基于金字塔的融合模块更好地提取和浓缩语义特征。在**iSAID - 5i和DLRSD**两个具有挑战性的基准数据集上的实验表明，该方法性能优越，能有效处理有限样本下的密集预测任务。不过，作者也指出，未来需在更大、更多样化的数据集上进一步评估，以全面了解其能力和局限性，后续研究将关注模型对不同航空影像类型的适应性、在大规模数据集上的泛化能力和计算复杂度。 





