import { BaseBullet } from './BaseBullet';
import { BaseGameObject } from './BaseGameObject';

import { GameField } from './GameField';
import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from './consts';

export class BaseDefender extends BaseGameObject {
  public static image: HTMLImageElement;

  private _health: number;

  private _isFire: boolean;

  private _fireFrameInterval: number;

  private _it: number;

  private _damage: number;

  private _bullets: Array<BaseBullet>;

  public get health() {
    return this._health;
  }

  public get damage() {
    return this._damage;
  }

  public get bullets() {
    return this._bullets;
  }

  public get isFire() {
    return this._isFire;
  }

  public get fireFrameInterval() {
    return this._fireFrameInterval;
  }

  public set isFire(value: boolean) {
    this._isFire = value;
  }

  public set bullets(value: Array<BaseBullet>) {
    this._bullets = [...value];
  }

  constructor(x: number, y: number) {
    super(x, y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
    this._isFire = false;
    this._health = 100;
    this._bullets = [];
    this._it = 0;
    this._damage = 100;
    this._fireFrameInterval = 200;
  }

  public getDamage(damage: number) {
    this._health -= damage;
  }

  public fire(delay: number) {
    if (!this.isFire) return;

    const bulletSize = 20;

    // каждые 200 фреймов стреляем
    if (delay && this._it % this._fireFrameInterval === 0) {
      this._bullets.push(
        new BaseBullet(
          0.05,
          10,
          this._x + this._width / 2,
          this._y + (this.height / 2 - bulletSize / 2),
          bulletSize,
          bulletSize,
        ),
      );
      this._it = 1;
    }
    this._it += 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._bullets.forEach((bullet) => bullet.draw(ctx));
    if (BaseDefender.image) {
      ctx.drawImage(BaseDefender.image, this.x, this.y, this.height - 1, this.width - 1);
    } else {
      ctx.fillRect(this._x, this._y, this._width, this._height);
    }
  }

  public update(delay: number) {
    this.fire(delay);
    for (const bullet of this.bullets) {
      if (bullet.x > GameField.gameFieldWidth) {
        this.bullets = this.bullets.filter((b) => b.uuid !== bullet.uuid);
      }
    }
    this._bullets.forEach((bullet) => bullet.update(delay));
  }
}
