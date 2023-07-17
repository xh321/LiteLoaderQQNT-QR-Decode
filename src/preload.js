const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("qr_decode", {
    decode: (picPath) => ipcRenderer.invoke("LiteLoader.qr_decode.decode", picPath),
    showResult: (content) => ipcRenderer.invoke("LiteLoader.qr_decode.showResult", content)
});
