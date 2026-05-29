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
 
export const login = async (
  data: ILoginRequest,
): Promise<ILoginResponse> => {
  try {
    const response = await api.post(
      AUTH_ENDPOINTS.LOGIN,
      data,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  data: IRegisterRequest,
): Promise<IApiResponse> => {
  try {
    return await api.post(
      AUTH_ENDPOINTS.REGISTER,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const recoverPassword = async (
  data: IRecoverPasswordRequest,
): Promise<void> => {
  try {
    await api.post(
      AUTH_ENDPOINTS.RECOVER_PASSWORD,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  data: IResetPasswordRequest,
): Promise<void> => {
  try {
    await api.post(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      data,
    );
  } catch (error) {
    throw error;
  }
};