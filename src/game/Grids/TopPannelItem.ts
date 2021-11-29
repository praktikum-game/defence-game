import { BaseGameObject } from '../BaseGameObject';
import { TOPPANNEL_CELL_HEIGHT, TOPPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';

export class TopPannelItem extends BaseGameObject implements Drawable {
  constructor(x: number, y: number) {
    super(x, y, TOPPANNEL_CELL_WIDTH, TOPPANNEL_CELL_HEIGHT);
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'orange';
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
