import { FieldGridItem } from './FieldGridItem';
import { Drawable, Updateable } from './interfaces';

export class GameField implements Drawable, Updateable {
  public static gameFieldWidth = 0;
  
  public static gameFieldHeight = 0;

  private _gameGrid: Array<FieldGridItem>;

  public get gameGrid() {
    return this._gameGrid;
  }

  constructor(gameFieldWidth: number, gameFieldHeight: number) {
    this._gameGrid = [];
    for (let y = 0; y < gameFieldHeight; y += 100) {
      for (let x = 0; x < gameFieldWidth; x += 100) {
        this._gameGrid.push(new FieldGridItem(x, y));
      }
    }
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.gameGrid.forEach((g) => g.draw(cxt));
  }

  update() {}
}
