import { create } from 'zustand';
import { IUser } from '../interfaces/api/users.interface';

interface IAuthStore {
  token: string | null;
  user: IUser | null;

  setToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  token: null,
  user: null,

  setToken: (token) =>
    set({
      token,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  clearAuth: () =>
    set({
      token: null,
      user: null,
    }),
}));