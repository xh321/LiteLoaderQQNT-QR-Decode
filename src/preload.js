const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("qr_decode", {
    decode: (picPath) => ipcRenderer.invoke("qr_decode.decode", picPath),
    showResult: (content) => ipcRenderer.invoke("qr_decode.showResult", content)
});
