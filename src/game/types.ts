import { Bullet } from './Bullets/Bullet';
import { Defender } from './Defenders/Defender';
import { Enemy } from './Enemies/Enemy';
import { Constructable } from './interfaces';

export type EndGameStatus = 'win' | 'lose';
export type EndGameCallback = (typeEnd: EndGameStatus, score: number) => void;

export type AtackTimingType = {
  timeout: number;
  enemies: Enemy[];
};

export type AtackSchemeType = {
  timeout: number;
  enemies: Constructable<Enemy>[];
};

export type LevelsType = {
  [key: number]: {
    defenders: Constructable<Defender>[];
    enemies: Constructable<Enemy>[];
    bullets: Constructable<Bullet>[];
    atack?: AtackSchemeType[];
  };
};

/** 0 - (текущий уровень) | +1 (следующий уровень) | номер уровня */
export type LevelIndextype = number;
