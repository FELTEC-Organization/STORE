import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Filter, XCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
// import type { FilterProps } from "../types/acessRoutesContract";
import { useTranslation } from "react-i18next";
import { showToast } from "@/components/toast/showToast";
// import { listRoutesService } from "../services/accessRoutes.service";
// import type { ListSchedulesParamsResponse } from "../types/schedulesContract";

type FilterDialogProps = any & {
	onApplyFilters: () => void;
};

export function FilterDialog({
	schedule,
	setSchedule,
	status,
	setStatus,
	onApplyFilters,
}: FilterDialogProps) {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();
	const [schedules, setSchedules] = useState<any[]>([]);
	// const getSchedules = async () => {
	// 	const resp = await listRoutesService.listSchedules({
	// 		// biome-ignore lint/complexity/noUselessTernary: <explanation>
	// 		value: undefined,
	// 		isEnabled: true,
	// 		currentPage: 1,
	// 		pageSize: 100,
	// 		orderField: "id",
	// 		orderType: "Desc",
	// 	});
	// 	if (!resp.value) {
	// 		showToast({
	// 			type: "error",
	// 			title: t("Something went wrong"),
	// 			description: t(String(resp.errors)),
	// 		});
	// 		return;
	// 	}
	// 	setSchedules(resp.value.items);
	// };

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// useEffect(() => {
	// 	getSchedules();
	// }, [open, setOpen]);

	const handleClear = () => {
		setSchedule("");
		setStatus("1");
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* Botão externo que dispara o Dialog */}
			<DialogTrigger asChild>
				<Button variant="outline">
					<Filter className="w-4 h-4 mr-2" />
					{t("Filter")}
				</Button>
			</DialogTrigger>

			{/* Conteúdo do Dialog */}
			<DialogContent className="max-w-md">
				<div className="space-y-4">
					<DialogTitle>{t("Filter")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("Filter options for access routes")}
					</DialogDescription>
					{/* Select Equipment */}
					<div className="space-y-2">
						<Label htmlFor="schedule">{t("Schedules")}</Label>
						<Select value={schedule} onValueChange={setSchedule}>
							<SelectTrigger id="schedule">
								<SelectValue placeholder={t("Filter schedules")} />
							</SelectTrigger>
							<SelectContent>
								{schedules?.map((item) => (
									<SelectItem key={item.id} value={String(item.id)}>
										{item.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{/* Select Status */}
					<div className="space-y-2">
						<Label htmlFor="status">Status</Label>
						<Select value={status} onValueChange={setStatus}>
							<SelectTrigger id="status">
								<SelectValue placeholder={t("Filter status")} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="-">{t("All")}</SelectItem>
								<SelectItem value="1">{t("Active")}</SelectItem>
								<SelectItem value="0">{t("Inactive")}</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Buttons Cancel or Confirm */}
					<div className="flex justify-end gap-2 pt-4">
						<Button
							variant="outlineDestructive"
							onClick={() => {
								handleClear();
								setOpen(false);
							}}
						>
							<XCircle className="w-4 h-4 mr-2" />
							Cancelar
						</Button>

						<Button
							variant="primary"
							onClick={() => {
								onApplyFilters();
								setOpen(false);
							}}
						>
							<CheckCircle2 className="w-4 h-4 mr-2" />
							Confirmar
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
