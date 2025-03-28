# Prompt-and-Transfer：Dynamic Class-Aware Enhancement for Few-Shot Segmentation
<ArticleMetadata/>


## 中科院



**摘要：**

> For more efficient generalization to unseen domains(classes), most Few-shot Segmentation (FSS) would directly exploit pretrained encoders and only fine-tune the decoder, especially in the current era of large models. However, such fixed feature
> encoders tend to be class-agnostic, inevitably activating objects that are irrelevant to the target class. In contrast, humans can
> effortlessly focus on specific objects in the line of sight. This paper mimics the visual perception pattern ofhumanbeings and proposes a novel and powerful prompt-driven scheme, called “Prompt and Transfer” (PAT), which constructs a dynamic class-aware prompting paradigm to tune the encoder for focusing on the interested object (target class) in the current task. Three key points are elaborated to enhance the prompting: 1) Cross-modal linguistic information is introduced to initialize prompts for each task. 2) Semantic Prompt Transfer (SPT) that precisely transfers the class-specific semantics within the images to prompts. 3) Part Mask Generator(PMG)thatworks in conjunction withSPT to adaptively generate different but complementary part prompts for different individuals. Surprisingly, PAT achieves competitive performance on 4 different tasks including standard FSS, Cross-domain FSS (e.g., CV, medical, and remote sensing domains), Weak-label FSS, and Zero-shot Segmentation, setting new state-of-the-arts on 11 benchmarks.



**翻译：**



> 为了更高效地在未知领域（类别）中进行泛化，大多数少样本分割（FSS）方法通常会直接使用预训练的编码器，并仅微调解码器，尤其是在当前大模型时代。然而，这种固定的编码器通常是类别无关的，往往会错误地激活与目标类别无关的物体。与此不同，人类可以轻松聚焦于视线中的特定物体。本文模仿人类的视觉感知方式，提出了一种新颖且高效的基于提示的方案——“提示与迁移”（PAT）。该方案构建了一种动态的类别感知提示机制，能够调整编码器专注于当前任务中的目标类别（感兴趣的物体）。为了增强提示效果，本文重点介绍了三项关键技术：1）引入跨模态的语言信息来初始化每个任务的提示。2）语义提示迁移（SPT），通过精确地将图像中的类别特定语义迁移到提示中，提升模型的识别能力。3）部分掩码生成器（PMG），与SPT协同工作，为不同个体生成不同但互补的部分提示。令人惊讶的是，PAT在四个任务中表现优异，包括标准FSS、跨域FSS（如计算机视觉、医学、遥感领域）、弱标签FSS和零-shot分割，并在11个基准测试中设立了新的技术标准。





**研究背景**

>本文聚焦于**少样本分割（Few-shot Segmentation，FSS）**领域，其研究背景主要源于当前FSS方法存在的局限性以及人类视觉感知模式带来的启示： 
>
>1. **数据驱动方法的局限**：深度学习在计算机视觉任务中取得显著进展，但这些数据驱动的技术在标注数据不足时表现不佳，半监督学习也难以很好地泛化到未见类别。因此，少样本学习（FSL）应运而生，旨在利用少量标注样本快速泛化到未见领域。 
>2. **现有FSS方法的问题**：为了更有效地泛化到未见类别，大多数FSS方法直接使用预训练编码器，仅微调解码器。然而，这种固定参数的特征编码器往往对类别不敏感，会激活与目标类别无关的对象，增加后续解码器分割新类别的负担，且这一问题未得到实质性解决。 
>3. **人类视觉感知的启示**：人类能够以独特的视觉感知模式选择性地关注视线中的关键对象。受此启发，作者认为理想的FSS特征编码器应具有类别感知能力，能够针对不同任务激活相应的类别对象。因此，本文提出了一种基于提示学习的“Prompt and Transfer”（PAT）方法，以动态驱动编码器关注特定对象，实现类别感知增强。 

![Snipaste_2025-03-05_19-30-17](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-05_19-30-17.png)



**研究现状**

- **少样本学习（FSL）**：多数方法遵循元学习范式，可分为优化和度量两类，部分方法引入文本信息用于分类。
- **少样本分割（FSS）**：主要有原型匹配、特征融合和像素匹配三种方法，多数采用预训练编码器并微调解码器。部分研究开始探索适用于FSS的特征编码器。
- **提示学习**：源于自然语言处理，计算机视觉领域尝试引入可学习参数激活语义知识，部分工作探索了与少样本学习的结合





**提出的模型**

1. 提出“Prompt and Transfer”（PAT）动态类别感知提示范式，模仿人类视觉感知模式，动态驱动编码器关注特定对象，解决固定编码器类别无关问题。 
2. 构建三个关键增强点：引入跨模态语言信息初始化提示；设计语义提示转移（SPT）精确转移语义；构建部分掩码生成器（PMG）挖掘细粒度语义提示。 
3. 在多个任务和基准上取得新的最优性能，且可扩展到跨领域、弱标签和零样本分割等场景。 

![Snipaste_2025-03-05_19-34-33](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-05_19-34-33.png)







**实验（compared with the state-of-the-art models and ablation experiments）**



1. **Comparison with the State-of-the-Arts**

![Snipaste_2025-03-05_19-36-14](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-05_19-36-14.png)



![Snipaste_2025-03-05_19-36-33](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-05_19-36-33.png)



![Snipaste_2025-03-05_19-36-50](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-05_19-36-50.png)



2. **ablation experiments** 

> 1.  **组件分析**：    
>
>    ​         **引入前景提示（FG）**：与基线相比，在PASCAL - 5i和COCO - 20i数据集上分别实现了0.96%和1.61%的平均交并比（mIoU）提升，证明了动态类别感知提示范式对少样本分割（FSS）的有效性。    
>
>    ​            **结合语义提示转移（SPT）**：在PASCAL - 5i和COCO - 20i数据集上分别实现了2.27%和3.44%的mIoU提升，表明从支持和查询图像中提取特定类别的线索能显著增强类别感知能力，使编码器更精准地聚焦于目标对象。    
>
>    ​          **结合部分掩码生成器（PMG）**：在PASCAL - 5i和COCO - 20i数据集上分别实现了3.38%和4.78%的mIoU提升，说明挖掘细粒度的部分语义能进一步发挥提示的作用，实现更精确的分割。    
>
>    ​        **引入背景提示（BG）并结合SPT**：在PASCAL - 5i和COCO - 20i数据集上分别实现了4.36%和5.91%的mIoU提升，体现了背景语义对分割的重要性。 
>
>    
>
> 2.  **提示初始化消融实验**：    - **随机初始化提示**：在没有SPT和PMG持续增强其类别感知能力的情况下，使用随机初始化的提示来调整编码器不会带来性能提升。    - **引入额外类别语义**：将额外的类别语义作为初始提示可以调整编码器，使其初步定位目标，提高分割精度。    - **语言信息的优势**：语言信息比支持平均令牌更具类别代表性，使用CLIP提取的语言信息作为初始提示具有最优的分割结果。 
>
> 3.  **提示增强消融实验**：    - **部分掩码生成器（PMG）**：        - **定性评估**：可视化结果显示，PMG可以将目标对象清晰地划分为不同的互补部分区域，证明其能够自适应地生成不同的部分掩码。        - **部分掩码数量影响**：当部分掩码数量（Np）从1增加到8时，mIoU精度随之增加；继续增加数量，mIoU精度反而下降，过多的部分掩码可能导致目标对象无法清晰划分，产生冗余和噪声。    - **语义提示转移（SPT）**：        - **支持和查询语义的重要性**：仅将支持图像或查询图像的目标语义转移到提示中会导致不同程度的性能下降，说明两者对于查询图像的分割都至关重要。        - **高斯抑制的作用**：SPT中的高斯抑制通过调整注意力分布，使特定区域的全局语义更好地聚合到提示中，从而提高分割精度。    - **提示增强次数**：在变压器编码器的最后L个块中进行提示增强，更多的语义迁移次数通常能带来更高的分割精度，但综合效率和性能考虑，选择3次（L = 3）较为合适。
>
> 4.  **骨干网络设置消融实验**：    - **不同骨干网络的性能**：使用DeiT - B/16骨干网络在所有设置下具有最佳的分割精度，DeiT - S/16次之，较小的ViT - S/16或DeiT - T/16虽然分割性能较差，但推理速度具有竞争力。    - **块数量的影响**：不同骨干网络中，块的数量并非越多越好，例如两种ViT变体在10个块时效果最佳，三种DeiT变体在11个块时效果最佳。 
>
> 5.  **使用一致编码器的比较**：在使用一致的特征编码器设置下，PAT取得了最佳的分割性能；盲目使用变压器提取特征可能无法带来预期的性能提升；引入额外的语言信息有助于生成更强大的提示，以生成类别感知特征。
>
> 6.  **PAT与其他FSS方法的结合**：使用更复杂的解码器不一定能优于简单的相似度计算；配备PAT提出的动态类别感知编码器后，其他FSS方法的性能有显著提升，表明该编码器能灵活地为不同的新类别生成类别感知特征，并且与基于解码器的方法具有良好的兼容性。 



**研究结论**

>作者在摒弃以往冻结编码器以泛化到未见类别的小样本分割（FSS）做法后，提出了一种新颖的动态类别感知提示范式（PAT）。该范式模仿人类视觉感知模式，用于调整编码器以聚焦不同FSS任务中的特定对象。实验结果表明，PAT在三个流行的FSS基准测试中创造了新的最优性能。令人惊喜的是，当将其扩展到**跨领域、弱标签甚至零样本**等更现实的场景时，也取得了令人满意的结果。作者希望这项工作能为小样本场景下的编码器设计提供新视角，并激发未来相关研究聚焦于此。 















