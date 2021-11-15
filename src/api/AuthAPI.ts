import { BaseAPI } from './BaseAPI';
import { ILoginRequest, IRegisterRequest } from './types';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  login(data: ILoginRequest) {
    return this.http.post('/signin', data);
  }

  register(data: IRegisterRequest) {
    return this.http.post('/signup', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  userRead() {
    return this.http.get('/user');
  }
}

export const authAPI = new AuthAPI();
