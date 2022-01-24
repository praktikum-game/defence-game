import { BaseAPI } from 'api/BaseAPI';
import { localBaseUrl } from 'api/consts';
import { THEME_TYPES } from 'consts';
import { Theme } from 'store/theme/types';
import { UserDbModel } from './types';

class UsersDbAPI extends BaseAPI {
  constructor() {
    super('/user', localBaseUrl);
  }

  public getUsers(offset: number = 0, limit: number = 10) {
    return this.http.get<Array<UserDbModel>>(`?offset=${offset}&limit=${limit}`);
  }

  public setUserTheme(userId: number, theme: Theme) {
    return this.http.patch(`/${userId}`, { field: 'siteThemeId', value: THEME_TYPES[theme] });
  }
}

export const usersDbAPI = new UsersDbAPI();
