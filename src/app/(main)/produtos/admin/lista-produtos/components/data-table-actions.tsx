import { Trash2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
import { showToast } from "@/components/toast/showToast";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { fetchProducts } from "../services/adminProducts.service";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
	const [allUserProfiles, setAllUserProfiles] = useState<any[]>([]);
	const [newProfileId, setNewProfileId] = useState<string | null>(null);
	const hasUsers = row.original.hasUsers;

	const fetchUserProfiles = async () => {
		const resp = await fetchProducts.list({ currentPage: 1, pageSize: 999, orderField: 'id', orderType: 'asc', isEnabled: true });
		if (resp.sucess && resp.value?.items) {
			setAllUserProfiles(resp.value.items);
		} else {
			showToast({
				type: "error",
				title: "Falha ao buscar produtos",
				description: (String(resp.errors)),
			});
		}
	};

	const handleDeleteAction = async () => {
		if (hasUsers && filteredProfiles.length > 0 && !newProfileId) {
			showToast({
				type: "error",
				title: "Seleção necessária",
				description: "Por favor, selecione algo.",
			});
			return;
		}

		const resp = await userProfilesService.delete(String(row.original.id), newProfileId);

		if (!resp.sucess) {
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
			description: "Produto deletado com sucesso",
		});

		setOpen(false);
		onRefresh();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (open && hasUsers) {
			fetchUserProfiles();
		}
		if (!open) {
			setNewProfileId(null);
			setAllUserProfiles([]);
		}
	}, [open, hasUsers]);

	const filteredProfiles = allUserProfiles.filter(
		(profile) => profile.id !== row.original.id
	);

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
							router.push(`/users/user-profiles/edit-profile/${row.original.id}`)
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
							disabled={hasUsers && filteredProfiles.length > 0 && !newProfileId}
						>
							Deletar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}