import { GameResources } from '../GameResourses';
import { Bullet } from '../Bullets/Bullet';
import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from '../consts';
import { GameField } from '../Grids/GameField';
import { Constructable } from '../interfaces';
import { BaseGameObject } from '../BaseGameObject';

export abstract class Defender extends BaseGameObject {
  protected _image: HTMLImageElement;

  protected _health: number;

  protected _isFire: boolean;

  protected _fireFrameInterval: number;

  protected _it: number;

  protected _damage: number;

  protected _bullet: Constructable<Bullet>;

  protected _bullets: Array<Bullet>;

  protected _width: number;

  protected _height: number;

  public get health() {
    return this._health;
  }

  public get damage() {
    return this._damage;
  }

  public get bullets() {
    return this._bullets;
  }

  public get isFire() {
    return this._isFire;
  }

  public get fireFrameInterval() {
    return this._fireFrameInterval;
  }

  public set isFire(value: boolean) {
    this._isFire = value;
  }

  public set bullets(value: Array<Bullet>) {
    this._bullets = [...value];
  }

  constructor(
    bullet: Constructable<Bullet>,
    x: number,
    y: number,
    width: number,
    height: number,
    imageUrl: string,
    health?: number,
    damage?: number,
    fireFrameInterval?: number,
  ) {
    super(x, y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
    this._isFire = true;
    this._health = health ?? 100;
    this._bullet = bullet;
    this._bullets = [];
    this._it = 0;
    this._damage = damage ?? 100;
    this._fireFrameInterval = fireFrameInterval ?? 200;
    this._image = GameResources.get(imageUrl) ?? null;
    this._width = width ?? FIELD_CELL_WIDTH;
    this._height = height ?? FIELD_CELL_HEIGHT;
  }

  public getDamage(damage: number) {
    this._health -= damage;
  }

  public fire(delay: number) {
    if (!this.isFire) return;

    // каждые 200 фреймов стреляем
    if (delay && this._it % this._fireFrameInterval === 0) {
      const bull = new this._bullet(this._x + this._width / 2, this._y + this._height / 2);
      this._bullets.push(bull);
      this._it = 1;
    }
    this._it += 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._bullets.forEach((bullet) => bullet.draw(ctx));
    if (this._image) {
      ctx.drawImage(this._image, this.x, this.y, this.height - 1, this.width - 1);
    } else {
      ctx.fillRect(this._x, this._y, this._width, this._height);
    }
  }

  public update(delay: number) {
    this.fire(delay);
    for (const bullet of this.bullets) {
      if (bullet.x > GameField.gameFieldWidth) {
        this.bullets = this.bullets.filter((b) => b.uuid !== bullet.uuid);
      }
    }
    this._bullets.forEach((bullet) => bullet.update(delay));
  }
}
