import { AuthAPI, ILoginRequest, IRegisterRequest } from '../api';

import { store } from '../store';

class AuthController {
  private api: typeof AuthAPI;

  constructor() {
    this.api = AuthAPI;
  }

  async login(formData: FormData) {
    const data: ILoginRequest = {
      login: String(formData.get('login')),
      password: String(formData.get('password')),
    };
    await this.api.login(data);
    await this.userRead();

    window.history.pushState({}, '', '/');
    return undefined;
  }

  async logout() {
    try {
      await this.api.logout();
      await this.userRead();

      window.history.pushState({}, '', '/');
    } catch (e) {
      await this.userRead();
    }
  }

  async register(formData: FormData) {
    try {
      const data: IRegisterRequest = {
        first_name: String(formData.get('first_name')),
        second_name: String(formData.get('second_name')),
        login: String(formData.get('login')),
        password: String(formData.get('password')),
        email: String(formData.get('email')),
        phone: String(formData.get('phone')),
      };
      await this.api.register(data);
      await this.userRead();

      window.history.pushState({}, '', '/');
    } catch (e) {
      console.log(e);
    }
  }

  async userRead() {
    try {
      const response = await this.api.userRead();
      console.log(response);
      store.user = response.data;
    } catch (e) {
      console.log(e);
      store.user = null;
    }
  }
}

export default new AuthController();
