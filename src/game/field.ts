interface Drawable {
  draw: (context: CanvasRenderingContext2D) => void;
}

interface Updateable {
  update: (delay: number) => void;
}

class BaseGameObject {
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  protected x: number;

  protected y: number;

  protected width: number;

  protected height: number;
}

export class FieldGridItem extends BaseGameObject implements Drawable, Updateable {
  constructor(x: number, y: number) {
    super(x, y, 100, 100);
  }

  update(delay: number) {}

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'blue';

    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export class GameField implements Drawable, Updateable {
  gameGrid: Array<FieldGridItem>;

  constructor() {
    this.gameGrid = [];
  }

  makeField() {
    for (let y = 0; y < 500; y += 100) {
      for (let x = 0; x < 1200; x += 100) {
        this.gameGrid.push(new FieldGridItem(x, y));
      }
    }
    return this;
  }

  draw(cxt: CanvasRenderingContext2D) {
    this.gameGrid.forEach((g) => g.draw(cxt));
  }

  update() {}
}

export class BaseEnemy implements Drawable, Updateable {
  private directionMove: number;

  private x: number;

  private y: number;

  private width: number;

  private height: number;

  private speed: number;

  constructor() {
    this.x = 1200;
    this.y = Math.random() * 400;
    this.height = 99;
    this.width = 99;
    this.speed = Math.random() - 0.2;
    this.directionMove = -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, this.height, this.width);
  }

  update(delay: number) {
    const dx = this.speed * delay * this.directionMove;
    if (this.x < 1) {
      this.x = 1200;
    } else {
      this.x += dx;
    }
    return this;
  }
}

export class Defender extends BaseGameObject {
  constructor() {
    super(0, Math.random() * 400, 100, 100);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.restore();
  }

  update() {}
}
