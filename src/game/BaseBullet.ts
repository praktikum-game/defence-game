import { BaseGameObject } from './BaseGameObject';
import { Drawable, Updateable } from './interfaces';

export class BaseBullet extends BaseGameObject implements Drawable, Updateable {
  private speed: number;

  private _size: number;

  public get size() {
    return this._size;
  }

  constructor(speed: number, size: number, x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.speed = speed;
    this._size = size;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = 'red';
    const circle = new Path2D();
    circle.arc(this.x, this.y, this._size, 0, 2 * Math.PI);
    context.fill(circle);
    context.restore();
  }

  public update(delay: number) {
    const dx = this.speed * delay;
    if (this.x > 1200) {
      this._x = 1200;
    } else {
      this._x += dx;
    }
    return this;
  }
}
