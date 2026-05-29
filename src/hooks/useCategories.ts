import { useState } from 'react';

import {
  listCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories';
import { useCategoriesStore } from '../store/categories.store';

import {
  ICreateCategoryRequest,
  IListCategoriesParams,
  IUpdateCategoryRequest,
} from '../interfaces/api/categories.interface';

export const useCategories = () => {
  const [loading, setLoading] = useState(false);

  const {
    categories,
    selectedCategory,

    setCategories,
    setSelectedCategory,

    clearCategories,
  } = useCategoriesStore();

  const loadCategories = async (params?: IListCategoriesParams) => {
    try {
      setLoading(true);

      const response = await listCategories(params);

      setCategories(response.items);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const loadCategory = async (id: number) => {
    try {
      setLoading(true);

      const response = await findCategory(id);

      setSelectedCategory(response);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (data: ICreateCategoryRequest) => {
    try {
      setLoading(true);

      return await createCategory(data);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (
    id: number,
    data: IUpdateCategoryRequest,
  ) => {
    try {
      setLoading(true);

      return await updateCategory(id, data);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      setLoading(true);

      return await deleteCategory(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    categories,
    selectedCategory,

    loadCategories,
    loadCategory,

    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    clearCategories,
  };
};
