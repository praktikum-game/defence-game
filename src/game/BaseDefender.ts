import { BaseBullet } from './BaseBullet';
import { BaseGameObject } from './BaseGameObject';

import doctorImg from './assets/doctor.jpg';

const img = new Image();
img.src = doctorImg;

export class BaseDefender extends BaseGameObject {
  private _health: number;

  // private weapon: BaseWeapon;

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

  public set bullets(value: Array<BaseBullet>) {
    this._bullets = [...value];
  }

  constructor(x: number, y: number) {
    super(x, y, 100, 100);
    this._health = 100;
    this._bullets = [];
    this._it = 0;
    this._damage = 100;
  }

  public getDamage(damage: number) {
    this._health -= damage;
  }

  public fire(delay: number) {
    const bulletSize = 20;

    // каждые 200 фреймов стреляем
    if (this._it % 200 === 0) {
      this._bullets.push(
        new BaseBullet(
          0.05,
          10,
          this._x + this._width / 2,
          this._y + (100 / 2 - bulletSize / 2),
          bulletSize,
          bulletSize,
        ),
      );
    }
    this._it += 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._bullets.forEach((bullet) => bullet.draw(ctx));

    ctx.drawImage(img, this.x, this.y, this.height - 1, this.width - 1);
  }

  public update(delay: number) {
    this.fire(delay);
    for (const bullet of this.bullets) {
      if (bullet.x > 1200) {
        this.bullets = this.bullets.filter((b) => b.uuid !== bullet.uuid);
      }
    }
    this._bullets.forEach((bullet) => bullet.update(delay));
  }
}
