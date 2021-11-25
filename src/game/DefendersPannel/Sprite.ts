import GameResources from '../GameResources';
import { Defender } from '../Defenders/Defender';
import { BaseGameObject } from '../BaseGameObject';
import { Constructable } from '../interfaces';

export class Sprite extends BaseGameObject {
  private _image: HTMLImageElement;

  private _type: Constructable<Defender> | null;

  private _isSelected: boolean = false;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imageUrl: string,
    type?: Constructable<Defender>,
  ) {
    super(x, y, width, height);

    this._image = GameResources.get(imageUrl);
    this._type = type ?? null;
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.drawImage(this._image, x + 1, y + 1, width - 2, height - 2);
    if (this._isSelected) {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(x, y, width, height);
    }
  }

  public get type() {
    return this._type;
  }

  public onClick() {
    this._isSelected = true;
    return this._type;
  }
}
