import { localBaseUrl, praktikumBaseUrl } from 'api/consts';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseAPI } from '../BaseAPI';
import { LoginRequest, RegisterRequest, UserData } from './types';

class AuthAPI extends BaseAPI {
  constructor(baseUrl: string) {
    super('/auth', baseUrl);
  }

  login(data: LoginRequest) {
    return this.http.post('/signin', data);
  }

  register(data: RegisterRequest) {
    return this.http.post('/signup', data);
  }

  logout(options: AxiosRequestConfig | undefined = undefined) {
    return this.http.post('/logout', undefined, options);
  }

  userRead(options: AxiosRequestConfig | undefined = undefined): Promise<AxiosResponse<UserData>> {
    return this.http.get<UserData>('/user', { ...options });
  }
}

export const localAuthApi = new AuthAPI(localBaseUrl);
export const praktikumAuthApi = new AuthAPI(praktikumBaseUrl);
