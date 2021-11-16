import { BaseGameObject } from './BaseGameObject';
import { Drawable, Updateable } from './interfaces';

import { GameField } from './GameField';

export class BaseBullet extends BaseGameObject implements Drawable, Updateable {
  public static image: HTMLImageElement;

  private _speed: number;

  private _size: number;

  public get size() {
    return this._size;
  }

  constructor(speed: number, size: number, x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this._speed = speed;
    this._size = size;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(BaseBullet.image, 3, 20, 58, 24, this.x, this.y, 44, 16);
  }

  public update(delay: number) {
    const dx = this._speed * delay;
    if (this.x > GameField.gameFieldWidth) {
      this._x = GameField.gameFieldWidth;
    } else {
      this._x += dx;
    }
    return this;
  }
}
