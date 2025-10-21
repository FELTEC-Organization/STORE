import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  price: z.number().nonnegative().optional(),
  categoryId: z.union([z.number(), z.null()]).optional().default(null),
  labelId: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
  stock: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TEditProductSchema = z.infer<typeof productSchema>;
