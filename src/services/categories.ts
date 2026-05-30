import { api } from '../api/api';

import { CATEGORIES_ENDPOINTS } from './path-endpoints/categories.endpoints';

import {
  ICategory,
  ICreateCategoryRequest,
  IListCategoriesParams,
  IListCategoriesResponse,
  IUpdateCategoryRequest,
} from '../interfaces/api/categories.interface';

export const listCategories = async (
  params?: IListCategoriesParams,
): Promise<IListCategoriesResponse> => {
  try {
    const response = await api.get(
      CATEGORIES_ENDPOINTS.LIST,
      { params },
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findCategory = async (
  id: number,
): Promise<ICategory> => {
  try {
    const response = await api.get(
      CATEGORIES_ENDPOINTS.FIND(id),
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategory = async (
  data: ICreateCategoryRequest,
): Promise<{ message: string }> => {
  try {
    const response = await api.post(
      CATEGORIES_ENDPOINTS.CREATE,
      data,
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCategory = async (
  id: number,
  data: IUpdateCategoryRequest,
): Promise<{ message: string }> => {
  try {
    const response = await api.put(
      CATEGORIES_ENDPOINTS.UPDATE(id),
      data,
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (
  id: number,
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(
      CATEGORIES_ENDPOINTS.DELETE(id),
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};