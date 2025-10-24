"use client";

import AuthLayout from "@/app/(auth)/password-renewal/components/authLayout";
import AuthInput from "@/app/(auth)/login/components/authInput";
import ErrorAlert from "@/app/(auth)/login/components/errorAlert";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function PasswordRenewPage() {
	type TPasswordRenewForm = {
		email: string;
	};

	const {
		register,
		getValues,
		formState: { errors },
	} = useForm<TPasswordRenewForm>({ mode: "onChange" });

	const router = useRouter();

	const [showError, setShowError] = useState(false);
	const [errorKey, setErrorKey] = useState(0);
	const ERROR_DURATION = 4000;
	const timeoutRef = useRef<number | null>(null);

	const [email, setEmail] = useState("");

	// Função de envio de senha temporária (mock)
	const handleSendTemporaryPassword = async () => {
		const email = getValues("email");
		if (!email) {
			triggerError();
			return;
		}

		try {
			const res = await fetch(
				"https://portfolio-produtos-feltec.onrender.com/api/Users/forgot-password",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				},
			);

			if (!res.ok) {
				const data = await res.json();
				alert(data.error || "Erro ao enviar senha temporária");
				return;
			}

			const data = await res.json();
			alert(data.message || `Senha temporária enviada para ${email}`);
			setEmail("");
		} catch (err) {
			console.error(err);
			alert("Erro de conexão com o servidor");
		}
	};

	// Função para exibir alerta de erro
	const triggerError = () => {
		setShowError(true);
		setErrorKey((prev) => prev + 1);

		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			setShowError(false);
			timeoutRef.current = null;
		}, ERROR_DURATION);
	};

	return (
		<AuthLayout>
			<div className="flex flex-col gap-6">
				{/* Cabeçalho */}
				<div className="mt-24">
					<h1 className="text-nc-base-600 font-bold text-2xl">
						Recuperar senha
					</h1>
					<span className="text-nc-base-800 font-semibold text-lg">
						Informe seu email para receber uma senha temporária de acesso e
						recuperação de senha.
					</span>
				</div>

				{/* Input */}
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-lg text-sunset">Email de acesso:</h2>
					<AuthInput
						id="email"
						label="Email"
						placeholder="ex.: email@empresa.com.br"
						register={register("email")}
						error={errors.email?.message}
					/>
				</div>

				{/* Alerta de erro */}
				<ErrorAlert
					visible={showError}
					keyId={errorKey}
					duration={ERROR_DURATION}
				/>
			</div>

			{/* Botões */}
			<div className="mt-4">
				<Button
					onClick={handleSendTemporaryPassword}
					variant="sunset"
					className="w-full"
				>
					Enviar senha temporária
				</Button>

				<div className="flex items-center justify-center m-4">ou</div>

				<Button
					onClick={() => router.push("/login")}
					variant="adventure"
					className="w-full"
				>
					Voltar ao login
				</Button>
			</div>
		</AuthLayout>
	);
}
