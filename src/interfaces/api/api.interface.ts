
export interface IApiResponse {
    message: string;
     canResetPassword?: boolean,
    resetToken?: string
}
export interface IListResponse<T> {
  items: T[];
  total: number;
}