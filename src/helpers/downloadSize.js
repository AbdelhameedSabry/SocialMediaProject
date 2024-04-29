const defaultMaxHeight = 200;

export default function downsizeImage(imageDataUrl, maxHeight) {
  maxHeight = maxHeight ? maxHeight : defaultMaxHeight;
  return new Promise((resolve, reject) => {
    try {
      const img = document.createElement("img");
      img.src = imageDataUrl;

      img.onload = function (event) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const height = maxHeight;
        const width = Math.ceil((height * img.width) / img.height);

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        const dataurl = canvas.toDataURL("image/jpeg");
        resolve(dataurl);
      };
    } catch (e) {
      reject(e);
    }
  });
}
