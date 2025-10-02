import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome do usuário é obrigatório"),
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Email inválido"),
  type: z.string().min(1, "Tipo do usuário é obrigatório"),
});

// Tipagem inferida automaticamente a partir do schema
export type TCreateProductSchema = z.infer<typeof productSchema>;
