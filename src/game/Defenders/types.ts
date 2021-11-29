import { Bullet } from '../Bullets/Bullet';
import { Constructable } from '../interfaces';

export type DefenderInitType = {
  bullet: Constructable<Bullet>;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl: string;
  health?: number;
  damage?: number;
  fireFrameInterval?: number;
};
