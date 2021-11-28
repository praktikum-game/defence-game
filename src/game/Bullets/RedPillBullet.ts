import { resources } from '../GameResourses';
import { Bullet } from './Bullet';

export class RedPillBullet extends Bullet {
  constructor(x: number, y: number) {
    super(0.5, x, y, 25, 25, resources.bullets.redpill.image);
  }
}
