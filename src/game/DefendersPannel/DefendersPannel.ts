import { Defender } from '../Defenders/Defender';
import { Constructable, Drawable } from '../interfaces';
import { DEFPANNEL_CELL_HEIGHT, DEFPANNEL_CELL_WIDTH } from '../consts';
import { Grid } from './Grid';
import { levels } from '../Levels';
import { Sprite } from './Sprite';
import { BaseGameObject } from 'game/BaseGameObject';

export class DefendersPannel extends BaseGameObject implements Drawable {
  private _grid: Grid | null = null;

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    super(x, y, width, height);
    this._grid = new Grid({
      gridWidth: this.width - 10,
      gridHeight: this.height - 10,
      gridX: this.x + 10,
      gridY: this.y + 10,
      cellWidth: DEFPANNEL_CELL_WIDTH,
      cellHeight: DEFPANNEL_CELL_HEIGHT + 10,
    });
  }

  // public init() {
  //   DefendersPannel.pannelWidth = DEFPANNEL_CELL_WIDTH * DEFPANNEL_CELL_COUNT;
  //   DefendersPannel.pannelHeight = 5 * 60; //DEFPANNEL_CELL_HEIGHT * DEFPANNEL_ROWS_COUNT;
  //   DefendersPannel.pannelX = 10;
  //   DefendersPannel.pannelY = 200;

  //   this._createGrid();
  // }

  // private _createGrid() {

  // }

  public get grid() {
    // if (!this._grid) {
    //   this._createGrid();
    // }
    return this._grid;
  }

  public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'rgba(255,99,71, 0.3)';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this._grid!.draw(ctx);
    ctx.strokeStyle = 'white';

    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  };

  public placeSprites = (ctx: CanvasRenderingContext2D, gameLvl: number) => {
    const levelDefenders: Constructable<Defender>[] = levels.getLevelDefenders(gameLvl);
    this._grid!.gridItems.forEach((g, i) => {
      if (i < levelDefenders.length) {
        const lvlDefender = levelDefenders[i];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { iconUrl } = <any>lvlDefender;
        const icon = iconUrl;
        g.clear(ctx);
        g.draw(ctx, new Sprite(ctx, g.x, g.y, g.width, g.height, icon, lvlDefender));
      }
    });
  };

  public onClick(x: number, y: number) {
    let result = null;

    this._grid?.gridItems.forEach((cell) => {
      // определяем, входят ли координаты клика в периметр текущей ячейки
      if (cell.x < x && cell.x + cell.width > x && cell.y < y && cell.y + cell.height > y) {
        if (cell.sprite && cell.sprite.isActive) result = cell.sprite.onClick();
      } else if (cell.sprite) {
        cell.sprite.isSelected = false;
        cell.sprite.redraw();
      }
    });

    return result;
  }
}
