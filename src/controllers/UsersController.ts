import { UsersAPI, IProfilePasswordUpdateRequest, IProfileUpdateRequest } from '../api';
import { store } from '../store';

class UsersController {
  private api: typeof UsersAPI;

  constructor() {
    this.api = UsersAPI;
  }

  async updateProfile(formData: FormData) {
    try {
      const data: IProfileUpdateRequest = {
        first_name: String(formData.get('first_name')),
        second_name: String(formData.get('second_name')),
        display_name: String(formData.get('display_name')),
        login: String(formData.get('login')),
        email: String(formData.get('email')),
        phone: String(formData.get('phone')),
      };
      const response = await this.api.updateProfile(data);
      store.user = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async updateAvatar(formData: FormData) {
    try {
      const response = await this.api.updateAvatar(formData);
      store.user = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async updatePassword(formData: FormData) {
    try {
      const data: IProfilePasswordUpdateRequest = {
        oldPassword: String(formData.get('oldPassword')),
        newPassword: String(formData.get('newPassword')),
      };
      await this.api.updatePassword(data);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UsersController();
