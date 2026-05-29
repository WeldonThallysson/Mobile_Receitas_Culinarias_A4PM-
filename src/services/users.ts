import { api } from '../api/api'; 
import { USERS_ENDPOINTS } from './path-endpoints/users.endpoints'; 

import {
  IListUsersParams,
  IListUsersResponse,
  IUpdateUserRequest,
  IUser,
} from '../interfaces/api/users.interface';

export const listUsers = async (
  params?: IListUsersParams,
): Promise<IListUsersResponse> => {
  const response = await api.get(
    USERS_ENDPOINTS.LIST,
    {
      params,
    },
  );

  return response.data;
};

export const findUser = async (
  id: number,
): Promise<IUser> => {
  const response = await api.get(
    USERS_ENDPOINTS.FIND(id),
  );

  return response.data;
};

export const updateUser = async (
  id: number,
  data: IUpdateUserRequest,
): Promise<{ message: string }> => {
  const response = await api.put(
    USERS_ENDPOINTS.UPDATE(id),
    data,
  );

  return response.data;
};

export const deleteUser = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await api.delete(
    USERS_ENDPOINTS.DELETE(id),
  );

  return response.data;
};