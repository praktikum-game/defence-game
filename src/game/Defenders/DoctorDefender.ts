import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from 'game/consts';
import { BluePillBullet } from '../Bullets/BluePillBullet';
import { resources } from '../GameResourses';
import { Defender } from './Defender';

export class DoctorDefender extends Defender {
  public static bullet = BluePillBullet;

  public static imageUrl = resources.defenders.doctor.image;

  public static iconUrl = resources.defenders.doctor.icon;

  public static cost = 175;

  constructor(x: number, y: number) {
    super({
      bullet: DoctorDefender.bullet,
      x,
      y,
      width: FIELD_CELL_WIDTH,
      height: FIELD_CELL_HEIGHT,
      imageUrl: DoctorDefender.imageUrl,
      health: 250,
      damage: 50,
      fireFrameInterval: 140,
      cost: DoctorDefender.cost,
    });
  }
}
