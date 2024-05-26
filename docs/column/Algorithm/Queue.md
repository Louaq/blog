# 模型训练

 YOLOv8目录结构介绍

首先介绍整个项目的目录：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-27-47.png)



![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-28-07.png)

和原来的YOLOv8相比，根目录新增一些训练的脚本和测试的脚本，比如train.py和Detect.py，当然也可以直接通过命令行的方式来实现，两者效果都是一样的。

> **重点是ultralytics/nn目录，所有的改进模块都是在这里进行，在这里我新建了一个Addmodules的目录，里面是改进的各种模块，包括主干网络，颈部网络和检测头的改进。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-36-15.png)

需要修改的部分我都已经作了修改，不用再做其他的改动

> **还有一个重要的目录：ultralytics/cfg/models/Add，这里面放的都是yaml文件，其中改进的yaml文件都已经写好，不需要改动。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-38-32.png)

以下是一个yaml文件的示例，其它的都是类似的结构，只是参数不同：

# 安装项目的环境（非常重要）

> 环境配置非常重要，我当时配环境换了一周左右的时间，中间经历了各种报错，软件包不兼容的问题和显卡驱动匹配的问题，总之就是不好搞。为了方面复现工作，我已经把anaconda的环境导出为environment.yml，位于项目的根目录里面，创建虚拟环境的时候直接使用就可以



## anaconda虚拟环境

再anaconda prompt终端输入conda env create -f environment.yml，就可以根据environment.yml文件创建虚拟环境，创建好后，通过conda env list查看环境是否存在，如下图所示就表明创建成功：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_16-35-14.png)

如果安装的时候出现torch相关的错误，大概率是你的显卡驱动和这里面的torch包版本不匹配，这个问题需要自行修改即可，网上关于这方面的资料很多。



## 使用虚拟环境

虚拟环境创建完成之后，就可以在pycharm中使用，点击右下角，切换conda环境，选择刚才创建的虚拟环境。如果到了这一步还没有报错的话，恭喜你，已经完成了80%的工作。

运行Detect.py脚本，测试检测效果，如果没有报错，接下来就是训练模型。
