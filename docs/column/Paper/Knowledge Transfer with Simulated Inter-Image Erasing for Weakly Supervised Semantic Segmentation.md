# Knowledge Transfer with Simulated Inter-Image Erasing for Weakly Supervised Semantic Segmentation

<ArticleMetadata/>

南京理工大学、地平线机器人

::: tip

弱监督语义分割、对抗性擦除

:::

## 摘要

Though **adversarial erasing** has prevailed in **weakly supervised semantic segmentation** to help activate integral object regions, existing approaches still suffer from the dilemma of under-activation and over-expansion due to the difficulty in determining when to stop erasing. In this paper, we propose a Knowledge Transfer with Simulated Inter-Image Erasing (KTSE) approach for weakly supervised semantic segmentation to alleviate the above problem. In contrast to existing erasing-based methods that remove the discriminative part for more object discovery, we propose a simulated inter-image erasing scenario to weaken the original activation by introducing extra object information. Then, object knowledge is transferred from the anchor image to the consequent less activated localization map to strengthen network localization ability. Considering the adopted bidirectional alignment will also weaken the anchor image activation if appropriate constraints are missing, we propose a self-supervised regularization module to maintain the reliable activation in discriminative regions and improve the inter-class object boundary recognition for complex images with multiple categories of objects. In addition, we resort to intra-image erasing and propose a multi-granularity alignment module to gently enlarge the object activation to boost the object knowledge transfer. Extensive experiments and ablation studies on PASCAL VOC 2012 and COCO datasets demonstrate the superiority of our proposed approach. Source codes and models are available at https://github.com/NUST-Machine-Intelligence-Laboratory/KTSE.

## 翻译

尽管**对抗擦除**在弱监督语义分割中很流行，以帮助激活完整的目标区域，但由于难以确定何时停止擦除，现有的方法仍然存在**激活不足和过度扩展**的困境。在本文中，我们提出了一种基于模拟图像间擦除(KTSE)的弱监督语义分割方法来缓解上述问题。与现有的基于擦除的方法不同，我们提出了一种模拟图像间擦除场景，通过引入额外的目标信息来削弱原始激活。然后，将目标知识从锚点图像转移到随后激活程度较低的定位图中，以增强网络定位能力。考虑到如果缺少适当的约束条件，所采用的双向对齐也会削弱锚点图像的激活，我们提出了一种自监督正则化模块，以保持在判别区域的可靠激活，并改善具有多类别物体的复杂图像的类间物体边界识别。此外，我们采用图像内擦除的方法，并提出了一种多粒度对齐模块来温和地放大目标激活，以促进目标知识的转移。在PASCAL VOC 2012和COCO数据集上进行的大量实验和烧蚀研究证明了我们提出的方法的优越性。源代码和模型可在https://github.com/NUST-Machine-Intelligence-Laboratory/KTSE上获得。

## 研究背景

语义分割在深度学习时代取得了巨大进展，广泛应用于**自动驾驶和图像编辑等领域**。但深度学习模型训练依赖大量标注图像，收集精确的像素级标注耗时耗力。因此，弱监督学习作为减轻标注负担的方向，受到众多研究者关注。 本文聚焦于图像级标签监督下的弱监督语义分割（WSSS）。当前WSSS通常遵循将图像标签转换为像素级粗标签、细化伪标签、用细化标签训练最终分割模型的三步流程。在分割标签生成方面，类激活图（CAM）技术是目标定位的主流范式，但朴素CAM只能突出对象最具判别性的区域，激活小且稀疏，导致对象挖掘不完整。 为解决这一问题，许多工作致力于扩展CAM激活以生成高质量伪标签，其中对抗擦除是主流方法之一。然而，现有的基于对抗擦除的方法难以确定何时停止擦除，过度擦除会导致过度扩展，擦除不足则会导致激活不足。因此，本文提出了一种基于模拟图像间擦除的知识转移（KTSE）方法，以缓解上述问题。 



## 研究现状

- **弱监督语义分割（WSSS）**：以图像级标签作为弱监督进行语义分割是热门方向，通常采用**类激活图（CAM）技术定位目标对象**，将图像级标签转化为像素级标注。为扩大CAM激活区域，研究者采用了多种方法，如扩张卷积、对比学习、自监督学习、利用跨图像信息等。
- **基于擦除的方法**：通过掩盖训练图像中的区域，迫使网络寻找其他相关部分，以扩大CAM激活区域。其中，对抗擦除方法通过掩盖最具判别性的区域，展现出更有潜力的激活扩展效果。



## 提出的模型

### 网络结构图

![Snipaste_2025-04-11_09-25-53](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-11_09-25-53.png)



本文提出了一种用于弱监督语义分割的模拟图像间擦除知识转移（Knowledge Transfer with Simulated Inter - Image Erasing，KTSE）方法，以缓解现有基于对抗擦除方法的过度扩展和激活不足问题。以下是该模型的详细介绍： 

### 整体框架 

训练一个带有给定图像级弱标签的分类网络，由骨干特征提取器和池化分类头组成。模拟图像间擦除场景，通过拼接配对图像引入额外对象信息，将对象知识从锚图像转移到后续激活较低的定位图，以增强网络的对象定位能力。同时，提出了自监督正则化模块和多粒度对齐模块。

### 具体模块 
1. **类激活图（CAM）生成**    
   - **网络架构调整**：参考ACoL移除最终全连接层，将骨干网络输出通道设置为C + 1（C为前景类别数，1为背景），直接从类感知CAM特征F生成对象定位图。    
   - **CAM计算**：对于每个前景类c，将注意力图Fc输入ReLU层，然后归一化到0到1的范围，即$A ^{c} =\frac {ReLU\left ( F^{c} \right )}{\max \left ( F^{c} \right )}$。   
   - **池化头与损失函数**：采用门控金字塔池化（GPP）层作为最终池化头，使用多标签软边缘损失训练分类网络，损失函数为$\mathcal {L} _{cls}=-\frac {1}{C} \sum _{ c=1}^{C} y^{c} \log \sigma \left (q^{c}\right )+\left (1-y^{c}\right ) \log \left [1-\sigma \left (q^{c}\right )\right ]$，其中$\sigma (·)$是sigmoid函数，$y^{c}$是第c类的图像级标签。 
2. **模拟图像间擦除（SIE）**    
   - **场景设计**：与现有擦除方法不同，通过拼接锚图像和配对图像创建更大的合成图像，将锚图像视为被擦除的图像。引入额外对象信息使锚图像中突出的对象区域减少，然后将锚图像的对象知识转移到激活较低的合成图像锚部分，以增强网络的对象定位能力。   
   - **知识转移损失**：损失函数为$\mathcal {L} _{kt} = ReLU \left ( \hat {F_{a} } - \hat {F_{s} } \right )$，其中$\hat {F_{a} } =CFE\left ( F_{a}, y \right )$，$\hat {F_{s} } =CFE\left ( F_{s}, y \right )$，$F_{a}$和$F_{s}$分别表示锚分支和模拟分支的CAM特征，CFE表示类特征提取。
3. **自监督正则化（SSR）**    
   - **问题提出**：由于知识转移是双向的，学习模拟分支的稀疏激活会削弱锚分支的对象挖掘。为保持锚分支在判别区域的可靠激活，提出自监督正则化模块。   
   - **伪标签生成**：使用两个阈值$\beta_{h} = 0.3$和$\beta_{l} = 0.15$定位置信前景和背景，生成伪标签$\hat {Y} _{i,j}$。   
   - **损失函数**：使用交叉熵损失$\mathcal {L} _{ce}$直接监督CAM特征的学习，同时设计类间损失$\mathcal {L} _{inter}$鼓励复杂图像中多个前景类的激活一致性，以提高类间对象边界的识别能力。
4. **多粒度对齐（MGA）**   
    - **问题提出**：自监督正则化模块虽能促进知识转移，但网络对象定位能力的提升受锚CAM质量限制，因此采用传统的图像内擦除并提出多粒度对齐模块。  
    - **全局对齐**：将锚特征$F_{a}$和掩码特征$F_{m}$输入类特征提取模块，采用全局平均池化（GAP）操作获得每个分支的最终类置信度，设计图像级全局对齐损失$\mathcal {L} _{global}$。   
    - **局部对齐**：利用像素级局部激活对齐将擦除图像中新发现的对象信息转移到锚分支，损失函数为$\mathcal {L} _{local}= ReLU\left ( \hat {F_{m}} - \hat {F_{a}} \right )$。 
### 训练目标 
整体训练损失为$\mathcal {L}=\mathcal {L} _{cls} + \mathcal {L}_{kt} + \mathcal {L}_{global} + \mathcal {L}_{local} + \mathcal {L}_{ce} + \lambda _{inter}\mathcal {L}_{inter}$，其中$\lambda _{inter} = 0.005$是控制类间损失权重的超参数。 



## 实验（Compared with SOTA）

> 数据集：**PASCAL VOC 2012 (20+1)、COCO 2014 (80+1)**



- **伪掩膜的准确性**：KTSE方法的分割种子mIoU达到67.0%，比IRN的基线提高了18.7%，超过了当前最优方法FPR 3.2%；经过IRN进一步细化后，生成的伪掩码mIoU达到73.8%，超过了先前的SOTA方法AEFT和ACR超过1.5%。
- **PASCAL VOC 2012分割图的准确性**：使用VGG骨干网络时，KTSE方法在验证集和测试集上的性能分别为67.3%和67.0%，优于仅使用图像级标签的其他现有技术方法，并且与许多依赖显著性图的方法具有竞争力；使用ResNet骨干网络时，验证集和测试集的结果分别提高到73.0%和72.9%，优于最近的SOTA方法，例如在测试集上比OCR和ACR高约1%。
- **COCO分割图的准确性**：使用VGG骨干网络时，KTSE方法的mIoU达到37.2%，远优于仅使用图像级标签的先前方法，例如比CONTA高13.5% mIoU，并且与具有额外显著性指导的先前SOTA方法具有竞争力；使用ResNet骨干网络时，KTSE方法达到了45.9% mIoU的最佳结果，分别比ACR和BECO高0.6%和0.8% mIoU。



![Snipaste_2025-04-11_09-33-16](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-04-11_09-33-16.png)

## 实验（Ablation Experiments）:1st_place_medal:

- **逐元素组件分析**：通过实验验证了KTSE方法中各个组件对提高伪掩码质量的贡献。模拟图像间擦除（SIE）模块可将分割种子的准确率从基线的54.2%提高到57.1%；自监督正则化（SSR）模块可使mIoU达到57.4%；SIE和SSR的组合可将性能显著提升至63.8% mIoU；多粒度对齐（MGA）模块最终使伪掩码的mIoU达到67.0%。
- **MGA与先前基于擦除的方法比较**：MGA模块采用来自锚分支的软类置信度知识来指导掩码图像的温和激活扩展。实验表明，CAM特征的全局对齐可将基线从54.2%提高到58.7%，优于ACoL中的刚性分类指导和AEFT中采用的GPP特征对齐；加上像素级局部对齐后，MGA模块最终将性能提高到60.2%，证明了其温和对齐策略相对于先前基于擦除方法的优势。
- **SIE现象分析**：基于经典对抗擦除方法的观察，引入额外的判别性目标信息会使原始高激活区域变得不那么具有判别性并降低激活度，通过从原始CAM学习可以增强这种减弱的激活。当网络学会增加对拼接图像中不那么具有判别性区域的关注时，也会学会激活原始图像中不那么具有判别性的目标区域以定位更多目标。
- **SIE与数据增强比较**：虽然像CutMix这样的数据增强方法也会改变锚图像并导致激活扰动，但它们不能保证像SIE那样使拼接图像的锚部分激活减弱（可能导致过度扩展）。SIE的新颖之处在于构建了模拟图像间擦除场景，通过从锚分支的目标知识中学习来提高后续激活减弱的注意力图，从而增强网络的定位能力。实验表明，KTSE方法在VOC和COCO数据集上的性能显著优于基于CutMix的数据增强方法CDA。

## 结论

作者提出了用于弱监督语义分割的**知识转移**与**模拟图像间擦除**（**KTSE**）方法，并得出以下结论：
 1.  与现有对抗擦除方法不同，KTSE模拟图像间擦除场景，添加额外对象信息，增强网络目标定位能力，缓解过扩展问题。 
 2.  提出自监督正则化模块，维持判别区域可靠激活，提升复杂图像类间目标边界识别能力。 
 3.  提出多粒度对齐模块，通过图像级全局对齐和像素级局部对齐扩大目标激活，促进知识转移。
 4.  在PASCAL VOC 2012和COCO数据集上的大量实验和消融研究表明，KTSE方法优于现有方法，能有效缓解过扩展和激活不足问题。 
