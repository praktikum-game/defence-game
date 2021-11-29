import { resources } from '../GameResourses';
import { Bullet } from './Bullet';

export class SyringeBullet extends Bullet {
  constructor(x: number, y: number) {
    super({ speed: 0.2, x, y, width: 88, height: 14, imageUrl: resources.bullets.syringe.image });
  }
}
