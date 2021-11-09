import { BaseBullet } from './BaseBullet';
import { BaseDefender } from './BaseDefender';
import { BaseEnemy } from './BaseEnemy';
import { BaseGameObject } from './BaseGameObject';
import { GameField } from './GameField';

class Game {
  private ctx: CanvasRenderingContext2D;

  private last: number;

  private _enemies: Array<BaseEnemy> = [];

  private _defenders: Array<BaseDefender> = [];

  private _gameField: GameField;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
    this.last = performance.now();
    this._gameField = new GameField();
    this._gameField.makeField();

    for (let i = 0; i < 3; i += 1) {
      this._enemies.push(new BaseEnemy());
    }

    for (let i = 0; i < 5; i += 1) {
      this._defenders.push(new BaseDefender());
    }
  }

  public get enemies() {
    return this._enemies;
  }

  public get defenders() {
    return this._defenders;
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
    for (const enemy of this.enemies) {
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
            console.log('bullet collision');
            enemy.setDamage(defender.damage);
            defender.bullets = defender.bullets.filter((b) => b.uuid !== bullet.uuid);
            if (enemy.health < 0) {
              this._enemies = this.enemies.filter((e) => e.uuid !== enemy.uuid);
            }
          }
        }
      }
    }

    this.ctx.clearRect(0, 0, 1200, 500);
    this.enemies.forEach((enemy) => enemy.update(delay).draw(this.ctx));

    this.defenders.forEach((d) => {
      d.update(delay);
      d.draw(this.ctx);
    });

    this._gameField.draw(this.ctx);
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
