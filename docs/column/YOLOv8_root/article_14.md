 # 报错

一、本文介绍
------

本文为专栏内读者和我个人在训练**YOLOv8时遇到的各种错误解决方案**，你遇到的问题本文基本上都能够解决。

二、 报错问题 
--------

\# 以下为两个重要库的版本，大家可以对应下载，使用教程我会更新，时间还没来得及大家可以先看视频使用。

> **项目环境：**
> 
> python == 3.9.7
> 
> pytorch == 1.12.1
> 
> timm == 0.9.12
> 
> mmcv-full == 1.6.2

* * *

### (1)训练过程中loss出现Nan值.

可以尝试关闭AMP混合精度训练，如何关闭amp呢找到如下文件'ultralytics/cfg/default.yaml'，其中有一个参数是

amp: False  # (bool) Automatic Mixed Precision (AMP) training, choices=\[True, False\], True runs AMP check

我们将其设置为False即可，默认时为True。

.

### (2)多卡训练问题,修改模型以后不能支持多卡训练可以尝试下面的两行命令行操作，两个是不同的操作，是代表不同的版本现尝试第一个不行用第二个

    python -m torch.distributed.run --nproc\_per\_node 2 train.py

    python -m torch.distributed.launch --nproc\_per\_node 2 train.py

* * *

### (3) 针对运行过程中的一些报错解决

    **1.如果训练的过程中验证报错了(主要是一些形状不匹配的错误这是因为验证集的一些特殊图片导致)**

就是有这种训练第一个epochs完成后开始验证的时候报错，下面的方法基本百分之九十都能够解决。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e61c95278a244aebbe4ac67f07f90466.png)

    找到ultralytics/models/yolo/detect/train.py的DetectionTrainer class中的build\_dataset函数中的rect=mode == 'val'改为rect=False

    **2.推理的时候运行detect.py文件报了形状不匹配的错误**

    找到ultralytics/engine/predictor.py找到函数def pre\_transform(self, im),在LetterBox中的auto改为False

    **3.训练的过程中报错类型不匹配的问题**

    找到'ultralytics/engine/validator.py'文件找到 'class BaseValidator:' 然后在其'\_\_call\_\_'中

    self.args.half = self.device.type != 'cpu'  # force FP16 val during training的一行代码下面加上self.args.half = False

* * *

### (4) 针对yaml文件中的nc修改

    不用修改，模型会自动根据你数据集的配置文件获取。

    这也是模型打印两次的区别，第一次打印出来的就是你选择模型的yaml文件结构，第二次打印的就是替换了你数据集的yaml文件，模型使用的是第二种。

* * *

### (5) 针对环境的问题

    环境的问题我实在解决不过来，所以大家可以自行在网上搜索解决方案。  

* * *

### (6) 训练过程中不打印GFLOpS

计算的GFLOPs计算异常不打印，所以需要额外修改一处， 我们找到如下文件'ultralytics/utils/torch\_utils.py'文件内有如下的代码按照如下的图片进行修改，大家看好函数就行，其中红框的640可能和你的不一样， 然后用我给的代码替换掉整个代码即可。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/24068f6039b94ceeb91e98642c00e594.png)

```python
def get_flops(model, imgsz=640):
    """Return a YOLO model's FLOPs."""
    try:
        model = de_parallel(model)
        p = next(model.parameters())
        # stride = max(int(model.stride.max()), 32) if hasattr(model, 'stride') else 32  # max stride
        stride = 640
        im = torch.empty((1, 3, stride, stride), device=p.device)  # input image in BCHW format
        flops = thop.profile(deepcopy(model), inputs=[im], verbose=False)[0] / 1E9 * 2 if thop else 0  # stride GFLOPs
        imgsz = imgsz if isinstance(imgsz, list) else [imgsz, imgsz]  # expand if int/float
        return flops * imgsz[0] / stride * imgsz[1] / stride  # 640x640 GFLOPs
    except Exception:
        return 0
```

* * *

### (7) mmcv安装的解决方法

有的读者mmcv-full会安装失败是因为自身系统的编译工具有问题，也有可能是环境之间安装的有冲突 推荐大家离线安装的形式,下面的地址中大家可以找找自己的版本,下载到本地进行安装。 https://download.openmmlab.com/mmcv/dist/cu111/torch1.8.0/index.html https://download.openmmlab.com/mmcv/dist/index.html 

