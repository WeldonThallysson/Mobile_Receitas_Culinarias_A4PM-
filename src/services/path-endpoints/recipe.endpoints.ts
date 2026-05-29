export const RECIPES_ENDPOINTS = {
  LIST: '/recipes',
  FIND: (id: number) => `/recipes/${id}`,
  CREATE: '/recipes',
  UPDATE: (id: number) => `/recipes/${id}`,
  DELETE: (id: number) => `/recipes/${id}`,
};