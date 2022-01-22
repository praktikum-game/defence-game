/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from './EventBus/EventBus';

export enum StoreEventsType {
  score = 'score',
  money = 'money',
}

class StoreManager {
  private _storeData: Record<string, any> = {
    [StoreEventsType.score]: 0,
    [StoreEventsType.money]: 0,
  };

  private _storeProxy: any;

  private _eventBus = new EventBus();

  constructor() {
    this._storeProxy = new Proxy(this._storeData, {
      get: (target, prop: string) => target[prop],
      set: (target, propName: string, value: any) => {
        target[propName] = value;
        if (this._eventBus.listeners[propName]) {
          this._eventBus.emit(propName, value);
        }
        return true;
      },
    });
  }

  public setValue(propName: string, value: any): void {
    this._storeProxy[propName] = value;
  }

  public getValue(propName: string): any {
    return this._storeProxy[propName];
  }

  public concatenateArraysValues(propName: string, value: any) {
    let currentValue = this.getValue(propName);

    if (typeof currentValue === 'undefined' || currentValue === null) {
      currentValue = [];
    }

    const freshValues = Array.isArray(value) ? value : [value];
    this._storeProxy[propName] = [...currentValue, ...freshValues];
  }

  public sub(propName: string, callback: Function) {
    this._eventBus.on(propName, callback);
  }

  public unsub(propName: string, callback: Function) {
    this._eventBus.off(propName, callback);
  }
}
export const gameState = new StoreManager();
