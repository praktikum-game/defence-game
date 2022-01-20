import { resources } from '../GameResourses';
import { SyringeBullet } from '../Bullets/SyringeBullet';
import { Defender } from './Defender';
import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from 'game/consts';

export class NurseDefender extends Defender {
  public static bullet = SyringeBullet;

  public static imageUrl = resources.defenders.nurse.image;

  public static iconUrl = resources.defenders.nurse.icon;

  public static cost = 100;

  constructor(x: number, y: number) {
    super({
      bullet: NurseDefender.bullet,
      x,
      y,
      width: FIELD_CELL_WIDTH,
      height: FIELD_CELL_HEIGHT,
      imageUrl: NurseDefender.imageUrl,
      health: 100,
      damage: 9,
      fireFrameInterval: 120,
      cost: NurseDefender.cost,
    });
  }
}
