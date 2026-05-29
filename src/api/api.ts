import axios, {
  AxiosError,
} from 'axios';

import Config from 'react-native-config';

import { AppError } from '../errors/app.error';

import { getToken } from '../storage/auth.storage';

export const api = axios.create({
  baseURL:
    Config.APP_API_URL ||
    'https://backend-receitas-culinarias-a4-pm.vercel.app',

});

console.log({api})
api.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,

  (error: AxiosError<any>) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        'Erro interno do servidor';

      const statusCode =
        error.response.status || 500;

      return Promise.reject(
        new AppError(
          message,
          statusCode,
        ),
      );
    }

    if (error.request) {
      return Promise.reject(
        new AppError(
          'Não foi possível conectar ao servidor.',
          500,
        ),
      );
    }

    return Promise.reject(
      new AppError(
        'Ocorreu um erro inesperado.',
        500,
      ),
    );
  },
);