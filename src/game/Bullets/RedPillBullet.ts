import { resources } from '../GameResourses';
import { Bullet } from './Bullet';

export class RedPillBullet extends Bullet {
  constructor(x: number, y: number) {
    super({ speed: 0.5, x, y, width: 25, height: 25, imageUrl: resources.bullets.redpill.image });
  }
}
