import { DoctorDefender } from './Defenders/DoctorDefender';
import { NurseDefender } from './Defenders/NurseDefender';
import { CoronaEnemy } from './Enemies/CoronaEnemy';

export const levels = {
  1: {
    defenders: [NurseDefender, DoctorDefender],
    enemies: [CoronaEnemy],
    bullets: [NurseDefender.bullet, DoctorDefender.bullet],
  },
};
