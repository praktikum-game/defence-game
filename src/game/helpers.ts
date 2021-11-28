import { ASSETS_PATH } from './consts';

/* eslint-disable @typescript-eslint/no-explicit-any */ //TODO
export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + min));

export const setImage = (source: string, resObject: any): Promise<HTMLImageElement> =>
  new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      res(img);
      resObject[source] = img;
    };
    img.src = ASSETS_PATH + source;
  });

export const getUrls = (resourcesObject: any, res: string[] = []) =>
  Object.values(resourcesObject).reduce((acc: any, value: any) => {
    if (typeof value === 'string') {
      acc.push(value);
    } else if (value.toString() === '[object Object]') {
      getUrls(value, acc);
    }
    return acc;
  }, res);
