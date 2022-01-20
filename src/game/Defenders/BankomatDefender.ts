import { FIELD_CELL_HEIGHT, FIELD_CELL_WIDTH } from 'game/consts';
import { resources } from '../GameResourses';
import { Defender } from './Defender';

export class BankomatDefender extends Defender {
  public static bullet = null;

  public static imageUrl = resources.defenders.bankomat.image;

  public static iconUrl = resources.defenders.bankomat.icon;

  public static cost = 50;

  private _timefromLastMoney: number = 0;

  private _generateMoneyInterval = 12000;

  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: FIELD_CELL_WIDTH,
      height: FIELD_CELL_HEIGHT,
      imageUrl: BankomatDefender.imageUrl,
      health: 50,
      damage: 25,
      cost: BankomatDefender.cost,
    });
  }

  public isGetMoney(delay: number) {
    this._timefromLastMoney += delay;
    if (delay && this._timefromLastMoney >= this._generateMoneyInterval) {
      this._timefromLastMoney = 0;
      return true;
    }
    return false;
  }
}
