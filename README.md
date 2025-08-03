# 目前新版QQ已自带二维码解析，本插件适配高版本优先级不高。但应该会继续更新的。

# LiteLoaderQQNT - qr-decode

LiteLoaderQQNT插件，快速解析聊天中的图片二维码。
使用前需要安装[LiteLoaderQQNT](https://github.com/mo-jinran/LiteLoaderQQNT)，并在QQNT新版上使用。

强烈建议加TG频道 https://t.me/+UwFw2Ff-8scyOWY1 来蹲更新/公告（老频道被爆破了，请加新频道）

## 使用方法

直接在本仓库Release中下载zip，然后在LiteLoaderQQNT配置界面中选择插件压缩包导入即可

也可以使用插件商店类应用安装，如 https://github.com/ltxhhz/LL-plugin-list-viewer

**版本不兼容提示**：从1.3.3起，插件已适配1.0版本以上`LiteLoaderQQNT`框架，同时不再兼容旧版框架，请遵循[安装方法](https://liteloaderqqnt.github.io/guide/install.html)更新框架。

直接在聊天界面直接右键图片，或者双击聊天中的图片，在新弹出的图片预览界面对图片进行右键，可发现解析二维码菜单，点击即可。

针对解析结果，你可以复制内容，而针对链接，你还可以快速用默认浏览器打开链接。

*注意：如果图片过大，解码时可能会比较慢，这是正常现象，所以建议不要解析过大的图片。*

1.3.12起支持对文本进行二维码编码，目前只能在聊天输入框中进行操作（也就是不能对聊天对话中的文本进行操作，若要操作请先复制对应文本到聊天输入框）。输入或粘贴文本到输入框，然后选中需要编码的内容，右键菜单中点击"选中内容生成二维码"即可。

你可以配置解析到链接二维码时用自定义浏览器打开。此项暂未提供配置界面，需要你手动修改配置文件：前往 `LiteLoaderQQNT数据目录\qr_decode` 中找到 `config.json` 配置文件（至少在安装插件后开过一次QQ才会有这个文件），修改其中的 `browser` 字段为你的浏览器可执行文件完整路径（例如 `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe` ，注意路径要写双斜杠，或者反斜杠 `/` ），配置此项后，解析到包含链接的二维码时，若点击打开连接，则会采用你指定的浏览器打开。


整体项目参考了[繁化姬](https://github.com/qianxu2001/LiteLoaderQQNT-Plugin-Fanhuaji)，在此表示感谢。

*（目前已丢弃node依赖，改为使用草料API来在渲染层解析二维码）*



**提示：目前能对常见格式图片进行解码，如果发现有特殊格式图片解码失败，请发ISSUE。**

## 协议及免责

MIT | 禁止用于任何非法用途，插件开发属学习与研究目的，仅自用，未提供给任何第三方使用。任何不当使用导致的任何侵权问题责任自负。
