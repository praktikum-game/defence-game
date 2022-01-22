import { BaseGameObject } from 'game/BaseGameObject/BaseGameObject';
import { BaseGameObjectProps } from 'game/BaseGameObject/types';
import { Drawable } from '../interfaces';

export class ScorePanel extends BaseGameObject implements Drawable {
  private _value: number;

  constructor(props: BaseGameObjectProps) {
    super(props);
    this._value = 0;
  }

  public set text(value: number) {
    this._value = value;
  }

  draw(ctx = this._ctx) {
    ctx.strokeStyle = '#e8d9d1';
    const text = `score: ${this._value}`;
    ctx.fillText(text, this.x + 45, this.height / 2 + 20);
    ctx.restore();
  }

  // clear(ctx: CanvasRenderingContext2D) {
  //   // ctx.clearRect(this.x, this.y, this.width, this.height);
  // }
}
