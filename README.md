# LiteLoaderQQNT - qr-decode

LiteLoaderQQNT插件，快速解析聊天中的图片二维码。
使用前需要安装[LiteLoaderQQNT](https://github.com/mo-jinran/LiteLoaderQQNT)，并在QQNT新版上使用。

建议加入更新日志频道，接收最新更新和使用提示[https://t.me/llqqnt_xh](https://t.me/llqqnt_xh)。

## 使用方法

*建议从`LiteLoaderQQNT`应用商店中直接下载安装，方便快捷。*（新版本1.0`LiteLoaderQQNT`没有插件商店了，请遵循[手动安装方法](https://liteloaderqqnt.github.io/guide/plugins.html)）

**版本不兼容提示**：从1.3.3起，插件已适配1.0版本以上`LiteLoaderQQNT`框架，同时不再兼容旧版框架，请遵循[安装方法](https://liteloaderqqnt.github.io/guide/install.html)更新框架。


也可以clone或下载zip文件解压，保留文件夹结构（文件夹名称为`插件名`，内容为github上的内容），将文件夹移动至`LiteLoaderQQNT数据目录/plugins/`下面，重启QQNT即可。

直接在聊天界面直接右键图片，或者双击聊天中的图片，在新弹出的图片预览界面对图片进行右键，可发现解析二维码菜单，点击即可。

针对解析结果，你可以复制内容，而针对链接，你还可以快速用默认浏览器打开链接。

*注意：如果图片过大，解码时可能会比较慢，这是正常现象，所以建议不要解析过大的图片。*


你可以配置解析到链接二维码时用自定义浏览器打开。此项暂未提供配置界面，需要你手动修改配置文件：前往 `LiteLoaderQQNT数据目录\qr_decode` 中找到 `config.json` 配置文件（至少在安装插件后开过一次QQ才会有这个文件），修改其中的 `browser` 字段为你的浏览器可执行文件完整路径（例如 `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe` ，注意路径要写双斜杠，或者反斜杠 `/` ），配置此项后，解析到包含链接的二维码时，若点击打开连接，则会采用你指定的浏览器打开。


整体项目参考了[繁化姬](https://github.com/qianxu2001/LiteLoaderQQNT-Plugin-Fanhuaji)，在此表示感谢。

*（目前已丢弃node依赖，改为使用草料API来在渲染层解析二维码）*



**提示：目前能对常见格式图片进行解码，如果发现有特殊格式图片解码失败，请发ISSUE。**

## 协议及免责

MIT | 禁止用于任何非法用途，插件开发属学习与研究目的，仅自用，未提供给任何第三方使用。任何不当使用导致的任何侵权问题责任自负。
