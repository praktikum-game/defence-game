import { ASSETS_PATH } from './consts';
import { GameResoursesType, ResObjectItemType, ResourcesObjectType } from './types';

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const setImage = (source: string, resObject: GameResoursesType): Promise<HTMLImageElement> =>
  new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      res(img);
      resObject[source] = img;
    };
    img.src = ASSETS_PATH + source;
  });

// получить все (в дальнейшем все для текущего уровня) пути к ресурсам
export const getUrls = (
  resourcesObject: ResourcesObjectType | ResObjectItemType,
  res: string[] = [],
) =>
  Object.values(resourcesObject).reduce((acc: string[], value) => {
    if (typeof value === 'string') {
      acc.push(value);
    } else {
      getUrls(value, acc);
    }
    return acc;
  }, res);
