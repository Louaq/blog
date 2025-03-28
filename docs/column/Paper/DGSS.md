# Stronger, Fewer, & Superior Harnessing Vision Foundation Models for Domain Generalized Semantic Segmentation（DGSS）
<ArticleMetadata/>
##  **中国科学技术大学，上海人工智能实验室**

https://github.com/w1oves/Rein.git

> 摘要：In this paper, we first assess and harness various Vision Foundation Models (VFMs) in the context of Domain Generalized Semantic Segmentation (DGSS). Driven by the motivation that Leveraging Stronger pre-trained models and Fewer trainable parameters for Superior generaliz- ability, we introduce a robust fine-tuning approach, namely “Rein”, to parameter-efficiently harness VFMs for DGSS. Built upon a set of trainable tokens, each linked to distinct instances, Rein precisely refines and forwards the feature maps from each layer to the next layer within the backbone. This process produces diverse refinements for different categories within a single image. With fewer trainable parameters, Rein efficiently fine-tunes VFMs for DGSS tasks, surprisingly surpassing full parameter fine-tuning. Extensive experiments across various settings demonstrate that Rein significantly outperforms state-of-the-art methods. Remarkably, with just an extra 1% of trainable parameters within the frozen backbone, Rein achieves a mIoU of78.4% on the Cityscapes, without accessing any real urban-scene datasets. Code is available at https://github.com/w1oves/Rein.git.

> 翻译：在本文中，我们首先在领域泛化语义分割（DGSS）任务中，评估并应用了多种视觉基础模型（VFM）。我们提出的动机是：“通过利用更强大的预训练模型和更少的可训练参数，获得更好的泛化能力”。基于此，我们提出了一种高效的微调方法——“Rein”，该方法能够以参数高效的方式利用VFM来解决DGSS任务。Rein方法依赖于一组可训练的标记，每个标记与特定实例对应，能够精确地细化并将特征图从每一层传递到骨干网络的下一层。这样，Rein能够在单张图像中为不同的类别生成多样化的细化结果。通过减少可训练的参数，Rein在微调VFM时，效果出乎意料地优于完全参数微调。通过广泛的实验验证，Rein显著超越了现有的最先进方法。值得一提的是，仅在冻结的骨干网络中增加1%的可训练参数，Rein便在Cityscapes数据集上达到了78.4%的mIoU，而且无需使用任何真实的城市场景数据集。代码已发布，您可以通过https://github.com/w1oves/Rein.git访问。





![Snipaste_2025-02-26_21-13-37](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-26_21-13-37.png)



![Snipaste_2025-02-26_21-13-59](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-26_21-13-59.png)

​                                                                                **模型结构图**



**本文的研究背景：** 

- **传统DGSS方法的局限**：以往DGSS方法着重提升模型在多未见领域的预测准确性，但多采用VGGNet、MobileNetV2和ResNet等经典骨干网络，且依赖复杂数据增强和领域不变特征提取策略，对更强的VFMs在DGSS中的效能探索不足。 
- **VFMs的潜力与挑战**：近年来，CLIP、MAE、SAM等大规模VFMs显著提升了计算机视觉任务的性能，其在不同未知场景下展现出强大泛化能力。然而，将VFMs用于DGSS任务存在挑战，常用数据集规模远小于ImageNet，对VFMs大量可训练参数进行微调会导致泛化能力受限，且现有的参数高效微调策略大多不适用于DGSS。-
-  **研究动机**：基于利用更强预训练模型和更少可训练参数实现更优泛化能力的动机，作者评估并利用VFMs进行DGSS研究，提出“Rein”微调方法，以高效利用VFMs解决DGSS问题。 





**研究现状：**

- **领域广义语义分割（DGSS）**：传统方法聚焦提升模型跨多未见领域的预测准确性，采用复杂数据增强和领域不变特征提取策略，多使用VGGNet、MobileNetV2等旧骨干网络。 
-  **视觉基础模型（VFMs）**：如CLIP、MAE、SAM等在计算机视觉挑战中表现出色，具有显著的跨场景泛化能力，但在DGSS任务中的表现缺乏专门研究。 
 - **参数高效微调（PEFT）**：在自然语言处理领域取得成功，部分方法开始应用于计算机视觉，但大多不是为DGSS设计，难以对单张图像中不同实例的特征进行细化。 





**研究思路：**



本文聚焦于在领域泛化语义分割（DGSS）中利用视觉基础模型（VFMs），研究思路清晰，具体如下：

1. **提出问题**：先前DGSS方法多采用传统骨干网络，而大规模VFMs虽在计算机视觉挑战中表现出色，但在DGSS中的性能及利用方式尚不明确。因此，作者提出评估VFMs在DGSS中的性能以及如何有效利用VFMs的问题。
2. **构建框架**：以利用更强预训练模型和更少可训练参数实现更优泛化能力为动机，作者引入**Rein**微调方法，在骨干网络层间嵌入该机制，以有效利用VFMs的强大能力。
3.  **选择方法**：选择CLIP、MAE、SAM、EVA02和DINOv2等五种不同训练策略和数据集的VFMs进行评估。设置“Full”和“Freeze”两个基本基线，并提出“Rein”方法。采用AdamW优化器，设置特定学习率、迭代次数、批量大小等进行训练。
 4. **分析数据**：在多个数据集和三种泛化设置下进行实验，对比Rein与现有DGSS和参数高效微调（PEFT）方法的性能。通过消融实验分析Rein各组件的有效性、令牌长度和秩对模型性能的影响，以及训练速度、GPU内存使用和模型存储要求。
 5. **得出结论**：实验表明，冻结的VFMs性能优于先前DGSS方法，Rein以更少可训练参数显著增强VFMs的泛化能力，大幅超越现有方法。证明了VFMs在DGSS领域的巨大潜力以及Rein方法的有效性。 





**本文的创新点：** 

1. **评估并利用视觉基础模型（VFMs）**：首次在**领域泛化语义分割（DGSS）**中评估多种VFMs，证实其强大泛化能力，为该领域建立重要基准。 
2. **提出“Rein”微调方法**：通过可学习令牌对特征图进行实例级细化，以较少可训练参数有效利用VFMs，显著提升泛化性，超越现有方法。
3. **设计优化策略**：采用层共享MLP权重和低秩token序列，减少参数冗余，提高训练效率。 



> 写作启发：**领域泛化语义分割（DGSS）**、**视觉基础模型（VFMs）**、**参数高效微调（PEFT**）
