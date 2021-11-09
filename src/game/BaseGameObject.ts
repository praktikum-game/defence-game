import { nanoid } from 'nanoid';

export class BaseGameObject {
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.uuid = nanoid();
  }

  protected x: number;

  protected y: number;

  protected width: number;

  protected height: number;

  protected uuid: string;

  public get Uuid() {
    return this.uuid;
  }

  public get X() {
    return this.x;
  }

  public get Y() {
    return this.y;
  }

  public get Width() {
    return this.width;
  }

  public get Height() {
    return this.height;
  }
}
