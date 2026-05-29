export interface IRecipe {
  id: number;
  user_id: number;
  category_id: number;

  name: string;

  preparation_time_minutes?: number;
  servings?: number;

  preparation_method: string;

  ingredients?: string;

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
  user_id: number;
  category_id: number;

  name: string;

  preparation_time_minutes?: number;
  servings?: number;

  preparation_method: string;

  ingredients?: string;
}

export interface IUpdateRecipeRequest
  extends Partial<ICreateRecipeRequest> {}