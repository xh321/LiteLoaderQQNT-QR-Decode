const {
  ipcMain,
  dialog,
  BrowserWindow,
  shell,
  clipboard,
} = require("electron");
const path = require("path");
const fs = require("fs");
const exec = require("child_process").exec;
// const QrScanner = require("qr-scanner");
var defaultBrowser = LiteLoader.api.config.get("qr_decode", {
  browser: "",
});

onLoad();

function openUrl(url) {
  if (
    (defaultBrowser?.browser ?? "") != "" &&
    fs.existsSync(defaultBrowser.browser)
  ) {
    var cmd = '"' + defaultBrowser.browser + '"' + ' "' + url + '"';

    exec(cmd);
  } else {
    shell.openExternal(url);
  }
}

function onLoad() {
  ipcMain.handle("LiteLoader.qr_decode.showFailed", (_, data) => {
    dialog.showMessageBox({
      type: "error",
      title: "提示",
      message:
        "这可能不是一个有效的二维码，解码失败。\n错误信息为：" + data?.stack,
      buttons: ["确定"],
    });
  });

  ipcMain.handle("LiteLoader.qr_decode.previewQrImg", (event, data) => {
    const win = new BrowserWindow({
      width: 960,
      height: 640,
      title: "二维码预览",
      autoHideMenuBar: true,
    });
    var htmlText = fs.readFileSync(
      path.join(__dirname, "..\\", "assets", "qrPreview.html"),
      "utf-8"
    );
    win.loadURL("about:blank");

    win.webContents.setWindowOpenHandler(({ url }) => {
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          width: 960,
          height: 640,
          autoHideMenuBar: true,
        },
      };
    });

    win.webContents.executeJavaScript(
      'document.write(decodeURIComponent("' +
        encodeURIComponent(htmlText) +
        '"));document.getElementById("qrcode").src="' +
        data +
        '"'
    );
  });

  // ipcMain.handle("LiteLoader.qr_decode.decodeLocally", async (_, imgPath) => {
  //         console.log('图片的路径为:' + imgPath)
  //         let result = await QrScanner.scanImage(imgPath);
  //         console.log(result)
  //         return result
  //     }
  // )

  ipcMain.handle("LiteLoader.qr_decode.showResult", (_, data) => {
    var content = data;

    if (content == null) {
      dialog.showMessageBox({
        type: "warning",
        title: "提示",
        message: "这可能不是一个有效的二维码，解码失败。",
        buttons: ["确定"],
      });
      return;
    }
    var isUrl =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
        content
      );

    var btns = ["复制", "什么都不做"];
    var cancelId = 1;
    if (isUrl) {
      btns.unshift("打开链接");
      cancelId = 2;
    }
    dialog
      .showMessageBox({
        type: "info",
        title: "提示",
        message: `解析结果为：\n${content}\n你想对解析内容做什么？`,
        buttons: btns,
        cancelId: cancelId,
      })
      .then((idx) => {
        //第一个按钮
        if (idx.response == 0) {
          if (isUrl) {
            //打开URL
            openUrl(content);
          } else {
            //复制内容
            clipboard.writeText(content);
          }
        }
        //第二个按钮
        else if (idx.response == 1) {
          if (isUrl) {
            //复制内容
            clipboard.writeText(content);
          } else {
            //取消
          }
        } else {
          //取消
        }
      });
  });
}
