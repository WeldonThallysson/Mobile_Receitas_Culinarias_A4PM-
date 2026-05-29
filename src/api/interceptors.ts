import { AxiosError } from 'axios';

import { api } from './api';
import { AppError } from '../errors/app.error';

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
        new AppError(message, statusCode),
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