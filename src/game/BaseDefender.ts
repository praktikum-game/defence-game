import { BaseBullet } from './BaseBullet';
import { BaseGameObject } from './BaseGameObject';
// import { BaseWeapon } from './BaseWeapon';

export class BaseDefender extends BaseGameObject {
  private health: number;

  // private weapon: BaseWeapon;

  private it: number;

  private bullets: Array<BaseBullet>;

  public get Health() {
    return this.health;
  }

  constructor(x: number, y: number) {
    super(x, y, 100, 100);
    this.health = 100;
    this.bullets = [];
    this.it = 0;
  }

  public getDamage(damage: number) {
    this.health -= damage;
  }

  public fire(delay: number) {
    if (this.it % 100 === 0) {
      this.bullets.push(new BaseBullet(0.2, this.x + this.width / 2, this.y + 50, 20, 20));
    }

    this.it += 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.bullets.forEach((b) => b.draw(ctx));
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.restore();
  }

  public update(delay: number) {
    this.fire(delay);
    this.bullets.forEach((b) => b.update(delay));
  }
}
