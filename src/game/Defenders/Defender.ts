import { GameResources } from '../GameResourses';
import { Bullet } from '../Bullets/Bullet';
import {
  DEFAULT_FIRE_INTERVAL,
  DEFENDER_DEFAULT_COST,
  DEFENDER_DEFAULT_DAMAGE,
  DEFENDER_DEFAULT_HEALTH,
  FIELD_CELL_HEIGHT,
  FIELD_CELL_WIDTH,
} from '../consts';
import { GameField } from '../Grids/GameField';
import { Constructable } from '../interfaces';
import { BaseGameObject } from '../BaseGameObject/BaseGameObject';
import { DefenderInitType } from './types';

export abstract class Defender extends BaseGameObject {
  protected _image: HTMLImageElement;

  protected _health: number;

  protected _isFire: boolean;

  protected _fireFrameInterval: number;

  protected _it: number;

  protected _damage: number;

  protected _bullet: Constructable<Bullet> | undefined;

  protected _bullets: Array<Bullet>;

  protected _width: number;

  protected _height: number;

  protected _cost: number;

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

  public get cost() {
    return this._cost;
  }

  public set isFire(value: boolean) {
    this._isFire = value;
  }

  public set bullets(value: Array<Bullet>) {
    this._bullets = [...value];
  }

  constructor({
    bullet,
    x,
    y,
    width,
    height,
    imageUrl,
    health,
    damage,
    fireFrameInterval,
    cost,
  }: DefenderInitType) {
    super(x, y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
    this._isFire = true;
    this._health = health ?? DEFENDER_DEFAULT_HEALTH;
    this._bullet = bullet;
    this._bullets = [];
    this._it = 0;
    this._damage = damage ?? DEFENDER_DEFAULT_DAMAGE;
    this._fireFrameInterval = fireFrameInterval ?? DEFAULT_FIRE_INTERVAL;
    this._image = GameResources.get(imageUrl) ?? null;
    this._width = width ?? FIELD_CELL_WIDTH;
    this._height = height ?? FIELD_CELL_HEIGHT;
    this._cost = cost ?? DEFENDER_DEFAULT_COST;
  }

  public getDamage(damage: number) {
    this._health -= damage;
  }

  public fire(delay: number) {
    if (!this.isFire) return;
    if (delay) {
      if (this._bullet && this._it % this._fireFrameInterval === 0) {
        const bull = new this._bullet(this._x + this._width / 2, this._y + this._height / 2);
        this._bullets.push(bull);
        this._it = 1;
      }
      this._it += 1;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._bullets.forEach((bullet) => bullet.draw(ctx));
    if (this._image) {
      ctx.drawImage(this._image, this._x, this.y, this._height, this._width);
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
