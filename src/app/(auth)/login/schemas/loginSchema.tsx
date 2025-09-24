import { z } from "zod";

// Validações de formato para login
export const loginSchema = z.object({
	email: z
		.string()
		.nonempty("Informe o e-mail")
		.refine(
			(val) => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(val);
			},
			{
				message: "E-mail inválido",
			},
		),
	password: z.string().nonempty("Informe a senha"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
