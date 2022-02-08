import { localBaseUrl } from 'api/consts';
import { AxiosResponse } from 'axios';
import { UserData } from '../auth';
import { BaseAPI } from '../BaseAPI';
import { ProfilePasswordUpdateRequest, ProfileUpdateRequest } from './types';

class UsersAPI extends BaseAPI {
  constructor(baseUrl: string) {
    super('/user', baseUrl);
  }

  updateProfile(data: ProfileUpdateRequest): Promise<AxiosResponse<UserData>> {
    return this.http.put('/profile', data);
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  updatePassword(data: ProfilePasswordUpdateRequest) {
    return this.http.put('/password', data);
  }

  search(login: string) {
    return this.http.post('/search', { login });
  }
}

export const usersAPI = new UsersAPI(localBaseUrl);
