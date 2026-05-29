export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ILoginResponse {
  id: number;
  token: string;
  message: string;
}

export interface IRegisterRequest {
  name: string;
  login: string;
  password: string;
}

export interface IRecoverPasswordRequest {
  login: string;
}

export interface IResetPasswordRequest {
  token: string;
  oldPassword: string;
  newPassword: string;
}
