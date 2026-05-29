export interface IUser {
  id: number;

  name: string;

  login: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface IListUsersParams {
  name?: string;
  login?: string;
}

export interface IListUsersResponse {
  items: IUser[];
  total: number;
}

export interface IUpdateUserRequest {
  name?: string;
  login?: string;
  password?: string;
}