# USE Universal Segment Embeddings for Open-Vocabulary Image Segmentation

<ArticleMetadata/>

Bosch Research North America、Bosch Center for Artificial Intelligence (BCAI)

## 摘要

The **open-vocabulary image segmentation** task involves partitioning images into semantically meaningful segments and classifying them with flexible text-defined categories. The recent vision-based foundation models such as the Segment Anything Model (SAM) have shown superior performance in generating class-agnostic image segments. The main challenge in open-vocabulary image segmentation now lies in accurately classifying these segments into text-defined categories. In this paper, we introduce the Universal Segment Embedding (USE) framework to address this challenge. This framework is comprised of two key components: 1) a **data pipeline** designed to efficiently curate a large amount of segment-text pairs at various granularities, and 2) a **universal segment embedding model** that enables precise segment classification into a vast range oftext defined categories. The USE model can not only help open-vocabulary image segmentation but also facilitate otherdownstream tasks (e.g., querying and ranking). Through comprehensive experimental studies on semantic segmen-
tation and part segmentation benchmarks, we demonstrate that the USE framework outperforms state-of-the-art open-
vocabulary segmentation methods.

## 翻译

开放词汇图像分割任务包括将图像划分为语义上有意义的片段，并使用灵活的文本定义类别对其进行分类。近年来，基于视觉的基础模型(如SAM)在生成与类别无关的图像片段方面表现出了优异的性能。目前，开放词汇表图像分割的主要挑战在于将这些片段准确地分类到文本定义的类别中。在本文中，我们引入了通用段嵌入(USE)框架来解决这一挑战。该框架由两个关键组件组成:1)一个数据解决方案，旨在有效地管理各种粒度的大量片段-文本对;2)一个通用的片段嵌入模型，能够将精确的片段分类到大量文本定义的类别中。USE模型不仅可以帮助开放词汇表图像分割，还可以促进其他下游任务(例如查询和排序)。通过对语义切分和零件切分基准的综合实验研究，我们证明了USE框架优于最先进的开放词汇切分方法。



::: tip

启发

:::

## 研究背景

开放词汇图像分割的目的是将图像分割成语义上有意义的片段，并用文本定义的任意类对其进行分类。最近的基础模型在将图像的像素分为有意义的片段上效果显著，例如SAM，然而，现有的开放词汇图像分割方法面临着挑战：**端到端的方法**不能将基础模型生成的图像段作为输入或提示来分配类标签；**两阶段的方法**由于人类标签的限制，它们在分类不同粒度的片段方面仍然受到限制。基于上述的存在的问题，本文的作者提出了**通用片段嵌入框架（Universal Segment Embedding，USE）**，该框架由两个关键的组件：数据方案和通用片段嵌入模型。

## 研究现状

- 多模态表示学习：


从大规模图像-文本数据中学习(例如CLIP)在将视觉概念与文本描述联系起来方面显示出了很好的结果，然而，对于文本数据的多模态表示学习，目前的研究还很少。



- 开放词汇图像分割：


在**自动驾驶**等现实世界视觉任务需求日益增长的驱动下，开放词汇图像分割的重要性正在迅速增长，现有的方法可以分为两类:端到端方法和两阶段方法，但是上述两种方法都存在不足，不能满足本文的任务需求。





- 改进图像-文本数据集：


现有的工作可以分为两类:数据过滤和数据改进。数据过滤旨在通过过滤噪声的图像-文本对来提高模型训练的效率和鲁棒性，而数据改进则侧重于改善图像和文本数据的对齐。



## 提出的模型



**USE Data Pipeline：**

1. **多粒度图像字幕生成**：利用多模态大语言模型（MLLM），通过特定提示生成图像中对象及其属性的详细描述，以获取更丰富的语义信息。
2. **从字幕中进行指代表达定位**：从字幕中提取名词短语并扩展为指代表达，使用开放词汇定位模型（如Grounding DINO）获取与这些表达对应的边界框，生成框 - 文本对。
3. **使用框提示生成掩码**：将边界框转换为掩码，使用图像分割模型SAM生成掩码，并进行后处理，最后通过基于掩码的非极大值抑制（NMS）合并段 - 文本对。



**USE Model：**

1. **图像编码器**：利用预训练的视觉变换器（ViTs）提取图像块嵌入，通过多级别特征合并，结合CLIP和DINOv2的信息，同时获取全局图像特征。在训练过程中，CLIP和DINOv2保持冻结，仅线性层归一化（LLN）模块和块尺度参数可训练。
2. **段嵌入头**：根据输入段从图像块嵌入中提取段嵌入，并将其映射到视觉 - 语言联合空间。通过计算段在每个图像块内的面积并归一化，得到段在每个块内的权重，进而计算加权平均嵌入，最后通过线性层映射为段嵌入。
3. **训练与损失**：使用段 - 文本对比损失来训练模型，在训练时，每个段随机采样一个文本描述来计算文本嵌入。

## 实验（Compared with SOTA）

训练集：COCO、Visual Genome (VG)       测试集：ADE20K、Pascal Context



> 评估方法：使用类无关掩码，通过提示SAM生成掩码，经过滤和合并后，用模型获取掩码嵌入，计算与目标类文本嵌入的相似度，转换为概率，聚合像素上所有片段的概率进行类别预测。
  >
  > 
  >
  > 对比结果：与最先进的开放词汇语义分割方法在**ADE20K和Pascal Context数据集**上对比，以平均交并比（mIoU）评估性能。结果表明，USE方法在所有数据集上大幅优于最先进的两阶段方法，与端到端方法相比平均性能最佳，在COCO和VG图像上训练时性能进一步提升。





![Snipaste_2025-03-26_14-31-25](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-26_14-31-25.png)





## 实验（Ablation Experiments）:1st_place_medal:



- **预训练骨干网络选择**：在ADE20K数据集和开放词汇语义分割任务上研究，结果表明结合CLIP和DINOv2可获得性能提升。
- **图像编码器架构设计**：研究cls令牌对性能的影响，结果显示包含cls令牌可提高mIoU。
- **定性比较**：对比从真实标注和MLLM增强标注中提取的对象，MLLM增强标注能捕获更细粒度的对象和部件。



![Snipaste_2025-03-26_14-33-30](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-26_14-33-30.png)



## 结论

作者提出用于**开放词汇图像分割的USE框架**，通过实验研究得出以下结论：



 >1. **方法有效性**：该框架结合精心设计的数据管道和轻量级嵌入模型，能在无人工标注下以零样本方式有效对图像片段进行分类。 
 >2. **性能优越性**：在语义分割和部件分割任务的实验中，USE框架在**ADE20K、Pascal Context**和**PartImageNet**等数据集上，大幅超越现有最先进的两阶段方法，平均性能也优于端到端方法。 
 >3. **研究意义**：此工作为构建开放词汇图像分割的基础模型和基于片段的表征学习提供了参考，有望推动相关领域的研究发展。 



