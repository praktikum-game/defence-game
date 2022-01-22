import { BaseGameObject } from 'game/BaseGameObject/BaseGameObject';
import { BaseGameObjectProps } from 'game/BaseGameObject/types';
import { GameResources, resources } from 'game/GameResourses';
import { Drawable } from '../interfaces';

export class CurrencyPanel extends BaseGameObject implements Drawable {
  private _image: HTMLImageElement;

  private _text: string;

  constructor(baseProps:BaseGameObjectProps, text: string = 'pipa') {
    super(baseProps);
    this._image = GameResources.get(resources.currencypanel.money.icon);
    this._text = text;
  }

  public set text(value: string) {
    this._text = value;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#e8d9d1';
    if (this._text) {
      ctx.fillStyle = '#e8d9d1';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      if (this._image) {
        ctx.drawImage(this._image, this.x, this.y, this.width, this.height);
      }
      ctx.fillStyle = '#553e0e';
      ctx.font = 'bold 18px Inter';
      ctx.fillText(this._text, this.x + 45, this.height / 2 + 20);
    }
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    // ctx.clearRect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = 'rgba(255,99,71, 0.3)';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.restore();
  }

  // clear(ctx: CanvasRenderingContext2D) {
  //   // ctx.clearRect(this.x, this.y, this.width, this.height);
  // }
}
