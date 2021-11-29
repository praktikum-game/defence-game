import { resources } from '../GameResourses';
import { Enemy } from './Enemy';

export class GreenVirusEnemy extends Enemy {
  constructor(x: number, y: number) {
    super({
      imageUrl: resources.enemies.greenvirus.image,
      x,
      y,
      speed: 0.01,
      damage: 10,
      health: 90,
    });
  }
}
