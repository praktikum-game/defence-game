import { Drawable } from '../interfaces';
import { Grid } from './Grid';
import { levels } from '../Levels';

import { BaseGameObject } from 'game/BaseGameObject/BaseGameObject';
import { BaseGameObjectProps } from 'game/BaseGameObject/types';

export class DefendersPannel extends BaseGameObject implements Drawable {
  private _grid: Grid | null = null;

  constructor(basePrpos: BaseGameObjectProps) {
    super(basePrpos);
    this._grid = new Grid(
      {
        ctx: this._ctx,
        x: this.x + 10,
        y: this.y + 10,
        width: this.width - 20,
        height: this.height - 20,
      },
      // cellWidth: DEFPANNEL_CELL_WIDTH,
      // cellHeight: DEFPANNEL_CELL_HEIGHT + 10,
      levels.getLevelDefenders(1),
    );
  }

  public get grid() {
    return this._grid;
  }

  changeGameLevel(level: number, ctx: CanvasRenderingContext2D) {
    const defenders = levels.getLevelDefenders(level);
    this.grid?.generateCells(defenders);
    this.draw(ctx);
  }

  public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'rgba(255,99,71, 0.3)';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.shadowRect(ctx, this.x, this.y, this.width, this.height);

    this._grid?.draw(ctx);
    ctx.restore();
  };

  private shadowRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = 'tomato',
  ) {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.restore();
  }
}
