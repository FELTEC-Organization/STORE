import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableLoadingProps {
  columnCount: number
  rowCount?: number
}

export function DataTableLoading({
  columnCount,
  rowCount = 10,
}: DataTableLoadingProps) {
  return (
    <Table>
      <TableHeader>
        {Array.from({ length: 1 }).map((_, i) => (
          <TableRow key={i} className="hover:bg-transparent">
            {Array.from({ length: columnCount }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-6 w-full" />
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, i) => (
          <TableRow key={i} className="hover:bg-transparent">
            {Array.from({ length: columnCount }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
