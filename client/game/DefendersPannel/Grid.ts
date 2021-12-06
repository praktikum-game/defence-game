import { DEFPANNEL_CELL_HEIGHT, DEFPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';
import { GridItem } from './GridItem';
import { GridInitType } from './types';

export class Grid implements Drawable {
  private _pannelGrid: Array<GridItem>;

  public get pannelGrid() {
    return this._pannelGrid;
  }

  constructor({
    gridWidth,
    gridHeight,
    gridX,
    gridY,
    cellWidth,
    cellHeight,
    cellBorderColor,
    cellBgColor,
  }: GridInitType) {
    this._pannelGrid = [];

    for (let cellY = gridY; cellY < gridHeight; cellY += DEFPANNEL_CELL_HEIGHT) {
      for (let cellX = gridX; cellX < gridWidth; cellX += DEFPANNEL_CELL_WIDTH) {
        this._pannelGrid.push(
          new GridItem(cellX, cellY, cellWidth, cellHeight, cellBorderColor, cellBgColor),
        );
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.pannelGrid.forEach((g) => g.draw(cxt));
  }
}
