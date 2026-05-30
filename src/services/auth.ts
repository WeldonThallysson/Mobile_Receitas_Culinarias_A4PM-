import { api } from '../api/api';

import { AUTH_ENDPOINTS } from './path-endpoints/auth.endpoints';

import {
  ILoginRequest,
  ILoginResponse,
  IRecoverPasswordRequest,
  IRegisterRequest,
  IResetPasswordRequest,
} from '../interfaces/api/auth.interface';
import { IApiResponse } from '../interfaces/api/api.interface';

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, data);

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (
  data: IRegisterRequest,
): Promise<IApiResponse> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, data);

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const recoverPassword = async (
  data: IRecoverPasswordRequest,
): Promise<IApiResponse> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.RECOVER_PASSWORD, data);
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resetPassword = async (
  data: IResetPasswordRequest,
): Promise<IApiResponse> => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
