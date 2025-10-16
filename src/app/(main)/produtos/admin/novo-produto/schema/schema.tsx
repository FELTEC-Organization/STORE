import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),

  // Price opcional, se preenchido deve ser >= 0
  price: z
    .number({ message: "O preço deve ser um número" })
    .nonnegative({ message: "O preço não pode ser negativo" })
    .optional(),

  categoryId: z
    .number({ message: "Categoria inválida" })
    .int()
    .positive()
    .optional()
    .nullable(),

  labelId: z.number().optional(), // opcional

  stock: z
    .number({ message: "Estoque inválido" })
    .int({ message: "Estoque deve ser um número inteiro" })
    .nonnegative({ message: "Estoque não pode ser negativo" })
    .optional(),

  description: z.string().optional(),

  tags: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
