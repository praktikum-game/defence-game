import {
  ENEMY_DEFAULT_DAMAGE,
  ENEMY_DEFAULT_DAMAGE_INTERVAL,
  ENEMY_DEFAULT_HEALTH,
  ENEMY_DEFAULT_SPEED,
  FIELD_CELL_HEIGHT,
  FIELD_CELL_WIDTH,
} from '../consts';
import { GameResources } from '../GameResourses';
import { BaseGameObject } from '../BaseGameObject/BaseGameObject';
import { Drawable, Updateable } from '../interfaces';
import { EnemyInitType } from './types';

export class Enemy extends BaseGameObject implements Drawable, Updateable {
  private _image: HTMLImageElement;

  private _isMove: boolean;

  private _speed: number;

  private _damage: number;

  private _damageInterval: number;

  private _health: number;

  private _startPosition: number;

  private _timefromLastAtack: number = 0;

  public get damage() {
    return this._damage;
  }

  public get health() {
    return this._health;
  }

  public get timeFromLastAtack() {
    return this._timefromLastAtack;
  }

  public get damageInterval() {
    return this._damageInterval;
  }

  public set isMove(value: boolean) {
    this._isMove = value;
  }

  constructor({ imageUrl, x, y, speed, damage, health, damageInterval }: EnemyInitType) {
    super(x, y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
    this._startPosition = x;

    this._speed = speed ?? ENEMY_DEFAULT_SPEED;
    this._isMove = false;
    this._damage = damage ?? ENEMY_DEFAULT_DAMAGE;
    this._damageInterval = damageInterval ?? ENEMY_DEFAULT_DAMAGE_INTERVAL;
    this._health = health ?? ENEMY_DEFAULT_HEALTH;
    this._image = GameResources.get(imageUrl);
  }

  public setDamage(damage: number) {
    this._health -= damage;
  }

  public isAtack = (delay: number) => {
    this._timefromLastAtack += delay;

    if (this._timefromLastAtack >= this._damageInterval * 1000) {
      this._timefromLastAtack = 0;
      return true;
    }
    return false;
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this._image, this.x, this.y, FIELD_CELL_WIDTH, FIELD_CELL_HEIGHT);
  }

  update(delay: number) {
    if (!this._isMove) return this;

    const dx = this._speed * delay;
    if (this._x < 0) {
      this._x = this._startPosition;
    } else {
      this._x -= Math.abs(dx);
    }
    return this;
  }
}
