import { BaseGameObject } from '../BaseGameObject';
import { TOPPANNEL_CELL_HEIGHT, TOPPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';

export class TopPannelItem extends BaseGameObject implements Drawable {
  constructor(x: number, y: number) {
    super(x, y, TOPPANNEL_CELL_WIDTH, TOPPANNEL_CELL_HEIGHT);
  }

  draw(context: CanvasRenderingContext2D, text?: string, image?: HTMLImageElement) {
    context.strokeStyle = '#e8d9d1';
    if (text) {
      context.fillStyle = '#e8d9d1';
      context.fillRect(this.x, this.y, this.width, this.height);
      if (image) {
        context.drawImage(image, this.x, this.y, this.width, this.height);
      }
      context.fillStyle = '#553e0e';
      context.font = 'bold 18px Inter';
      context.fillText(text, this.x + 45, this.height / 2 + 10);
    }
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  clear(context: CanvasRenderingContext2D) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }
}
