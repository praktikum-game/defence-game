import { DEFPANNEL_CELL_HEIGHT, DEFPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';
import { GridItem } from './GridItem';

export class Grid implements Drawable {
  private _pannelGrid: Array<GridItem>;

  public get pannelGrid() {
    return this._pannelGrid;
  }

  constructor(
    pannelWidth: number,
    pannelHeight: number,
    pannelX: number,
    pannelY: number,
    cellWidth: number,
    cellHeight: number,
    cellColor?: string,
  ) {
    this._pannelGrid = [];
    for (let y = pannelY; y < pannelHeight; y += DEFPANNEL_CELL_HEIGHT) {
      for (let x = pannelX; x < pannelWidth; x += DEFPANNEL_CELL_WIDTH) {
        this._pannelGrid.push(new GridItem(x, y, cellWidth, cellHeight, cellColor));
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.pannelGrid.forEach((g) => g.draw(cxt));
  }
}
