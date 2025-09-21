import toast from "react-hot-toast";
import { X, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import type { ToastTypes } from "./types";

export function showToast({ type, title, description, footer }: ToastTypes) {
	const activeToasts = new Set<string>();
	const id = `${type}-${title}-${description}`;

	// Se já existe um id, não mostra alerta de novo
	if (activeToasts.has(id)) return;
	activeToasts.add(id);
	toast.custom(
		(t) => (
			<div
				className={`transform transition-all duration-300 ${
					t.visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
				}`}
			>
				<CustomToast
					id={t.id}
					type={type}
					title={title}
					description={description}
					footer={footer}
				/>
			</div>
		),
		{
			id,
			duration: 5000,
		},
	);

	return id;
}

function CustomToast({
	id,
	type,
	title,
	description,
	footer,
}: ToastTypes & { id: string }) {
	const [progress, setProgress] = useState(100);
	// const { t } = useTranslation();

	useEffect(() => {
		let dismissed = false;

		const interval = setInterval(() => {
			if (dismissed) return;
			setProgress((prev) => Math.max(0, prev - 2));
		}, 100);

		const timeout = setTimeout(() => {
			toast.dismiss(id);
		}, 5000);

		return () => {
			dismissed = true;
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [id]);

	return (
		<div
			className={`overflow-hidden relative flex max-w-lg items-start gap-4 rounded-lg border border-gray-200 ${type === "success" ? "bg-green-100 dark:border-gray-700 dark:bg-gray-900" : "bg-[#FECACA] dark:border-gray-700 dark:bg-gray-900"} px-4 py-5 shadow-lg`}
		>
			{type === "success" ? (
				<CircleCheck className="text-[#00A93B] place-self-center" size={24} />
			) : (
				<CircleX className="text-destructive place-self-center" size={24} />
			)}
			<div className="flex-1">
				<p className="font-semibold text-sm leading-5 text-nc-neutral-900 dark:text-gray-400">
					{title}
				</p>
				{description && (
					<p className="text-nc-neutral-900 font-normal leading-5 text-sm dark:text-gray-400">
						{description}
					</p>
				)}
				{footer ? <div>{footer}</div> : <></>}
			</div>
			<button
				onClick={() => toast.dismiss(id)}
				className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
				type="button"
			>
				<X size={20} />
			</button>
			<div
				className="linear absolute bottom-0 left-0 h-1 bg-[#00A93B] transition-all duration-100"
				style={{
					width: `${progress}%`,
					backgroundColor: type === "error" ? "#ef4444" : "#10b981",
				}}
			/>
		</div>
	);
}
