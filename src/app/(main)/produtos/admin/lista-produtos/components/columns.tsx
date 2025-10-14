import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { RoutesActionsCell } from "./data-table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageOff } from "lucide-react";

export const getColumns = (onRefresh: () => void): ColumnDef<any>[] => [
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
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Foto" />
    ),
    cell: ({ row }) => {
      const photoBase64 = row.getValue("imageUrl") as string | null;

      return (
        <div className="w-20 h-20 overflow-hidden rounded-md flex items-center justify-center bg-gray-200 dark:bg-zinc-800">
          {photoBase64 ? (
            <img
              src={`data:image/jpeg;base64,${photoBase64}`}
              alt="Image"
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="text-zinc-600 dark:text-zinc-200">
              <ImageOff className="w-6 h-6" />
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="ml-4"
        title="Produtos"
      />
    ),
    cell: ({ row }) => (
      <span className="font-normal ml-4">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="ml-4" title="Preço" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("price");
      const formattedPrice =
        value != null
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
      <DataTableColumnHeader column={column} className="ml-4" title="Estoque" />
    ),
    cell: ({ row }) => (
      <span className="font-normal ml-4">{row.getValue("stock")}</span>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="ml-4"
        title="Categoria"
      />
    ),
    cell: ({ row }) => (
      <span className="font-normal ml-4">{row.getValue("category")}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "action",
    header: () => <div className="mr-6 flex justify-end">Ações</div>,
    cell: ({ row }) => <RoutesActionsCell row={row} onRefresh={onRefresh} />,
  },
];
