"use client";

import AuthLayout from "@/app/(auth)/password-renewal/components/authLayout";
import AuthInput from "@/app/(auth)/login/components/authInput";
import ErrorAlert from "@/app/(auth)/login/components/errorAlert";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PasswordRenewPage() {
	const router = useRouter();

	const [showError, setShowError] = useState(false);
	const [errorKey, setErrorKey] = useState(0);
	const ERROR_DURATION = 4000;
	const timeoutRef = useRef<number | null>(null);

	const [email, setEmail] = useState("");

	// Função de envio de senha temporária (mock)
	const handleSendTemporaryPassword = () => {
		if (!email) {
			triggerError();
			return;
		}

		// Aqui você chamaria sua API real para enviar a senha temporária
		alert(`Senha temporária enviada para ${email}`);
		setEmail("");
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
						Informe seu email para receber uma senha temporária de acesso e recuperação de senha.
					</span>
				</div>

				{/* Input */}
				<div className="flex flex-col gap-4">
					<h2 className="text-nc-neutral-900 font-medium text-base">
						Email de acesso
					</h2>
					<AuthInput
						id="email"
						label="Email"
						placeholder="ex.: email@empresa.com.br"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
