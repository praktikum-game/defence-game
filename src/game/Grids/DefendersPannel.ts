import { DEFPANNEL_CELL_HEIGHT, DEFPANNEL_CELL_WIDTH } from '../consts';
import { DefendersPannelItem } from './DefendersPannelItem';
import { Drawable } from '../interfaces';

export class DefendersPannel implements Drawable {
  public static pannelWidth = 0;

  public static pannelHeight = 0;

  public static pannelX = 0;

  public static pannelY = 0;

  private _pannelGrid: Array<DefendersPannelItem>;

  public get pannelGrid() {
    return this._pannelGrid;
  }

  constructor(pannelWidth: number, pannelHeight: number, pannelX: number, pannelY: number) {
    this._pannelGrid = [];
    for (let y = pannelY; y < pannelHeight; y += DEFPANNEL_CELL_HEIGHT) {
      for (let x = pannelX; x < pannelWidth; x += DEFPANNEL_CELL_WIDTH) {
        this._pannelGrid.push(new DefendersPannelItem(x, y));
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.pannelGrid.forEach((g) => g.draw(cxt));
  }
}
