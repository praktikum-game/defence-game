import { BaseGameObject } from '../BaseGameObject';
import { Drawable } from '../interfaces';
import { Sprite } from './Sprite';

export class GridItem extends BaseGameObject implements Drawable {
  private _borderColor: string;

  private _bgColor: string;

  private _sprite: Sprite | undefined;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    borderColor: string = 'gray',
    bgColor: string = 'white',
  ) {
    super(x, y, width, height);
    this._borderColor = borderColor;
    this._bgColor = bgColor;
  }

  public get sprite() {
    return this._sprite;
  }

  clear(context: CanvasRenderingContext2D) {
    context.clearRect(this._x, this._y, this.width, this.height);
  }

  draw(context: CanvasRenderingContext2D, sprite?: Sprite) {
    this._sprite = sprite;

    context.fillStyle = this._bgColor;
    context.strokeStyle = this._borderColor;

    context.fillRect(this.x, this.y, this.width, this.height);

    if (this._sprite) {
      this._sprite.draw();
    }

    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
