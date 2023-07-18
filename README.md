# LiteLoaderQQNT - qr-decode

LiteLoaderQQNT插件，快速解析聊天中的图片二维码。
使用前需要安装[LiteLoaderQQNT](https://github.com/mo-jinran/LiteLoaderQQNT)，并在QQNT新版上使用。

## 使用方法

clone或下载zip文件解压，保留文件夹结构（文件夹名称为`插件名`，内容为github上的内容），将文件夹移动至`LiteLoaderQQNT数据目录/plugins/`下面，重启QQNT即可。

双击聊天中的二维码，在新弹出的图片预览界面对图片进行右键，可发现解析二维码菜单，点击即可。

你可以复制内容，而针对链接，你还可以快速用默认浏览器打开链接。

*注意：如果图片过大，解码时会卡死，这是正常现象，但还是建议不要解析过大的图片。*



*暂时不能在聊天界面直接右键解析二维码，因为图片的contextmenu事件不被响应，可能QQNT对此事件阻止了冒泡，如果知道怎么解决的欢迎ISSUE或PR。*



整体项目参考了[繁化姬](https://github.com/qianxu2001/LiteLoaderQQNT-Plugin-Fanhuaji)，在此表示感谢。

（不要问为什么我传node_modules上来，反正也没几个文件，方便使用嘛）



**提示：目前仅能对JPG、PNG格式图片（QQ大部分都是这个格式）进行解码，如果有其他格式图片解码失败，请发ISSUE。**

## 协议及免责

MIT | 禁止用于任何非法用途，插件开发属学习与研究目的，仅自用，未提供给任何第三方使用。任何不当使用导致的任何侵权问题责任自负。
