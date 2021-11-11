import { BaseBullet } from './BaseBullet';
import { BaseGameObject } from './BaseGameObject';
// import { BaseWeapon } from './BaseWeapon';
import { getRandomInt } from './helpers';

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

  constructor() {
    super(getRandomInt(0, 5) * 100, getRandomInt(0, 5) * 100, 100, 100);
    this._health = 100;
    // this.weapon = new BaseWeapon(0.2, 2);
    this._bullets = [];
    this._it = 0;
    this._damage = 100;
  }

  public getDamage(damage: number) {
    this._health -= damage;
  }

  public fire(delay: number) {
    const bulletSize = 20;

    if (this._it % 100 === 0) {
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

    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.restore();
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
