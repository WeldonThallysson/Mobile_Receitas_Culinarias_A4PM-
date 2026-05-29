import { useState } from 'react';

import {
  listRecipes,
  findRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes';

import { useRecipesStore } from '../store/recipes.store';

import {
  ICreateRecipeRequest,
  IListRecipesParams,
  IUpdateRecipeRequest,
} from '../interfaces/api/recipe.interface';

export const useRecipes = () => {
  const [loading, setLoading] =
    useState(false);

  const {
    recipes,
    selectedRecipe,

    setRecipes,
    setSelectedRecipe,

    clearRecipes,
  } = useRecipesStore();

  const loadRecipes = async (
    params?: IListRecipesParams,
  ) => {
    try {
      setLoading(true);

      const response =
        await listRecipes(params);

      setRecipes(response.items);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const loadRecipe = async (
    id: number,
  ) => {
    try {
      setLoading(true);

      const response =
        await findRecipe(id);

      setSelectedRecipe(response);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (
    data: ICreateRecipeRequest,
  ) => {
    try {
      setLoading(true);

      return await createRecipe(data);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecipe = async (
    id: number,
    data: IUpdateRecipeRequest,
  ) => {
    try {
      setLoading(true);

      return await updateRecipe(
        id,
        data,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (
    id: number,
  ) => {
    try {
      setLoading(true);

      return await deleteRecipe(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    recipes,
    selectedRecipe,

    loadRecipes,
    loadRecipe,

    handleCreateRecipe,
    handleUpdateRecipe,
    handleDeleteRecipe,

    clearRecipes,
  };
};