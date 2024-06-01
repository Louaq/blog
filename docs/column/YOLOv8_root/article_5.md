 # 热力图

一、本文介绍
------

本文给大家带来的机制是集成了YOLOv8最新版本的可视化热力图功能，热力图作为我们论文当中的必备一环，可以展示出我们呈现机制的有效性，本文的内容支持YOLOv8最新版本的根据密度呈现的热力图，同时支持视频检测，根据视频中的密度来绘画热力图。

在开始之前给大家推荐一下我的专栏，本专栏每周更新3-10篇最新前沿机制 | 包括二次创新全网无重复，以及融合改进(大家拿到之后添加另外一个改进机制在你的数据集上实现涨点即可撰写论文)，还有各种前沿顶会改进机制 |，更有包含我所有附赠的文件（文件内集成我所有的改进机制全部注册完毕可以直接运行）和交流群和视频讲解提供给大家。  

**欢迎大家订阅我的专栏一起学习YOLO！** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/309ffc28815f42459335212bf992bdbe.png)

* * *

二、项目完整代码
--------

我们将这个代码，复制粘贴到我们YOLOv8的仓库里然后创建一个py文件存放进去即可。

```python
from ultralytics import YOLO
from ultralytics.solutions import heatmap
import cv2
 
model = YOLO("yolov8n.pt")
cap = cv2.VideoCapture("People.mp4")
assert cap.isOpened(), "Error reading video file"
w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
 
# Video writer
video_writer = cv2.VideoWriter("heatmap_output.avi",
                               cv2.VideoWriter_fourcc(*'mp4v'),
                               fps,
                               (w, h))
 
# Init heatmap
heatmap_obj = heatmap.Heatmap()
heatmap_obj.set_args(colormap=cv2.COLORMAP_PARULA,
                     imw=w,
                     imh=h,
                     view_img=True,
                     shape="circle")
 
while cap.isOpened():
    success, im0 = cap.read()
    if not success:
        print("Video frame is empty or video processing has been successfully completed.")
        break
    tracks = model.track(im0, persist=True, show=False)
 
    im0 = heatmap_obj.generate_heatmap(im0, tracks)
    video_writer.write(im0)
 
cap.release()
video_writer.release()
cv2.destroyAllWindows()
```

三、参数解析 
-------

下面上面项目核心代码的参数解析，共有2个，能够起到作用的参数并不多。 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/94cdb656f0be46629ad5c975988122ae.png)

|  | 参数名 | 参数类型 | 参数讲解 |
| --- | --- | --- | --- |
| 1 | weights |  str | 用于检测视频的权重文件地址（可以是你训练好的，也可以是官方提供的） |
| 2 | source | str | 视频文件的地址，因为是用于视频检测，大家有兴趣其实可以将其改为摄像头的实时检测。 |

四、项目的使用教程
---------

### 4.1 步骤一

我们在Yolo仓库的目录下创建一个py文件将代码存放进去，如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5c5e0fa3c14f48e0be34ce77e89381a4.png)

* * *

### 4.2 步骤二

**我们按照参数解析部分的介绍填好大家的参数，主要配置的有两个一个就是权重文件地址另一个就是视频的地址。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/cc4cf449e2c940e38a4026a62b5366ac.png)

* * *

### 4.3 步骤三

我们填好之后运行文件即可，运行文件即可，这里就不上传视频了。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/16549c7171aa4c11b77a7a3369d1156c.png)

* * *

五、图片可视化热力图代码 
-------------

下面的是图片热力图可视化代码，大家复制粘贴使用方法和上面差不多，代码中我有注释包含了使用方法大家可以仔细看一下，使用方法非常简单。

```python
import warnings
warnings.filterwarnings('ignore')
warnings.simplefilter('ignore')
import torch, yaml, cv2, os, shutil
import numpy as np
np.random.seed(0)
import matplotlib.pyplot as plt
from tqdm import trange
from PIL import Image
from ultralytics.nn.tasks import DetectionModel as Model
from ultralytics.utils.torch_utils import intersect_dicts
from ultralytics.utils.ops import xywh2xyxy
from pytorch_grad_cam import GradCAMPlusPlus, GradCAM, XGradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.activations_and_gradients import ActivationsAndGradients
 
def letterbox(im, new_shape=(640, 640), color=(114, 114, 114), auto=True, scaleFill=False, scaleup=True, stride=32):
    # Resize and pad image while meeting stride-multiple constraints
    shape = im.shape[:2]  # current shape [height, width]
    if isinstance(new_shape, int):
        new_shape = (new_shape, new_shape)
 
    # Scale ratio (new / old)
    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
    if not scaleup:  # only scale down, do not scale up (for better val mAP)
        r = min(r, 1.0)
 
    # Compute padding
    ratio = r, r  # width, height ratios
    new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]  # wh padding
    if auto:  # minimum rectangle
        dw, dh = np.mod(dw, stride), np.mod(dh, stride)  # wh padding
    elif scaleFill:  # stretch
        dw, dh = 0.0, 0.0
        new_unpad = (new_shape[1], new_shape[0])
        ratio = new_shape[1] / shape[1], new_shape[0] / shape[0]  # width, height ratios
 
    dw /= 2  # divide padding into 2 sides
    dh /= 2
 
    if shape[::-1] != new_unpad:  # resize
        im = cv2.resize(im, new_unpad, interpolation=cv2.INTER_LINEAR)
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)  # add border
    return im, ratio, (dw, dh)
 
class yolov8_heatmap:
    def __init__(self, weight, cfg, device, method, layer, backward_type, conf_threshold, ratio):
        device = torch.device(device)
        ckpt = torch.load(weight)
        model_names = ckpt['model'].names
        csd = ckpt['model'].float().state_dict()  # checkpoint state_dict as FP32
        model = Model(cfg, ch=3, nc=len(model_names)).to(device)
        csd = intersect_dicts(csd, model.state_dict(), exclude=['anchor'])  # intersect
        model.load_state_dict(csd, strict=False)  # load
        model.eval()
        print(f'Transferred {len(csd)}/{len(model.state_dict())} items')
        
        target_layers = [eval(layer)]
        method = eval(method)
 
        colors = np.random.uniform(0, 255, size=(len(model_names), 3)).astype(np.int32)
        self.__dict__.update(locals())
    
    def post_process(self, result):
        logits_ = result[:, 4:]
        boxes_ = result[:, :4]
        sorted, indices = torch.sort(logits_.max(1)[0], descending=True)
        return torch.transpose(logits_[0], dim0=0, dim1=1)[indices[0]], torch.transpose(boxes_[0], dim0=0, dim1=1)[indices[0]], xywh2xyxy(torch.transpose(boxes_[0], dim0=0, dim1=1)[indices[0]]).cpu().detach().numpy()
    
    def draw_detections(self, box, color, name, img):
        xmin, ymin, xmax, ymax = list(map(int, list(box)))
        cv2.rectangle(img, (xmin, ymin), (xmax, ymax), tuple(int(x) for x in color), 2)
        cv2.putText(img, str(name), (xmin, ymin - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.8, tuple(int(x) for x in color), 2, lineType=cv2.LINE_AA)
        return img
 
    def __call__(self, img_path, save_path):
        # remove dir if exist
        if os.path.exists(save_path):
            shutil.rmtree(save_path)
        # make dir if not exist
        os.makedirs(save_path, exist_ok=True)
 
        # img process
        img = cv2.imread(img_path)
        img = letterbox(img)[0]
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = np.float32(img) / 255.0
        tensor = torch.from_numpy(np.transpose(img, axes=[2, 0, 1])).unsqueeze(0).to(self.device)
 
        # init ActivationsAndGradients
        grads = ActivationsAndGradients(self.model, self.target_layers, reshape_transform=None)
 
        # get ActivationsAndResult
        result = grads(tensor)
        activations = grads.activations[0].cpu().detach().numpy()
 
        # postprocess to yolo output
        post_result, pre_post_boxes, post_boxes = self.post_process(result[0])
        for i in trange(int(post_result.size(0) * self.ratio)):
            if float(post_result[i].max()) < self.conf_threshold:
                break
 
            self.model.zero_grad()
            # get max probability for this prediction
            if self.backward_type == 'class' or self.backward_type == 'all':
                score = post_result[i].max()
                score.backward(retain_graph=True)
 
            if self.backward_type == 'box' or self.backward_type == 'all':
                for j in range(4):
                    score = pre_post_boxes[i, j]
                    score.backward(retain_graph=True)
 
            # process heatmap
            if self.backward_type == 'class':
                gradients = grads.gradients[0]
            elif self.backward_type == 'box':
                gradients = grads.gradients[0] + grads.gradients[1] + grads.gradients[2] + grads.gradients[3]
            else:
                gradients = grads.gradients[0] + grads.gradients[1] + grads.gradients[2] + grads.gradients[3] + grads.gradients[4]
            b, k, u, v = gradients.size()
            weights = self.method.get_cam_weights(self.method, None, None, None, activations, gradients.detach().numpy())
            weights = weights.reshape((b, k, 1, 1))
            saliency_map = np.sum(weights * activations, axis=1)
            saliency_map = np.squeeze(np.maximum(saliency_map, 0))
            saliency_map = cv2.resize(saliency_map, (tensor.size(3), tensor.size(2)))
            saliency_map_min, saliency_map_max = saliency_map.min(), saliency_map.max()
            if (saliency_map_max - saliency_map_min) == 0:
                continue
            saliency_map = (saliency_map - saliency_map_min) / (saliency_map_max - saliency_map_min)
 
            # add heatmap and box to image
            cam_image = show_cam_on_image(img.copy(), saliency_map, use_rgb=True)
            "不想在图片中绘画出边界框和置信度，注释下面的一行代码即可"
            cam_image = self.draw_detections(post_boxes[i], self.colors[int(post_result[i, :].argmax())], f'{self.model_names[int(post_result[i, :].argmax())]} {float(post_result[i].max()):.2f}', cam_image)
            cam_image = Image.fromarray(cam_image)
            cam_image.save(f'{save_path}/{i}.png')
 
def get_params():
    params = {
        'weight': 'yolov8n.pt',   # 训练出来的权重文件
        'cfg': 'ultralytics/cfg/models/v8/yolov8n.yaml',  # 训练权重对应的yaml配置文件
        'device': 'cuda:0',
        'method': 'GradCAM', # GradCAMPlusPlus, GradCAM, XGradCAM , 使用的热力图库文件不同的效果不一样可以多尝试
        'layer': 'model.model[9]',  # 想要检测的对应层
        'backward_type': 'all', # class, box, all
        'conf_threshold': 0.01, # 0.6  # 置信度阈值，有的时候你的进度条到一半就停止了就是因为没有高于此值的了
        'ratio': 0.02 # 0.02-0.1
    }
    return params
 
if __name__ == '__main__':
    model = yolov8_heatmap(**get_params())
    model(r'ultralytics/assets/bus.jpg', 'result')  # 第一个是检测的文件, 第二个是保存的路径
```

* * *

六、项目完整代码 
---------

**我们将这个代码，复制粘贴到我们YOLOv8的仓库里然后创建一个py文件存放进去即可。**

```python
import warnings
warnings.filterwarnings('ignore')
warnings.simplefilter('ignore')
import torch, yaml, cv2, os, shutil
import numpy as np
np.random.seed(0)
import matplotlib.pyplot as plt
from tqdm import trange
from PIL import Image
from ultralytics.nn.tasks import DetectionModel as Model
from ultralytics.utils.torch_utils import intersect_dicts
from ultralytics.utils.ops import xywh2xyxy
from pytorch_grad_cam import GradCAMPlusPlus, GradCAM, XGradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.activations_and_gradients import ActivationsAndGradients
 
def letterbox(im, new_shape=(640, 640), color=(114, 114, 114), auto=True, scaleFill=False, scaleup=True, stride=32):
    # Resize and pad image while meeting stride-multiple constraints
    shape = im.shape[:2]  # current shape [height, width]
    if isinstance(new_shape, int):
        new_shape = (new_shape, new_shape)
 
    # Scale ratio (new / old)
    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
    if not scaleup:  # only scale down, do not scale up (for better val mAP)
        r = min(r, 1.0)
 
    # Compute padding
    ratio = r, r  # width, height ratios
    new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]  # wh padding
    if auto:  # minimum rectangle
        dw, dh = np.mod(dw, stride), np.mod(dh, stride)  # wh padding
    elif scaleFill:  # stretch
        dw, dh = 0.0, 0.0
        new_unpad = (new_shape[1], new_shape[0])
        ratio = new_shape[1] / shape[1], new_shape[0] / shape[0]  # width, height ratios
 
    dw /= 2  # divide padding into 2 sides
    dh /= 2
 
    if shape[::-1] != new_unpad:  # resize
        im = cv2.resize(im, new_unpad, interpolation=cv2.INTER_LINEAR)
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)  # add border
    return im, ratio, (dw, dh)
 
class yolov8_heatmap:
    def __init__(self, weight, cfg, device, method, layer, backward_type, conf_threshold, ratio):
        device = torch.device(device)
        ckpt = torch.load(weight)
        model_names = ckpt['model'].names
        csd = ckpt['model'].float().state_dict()  # checkpoint state_dict as FP32
        model = Model(cfg, ch=3, nc=len(model_names)).to(device)
        csd = intersect_dicts(csd, model.state_dict(), exclude=['anchor'])  # intersect
        model.load_state_dict(csd, strict=False)  # load
        model.eval()
        print(f'Transferred {len(csd)}/{len(model.state_dict())} items')
        
        target_layers = [eval(layer)]
        method = eval(method)
 
        colors = np.random.uniform(0, 255, size=(len(model_names), 3)).astype(np.int32)
        self.__dict__.update(locals())
    
    def post_process(self, result):
        logits_ = result[:, 4:]
        boxes_ = result[:, :4]
        sorted, indices = torch.sort(logits_.max(1)[0], descending=True)
        return torch.transpose(logits_[0], dim0=0, dim1=1)[indices[0]], torch.transpose(boxes_[0], dim0=0, dim1=1)[indices[0]], xywh2xyxy(torch.transpose(boxes_[0], dim0=0, dim1=1)[indices[0]]).cpu().detach().numpy()
    
    def draw_detections(self, box, color, name, img):
        xmin, ymin, xmax, ymax = list(map(int, list(box)))
        cv2.rectangle(img, (xmin, ymin), (xmax, ymax), tuple(int(x) for x in color), 2)
        cv2.putText(img, str(name), (xmin, ymin - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.8, tuple(int(x) for x in color), 2, lineType=cv2.LINE_AA)
        return img
 
    def __call__(self, img_path, save_path):
        # remove dir if exist
        if os.path.exists(save_path):
            shutil.rmtree(save_path)
        # make dir if not exist
        os.makedirs(save_path, exist_ok=True)
 
        # img process
        img = cv2.imread(img_path)
        img = letterbox(img)[0]
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = np.float32(img) / 255.0
        tensor = torch.from_numpy(np.transpose(img, axes=[2, 0, 1])).unsqueeze(0).to(self.device)
 
        # init ActivationsAndGradients
        grads = ActivationsAndGradients(self.model, self.target_layers, reshape_transform=None)
 
        # get ActivationsAndResult
        result = grads(tensor)
        activations = grads.activations[0].cpu().detach().numpy()
 
        # postprocess to yolo output
        post_result, pre_post_boxes, post_boxes = self.post_process(result[0])
        for i in trange(int(post_result.size(0) * self.ratio)):
            if float(post_result[i].max()) < self.conf_threshold:
                break
 
            self.model.zero_grad()
            # get max probability for this prediction
            if self.backward_type == 'class' or self.backward_type == 'all':
                score = post_result[i].max()
                score.backward(retain_graph=True)
 
            if self.backward_type == 'box' or self.backward_type == 'all':
                for j in range(4):
                    score = pre_post_boxes[i, j]
                    score.backward(retain_graph=True)
 
            # process heatmap
            if self.backward_type == 'class':
                gradients = grads.gradients[0]
            elif self.backward_type == 'box':
                gradients = grads.gradients[0] + grads.gradients[1] + grads.gradients[2] + grads.gradients[3]
            else:
                gradients = grads.gradients[0] + grads.gradients[1] + grads.gradients[2] + grads.gradients[3] + grads.gradients[4]
            b, k, u, v = gradients.size()
            weights = self.method.get_cam_weights(self.method, None, None, None, activations, gradients.detach().numpy())
            weights = weights.reshape((b, k, 1, 1))
            saliency_map = np.sum(weights * activations, axis=1)
            saliency_map = np.squeeze(np.maximum(saliency_map, 0))
            saliency_map = cv2.resize(saliency_map, (tensor.size(3), tensor.size(2)))
            saliency_map_min, saliency_map_max = saliency_map.min(), saliency_map.max()
            if (saliency_map_max - saliency_map_min) == 0:
                continue
            saliency_map = (saliency_map - saliency_map_min) / (saliency_map_max - saliency_map_min)
 
            # add heatmap and box to image
            cam_image = show_cam_on_image(img.copy(), saliency_map, use_rgb=True)
            "不想在图片中绘画出边界框和置信度，注释下面的一行代码即可"
            cam_image = self.draw_detections(post_boxes[i], self.colors[int(post_result[i, :].argmax())], f'{self.model_names[int(post_result[i, :].argmax())]} {float(post_result[i].max()):.2f}', cam_image)
            cam_image = Image.fromarray(cam_image)
            cam_image.save(f'{save_path}/{i}.png')
 
def get_params():
    params = {
        'weight': 'yolov8n.pt',   # 训练出来的权重文件
        'cfg': 'ultralytics/cfg/models/v8/yolov8n.yaml',  # 训练权重对应的yaml配置文件
        'device': 'cuda:0',
        'method': 'GradCAM', # GradCAMPlusPlus, GradCAM, XGradCAM , 使用的热力图库文件不同的效果不一样可以多尝试
        'layer': 'model.model[9]',  # 想要检测的对应层
        'backward_type': 'all', # class, box, all
        'conf_threshold': 0.01, # 0.6  # 置信度阈值，有的时候你的进度条到一半就停止了就是因为没有高于此值的了
        'ratio': 0.02 # 0.02-0.1
    }
    return params
 
if __name__ == '__main__':
    model = yolov8_heatmap(**get_params())
    model(r'ultralytics/assets/bus.jpg', 'result')  # 第一个是检测的文件, 第二个是保存的路径
```

七、参数解析 
-------

**下面上面项目核心代码的参数解析，共有7个，能够起到作用的参数并不多。** 

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6fcc9bb6ec814ab1961efb0c7db5f1a1.png)

|  | 参数名 | 参数类型 | 参数讲解 |
| --- | --- | --- | --- |
| 0 | weights |  str | 用于检测视频的权重文件地址（可以是你训练好的，也可以是官方提供的） |
| 1 | cfg | str | 你选择的权重对应的yaml配置文件，请注意一定要对应否则会报错和不显示图片 |
| 2 | device | str | 设备的选择可以用GPU也可以用CPU |
| 3 | method | str | 使用的热力图第三方库的版本，不同的版本效果也不一样。 |
| 4 | layer | str | 想要检测的对应层，比如这里设置的是9那么检测的就是第九层 |
| 4 | backward\_type | str | 检测的类别 |
| 5 | conf\_threshold | str | 置信度阈值，有的时候你的进度条没有满就是因为没有大于这个阈值的图片了 |
| 6 | ratio | int | YOLOv8一次产生6300张预测框，选择多少比例的图片绘画热力图。 |

八、项目的使用教程
---------

### 8.1 步骤一

我们在Yolo仓库的目录下创建一个py文件将代码存放进去，如下图所示。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6c4bed4cef9a488d8cda62492efa80c7.png)

* * *

### 8.2 步骤二

**我们按照参数解析部分的介绍填好大家的参数，主要配置的有两个一个就是权重文件地址另一个就是图片的地址。**

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2bd70b825206498bb8688b90cfa3e12c.png)

* * *

### 8.3 步骤三

我们挺好之后运行文件即可，图片就会保存在同级目录下的新的文件夹result内。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0a203fd9e3cd4f89b95e419e4fc22f1f.png)

* * *

### 8.4 置信度和检测框 

看下下面的说明就行。

![](https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/26206bf8e8cb4da4b2f230ac932cd577.png)

