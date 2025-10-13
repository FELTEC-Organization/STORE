import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  price: z.number().nonnegative().optional(),
  categoryId: z.number().min(1, "Selecione uma categoria"),
  labelId: z.number().optional(),
  stock: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TEditProductSchema = z.infer<typeof productSchema>;
