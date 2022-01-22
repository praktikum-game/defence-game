import { BaseGameObjectProps } from 'game/BaseGameObject/types';
import { Defender } from 'game/Defenders/Defender';
import { BaseGameObject } from '../BaseGameObject/BaseGameObject';
import { Constructable, Drawable } from '../interfaces';
import { Sprite } from './Sprite';

export class GridItem extends BaseGameObject implements Drawable {
  private _borderColor: string;

  private _bgColor: string;

  private _levelDefender: Constructable<Defender>;

  private _sprite: Sprite | undefined;

  constructor(
    baseProps: BaseGameObjectProps,
    defender: Constructable<Defender>,
    borderColor: string = 'gray',
    bgColor: string = 'white',
  ) {
    super(baseProps);
    this._borderColor = borderColor;
    this._bgColor = bgColor;

    if (defender) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { iconUrl } = <any>defender;
      const icon = iconUrl;
      this._sprite = new Sprite(baseProps, icon);
    }
  }

  public get sprite() {
    return this._sprite;
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this._x, this._y, this.width, this.height);
  }

  setSelected(isSelected: boolean) {
    if (this._sprite) {
      this._sprite.isSelected = isSelected;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    this._sprite?.draw(ctx);
    // this._sprite = sprite;

    // ctx.fillStyle = this._bgColor;
    // ctx.strokeStyle = this._borderColor;

    // ctx.fillRect(this.x, this.y, this.width, this.height);

    // if (this._sprite) {
    //   this._sprite.draw();
    // }

    // ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  // public placeSprites = (ctx: CanvasRenderingContext2D, gameLvl: number) => {
  //   const levelDefenders: Constructable<Defender>[] = levels.getLevelDefenders(gameLvl);
  //   this._grid!.gridItems.forEach((g, i) => {
  //     if (i < levelDefenders.length) {
  //       const lvlDefender = levelDefenders[i];
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const { iconUrl } = <any>lvlDefender;
  //       const icon = iconUrl;
  //       g.clear(ctx);
  //       g.draw(ctx, new Sprite(ctx, g.x, g.y, g.width, g.height, icon, lvlDefender));
  //     }
  //   });
  // };
}
