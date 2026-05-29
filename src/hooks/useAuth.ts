import { useState } from 'react';

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

  const { user, token, setUser, setToken, clearAuth } = useAuthStore();

  const handleLogin = async (data: ILoginRequest) => {
    try {
      setLoading(true);

      const response = await login(data);

      setToken(response.token);
      setUser(response.user);

      await saveToken(response.token);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: IRegisterRequest) => {
    try {
      setLoading(true);

      return await register(data);
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverPassword = async (data: IRecoverPasswordRequest) => {
    try {
      setLoading(true);

      await recoverPassword(data);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: IResetPasswordRequest) => {
    try {
      setLoading(true);

      await resetPassword(data);
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

    user,
    token,

    handleLogin,
    handleRegister,
    handleRecoverPassword,
    handleResetPassword,

    logout,
  };
};
