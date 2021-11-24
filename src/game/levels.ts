import { Bullet } from './Bullets/Bullet';
import { Defender } from './Defenders/Defender';
import { DoctorDefender } from './Defenders/DoctorDefender';
import { NurseDefender } from './Defenders/NurseDefender';
import { CoronaEnemy } from './Enemies/CoronaEnemy';
import { Enemy } from './Enemies/Enemy';
import { GreenVirusEnemy } from './Enemies/GreenVirusEnemy';
import { Constructable } from './interfaces';

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
class Levels {
  private _settings: LevelsType = {
    1: {
      defenders: [NurseDefender, DoctorDefender],
      enemies: [CoronaEnemy, GreenVirusEnemy],
      bullets: [NurseDefender.bullet, DoctorDefender.bullet],
      atack: [
        {
          timeout: 10,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 7,
          enemies: [CoronaEnemy, CoronaEnemy],
        },
        {
          timeout: 8,
          enemies: [CoronaEnemy, GreenVirusEnemy],
        },
        {
          timeout: 15,
          enemies: [GreenVirusEnemy, GreenVirusEnemy, CoronaEnemy, CoronaEnemy, CoronaEnemy],
        },
      ],
    },
  };

  public getLevel = (num: number) => this._settings[num];

  public getLevelAtack = (num: number) => this._settings[num].atack;

  public getEnemiesCount = (num: number) => {
    const { atack } = this._settings[num];
    return atack?.reduce((acc, item) => acc + item.enemies.length, 0);
  };
}

export default new Levels();
