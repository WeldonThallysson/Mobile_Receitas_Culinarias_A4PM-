import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  login,
  register,
  recoverPassword,
  resetPassword,
} from '../services/auth';

import { useAuthStore } from '../store/auth.store';

import {
  ILoginRequest,
  IRegisterRequest,
  IRecoverPasswordRequest,
  IResetPasswordRequest,
} from '../interfaces/api/auth.interface';

import { saveToken, removeToken } from '../storage/auth.storage';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  const { userId, token, message, setAuth, clearAuth } = useAuthStore();

  const handleLogin = async (data: ILoginRequest) => {
    try {
      setLoading(true);

      const response = await login(data);

      setAuth({
        userId: response.id,
        token: response.token,
        message: response.message,
      });

      await saveToken(response.token);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: IRegisterRequest) => {
    try {
      setLoading(true);

      const response = await register(data);

      if (response.message) {
        navigation.navigate('Login');
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverPassword = async (data: IRecoverPasswordRequest) => {
    try {
      setLoading(true);

      const { resetToken, message, canResetPassword } = await recoverPassword(
        data,
      );

      if (resetToken) {
        navigation.navigate('ResetPassword', {
          token: resetToken as string,
        });
      }

      return {
        resetToken,
        message,
        canResetPassword,
      };
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: IResetPasswordRequest) => {
    try {
      setLoading(true);

      const response = await resetPassword(data) 

      if(response !== undefined && response?.message){
         navigation.navigate('Login')
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await removeToken();
    clearAuth();
  };

  return {
    loading,

    userId,
    token,
    message,

    handleLogin,
    handleRegister,
    handleRecoverPassword,
    handleResetPassword,

    logout,
  };
};
