import { z } from 'zod';

export const recoverPasswordSchema = z.object({
  login: z
    .string()
    .min(1, 'Informe o login'),
});

export type RecoverPasswordFormData =
  z.infer<
    typeof recoverPasswordSchema
  >;