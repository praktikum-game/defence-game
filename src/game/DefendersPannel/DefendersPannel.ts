import { Defender } from '../Defenders/Defender';
import { Constructable } from '../interfaces';
import {
  DEFPANNEL_CELL_COUNT,
  DEFPANNEL_CELL_HEIGHT,
  DEFPANNEL_CELL_WIDTH,
  DEFPANNEL_ROWS_COUNT,
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
    DefendersPannel.pannelY = 0;

    this._createGrid();
  }

  private _createGrid() {
    this._grid = new Grid(
      DefendersPannel.pannelWidth,
      DefendersPannel.pannelHeight,
      DefendersPannel.pannelX,
      DefendersPannel.pannelY,
      DEFPANNEL_CELL_WIDTH,
      DEFPANNEL_CELL_HEIGHT,
    );
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

  public place = (ctx: CanvasRenderingContext2D, gameLvl: number) => {
    const levelDefenders: Constructable<Defender>[] = levels.getLevelDefenders(gameLvl);
    this._grid!.pannelGrid.forEach((g, i) => {
      if (i < levelDefenders.length) {
        const lvlDefender = levelDefenders[i];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { iconUrl } = (lvlDefender as any)!;
        const icon = iconUrl;
        g.draw(ctx, new Sprite(g.x, g.y, g.width, g.height, icon, lvlDefender));
      }
    });
  };

  public onClick(x: number, y: number) {
    let result: Constructable<Defender> | null = null;

    this._grid?.pannelGrid.forEach((cell) => {
      // определяем, входят ли координаты клика в периметр текущей ячейки
      if (cell.x < x && cell.x + cell.width > x && cell.y < y && cell.y + cell.width > y) {
        console.log(cell.sprite?.onClick());
        result = cell.sprite!.onClick();
      }
      return result;
    });
  }
}
