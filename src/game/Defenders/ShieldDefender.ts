import { resources } from '../GameResourses';
import { Defender } from './Defender';

export class ShieldDefender extends Defender {
  public static bullet = null;

  public static imageUrl = resources.defenders.shield.image;

  public static iconUrl = resources.defenders.shield.icon;

  public static cost = 50;

  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 80,
      height: 80,
      imageUrl: ShieldDefender.imageUrl,
      health: 640,
      damage: 0,
      cost: ShieldDefender.cost,
    });
  }
}
