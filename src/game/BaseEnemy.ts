import { BaseGameObject } from './BaseGameObject';
import { getRandomInt } from './helpers';
import { Drawable, Updateable } from './interfaces';

export class BaseEnemy extends BaseGameObject implements Drawable, Updateable {
  private _isMove: boolean;

  private speed: number;

  private _damage: number;

  public get damage() {
    return this._damage;
  }

  public set isMove(value: boolean) {
    this._isMove = value;
  }

  constructor() {
    const yPos = getRandomInt(1, 5) * 100;
    super(1200, yPos, 100, 100);

    this.speed = Math.random() - 0.1;
    this._isMove = true;
    this._damage = 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, this.height, this.width);
  }

  update(delay: number) {
    if (!this._isMove) return this;
    const dx = this.speed * delay;
    if (this._x < 0) {
      this._x = 1200;
    } else {
      this._x -= Math.abs(dx);
    }
    return this;
  }
}
