import { BaseGameObject } from './BaseGameObject';
import { getRandomInt } from './helpers';

export class BaseDefender extends BaseGameObject {
  private health: number;

  public get Health() {
    return this.health;
  }

  constructor() {
    super(getRandomInt(0, 5) * 100, getRandomInt(0, 5) * 100, 100, 100);
    this.health = 100;
  }

  getDamage(damage: number) {
    this.health -= damage;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.restore();
  }

  update() {}
}
