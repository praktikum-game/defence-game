export class GameCurrency {
  private _value: number;

  private _timefromLastUpdate: number;

  private _autoRiseInterval: number;

  private _autoRiseValue: number;

  constructor(value: number, autoRiseValue: number, autoRiseInterval: number) {
    this._value = value;
    this._timefromLastUpdate = 0;
    this._autoRiseInterval = autoRiseInterval;
    this._autoRiseValue = autoRiseValue;
  }

  public get value() {
    return this._value;
  }

  public set value(val: number) {
    this._value = val;
  }

  public autoRise = (delay: number) => {
    this._timefromLastUpdate += delay;
    if (this._timefromLastUpdate >= this._autoRiseInterval * 1000) {
      this._value += this._autoRiseValue;
      this._timefromLastUpdate = 0;
      return true;
    }
    return false;
  };
}
