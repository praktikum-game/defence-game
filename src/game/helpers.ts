export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + min));

export const setImage = (source: string): Promise<HTMLImageElement> =>
  new Promise((res) => {
    const img = new Image();

    img.onload = () => res(img);

    img.src = source;
  });
