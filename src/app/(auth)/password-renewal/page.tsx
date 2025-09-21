"use client";

import AuthLayout from "@/app/(auth)/password-renewal/components/authLayout";
import AuthInput from "@/app/(auth)/login/components/authInput";
import ErrorAlert from "@/app/(auth)/login/components/errorAlert";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PasswordRenewPage() {
	const router = useRouter();

	const [showError, setShowError] = useState(false);
	const [errorKey, setErrorKey] = useState(0);
	const ERROR_DURATION = 4000;
	const timeoutRef = useRef<number | null>(null);

	// Função de renovação de senha (mock por enquanto)
	const handleRenewPassword = () => {
		// Aqui você pode colocar a chamada para o serviço de renovação de senha futuramente.
		triggerError();
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
				<div className="mt-24">
					<h1 className="text-nc-base-600 font-bold text-2xl">{("Title")}</h1>
					<span className="text-nc-base-800 font-semibold text-lg">
						{("Subtitle")}
					</span>
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="text-nc-neutral-900 font-medium text-base">
						{("Instruction")}
					</h2>
					<AuthInput
						id="email"
						label={("emailLabel")}
						placeholder="Ex.: email@empresa.com.br"
					/>
				</div>

				<ErrorAlert
					visible={showError}
					keyId={errorKey}
					duration={ERROR_DURATION}
				/>
			</div>

			<div>
				<Button
					onClick={handleRenewPassword}
					variant="primary"
					className="w-full"
				>
					{("RePassword")}
				</Button>

				<div className="flex items-center justify-center m-4">ou</div>

				<Button
					onClick={() => router.push("/login")}
					variant="outline"
					className="w-full bg-nc-neutral-50"
				>
					{("Sign in")}
				</Button>
			</div>
		</AuthLayout>
	);
}
