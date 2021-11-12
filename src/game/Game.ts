import { BaseDefender } from './BaseDefender';
import { BaseEnemy } from './BaseEnemy';
import { BaseGameObject } from './BaseGameObject';
import { GameField } from './GameField';

class Game {
  private canvasElement: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private last: number;

  private enemiesArray: Array<BaseEnemy> = [];

  private defenderArray: Array<BaseDefender> = [];

  private gameField: GameField;

  constructor(canvasEl: any) {
    this.canvasElement = canvasEl;

    this.canvasElement.addEventListener('click', ({ offsetX, offsetY }: MouseEvent) =>
      this.manualAddDefender(offsetX, offsetY),
    );

    this.ctx = this.canvasElement.getContext('2d')!;

    this.last = performance.now();
    this.gameField = new GameField(1200, 500);

    for (let i = 0; i < 10; i += 1) {
      this.enemiesArray.push(new BaseEnemy());
    }

    this.gameField.draw(this.ctx);
  }

  public run() {
    this.animation(performance.now());
  }

  private manualAddDefender(x: number, y: number) {
    this.gameField.gameGrid.forEach((cell) => {
      // определяем, входят ли координаты клика в периметр текущей ячейки
      if (cell.x < x && cell.x + cell.width > x && cell.y < y && cell.y + cell.width > y) {
        const elementsInThisCell = this.defenderArray.filter(
          (d) => d.x === cell.x && d.y === cell.y,
        );
        // если кликнули по ячейке, где уже есть элемент
        if (elementsInThisCell.length > 0) {
          return;
        }
        const defender = new BaseDefender(cell.x, cell.y);
        this.defenderArray.push(defender);
        defender.draw(this.ctx);
      }
    });
  }

  private animation = (now: number) => {
    const delay = now - this.last;
    this.last = now;
    this.redraw(delay);
    requestAnimationFrame(this.animation);
  };

  private redraw(delay: number) {
    // проверяем на столкновения защитников и атакующих
    for (const enemy of this.enemiesArray) {
      for (const defender of this.defenderArray) {
        if (this.checkCollision(defender, enemy)) {
          enemy.IsMove = false;
          defender.getDamage(enemy.Damage);

          // если кончились очки здоровья, то обновляем значения массива защитников
          if (defender.Health < 0) {
            this.defenderArray = this.defenderArray.filter((d) => d.uuid !== defender.uuid);
            console.log('this.defenceArray', this.defenderArray);
            enemy.IsMove = true;
          }
        }
      }
    }
    this.ctx.clearRect(0, 0, 1200, 500);
    this.enemiesArray.forEach((e) => {
      e.update(delay).draw(this.ctx);
    });
    this.defenderArray.forEach((d) => {
      d.update(delay);
      d.draw(this.ctx);
    });
    this.gameField.draw(this.ctx);
  }

  private checkCollision(obj1: BaseGameObject, obj2: BaseGameObject): boolean {
    if (obj1.x + obj1.height >= obj2.x && obj1.y === obj2.y) {
      return true;
    }
    return false;
  }
}

export default Game;
