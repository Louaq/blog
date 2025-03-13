# Disentangle then Parse: Night-time Semantic Segmentation with Illumination Disentanglement
<ArticleMetadata/>
​            **University of Science and Technology of China               Shanghai AI Laboratory**



**摘要：**

Most prior semantic segmentation methods have been developed for day-time scenes, while typically underperforming in night-time scenes due to insufficient and complicated lighting conditions. In this work, we tackle this challenge by proposing a novel night-time semantic segmentation paradigm, i.e., disentangle then parse (DTP). DTP explicitly disentangles night-time images into light-invariant reflectance and light-specific illumination components and then recognizes semantics based on their adaptive fusion. Concretely, the proposed DTP comprises two key components: 1) Instead of processing lighting-entangled features as in prior works, our Semantic-Oriented Disentanglement (SOD) framework enables the extraction of re-
flectance component without being impeded by lighting, allowing the network to consistently recognize the semantics under cover of varying and complicated lighting conditions. 2) Based on the observation that the illumination component can serve as a cue for some semantically confused regions, we further introduce an Illumination-Aware Parser (IAParser) to explicitly learn the correlation between semantics and lighting, and aggregate the illumination features to yield more precise predictions. Extensive experiments on the night-time segmentation task with various settings demonstrate that DTP significantly outperforms state-of-the-art methods. Furthermore, with negligible additional parameters, DTP can be directly used to benefit existing day-time methods for night-time segmentation. Code and dataset are available at https://github.com/w1oves/DTP.git.



**翻译：**

大多数现有的语义分割方法都是为白天场景设计的，因此在夜间场景中往往表现不佳，主要是因为夜间的光照条件复杂且不足。为了解决这个问题，本文提出了一种全新的夜间语义分割方法——“先解耦再解析”（DTP）。DTP方法首先将夜间图像分解为不受光照影响的**反射成分**和与光照相关的**光照成分**，然后通过自适应融合这两部分信息来进行语义识别。具体来说，DTP包含两个关键技术：1）与以往方法将光照信息与特征混合的做法不同，我们提出的“语义导向解耦”（SOD）框架能够在不受光照影响的情况下提取反射成分，这样可以帮助网络在复杂多变的光照条件下持续准确地识别语义。2）通过观察到光照成分可以作为一些语义模糊区域的线索，我们引入了“光照感知解析器”（IAParser），该模块能够学习语义与光照之间的关系，并聚合光照特征，从而提高预测的精度。在各种夜间分割任务的实验中，DTP显著超越了现有的先进方法。而且，DTP几乎不增加额外的参数，能够直接用于现有的白天分割方法，提升其在夜间的分割效果。相关代码和数据集可以在https://github.com/w1oves/DTP.git下载。





**研究背景：**

> 大多现存的语义分割方法都是基于白天场景开发的，这些场景光照充足且均匀。然而在实际应用中，视觉系统近一半时间需在光照不足且复杂的夜间环境下工作，现有白天方法在夜间性能会下降。此前采用无监督域适应技术将白天知识迁移到夜间，但因夜间缺乏对应标签，分割性能提升有限。虽有NightCity等大规模夜间数据集及相关方法提出，一定程度上改善了夜间场景表现，但它们通常基于光照纠缠的表示进行场景解析，不适合夜间复杂的光照条件。



> 夜间场景光照强度低且人工光源复杂，导致物体外观随光照变化，使光不变反射率和光特定光照之间的纠缠加剧，难以提取用于语义分割的判别特征。







**研究现状：**

1. **语义分割**：基于全卷积网络（FCN）结合编码器 - 解码器架构的方法成为主流，如DeepLab系列引入空洞空间金字塔池化（ASPP），还有基于自注意力机制和Transformer的网络被应用，但大多聚焦白天场景。
2. **夜间语义分割**：早期因缺乏大规模标注数据集，采用无监督域适应技术将白天知识迁移到夜间；近期有基于NightCity数据集的方法，如EGNet、NightLab等，但这些方法未明确估计光照对语义的影响，而是学习内容和光照的纠缠表示。
3. **深度表示解耦**：此前探索了多种图像表示解纠缠方法，如在GAN框架中学习跨域不变表示。





**创新点：**

1. 提出“先分离再解析”（DTP）的夜间语义分割范式，可提升现有日间方法在夜间的性能。
2. 设计语义导向解纠缠框架（SOD），借助语义约束分离图像，使网络在不同光照下提取一致特征。 
3. 引入光照感知解析器（IAParser），利用光照组件作为线索，实现更精准预测。 
4. 细化NightCity数据集，提出NightCity-fine，为夜间分割提供更可靠基准。 

![Snipaste_2025-03-03_15-54-06](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-03-03_15-54-06.png)









实验：
1. **数据集**    

  - **NightCity - fine**：原始的NightCity是最大的夜间语义分割数据集，但存在标注错误。作者提出了NightCity - fine，对训练集和验证集中不合理的标注进行了仔细修改，共修正了2554个标签图。    

  - **Cityscapes**：这是一个自动驾驶数据集，在白天场景下从50个不同城市采集，包含2975张训练图像和500张验证图像，具有19个语义类别，图像分辨率为2048x1024。

  - **BDD100K**：使用其子集BDD100K - night进行补充实验，该子集包含314张夜间训练图像和31张验证图像，其互补数据集为BDD100K - day。 

  

- **与SOTA方法的对比实验**

使用的数据集：**NightCity, NightCity-fine,  and BDD100K-night**







  - **消融实验**   







**结论：**

作者提出了一种新颖的夜间语义分割范式——Disentangle then Parse（DTP），并得出以下结论： 

1. **方法优势**：提出语义导向的解纠缠（SOD）框架，使分割不受复杂光照干扰；引入光照感知解析器（IAParser），利用光照中的语义线索实现更精确预测。DTP可作为即插即用范式，以极少额外参数助力现有方法提升性能。
2. **数据集贡献**：对最大的夜间分割数据集NightCity进行细化，提出NightCity - fine，用于更有效的训练和验证评估。
3. **性能验证**：大量实验表明，DTP显著优于现有技术，与NightCity - fine一起为夜间分割提供了更优的基准。 




