import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from '../consts';
import { FieldGridItem } from './FieldGridItem';
import { Drawable } from '../interfaces';

export class GameField implements Drawable {
  public static gameFieldWidth = 0;

  public static gameFieldHeight = 0;

  public static gameFieldX = 0;

  public static gameFieldY = 0;

  private _gameGrid: Array<FieldGridItem>;

  public get gameGrid() {
    return this._gameGrid;
  }

  constructor(
    gameFieldWidth: number,
    gameFieldHeight: number,
    gameFieldX: number,
    gameFieldY: number,
  ) {
    this._gameGrid = [];
    for (let y = gameFieldY; y < gameFieldHeight; y += FIELD_CELL_HEIGHT) {
      for (let x = gameFieldX; x < gameFieldWidth; x += FIELD_CELL_WIDTH) {
        this._gameGrid.push(new FieldGridItem(x, y));
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.gameGrid.forEach((g) => g.draw(cxt));
  }
}
