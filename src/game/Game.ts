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

    for (let i = 0; i < 10; i += 1) {
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
          enemy.IsMove = false;
          defender.getDamage(enemy.Damage);

          // если кончились очки здоровья, то обновляем значения массива защитников
          if (defender.Health < 0) {
            this.defenderArray = this.defenderArray.filter((d) => d.Uuid !== defender.Uuid);
            enemy.IsMove = true;
          }
        } else {
          enemy.IsMove = true;
        }
      }
    }
    this.ctx.clearRect(0, 0, 1200, 500);
    this.enemiesArray.forEach((e) => {
      e.update(delay).draw(this.ctx);
    });
    this.defenderArray.forEach((d) => d.draw(this.ctx));
    this.gameField.draw(this.ctx);
  }

  private checkCollision(obj1: BaseGameObject, obj2: BaseGameObject): boolean {
    if (obj1.X + obj1.Height > obj2.X && obj1.Y === obj2.Y) {
      return true;
    }
    return false;
  }
}

export default Game;
