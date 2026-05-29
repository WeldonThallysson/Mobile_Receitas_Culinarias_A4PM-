export interface IUser {
  id: number;

  name: string;

  login: string;

  created_at?: string;
  updated_at?: string;
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