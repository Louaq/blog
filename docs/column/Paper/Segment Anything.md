# Segment Anything 

## **Meta AI**

https://segment-anything.com

> 摘要：We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop, we built the largest segmentation dataset to date (by far), with over 1 billion
> masks on 11M licensed and privacy respecting images. The model is designed and trained to be promptable, so it can
> transfer zero-shot to new image distributions and tasks. We evaluate its capabilities on numerous tasks and find that
> its zero-shot performance is impressive – often competitive with or even superior to prior fully supervised results. We
> are releasing the Segment Anything Model (SAM) and cor-responding dataset (SA-1B) of 1B masks and 11M images
> at segment-anything.com to foster research into foundation models for computer vision

> 翻译：我们推出了Segment Anything (SA)项目：一个全新的图像分割任务、模型和数据集。通过使用我们高效的模型进行数据收集，我们成功构建了迄今为止最大的图像分割数据集，包含超过10亿个分割掩码和1100万张符合许可且尊重隐私的图像。这个模型被特别设计并训练为能够接受简单提示，因此它可以零样本迁移到不同的图像类型和任务。我们在多个任务中测试了该模型，发现它的零样本表现非常优秀——通常与之前的完全监督方法相当，甚至在某些情况下表现更好。我们将在segment-anything.com网站发布Segment Anything Model (SAM)和对应的数据集(SA-1B)，该数据集包括10亿个掩码和1100万张图像，旨在推动计算机视觉领域的基础模型研究。



![Snipaste_2025-02-25_20-28-44](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-25_20-28-44.png)



**task, model, dataset, data engine, experiments, responsible AI, release**



- What **task** will enable zero-shot generalization?

- What is the corresponding **model** architecture?

- What **data** can power this task and model?

![Snipaste_2025-02-25_20-37-11](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-25_20-37-11.png)



<img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-25_20-39-37.png" alt="Snipaste_2025-02-25_20-39-37"  />





![Snipaste_2025-02-25_20-40-29](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-25_20-40-29.png)



> **研究背景：**本文聚焦于构建图像分割基础模型，其研究背景主要源于自然语言处理（NLP）和计算机视觉领域的发展现状与需求。
>
> 在NLP中，基于大规模网络数据集预训练的大语言模型展现出强大的零样本和少样本泛化能力，通过提示工程可适应多种任务和数据分布，且性能随模型规模、数据集大小和训练计算量的增加而提升。
>
> 计算机视觉领域虽也对基础模型有所探索，如CLIP和ALIGN利用对比学习训练文本和图像编码器实现零样本泛化，但计算机视觉问题广泛，许多问题缺乏充足的训练数据。
>
> 在图像分割方面，尚无网络规模的数据源，且现有方法难以实现强大的泛化能力。因此，本文旨在开发一个可提示的模型，并在广泛的数据集上进行预训练，以解决新数据分布下的一系列下游分割问题。具体通过定义可提示的分割任务、设计相应的模型架构（SAM）以及构建数据引擎收集大规模数据集（SA - 1B）来实现这一目标，从而推动图像分割进入基础模型时代。





**研究现状：**

- **基础模型发展**：大语言模型在自然语言处理（NLP）领域展现出强大的零样本和少样本泛化能力，通过提示工程可适应多种任务和数据分布。计算机视觉领域也在探索基础模型，如CLIP和ALIGN利用对比学习训练文本和图像编码器，实现零样本泛化。
- **图像分割任务**：图像分割领域存在多种任务，如交互式分割、边缘检测、实例分割等，但缺乏大规模、多样化的分割数据集，且现有模型在泛化能力和处理模糊提示方面存在不足。







**创新点：**

1. **任务创新**：提出可提示分割任务，能作为预训练目标，通过提示工程实现零样本迁移到下游分割任务。**（Task）**
2. **模型创新**：设计Segment Anything Model（SAM），由图像编码器、提示编码器和掩码解码器组成，支持灵活提示、实时计算且能处理歧义。**（Model）**
3. **数据创新**：构建数据引擎收集SA - 1B数据集，含超10亿掩码，数量和质量远超现有数据集，为模型训练提供强大支撑。**（Data）**





**最后提出本文的不足：**

1. **细节处理欠佳**：SAM可能会遗漏图像中的精细结构，有时会生成小的、不相连的虚假组件，且生成的边界不如一些计算密集型的“放大”方法清晰。
2. **特定场景表现弱**：在提供多个提示点时，专门的交互式分割方法通常会优于SAM，因为SAM更侧重于通用性和广泛适用性，而非高IoU的交互式分割。
3. **文本到掩码任务待完善**：文本到掩码任务的探索还不够成熟，不够稳健，需要更多的努力来改进。
4. **特定提示设计困难**：目前尚不清楚如何设计简单的提示来实现语义和全景分割。
5. **特定领域表现不佳**：在特定领域，一些专门的工具可能会比SAM表现更好。

> 写作启发：**Promptable Segment（提示词分割**），**Foundation models（基础模型）**，**数据集的创新**





















