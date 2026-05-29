import { z } from 'zod';

export const recipeSchema = z.object({
  category_id: z.string().min(1, {
    message: 'Selecione uma categoria',
  }),

  name: z.string().min(1, {
    message: 'Informe o nome',
  }),

  preparationTimeMinutes:
    z.string().min(1, {
      message: 'Informe o tempo',
    }),

  servings: z.string().min(1, {
    message: 'Informe as porções',
  }),

  ingredients: z.string().min(1, {
    message: 'Informe os ingredientes',
  }),

  preparationMethod:
    z.string().min(1, {
      message:
        'Informe o modo de preparo',
    }),
});

export type RecipeFormData =
  z.infer<typeof recipeSchema>;