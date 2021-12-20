import { BaseCrud } from './BaseCrud';
import { User, UserAttributes, UserCreationAttributes } from '../models/User';

class UserCrud extends BaseCrud<UserAttributes, UserCreationAttributes> {
  constructor() {
    super(User);
  }
}

export const userCrud = new UserCrud();
