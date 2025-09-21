import type { Table } from "@tanstack/react-table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { PaginationDemo } from "@/components/pagination/pagination";

export interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	totalItems?: number;
	pageSizeOptions?: number[];
	showRowCount?: boolean;
	currentPage: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	onPageChange: (page: number) => void;
}

export function DataTablePagination<TData>({
	table,
	totalItems,
	pageSizeOptions = [10, 20, 30, 40, 50],
	showRowCount = true,
	currentPage,
	totalPages,
	hasNextPage,
	hasPreviousPage,
	onPageChange,
}: DataTablePaginationProps<TData>) {
	// const { t } = useTranslation();

	return (
		<div className="flex w-full items-center">
			<div className="flex-1">
				{showRowCount && (
					<div className="text-muted-foreground text-sm">
						{table.getFilteredRowModel().rows.length} {("linhas")}
					</div>
				)}
			</div>

			{/* Pagination shadcn */}
			<div className="flex-3 pl-15 flex justify-center">
				<PaginationDemo
					currentPage={currentPage}
					totalPages={totalPages}
					hasNextPage={hasNextPage}
					hasPreviousPage={hasPreviousPage}
					onPageChange={onPageChange}
				/>
			</div>

			{/* Results per page */}
			<div className="flex flex-1 justify-end">
				<div className="flex flex-row items-center gap-6">
					{/* Page number information */}
					<p
						className="flex-1 whitespace-nowrap text-muted-foreground text-sm"
						aria-live="polite"
					>
						{("Página")}{" "}
						<span className="text-nc-base-primary font-semibold">
							{table.getState().pagination.pageIndex + 1}
						</span>{" "}
						{("de")}{" "}
						<span className="text-nc-base-primary font-semibold">
							{totalPages}
						</span>
					</p>
					<Select
						value={table.getState().pagination.pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
						aria-label={("Resultados por página")}
					>
						<SelectTrigger
							id="results-per-page"
							className="w-fit cursor-pointer whitespace-nowrap text-primary max-[1582px]:h-9"
						>
							<SelectValue
								className="text-primary"
								placeholder="Selecionar número de resultados"
							/>
						</SelectTrigger>
						<SelectContent>
							{pageSizeOptions.map((pageSize) => (
								<SelectItem
									className="cursor-pointer text-nc-base-primary"
									key={pageSize}
									value={pageSize.toString()}
								>
									<span className="text-nc-base-primary">
										{pageSize} / {("página")}
									</span>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
