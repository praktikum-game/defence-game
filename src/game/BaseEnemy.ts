import { BaseGameObject } from './BaseGameObject';
import { Drawable, Updateable } from './interfaces';

export class BaseEnemy extends BaseGameObject implements Drawable, Updateable {
  public static image: HTMLImageElement;

  private _isMove: boolean;

  private _speed: number;

  private _damage: number;

  private _health: number;

  private _startPosition: number;

  public get damage() {
    return this._damage;
  }

  public get health() {
    return this._health;
  }

  public set isMove(value: boolean) {
    this._isMove = value;
  }

  constructor(x: number, y: number) {
    super(x, y, 100, 100);
    this._startPosition = x;

    this._speed = Math.random() - 0.2;
    this._isMove = true;
    this._damage = 1;
    this._health = 10;
  }

  public setDamage(damage: number) {
    this._health -= damage;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(BaseEnemy.image, this.x, this.y + 5, 90, 90);
  }

  update(delay: number) {
    if (!this._isMove) return this;

    const dx = this._speed * delay;
    if (this._x < 0) {
      this._x = this._startPosition;
    } else {
      this._x -= Math.abs(dx);
    }
    return this;
  }
}
