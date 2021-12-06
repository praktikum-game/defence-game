import { setImage } from '../helpers';
import { GameResoursesType } from './types';

/**Объект для хранения загруженных изображений: ключ - урл изображения, значение - Image */
class GameResources {
  private _resourceCache: GameResoursesType = {};

  private _load = async (items: string[]) => {
    if (items) {
      Promise.all([
        items.forEach((url) => {
          setImage(url, this._resourceCache);
        }),
      ]);
    }
  };

  public load = async (items?: string[]) => {
    await this._load(items!);
  };

  public get = (url: string) => this._resourceCache[url];
}

export const gameResourses = new GameResources();
