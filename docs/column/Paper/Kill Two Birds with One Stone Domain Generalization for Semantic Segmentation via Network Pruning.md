# Kill Two Birds with One Stone Domain Generalization for Semantic Segmentation via Network Pruning

<div>
<ArticleMetadata/>
</div>

> **浙江大学、内华达大学**

## 摘要

**Deep model**s are notoriously known to perform poorly when encountering new domains with different statistics. To alleviate this issue, we present a new domain generalization method based on network pruning, dubbed NPDG. Our core idea is to prune the filters or attention heads that are more sensitive to domain shift while preserving those domain-invariant ones. To this end, we propose a new pruning policy tailored to improve generalization ability, which identifies the filter and head sensibility of domain shift by judging its activation variance among different domains (unary manner) and its correlation to other filter (binary manner). To better reveal those potentially sensitive filters and heads, we present a differentiable style perturbation scheme to imitate the domain variance dynamically. NPDG is trained on a single source domain and can be applied to both CNN- and Transformer-based backbones. To our knowledge, we are among the pioneers in tackling domain generalization in segmentation via network pruning. NPDG not only improves the generalization ability of a segmentation model but also decreases its computation cost. Extensive experiments demonstrate the state-of-the-art generalization performance of NPDG with a lighter-weight structure.

## 翻译

众所周知，深度模型在遇到具有不同统计数据的新领域时表现不佳。为了解决这个问题，我们提出了一种新的基于**网络剪枝**的域泛化方法，称为NPDG。我们的核心思想是剪枝过滤器或注意头，更敏感的领域转移，同时保留那些领域不变的。为此，我们提出了一种新的剪枝策略来提高泛化能力，该策略通过判断不同域之间的激活方差(一元方式)和与其他滤波器的相关性(二值方式)来识别滤波器和域漂移的头部敏感性。为了更好地揭示那些潜在的敏感滤波器和头部，我们提出了一种可微风格的摄动方案来动态地模拟域方差。NPDG在单一源域上训练，可以应用于基于CNN和transformer的主干。据我们所知，我们是通过网络剪枝处理分割领域泛化的先驱之一。NPDG不仅提高了分割模型的泛化能力，而且降低了分割模型的计算量。大量的实验证明了具有较轻重量结构的NPDG具有最先进的泛化性能。

## 研究背景

‍

‍

‍

‍

‍

‍

‍

‍

‍

## 研究现状

‍

‍

‍

‍

‍

‍

‍

‍

‍

‍

‍

## 提出的模型

‍

‍

‍

‍

‍

‍

‍

‍

‍

‍

‍

## 实验（Compared with SOTA）

‍

‍

‍

‍

‍

‍

‍

‍

‍

## 实验（Ablation Experiments）🥇

‍

‍

‍

‍

‍

‍

‍

‍

## 结论
