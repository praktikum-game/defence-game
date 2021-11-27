import { usersAPI, IProfilePasswordUpdateRequest, IProfileUpdateRequest } from '../api';
import { storeOld } from '../store';

class UsersController {
  private api: typeof usersAPI;

  constructor() {
    this.api = usersAPI;
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
      storeOld.user = response.data;

      // eslint-disable-next-line
    } catch {}
  }

  async updateAvatar(formData: FormData) {
    try {
      const response = await this.api.updateAvatar(formData);
      storeOld.user = response.data;

      // eslint-disable-next-line
    } catch {}
  }

  async updatePassword(formData: FormData) {
    try {
      const data: IProfilePasswordUpdateRequest = {
        oldPassword: String(formData.get('oldPassword')),
        newPassword: String(formData.get('newPassword')),
      };
      await this.api.updatePassword(data);

      // eslint-disable-next-line
    } catch {}
  }
}

export const usersController = new UsersController();
