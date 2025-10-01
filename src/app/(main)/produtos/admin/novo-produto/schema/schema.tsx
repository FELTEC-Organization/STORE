import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço deve ser maior ou igual a 0"), // continua number aqui
  category: z.string().min(1, "Categoria é obrigatória"),
  stock: z.number().min(0, "Estoque deve ser maior ou igual a 0"),
  description: z.string().optional(),
  tags: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
