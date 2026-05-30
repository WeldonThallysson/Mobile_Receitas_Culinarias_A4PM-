import axios, {
  AxiosError,
} from 'axios';

import Config from 'react-native-config';

import Toast from 'react-native-toast-message';

import { getAuth } from '../storage/auth.storage';

export const api = axios.create({
  baseURL:
    Config.APP_API_URL ||
    'https://backend-receitas-culinarias-a4-pm.vercel.app',
});

api.interceptors.request.use(
  async config => {
    const authData = await getAuth();

    if (authData?.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }

    return config;
  },
);


api.interceptors.response.use(
  undefined,

  (error: AxiosError<any>) => {
    let message = 'Erro interno do servidor';

    if (error.response) {
      const extractMessageFromHtml = (
        html: string,
      ) => {
        try {
          const preMatch = html.match(
            /<pre[^>]*>([\s\S]*?)<\/pre>/i,
          );

          const content = preMatch
            ? preMatch[1]
            : html;

          const text = content
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/&nbsp;/gi, ' ')
            .replace(/&amp;/gi, '&')
            .replace(/<[^>]+>/g, '')
            .trim();

          const firstLine = text
            .split('\n')
            .map(l => l.trim())
            .find(Boolean);

          return firstLine
            ? firstLine
                .replace(/^AppError:\s*/i, '')
                .trim()
            : text || null;
        } catch {
          return null;
        }
      };

      message =
        error.response.data?.message ||
        (typeof error.response.data === 'string'
          ? extractMessageFromHtml(
              error.response.data,
            )
          : undefined) ||
        'Erro interno do servidor';
    }

    Toast.show({
      type: 'error',
      text1: message,
    });

    return Promise.resolve({
      data: null,
      status: error.response?.status ?? 500,
    });
  },
);