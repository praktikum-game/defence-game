import { BaseGameObject } from '../BaseGameObject';
import { Drawable } from '../interfaces';
import { Sprite } from './Sprite';

export class GridItem extends BaseGameObject implements Drawable {
  private _color: string;

  private _sprite: Sprite | undefined;

  constructor(x: number, y: number, width: number, height: number, color: string = 'gray') {
    super(x, y, width, height);
    this._color = color;
  }

  public get sprite() {
    return this._sprite;
  }

  draw(context: CanvasRenderingContext2D, sprite?: Sprite) {
    this._sprite = sprite;
    context.fillStyle = 'white';
    context.strokeStyle = this._color;

    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeRect(this.x, this.y, this.width, this.height);
    if (this._sprite) {
      this._sprite.draw(context, this.x, this.y, this.width, this.height);
    }
  }
}
