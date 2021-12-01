import { BaseGameObject } from './BaseGameObject';
import { GameField } from './Grids/GameField';
import { getRandomInt, getUrls } from './helpers';
import { GameResources } from './GameResourses';
import { AtackTimingType, EndGameCallback, LevelIndextype } from './types';
import { DefendersPannel } from './DefendersPannel/index';
import {
  BANKOMAT_CURRENCY,
  CURRENCY_RISE_INTERVAL,
  CURRENCY_RISE_VALUE,
  CURRENCY_START_VALUE,
  FIELD_CELL_HEIGHT,
  FIELD_CELL_WIDTH,
  FIELD_COLS,
  FIELD_ROWS,
  TOPPANNEL_CELL_COUNT,
  TOPPANNEL_CELL_HEIGHT,
  TOPPANNEL_CELL_WIDTH,
  TOPPANNEL_ROWS_COUNT,
} from './consts';
import { resources } from './GameResourses/resources';
import { TopPannel } from './Grids/TopPannel';
import { Defender } from './Defenders/Defender';
import { Constructable } from './interfaces';
import { levels } from './Levels';
import { Enemy } from './Enemies/Enemy';
import { GameCurrency } from './GameCurrency';
import { BankomatDefender } from './Defenders/BankomatDefender';
import { Bullet } from './Bullets/Bullet';

export class Game {
  private _gameLevel: number = 1;

  private _canvasElement: HTMLCanvasElement;

  private _currency: GameCurrency;

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
    this._currency = new GameCurrency(0, CURRENCY_RISE_VALUE, CURRENCY_RISE_INTERVAL);

    this._defendersPannel = new DefendersPannel();
    this._defendersPannel.init();

    TopPannel.pannelWidth = TOPPANNEL_CELL_WIDTH * TOPPANNEL_CELL_COUNT;
    TopPannel.pannelHeight = TOPPANNEL_CELL_HEIGHT * TOPPANNEL_ROWS_COUNT;
    TopPannel.pannelX = DefendersPannel.pannelWidth;
    TopPannel.pannelY = 0;

    GameField.gameFieldWidth = FIELD_CELL_WIDTH * FIELD_COLS;
    GameField.gameFieldHeight = FIELD_CELL_HEIGHT * FIELD_ROWS;
    GameField.gameFieldX = DefendersPannel.pannelWidth;
    GameField.gameFieldY = TopPannel.pannelHeight;

    canvasEl.width = DefendersPannel.pannelWidth + GameField.gameFieldWidth - FIELD_CELL_WIDTH + 1;
    canvasEl.height = TopPannel.pannelHeight + GameField.gameFieldHeight + 1;
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
        GameField.gameFieldWidth + FIELD_CELL_WIDTH,
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
    this._timefromLastAtack = 0;
    this._nextAtackInterval = 0;
    this._atackTiming = [];

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

  public run(gameLevel: LevelIndextype = 0) {
    if (gameLevel === +1) {
      this._gameLevel += gameLevel;
    } else if (gameLevel !== 0) {
      this._gameLevel = gameLevel;
    }
    this._last = performance.now();
    this._isRunning = true;
    this._currency.reset(CURRENCY_START_VALUE);
    this._putCurrency();

    this._defendersPannel.placeSprites(this._ctx, this._gameLevel);
    this._createAtack();

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this._selectedDefender && this._currency.value >= (<any>this._selectedDefender).cost) {
          const defender = new this._selectedDefender(cell.x, cell.y);
          this._defenders.push(defender);
          defender.draw(this._ctx);
          this._spentMoney(defender.cost);
        }
      }
    });
  }

  private _putCurrency = () => {
    this._topPannel.pannelGrid[0].clear(this._ctx);
    this._topPannel.pannelGrid[0].draw(
      this._ctx,
      this._currency.value.toString(),
      GameResources.get(resources.toppannel.money.icon),
    );
  };

  private _spentMoney = (value: number) => {
    this._currency.value -= value;
    this._putCurrency();
  };

  private _getMoney = (value: number) => {
    this._currency.value += value;
    this._putCurrency();
  };

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

  private _checkActiveDefenders(currency: number) {
    this._defendersPannel.grid?.pannelGrid.forEach((cell) => {
      if (cell.sprite && cell.sprite.type) {
        const { type: defender } = cell.sprite;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const defenderCost = (<any>defender).cost;
        if (currency >= defenderCost) {
          cell.sprite.isActive = true;
        } else {
          cell.sprite.isActive = false;
        }
        cell.sprite.redraw();
      }
    });
  }

  private redraw(delay: number) {
    if (!this._isRunning) return;

    this._checkNextAtack(delay);
    if (this._currency.autoRise(delay)) {
      this._putCurrency();
    }
    this._checkActiveDefenders(this._currency.value);

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
          if (enemy.isAtack(delay)) {
            defender.getDamage(enemy.damage);
          }

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
      if (d instanceof BankomatDefender) {
        if (d.isGetMoney(delay)) {
          this._getMoney(BANKOMAT_CURRENCY);
        }
      } else {
        d.update(delay);
      }
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

  private checkBulletCollision(bullet: Bullet, enemy: Enemy): boolean {
    if (
      bullet.x + bullet.width > enemy.x &&
      bullet.y >= enemy.y &&
      bullet.y <= enemy.y + enemy.height
    ) {
      return true;
    }
    return false;
  }
}
