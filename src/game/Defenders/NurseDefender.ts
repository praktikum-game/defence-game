import { resources } from '../resources';
import { SyringeBullet } from '../Bullets/SyringeBullet';
import { Defender } from './Defender';

export class NurseDefender extends Defender {
  public static bullet = SyringeBullet;

  constructor(x: number, y: number) {
    super(
      NurseDefender.bullet,
      x,
      y,
      80,
      80,
      resources.defenders.nurse.image,
      resources.defenders.nurse.icon,
      1000,
      500,
      1000,
    );
  }
}
