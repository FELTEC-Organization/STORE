import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
	label: string;
	placeholder?: string;
	register?: UseFormRegisterReturn;
	error?: string;
}

// Componente de Input de Senha com botão para mostrar/ocultar
export default function PasswordInput({
	label,
	placeholder,
	register,
	error,
}: PasswordInputProps) {
	const [show, setShow] = useState(false);

	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor="senha"
				className="font-medium"
			>
				{label}
			</label>
			<div className="relative">
				<Input
					id="senha"
					type={show ? "text" : "password"}
					placeholder={placeholder ? placeholder : "*********"}
					className="pr-10 bg-adventure/20 dark:bg-adventure/30"
					{...register}
				/>
				<button
					type="button"
					onClick={() => setShow((prev) => !prev)}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					aria-label="Mostrar ou ocultar senha"
				>
					{show ? <EyeOff size={16} /> : <Eye size={16} />}
				</button>
			</div>
			{error && (
				<span className="text-sm text-red-500 dark:text-red-400 mt-1">
					{error}
				</span>
			)}
		</div>
	);
}
