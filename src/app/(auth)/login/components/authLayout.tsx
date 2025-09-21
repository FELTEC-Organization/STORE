import type { ReactNode } from "react";

interface AuthLayoutProps {
	children: ReactNode;
}

// region Base Auth Layouts
// Layout base usado em (login, register and passwordRenew)
export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="flex w-full min-h-screen">
			{/* Imagem do lado esquerdo */}
			<div
				className="w-1/2 bg-cover bg-center"
				style={{ backgroundImage: "url('/bg-login.jpg')" }}
			/>

			{/* Conteúdo (formulário) */}
			<div className="w-1/2 bg-nc-base-50 dark:bg-background px-10 pt-8 pb-6 3xl:pb-8 flex flex-col justify-between overflow-auto">
				{children}
			</div>
		</div>
	);
}
