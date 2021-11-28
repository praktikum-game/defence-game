import { resources } from '../GameResourses';
import { Enemy } from './Enemy';

export class GreenVirusEnemy extends Enemy {
  constructor(x: number, y: number) {
    super(x, y, resources.enemies.greenvirus.image, 0.01, 10, 90);
  }
}
