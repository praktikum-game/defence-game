import { FieldGridItem } from './FieldGridItem';
import { Drawable, Updateable } from './interfaces';

export class GameField implements Drawable, Updateable {
  gameGrid: Array<FieldGridItem>;

  constructor() {
    this.gameGrid = [];
  }

  makeField() {
    for (let y = 0; y < 500; y += 100) {
      for (let x = 0; x < 1200; x += 100) {
        this.gameGrid.push(new FieldGridItem(x, y));
      }
    }
    return this;
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.gameGrid.forEach((g) => g.draw(cxt));
  }

  update() {}
}
