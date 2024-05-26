# 训练脚本

找到根目录的train.py文件，注释已经写的很清楚，如下图：

```py
import warnings
warnings.filterwarnings('ignore')
from ultralytics import YOLO

if __name__ == '__main__':
    model = YOLO('yolov8-HSFPN.yaml')

    # model.load('yolov8n.pt') # 是否加载预训练权重,科研不建议大家加载否则很难提升精度

    model.train(data=r'D:/Downloads/YOLOv8/datasets/data.yaml',
                # 如果大家任务是其它的'ultralytics/cfg/default.yaml'找到这里修改task可以改成detect, segment, classify, pose
                cache=False,
                imgsz=640,
                epochs=150,
                single_cls=False,  # 是否是单类别检测
                batch=4,
                close_mosaic=10,
                workers=0,
                device='0',
                optimizer='SGD', # using SGD
                # resume='runs/train/exp21/weights/last.pt', # 如过想续训就设置last.pt的地址
                amp=True,  # 如果出现训练损失为Nan可以关闭amp
                project='runs/train',
                name='exp',
                )
```



model = YOLO('yolov8-HSFPN.yaml')，把里面的yaml文件换成自己的yaml文件，我这里用的是yolov8-HSFPN.yaml，data=r'D:/Downloads/YOLOv8/datasets/data.yaml，同理，换成自己数据集的yaml文件，我这里的数据集是yolo格式。其它的参数可以按照自己的任务自行调整。



还有一个检测的脚本，Detect.py:

```python
import warnings
warnings.filterwarnings('ignore')
from ultralytics import YOLO

if __name__ == '__main__':
    model = YOLO('D:/Downloads/YOLOv8/result/result_8_HSFPN/train/exp/weights/best.pt') # select your model.pt path
    model.predict(source='D:/Downloads/YOLOv8/ultralytics/assets',
                  imgsz=640,
                  project='runs/detect',
                  name='exp',
                  save=True,
                )
```

同理，把best.pt换成你自己训练好的模型，source里面输入检测图片的路径，运行该脚本就可以开始检测，结果保存在runs/detect目录。



# 开始训练

准备好数据集，最好是yolo格式的，我的数据集项目里自带了，不需要重新下载：

<img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-55-44.png" style="zoom:67%;" />

datasets目录里面就是我的数据集：有train，test，valid三个目录，分别存放训练集，测试集和验证集的图像和标签：

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-58-01.png)

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/Snipaste_2024-05-23_15-58-32.png)

准备这些之后，运行train.py文件，开始训练。如果报错的话，请自行上网查找，无非就是找不到数据集，某个包的版本不对，或者是GPU用不了，只能用CPU。
