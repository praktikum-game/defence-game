import { BaseGameObject } from 'game/BaseGameObject/BaseGameObject';
import { BaseGameObjectProps } from 'game/BaseGameObject/types';
import { Defender } from 'game/Defenders/Defender';
import { Constructable, Drawable } from '../interfaces';
import { GridItem } from './GridItem';

export class Grid extends BaseGameObject implements Drawable {
  private _gridCells: Array<GridItem> = [];

  public get gridCells() {
    return this._gridCells;
  }

  constructor(
    baseProps: BaseGameObjectProps,
    //   cellWidth,
    //   cellHeight,
    //   cellBorderColor,
    //   cellBgColor,
    // : GridInitType,
    defenders: Constructable<Defender>[],
  ) {
    super(baseProps);
    this._gridCells = this.generateCells(defenders);
  }

  generateCells(defenders: Constructable<Defender>[]) {
    const cells = [];
    let cellX = this.x;
    let cellY = this.y;
    for (const defender of defenders) {
      cells.push(
        new GridItem(
          { ctx: this._ctx, x: cellX, y: cellY, width: 90, height: 60 },
          defender,
          'white',
          'yellow',
        ),
      );
      cellY += 60;
    }
    return cells;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    this._gridCells.forEach((g) => g.draw(ctx));
  }

  public onClick(ctx: CanvasRenderingContext2D, x: number, y: number) {
    let result = null;

    // this._gridCells.forEach((cell) => {
    //   // определяем, входят ли координаты клика в периметр текущей ячейки
    //   if (cell.x < x && cell.x + cell.width > x && cell.y < y && cell.y + cell.height > y) {
    //     if (cell.sprite && cell.sprite.isActive) result = cell.sprite.onClick();
    //   } else if (cell.sprite) {
    //     cell.setSelected(false);
    //     cell.draw(ctx)
    //   }
    // });

    return result;
  }
}
