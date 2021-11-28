import { BluePillBullet } from '../Bullets/BluePillBullet';
import { resources } from '../GameResourses';
import { Defender } from './Defender';

export class DoctorDefender extends Defender {
  public static bullet = BluePillBullet;

  public static imageUrl = resources.defenders.doctor.image;

  public static iconUrl = resources.defenders.doctor.icon;

  constructor(x: number, y: number) {
    super(DoctorDefender.bullet, x, y, 80, 80, DoctorDefender.imageUrl, 150, 11, 140);
  }
}
