import{_ as t,c as a,o,a5 as r}from"./chunks/framework.B8EZ9Ogc.js";const b=JSON.parse('{"title":"目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"column/YOLOv8_root/article_3.md","filePath":"column/YOLOv8_root/article_3.md","lastUpdated":1717254266000}'),n={name:"column/YOLOv8_root/article_3.md"},s=r('<h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h1><h2 id="一、本文介绍" tabindex="-1">一、本文介绍 <a class="header-anchor" href="#一、本文介绍" aria-label="Permalink to &quot;一、本文介绍&quot;">​</a></h2><p>Hello，大家好这次给大家带来的不是改进，<strong>是整个YOLOv8项目的分析</strong>，<strong>整个系列大概会更新7-10篇左右的文章</strong>，从项目的目录到每一个功能代码的都会进行详细的讲解，同时YOLOv8改进系列也突破了三十篇文章，最后预计本专栏持续更新会在年底更新上百篇的改进教程， 所以大家如果没有订阅专栏可以提前订阅以下。下面开始进行YOLOv8逐行解析的第一篇——<strong>项目目录构造分析</strong></p><h2 id="二、项目目录构造分析" tabindex="-1">二、项目目录构造分析 <a class="header-anchor" href="#二、项目目录构造分析" aria-label="Permalink to &quot;二、项目目录构造分析&quot;">​</a></h2><p>开始之前先把源代码的地址分析给大家-&gt;</p><blockquote><p><strong>官方代码地址：</strong><a href="https://github.com/ultralytics/ultralytics" title="YOLO仓库下载地址" target="_blank" rel="noreferrer">YOLO仓库下载地址</a></p></blockquote><p>下面的图片是我们从仓库上下载整个打开之后的图片，左边的部分是文件，右面呢就是展示窗口。</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/df2b0cc18959403993dcc63056305aa2.png" alt="" loading="lazy"></p><p><strong>下面的是文件部分的清晰截图-&gt;</strong></p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b56eceb48b814fb89370fa557e6da0b6.png" alt="" loading="lazy"></p><p><strong>下面我们来逐个分析左边的文件各个都是什么作用-&gt;</strong></p><hr><h3 id="_2-1-github" tabindex="-1"><strong>2.1 .github</strong> <a class="header-anchor" href="#_2-1-github" aria-label="Permalink to &quot;**2.1 .github**&quot;">​</a></h3><p><strong>该目录包含以下内容：</strong></p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b6f4dfdb894a451289b00660e468521e.png" alt="" loading="lazy"></p><blockquote><p>ISSUE_TEMPLATE：提供不同类型的问题报告模板，包括 bug-report.yml、config.yml、feature-request.yml和 question.yml。这些模板帮助用户以结构化的方式报告错误、提出功能请求或提问。</p></blockquote><blockquote><p>workflows：包含多个工作流文件，如 ci.yml（持续集成）、cla.yml（贡献者许可协议）、codeql.yml（代码质量检查）、docker.yml（Docker配置）、greetings.yml（自动问候新贡献者）、links.yml、publish.yml（自动发布）、stale.yml（处理陈旧问题）。</p></blockquote><p>dependabot.yml（自动依赖更新）</p><p>这些文件共同支持项目的自动化管理，包括代码质量保证、持续集成和部署、社区互动和依赖项维护。</p><hr><h3 id="_2-2-docker" tabindex="-1">2.2  docker <a class="header-anchor" href="#_2-2-docker" aria-label="Permalink to &quot;2.2  docker&quot;">​</a></h3><p><strong>该目录包含以下内容：</strong></p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/1b9c076093ff49e6abf177bca6b1ee6b.png" alt="" loading="lazy"></p><p>docker 目录包含多个 Dockerfile，每个文件都是为不同环境或平台配置的，例如：</p><ul><li>Dockerfile: 主要的Docker配置文件，用于构建项目的默认Docker镜像。</li><li>Dockerfile-arm64: 针对ARM64架构的设备（如某些类型的服务器或高级嵌入式设备）定制的Docker配置。</li><li>Dockerfile-conda: 使用Conda包管理器配置环境的Docker配置文件。</li><li>Dockerfile-cpu: 为不支持GPU加速的环境配置的Docker配置文件。</li><li>Dockerfile-jetson: 专为NVIDIA Jetson平台定制的Docker配置。</li><li>Dockerfile-python: 可能是针对纯Python环境的简化Docker配置。</li><li>Dockerfile-runner: 可能用于配置持续集成/持续部署（CI/CD）运行环境的Docker配置。</li></ul><p>这些配置文件是用来部署用的，用户可以根据自己的需要选择合适的环境来部署和运行项目。</p><hr><h3 id="_2-3-docs" tabindex="-1">2.3 docs <a class="header-anchor" href="#_2-3-docs" aria-label="Permalink to &quot;2.3 docs&quot;">​</a></h3><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/6895d5eb8af94fa7af4e0d571d845203.png" alt="" loading="lazy"></p><p>docs目录通常用于存放文档资料，包括多种语言的翻译。例如，此目录下有多个文件夹，每个文件夹代表一种语言（如en代表英语文档）。除此之外，还有几个重要的Python脚本和配置文件给大家说一下：</p><blockquote><p>build_docs.py：一个Python脚本，用于自动化构建和编译文档的过程。<br> mkdocs.yml：MkDocs配置文件，用于指定文档网站的结构和设置。</p></blockquote><p>以mkdocs_es.yml为例，这是用于构建西班牙语文档的MkDocs配置文件。类似的，mkdocs_zh.yml用于构建中文文档。所以这些文档其实和我们学习YOLOv8没啥太大的关系，<strong>大家了解以下就可以了</strong>。</p><hr><h3 id="_2-4-examples" tabindex="-1">2.4 examples <a class="header-anchor" href="#_2-4-examples" aria-label="Permalink to &quot;2.4 examples&quot;">​</a></h3><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/8d4825a9f0e84cdb8e7b664860d1d342.png" alt="" loading="lazy"></p><p>在examples文件夹中，大家可以找到不同编程语言和平台的YOLOv8实现示例：</p><p>YOLOv8-CPP-Inference：包含C++语言实现的YOLOv8推理示例，内有CMakeLists.txt（用于项目构建的CMake配置文件），inference.cpp和inference.h（推理相关的源代码和头文件），main.cpp（主程序入口）以及README.md（使用说明）。</p><p>YOLOv8-ONNXRuntime：提供Python语言与ONNX Runtime结合使用的YOLOv8推理示例，其中main.py是主要的脚本文件，README.md提供了如何使用该示例的指南。</p><p>YOLOv8-ONNXRuntime-CPP：与上述ONNX Runtime类似，但是是用C++编写的，包含了相应的CMakeLists.txt，inference.cpp，inference.h和main.cpp文件，以及用于解释如何运行示例的README.md。</p><p>每个示例都配有相应的文档，是当我们进行模型部署的时候在不同环境中部署和使用YOLOv8的示例。</p><hr><h3 id="_2-5-tests" tabindex="-1">2.5 tests <a class="header-anchor" href="#_2-5-tests" aria-label="Permalink to &quot;2.5 tests&quot;">​</a></h3><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/f0bdd6022b9043bbaad7e85d9b2c2979.png" alt="" loading="lazy"></p><p>tests目录包含了项目的自动化测试脚本，每个脚本针对项目的不同部分进行测试：</p><p>conftest.py：包含测试配置选项或共享的测试助手函数。<br> test_cli.py：用于测试命令行界面（CLI）的功能和行为。<br> test_cuda.py：专门测试项目是否能正确使用NVIDIA的CUDA技术，确保GPU加速功能正常。<br> test_engine.py：测试底层推理引擎，如模型加载和数据处理等。<br> test_integrations.py：测试项目与其他服务或库的集成是否正常工作。<br> test_python.py：用于测试项目的Python API接口是否按预期工作。</p><p>这些测试脚本确保大家在改进了文件之后更新或添加的新功能后仍能运行的文件。</p><hr><h3 id="_2-6-runs" tabindex="-1">2. 6 runs <a class="header-anchor" href="#_2-6-runs" aria-label="Permalink to &quot;2\\. 6 runs&quot;">​</a></h3><p>这个文件我们在上面目录构造没有看到是因为，这是我们成功训练了一次模型之后生成的文件，里面保存我们每一次训练之后的各种信息。</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/2bb4fc2a037047629dc81e480bf7331b.png" alt="" loading="lazy"></p><p>下面的是训练成功之后的一个完整保存文件:</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/bcccc7ee5d5144c08788e20d33166cc1.png" alt="" loading="lazy"></p><hr><h3 id="_2-6-utlralytics-重点" tabindex="-1">2.6 utlralytics(重点) <a class="header-anchor" href="#_2-6-utlralytics-重点" aria-label="Permalink to &quot;2.6 utlralytics(重点)&quot;">​</a></h3><p>上面讲的大部分文件其实对于大部分读者都用不上，这里的<strong>utralytics文件才是重点</strong>，包含了YOLOv8的所有功能都集成在这个文件目录下面，这里我只介绍每一个目录的功能，每一个文件的内部代码我会在接下来的几个博客里面详细的讲到。</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0e171e9dca9c48fcb96510e2e6cd8726.png" alt="" loading="lazy"></p><h4 id="_2-6-1-assets" tabindex="-1"><strong>2.6.1 assets</strong> <a class="header-anchor" href="#_2-6-1-assets" aria-label="Permalink to &quot;**2.6.1 assets**&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/87f3ca08eac94fca888baa2f09e60a54.png" alt="" loading="lazy"></p><p>这个文件下面保存了YOLO历史上可以说最最最经典的两张图片了，这个是大家用来基础推理时候的图片，给大家测试用的。</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e624e36a10ae49b891b8045333ab6f5c.png" alt="" loading="lazy"></p><h4 id="_2-6-2-cfg-重点" tabindex="-1">2.6.2 cfg（重点） <a class="header-anchor" href="#_2-6-2-cfg-重点" aria-label="Permalink to &quot;2.6.2 cfg（重点）&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/0c08501716d94128a14644311c8accf7.png" alt="" loading="lazy"></p><p>这个文件下面保存了我们的模型配置文件，cfg目录是项目配置的集中地，其中包括：</p><p><strong>datasets文件夹</strong>：包含数据集的配置文件，如数据路径、类别信息等（就是我们训练YOLO模型的时候需要一个数据集，这里面就保存部分数据集的yaml文件，如果我们训练的时候没有指定数据集则会自动下载其中的数据集文件，但是很容易失败！）。<br><strong>models文件夹</strong>：存放模型配置文件，定义了模型结构和训练参数等，这个是我们改进或者就基础版本的一个yaml文件配置的地方，截图如下:</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/c7117aced6e44708a1df19915508c59d.png" alt="" loading="lazy"></p><p>models文件夹中的每个.yaml文件代表了不同的YOLOv8模型配置，具体包括：</p><p><strong>yolov8.yaml:</strong>   这是YOLOv8模型的标准配置文件，定义了模型的基础架构和参数。<br><strong>yolov8-cls.yaml:</strong> 配置文件调整了YOLOv8模型，专门用于图像分类任务。<br><strong>yolov8-ghost.yaml:</strong> 应用Ghost模块的YOLOv8变体，旨在提高计算效率。<br><strong>yolov8-ghost-p2.yaml 和 yolov8-ghost-p6.yaml:</strong> 这些文件是针对特定大小输入的Ghost模型变体配置。<br><strong>yolov8-p2.yaml和 yolov8-p6.yaml:</strong> 针对不同处理级别（例如不同的输入分辨率或模型深度）的YOLOv8模型配置。<br><strong>yolov8-pose.yaml:</strong> 为姿态估计任务定制的YOLOv8模型配置。<br><strong>yolov8-pose-p6.yaml:</strong> 针对更大的输入分辨率或更复杂的模型架构姿态估计任务。<br><strong>yolov8-rtdetr.yaml:</strong> 可能表示实时检测和跟踪的YOLOv8模型变体。<br><strong>yolov8-seg.yaml 和 yolov8-seg-p6.yaml:</strong> 这些是为语义分割任务定制的YOLOv8模型配置。</p><p>这些配置文件是模型训练和部署的核心，同时大家如果进行改进也是修改其中的对应文件来优化 网络结构。</p><p><strong>trackers文件夹</strong>：用于追踪算法的配置。<br><strong>__init__.py文件</strong>：表明`cfg`是一个Python包。<br><strong>default.yaml</strong>：项目的默认配置文件，包含了被多个模块共享的通用配置项。</p><p>这个文件就是配置训练的时候进行用的然后一些任务选择部分</p><h4 id="_2-6-3-data" tabindex="-1">2.6.3 data <a class="header-anchor" href="#_2-6-3-data" aria-label="Permalink to &quot;2.6.3 data&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/dc76024ccabc4de3982b1e7f37620708.png" alt="" loading="lazy"></p><p>在data/scripts文件夹中，包括了一系列脚本和Python文件：</p><p>- download_weights.sh: 用来下载预训练权重的脚本。<br> - get_coco.sh, get_coco128.sh, get_imagenet.sh: 用于下载COCO数据集完整版、128张图片版以及ImageNet数据集的脚本。<br>   <br><strong>在data文件夹中，包括：</strong></p><p><strong>annotator.py:</strong> 用于数据注释的工具。<br><strong>augment.py:</strong> 数据增强相关的函数或工具。<br><strong>base.py, build.py, converter.py:</strong> 包含数据处理的基础类或函数、构建数据集的脚本以及数据格式转换工具。<br><strong>dataset.py:</strong> 数据集加载和处理的相关功能。<br><strong>loaders.py:</strong> 定义加载数据的方法。<br><strong>utils.py:</strong> 各种数据处理相关的通用工具函数。</p><h4 id="_2-6-4-engine" tabindex="-1">2.6.4  engine <a class="header-anchor" href="#_2-6-4-engine" aria-label="Permalink to &quot;2.6.4  engine&quot;">​</a></h4><p>engine文件夹包含与模型训练、评估和推理有关的核心代码：</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7800024fbeae41cc8f009745c4101fc5.png" alt="" loading="lazy"></p><p><strong>exporter.py:</strong> 用于将训练好的模型导出到其他格式，例如ONNX或TensorRT。<br><strong>model.py:</strong> 包含模型定义，还包括模型初始化和加载的方法。<br><strong>predictor.py:</strong> 包含推理和预测的逻辑，如加载模型并对输入数据进行预测。<br><strong>results.py:</strong> 用于存储和处理模型输出的结果。<br><strong>trainer.py:</strong> 包含模型训练过程的逻辑。<br><strong>tuner.py:</strong> 用于模型超参数调优。<br><strong>validator.py:</strong> 包含模型验证的逻辑，如在验证集上评估模型性能。</p><h4 id="_2-6-5-hub" tabindex="-1">2.6.5 hub <a class="header-anchor" href="#_2-6-5-hub" aria-label="Permalink to &quot;2.6.5 hub&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/5942a5cb41504caaa71e9d1017c6b0bb.png" alt="" loading="lazy"></p><p>hub文件夹通常用于处理与平台或服务集成相关的操作，包括：</p><p><strong>auth.py:</strong> 处理认证流程，如API密钥验证或OAuth流程。<br><strong>session.py:</strong> 管理会话，包括创建和维护持久会话。<br><strong>utils.py:</strong> 包含一些通用工具函数，可能用于支持认证和会话管理功能。</p><h4 id="_2-6-6-models-重点" tabindex="-1">2.6.6 models(重点) <a class="header-anchor" href="#_2-6-6-models-重点" aria-label="Permalink to &quot;2.6.6 models(重点)&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/e29f4a22943e4ce7ad1cc84b247d99e3.png" alt="" loading="lazy"></p><p>这个目录下面是YOLO仓库包含的一些模型的方法实现，我们这里之说YOLO的，同时这里只是简单介绍，后面的博客针对于其中的任意一个都会进行单独的讲解。</p><p>这个models/yolo目录中包含了YOLO模型的不同任务特定实现：</p><p><strong>classify:</strong> 这个目录可能包含用于图像分类的YOLO模型。<br><strong>detect:</strong> 包含用于物体检测的YOLO模型。<br><strong>pose:</strong> 包含用于姿态估计任务的YOLO模型。<br><strong>segment:</strong> 包含用于图像分割的YOLO模型，</p><h4 id="_2-6-7-nn-重点" tabindex="-1">2.6.7 nn(重点) <a class="header-anchor" href="#_2-6-7-nn-重点" aria-label="Permalink to &quot;2.6.7 nn(重点)&quot;">​</a></h4><p>这个文件目录下的所有文件，就是定义我们模型中的一些组成构建，之后我们进行改进和优化，增加其它结构的时候都要在对应的文件下面进行改动。</p><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/22a54c754e424b2d808cc532e7a23c47.png" alt="" loading="lazy"></p><p><strong>modules文件夹:</strong><br>    <strong>__init__.py:</strong> 表明此目录是Python包。<br>    <strong>block.py:</strong> 包含定义神经网络中的基础块，如残差块或瓶颈块。<br>    <strong>conv.py:</strong> 包含卷积层相关的实现。<br>    <strong>head.py:</strong> 定义网络的头部，用于预测。<br>    <strong>transformer.py:</strong> 包含Transformer模型相关的实现。<br>    <strong>utils.py:</strong> 提供构建神经网络时可能用到的辅助函数。</p><p><strong>__init__.py:</strong> 同样标记这个目录为Python包。</p><p><strong>autobackend.py:</strong> 用于自动选择最优的计算后端。</p><p><strong>tasks.py</strong>: 定义了使用神经网络完成的不同任务的流程，例如分类、检测或分割，所有的流程基本上都定义在这里，定义模型前向传播都在这里。</p><h4 id="_2-6-8-solutions" tabindex="-1">2.6.8 solutions <a class="header-anchor" href="#_2-6-8-solutions" aria-label="Permalink to &quot;2.6.8 solutions&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/b4b0a147cae94419b8e094c2d0c2c6e9.png" alt="" loading="lazy"></p><p><strong>__init__.py:</strong> 标识这是一个Python包。<br><strong>ai_gym.py:</strong> 与强化学习相关，例如在OpenAI Gym环境中训练模型的代码。<br><strong>heatmap.py:</strong> 用于生成和处理热图数据，这在物体检测和事件定位中很常见。<br><strong>object_counter.py:</strong> 用于物体计数的脚本，包含从图像中检测和计数实例的逻辑。</p><h4 id="_2-6-9-trackers" tabindex="-1">2.6.9 trackers <a class="header-anchor" href="#_2-6-9-trackers" aria-label="Permalink to &quot;2.6.9 trackers&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/db2b42c30d7c4db29f9fc02b3c114c47.png" alt="" loading="lazy"></p><p><strong>trackers</strong>文件夹包含了实现目标跟踪功能的脚本和模块：</p><p><strong>__init__.py:</strong> 指示该文件夹是一个Python包。<br><strong>basetrack.py:</strong> 包含跟踪器的基础类或方法。<br><strong>bot_sort.py:</strong> 实现了SORT算法（Simple Online and Realtime Tracking）的版本。<br><strong>byte_tracker.py:</strong> 是一个基于深度学习的跟踪器，使用字节为单位跟踪目标。<br><strong>track.py:</strong> 包含跟踪单个或多个目标的具体逻辑。<br><strong>README.md:</strong> 提供该目录内容和用法的说明。</p><h4 id="_2-6-10-utils" tabindex="-1">2.6.10 utils <a class="header-anchor" href="#_2-6-10-utils" aria-label="Permalink to &quot;2.6.10 utils&quot;">​</a></h4><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/7267573c5a5940a796e373dbdbcda494.png" alt="" loading="lazy"></p><p>这个utils目录包含了多个Python脚本，每个脚本都有特定的功能：</p><p><strong>callbacks.py:</strong> 包含在训练过程中被调用的回调函数。<br><strong>autobatch.py:</strong> 用于实现批处理优化，以提高训练或推理的效率。<br><strong>benchmarks.py:</strong> 包含性能基准测试相关的函数。<br><strong>checks.py</strong>: 用于项目中的各种检查，如参数验证或环境检查。<br><strong>dist.py:</strong> 涉及分布式计算相关的工具。<br><strong>downloads.py:</strong> 包含下载数据或模型等资源的脚本。<br><strong>errors.py:</strong> 定义错误处理相关的类和函数。<br><strong>files.py:</strong> 包含文件操作相关的工具函数。<br><strong>instance.py:</strong> 包含实例化对象或模型的工具。<br><strong>loss.py:</strong> 定义损失函数。<br><strong>metrics.py:</strong> 包含评估模型性能的指标计算函数。<br><strong>ops.py:</strong> 包含自定义操作，如特殊的数学运算或数据转换。<br><strong>patches.py:</strong> 用于实现修改或补丁应用的工具。<br><strong>plotting.py:</strong> 包含数据可视化相关的绘图工具。<br><strong>tal.py:</strong> 一些损失函数的功能应用<br><strong>torch_utils.py:</strong> 提供PyTorch相关的工具和辅助函数，包括GFLOPs的计算。<br><strong>triton.py:</strong> 可能与NVIDIA Triton Inference Server集成相关。<br><strong>tuner.py:</strong> 包含模型或算法调优相关的工具。</p><p><strong>到这里重点的ultralytics文件目录下的所有功能都介绍完毕了，这里只是简单的介绍，后面的博客会详细的介绍一些重要的功能。</strong></p><hr><h3 id="_2-7-同级目录下的文件" tabindex="-1">2.7 同级目录下的文件 <a class="header-anchor" href="#_2-7-同级目录下的文件" aria-label="Permalink to &quot;2.7 同级目录下的文件&quot;">​</a></h3><p><img src="https://yangyang666.oss-cn-chengdu.aliyuncs.com/typoraImages/91ff9a17779d4019ada156f9fca35155.png" alt="" loading="lazy"></p><p><strong>这个里是项目的根本配置和文档文件：</strong></p><p><strong>.gitignore:</strong> Git配置文件，指定了Git版本控制要忽略的文件。<br><strong>.pre-commit-config.yaml:</strong> 预提交钩子的配置文件，用于在提交前自动执行代码质量检查。<br><strong>CITATION.cff:</strong> 提供了如何引用该项目的格式说明。<br><strong>CONTRIBUTING.md:</strong> 说明如何为项目贡献代码的指南。<br><strong>LICENSE:</strong> 包含了项目的许可证信息。<br><strong>MANIFEST.in:</strong> 列出了在构建和分发Python包时需要包含的文件。<br><strong>README.md 和 README.zh-CN.md:</strong> 项目的说明文件，分别为英文和中文版本。<br><strong>requirements.txt:</strong> 列出了项目运行所需的Python依赖。<br><strong>setup.cfg 和 setup.py:</strong> 包含了设置项目安装和分发的脚本。</p>',112),e=[s];function g(c,p,l,i,y,d){return o(),a("div",null,e)}const m=t(n,[["render",g]]);export{b as __pageData,m as default};