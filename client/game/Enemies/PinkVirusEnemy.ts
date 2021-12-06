import { resources } from '../GameResourses';
import { Enemy } from './Enemy';

export class PinkVirusEnemy extends Enemy {
  constructor(x: number, y: number) {
    super({
      imageUrl: resources.enemies.pinkvirus.image,
      x,
      y,
      speed: 0.01,
      damage: 15,
      health: 110,
    });
  }
}
