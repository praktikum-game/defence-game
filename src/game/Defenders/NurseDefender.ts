import { resources } from '../GameResourses';
import { SyringeBullet } from '../Bullets/SyringeBullet';
import { Defender } from './Defender';

export class NurseDefender extends Defender {
  public static bullet = SyringeBullet;

  public static imageUrl = resources.defenders.nurse.image;

  public static iconUrl = resources.defenders.nurse.icon;

  public static cost = 25;

  constructor(x: number, y: number) {
    super({
      bullet: NurseDefender.bullet,
      x,
      y,
      width: 80,
      height: 80,
      imageUrl: NurseDefender.imageUrl,
      health: 100,
      damage: 9,
      fireFrameInterval: 120,
      cost: NurseDefender.cost,
    });
  }
}
