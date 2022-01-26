/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventFull } from './types';

export class EventBus implements EventFull {
  private _listeners: Record<string, Function[]>;

  constructor() {
    this._listeners = {};
  }

  get listeners() {
    return this._listeners;
  }

  on(event: string, callback: Function): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this._listeners[event]) {
      throw new Error(`Событие ${event} не найдено`);
    }
    this._listeners[event] = this._listeners[event].filter((cb) => cb !== callback);
  }

  emit(event: string, ...args: any) {
    if (!this._listeners[event]) {
      throw new Error(`Событие ${event} не найдено`);
    }
    this._listeners[event].forEach((cb) => cb(...args));
  }
}
