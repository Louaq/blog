# High Quality Segmentation for Ultra High-resolution Images
<ArticleMetadata/>
# 香港中文大学  Adobe 等 

**摘要：**To segment 4K or 6K ultra high-resolution images needs extra computation consideration in image segmentation. Common strategies, such as down-sampling, patch crop- ping, and cascade model, cannot address well the balance issue between accuracy and computation cost. Motivated by the fact that humans distinguish among objects continu- ously from coarse to precise levels, we propose the Contin- uous Refinement Model (CRM) for the ultra high-resolution segmentation refinement task. CRM continuously aligns the feature map with the refinement target and aggregates fea- tures to reconstruct these image details. Besides, our CRM shows its significant generalization ability to fill the resolu- tion gap between low-resolution training images and ultra high-resolution testing ones. We present quantitative per- formance evaluation and visualization to show that our pro- posed method is fast and effective on image segmentation refinement. Code is available at https://github.com/dvlab-research/Entity/tree/main/CRM.





**翻译:** 对4K或6K超高分辨率图像进行分割时，需要额外的计算资源。常见的策略，如下采样、图像裁剪和级联模型，往往难以很好地平衡准确性和计算成本。基于人类从粗略到精细地逐步区分物体的方式，我们提出了“连续细化模型”（CRM）来进行超高分辨率图像的分割细化任务。CRM通过不断地对齐特征图和细化目标，逐步聚合特征，重建图像细节。更重要的是，CRM展现出了很强的泛化能力，能够有效弥补低分辨率训练图像与超高分辨率测试图像之间的分辨率差距。我们通过定量的性能评估和可视化结果，展示了该方法在图像分割细化上的高效性和快速性。相关代码可以在https://github.com/dvlab-research/Entity/tree/main/CRM找到。



**研究背景**

随着相机和显示设备的快速发展，图像分辨率越来越高，4K和6K分辨率变得常见，这在人像照片后期处理、工业缺陷检测、医学诊断等领域带来了新机遇。然而，超高分辨率图像也给经典图像分割方法带来了挑战：

1. **计算成本高**：大量的输入像素在计算上代价高昂，且对GPU内存需求大。 
2. **细节重建难**：大多数现有方法通过插值对最终预测进行4到8倍上采样，无法在输出掩码上构建细粒度细节。 以往的分割细化方法，如针对1K - 2K分辨率图像的方法，存在图形模型依赖低级别颜色边界、基于传播的方法面临计算和内存限制、大模型易过拟合而浅细化网络细化能力有限等问题。而处理超高分辨率细化的级联解码器方法，虽能取得较好性能，但在推理时需要下采样和裁剪补丁，增加了成本、丢失了细节并破坏了全局上下文。 因此，为解决超高分辨率图像分割中精度与计算成本的平衡问题，作者提出了连续细化模型（CRM），以实现高效、精确的图像分割细化。 





**研究现状**

1. **语义分割**：FCN 引入深度卷积网络，PSPNet、DeepLab 系列等方法不断发展，输出步长多设为 4×或 8×，但直接插值预测结果存在边缘锯齿和细节缺失问题。
2. **分割细化**：针对 1K 分辨率图像的细化技术能提升分割质量，但存在图形模型依赖低层次颜色边界、传播方法有计算和内存限制、模型易过拟合或细化能力有限等问题。对于 4K - 6K 超高清图像，级联解码器方法能取得较好效果，但结构复杂。
3. **隐式函数表示**：在神经网络中用于表示对象或场景，如 NeRF、PixelNerf 等，其多视图一致性和光滑性有利于分割。



**研究方法**

1. 提出**连续细化模型（CRM）**，引入**隐函数**，利用连续位置信息和特征对齐，有效降低计算成本，重建更多细节。 
2. CRM采用多**分辨率推理策略**，适用于**低分辨率训练和超高分辨率测试**，总推理时间不到CascadePSP的一半。 
3.  实验表明，CRM在超高分辨率图像上取得最佳分割结果，还能提升现有全景分割模型性能，无需微调。 









**实验步骤**



![Snipaste_2025-03-02_14-24-58](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-02_14-24-58.png)





1. **数据集和对比方法选择**    - **训练数据集**：遵循CascadePSP的设置，将MSRA - 10K、DUT - OMRON、EC - SSD和FSS - 1000合并为训练数据集，包含36,572张具有超过1000个语义类别的图像。    - **测试数据集**：使用CascadePSP提出的高分辨率图像分割数据集BIG（图像分辨率范围2K - 6K）进行超高清图像评估；还在重新标注的PASCAL VOC 2012数据集上进行评估；为证明模型的通用性，将CRM作为全景分割和实体分割的扩展进行评估。    - **对比方法**：选择CascadePSP作为超高清图像的主要对比方法；选择MGMatting作为掩码引导抠图方法，Segfix作为高分辨率分割细化方法；选择PanopticFCN和Entity Segmentor作为全景和实体分割的基准方法。 
2. **实现细节**    - **模型实现**：使用PyTorch实现模型，使用去掉conv5 x的ResNet - 50作为编码器Eθ。    - **训练设置**：使用Adam优化器，学习率为2.25×10⁻⁴，在22,500和37,500步时将学习率降至十分之一，总步数45,000步。训练输入是从原始图像及其对应的扰动掩码中裁剪的224×224的图像块，扰动掩码是在真实掩码上随机扰动得到，随机IoU阈值在0.8 - 1.0之间。    - **评估设置**：在实验中从连续范围中选择4个缩放比例进行细化，CRM的总推理时间仍不到CascadePSP的一半。
3. 定量结果评估**    - **对比实验**：在BIG数据集上对比CRM、CascadePSP、Segfix和MGMatting的性能，包括交并比（IoU）、平均边界准确率（mBA）、全景质量（PQ）和平均精度（AP）等指标。结果表明CRM性能更好，在高分辨率图像上运行速度更快，且FLOPs和参数更少。    - **扩展实验**：在全景分割和实体分割实验中，将CRM添加到PanopticFCN和EntitySeg后，它们的分割性能得到增强；在重新标注的Pascal VOC 2012数据集上，CRM比Segfix表现更好，与CascadePSP的IoU相当，但更注重细节
 4. **定性结果展示**    - **可视化对比**：展示CascadePSP、Segfix和CRM的细化结果对比，CRM的细化结果包含更多细节，仅使用语义分割标注训练就能生成类似抠图的结果，并且能更好地重建粗掩码中缺失的部分。    - **应用示例**：展示将CRM应用于全景分割的可视化结果，掩码细节和整体分割效果都有显著改善。
 5. **消融实验**    - **CRM和推理分辨率**：分析CRM和隐式函数对不同分辨率下性能的影响，CRM在低分辨率下能细化出较好的通用掩码，随着分辨率增加，能生成更多细节，mBA提高。    - **CAM和隐式函数**：验证CAM和隐式函数都是CRM不可或缺的部分，二者协同作用能提升性能。    - **推理连续性的影响**：性能随着采样的缩放比例数量增加而提升，更多的缩放比例意味着推理分辨率的连续性更好，有助于提高性能直至收敛。 



**结论：**

作者提出了用于超高清图像分割细化的连续细化模型（CRM），并得出以下结论：

1. **性能优势**：CRM 能连续对齐特征图与细化目标，有助于聚合特征以重建高分辨率掩码上的细节，在性能和速度方面表现出色，实验表明其在超高清图像上的分割效果最佳，还能提升现有全景分割模型的性能。
2. **泛化能力**：CRM 具有显著的泛化潜力，可处理低分辨率训练和超高清测试之间的分辨率差距，即使从低分辨率细化到高分辨率，总推理时间也不到 CascadePSP 的一半。 
3. **未来展望**：目前采用“低分辨率训练和超高清测试”的配置，使用超高清图像进行训练和测试仍耗资源，解决该问题将是未来工作方向。 





**不足：**

1. **训练资源限制**：目前采用“低分辨率训练和超高分辨率测试”的配置，使用超高分辨率图像进行训练和测试仍面临资源消耗大的问题，这限制了模型在实际应用中对超高分辨率数据的处理能力。
2.  **未来工作待明确**：如使用预训练或低分辨率训练测试。



