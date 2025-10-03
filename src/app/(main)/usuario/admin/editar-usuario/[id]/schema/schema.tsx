import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "O nome do usuário é obrigatório"),
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Email inválido"),
  role: z.string().min(1, "Tipo do usuário é obrigatório"),
});

// Tipagem inferida automaticamente a partir do schema
export type TCreateUserSchema = z.infer<typeof userSchema>;
