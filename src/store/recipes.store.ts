import { create } from 'zustand';
import { IRecipe } from '../interfaces/api/recipe.interface';

interface IRecipesStore {
  recipes: IRecipe[];
  selectedRecipe: IRecipe | null;

  setRecipes: (recipes: IRecipe[]) => void;
  setSelectedRecipe: (
    recipe: IRecipe | null,
  ) => void;

  clearRecipes: () => void;
}

export const useRecipesStore =
  create<IRecipesStore>((set) => ({
    recipes: [],
    selectedRecipe: null,

    setRecipes: (recipes) =>
      set({
        recipes,
      }),

    setSelectedRecipe: (
      selectedRecipe,
    ) =>
      set({
        selectedRecipe,
      }),

    clearRecipes: () =>
      set({
        recipes: [],
        selectedRecipe: null,
      }),
  }));