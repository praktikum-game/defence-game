import { TOPPANNEL_CELL_HEIGHT, TOPPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';
import { TopPannelItem } from './TopPannelItem';

export class TopPannel implements Drawable {
  public static pannelWidth = 0;

  public static pannelHeight = 0;

  public static pannelX = 0;

  public static pannelY = 0;

  private _pannelGrid: Array<TopPannelItem>;

  public get pannelGrid() {
    return this._pannelGrid;
  }

  constructor(pannelWidth: number, pannelHeight: number, pannelX: number, pannelY: number) {
    this._pannelGrid = [];
    for (let y = pannelY; y < pannelHeight; y += TOPPANNEL_CELL_HEIGHT) {
      for (let x = pannelX; x < pannelWidth; x += TOPPANNEL_CELL_WIDTH) {
        this._pannelGrid.push(new TopPannelItem(x, y));
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.pannelGrid.forEach((g) => g.draw(cxt));
  }
}
