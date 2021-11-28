import { BaseGameObject } from '../BaseGameObject';
import { DEFPANNEL_CELL_HEIGHT, DEFPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';

export class DefendersPannelItem extends BaseGameObject implements Drawable {
  constructor(x: number, y: number) {
    super(x, y, DEFPANNEL_CELL_WIDTH, DEFPANNEL_CELL_HEIGHT);
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'red';

    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
