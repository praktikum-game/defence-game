import { User, UserAttributes, UserCreationAttributes } from '../models/User';
import { BaseService } from './BaseService';

class UserService extends BaseService<UserAttributes, UserCreationAttributes> {
  constructor() {
    super(User);
  }

  findByPraktikumId(praktikumId: number) {
    return this.readOne({ where: { praktikumId } });
  }
}

export const userService = new UserService();
