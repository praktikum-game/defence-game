import { setImage } from '../helpers';
import { GameResoursesType } from './types';

/**Объект для хранения загруженных изображений: ключ - урл изображения, значение - Image */
class GameResources {
  private _resourceCache: GameResoursesType = {};

  private _load = async (items: string[]) => {
    for (const url of items) {
      this._resourceCache[url] = await setImage(url);
    }
  };

  public load = async (items?: string[]) => {
    try {
      await this._load(items!);
    } catch (e: unknown) {
      const error = e as Error;
      console.log('error', error);
      alert('errorr');
    }
  };

  public get = (resourceName: string) => {
    return this._resourceCache[resourceName];
  };
}

export const gameResourses = new GameResources();
