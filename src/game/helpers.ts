import { ASSETS_PATH } from './consts';
import {
  ResourceObjectItemType,
  ResourcesObjectType,
} from './GameResourses/types';

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const setImage = (source: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = ASSETS_PATH + source;
  });

// получить все (в дальнейшем все для текущего уровня) пути к ресурсам
export const getUrls = (
  resourcesObject: ResourcesObjectType | ResourceObjectItemType,
  res: string[] = [],
): string[] => {
  const resources = Object.values(resourcesObject).reduce((acc: string[], value) => {
    if (typeof value === 'string') {
      acc.push(value);
    } else {
      getUrls(value, acc);
    }
    return acc;
  }, res);
  return resources;
};
