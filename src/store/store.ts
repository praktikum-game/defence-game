import { UserData } from '../api';

class Store {
  user: UserData | null;

  constructor() {
    this.user = null;
  }
}

export const store = new Store();
