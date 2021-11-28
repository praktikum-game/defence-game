import { DoctorDefender } from './Defenders/DoctorDefender';
import { NurseDefender } from './Defenders/NurseDefender';
import { CoronaEnemy } from './Enemies/CoronaEnemy';
import { GreenVirusEnemy } from './Enemies/GreenVirusEnemy';
import { LevelsType } from './types';

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

  public getLevelAtack = (num: number) => this._settings[num]?.atack;

  public getLevelDefenders = (num: number) => this._settings[num]?.defenders;

  public getEnemiesCount = (num: number) => {
    const { atack } = this._settings[num];
    return atack?.reduce((acc, item) => acc + item.enemies.length, 0);
  };
}

export const levels = new Levels();
