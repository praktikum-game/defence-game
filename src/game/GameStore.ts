/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from './EventBus';

export type StateType = {
  score: number;
};

class StoreManager {
  private _storeData: StateType = {
    score: 0,
  };

  private _storeProxy: any;

  private _eventBus = new EventBus();

  constructor() {
    this._storeProxy = new Proxy(this._storeData, {
      get: (target, prop: keyof StateType) => target[prop],
      set: (target, propName: keyof StateType, value: any) => {
        target[propName] = value;
        if (this._eventBus.listeners[propName]) {
          this._eventBus.emit(propName, value);
        }
        return true;
      },
    });
  }

  public reset() {
    this.setValue('score', 0);
  }

  public addScoreValue(value: number) {
    const currentScore = Number(this.getValue('score'));
    if (typeof value === 'number') {
      this.setValue('score', currentScore + value);
    }
  }

  public setValue(propName: keyof StateType, value: any): void {
    this._storeProxy[propName] = value;
  }

  public getValue(propName: keyof StateType) {
    return this._storeProxy[propName];
  }

  public concatenateArraysValues(propName: keyof StateType, value: any) {
    let currentValue = this.getValue(propName);

    if (typeof currentValue === 'undefined' || currentValue === null) {
      currentValue = [];
    }

    const freshValues = Array.isArray(value) ? value : [value];
    this._storeProxy[propName] = [...currentValue, ...freshValues];
  }

  public sub(propName: keyof StateType, callback: Function) {
    this._eventBus.on(propName, callback);
  }

  public unsub(propName: keyof StateType, callback: Function) {
    this._eventBus.off(propName, callback);
  }
}

export const gameStore = new StoreManager();
