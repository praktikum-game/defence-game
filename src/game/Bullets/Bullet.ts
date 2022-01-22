import { BaseGameObject } from '../BaseGameObject/BaseGameObject';
import { Drawable, Updateable } from '../interfaces';
import { GameField } from '../Grids/GameField';
import { GameResources } from '../GameResourses';
import { BulletInitType } from './types';
import { BULLET_DEFAULT_SPEED } from '../consts';

export class Bullet extends BaseGameObject implements Drawable, Updateable {
  protected _image: HTMLImageElement;

  protected _speed: number;

  constructor({ speed, x, y, width, height, imageUrl }: BulletInitType) {
    super(x, y, width, height);
    this._image = GameResources.get(imageUrl) ?? null;
    this._speed = speed ?? BULLET_DEFAULT_SPEED;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this._image, this._x, this._y, this._width, this._height);
  }

  public update(delay: number) {
    const dx = this._speed * delay;
    if (this._x > GameField.gameFieldWidth) {
      this._x = GameField.gameFieldWidth;
    } else {
      this._x += dx;
    }
    return this;
  }
}
