```
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
```



```
class FCN_VGG16(nn.Module):
    '''
    FCN 的 backbone，由 VGG16 修改而来，舍弃最后的全连接层
    以池化层为区分，一个池化层到上一个池化层之间的部分认为一个卷积块。
    '''
    def __init__(self):
        super(FCN_VGG16, self).__init__()
        self.features = nn.Sequential(
            # 第一个卷积块: 输入通道数：3，输出通道数：64，卷积核大小：3*3，步长：1，填充：1
            nn.Conv2d(in_channels=3, out_channels=64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=64, out_channels=64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),
            # 第二个卷积块
            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=128, out_channels=128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),
            # 第三个卷积块
            nn.Conv2d(in_channels=128, out_channels=256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=256, out_channels=256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=256, out_channels=256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),
            # 第四个卷积块
            nn.Conv2d(in_channels=256, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=512,out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),
            # 第五个卷积块
            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),
        )

        # 每一层在 features 中的范围，{0，1，2，3，4} 为第一个卷积块，{5，6，7，8，9} 为第二个卷积块...
        self.range = ((0, 5), (5, 10), (10, 17), (17, 24), (24, 31))

    def forward(self, input):
        output = {}
        # 每一块的输出
        for idx, (start, end) in enumerate(self.range):
            for layer in range(start, end):
                input = self.features[layer](input)
            output["x%d" % (idx + 1)] = input
        return output
```



```
def test_vgg():
    # Backbone 的测试函数
    input_x = torch.randn((1,3,512,512))
    vgg = FCN_VGG16()
    output_y = vgg(input_x)

    for key in output_y:
        print(output_y[key].size())

test_vgg()
```



![Snipaste_2025-02-25_10-19-29](https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-25_10-19-29.png)

















































