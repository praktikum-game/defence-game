import { SyringeBullet } from './Bullets/SyringeBullet';
import { BaseGameObject } from './BaseGameObject';
import { GameField } from './Grids/GameField';
import { getRandomInt, getUrls } from './helpers';
import GameResources from './GameResources';
import { EndGameCallback } from './types';
import { DefendersPannel } from './DefendersPannel/index';
import {
  FIELD_CELL_HEIGHT,
  FIELD_CELL_WIDTH,
  FIELD_COLS,
  FIELD_ROWS,
  TOPPANNEL_CELL_COUNT,
  TOPPANNEL_CELL_HEIGHT,
  TOPPANNEL_CELL_WIDTH,
  TOPPANNEL_ROWS_COUNT,
} from './consts';
import { resources } from './resources';
import { TopPannel } from './Grids/TopPannel';
import { CoronaEnemy } from './Enemies/CoronaEnemy';
import { Defender } from './Defenders/Defender';
import { Constructable } from './interfaces';
import { levels, AtackTimingType } from './Levels';
import { Enemy } from './Enemies/Enemy';

export class Game {
  private _gameLevel: number = 0;

  private _canvasElement: HTMLCanvasElement;

  private _ctx: CanvasRenderingContext2D;

  private _last: number;

  private _isRunning: boolean;

  private _selectedDefender: Constructable<Defender> | null = null;

  private _enemies: Array<Enemy> = [];

  private _defenders: Array<Defender> = [];

  private _gameField: GameField;

  private _defendersPannel: DefendersPannel;

  private _topPannel: TopPannel;

  private _timefromLastAtack: number = 0;

  private _atackTiming: AtackTimingType[] = [];

  private _nextAtackInterval: number = 0;

  private _onGameEnd: EndGameCallback;

  public get enemies() {
    return this._enemies;
  }

  public get defenders() {
    return this._defenders;
  }

  public get selectedDefender() {
    return this._selectedDefender;
  }

  constructor(canvasEl: HTMLCanvasElement, onGameEnd: EndGameCallback) {
    this._last = 0;
    this._isRunning = false;

    this._defendersPannel = new DefendersPannel();
    this._defendersPannel.init();

    TopPannel.pannelWidth = TOPPANNEL_CELL_WIDTH * TOPPANNEL_CELL_COUNT;
    TopPannel.pannelHeight = TOPPANNEL_CELL_HEIGHT * TOPPANNEL_ROWS_COUNT;
    TopPannel.pannelX = DefendersPannel.pannelWidth + 1;
    TopPannel.pannelY = 0;

    GameField.gameFieldWidth = FIELD_CELL_WIDTH * FIELD_COLS;
    GameField.gameFieldHeight = FIELD_CELL_HEIGHT * FIELD_ROWS;
    GameField.gameFieldX = DefendersPannel.pannelWidth + 1;
    GameField.gameFieldY = TopPannel.pannelHeight + 1;

    canvasEl.width = DefendersPannel.pannelWidth + GameField.gameFieldWidth;
    canvasEl.height = TopPannel.pannelHeight + 1 + GameField.gameFieldHeight;
    this._canvasElement = canvasEl;

    this._onGameEnd = onGameEnd;
    GameResources.load(getUrls(resources) as string[]);

    this._canvasElement.addEventListener('click', ({ offsetX, offsetY }: MouseEvent) =>
      this._handleClick(offsetX, offsetY),
    );

    this._ctx = this._canvasElement.getContext('2d')!;

    this._topPannel = new TopPannel(
      TopPannel.pannelWidth,
      TopPannel.pannelHeight,
      TopPannel.pannelX,
      TopPannel.pannelY,
    );

    this._topPannel.draw(this._ctx);

    this._defendersPannel.draw(this._ctx);

    this._gameField = new GameField(
      GameField.gameFieldWidth,
      GameField.gameFieldHeight,
      GameField.gameFieldX,
      GameField.gameFieldY,
    );

    this._gameField.draw(this._ctx);
  }

  private _createEnemies = (items: Constructable<Enemy>[], coordsY: number[]) => {
    const result: Enemy[] = [];

    items.forEach((item) => {
      const enemy = new (item as Constructable<Enemy>)(
        getRandomInt(GameField.gameFieldWidth, GameField.gameFieldWidth + FIELD_CELL_WIDTH),
        coordsY[getRandomInt(0, 5)],
      );
      result.push(enemy);
      this._enemies.push(enemy);
      enemy.draw(this._ctx);
    });

    return result;
  };

  private _generateEnemiesYCoords = () => {
    const result = [];

    for (
      let i = GameField.gameFieldY;
      i < GameField.gameFieldHeight + TopPannel.pannelHeight;
      i += FIELD_CELL_HEIGHT
    ) {
      result.push(i);
    }

    return result;
  };

  private _updateAtackInterval = () => {
    this._nextAtackInterval = this._atackTiming[0]?.timeout;
  };

  private _createAtack = () => {
    const levelAtackTiming = levels.getLevelAtack(this._gameLevel)!;

    const enemyY = this._generateEnemiesYCoords();

    levelAtackTiming?.forEach((atack) => {
      const enemies = this._createEnemies(atack.enemies, enemyY);
      this._atackTiming.push({
        timeout: atack.timeout * 1000,
        enemies,
      });
    });
    this._updateAtackInterval();
  };

  public run() {
    this._gameLevel = 1;
    this._defendersPannel.place(this._ctx, this._gameLevel);

    // this._selectedDefender = DoctorDefender;
    this._last = performance.now();

    this._createAtack();

    this._defenders.forEach((d) => {
      d.isFire = true;
    });

    this._isRunning = true;
    this.animation(performance.now());
  }

  private _handleClick = (x: number, y: number) => {
    const area = this._checkArea(x, y);

    switch (area) {
      case 'GameField':
        this._addDefender(x, y);
        break;

      case 'DefendersPannel':
        this._selectedDefender = this._defendersPannel.onClick(x, y)!;
        console.log(this._defendersPannel.onClick(x, y));
        break;

      case 'TopPannel':
        break;

      default:
        break;
    }
  };

  private _checkArea = (x: number, y: number) => {
    if (
      x > DefendersPannel.pannelX &&
      x < DefendersPannel.pannelX + DefendersPannel.pannelWidth &&
      y > DefendersPannel.pannelY &&
      y < DefendersPannel.pannelY + DefendersPannel.pannelHeight
    ) {
      return 'DefendersPannel';
    }
    if (
      x > TopPannel.pannelX &&
      x < TopPannel.pannelX + TopPannel.pannelWidth &&
      y > TopPannel.pannelY &&
      y < TopPannel.pannelY + TopPannel.pannelHeight
    ) {
      return 'TopPannel';
    }
    if (
      x > GameField.gameFieldX &&
      x < GameField.gameFieldX + GameField.gameFieldWidth &&
      y > GameField.gameFieldY &&
      y < GameField.gameFieldY + GameField.gameFieldHeight
    ) {
      return 'GameField';
    }
    return null;
  };

  private _addDefender(x: number, y: number) {
    this._gameField.gameGrid.forEach((cell) => {
      // определяем, входят ли координаты клика в периметр текущей ячейки
      if (cell.x < x && cell.x + cell.width > x && cell.y < y && cell.y + cell.width > y) {
        const elementsInThisCell = this._defenders.filter((d) => d.x === cell.x && d.y === cell.y);
        // если кликнули по ячейке, где уже есть элемент
        if (elementsInThisCell.length > 0) {
          return;
        }
        if (this._selectedDefender) {
          const defender = new this._selectedDefender(cell.x, cell.y);
          this._defenders.push(defender);
          defender.draw(this._ctx);
        }
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
    this._onGameEnd('lose');
  }

  private win() {
    this._enemies = [];
    this._defenders = [];
    this._defendersPannel!.draw(this._ctx);
    this._gameField.draw(this._ctx);
    this._isRunning = false;
    this._onGameEnd('win');
  }

  private _checkNextAtack = (delay: number) => {
    this._timefromLastAtack += delay;
    if (this._timefromLastAtack >= this._nextAtackInterval) {
      this._startAtack();
      this._timefromLastAtack = 0;
      this._updateAtackInterval();
    }
  };

  private _startAtack = () => {
    const atackSсheme = this._atackTiming.shift();
    atackSсheme?.enemies.forEach((enemy) => {
      enemy.isMove = true;
    });
  };

  private redraw(delay: number) {
    if (!this._isRunning) return;

    this._checkNextAtack(delay);

    if (this._enemies.length < 1) {
      this.win();
      return;
    }
    // проверяем на столкновения защитников и атакующих
    for (const enemy of this.enemies) {
      if (enemy.x < GameField.gameFieldX) {
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

    this._ctx.clearRect(
      GameField.gameFieldX,
      GameField.gameFieldY,
      GameField.gameFieldWidth,
      GameField.gameFieldHeight,
    );
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

  private checkBulletCollision(obj1: SyringeBullet, obj2: CoronaEnemy): boolean {
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
