import { resources } from '../resources';
import { SyringeBullet } from '../Bullets/SyringeBullet';
import { Defender } from './Defender';

export class NurseDefender extends Defender {
  public static bullet = SyringeBullet;

  public static imageUrl = resources.defenders.nurse.image;

  public static iconUrl = resources.defenders.nurse.icon;

  constructor(x: number, y: number) {
    super(NurseDefender.bullet, x, y, 80, 80, NurseDefender.imageUrl, 100, 9, 120);
  }
}
