import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from '../consts';
import GameResources from '../GameResources';
import { BaseGameObject } from '../BaseGameObject';
import { Drawable, Updateable } from '../interfaces';

export class Enemy extends BaseGameObject implements Drawable, Updateable {
  private _image: HTMLImageElement;

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

  constructor(x: number, y: number, imageUrl: string) {
    super(x, y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
    this._startPosition = x;

    this._speed = 0.05;
    this._isMove = true;
    this._damage = 1;
    this._health = 10;
    this._image = GameResources.get(imageUrl);
  }

  public setDamage(damage: number) {
    this._health -= damage;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this._image, this.x, this.y, 80, 80);
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
