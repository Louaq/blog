# 环境安装

> pytorch GPU版本安装命令：
> pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

## YOLOX:

### (1)VOC数据集划分脚本

```python
import os
import random
import shutil
from lxml import etree

# 设置文件夹路径和划分比例
data_dir = "PlantDoc"
train_ratio = 0.8

# 创建VOC格式文件夹和子文件夹
voc_dir = "VOC"
image_dir = os.path.join(voc_dir, "JPEGImages")
anno_dir = os.path.join(voc_dir, "Annotations")
sets_dir = os.path.join(voc_dir, "ImageSets", "Main")
for dir_path in [voc_dir, image_dir, anno_dir, sets_dir]:
    os.makedirs(dir_path, exist_ok=True)

# 遍历PlantDoc文件夹下的图片和标签文件
image_files = sorted([f for f in os.listdir(os.path.join(data_dir, "train")) if f.endswith(".jpg")])
label_files = sorted([f for f in os.listdir(os.path.join(data_dir, "train")) if f.endswith(".xml")])

# 随机打乱图片和标签文件顺序
random.seed(42)
random.shuffle(image_files)
random.seed(42)
random.shuffle(label_files)

# 计算训练集和测试集的分割点
split_index = int(len(image_files) * train_ratio)

# 复制前split_index个文件到训练集
for i in range(split_index):
    image_src = os.path.join(data_dir, "train", image_files[i])
    label_src = os.path.join(data_dir, "train", label_files[i])
    image_dst = os.path.join(image_dir, image_files[i])
    label_dst = os.path.join(anno_dir, label_files[i])
    shutil.copy(image_src, image_dst)
    shutil.copy(label_src, label_dst)

# 复制后面的文件到测试集
for i in range(split_index, len(image_files)):
    image_src = os.path.join(data_dir, "train", image_files[i])
    label_src = os.path.join(data_dir, "train", label_files[i])
    image_dst = os.path.join(image_dir, image_files[i])
    label_dst = os.path.join(anno_dir, label_files[i])
    shutil.copy(image_src, image_dst)
    shutil.copy(label_src, label_dst)

# 生成训练集和测试集的ImageSets/Main下的txt文件
train_set_file = os.path.join(sets_dir, "train.txt")
test_set_file = os.path.join(sets_dir, "val.txt")
with open(train_set_file, "w") as f:
    for image_file in image_files[:split_index]:
        filename = os.path.splitext(image_file)[0]
        f.write(filename + "\n")
with open(test_set_file, "w") as f:
    for image_file in image_files[split_index:]:
        filename = os.path.splitext(image_file)[0]
        f.write(filename + "\n")

# 修改标签文件的路径和大小
for label_file in label_files:
    label_path = os.path.join(anno_dir, label_file)
    tree = etree.parse(label_path)
    root = tree.getroot()

    filename = os.path.splitext(label_file)[0] + ".jpg"
    root.find("filename").text = filename

    size = root.find("size")
    size.find("width").text = "416"  # 修改为实际图片的宽度
    size.find("height").text = "416"  # 修改为实际图片的高度

    tree.write(label_path, pretty_print=True)

```



### PlantDoc数据类别

```python
    'Apple Scab Leaf',
    'Apple leaf',
    'Apple rust leaf',
    'Bell_pepper leaf spot',
    'Bell_pepper leaf',
    'Blueberry leaf',
    'Cherry leaf',
    'Corn Gray leaf spot',
    'Corn leaf blight',
    'Corn rust leaf',
    'Peach leaf',
    'Potato leaf early blight',
    'Potato leaf late blight',
    'Potato leaf',
    'Raspberry leaf', 
    'Soyabean leaf', 
    'Soybean leaf', 
    'Squash Powdery mildew leaf',
    'Strawberry leaf',
    'Tomato Early blight leaf',
    'Tomato Septoria leaf spot',
    'Tomato leaf bacterial spot',
    'Tomato leaf late blight',
    'Tomato leaf mosaic virus', 
    'Tomato leaf yellow virus',
    'Tomato leaf', 
    'Tomato mold leaf',
    'Tomato two spotted spider mites leaf', 
    'grape leaf black rot',
    'grape leaf',
```



### （2）修改文件exps/example/yolox_voc/yolox_voc_s.py

```python
self.num_classes = 20
```

```py
image_sets=[('2007', 'trainval'), ('2012', 'trainval')],
```



### （3）修改文件voc_classes.py和coco_classes.py



> demo测试
> python tools/demo.py image -n yolox-s -c weights/yolox_s.pth --path assets/dog.jpg --conf 0.3 --nms 0.65 --tsize 640 --save_result





> 训练模型
> python tools/train.py -f exps/example/yolox_voc/yolox_voc_s_bm.py -d 1 -b 16 --fp16 -o -c weights/yolox_s.pth





> 测试模型（单张图片）：使用训练好的best_ckpt.pth
> python tools/demo.py image -f exps/example/yolox_voc/yolox_voc_s_bm.py -c YOLOX_outputs/yolox_voc_s_bm/best_ckpt.pth --path testfiles/img1.jpg --conf 0.3 --nms 0.65 --tsize 640 --save_result --device gpu





> 测试模型（多张图片）：使用训练好的best_ckpt.pth
> python tools/demo.py image -f exps/example/yolox_voc/yolox_voc_s_bm.py -c YOLOX_outputs/yolox_voc_s_bm/best_ckpt.pth --path testfiles --conf 0.3 --nms 0.65 --tsize 640 --save_result --device gpu





> 测试视频：
> python tools/demo.py video -f exps/example/yolox_voc/yolox_voc_s_bm.py -c YOLOX_outputs/yolox_voc_s_bm/best_ckpt.pth --path testfiles/messi.mp4 --conf 0.3 --nms 0.65 --tsize 640 --save_result --device gpu





> 性能统计：
> batch testing for fast evaluation:
> python tools/eval.py -f exps/example/yolox_voc/yolox_voc_s_bm.py -c YOLOX_outputs/yolox_voc_s_bm/best_ckpt.pth -b 16 -d 1 --conf 0.001 --fp16 --fuse





> For speed test:python tools/eval.py -f exps/example/yolox_voc/yolox_voc_s_bm.py -c YOLOX_outputs/yolox_voc_s_bm/best_ckpt.pth -b 1 -d 1 --conf 0.001 --fp16 --fuse







## YOLOV8

> YOLOv8测试
> yolo predict model=/hy-tmp/ultralytics/ultralytics/weights/yolov8n.pt source=D:/Downloads/ultralytics/ultralytics/assets/bus.jpg



> YOLOv8训练
> yolo detect train data=/hy-tmp/ultralytics/datasets/data.yaml model=/hy-tmp/ultralytics/weights/yolov8n.pt epochs=500 imgsz=640 batch=16 workers=4



```ts{2-3,5}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```



```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!code focus]
  titleTemplate: '另起标题覆盖title' ,
})
```

```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!code --]
  description: "更详细的vitpress中文文档教程", // [!code ++]
  titleTemplate: '另起标题覆盖title' ,
})
```

```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!code error]
  description: "更详细的vitpress中文文档教程", // [!code warning]
  titleTemplate: '另起标题覆盖title' ,
})

```

