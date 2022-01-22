import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from '../consts';
import { FieldGridItem } from './FieldGridItem';
import { Drawable } from '../interfaces';
import { BaseGameObject } from 'game/BaseGameObject/BaseGameObject';
import { BaseGameObjectProps } from 'game/BaseGameObject/types';

export class GameField extends BaseGameObject implements Drawable {
  private _gameGrid: Array<FieldGridItem> = [];

  public get gameGrid() {
    return this._gameGrid;
  }

  constructor(baseProps: BaseGameObjectProps) {
    super(baseProps);

    for (let y = this._y; y < this._height; y += FIELD_CELL_HEIGHT) {
      for (let x = this._x; x < this._width; x += FIELD_CELL_WIDTH) {
        this._gameGrid.push(
          new FieldGridItem({
            ctx: this._ctx,
            x,
            y,
            width: FIELD_CELL_WIDTH,
            height: FIELD_CELL_HEIGHT,
          }),
        );
      }
    }
  }

  draw() {
    this.gameGrid.forEach((cell) => cell.draw());
  }
}
