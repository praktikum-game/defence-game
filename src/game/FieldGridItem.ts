import { BaseGameObject } from './BaseGameObject';
import { Drawable } from './interfaces';

export class FieldGridItem extends BaseGameObject implements Drawable {
  constructor(x: number, y: number) {
    super(x, y, 100, 100);
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'blue';

    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
