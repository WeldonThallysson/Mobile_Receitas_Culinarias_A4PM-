export interface IRecipe {
  id: number;
  user_id: number;
  category_id: number;

  name: string;

  preparationTimeMinutes?: number;
  servings?: number;

  preparationMethod: string;

  ingredients?: string;
  category: {
    id: number;
    name: string;
  }
  created_at?: string;
  updated_at?: string;
}

export interface IListRecipesParams {
  name?: string;

  user_id?: number;
  category_id?: number;

  created_at_start?: Date;
  created_at_end?: Date;

  updated_at_start?: Date;
  updated_at_end?: Date;
}

export interface IListRecipesResponse {
  items: IRecipe[];
  total: number;
}

export interface ICreateRecipeRequest {
  category_id: number;

  name: string;

  preparationTimeMinutes?: number;
  servings?: number;

  preparationMethod: string;

  ingredients?: string;
}

export interface IUpdateRecipeRequest
  extends Partial<ICreateRecipeRequest> {}