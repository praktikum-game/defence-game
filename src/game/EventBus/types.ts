/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Eventfull {
    on: (event: string, callback: Function) => void;
    off: (event: string, callback: Function) => void;
    emit: (event: string, ...args: any) => void;
  }
  