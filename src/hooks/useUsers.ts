import { useState } from 'react';

import {
  listUsers,
  findUser,
  updateUser,
  deleteUser,
} from '../services/users';

import { useUsersStore } from '../store/users.store';

import {
  IListUsersParams,
  IUpdateUserRequest,
} from '../interfaces/api/users.interface';

export const useUsers = () => {
  const [loading, setLoading] =
    useState(false);

  const {
    users,
    selectedUser,

    setUsers,
    setSelectedUser,

    clearUsers,
  } = useUsersStore();

  const loadUsers = async (
    params?: IListUsersParams,
  ) => {
    try {
      setLoading(true);

      const response =
        await listUsers(params);

      setUsers(response.items);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async (
    id: number,
  ) => {
    try {
      setLoading(true);

      const response =
        await findUser(id);

      setSelectedUser(response);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (
    id: number,
    data: IUpdateUserRequest,
  ) => {
    try {
      setLoading(true);

      return await updateUser(id, data);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (
    id: number,
  ) => {
    try {
      setLoading(true);

      return await deleteUser(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    users,
    selectedUser,

    loadUsers,
    loadUser,

    handleUpdateUser,
    handleDeleteUser,

    clearUsers,
  };
};