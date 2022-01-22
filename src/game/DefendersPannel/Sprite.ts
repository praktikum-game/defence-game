import { GameResources } from '../GameResourses';
import { Defender } from '../Defenders/Defender';
import { BaseGameObject } from '../BaseGameObject/BaseGameObject';
import { Constructable, Drawable } from '../interfaces';
import { gray } from '../filters';
import { BaseGameObjectProps } from 'game/BaseGameObject/types';

export class Sprite extends BaseGameObject implements Drawable {
  private _image: HTMLImageElement;

  private _filtredImage: ImageData | null;

  private _type: Constructable<Defender> | null;

  private _isSelected: boolean;

  private _isActive: boolean;

  constructor(baseProps: BaseGameObjectProps, imageUrl: string, type?: Constructable<Defender>) {
    super(baseProps);
    this._image = GameResources.get(imageUrl);
    this._type = type ?? null;
    this._isSelected = false;
    this._isActive = false;
    this._filtredImage = null;
  }

  public get isActive() {
    return this._isActive;
  }

  public set isSelected(value: boolean) {
    this._isSelected = value;
  }

  public set isActive(value: boolean) {
    this._isActive = value;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);

    if (!this._isActive) {
      if (this._filtredImage === null) {
        const imageData = ctx.getImageData(this._x, this._y, this._width, this._height);
        this._filtredImage = gray(imageData);
      }
      ctx.putImageData(this._filtredImage, this._x, this._y);
    }
    if (this._isSelected) {
      ctx.strokeStyle = '#6BC732';
      ctx.strokeRect(this._x, this._y, this._width, this._height);
      ctx.strokeRect(this._x + 1, this._y + 1, this._width - 2, this._height - 2);
      ctx.strokeRect(this._x + 2, this._y + 2, this._width - 4, this._height - 4);
      ctx.strokeRect(this._x + 3, this._y + 3, this._width - 6, this._height - 6);
    }
  }

  public redraw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this._x, this._y, this._width, this._height);
    this.draw(ctx);
  }

  public get type() {
    return this._type;
  }

  public onClick(ctx: CanvasRenderingContext2D) {
    this._isSelected = true;
    this.redraw(ctx);
    return this._type;
  }
}
