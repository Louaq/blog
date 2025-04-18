# Scaling Up Multi-domain Semantic Segmentation with Sentence Embeddings
<ArticleMetadata/>
## 摘要



The **state-of-the-art semantic segmentation methods** have achieved impressive performance on predefined close-set individual datasets, but their generalization to zero-shot domains and unseen categories is limited. Labeling a large-scale dataset is challenging and expensive, Training a robust semantic segmentation model on multi-domains has drawn much attention. However, inconsistent taxonomies hinder the naive merging of current publicly available annotations. **To address this, we propose a simple solution to scale up the multi-domain semantic segmentation dataset with less human effort**. We replace each class label with a sentence embedding, which is a vector-valued embedding of a sentence describing the class. This approach enables the merging of multiple datasets from different domains, each with varying class labels and semantics. We merged publicly available noisy and weak annotations with the most finely annotated data, over 2 million images, which enables training a model that achieves performance equal to that of state-of-the-art supervised methods on 7 benchmark datasets, despite not using any images therefrom. Instead of manually tuning a consistent label space, we utilized a vector-valued embedding of short paragraphs to describe the classes. By fine-tuning the model on standard semantic segmentation datasets, we also achieve a significant improvement over the state-of-the-art supervised segmentation on NYUD-V2 (Silberman et al., in: European conference on computer vision, Springer, pp 746–760, 2012) and PASCAL-context (Everingham et al. in Int J Comput Visi 111(1):98–136, 2015) at 60% and 65% mIoU, respectively. Our method can segment unseen labels based on the closeness of language embeddings, showing strong generalization to unseen image domains and labels. Additionally, it enables impressive performance improvements in some adaptation applications, such as depth estimation and instance segmentation. Code is available at https://github.com/YvanYin/SSIW.

## 翻译

当前最先进的语义分割方法在预设的封闭数据集上表现出色，但其在零样本（zero-shot）领域和未见过类别上的泛化能力仍然有限。由于大规模数据标注既困难又昂贵，开发跨领域通用的鲁棒语义分割模型成为研究热点。然而，现有公开数据集的不同分类标准阻碍了它们的直接融合。为此，我们提出了一种高效扩展多领域语义分割数据集的方法：用文本嵌入（text embedding）替代传统类别标签，这种向量化的语义表示可以融合不同领域、不同标签体系的数据。通过整合包含 200 万张图像的精细标注数据与公开的带噪声弱标注数据，我们训练的模型在 7 个主流测试集上达到了监督学习的顶尖水平，尽管完全没有使用这些测试集的训练图像。与人工统一标签体系不同，我们通过语言模型生成短文本描述来表征类别语义。在标准数据集微调后，模型在 NYUD-V2 (Silberman et al., 2012) 和 PASCAL-context (Everingham et al., 2015) 上分别取得 60% 和 65% 的平均交并比（mIoU），显著超越现有监督方法。该方法通过计算语义相似度实现未见过标签的分割，展现出优异的跨领域泛化能力，**同时在深度估计、实例分割等下游任务中带来显著性能提升。**代码已开源：https://github.com/YvanYin/SSIW



## 研究背景

语义分割是计算机视觉的基础任务，在自动驾驶、农业机器人和医学等领域应用广泛。当前语义分割方法虽在预定义封闭集数据集上表现出色，但存在明显局限：

1. **泛化能力不足**：这些方法假设测试集中的所有类别都在训练时出现，然而现实场景并非如此，且模型受限于训练数据集的图像领域，难以泛化到新领域和标签。
2. **数据集合并难题**：训练多领域语义分割模型是提升模型鲁棒性和泛化能力的自然途径，但直接合并不同领域的数据集会导致标签分类体系冲突，手动统一标签集和重新标注的方法不仅费力，在开放集场景下也存在局限性。
3. **现有零样本方法的缺陷**：现有解决开放集问题的方法多在小数据集上实验，限制了其在现实场景中的应用潜力。





## 研究现状

- **语义分割**：深度学习方法在特定高质量数据集上取得显著成果，但泛化能力受限。如FCN开启全卷积方法，后续ResNet、Transformer等推动性能提升。
- **零样本语义分割**：分为判别式和生成式方法，前者如Xian等将像素特征转换到语义词嵌入空间，后者如ZS3Net用生成模型生成像素特征。
- **跨领域密集预测**：有方法合并分割数据集提升性能和泛化能力，如Ros合并六个驾驶数据集，Lambert提出统一分类法合并多领域数据集。
- **零样本学习标签编码**：许多方法为类别标签生成语义嵌入，如Bucher用Word2Vec编码标签，Lseg用语言嵌入监督类别标签。



## 提出的模型

1. - **创建语言嵌入**：从Wikipedia收集每个类别的简短描述，使用CLIP - ViT语言模型将这些描述编码为向量值的句子嵌入。这种方式能保留标签之间的语义关系，相比单字标签嵌入，更能反映类别间的语义相似性，有助于零样本标签的分割。

   - **混合数据的异构约束**：为解决合并数据集中标注质量不平衡的问题，提出了异构损失函数。
- **高质量标注数据集**：对所有样本施加像素级损失。
     - **粗标注数据集（如OpenImages）**：通过自适应阈值，对高置信度样本施加损失，忽略噪声较大的部分。
- **弱标注数据集（如Objects365）**：采用蒸馏方法，利用CLIP分类模型的知识，对分割模型进行监督。



![Snipaste_2025-03-18_09-38-37](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-18_09-38-37.png)



## 实验（Compared with SOTA and ablation experiment）



### 1. 数据集与实现细节

- **训练数据**：合并了7个高质量语义分割数据集（**ADE20K、Mapillary、COCO Panoptic、IDD、BDD100K、Cityscapes、SUNRGBD**），并从OpenImagesV6和Objects365中采样部分数据用于训练。这些数据集涵盖了不同的标注风格和图像领域，总训练图像约**200万张**。
- 测试数据
  - **语义分割测试**：在8个零样本数据集（CamVid、KITTI、Pascal VOC、Pascal Context、ScanNet、WildDash1、WildDash2、YoutubeVIS）上进行测试，并在NYUv2和Pascal Context上微调模型以评估性能。
  - **下游应用测试**：在零样本数据集上创建伪语义标签，用于提升实例分割和单目深度估计的性能。实例分割在COCO数据集上进行测试，深度估计在NYUDv2、KITTI、DIODE、ScanNet和Sintel等数据集上进行评估。
- 评估指标
  - **语义分割**：使用平均交并比（mIoU）进行评估。
  - **实例分割**：使用平均精度（AP）进行评估。
  - **深度估计**：采用绝对相对误差（AbsRel）和满足特定条件的像素百分比（δτ）进行评估。
- **多尺度评估**：在评估语义分割性能时，将测试图像调整为多个尺度（0.5 - 1.75，步长为0.25）输入模型，然后平均得分作为最终预测结果。
- **实现细节**：使用HRNet - W48和Segformer两种网络架构进行实验。训练时，采用不同的优化器和学习率衰减策略，并对图像进行数据增强处理。推理时，将图像短边调整为三种分辨率（480/720/1080），并根据需要采用多尺度或单尺度测试。

### 2. 实验内容

- **语义分割评估**

     在15个数据集上进行评估，以验证模型的鲁棒性和有效性。

  - **鲁棒性评估**：与现有最先进的方法在6个零样本数据集上进行比较，结果表明该方法在CamViD、ScanNet和WildDash1上达到了最先进的性能，并且在混合数据集上训练的模型比在单个数据集上训练的HRNet更具鲁棒性。
  - **Wilddash2评估**：在Wilddash2基准测试中，该方法取得了最先进的性能。
  - **异质损失聚合效果评估**：提出异质损失来监督合并的数据集，实验结果表明，在聚合OpenImages和Objects365时，使用异质损失可以持续提高所有零样本数据集的性能。
  - **未见标签泛化能力评估**：通过在YoutubeVIS数据集上采样具有5个零样本标签的约2100张图像进行实验，结果表明该方法比Mseg和JoEm更具鲁棒性，并且使用句子编码可以获得更好的性能。
  - **小数据集微调评估**：在NYUv2和Pascal Context上微调模型，与其他预训练权重相比，该方法的预训练权重可以显著提升性能，超过现有最先进的方法。
  - **蒸馏效果评估**：使用CLIP对模型进行知识蒸馏，实验结果表明，即使只在裁剪的边界框区域进行粗略的知识蒸馏，性能仍然可以得到显著提升。
  - **语言嵌入合并训练数据效果评估**：比较了两种合并训练数据标签的方法，结果表明，使用句子嵌入来表示标签可以更好地解决标签冲突问题，从而获得更好的性能。
  - **与Lseg比较**：与Lseg方法在不同粒度的标签集上进行比较，结果表明，在细化标签集上，该方法的分割结果更优。

- **下游应用提升评估**

  - **单目深度估计**：在多个零样本深度数据集上创建伪语义标签，将其转换为像素级语言嵌入并输入到深度预测网络中。实验结果表明，与基线方法LeReS相比，添加创建的嵌入可以持续提高所有数据集的性能。
  - **实例分割**：在采样的Objects365上创建伪实例掩码，用于训练CondInst模型。实验结果表明，使用仅25%的COCO数据，该方法可以达到与基线方法相当的性能，并且在使用完整的COCO数据进行微调时，性能比基线方法高约4% AP。

## 结论

作者提出一种语义分割方法，能在多个零样本跨域数据集上取得良好性能。具体结论如下：

1. **数据融合**：从维基百科收集标签简短描述，编码为向量嵌入替代标签，可轻松合并多数据集，得到强大鲁棒的分割模型。
2.  **损失函数**：提出异质损失，利用噪声和弱标注数据集。 
3.  **性能表现**：在7个跨域数据集上，性能优于或与当前最先进方法相当，模型能分割零样本标签。
4.  **下游应用**：该模型显著提升单目深度估计和实例分割等下游应用的性能。不过，模型性能可能受语言模型表示限制，对训练语言空间外的类别泛化能力不足，但增加数据类别和改进语言模型有望解决。 
