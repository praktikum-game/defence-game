import { BaseGameObject } from './BaseGameObject';
import { Drawable, Updateable } from './interfaces';

import bulletImg from './assets/p1.png';

const img = new Image();
img.src = bulletImg;

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

  private frames = 6;

  private currentFrame = 0;

  private startXPos = 171;

  private fr = 1;

  public draw(context: CanvasRenderingContext2D) {
    const dx = 15;

    this.fr += 1;

    if (this.fr % 100 === 0) {
      if (this.currentFrame >= this.frames) {
        this.startXPos = 171;
      }

      this.currentFrame += 1;

      this.startXPos += this.currentFrame * dx;
      this.fr = 1;
    }
    context.drawImage(img, this.startXPos, 155, 15, 15, 200, 200, 20, 20);
    // context.save();
    // context.fillStyle = 'red';
    // const circle = new Path2D();
    // circle.arc(this.x, this.y, this._size, 0, 2 * Math.PI);
    // context.fill(circle);
    // context.restore();
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
