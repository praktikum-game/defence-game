export interface IBadRequest {
  reason: string
}

export interface UserData {
  id: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  email: string
  phone: string
  avatar: string
}

export interface IRegisterRequest {
  login: string
  password: string
  first_name: string
  second_name: string
  email: string
  phone: string
}

export interface ILoginRequest {
  login: string
  password: string
}

export interface IProfileUpdateRequest {
  login: string
  first_name: string
  second_name: string
  display_name: string
  email: string
  phone: string
}

export interface IProfilePasswordUpdateRequest {
  oldPassword: string
  newPassword: string
}
