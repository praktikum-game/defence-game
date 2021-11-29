import { GameResources } from '../GameResourses';
import { Defender } from '../Defenders/Defender';
import { BaseGameObject } from '../BaseGameObject';
import { Constructable } from '../interfaces';
import { gray } from '../filters';

export class Sprite extends BaseGameObject {
  private _image: HTMLImageElement;

  private _type: Constructable<Defender> | null;

  private _isSelected: boolean;

  private _isActive: boolean;

  private _ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
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
    this._isSelected = false;
    this._isActive = true;
    this._ctx = ctx;
  }

  public get isActive() {
    return this._isActive;
  }

  public set isSelected(value: boolean) {
    this._isSelected = value;
  }

  public draw() {
    this._ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
    if (!this._isActive) {
      // получаем объект, описывающий внутреннее состояние области контекста
      const imageData = this._ctx.getImageData(this._x, this._y, this._width, this._height);
      // фильтруем
      const imageDataFiltered = gray(imageData);
      // кладем результат фильтрации обратно в canvas
      this._ctx.putImageData(imageDataFiltered, this._x, this._y);
    }
    if (this._isSelected) {
      this._ctx.strokeStyle = '#6BC732';
      this._ctx.strokeRect(this._x, this._y, this._width, this._height);
      this._ctx.strokeRect(this._x + 1, this._y + 1, this._width - 2, this._height - 2);
      this._ctx.strokeRect(this._x + 2, this._y + 2, this._width - 4, this._height - 4);
      this._ctx.strokeRect(this._x + 3, this._y + 3, this._width - 6, this._height - 6);
    }
  }

  public redraw() {
    this._ctx.clearRect(this._x, this._y, this._width, this._height);
    this.draw();
  }

  public get type() {
    return this._type;
  }

  public onClick() {
    this._isSelected = true;
    this.redraw();
    return this._type;
  }
}
