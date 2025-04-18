# Scribble Hides Class: Promoting Scribble-Based Weakly-Supervised Semantic Segmentation with Its Class Label

Peking University, Beijing, China

## 摘要

**Scribble-based weakly-supervised semantic segmentation** using sparse scribble supervision is gaining traction as it reduces annotation costs when compared to fully annotated alternatives. Existing methods primarily generate pseudo-labels by diffusing labeled pixels to unlabeled ones with local cues for supervision. However, this diffusion process fails to exploit global semantics and class-specific cues, which are important for semantic segmentation. In this study, we pro-pose a class-driven scribble promotion network, which uti-
lizes both scribble annotations and pseudo-labels informed by image-level classes and global semantics for supervision. Directly adopting pseudo-labels might misguide the segmentation model, thus we design a localization rectification module to correct foreground representations in the feature space. To further combine the advantages of both supervisions, we also introduce a distance entropy loss for uncertainty reduction,which adapts per-pixel confidence weights according to the reliable region determined by the scribble and pseudo-label’s boundary. Experiments on the ScribbleSup dataset with different qualities of scribble annotations outperform all the previous methods, demonstrating the superiority and robustness
of our method. The code is available at https://github.com/Zxl19990529/Class-driven-Scribble-Promotion-Network.

## 翻译

 **基于涂鸦的弱监督语义分割（Weakly-supervised Semantic Segmentation, WSSS）**通过使用稀疏涂鸦监督正逐渐受到关注，相较于需要完整标注的替代方案，这种方法能显著降低标注成本。现有方法主要通过基于局部特征线索的像素扩散机制，将已标注像素的特征传播至未标注区域来生成伪标签。然而，这种扩散过程未能有效利用全局语义信息和类别特异性特征线索，而这些要素对实现高质量的语义分割至关重要。本研究提出了一种类驱动的涂鸦增强网络，该网络通过协同利用涂鸦标注和基于图像级类别及全局语义引导的伪标签实现监督。考虑到直接使用伪标签可能误导分割模型，我们特别设计了定位校正模块，用于在特征空间中修正前景目标表示。为了深度融合两种监督方式的优势，我们还开发了距离熵损失函数，通过涂鸦标注与伪标签边界的可靠区域确定机制，动态调整各像素点的置信权重以降低不确定性。在ScribbleSup数据集上采用不同质量涂鸦标注的实验表明，我们的方法在性能表现和鲁棒性方面均优于现有所有方法。相关代码已开源：https://github.com/Zxl19990529/Class-driven-Scribble-Promotion-Network。

## 研究背景

语义分割领域已经取得很大的进步，但是也面临着一些挑战：手动的处理大量的数据集费时费力，且不能在现实世界中进行语义分割。基于涂鸦的WSSS的内在挑战在于稀疏标签提供的部分监督，现存的方法有三种：正则化损失、一致性学习和标签扩散。基于正则化损失的方法设计了特定的损失函数来提高模型的稳定性，基于一致性学习的方法旨在捕获不变特征，从而通过一致性损失来提高细粒度分割性能。基于标签扩散的方法通过将标记的像素扩散到未标记的像素来生成像素级伪标签，但以上的方法都存在不足，利用涂鸦标签的方法也存在不足。



## 研究现状



- **图像级弱监督语义分割**：早期深度学习图像分类成果推动特征可视化工作，如引入类激活图（CAM）技术，后续有多种方法基于此生成语义伪标签以训练分割网络，还出现利用像素相关性、自注意力机制等的方法。
- **涂鸦级弱监督语义分割**：早期采用传统交互式分割方法，近年分为正则化损失、一致性学习和标签扩散三类方法。部分新方法尝试自适应生成伪标签。
- **其他弱监督语义分割**：点级和边界框级标注也是常见方式，但在训练监督和人工成本间难以平衡。



## 提出的模型

![Snipaste_2025-03-18_14-48-25](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-18_14-48-25.png)





利用从**稀疏涂鸦**中提取的图像级类别标签为图像监督分割提供全局线索，生成全局考虑的伪标签，同时引入定位校正模块（Localization Rectification Module，LoRM）和距离熵损失（Distance Entropy Loss，DEL）来结合两种监督的优势。



## 实验（Compared with SOTA）

> 数据集：PASCAL VOC2012 and SBD
>



### 1. ScribbleSup数据集上的比较

- **模型配置**：部署resnet101作为骨干网络，deeplabV3+作为分割器，超参数设置为(λs = e2, λc = e7)以生成最佳结果。
- **公平性处理**：对于先前工作RAWKS和NCL采用的CRF后处理，因其耗时较长，在比较中进行了考虑。对于近期工作TEL和AGMM，为确保公平性，使用标准涂鸦重新实现它们。
- **实验结果**：该方法优于所有先前方法，比TEL高0.6%，比AGMM高1.6%。测试结果从PASCAL VOC2012网站获取。可视化比较显示，近期方法未能捕捉到正确的全局语义。

![Snipaste_2025-03-18_15-01-53](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-18_15-01-53.png)





### 2. 涂鸦收缩和丢弃实验

由于基于涂鸦的注释具有灵活性，用户注释的涂鸦长度可能不同，有时会丢弃一些对象。因此，评估模型在不同收缩或丢弃比率下的鲁棒性很重要。实验结果表明，随着丢弃或收缩比率的增加，模型性能下降。当涂鸦收缩到点（收缩比率 = 1）时，AGMM和TEL的性能下降约10%，而该方法的性能仅下降不到1%，显示出其鲁棒性。

![Snipaste_2025-03-18_15-02-32](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-18_15-02-32.png)

## 实验（Ablation Experiments）:1st_place_medal:

### 3. 组件消融实验

- **模型配置**：采用resnet50作为骨干网络，deeplabV2作为分割器，使用ScribbleSup数据集进行训练和验证。
- **超参数调整**：通过网格搜索找到距离熵损失所有组件的最佳超参数组合，即λs = 1, λc = 6。
- **实验结果**：单独使用涂鸦或伪标签作为基本监督产生的结果不理想（约67%），而同时使用两者产生了更好的结果（72.13%），表明涂鸦和伪标签提供了互补的监督。仅添加Ldc会使模型性能下降到与仅使用Lsegc几乎相同的水平，这是由于模型对伪标签中的噪声标签过拟合，而LoRM可以解决这个问题，将模型性能从67.33%提高到73.64%。与基线相比，所有组件都能提高性能，同时使用所有组件可获得最佳性能。

![Snipaste_2025-03-18_15-02-52](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-18_15-02-52.png)

### 4. 伪标签消融实验

使用deeplabV3+作为分割器，对不同伪标签进行实验，以评估其影响。结果表明，随着伪标签基础准确率的提高，该方法的性能也随之提高，这表明该方法直接受益于图像级弱监督语义分割方法，是一个有前途的发展方向。



![Snipaste_2025-03-18_15-03-15](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-18_15-03-15.png)



## 结论

作者提出了用于**基于涂鸦的弱监督语义分割（scribble-based WSSS）**问题的类驱动涂鸦提升网络（**CDSP**），并得出以下结论： 

> 1. 引入定位校正模块（LoRM）解决模型对噪声标签过拟合问题，通过参考其他前景位置的特征表示，校正被误导的前景特征。 
>
>    
>
> 2. 采用距离熵损失（DEL）增强网络鲁棒性，根据涂鸦和伪标签边界确定可靠区域，为预测分配不同置信度。 
>
>    
>
> 3. 实验结果表明，该方法优于现有方法，在不同质量涂鸦的实验中表现出卓越的鲁棒性，达到了当前最优性能，证明了利用图像级类别信息生成全局伪标签用于基于涂鸦的弱监督语义分割的有效性。 


