import { BluePillBullet } from '../Bullets/BluePillBullet';
import { resources } from '../GameResourses';
import { Defender } from './Defender';

export class DoctorDefender extends Defender {
  public static bullet = BluePillBullet;

  public static imageUrl = resources.defenders.doctor.image;

  public static iconUrl = resources.defenders.doctor.icon;

  constructor(x: number, y: number) {
    super({
      bullet: DoctorDefender.bullet,
      x,
      y,
      width: 80,
      height: 80,
      imageUrl: DoctorDefender.imageUrl,
      health: 150,
      damage: 11,
      fireFrameInterval: 140,
    });
  }
}
