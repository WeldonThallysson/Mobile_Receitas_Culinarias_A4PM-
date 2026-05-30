import { create } from 'zustand';

interface IAuthStore {
  userId: number | null;
  token: string | null;
  message: string | null;

  setAuth: (data: {
    userId: number;
    token: string;
    message: string;
  }) => void;

  setToken: (token: string | null) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  userId: null,
  token: null,
  message: null,

  setAuth: ({ userId, token, message }) =>
    set({
      userId,
      token,
      message,
    }),

  setToken: (token: string | null) =>
    set({
      token,
    }),

  clearAuth: () =>
    set({
      userId: null,
      token: null,
      message: null,
    }),
}));