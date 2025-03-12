# Scribble-Supervised Semantic Segmentation with Prototype-based Feature Augmentation

**Hohai University, Nanjing, China**

**RMIT University, Melbourne, Australia**



## **摘要**

**Scribble-supervised semantic segmentation** presents a cost-effective training method that utilizes annotations generated through scribbling. It is valued in attaining high performance while minimizing annotation costs, which has made it highly regarded among researchers. Scribble supervision propagates information from labeled pixels to the surrounding unlabeled pixels, enabling semantic segmentation for the entire image. However, existing methods often ignore the features of classified pixels during feature
propagation. To address these limitations, this paper proposes a prototype-based feature augmentation method that leverages feature prototypes to augment scribble supervision. Experimental results demonstrate that our approach achieves state-of-the-art performance on the PASCAL VOC 2012 dataset in scribble-supervised semantic segmentation tasks. The code is available at
https://github.com/TranquilChan/PFA.

## **翻译**

**涂鸦监督语义分割（Scribble-supervised semantic segmentation）**提出了一种经济高效的训练方法，通过使用涂鸦生成的标注进行模型训练。该方法因能在显著降低标注成本的同时实现高性能表现，因此备受研究人员推崇。其核心原理是通过将已标注像素的信息传递至相邻未标注区域，从而完成整幅图像的语义分割。然而，我们发现现有方法在特征传递过程中普遍忽视已分类像素的特征特性。针对这一局限性，本文提出基于原型（prototype）的特征增强方法，通过挖掘特征原型（feature prototypes）的统计特性来强化涂鸦监督效果。实验表明，我们的方法在 PASCAL VOC 2012 数据集的涂鸦监督语义分割任务中达到了当前最佳水平，相关代码已开源：https://github.com/TranbilChan/PFA。

## **研究背景**



**标注成本问题**：深度学习技术推动了深度神经网络在图像分割的发展，但是，对于标注像素级别的样本需要大量的人力和财力，并且其标注过程也非常繁琐。因此，研究者越来越关注利用涂鸦标签进行监督学习的方法。**涂鸦标签属于弱监督学习**，相比像素级标注，能显著减少标注工作量、提高效率，且比点、边界框和图像级标签提供更多关键语义信息。



**现有方法的局限性**：现有涂鸦监督语义分割方法主要依赖**正则化损失、一致性损失、伪建议、辅助任务和标签扩散**等，但这些方法存在一定缺陷。例如，正则化方法常忽略利用高层语义信息，一致性损失未在类别层面提供直接监督，伪标签方法耗时，辅助任务会引入额外数据和预测误差，标签扩散主要依赖局部信息，且许多方法忽略了正确分类像素特征在指导边界区域像素分类中的作用。 基于以上背景，作者提出基于原型的特征增强方法，以解决现有方法的不足，提高涂鸦监督语义分割的性能。 



## **研究现状**

- **标注方式**：图像语义分割任务训练通常需大量高质量标注样本，像素级标注耗时耗力，因此弱监督学习方法受关注，如使用涂鸦、点、边界框和图像级标签等。其中，涂鸦监督能提供更多关键语义信息，表现更优。

  

- **现有方法**：现有涂鸦监督语义分割方法主要依赖正则化损失、一致性损失、伪建议、辅助任务和标签扩散等，但这些方法存在一定局限性。

  

- **原型方法**：特征原型在计算机视觉任务中用于增强模型识别能力，部分方法在弱监督语义分割中探索了原型的使用，但未充分发挥其特征增强和引导作用。

  

## **提出的模型**

![Snipaste_2025-03-11_19-29-04](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-11_19-29-04.png)







- **特征提取**：使用基于Mix Transformer的编码器（Segformer中的MiT-B1）提取初始特征图。
- **初始预测**：将特征图输入解码器生成语义分割预测图，通过部分交叉熵损失（partial cross-entropy loss），利用涂鸦标签进行监督，细化预测结果。
- **原型提取与更新**：从初始预测图的高置信区域中提取对应特征向量，通过加权平均形成局部原型。在训练迭代中，局部原型动态更新全局原型。
- **特征增强**：使用局部和全局原型通过原型特征增强器对初始特征进行增强。
- **一致性监督**：将增强后的特征图再次通过解码器生成增强预测图，使用一致性损失（consistency loss）对初始预测图和增强预测图进行约束。





## **实验过程（Compared with SOTA）**

数据集：**PASCAL-Scribble**

   - 选择**MiT-B1**作为骨干网络，与现有方法在**PASCAL VOC 2012**验证集上进行比较。
   - 与当前最先进的方法TEL相比，尽管MiT-B1骨干网络在全监督数据集上的性能稍弱，但该方法的mIoU仍提高了0.6%。

![Snipaste_2025-03-11_19-33-24](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-11_19-33-24.png)



## **实验过程（Ablation Experiments）**



- **各组件有效性**：以仅使用部分交叉熵损失作为基线，对**局部原型增强**和**全局原型增强**方法进行消融实验。结果表明，同时使用两种原型增强时性能最佳，mIoU比基线提高了10.4%。
- **原型设置**：实验发现，当每个类别的全局原型数量增加到约5时，mIoU的增加趋于饱和；在原型提取时，k百分比为8%时方法性能较好。
- **骨干网络影响**：研究了不同骨干网络对方法的影响，发现基于Transformer的骨干网络在效率和性能上限方面表现更优。使用MiT - B5时，mIoU达到81.5%，显著超过现有方法。



## **结论**


作者提出了一种基于原型的特征增强方法用于涂鸦监督语义分割，得出以下结论：



- 从**涂鸦监督**初始结果的置信部分提取原型，利用这些原型增强初始特征，并根据涂鸦监督的具体情况采用不同原型策略，能以正确分类像素的原型引导错误分类像素的分类，提升预测性能。


- 实验结果表明，该方法在PASCAL VOC 2012数据集上达到了最先进的性能，相比当前最优方法TEL，使用稍弱的骨干网络MiT-B1仍使mIoU提高了0.6%。


- **未来计划将此方法应用于其他任务，以挖掘其巨大潜力和应用价值 （下一个创新点）**


