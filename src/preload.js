const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("qr_decode", {
    showResult: (content) =>
        ipcRenderer.invoke("LiteLoader.qr_decode.showResult", content),
    showFailed: (content) =>
        ipcRenderer.invoke("LiteLoader.qr_decode.showFailed", content),
    loadFinished: (callback) =>
        ipcRenderer.on("LiteLoader.qr_decode.loadFinished", callback)
});
