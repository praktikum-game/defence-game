import { resources } from '../GameResourses';
import { Bullet } from './Bullet';

export class SyringeBullet extends Bullet {
  constructor(x: number, y: number) {
    super(0.2, x, y, 88, 14, resources.bullets.syringe.image);
  }
}
