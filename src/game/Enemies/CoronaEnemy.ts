import { resources } from '../GameResourses';
import { Enemy } from './Enemy';

export class CoronaEnemy extends Enemy {
  constructor(x: number, y: number) {
    super({
      imageUrl: resources.enemies.base.image,
      x,
      y,
      speed: 0.01,
      damage: 8,
      health: 70,
    });
  }
}
