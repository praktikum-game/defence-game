import { UserAttributes } from 'shared/types/UserAttributes';
import { Theme } from 'store/theme/types';
import { User, UserCreationAttributes } from '../models/User';
import { BaseService } from './BaseService';

class UserService extends BaseService<UserAttributes, UserCreationAttributes, User> {
  constructor() {
    super(User);
  }

  findByPraktikumId(id: number) {
    return this.readById(id);
  }

  getUserThemeName(id: number) {
    return this.readById(id)
      .then((user) => user?.getSiteTheme())
      .then((theme) => theme?.theme || null)
      .catch(() => null);
  }
}

export const userService = new UserService();
