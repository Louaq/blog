 

# 评估



一、简介
----

这篇博客，**主要给大家讲解我们在训练yolov8时生成的结果文件中各个图片及其中指标的含义**，帮助大家更深入的理解，以及我们在评估模型时和发表论文时主要关注的参数有那些。本文通过举例训练过程中的某一时间的结果来帮助大家理解，大家阅读过程中如有任何问题可以在评论区提问出来，我会帮助大家解答。首先我们来看一个在一次训练完成之后都能生成多少个文件如下图所示，下面的文章讲解都会围绕这个结果文件来介绍。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bdf99b744c6646f6a82b2be30e3e9d92.png)

* * *

**二、评估用的数据集** 
--------------

> 上面的训练结果，是根据一个检测飞机的数据集训练得来，其中只有个标签就是飞机，对于这种单标签的数据集，其实我们可以将其理解为一个二分类任务，
> 
> **一种情况->检测为飞机，另一种情况->不是飞机。**

* * *

三、结果分析 
-------

我们可以从结果文件中看到其中**共有文件24个**，后12张图片是根据我们训练过程中的一些检测结果图片，用于我们可以观察检测结果，有哪些被检测出来了，那些没有被检测出来，其不作为指标评估的文件。         

### Weights文件夹

我们先从第一个weights文件夹来分析，其中有两个文件，分别是**best.pt、last.pt**,其分别为训练过程中的损失最低的结果和模型训练的最后一次结果保存的模型。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3986c306bb3b4e9893da7f89d2994a88.png)

### args.yaml

第二个文件是args.yaml文件,其中主要保存一些我们训练时指定的参数，内容如下所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f464e438dd6f4f0a9c52e7246439295c.png)

### 混淆矩阵(ConfusionMatrix)

第三个文件就是混淆矩阵，大家都应该听过这个名字，其是一种用于评估分类模型性能的表格形式。它以实际类别（真实值）和模型预测类别为基础，将样本分类结果进行统计和汇总。

> 对于二分类问题，混淆矩阵通常是一个2×2的矩阵，包括真阳性（True Positive, TP）、真阴性（True Negative, TN）、假阳性（False Positive, FP）和假阴性（False Negative, FN）四个元素。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/ae117a5a660142f3a44b52834fa04ec3.png)

```cobol
True_Label = [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1 ,0, 1, 0 , 1 , 0, 0 , 1]Predict_Label = [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1 ,0 , 0 , 1 , 0, 0 , 1, 0]
```

我们来分析这个图，其每个格子代表的含义我在图片上标注了出来**,下面我们来拿一个例子来帮助大家来理解这个混淆矩阵。**

假设我们的数据集预测为飞机标记为数字0、预测不为飞机标记为1，**现在假设我们在模型的训练的某一批次种预测了20次其真实结果和预测结果如下所示。** 

其中True\_Label代表真实的标签，Predict\_Label代表我们用模型预测的标签。

那么我们可以进行对比产生如下分析

> *   6个样本的真实标签和预测标签都是0（真阴性，True Negative）。
> *   1个样本的真实标签是0，但预测标签是1（假阳性，False Positive）。
> *   8个样本的真实标签是1，但预测标签是0（假阴性，False Negative）。
> *   5个样本的真实标签和预测标签都是1（真阳性，True Positive）。

下面根据我们的分析结果，我们就能够画出这个预测的混淆矩阵，

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/36c503208f654d06a1ad585e772364a8.png)

由此我们就能得到那一批次的混淆矩阵，**我们的最终结果生成的混淆矩阵可以理解为多个混淆矩阵的统计结果。** 

### 混淆矩阵归一化(Confusion Matrix Normal)

这个混淆矩阵的归一化，就是对混淆矩阵做了一个归一化处理，对混淆矩阵进行归一化可以将每个单元格的值除以该类别实际样本数，从而得到表示分类准确率的百分比。这种标准化使得我们可以直观地比较类别间的分类准确率，并识别出模型在哪些类别上表现较好或较差。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/4642ed3defe146a3b93999ffbd5d5129.png)

**我们可以看到是对于列进行了归一化处理，0.9 + 0.1 = 1，1 + 0 = 1。** 

### **计算mAP、Precision、Recall**

在讲解其它的图片之前我们需要来计算三个比较重要的参数，这是其它图片的基础，这里的计算还是利用上面的某一批次举例的分析结果。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/09e2217c78ab4e6ab49eeb2b8f128fed.png)

1.  精确度（Precision）：**预测为正的样本中有多少是正确的**，Precision = TP / (TP + FP) = 5 / (5 + 1) = 5/6 ≈ 0.833
    
2.  召回率（Recall）：真实为正的样本中有多少被正确预测为正，Recall = TP / (TP + FN) = 5 / (5 + 8) ≈ 0.385
    
3.  F1值（F1-Score）：**综合考虑精确度和召回率的指标，**F1 = 2 \* (Precision \* Recall) / (Precision + Recall) = 2 \* (0.833 \* 0.385) / (0.833 + 0.385) ≈ 0.526
    
4.  准确度（Accuracy）：**所有样本中模型正确预测的比例，**Accuracy = (TP + TN) / (TP + TN + FP + FN) = (5 + 6) / (5 + 6 + 1 + 8) ≈ 0.565
    
5.  平均精确度（Average Precision, AP）：**用于计算不同类别的平均精确度，对于二分类问题，AP等于精确度。**AP = Precision = 0.833
    
6.  平均精确度（Mean Average Precision, mAP）：**多类别问题的平均精确度，对于二分类问题，mAP等于AP（精确度）**，所以mAP = AP = 0.833
    

这里需要讲解的主要是AP和MAP如果是多分类的问题，AP和mAP怎么计算，首先我们要知道AP的全称就是Average Precision，平均精度所以我们AP的计算公式如下？

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5a9f270d50ce4bbfb76e800f4553200c.png)

mAP就是Mean Average Precision，计算如下，计算每一个没别的AP进行求平均值处理就是mAP。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a7ef1cd0cb924112acfa07084524a7a8.png)

### F1\_Curve 

F1\_Curve这个文件，我们点击去的图片的标题是F1-Confidence Curve它显示了在不同分类阈值下的F1值变化情况。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/97f8c2e20dd24d59a954bd43c4644c0f.png)

我们可以这么理解，先看它的横纵坐标，横坐标是置信度，纵坐标是F1-Score，F1-Score在前面我们以及讲解过了，那什么是置信度？

**置信度(Confidence)->**在我们模型的识别过程中会有一个概率，就是模型判定一个物体并不是百分百判定它是属于某一个分类，它会给予它以个概率，Confidence就是我们设置一个阈值，如果超过这个概率那么就确定为某一分类，**假如我模型判定一个物体由0.7的概率属于飞机，此时我们设置的阈值如果为0.7以下那么模型就会输出该物体为飞机，如果我们设置的阈值大于0.7那么模型就不会输出该物体为飞机。**

**F1-Confidence Curve就是随着F1-Score随着Confience的逐渐增高而变化的一个曲线。**

### Labels

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/521ff0b11be64fcbbbd711c3de43ddcd.jpeg)

Labels图片代表每个检测到的目标的类别和边界框信息。每个目标都由一个矩形边界框和一个类别标签表示，**我们逆时针来看这个图片！！！**

1.  目标类别：该像素点所检测到的目标类别，例如飞机等。
2.  目标位置：该像素点所检测到的目标在图像中的位置，即该像素点在图像中的坐标。
3.  目标大小：该像素点所检测到的目标的大小，即该像素点所覆盖的区域的大小。
4.  其他信息：例如目标的旋转角度等其他相关信息。

### labels\_correlogram

labels\_correlogram是一个在**机器学习领域中使用的术语，**它指的是一种图形，**用于显示目标检测算法在训练过程中预测标签之间的相关性**。

具体来说，labels\_correlogram是一张**颜色矩阵图**，它展示了训练集数据标签之间的相关性。它可以帮助我们理解目标检测算法在训练过程中的行为和表现，以及预测标签之间的相互影响。

通过观察labels\_correlogram，我们可以了解到目标检测算法在不同类别之间的区分能力，以及对于不同类别的预测精度。此外，我们还可以通过比较不同算法或不同数据集labels\_correlogram，来评估算法的性能和数据集的质量。

总之，labels\_correlogram是一种有用的工具，可以帮助我们更好地理解目标检测算法在训练过程中的行为和表现，以及评估算法的性能和数据集的质量。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0f1e5f82a532423dae3a4e8b897e6165.jpeg)

### P\_curve 

这个图的分析和F1\_Curve一样，不同的是关于的是Precision和Confidence之间的关系，**可以看出我们随着置信度的越来越高检测的准确率按理来说是越来越高的。** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7ac794c6f34b418c95dfc7951382171c.png)

### R\_curve 

这个图的分析和F1\_Curve一样，不同的是关于的是Recall和Confidence之间的关系，**可以看出我们随着置信度的越来越高召回率的准确率按理来说是越来越低的。** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e72c4546e65d445c9831567e12d55df0.png)

### PR\_curve

它显示了在不同分类阈值下模型的精确度（Precision）和召回率（Recall）之间的关系。

**PR曲线越靠近坐标轴的右上角，模型性能越好，越能够正确识别正样本，正确分类正样本的Precision值越高，而靠近右侧则说明模型对正样本的识别能力较差，即召回能力较差。**

> PR曲线的特点是随着分类阈值的变化，精确度和召回率会有相应的改变。通常情况下，当分类模型能够同时保持较高的精确度和较高的召回率时，PR曲线处于较高的位置。当模型偏向于高精确度或高召回率时，曲线则相应地向低精确度或低召回率的方向移动。
> 
> PR曲线可以帮助我们评估模型在不同阈值下的性能，并选择适当的阈值来平衡精确度和召回率。对于模型比较或选择，我们可以通过比较PR曲线下方的面积（称为平均精确度均值，Average Precision, AP）来进行定量评估。AP值越大，模型的性能越好。
> 
> 总结：PR曲线是一种展示分类模型精确度和召回率之间关系的可视化工具，通过绘制精确度-召回率曲线，我们可以评估和比较模型在不同分类阈值下的性能，并计算平均精确度均值（AP）来定量衡量模型的好坏。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c00378b5866f44978bf907f4b92d6a2c.png)

### results.csv

results.csv记录了一些我们训练过程中的参数信息，包括损失和学习率等，这里没有什么需要理解大家可以看一看，我们后面的results图片就是根据这个文件绘画出来的。

### ![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/9af828676f704aada0b9b18797ba75ce.png)results

这个图片就是生成结果的最后一个了，我们可以看出其中标注了许多小的图片包括训练过程在的各种损失，我们主要看的其实就是后面的四幅图mAP50、mAP50-95、metrics/precision、metrics/recall四张图片。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0108b195b2e04b46811b44dc9f5f351f.png)

> 1.  mAP50：mAP是mean Average Precision的缩写，表示在多个类别上的平均精度。mAP50表示在50%的IoU阈值下的mAP值。
> 2.  mAP50-95：这是一个更严格的评价指标，它计算了在50-95%的IoU阈值范围内的mAP值，然后取平均。这能够更准确地评估模型在不同IoU阈值下的性能。
> 3.  metrics/precision：精度（Precision）是评估模型预测正确的正样本的比例。在目标检测中，如果模型预测的边界框与真实的边界框重合，则认为预测正确。
> 4.  metrics/recall：召回率（Recall）是评估模型能够找出所有真实正样本的比例。在目标检测中，如果真实的边界框与预测的边界框重合，则认为该样本被正确召回。

### 检测效果图

 最后的十四张图片就是检测效果图了，给大家看一下这里没什么好讲解的了。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7dbceef24f184435b49dd7480b2cc2b3.jpeg)

* * *

四、其它参数
------

FPS和IoU是目标检测领域中使用的两个重要指标，分别表示每秒处理的图片数量和交并比。

> 1.  FPS：全称为Frames Per Second，即每秒帧率。它用于评估模型在给定硬件上的处理速度，即每秒可以处理的图片数量。该指标对于实现实时检测非常重要，因为只有处理速度快，才能满足实时检测的需求。
> 2.  IoU：全称为Intersection over Union，表示交并比。在目标检测中，它用于衡量模型生成的候选框与原标记框之间的重叠程度。IoU值越大，表示两个框之间的相似性越高。通常，当IoU值大于0.5时，认为可以检测到目标物体。这个指标常用于评估模型在特定数据集上的检测准确度。

在目标检测领域中，处理速度和准确度是两个重要的性能指标。在实际应用中，我们需要根据具体需求来平衡这两个指标。

