import { BaseGameObject } from './BaseGameObject';
import { Drawable, Updateable } from './interfaces';

export class BaseBullet extends BaseGameObject implements Drawable, Updateable {
  private speed: number;

  constructor(speed: number, x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.speed = speed;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.height, this.width);
  }

  public update(delay: number) {
    const dx = this.speed * delay;
    if (this.x > 1200) {
      this.x = 1200;
    } else {
      this.x += dx;
    }
    return this;
  }
}
