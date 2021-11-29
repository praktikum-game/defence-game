export const sepia = (imageData: ImageData) => {
  // получаем одномерный массив, описывающий все пиксели изображения
  const pixels = imageData.data;
  // циклически преобразуем массив, изменяя значения красного, зеленого и синего каналов
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    pixels[i] = r * 0.393 + g * 0.769 + b * 0.189; // red
    pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168; // green
    pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131; // blue
  }
  return imageData;
};

export const gray = (imageData: ImageData) => {
  // получаем одномерный массив, описывающий все пиксели изображения
  const pixels = imageData.data;
  // циклически преобразуем массив, изменяя значения красного, зеленого и синего каналов
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gr = (r + g + b) / 3;
    pixels[i] = gr; // red
    pixels[i + 1] = gr; // green
    pixels[i + 2] = gr; // blue
  }
  return imageData;
};
