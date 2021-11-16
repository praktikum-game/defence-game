import { nanoid } from 'nanoid';

export class BaseGameObject {
  protected _x: number;

  protected _y: number;

  protected _width: number;

  protected _height: number;

  protected _uuid: string;


  constructor(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._uuid = nanoid();
  }


  public get uuid() {
    return this._uuid;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }
}
