 # 数据集



YoloV8。YoloV8是一种高效的目标检测算法，它的训练需要高质量的数据集。然而，获取高质量的数据集是一项耗时且费力的任务。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/ad4f0d35d5a24785bdf9b5d0517be144.png)

YoloV8官方推荐了一个数据集网站，就是Roboflow。Roboflow是一个数据集管理平台，提供了免费的数据集，同时也支持上传自己的数据集进行格式转换。使用Roboflow，开发者可以方便地获取所需格式的数据集，无需手动转换格式。此外，Roboflow还提供了多种数据预处理、数据增强等功能，可帮助开发者更好地优化训练数据，**从下面官方获取的图片上来YOLOv8官方指定的数据集获取网站就是Roboflow。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f1d1f09f485f423ba47df662c9c4f451.png)

因此，如果你正在使用YoloV8进行目标检测算法的训练，Roboflow是一个非常好的选择，可以帮助你快速获取高质量的数据集，从而加快训练效率。同时，Roboflow也是YoloV8官方推荐的数据集网站，保证了数据集的质量和可靠性。

### **下面首先分享Roboflow的官方地址**

**[请点击此处跳转](https://roboflow.com/ "请点击此处跳转")**

### 搜索自己想要的数据集流程

成功利用神秘力量以后并点击连接后会跳转下面的网址,

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2330ab877e144be58a4264f69457bce1.png)

点击Get Started之后如果你没有之前登录过该网站就会跳转登录和注册的页面

![](https://img-blog.csdnimg.cn/a054b6098518427d8ecb840d46f7cf63.png) 这里有三个登录方式我推荐的是用Google账号也就是第一个选项，点击之后跳转如下界面,

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/83af5512f3b048189a971c3ca94e4bed.png)

  **如果你有Google账户那么就直接登录即可,如果你没有Google账户那么就需要创建一个账号，点击Create account按照操作流程输入即可需要注意的是这里需要一个手机号验证相比于chatgpt的不同这里的Google账户是可以输入中国的手机号的，但是你用中国手机号注册的账户的Google是登陆不了chatgpt的。**

**当注册完账号并登录之后就跳转以下界面**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/4116ba4cba7a43feaa3ae597e950bf19.png)

在开始之前我们需要创建一个工作组,就是左上角所显示的Workspaces流程如下图所示 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/18f99ea2585240a68a9be1f457693ef3.png)

 按照上面操作之后就建立完成了我们的Workspaces

点击下面图示选项

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/725df3223aaf49aa8f065a60aca9db97.png)

跳转如下界面

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5b62b21f8616430088b28f006e8ff810.png)

 在上图所示位置输入你想要搜索的数据集**(需要注意的是这里需要输入英文的名称不像Github那样你输入中文名字它可以给你对应搜索中文的，)** 

这里假如我想搜索mask(口罩数据集)他就会跳出一堆数据集提供给你选择

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f9b8fb22d99a48b99393ee39f6eed8a8.png)

我们随便选择一个点击进去

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/d39aeb842f7f47f5a3e411b62f1727cd.png) 然后跳出选项框操作流程如下图所示

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/682b82d399054b718f8e0a5c0ca0ac7c.png) 根据你想要的格式进行选择,然后记得选择Zip格式进行下载到本地(下载到你的浏览器默认下载地址)跳出第三个框即代表你下载完成了。图二中的第二个选项是你进行一些在线训练时候所用的code代码,如果有需要我后期也会出教程，除此之外roboflow还有需要强大的功能如下：

1.  数据增强：Roboflow支持多种数据增强的选项，如旋转、翻转、缩放等，可以帮助开发者扩充数据集，提高模型的泛化能力和准确率。
    
2.  数据预处理：Roboflow提供了多种数据预处理的选项，如去除背景、裁剪、缩放等，可以帮助开发者更好地优化训练数据，提高模型的准确率。
    
3.  数据集管理：Roboflow可以帮助开发者管理数据集，包括上传、下载、删除等操作，方便管理和使用数据集。
    
4.  API支持：Roboflow提供了API支持，可以与其他工具和平台进行集成，方便开发者在不同的应用场景中使用数据集。
    

