import { create } from 'zustand';
import { ICategory } from '../interfaces/api/categories.interface';

interface ICategoriesStore {
  categories: ICategory[];
  selectedCategory: ICategory | null;

  setCategories: (categories: ICategory[]) => void;
  setSelectedCategory: (
    category: ICategory | null,
  ) => void;

  clearCategories: () => void;
}

export const useCategoriesStore =
  create<ICategoriesStore>((set) => ({
    categories: [],
    selectedCategory: null,

    setCategories: (categories) =>
      set({
        categories,
      }),

    setSelectedCategory: (
      selectedCategory,
    ) =>
      set({
        selectedCategory,
      }),

    clearCategories: () =>
      set({
        categories: [],
        selectedCategory: null,
      }),
  }));