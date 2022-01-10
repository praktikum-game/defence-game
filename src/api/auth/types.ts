export type LoginRequest = {
  login: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type UserData = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string | null;
};
