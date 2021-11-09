import { BaseDefender } from './BaseDefender';
import { BaseEnemy } from './BaseEnemy';
import { BaseGameObject } from './BaseGameObject';
import { GameField } from './GameField';

class Game {
  private ctx: CanvasRenderingContext2D;

  private last: number;

  private enemiesArray: Array<BaseEnemy> = [];

  private defenderArray: Array<BaseDefender> = [];

  private gameField: GameField;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
    this.last = performance.now();
    this.gameField = new GameField();
    this.gameField.makeField();

    for (let i = 0; i < 20; i += 1) {
      this.enemiesArray.push(new BaseEnemy());
    }

    for (let i = 0; i < 5; i += 1) {
      this.defenderArray.push(new BaseDefender());
    }
  }

  public run() {
    this.animation(performance.now());
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
          enemy.isMove = false;
          defender.getDamage(enemy.damage);

          // если кончились очки здоровья, то обновляем значения массива защитников
          if (defender.health < 0) {
            this.defenderArray = this.defenderArray.filter((d) => d.uuid !== defender.uuid);
            // запускаем движение для всех врагов по линии, когда защитник погиб
            this.enemiesArray
              .filter((e) => e.y === defender.y)
              .forEach((e) => {
                e.isMove = true;
              });
          }
        }
      }
    }
    this.ctx.clearRect(0, 0, 1200, 500);

    this.enemiesArray.forEach((enemy) => enemy.update(delay).draw(this.ctx));

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
