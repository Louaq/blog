# A Transformer-based Adaptive Prototype Matching Network for Few-Shot Semantic Segmentation
<ArticleMetadata/>
## 南京信息工程大学、青海师范大学、澳门大学、中国科学院  :100:





## **摘要：**

> **Few-shot semantic segmentation (FSS)** aims to generate a model for segmenting novel classes using a limited number of annotated samples. Previous FSS methods have shown sensitivity to background noise due to inherent bias, attention bias, and spatial-aware bias. In this study, we propose a **Transformer-Based Adaptive Prototype Matching Network** to establish robust matching relationships by improving the semantic and spatial perception of query features. The model includes three modules: **target enhancement module (TEM)**, **dual constraint aggregation module (DCAM)**, and **dual classification module (DCM)**. In particular, TEM mitigates inherent bias by exploring the relevance of multi-scale local context to enhance foreground features. Then, DCAM addresses attention bias through the dual semantic-aware attention mechanism to strengthen constraints. Finally, the DCM module decouples the segmentation task into semantic alignment and spatial alignment to alleviate spatial-aware bias. Extensive experiments on **PASCAL-5i** and **COCO-20i** confirm the effectiveness of our approach.



## **翻译：**

> Few-shot语义分割（FSS）旨在通过少量的标注样本为新的类别生成一个分割模型。以往的FSS方法由于固有偏差、注意力偏差和空间感知偏差，往往对背景噪声过于敏感。在本研究中，我们提出了一种基于Transformer的自适应原型匹配网络，通过增强查询特征的语义和空间感知能力，建立更为稳定的匹配关系。该模型包含三个模块：目标增强模块（TEM）、双重约束聚合模块（DCAM）和双重分类模块（DCM）。其中，TEM通过探索多尺度局部上下文的相关性，增强前景特征，从而减轻固有的偏差。接着，DCAM通过双重语义感知注意力机制解决了注意力偏差问题，强化了约束效果。最后，DCM模块将分割任务拆解为语义对齐和空间对齐，帮助缓解空间感知偏差。我们在PASCAL-5i和COCO-20i数据集上进行了大量实验，验证了该方法的有效性。

## **研究背景：**

近年来，由于深度学习在计算机视觉领域的快速发展，所以传统的语义分割取得了飞速进步。在这种情况下，少样本分割(few-shot segmentation, FSS)被提出用于模拟有限数据和多类别的真实世界场景。

FSS遵循元学习框架，执行过程分特征提取、匹配和分类三个阶段。现有FSS模型虽有成果，但受背景干扰，存在三方面问题：一是特征提取阶段，预训练骨干网络有固有偏差，易优先提取无关特征；二是特征匹配阶段，注意力机制在目标类别内差异大时，会导致注意力偏差；三是分类阶段，现有方法多依赖语义相关性，忽略空间信息，产生空间感知偏差。

基于上述问题，作者提出一种基于Transformer的自适应原型匹配网络，通过在模型执行的三个阶段进行策略性和高效交互，减轻FSS中的背景干扰，利用查询特征的语义和空间感知，增强模型的鲁棒性，以解决现有FSS模型存在的问题。



## **研究现状：**

- **Few - Shot Semantic Segmentation（FSS）**：FSS旨在用**少量标注样本**为新类别生成分割模型，基于度量学习的FSS主要分为基于原型和基于像素匹配两类方法。**基于原型的方法**用原型代表目标类信息进行匹配预测；**基于像素匹配**的方法建立支持像素和查询像素的密集关联。
- **Transformer应用**：Transformer因能捕捉长距离相关性，在FSS中得到应用，如动态调整分类器权重、过滤无关像素、聚合多级别支持掩码等。



## **提出的模型：**



本文提出了一种基于Transformer的自适应原型匹配网络（Transformer - Based Adaptive Prototype Matching Network），用于**少样本语义分割（Few - Shot Semantic Segmentation，FSS）**任务，以解决现有FSS模型存在的**固有偏差、注意力偏差和空间感知偏差**导致的对背景噪声敏感的问题。该模型主要包含以下三个模块： 

1. > **目标增强模块（Target Enhancement Module，TEM）**    **设计目的**：缓解骨干网络的**固有偏差**，增强前景特征。在特征提取阶段，以往工作依赖预训练骨干网络直接提取的特征，存在固有偏差，倾向于提取与当前任务无关的特征。    **具体方法**：引入基于卷积Transformer架构的多尺度局部感知调制Transformer进行多尺度特征提取，采用多尺度自适应局部注意力增强前景信息、减轻背景干扰；用可逆神经网络（INN）替代标准多层感知器（MLP），在前馈过程中保留更细粒度的特征。 

2. > **双约束聚合模块（Dual Constraint Aggregation Module，DCAM）**    **设计目的**：解决特征匹配阶段的**注意力偏差**问题。现有方法利用单层注意力机制建立支持集和查询集的关系，在目标类别存在显著类内差异时，这种关系不足以准确匹配，导致注意力偏差。    **具体方法**：由类内差异表示和双语义感知注意力机制两个关键部分组成。类内差异表示利用一组可学习向量建模支持集和查询集之间的差异；双语义感知注意力机制通过两层约束，先以支持原型为参考在查询特征中选择匹配置信度高的点，再以此为指导在整个查询特征图中寻找特征相似度高的点，生成鲁棒的支持类别原型。 

3. > **双分类模块（Dual Classification Module，DCM）**    **设计目的**：解决特征分类阶段的**空间感知偏差**问题。现有方法主要基于语义一致性进行预测，忽略了目标对象的空间一致性，导致难以准确定位目标类别。    **具体方法**：将分割任务解耦为语义对齐和空间对齐两个子任务。通过优化查询特征和类别原型生成基于语义相似度的掩码来识别目标类别；利用查询特征的内在引导，挖掘目标对象自身的空间一致性，得到基于空间分布概率的掩码用于精确的定位，最后将两个掩码相加得到最终的查询前景分割图。 实验结果表明，该模型在PASCAL - 5i和COCO - 20i两个基准数据集上取得了优于现有方法的性能，且参数数量较少。 

![Snipaste_2025-03-08_10-36-07](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-08_10-36-07.png)













## **实验（compared with the state-of-the-art models and ablation experiments）**





- ### **Comparison with the State-of-the-Arts**



数据集：PASCAL-5${^i}$，COCO-20${^i}$

![Snipaste_2025-03-08_10-39-17](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-08_10-39-17.png)







- ### **ablation experiments** 

1. **组件分析**：该方法包含目标增强模块（TEM）、双约束聚合模块（DCAM）和双分类模块（DCM）三个主要模块。与基线相比，单独使用TEM增强查询前景特征可使性能提升0.9%，单独使用DCAM增强类别原型的判别能力可提升2.2%，TEM和DCAM协同作用可提升2.6%，使用DCM实现语义对齐和空间对齐可额外提升1.3%。模型整体比基线提升了3.9%，表明引入的模块有效解决了固有偏差、注意力偏差和空间感知偏差问题，减少了背景干扰，实现了精确分割。 
2. **目标增强模块（TEM）**：TEM旨在减轻骨干网络的固有偏差并增强查询前景区域。通过与其他方法在计算量和准确性方面进行对比实验，包括采用自对齐模块（SA）、卷积变压器架构（SAM）、多尺度自适应局部注意力（MSLA + MLP）以及用可逆神经网络（INN）代替多层感知器（MLP）作为前馈网络（MSLA + INN）。结果表明，该方法在降低计算复杂度的同时保持了较高的准确性，且前馈网络在略微增加计算成本的情况下保留了更多特征细节。 
3. **双约束聚合模块（DCAM）**：对DCAM中的关键组件进行了全面分析，通过修改模型采用不同的注意力机制，如原始的普通注意力（VA）、掩码注意力（MA）、双语义感知注意力（DSAA）和类内差异表示（IDR）。结果显示，使用掩码注意力减轻背景噪声干扰对性能提升影响不大，因为支持集和查询集之间的相似度掩码在类内差异较大时准确性存在挑战。而双语义感知注意力机制通过可学习的方式减轻背景干扰，能应对类内差异的敏感性，类内差异表示在三种不同的注意力机制中都有益。
4.  **双分类模块（DCM）**：通过消融实验评估不同的DCM组件。仅使用基于语义相似度的掩码可使模型性能提升1.5%，证明了优化类别原型和查询特征的必要性；仅使用基于空间分布概率的分割图时，性能下降2.3%，这是因为仅依赖查询图像本身的前景分布会使模型偏向已知类别的区域，导致对未知类别的分割失败。 

![Snipaste_2025-03-08_10-41-19](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-08_10-41-19.png)







![Snipaste_2025-03-08_10-41-25](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-08_10-41-25.png)



## **结论：**

> 作者提出了一种**基于Transformer的自适应原型匹配网络**，以应对少样本语义分割（FSS）中**固有偏差、注意力偏差和空间感知偏差**导致的背景干扰问题。该网络包含目标增强模块（TEM）、双约束聚合模块（DCAM）和双分类模块（DCM）。TEM通过多尺度局部上下文相关性增强前景特征，解决固有偏差；DCAM利用双语义感知注意力机制加强约束，处理注意力偏差；DCM将分割任务解耦为语义对齐和空间对齐，缓解空间感知偏差。实验表明，该方法在PASCAL - 5i和COCO - 20i数据集上以最少的参数达到了最先进的性能，有效减少了背景干扰，实现了精确分割。 



