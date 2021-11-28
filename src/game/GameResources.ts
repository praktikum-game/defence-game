import { setImage } from './helpers';
import { GameResoursesType } from './types';

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

export default new GameResources();
