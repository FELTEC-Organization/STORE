import { Trash2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/toast/showToast";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { deleteUser } from "../services/listUser.services";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function RoutesActionsCell({
	row,
	onRefresh,
}: {
	row: any;
	disableActions?: boolean;
	onRefresh: () => void;
}) {
	// const { t } = useTranslation();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const handleDeleteAction = async () => {
		const resp = await deleteUser(String(row.original.id));

		if (!resp.success) {
			showToast({
				type: "error",
				title: "Algo deu errado",
				description: (String(resp.errors)),
			});
			return;
		}

		showToast({
			type: "success",
			title: "Succeso",
			description: "Usuário deletado com sucesso",
		});

		setOpen(false);
		onRefresh();
	};

	return (
		<div className="text-nc-base-600 flex justify-end mr-4">
			{/* Botão de Editar */}
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="hover:text-nc-base-400"
						onClick={() =>
							router.push(`editar-usuario/${row.original.id}`)
						}
					>
						<PencilLine />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Editar</TooltipContent>
			</Tooltip>

			{/* Modal de Deletar */}
			<Dialog open={open} onOpenChange={setOpen}>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								className="hover:text-nc-base-400"
								size="icon"
							>
								<Trash2 />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>Deletar</TooltipContent>
				</Tooltip>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Tem certeza que deseja deletar este produto?
						</DialogTitle>
					</DialogHeader>

					<DialogFooter>
						<Button variant="outline" onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button
							onClick={handleDeleteAction}
							variant="destructive"
						>
							Deletar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}