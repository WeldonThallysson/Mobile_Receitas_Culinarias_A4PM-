export const CATEGORIES_ENDPOINTS = {
  LIST: '/categories',
  FIND: (id: number) => `/categories/${id}`,
  CREATE: '/categories',
  UPDATE: (id: number) => `/categories/${id}`,
  DELETE: (id: number) => `/categories/${id}`,
};