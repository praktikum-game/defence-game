import { resources } from '../resources';
import { Enemy } from './Enemy';

export class CoronaEnemy extends Enemy {
  constructor(x: number, y: number) {
    super(x, y, resources.enemies.base.image, 0.01, 8, 70);
  }
}
