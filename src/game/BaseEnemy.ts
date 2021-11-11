import { BaseGameObject } from './BaseGameObject';
import { getRandomInt } from './helpers';
import { Drawable, Updateable } from './interfaces';

import virus from './assets/corona_red.png';

const img = new Image();
img.src = virus;

export class BaseEnemy extends BaseGameObject implements Drawable, Updateable {
  private _isMove: boolean;

  private _speed: number;

  private _damage: number;

  private _health: number;

  public get damage() {
    return this._damage;
  }

  public get health() {
    return this._health;
  }

  public set isMove(value: boolean) {
    this._isMove = value;
  }

  constructor() {
    const yPos = getRandomInt(1, 5) * 100;
    super(1200, yPos, 100, 100);

    this._speed = Math.random() - 0.1;
    this._isMove = true;
    this._damage = 1;
    this._health = 10;
  }

  public setDamage(damage: number) {
    this._health -= damage;
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(virus);
    ctx.drawImage(img, this.x, this.y, 100, 100);
    // ctx.fillRect(this.x, this.y, this.height, this.width);
  }

  update(delay: number) {
    if (!this._isMove) return this;
    const dx = this._speed * delay;
    if (this._x < 0) {
      this._x = 1200;
    } else {
      this._x -= Math.abs(dx);
    }
    return this;
  }
}
