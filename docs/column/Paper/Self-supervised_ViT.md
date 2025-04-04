# Self-supervised vision transformers for semantic segmentation
<ArticleMetadata/>
## 摘要

Semantic segmentation is a fundamental task in computer vision and it is a building block of many other vision applications. Nevertheless, semantic segmentation annotations are extremely expensive to collect, so using pre-training to alleviate the need for a large number of labeled samples is appealing. Recently, **self-supervised** **learning (SSL)** has shown effectiveness in extracting strong representations and has been widely applied to a variety of downstream tasks. However, most works perform sub-optimally in semantic segmentation because they ignore the specific properties of segmentation: (i) the need of pixel level fine-grained understanding; (ii) with the assistance of global context understanding; (iii) both of the above achieve with the dense self-supervisory signal. Based on these key factors, we introduce a systematic self-supervised pre-training framework for semantic segmentation, which consists of a hierarchical encoder–decoder architecture MEVT for generating high-resolution features with global contextual information propagation and a self-supervised training strategy for learning fine-grained semantic features. In our study, our framework shows competitive performance compared with other main self-supervised pre-training methods for semantic segmentation on **COCO-Stuff, ADE20K, PASCAL VOC, and Cityscapes** datasets. e.g., MEVT achieves the advantage in linear probing by +1.3 mIoU on PASCAL VOC.

## 翻译


语义分割是计算机视觉的基础任务，也是众多视觉应用的基础模块。但由于语义分割标注的获取成本极高，通过预训练减少对大量标注样本的依赖显得尤为重要。近年来，自监督学习（SSL）在特征提取方面展现出显著成效，已被广泛应用于各类下游任务。然而，现有方法在语义分割任务中效果欠佳，主要原因在于忽视了该任务的三个核心特性：(i) 需要像素级的细粒度理解；(ii) 需要结合全局上下文信息；(iii) 必须通过密集的自监督信号同时实现上述两个目标。基于这些关键要素，我们开发了系统的自监督预训练框架，包含以下创新：采用 MEVT 分层编码器-解码器架构生成具有全局上下文传播能力的高分辨率特征，以及专门设计的自监督训练策略用于学习细粒度语义特征。实验表明，在 COCO-Stuff、ADE20K、PASCAL VOC 和 Cityscapes 等数据集上，我们的框架相比其他主流自监督预训练方法展现出竞争优势。典型例证如：MEVT 在 PASCAL VOC 的线性探测任务中实现了 1.3 mIoU 的性能提升。

## 研究背景

语义分割是计算机视觉的基础任务，在自动驾驶、机器人操作等领域应用广泛，但标注成本高昂，多数语义分割数据集规模远小于分类数据集。因此，利用大规模无标签数据进行预训练以减少对大量标注样本的依赖成为潜在解决方案。 

近年来，**自监督学习（SSL）及其在视觉Transformer**上的应用在计算机视觉领域取得显著进展，能帮助网络学习通用视觉表示，降低对大规模标注数据的需求。然而，多数自监督学习方法在语义分割任务中表现欠佳，原因在于它们忽略了语义分割的特定属性：需要像素级的细粒度理解、借助全局上下文理解，且要通过密集的自监督信号实现上述两点。 基于这些问题，本文作者探索一种适用于语义分割的自监督预训练方法，提出了一个系统的自监督预训练框架，旨在生成具有全局上下文信息传播的高分辨率特征，并学习细粒度的语义特征，以提升语义分割任务的性能。 

## 研究现状

- **自监督学习**：提出多种预训练任务，如色彩化、图像修复等，对比学习在下游视觉任务表现良好，基于掩码图像建模的方法取得了不错的成果，部分研究还改进了训练目标和架构。
- **密集预测预训练**：利用自监督学习进行密集预测预训练，一些方法聚焦实例级/原型对应，部分引入像素/区域级自监督预训练方法。
- **视觉Transformer**：ViT将Transformer应用于图像识别，Swin Transformer引入卷积风格窗口计算，部分工作构建多分辨率特征图用于密集输出。

## 提出的模型

![Snipaste_2025-03-14_21-00-59](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-14_21-00-59.png)





本文提出了一种用于**语义分割的自监督预训练框架**，该框架在网络架构和自监督目标方面都有创新，核心模型是多尺度编码器 - 解码器视觉变压器（Multi-scale Encoder–Decoder Vision Transformer, MEVT），以下是详细介绍： 

1. **模型架构**    
   - **多尺度解码器**：为了获得高分辨率的细粒度特征，MEVT在预训练架构中引入了多尺度解码器，并对编码器和解码器进行联合预训练。解码器由全局注意力阶段（Stage 5）和局部注意力阶段（Stage 6）组成，通过“Patch Unmerging”层对特征图进行上采样，同时引入跳跃连接（skip-connections），促进训练过程中浅层的梯度传播。    
   - **混合注意力机制**：为了融合全局和局部上下文信息，MEVT采用了一种简单而有效的混合注意力策略。在浅层（Stage 1、2和6）使用Swin Transformer的窗口注意力块来处理局部信息，在深层（Stage 3、4和5）使用全局自注意力（ViT块）来增强全局上下文信息的传播。 
2. **自监督预训练策略**：MEVT使用图像级自蒸馏损失（来自DINO）对全局平均池化（GAP）特征进行预训练。将图像的两个增强视图分别输入到教师网络和学生网络中，通过最小化交叉熵损失将知识从教师网络蒸馏到学生网络。教师网络通过指数移动平均（EMA）更新。在Stage 4和Stage 6的输出处分别应用自蒸馏损失，并对两个损失项进行等权重加权，以确保编码器和解码器网络得到充分的预训练。
3.  **模型优势**    
   - **性能表现**：在多个语义分割数据集（COCO - Stuff、ADE20K、PASCAL VOC和Cityscapes）上的实验结果表明，MEVT在各种设置（线性探测、微调、低样本学习）下均优于大多数现有方法。例如，在PASCAL VOC上，MEVT在线性探测中比其他方法提高了+1.3 mIoU。   
   - **特征学习**：通过实验和消融研究，证明了MEVT能够学习到具有细粒度和全局上下文感知能力的视觉表示，适用于具有挑战性的语义分割任务。例如，在定性结果中，MEVT在复杂环境中识别小物体的能力优于其他基线方法。 



## 实验（Compared with SOTA）:1st_place_medal:

**数据集**：在ImageNet上进行300个epoch的预训练。



- **线性探测结果**：在COCO - Stuff、ADE20K、Cityscapes和PASCAL等数据集上，MEVT在大多数数据集上优于所有基线方法。例如，在具有挑战性的Cityscapes数据集上，MEVT比基于Transformer的DINO方法高出8.4 mIoU，比采用Swin - T的MOBY方法高出2.6 mIoU。
- **端到端微调结果**：在ADE20K数据集上，使用线性头时，MEVT比之前最好的方法iBOT高出2.4 mIoU。
- **低样本微调结果**：在不同比例标记的ADE20K图像上，MEVT在各种监督水平下均优于现有方法，表明其在实际场景中能实现更高效的语义分割。



![Snipaste_2025-03-14_21-04-37](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-14_21-04-37.png)



![Snipaste_2025-03-14_21-04-43](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-14_21-04-43.png)



## 实验（Ablation Experiments）:1st_place_medal:

- **预训练解码器**：将解码器纳入预训练框架显著提高了线性探测mIoU（+4.9）和微调mIoU（+2.2）。
- **解码器深度**：默认使用两个块的解码器，从一个块增加到两个块可提高线性探测和微调性能，增加到三个块时性能下降。
- **多尺度融合**：MEVT在低分辨率阶段使用全局自注意力进行多尺度信息融合，比仅依赖窗口注意力的Swin - T + W.A.Dec.在线性探测和微调上分别高出2.9 mIoU和2.8 mIoU。
- **跳跃连接**：添加两个跳跃连接时性能最佳，线性探测mIoU从67.8提高到71.5。
- **位置编码**：成对相对位置偏差的效果优于其他位置偏差，线性探测mIoU提高了4.3。

## 结论

作者提出了一种**自监督预训练方法**，用于促进下游**语义分割任务**，得出以下结论：

1. **方法创新**：该方法在神经网络架构和自监督目标方面均有创新，构建了包含多尺度编码器-解码器架构MEVT和自监督训练策略的框架。
2. **性能优越**：此框架简单且强大，在**COCO-Stuff、ADE20K、PASCAL VOC和Cityscapes**四个常用数据集的多种语义分割和低样本评估指标上达到了最优性能。 
3. **应用前景**：**作者希望该简单框架能推动无标签或少量标签语义分割的广泛应用，减少对大量高质量标注数据的依赖。** 





