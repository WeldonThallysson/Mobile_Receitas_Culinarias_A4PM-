import { create } from 'zustand';
import { IUser } from '../interfaces/api/users.interface';

interface IUsersStore {
  users: IUser[];
  selectedUser: IUser | null;

  setUsers: (users: IUser[]) => void;
  setSelectedUser: (
    user: IUser | null,
  ) => void;

  clearUsers: () => void;
}

export const useUsersStore =
  create<IUsersStore>((set) => ({
    users: [],
    selectedUser: null,

    setUsers: (users) =>
      set({
        users,
      }),

    setSelectedUser: (
      selectedUser,
    ) =>
      set({
        selectedUser,
      }),

    clearUsers: () =>
      set({
        users: [],
        selectedUser: null,
      }),
  }));