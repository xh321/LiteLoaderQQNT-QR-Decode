const { ipcMain, dialog, shell, clipboard } = require("electron");
const jsQR = require("jsqr");
const PNG = require("pngjs").PNG;
const fs = require("fs");

function onLoad() {
    ipcMain.handle("qr_decode.decode", (_, picPath) => {
        let imagedata = fs.readFileSync(picPath);
        const pngData = PNG.sync.read(imagedata);
        const qrArray = new Uint8ClampedArray(pngData.data);
        return jsQR(qrArray, pngData.width, pngData.height)?.data;
    });

    ipcMain.handle("qr_decode.showResult", (_, content) => {
        if (content == null) {
            dialog.showMessageBox({
                type: "warning",
                title: "提示",
                message: "这不是一个有效的二维码，解码失败。",
                buttons: ["确定"]
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
                cancelId: cancelId
            })
            .then((idx) => {
                //第一个按钮
                if (idx.response == 0) {
                    if (isUrl) {
                        //打开URL
                        shell.openExternal(content);
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

module.exports = {
    onLoad
};
