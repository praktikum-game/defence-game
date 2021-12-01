import { BankomatDefender } from './Defenders/BankomatDefender';
import { DoctorDefender } from './Defenders/DoctorDefender';
import { NurseDefender } from './Defenders/NurseDefender';
import { ShieldDefender } from './Defenders/ShieldDefender';
import { CoronaEnemy } from './Enemies/CoronaEnemy';
import { GreenVirusEnemy } from './Enemies/GreenVirusEnemy';
import { PinkVirusEnemy } from './Enemies/PinkVirusEnemy';
import { LevelsType } from './types';

class Levels {
  private _settings: LevelsType = {
    1: {
      defenders: [BankomatDefender, ShieldDefender, NurseDefender],
      enemies: [CoronaEnemy],
      bullets: [NurseDefender.bullet],
      atack: [
        {
          timeout: 5,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 10,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 10,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 15,
          enemies: [CoronaEnemy, CoronaEnemy],
        },
        {
          timeout: 20,
          enemies: [CoronaEnemy, CoronaEnemy, CoronaEnemy, CoronaEnemy, CoronaEnemy],
        },
      ],
    },
    2: {
      defenders: [BankomatDefender, ShieldDefender, NurseDefender, DoctorDefender],
      enemies: [CoronaEnemy, GreenVirusEnemy],
      bullets: [NurseDefender.bullet, DoctorDefender.bullet],
      atack: [
        {
          timeout: 10,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 5,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 5,
          enemies: [CoronaEnemy],
        },
        {
          timeout: 10,
          enemies: [CoronaEnemy, GreenVirusEnemy],
        },
        {
          timeout: 10,
          enemies: [GreenVirusEnemy, GreenVirusEnemy, CoronaEnemy, CoronaEnemy, CoronaEnemy],
        },
      ],
    },
    3: {
      defenders: [BankomatDefender, ShieldDefender, NurseDefender, DoctorDefender],
      enemies: [CoronaEnemy, GreenVirusEnemy, PinkVirusEnemy],
      bullets: [NurseDefender.bullet, DoctorDefender.bullet],
      atack: [
        {
          timeout: 10,
          enemies: [GreenVirusEnemy],
        },
        {
          timeout: 5,
          enemies: [GreenVirusEnemy],
        },
        {
          timeout: 5,
          enemies: [PinkVirusEnemy],
        },
        {
          timeout: 10,
          enemies: [PinkVirusEnemy, GreenVirusEnemy],
        },
        {
          timeout: 10,
          enemies: [GreenVirusEnemy, GreenVirusEnemy, PinkVirusEnemy, PinkVirusEnemy, CoronaEnemy],
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
