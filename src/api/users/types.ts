export type ProfileUpdateRequest = {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
};

export type ProfilePasswordUpdateRequest = {
  oldPassword: string;
  newPassword: string;
};
