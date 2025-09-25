import { Input } from "@/components/ui/input";
import type { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps {
	id: string;
	label: string;
	type?: string;
	placeholder?: string;
	register?: UseFormRegisterReturn;
	error?: string;
}

// region AuthInput
export default function AuthInput({
	id,
	label,
	type = "text",
	placeholder,
	register,
	error,
}: AuthInputProps) {
	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={id}
				className="text-nc-neutral-900 dark:text-nc-neutral-200 font-medium"
			>
				{label}
			</label>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className={`bg-adventure/20 dark:bg-adventure/30 ${
					error ? "border-red-500" : ""
				}`}
				{...register}
			/>
			{error && (
				<span className="text-sm text-red-500 dark:text-red-400 mt-1">
					{error}
				</span>
			)}
		</div>
	);
}
