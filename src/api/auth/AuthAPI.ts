import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseAPI } from '../BaseAPI';
import { LoginRequest, RegisterRequest, UserData } from './types';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  login(data: LoginRequest) {
    return this.http.post('/signin', data);
  }

  register(data: RegisterRequest) {
    return this.http.post('/signup', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  userRead(options: AxiosRequestConfig | undefined = undefined): Promise<AxiosResponse<UserData>> {
    return this.http.get<UserData>('/user', { ...options });
  }
}

export const authAPI = new AuthAPI();
