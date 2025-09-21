import { type TFunctionNonStrict } from "i18next";
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

export function translateLoginSchema(t: TFunctionNonStrict) {
	return z.object({
		email: z
			.string()
			.nonempty(t("E-mail is required"))
			.refine(
				(val) => {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					return emailRegex.test(val);

				},
				{
					message: t("Invalid e-mail"),
				},
			),
		password: z.string().nonempty(t("Password is required")),
	});
}

export type TLoginSchema = z.infer<typeof loginSchema>;
