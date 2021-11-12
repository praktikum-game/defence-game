import { BaseGameObject } from './BaseGameObject';
import { Drawable, Updateable } from './interfaces';

import fireball1 from './assets/pills.jpg';

const img = new Image();
img.src = fireball1;

export class BaseBullet extends BaseGameObject implements Drawable, Updateable {
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
    context.drawImage(img, 8, 82, 240, 86, this.x, this.y, 44, 16);
  }

  public update(delay: number) {
    const dx = this._speed * delay;
    if (this.x > 1200) {
      this._x = 1200;
    } else {
      this._x += dx;
    }
    return this;
  }
}
