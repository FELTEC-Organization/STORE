import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  price: z
    .number({ error: "Preço deve ser um número" })
    .positive("Preço deve ser maior que 0"),
  category: z.string().min(1, "Categoria é obrigatória"),
  stock: z
    .number()
    .int("Estoque deve ser inteiro")
    .nonnegative("Estoque não pode ser negativo"),
  description: z.string().optional(),
});

// Tipagem inferida automaticamente a partir do schema
export type TCreateProductSchema = z.infer<typeof productSchema>;
