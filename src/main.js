const { ipcMain, dialog, shell, clipboard } = require("electron");
const fs = require("fs");
const exec = require("child_process").exec;
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
