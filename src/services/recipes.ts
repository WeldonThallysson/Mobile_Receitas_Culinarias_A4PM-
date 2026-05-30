import { api } from '../api/api';
import { RECIPES_ENDPOINTS } from './path-endpoints/recipe.endpoints';

import {
  ICreateRecipeRequest,
  IListRecipesParams,
  IListRecipesResponse,
  IRecipe,
  IUpdateRecipeRequest,
} from '../interfaces/api/recipe.interface';

export const listRecipes = async (
  params?: IListRecipesParams,
): Promise<IListRecipesResponse> => {
  try {
    const response = await api.get(
      RECIPES_ENDPOINTS.LIST,
      { params },
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findRecipe = async (
  id: number,
): Promise<IRecipe> => {
  try {
    const response = await api.get(
      RECIPES_ENDPOINTS.FIND(id),
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createRecipe = async (
  data: ICreateRecipeRequest,
): Promise<{ message: string }> => {
  try {
    const response = await api.post(
      RECIPES_ENDPOINTS.CREATE,
      data,
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateRecipe = async (
  id: number,
  data: IUpdateRecipeRequest,
): Promise<{ message: string }> => {
  try {
    const response = await api.put(
      RECIPES_ENDPOINTS.UPDATE(id),
      data,
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteRecipe = async (
  id: number,
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(
      RECIPES_ENDPOINTS.DELETE(id),
    );

    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};