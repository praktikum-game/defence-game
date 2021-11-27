import { UserData } from '../api';

class StoreOld {
  user: UserData | null;

  constructor() {
    this.user = null;
  }
}

export const storeOld = new StoreOld();
