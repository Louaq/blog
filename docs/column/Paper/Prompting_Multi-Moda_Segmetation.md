# Prompting Multi-Modal Image Segmentation with Semantic Grouping

## University of Chinese Academy of Sciences



## **摘要：**

Multi-modal image segmentation is one of the core issues in computer vision. The main challenge lies in integrating common information between modalities while retaining specific patterns for each modality. Existing methods typically perform full fine-tuning on RGB-based pre-trained parameters to inherit the powerful representation of the foundation model. Although effective, such paradigm is not optimal due to weak transferability and scarce downstream data. Inspired by the recent success of prompt learning in language models, we propose the Grouping Prompt Tuning Framework(GoPT), which introduces explicit semantic grouping to learn modal-related prompts, adapting the frozen pre-trained foundation model to various downstream multi-modal segmentation tasks. Specifically, a class-aware uni-modal prompter is designed to balance intra- and inter-modal semantic propaga-
tion by grouping modality-specific class tokens, thereby improving the adaptability of spatial information. Furthermore,
an alignment-induced cross-modal prompter is introduced to aggregate class-aware representations and share prompt parameters among different modalities to assist in modeling common statistics. Extensive experiments show the superiority of our GoPT, which achieves SOTA performance on various downstream multi-modal image segmentation tasks by training only < 1% model parameters.



## **翻译：**

多模态图像分割技术是计算机视觉领域的关键挑战。这项技术的核心难点在于如何有效融合不同模态（如图像、红外等）的共性特征，同时保留各模态独有的特征模式。当前主流方法主要通过对基于可见光（RGB）预训练模型进行全局微调，以继承基础模型的强大特征提取能力。但这种方法存在明显局限：一方面模型可迁移性较弱，另一方面下游任务标注数据往往匮乏。受大语言模型中提示学习方法取得突破的启发，我们研发了分组提示调优框架（GoPT），通过语义分组机制学习模态专属提示，使冻结的预训练模型能灵活适配多种多模态分割任务。该框架包含两大创新模块：首先是**类感知单模态提示器**，通过聚类同类模态特征，在保留模态内独特空间信息的同时，促进跨模态语义对齐；其次是**对齐引导的跨模态提示器**，通过共享提示参数聚合不同模态的类特征表示，有效捕捉多模态数据的共有统计规律。实验数据显示，GoPT 仅需微调模型不足 1% 的参数，就在多个多模态图像分割基准任务中刷新了最高性能记录，展现出显著优势。







## **研究背景：**

1. **多模态融合的重要性**：语义分割旨在为场景中每个像素分配语义类别，随着传感器技术发展，多模态融合用于分割成为图像解释核心问题。深度学习推动下，深度多模态融合展现出比单模态分割更显著的优势。 
2. **现存方法的挑战**：现有多模态分割方法主要分为基于对齐和基于聚合的融合，但面临诸多挑战。一方面，不同成像机制的模态存在异质差距，基于对齐的融合因信息交换弱，常提供无效的跨模态融合；另一方面，不同模态有效信息不同，基于聚合的融合易忽略模态内传播，导致模态间知识共享和模态内信息处理失衡。 
3. **全微调方法的局限**：多模态方法常采用基于RGB的预训练分割器，全微调虽有效，但效率低、参数存储负担大，且因样本标注有限，无法充分利用预训练模型知识获得通用表示。 





## **研究现状：**

- **多模态图像分割主流方法**：以深度多模态融合为主，旨在利用多数据源增强细粒度细节和像素级语义，主要分为基于对齐和基于聚合的融合方法。前者通过条件损失对齐子网络嵌入，后者运用特定算子组合多模态子网络。
- **模型训练方式**：因缺乏大规模多模态训练集，现有方法通常先加载基于RGB的预训练模型参数，再在特定下游任务数据集上微调。
- **视觉提示学习应用**：提示调优作为新范式，在自然语言处理中表现出色，近期也开始应用于视觉任务。





## **提出的模型：**

![Snipaste_2025-03-06_14-56-04](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-06_14-56-04.png)



本文提出了**分组提示调优框架（Grouping Prompt Tuning Framework，GoPT）**，用于**多模态图像分割**任务，以下是该模型的详细介绍：

1. **核心思想**：引入显式语义分组机制到提示学习中，通过冻结预训练的基础模型，仅微调少量视觉提示参数，使模型适应各种下游多模态分割任务，以解决现有方法在整合模态间信息和保留各模态特定模式方面的挑战。 
2. **整体架构**    
   - **输入处理**：将RGB图像和辅助模态图像输入到补丁嵌入层，生成对应的RGB标记和辅助模态标记。    
   - **提示生成**：把标记送入分组提示器，生成特定于模态的提示。    
   - **特征融合**：将学习到的提示作为残差添加到原始RGB流中，再输入到基础模型的下一层。 
3. **主要组件**    
   - **类感知单模态提示器（Class-Aware Uni-Modal Prompter，CUP）**：通过引入特定于模态的类标记，对辅助模态的视觉概念进行分层渐进分组，平衡模态内和模态间的语义传播，提高空间信息的适应性。    
   - **对齐诱导跨模态提示器（Alignment-Induced Cross-Modal Prompter，ACP）**：根据显式分组的语义相似性，聚合辅助模态的类感知表示，将其他数据源的关键模式整合到RGB流中，生成新的跨模态对齐诱导提示，辅助建模模态公共统计信息。 
4. **优化策略**：使用基于RGB的预训练基础模型的参数初始化多模态分割模型，在提示调优过程中，仅更新分组提示器和分割头的梯度值，以少量提示参数促进模型快速收敛，并有效继承预训练基础模型的先验知识。 
5. **实验验证**：在多个下游多模态图像分割任务（RGB - D、RGB - T、RGB - SAR分割）上进行了广泛实验，结果表明GoPT仅训练不到1%的模型参数，就能在各项指标上取得优于现有方法的性能，展现出高效性和优越性。 

## **实验过程（与SOTA方法的对比）：**

数据集：NYUDv2、SUN RGB-D、MFNet、PST900、WHU-OS

![Snipaste_2025-03-06_15-02-29](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-06_15-02-29.png)



## **实验过程（消融实验）：**



![Snipaste_2025-03-06_15-05-05](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-06_15-05-05.png)



通过消融实验，证明了GoPT已经达到了SOTA的标准

- Effectiveness of Prompter Structure  （**table 4，row 7 and row 8**）
- Impact of Multi-Modal Information   （**table 4**）
- Number of Grouping Prompter          **（Figure 6）**
- Hard vs. Soft Assignment                **（Figure 7）**





**结论：**



作者提出了用于**多模态图像分割**的参数高效视觉调优框架GoPT，通过在提示学习中引入显式语义分组，使冻结的预训练基础模型适应各种下游多模态分割任务。具体而言，设计了类感知单模态提示器（CUP），通过对特定模态的类令牌进行分组，平衡了模态内和模态间的语义传播；引入了对齐诱导的跨模态提示器（ACP），聚合类感知表示并辅助建模公共统计信息。大量下游任务实验表明，GoPT在准确性和效率上达到了最佳平衡，仅训练不到1%的模型参数，就在多个下游多模态图像分割任务中取得了SOTA性能，证明了该框架的优越性和泛化性。 









