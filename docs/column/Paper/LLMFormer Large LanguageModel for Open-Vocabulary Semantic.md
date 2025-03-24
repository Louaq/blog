# LLMFormer Large LanguageModel for Open-Vocabulary Semantic Segmentation

<ArticleMetadata/>

Hunan University、Monash University

## 摘要

**Open-vocabulary (OV) semantic segmentation** has attracted increasing attention in recent years, which aims to recognize
objects in an open class set for real-world applications. While prior OV semantic segmentation approaches have relied on
additional semantic knowledge derived from vision-language (VL) pre-training, such as the popular CLIP model, this paper
introduces a novel paradigm by harnessing the unprecedented capabilities of large language models (LLMs). Inspired by
recent breakthroughs in LLMs that provide a richer knowledge base compared to traditional vision-language pre-training, our proposed methodology capitalizes on the vast knowledge embedded within LLMs for OV semantic segmentation. Particularly, we partition LLM knowledge into object, attribute, and relation priors, and propose three novel attention modules-semantic, scaled visual, and relation attentions, to utilize the LLM priors. Extensive experiments are conducted on common benchmarks including ADE20K (847 classes) and Pascal Context (459 classes). The results show that our model outperforms previous state-of-the-art (SoTA) methods by up to 7.2% absolute. Moreover, unlike previous VL-pre-training-based works, our method can even predict OV segmentation results without target candidate classes.

## 翻译

开放词汇语义分割近年来受到越来越多的关注，其目的是为了在现实应用中识别开放类集中的对象。虽然之前的开放词汇语义分割方法依赖于来自视觉语言(VL)预训练的额外语义知识，例如流行的CLIP模型，但本文通过利用大型语言模型(大语言模型)前所未有的能力引入了一种新的范式。与传统的视觉语言预训练相比，大语言模型提供了更丰富的知识库，受其最新突破的启发，我们提出的方法利用大语言模型中嵌入的大量知识进行开放词汇语义分割。特别地，我们将大语言模型知识划分为对象先验、属性先验和关系先验，并提出了语义关注、尺度视觉关注和关系关注三个新的关注模块来利用大语言模型先验。在包括ADE20K(847个类)和Pascal Context(459个类)在内的常见基准测试上进行了广泛的实验。结果表明，我们的模型比以前的最先进的(SoTA)方法高出7.2%。此外，与之前基于vl预训练的工作不同，我们的方法甚至可以在没有目标候选类的情况下预测开放词汇分割结果。

## 研究背景

基于先验的语义分割方法可以识别固定集的目标种类，但不能够很好的处理真实世界中各种新的目标，由此引出开放词汇语义分割。开放词汇语义分割分为两种：一阶段和两阶段，尽管取得了不错的效果，但是大多数还是利用预训练的视觉语言模型提取embeding，这种方式仅提供有限的语义信息。随着大语言模型的发展，由于其提供了对场景的综合理解能力，本文作者尝试采用LLM的知识解决开放词汇语义分割中的挑战，即利用大语言模型描述中的目标名字、目标属性和目标关系。

![Snipaste_2025-03-24_15-58-54](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-24_15-58-54.png)



## 研究现状

- **固定集语义分割**：早期采用CNN架构，后引入多尺度组合、全局上下文建模和transformer等方法，但难以利用大预训练模型知识，且只能识别固定集对象。
- **开放词汇语义分割**：分为单阶段和两阶段方法。两阶段方法依赖训练良好的掩码生成器，计算成本高；单阶段方法虽有改进，但大多仅从视觉 - 语言预训练模型提取知识，语义信息有限。
- **大语言模型**：在许多领域取得成功，具备综合复杂推理能力，部分模型可理解视觉内容，但主要用于通用表示和预测

## 提出的模型

![Snipaste_2025-03-24_16-00-15](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-24_16-00-15.png)



1. 整体架构

   LLMFormer由三个主要部分组成：

   - **图像特征提取（Image Feature Extraction）**：使用多模态大语言模型（MLLM）中的视觉编码器、适配器（ViT Adapter）和多尺度可变形注意力（MSDA）模块，以捕获多尺度的图像特征。
   - **LLM先验提取（LLM Prior Extraction）**：通过向LLM输入问题（如“描述图像”），获取图像的全面描述，并利用语言解析工具从中提取对象、属性和关系先验知识。
   - **LLM先验引导的分割（LLM-Prior-Guided Segmentation）**：引入了三种新型注意力模块，分别是语义注意力（Semantic Attention）、缩放视觉注意力（Scaled Visual Attention）和关系注意力（Relation Attention），以利用LLM的先验知识进行开放词汇语义分割。



2. 关键组件

- **语义注意力（Semantic Attention）**：将对象和属性先验知识嵌入到掩码嵌入中，以增强开放词汇对象的发现、掩码预测和分类能力。该模块通过多头交叉注意力机制，捕捉对象先验与掩码之间的对应关系。
- **缩放视觉注意力（Scaled Visual Attention）**：基于属性先验知识，为每个掩码选择合适的视觉特征图，以更好地分割不同大小的对象。具体来说，该模块根据属性先验生成掩码的属性嵌入，并通过多层感知机（MLP）预测尺度选择分数，从而选择合适尺度的特征图。
- **关系注意力（Relation Attention）**：利用LLM的关系先验知识，学习掩码之间的关系。该模块通过生成对象关系图，并将其映射到掩码级别，然后通过多头自注意力机制将关系先验知识编码到掩码嵌入中。







::: tip

重要

:::

## 实验（Compared with SOTA）

> 数据集：训练：COCO-Stuff，测试：ADE20K、Pascal Context、Pascal VOC



- **Pascal Context数据集**：与FC - CLIP相比，在PC - 459和PC - 59上分别提高了7.2%和5.8%；与SAN相比，分别提高了8.3%和4.0%。
- **ADE20K数据集**：在A - 847和A - 150上均达到了最先进的性能，超过FC - CLIP分别为1.7%和4.4%，超过使用VIT - L骨干的SAN分别为2.8%和5.2%。
- **Pascal VOC 2012数据集**：取得了最佳的mIoU，显著超过之前的SOTA方法FC - CLIP 1.4%。在Open IoU指标下也有显著提升，证明了模型的开放词汇能力。

![Snipaste_2025-03-24_16-04-53](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-24_16-04-53.png)



![Snipaste_2025-03-24_16-05-00](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-24_16-05-00.png)



![Snipaste_2025-03-24_16-05-17](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-24_16-05-17.png)



## 实验（Ablation Experiments）:1st_place_medal:



- **主要组件的影响**：语义注意力模块能显著提升性能，基于大语言模型（LLM）属性的尺度选择和关系注意力可进一步提高性能，完整模型在A - 847和A - 150上取得最佳性能。
- **语义注意力**：使用对象先验能持续提高开放词汇分割性能，属性先验可进一步增强结果，交叉注意力在整合先验的方法中表现最优。
- **缩放视觉注意力**：多尺度方法优于单尺度方法，基于属性先验的尺度选择方法优于其他非选择方法。
- **关系注意力**：完整模型通过整合LLM关系先验到自注意力图中，在A - 847和A - 150上分别比仅使用原始注意力图的模型提高了1.7%和2.3%。
- **不同注意力方法**：模型的注意力方法显著优于掩码注意力和TSG注意力，因为它们能利用LLM先验来改进开放词汇语义分割。
- **成本比较**：与Zegformer和OV - Seg相比，模型的可训练参数更少，同时精度更高。使用LLAVA - Phi2 - 2.7B可进一步降低计算开销，性能仅有轻微下降。
- **不同提示**：详细提示（描述所有对象、属性和关系）能进一步提高分割性能，但实验中主要使用简单提示。



## 结论

> 作者提出了LLMFormer这一利用大语言模型（LLM）知识进行开放词汇语义分割（OV）的新方法，并得出以下结论： 

1. **方法有效性**：提出语义、缩放视觉和关系三种注意力模块，利用LLM的对象、属性和关系先验知识进行分割，大量实验证明LLMFormer及各注意力模块有效。 
2. **性能优势**：在ADE20K、Pascal Context和Pascal VOC等数据集上显著优于现有方法，绝对提升最高达7.2%，还能在无预定义候选类别的情况下预测OV分割结果，更适用于实际应用。
3. **未来方向**：当前工作虽提升了OV识别能力，但LLM参数多致速度慢，且存在细粒度分类和边界分割问题，未来将研究效率、细粒度分类和分割问题。 



> 不足及展望：使用LLM带来了巨大的参数量，导致速度减小；本文当前的工作关注于提升开放词汇的分类能力，其他的细粒度分类和边界框分割问题没有涉及，这也是未来工作的研究方法。

