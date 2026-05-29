export interface ICategory {
  id: number;
  name: string;
}

export interface ICreateCategoryRequest {
  name: string;
}

export interface IUpdateCategoryRequest {
  name?: string;
}

export interface IListCategoriesParams {
  name?: string;
}

export interface IListCategoriesResponse {
  items: ICategory[];
  total: number;
}