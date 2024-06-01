 # 恒源云

为当涉及到深度学习的训练任务时，[GPU](https://so.csdn.net/so/search?q=GPU&spm=1001.2101.3001.7020)的计算能力是不可或缺的。相对于传统的中央处理器（CPU），图形处理器（GPU）具有更强大的并行计算能力，能够显著加速深度学习模型的训练过程。深度学习算法通常涉及大量的矩阵运算和张量操作，而GPU的并行计算架构使得它们能够高效地执行这些计算，从而加速模型训练的速度。

恒源云是一个经济高效的云计算平台，您可以通过恒源云的控制台或者命令行界面来管理实例、上传和下载数据、执行训练任务等。恒源云还提供了高度可定制的实例规格，您可以根据自己的需求选择适合的实例类型和配置，以最大程度地优化性能和成本。

另一个恒源云的优势是其**经济实惠的价格**。相对于购买和维护专门的GPU设备，利用恒源云进行云端模型训练可以大大节省成本。恒源云提供了多种付费模式，包括按需付费和预付费套餐，使您能够根据自己的预算和需求进行灵活选择。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/3d1ee5ffbd434e55b5d844b892b57423.png)

上传数据集
-----

在恒源云中我们需要通过终端来上传数据集文件，当在本地处理好了数据集文件以后，我们将其解压缩成zip文件的格式当然tar压缩包等格式的都可以。 

这里推荐大家用OSS命令上传数据集,可以支持大规模的数据上传。

在利用OSS进行上传之前我们需要下载一个文件，下载方式如下。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2e6a644b805c4ab491ffc9a06b4d0acc.png)

完成之后，我们点击下载好的文件，会弹出命令行。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c9daf9ea8fef41edb01f7dfd6a420e28.png)

在这里我们可以输入指令,我们先来输入version来检验下我们是否安装成功。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/490f8eb1388b4ccd9d79a464de20960c.png)

当我们安装成功之后，我们先远程登录我们的账号和密码，输入Login

```undefined
login
```

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8c9b62f6cf8a47789acca1a7079fb06f.png)

 当我们登录成功之后,我们就远程登录了我们的恒源云账号和密码,我们就可以在我们的账号下面建立存储我们数据的文件了。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/059efdcfd75548f9912456c145124dc7.png) 按照下图操作即可。![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bf26c45c981f4f3a824245a7cf03a354.png)

当我们上传好一个文件之后,该文件就保存到我们的系统内了,我们可以随时在该终端页面下载该数据到我们后面步骤中创建的任何实例当中，利用如下命令

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0910b808ea634c318316c93eaf7e694a.png) (PS:最后一步需要我们经过下面的'利用云端训练YOLOv8模型'之后才可以进行，在我们创建完实例之后进行的操作步骤)

利用云端训练YOLOv8模型
--------------

首先进入恒源云的官方网站

[恒源云官方网站](https://www.gpushare.com/ "恒源云官方网站")

然后进行注册和登录操作此步骤省略

 当我们注册和登录之后会进到控制台界面,然后点击创建实例进入到如下界面。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0f55027db1194e14abc71c9bcf5bfa0d.png)

在其中根据你的需求选择你的GPU型号,

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/dc99d3b2734e493aa405e8b80dc69dae.png) 之后在同页面的最下面有一个实例镜像，可以在其中的下拉滚动条中选择你需要的PyTorch、TensorFlow或者其它框架的版本

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8f54226cfeaa498594522102f26048a5.png)

然后之后我们创建实例即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5f764bb992ca476689322218d7c84146.png) 首先开始时需要创建一会,然后才可以进行操作，等待一会创建成功后就会变成如下图的状态情况。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/da777e8327cd43cd8c9962b2d1307e17.png) 我们按照图片的操作点击其中的"JupyterLab" 然后会弹出新的网页如下图。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/aa99c7769ca1457da7300c73277351e4.png)

在其中hy-tmp是一个存放我们文件的文件夹,我们点击进去点击图片上的上传本地文件操作即可上传你的模型文件。终端就是一个输入命令的地方，**我们点击终端命令，如下图所示。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/4fc533b4a44645a19c95b04380f76afb.png)

我们初始的时候是在系统的根目录下面,我们进行模型训练等操作进入hy-tmp目录也就是你上传文件的目录下面。

我们利用cd 命令进入hy-tmp目录

```bash
cd hy-tmp
```

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bec73eccac7a47dbbd6af209ab67edee.png)

进入其中以后，上传我们的文件。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8e52743f93b343bab86ff0e68b67c5dd.png) 可以看到我把YOLOv8的官方下载的压缩包上传了进去，其为zip格式的压缩包。

此时在命令行输入命令解压缩该文件

输入unzip 文件名.zip解压文件

```python
unzip 文件名.zip
```

cd到该文件目录

```bash
cd 文件名
```

输入ll 看文件目录下的结构 

```undefined
ll
```

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/a7ed129b0bf440e3b596b1962f61336a.png)

这里我们演示的是利用YOLOv8进行目标检测时候的训练流程进行演示,我们进入ultralytics\\cfg文件目录利用cd进入

```bash
cd ultralytics\cfg
```

同理我们输入ll看该文件下的目录结构

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1835b338dc514718ae30ecd9bf9229bc.png)

可以看到其中有一个default.yaml文件,该文件就是我们进行训练模型的文件,我们可以在左侧的目录下看该文件的代码。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/536cbabd66be4ad9aa74729c5ff09b7c.png)

当然其中的配置,我就不在这里描述了,如果有需要可以看我的YOLOv8详细训练教程里面有具体的配置以及教程。当我们配置好了数据集以及选择的模型之后就可以在官方的模型基础上进行训练了de。 

此时我们需要退到ultralytics-main的目录下面执行下面的文件就可以进行训练了。

```cobol
yolo task=detect mode=train model=datasets/yolo8n.yaml  data=datasets/data.yaml epochs=100 batch=64 device=0 single_cls=True pretrained=yolov8n.pt
```

PS：在我们的系统中python解释器已经默认帮我们配置好了,如果你想要执行一个py格式文件，我们只需要输入python  文件名.py文件即可

```undefined
python 文件名.py
```

到此本教程就结束,希望对你有所帮助。大家如有任何问题可以在评论区进行提问。 

