import { BaseGameObject } from 'game/BaseGameObject';
import { DEFPANNEL_CELL_HEIGHT, DEFPANNEL_CELL_WIDTH } from '../consts';
import { Drawable } from '../interfaces';
import { GridItem } from './GridItem';
import { GridInitType } from './types';

export class Grid extends BaseGameObject implements Drawable {
  private _gridItems: Array<GridItem>;

  public get gridItems() {
    return this._gridItems;
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
    super(gridX, gridY, gridWidth, gridHeight);
    this._gridItems = [];

    for (let cellY = gridY; cellY < gridHeight; cellY += DEFPANNEL_CELL_HEIGHT) {
      for (let cellX = gridX; cellX < gridWidth; cellX += DEFPANNEL_CELL_WIDTH) {
        this.gridItems.push(
          new GridItem(cellX, cellY, cellWidth, cellHeight, cellBorderColor, cellBgColor),
        );
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.gridItems.forEach((g) => g.draw(cxt));
  }
}
