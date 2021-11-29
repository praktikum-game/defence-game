import { BaseGameObject } from '../BaseGameObject';
import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';

export class FieldGridItem extends BaseGameObject implements Drawable {
  constructor(x: number, y: number) {
    super(x, y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'white';
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
