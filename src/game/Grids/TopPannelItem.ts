import { BaseGameObject } from '../BaseGameObject';
import { TOPPANNEL_CELL_HEIGHT, TOPPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';

export class TopPannelItem extends BaseGameObject implements Drawable {
  constructor(x: number, y: number) {
    super(x, y, TOPPANNEL_CELL_WIDTH, TOPPANNEL_CELL_HEIGHT);
  }

  draw(context: CanvasRenderingContext2D, text?: string) {
    context.strokeStyle = '#6BC732';
    if (text) {
      context.fillStyle = '#6BC732';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = 'white';
      context.font = '22px Verdana';
      context.fillText(text, this.x + 30, this.height / 2 + 10);
    }
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  clear(context: CanvasRenderingContext2D) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }
}
