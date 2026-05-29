
export interface IApiResponse {
    message: string;
   
}
export interface IListResponse<T> {
  items: T[];
  total: number;
}