import { UserAttributes } from 'shared/types/UserAttributes';
import { User, UserCreationAttributes } from '../models/User';
import { BaseService } from './BaseService';

class UserService extends BaseService<UserAttributes, UserCreationAttributes> {
  constructor() {
    super(User);
  }

  findByPraktikumId(id: number) {
    return this.readOne({ where: { id } });
  }

  getUserThemeName(id: number) {
    return (
      User.findByPk(id)
        //@ts-ignore
        .then((user) => user.getSiteTheme())
        .then((siteTheme) => siteTheme.theme)
    );
  }
}

export const userService = new UserService();
