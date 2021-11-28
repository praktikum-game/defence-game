import { resources } from '../resources';
import { Bullet } from './Bullet';

export class BluePillBullet extends Bullet {
  constructor(x: number, y: number) {
    super(0.2, x, y, 45, 16, resources.bullets.bluepill.image);
  }
}
