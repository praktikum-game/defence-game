import { resources } from '../GameResourses';
import { Bullet } from './Bullet';

export class BluePillBullet extends Bullet {
  constructor(x: number, y: number) {
    super({ speed: 0.2, x, y, width: 45, height: 16, imageUrl: resources.bullets.bluepill.image });
  }
}
