import { BaseAPI } from 'api/BaseAPI';
import { UserDbModel } from './types';

class UsersDbAPI extends BaseAPI {
  constructor() {
    super('/users', 'https://local.ya-praktikum.tech/api/v1');
  }

  public getUsers(offset: number = 0, limit: number = 10) {
    return this.http.get<Array<UserDbModel>>(`?offset=${offset}&limit=${limit}`);
  }
}

export const usersDbAPI = new UsersDbAPI();
