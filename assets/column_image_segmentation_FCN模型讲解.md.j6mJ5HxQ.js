import{_ as n,c as s,o as a,a8 as p}from"./chunks/framework.D6Cah3zj.js";const _=JSON.parse(`{"title":"","description":"","frontmatter":{"head":[["script",{"charset":"UTF-8","id":"LA_COLLECT","src":"//sdk.51.la/js-sdk-pro.min.js"}],["script",{},"typeof LA !== 'undefined' && LA.init({\\"id\\":\\"3LPXyA1ZitpV3O1s\\",\\"ck\\":\\"3LPXyA1ZitpV3O1s\\",\\"autoTrack\\":true,\\"hashMode\\":true})"]]},"headers":[],"relativePath":"column/image_segmentation/FCN模型讲解.md","filePath":"column/image_segmentation/FCN模型讲解.md","lastUpdated":1741066898000}`),e={name:"column/image_segmentation/FCN模型讲解.md"},l=p(`<div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import torch</span></span>
<span class="line"><span>import torch.nn as nn</span></span>
<span class="line"><span>import torch.nn.functional as F</span></span>
<span class="line"><span>import numpy as np</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class FCN_VGG16(nn.Module):</span></span>
<span class="line"><span>    &#39;&#39;&#39;</span></span>
<span class="line"><span>    FCN 的 backbone，由 VGG16 修改而来，舍弃最后的全连接层</span></span>
<span class="line"><span>    以池化层为区分，一个池化层到上一个池化层之间的部分认为一个卷积块。</span></span>
<span class="line"><span>    &#39;&#39;&#39;</span></span>
<span class="line"><span>    def __init__(self):</span></span>
<span class="line"><span>        super(FCN_VGG16, self).__init__()</span></span>
<span class="line"><span>        self.features = nn.Sequential(</span></span>
<span class="line"><span>            # 第一个卷积块: 输入通道数：3，输出通道数：64，卷积核大小：3*3，步长：1，填充：1</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=3, out_channels=64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=64, out_channels=64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),</span></span>
<span class="line"><span>            # 第二个卷积块</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=128, out_channels=128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),</span></span>
<span class="line"><span>            # 第三个卷积块</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=128, out_channels=256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=256, out_channels=256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=256, out_channels=256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),</span></span>
<span class="line"><span>            # 第四个卷积块</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=256, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=512,out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),</span></span>
<span class="line"><span>            # 第五个卷积块</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.Conv2d(in_channels=512, out_channels=512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1)),</span></span>
<span class="line"><span>            nn.ReLU(inplace=True),</span></span>
<span class="line"><span>            nn.MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False),</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 每一层在 features 中的范围，{0，1，2，3，4} 为第一个卷积块，{5，6，7，8，9} 为第二个卷积块...</span></span>
<span class="line"><span>        self.range = ((0, 5), (5, 10), (10, 17), (17, 24), (24, 31))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def forward(self, input):</span></span>
<span class="line"><span>        output = {}</span></span>
<span class="line"><span>        # 每一块的输出</span></span>
<span class="line"><span>        for idx, (start, end) in enumerate(self.range):</span></span>
<span class="line"><span>            for layer in range(start, end):</span></span>
<span class="line"><span>                input = self.features[layer](input)</span></span>
<span class="line"><span>            output[&quot;x%d&quot; % (idx + 1)] = input</span></span>
<span class="line"><span>        return output</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def test_vgg():</span></span>
<span class="line"><span>    # Backbone 的测试函数</span></span>
<span class="line"><span>    input_x = torch.randn((1,3,512,512))</span></span>
<span class="line"><span>    vgg = FCN_VGG16()</span></span>
<span class="line"><span>    output_y = vgg(input_x)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for key in output_y:</span></span>
<span class="line"><span>        print(output_y[key].size())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>test_vgg()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/images/Snipaste_2025-02-25_10-19-29.png" alt="Snipaste_2025-02-25_10-19-29" loading="lazy"></p>`,4),i=[l];function r(c,t,b,u,d,o){return a(),s("div",null,i)}const h=n(e,[["render",r]]);export{_ as __pageData,h as default};
