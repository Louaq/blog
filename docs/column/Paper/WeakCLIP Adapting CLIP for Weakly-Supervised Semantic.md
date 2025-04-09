# WeakCLIP: Adapting CLIP for Weakly-Supervised Semantic Segmentation

华中科技大学、西北工业大学

<ArticleMetadata/>

::: note

CLIP、弱监督语义分割

:::

## 摘要

Contrastive language and image pre-training (CLIP) achieves great success in various computer vision tasks and also presents
an opportune avenue for enhancing weakly-supervised image understanding with its large-scale pre-trained knowledge. As
an effective way to reduce the reliance on pixel-level human-annotated labels, weakly-supervised semantic segmentation
(WSSS) aims to refine the class activation map (CAM) and produce high-quality pseudo masks. Weakly-supervised semantic
segmentation (WSSS)aims to refine the class activationmap(CAM)as pseudo masks, but heavily relies on inductive biases like
hand-crafted priors and digital image processing methods. For the vision-language pre-trained model, i.e. CLIP, we propose a
novel text-to-pixel matching paradigm forWSSS.However, directly applying CLIP toWSSS is challenging due to three critical
problems: (1) the task gap between contrastive pre-training and WSSS CAM refinement, (2) lacking text-to-pixel modeling to
fully utilize the pre-trained knowledge, and (3) the insufficient details owning to the 1/16 down-sampling resolution ofViT. Thus,
we proposeWeakCLIP to address the problems and leverage the pre-trained knowledge from CLIP toWSSS. Specifically, we
first address the task gap by proposing a pyramid adapter and learnable prompts to extract WSSS-specific representation. We
then design a co-attention matching module to model text-to-pixel relationships. Finally, the pyramid adapter and text-guided
decoder are introduced to gather multi-level information and integrate it with text guidance hierarchically.WeakCLIP provides
an effective and parameter-efficient way to transfer CLIP knowledge to refine CAM. Extensive experiments demonstrate that
WeakCLIP achieves the state-of-the-art WSSS performance on standard benchmarks, i.e., 74.0% mIoU on the val set of
PASCAL VOC 2012 and 46.1% mIoU on the val set of COCO 2014. The source code and model checkpoints are released
at https://github.com/hustvl/WeakCLIP.

## 翻译

对比语言和图像预训练(CLIP)在各种计算机视觉任务中取得了巨大的成功，并且利用其大规模的预训练知识为增强弱监督图像理解提供了一个很好的途径。弱监督语义分割(WSSS)是一种减少对像素级人工标注标签依赖的有效方法，其目的是细化类激活图(CAM)并生成高质量的伪掩膜。弱监督语义分割(WSSS)旨在将类激活图(CAM)细化为伪掩膜，但严重依赖于手工制作先验和数字图像处理方法等归纳偏差。对于视觉语言预训练模型，即CLIP，我们提出了一种新的文本到像素的wsss匹配范式。然而，直接应用CLIP toWSSS是具有挑战性的，因为存在三个关键问题:(1)对比预训练与WSSSCAM细化之间的任务差距;(2)缺乏文本到像素的建模以充分利用预训练的知识;(3)由于vit的下采样分辨率为1 16，细节不足。因此，我们提出了weakclip来解决问题，并利用CLIP toWSSS的预训练知识。具体来说，我们首先通过提出金字塔适配器和可学习的提示词符来提取特定于wss的表示来解决任务差距。然后，我们设计了一个共同关注匹配模块来模拟文本到像素的关系。最后，引入金字塔适配器和文本引导解码器，实现多级信息采集，并与文本引导分层集成。WeakCLIP提供了一种有效的、参数高效的方法来传递CLIP知识以改进CAM。大量的实验表明，WeakCLIP在标准基准测试上达到了最先进的WSSS性能，即在PASCAL VOC 2012的val集上达到了74.0%的mIoU，在COCO 2014的val集上达到了46.1%的mIoU。源代码和模型检查点在https://github.com/hustvl/WeakCLIP上发布。

## 研究背景

本文聚焦于弱监督语义分割（WSSS）任务，旨在解决当前方法在处理类激活图（CAM）种子时面临的问题，具体研究背景如下： 
- **WSSS的重要性与挑战**：语义分割中像素级标注耗时费力，限制了实际应用。WSSS利用弱监督信息生成伪像素级分割，可减轻标注负担，但仅使用图像级标签的WSSS是该领域最具挑战性的方向。
- **现有CAM细化方法的局限性**：现有方法多依赖手工先验和改进的数字图像处理算法来细化CAM，这些方法存在归纳偏差，限制了性能和鲁棒性。 
- **CLIP的潜力与应用挑战**：CLIP在计算机视觉任务中取得了巨大成功，为WSSS带来了新的机遇。然而，直接将CLIP应用于WSSS存在任务差距、缺乏文本到像素建模以及细节不足等问题。 基于以上背景，作者提出了WeakCLIP方法，旨在利用CLIP的预训练知识，通过文本到像素匹配范式解决WSSS中的关键问题，提高伪掩码的质量，从而推动WSSS的发展。 

## 研究现状

- **弱监督语义分割（WSSS）**：为减轻像素级标注负担，出现多种基于不同弱监督信息（如**边界框、涂鸦、点、图像级标签**）的算法。其中，基于**图像级标签**的WSSS最具挑战性，常使用类激活图（CAM）定位目标，但原始CAM噪声大、易出错，已有多种方法对其进行优化。
- **大规模预训练模型**：大规模预训练模型在各领域广泛应用，如CLIP通过对比学习在大量图像-文本对上预训练，展现出强大的知识迁移能力。已有研究尝试将CLIP应用于WSSS，如CLIMS引入辅助损失，CLIP - ES利用文本提示和GradCAM提升CAM质量。

![Snipaste_2025-04-09_08-44-06](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-09_08-44-06.png)

## 提出的模型



本文提出了一种名为**WeakCLIP的弱监督语义分割（WSSS）方法**，旨在利用预训练的CLIP模型知识来改进WSSS网络的类激活图（CAM）细化过程。以下是WeakCLIP模型的详细介绍： 

1. **文本到像素匹配范式**：与以往基于CLIP的WSSS方法不同，WeakCLIP提出了**文本到像素匹配**范式，以在像素级别查询相似度。具体而言，输入图像通过CLIP预训练的ViT - B网络提取多层特征图，经过投影层后，定义文本到像素匹配操作，得到文本到像素匹配的嵌入。 
2. **WeakCLIP框架** 
   - **可学习提示（Learnable Prompt）**：受CoOp和CLIP - Adapter启发，提出可学习嵌入作为自适应提示。将类文本标记并嵌入为类文本嵌入，与随机初始化的可学习嵌入拼接，作为文本编码器的输入，最终投影得到文本嵌入。  
   - **金字塔适配器（Pyramid Adapter）**：为解决CLIP视觉编码器专注于整体图像内容以及低分辨率问题，提出金字塔适配器。它独立于CLIP图像编码器，对不同分辨率的特征图进行处理，通过上采样和下采样操作，生成不同分辨率的特征，有效融合低级细节和高级表示。   
   - **协同注意力匹配模块（Co - attention Matching）**：为充分利用CLIP预训练知识，提出协同注意力匹配模块，用于建模双向文本到像素匹配。该模块使用两个交叉注意力模块分别建模文本到像素和像素到文本的关系，并通过残差连接更新文本和图像嵌入，最后进行文本到图像匹配得到协同注意力匹配的嵌入。  
   - **文本引导解码器（Text - Guided Decoder）**：为解决CLIP ViT - B的分辨率限制问题，引入文本引导解码器。将协同注意力匹配的嵌入插值到与适配器输出特征对应的大小，与适配器输出特征拼接后进行解码，得到分割预测。    
   - **WSSS损失（WSSS Losses）**：采用DSRG中使用的WSSS损失，包括平衡种子损失和边界损失。平衡种子损失计算分割预测与CAM种子之间的加权交叉熵损失；边界损失先使用条件随机场（CRF）处理分割预测以细化对象边界，然后计算CRF细化结果与分割预测之间的Kullback - Leibler散度损失。

3. **伪掩码生成和再训练**：使用训练好的WeakCLIP网络生成高质量的伪掩码。当推理结果中的类别不在图像级标签中时，将其标记为未知标签。最后，使用生成的伪掩码进行全监督分割，采用DeepLabv1网络架构，并尝试使用更先进的基于ViT的分割方法进行再训练。 实验结果表明，WeakCLIP在PASCAL VOC 2012和COCO 2014数据集上取得了优于以往WSSS方法的结果，证明了该方法的有效性和高效性。 

![Snipaste_2025-04-09_08-49-54](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-09_08-49-54.png)



## 实验（Compared with SOTA）

数据集：**PASCAL VOC 2012、COCO 2014**



- **ASCAL VOC 2012**：在CAM监督方面，WeakCLIP与MCTformer相同，但低于ViT - PCM；在伪掩码质量上，比基线MCTformer提高了8.1%，比AMN提高了5.0%。使用精炼后的伪掩码训练DeepLabV1网络，WeakCLIP在验证集和测试集上的mIoU分别达到74.0%和73.8%，优于其他仅使用图像级监督的方法，以及部分使用额外显著图监督或边界框监督的方法。使用基于ViT的再训练基准（Segmenter和SegFormer）可进一步提升分割结果，混合ViT再训练的WeakCLIP表现最佳。
- **COCO 2014**：WeakCLIP在验证集上的mIoU达到46.1%，比基线MCTformer提高了4.1%，优于其他仅使用图像级监督的方法。使用SegFormer和MiT - B2骨干进行再训练，WeakCLIP在COCO 2014验证集上取得最佳性能。





## 实验（Ablation Experiments）:1st_place_medal:

1. - **组件改进**：协同注意力匹配模块将验证集mIoU提高到67.4%；可学习提示将其提高到68.9%；金字塔适配器将性能提升到70.3%；文本引导解码器将验证集mIoU进一步提升到72.6%。
   - **可学习嵌入数量**：可学习嵌入数量为8时性能最佳。
   - **可学习温度初始值**：协同注意力匹配中可学习温度初始值为1e - 1时性能最佳。







## 其他实验（Other Experiments）:1st_place_medal:

1. **逐类语义分割结果**：在PASCAL VOC 2012的验证集和测试集以及COCO 2014的验证集上，将WeakCLIP与基线MCTformer进行逐类分割结果比较，WeakCLIP在大多数类别中表现更优。
2. **可视化分析**
   - 比较MCTformer和WeakCLIP生成的伪掩码，WeakCLIP生成的语义信息更准确、精确，能识别出MCTformer遗漏或识别不准确的对象位置。
   - 在PASCAL VOC 2012验证集上再训练后的分割结果可视化显示，WeakCLIP对室内和室外场景都能实现准确分割。
3. **参数效率分析**：与MCTformer相比，WeakCLIP仅训练12.4%的参数，训练帧率（FPS）快4.3倍，节省68.4%的GPU内存。
4. **不同CLIP骨干实验**：使用不同CLIP骨干进行实验，结果表明WeakCLIP - ResNet101性能优于WeakCLIP - ResNet50，WeakCLIP - ViT - B表现最佳。



## 结论

作者提出了名为**WeakCLIP**的新方案，旨在利用预训练CLIP模型的知识来增强弱监督语义分割（WSSS）网络的**类激活图（CAM）**细化过程。该框架采用了新的文本到像素匹配范式，有效解决了将CLIP集成到WSSS中存在的三个关键问题。在广泛使用的PASCAL VOC 2012和COCO 2014数据集上的实验结果表明，与以往的WSSS方法相比，WeakCLIP取得了显著改进。引入利用大规模视觉语言预训练的WeakCLIP范式，有望推动WSSS问题的解决。未来，作者计划探索更先进的大规模CLIP，以提升WSSS的像素级理解能力。 

