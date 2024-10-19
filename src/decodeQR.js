function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas.toDataURL("image/png");
}
export async function decodeQR(image) {
  // 调用草料二维码API
  return await fetch("https://qrdetector-api.cli.im/v1/detect_binary", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183",
    },
    body: `image_data=${getBase64Image(image)}&remove_background=0`,
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.status == 1) {
        return json.data.qrcode_content;
      } else {
        throw Error(json.message);
      }
    });
}

export async function decodeQRUrl(imageUrl) {
  return new Promise((accept, reject) => {
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.src = encodeURI("appimg://"+imageUrl);
    image.onload = async function () {
      try {
        console.log("准备解析path辣，地址是" + encodeURI(imageUrl));
        var data = await decodeQR(image);
        accept(data);
      } catch (e) {
        reject(e);
      }
    };
  });
}
