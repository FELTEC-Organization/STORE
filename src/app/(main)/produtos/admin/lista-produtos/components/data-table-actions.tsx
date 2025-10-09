"use client";

import { Trash2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/toast/showToast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteProduct } from "../services/listProduct.services";

export function RoutesActionsCell({ row, onRefresh }: { row: any; onRefresh: () => void }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleDeleteAction = async () => {
		setLoading(true);
		try {
			const resp = await deleteProduct(String(row.original.id));

			if (!resp.success) {
				showToast({ type: "error", title: "Algo deu errado", description: String(resp.errors) });
				return;
			}

			showToast({ type: "success", title: "Sucesso", description: "Produto deletado com sucesso!" });
			setOpen(false);
			onRefresh(); // 🔥 Atualiza a tabela
		} catch (error: any) {
			showToast({ type: "error", title: "Erro inesperado", description: error?.message ?? "Ocorreu um erro inesperado." });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="text-nc-base-600 flex justify-end mr-4">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="hover:text-nc-base-400"
						onClick={() => router.push(`/produtos/admin/editar-produto/${row.original.id}`)}
					>
						<PencilLine />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Editar</TooltipContent>
			</Tooltip>

			<Dialog open={open} onOpenChange={setOpen}>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button variant="ghost" className="hover:text-nc-base-400" size="icon">
								<Trash2 />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>Deletar</TooltipContent>
				</Tooltip>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Tem certeza que deseja deletar este produto?</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
						<Button onClick={handleDeleteAction} variant="destructive" disabled={loading}>
							{loading ? "Deletando..." : "Deletar"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

