import { GameField, BaseEnemy, Defender } from './field';

class Game {
  private ctx: CanvasRenderingContext2D;

  private last: number;

  private enemiesArray: Array<BaseEnemy> = [];

  private defenderArray: Array<Defender> = [];

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
      this.defenderArray.push(new Defender());
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
    this.ctx.clearRect(0, 0, 1200, 500);
    this.enemiesArray.forEach((e) => e.update(delay).draw(this.ctx));
    this.defenderArray.forEach((d) => d.draw(this.ctx));
    if (this.gameField) {
      this.gameField.draw(this.ctx);
    }
  }
}

export default Game;
