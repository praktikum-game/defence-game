import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl } from 'api/consts';
import { UserDbModel } from './types';

class UsersDbAPI extends BaseAPI {
  constructor() {
    super('/users', localBaseUrl);
  }

  public getUsers(offset: number = 0, limit: number = 10) {
    return this.http.get<Array<UserDbModel>>(`?offset=${offset}&limit=${limit}`);
  }
}

export const usersDbAPI = new UsersDbAPI();
