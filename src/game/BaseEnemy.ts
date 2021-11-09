import { BaseGameObject } from './BaseGameObject';
import { getRandomInt } from './helpers';
import { Drawable, Updateable } from './interfaces';

export class BaseEnemy extends BaseGameObject implements Drawable, Updateable {
  private directionMove: number;

  private isMove: boolean;

  private speed: number;

  private damage: number;

  public get Damage() {
    return this.damage;
  }

  public set IsMove(value: boolean) {
    this.isMove = value;
  }

  constructor() {
    super(1200, getRandomInt(1, 5) * 100, 100, 100);

    this.speed = Math.random() - 0.2;
    this.directionMove = -1;
    this.isMove = true;
    this.damage = 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, this.height, this.width);
  }

  update(delay: number) {
    if (!this.isMove) return this;
    const dx = this.speed * delay * this.directionMove;
    if (this.x < 1) {
      this._x = 1200;
    } else {
      this._x += dx;
    }
    return this;
  }
}
