export const sepia = (imageData: ImageData) => {
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    pixels[i] = r * 0.393 + g * 0.769 + b * 0.189;
    pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
    pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
  }
  return imageData;
};

export const gray = (imageData: ImageData) => {
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gr = (r + g + b) / 3;
    pixels[i] = gr;
    pixels[i + 1] = gr;
    pixels[i + 2] = gr;
  }
  return imageData;
};
