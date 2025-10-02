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
        title={"Nome"}
      />
    ),
    cell: ({ row }) => {
      return <span className="font-normal ml-4">{row.getValue("name")}</span>;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="ml-4" title={"Email"} />
    ),
    cell: ({ row }) => {
      return <span className="font-normal ml-4">{row.getValue("email")}</span>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="ml-4"
        title={"Tipo de usuário"}
      />
    ),
    cell: ({ row }) => {
      return <span className="font-normal ml-4">{row.getValue("role")}</span>;
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
