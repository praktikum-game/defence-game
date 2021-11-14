import { BaseAPI } from './BaseAPI';
import { IProfilePasswordUpdateRequest, IProfileUpdateRequest } from './types';

class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateProfile(data: IProfileUpdateRequest) {
    return this.http.put('/profile', data);
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  updatePassword(data: IProfilePasswordUpdateRequest) {
    return this.http.put('/password', data);
  }

  search(login: string) {
    return this.http.post('/search', { login });
  }
}

export default new UsersAPI();
