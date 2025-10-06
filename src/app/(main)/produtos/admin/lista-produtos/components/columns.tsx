import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { RoutesActionsCell } from "./data-table-actions";
import { Checkbox } from "@/components/ui/checkbox";

// function t(text: string) {
// 	const { t } = useTranslation();
// 	return t(text);
// }

export const getColumns = (onRefresh: () => void): ColumnDef<any>[] => [
  // Seleção de linhas
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(val: unknown) =>
          table.toggleAllPageRowsSelected(!!val)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val: unknown) => row.toggleSelected(!!val)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="ml-4"
        title={"Produtos"}
      />
    ),
    cell: ({ row }) => {
      return <span className="font-normal ml-4">{row.getValue("name")}</span>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="ml-4" title={"Preço"} />
    ),
    cell: ({ row }) => {
      const value = row.getValue("price");
      const formattedPrice =
        value !== undefined && value !== null
          ? Number(value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "-";

      return <span className="font-normal ml-4">{formattedPrice}</span>;
    },
  },

  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="ml-4"
        title={"Estoque"}
      />
    ),
    cell: ({ row }) => {
      return <span className="font-normal ml-4">{row.getValue("stock")}</span>;
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="ml-4"
        title={"Categoria"}
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-normal ml-4">{row.getValue("category")}</span>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "action",
    header: () => <div className="mr-6 flex justify-end">{"Ações"}</div>,
    cell: ({ row }) => (
      <RoutesActionsCell
        row={row}
        onRefresh={onRefresh}
        // disableActions={disabledActions}
      />
    ),
  },
];
