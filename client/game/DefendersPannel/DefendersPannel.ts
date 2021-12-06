import { Defender } from '../Defenders/Defender';
import { Constructable } from '../interfaces';
import {
  DEFPANNEL_CELL_COUNT,
  DEFPANNEL_CELL_HEIGHT,
  DEFPANNEL_CELL_WIDTH,
  DEFPANNEL_ROWS_COUNT,
  TOPPANNEL_CELL_HEIGHT,
  TOPPANNEL_ROWS_COUNT,
} from '../consts';
import { Grid } from './Grid';
import { levels } from '../Levels';
import { Sprite } from './Sprite';

export class DefendersPannel {
  public static pannelWidth = 0;

  public static pannelHeight = 0;

  public static pannelX = 0;

  public static pannelY = 0;

  private _grid: Grid | null = null;

  public init() {
    DefendersPannel.pannelWidth = DEFPANNEL_CELL_WIDTH * DEFPANNEL_CELL_COUNT;
    DefendersPannel.pannelHeight = DEFPANNEL_CELL_HEIGHT * DEFPANNEL_ROWS_COUNT;
    DefendersPannel.pannelX = 0;
    DefendersPannel.pannelY = TOPPANNEL_CELL_HEIGHT * TOPPANNEL_ROWS_COUNT;

    this._createGrid();
  }

  private _createGrid() {
    this._grid = new Grid({
      gridWidth: DefendersPannel.pannelWidth,
      gridHeight: DefendersPannel.pannelHeight,
      gridX: DefendersPannel.pannelX,
      gridY: DefendersPannel.pannelY,
      cellWidth: DEFPANNEL_CELL_WIDTH,
      cellHeight: DEFPANNEL_CELL_HEIGHT,
    });
  }

  public get grid() {
    if (!this._grid) {
      this._createGrid();
    }
    return this._grid;
  }

  public draw = (ctx: CanvasRenderingContext2D) => {
    this._grid!.draw(ctx);
  };

  public placeSprites = (ctx: CanvasRenderingContext2D, gameLvl: number) => {
    const levelDefenders: Constructable<Defender>[] = levels.getLevelDefenders(gameLvl);
    this._grid!.pannelGrid.forEach((g, i) => {
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

    this._grid?.pannelGrid.forEach((cell) => {
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
