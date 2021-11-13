import { BaseBullet } from './BaseBullet';
import { BaseDefender } from './BaseDefender';
import { BaseEnemy } from './BaseEnemy';
import { BaseGameObject } from './BaseGameObject';
import { GameField } from './GameField';
import { getRandomInt } from './helpers';

class Game {
  private _canvasElement: HTMLCanvasElement;

  private _ctx: CanvasRenderingContext2D;

  private _last: number;

  private _isRunning: boolean;

  private _enemies: Array<BaseEnemy> = [];

  private _defenders: Array<BaseDefender> = [];

  private _gameField: GameField;

  private _onLoose: Function;

  private _onWin: Function;

  public get enemies() {
    return this._enemies;
  }

  public get defenders() {
    return this._defenders;
  }

  constructor(canvasEl: HTMLCanvasElement, onLose: Function, onWin: Function) {
    this._last = 0;
    this._isRunning = false;

    GameField.gameFieldWidth = canvasEl.width;
    GameField.gameFieldHeight = canvasEl.height;

    this._canvasElement = canvasEl;

    this._onLoose = onLose;
    this._onWin = onWin;

    this._canvasElement.addEventListener('click', ({ offsetX, offsetY }: MouseEvent) =>
      this.manualAddDefender(offsetX, offsetY),
    );

    this._ctx = this._canvasElement.getContext('2d')!;

    this._gameField = new GameField(GameField.gameFieldWidth, GameField.gameFieldHeight);

    this._gameField.draw(this._ctx);
  }

  public run() {
    this._last = performance.now();
    for (let i = 0; i < 10; i += 1) {
      const enemy = new BaseEnemy(1000, getRandomInt(1, 5) * 100);
      this._enemies.push(enemy);
      enemy.draw(this._ctx);
    }
    this._defenders.forEach((d) => {
      d.isFire = true;
    });

    this._isRunning = true;
    this.animation(performance.now());
  }

  // private stop() {}

  private manualAddDefender(x: number, y: number) {
    this._gameField.gameGrid.forEach((cell) => {
      // определяем, входят ли координаты клика в периметр текущей ячейки
      if (cell.x < x && cell.x + cell.width > x && cell.y < y && cell.y + cell.width > y) {
        const elementsInThisCell = this._defenders.filter((d) => d.x === cell.x && d.y === cell.y);
        // если кликнули по ячейке, где уже есть элемент
        if (elementsInThisCell.length > 0) {
          return;
        }
        const defender = new BaseDefender(cell.x, cell.y);
        this._defenders.push(defender);
        defender.draw(this._ctx);
      }
    });
  }

  private animation = (now: number) => {
    const delay = now - this._last;
    this._last = now;
    this.redraw(delay);
    requestAnimationFrame(this.animation);
  };

  private lose() {
    this._enemies = [];
    this._defenders = [];
    this._isRunning = false;
    this._onLoose();
  }

  private win() {
    this._enemies = [];
    this._defenders = [];
    this._gameField.draw(this._ctx);
    this._isRunning = false;
    this._onWin();
  }

  private redraw(delay: number) {
    if (!this._isRunning) return;
    if (this._enemies.length < 1) {
      this.win();
      return;
    }
    // проверяем на столкновения защитников и атакующих
    for (const enemy of this.enemies) {
      if (enemy.x < 0) {
        this.lose();
        break;
      }

      for (const defender of this.defenders) {
        if (this.checkCollision(defender, enemy)) {
          enemy.isMove = false;
          defender.getDamage(enemy.damage);

          // если кончились очки здоровья, то обновляем значения массива защитников
          if (defender.health < 0) {
            this._defenders = this.defenders.filter((d) => d.uuid !== defender.uuid);
            // запускаем движение для всех врагов по линии, когда защитник погиб
            this.enemies
              .filter((e) => e.y === defender.y)
              .forEach((e) => {
                e.isMove = true;
              });
          }
        }
      }
    }

    for (const enemy of this.enemies) {
      for (const defender of this.defenders) {
        for (const bullet of defender.bullets) {
          if (this.checkBulletCollision(bullet, enemy)) {
            enemy.setDamage(defender.damage);
            defender.bullets = defender.bullets.filter((b) => b.uuid !== bullet.uuid);
            if (enemy.health < 0) {
              this._enemies = this.enemies.filter((e) => e.uuid !== enemy.uuid);
            }
          }
        }
      }
    }

    this._ctx.clearRect(0, 0, GameField.gameFieldWidth, GameField.gameFieldHeight);
    this.enemies.forEach((enemy) => enemy.update(delay).draw(this._ctx));

    this.defenders.forEach((d) => {
      d.update(delay);
      d.draw(this._ctx);
    });

    this._gameField.draw(this._ctx);
  }

  private checkCollision(obj1: BaseGameObject, obj2: BaseGameObject): boolean {
    if (obj1.x + obj1.height >= obj2.x && obj1.y === obj2.y) {
      return true;
    }
    return false;
  }

  private checkBulletCollision(obj1: BaseBullet, obj2: BaseEnemy): boolean {
    if (
      obj1.x >= obj2.x &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y > obj2.y &&
      obj1.y < obj2.y + obj2.height
    ) {
      return true;
    }
    return false;
  }
}

export default Game;
