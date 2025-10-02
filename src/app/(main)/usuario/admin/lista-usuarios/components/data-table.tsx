import { useEffect, useState } from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableLoading } from "./data-table-skeleton";
import { showToast } from "@/components/toast/showToast";
import { getColumns } from "./columns";
import { getUsers, User } from "../services/listUser.services";

type DataTableProps = {
  filters: {
    value?: string;
  };
  onSelectionChange?: (selectedItems: User[]) => void;
  onRefresh?: (refetchTable: () => void) => void;
};

export function DataTable({ filters, onSelectionChange }: DataTableProps) {
  const { value } = filters;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  const hasNextPage = pagination.pageIndex + 1 < totalPages;
  const hasPreviousPage = pagination.pageIndex > 0;

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: false },
  ]);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (page: number) => {
    setPagination((old) => ({ ...old, pageIndex: page - 1 }));
  };

  const getList = async () => {
    setLoading(true);
    try {
      const resp = await getUsers();

      setData(resp.items);
      setTotalItems(resp.totalItems);
      setRowSelection({});
    } catch (error) {
      showToast({
        type: "error",
        title: "Algo deu errado",
        description: String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [pagination, sorting, value]);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectionChange(selectedData);
    }
  }, [rowSelection]);

  const columns = getColumns(getList);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    rowCount: totalItems,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <ScrollArea className="h-[calc(100vh-310px)]">
          {loading ? (
            <DataTableLoading
              columnCount={columns.length}
              rowCount={pagination.pageSize}
            />
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </div>

      <DataTablePagination
        table={table}
        pageSizeOptions={[10, 25, 50, 100]}
        totalItems={totalItems}
        currentPage={pagination.pageIndex + 1}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
