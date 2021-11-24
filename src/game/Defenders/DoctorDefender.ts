import { BluePillBullet } from '../Bullets/BluePillBullet';
import { resources } from '../resources';
import { Defender } from './Defender';

export class DoctorDefender extends Defender {
  public static bullet = BluePillBullet;

  constructor(x: number, y: number) {
    super(
      DoctorDefender.bullet,
      x,
      y,
      80,
      80,
      resources.defenders.doctor.image,
      resources.defenders.doctor.icon,
      150,
      11,
      140,
    );
  }
}
