import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationDemoProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationDemo({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationDemoProps) {
  const pages = [];

  // Mostra até 5 botões
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem >
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (hasPreviousPage) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {start > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={e => { e.preventDefault(); onPageChange(1); }}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {start > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === currentPage}
              onClick={(e) => {
                e.preventDefault();
                if (p !== currentPage) onPageChange(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {end < totalPages && (
          <PaginationItem>
            <PaginationLink href="#" onClick={e => { e.preventDefault(); onPageChange(totalPages); }}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (hasNextPage) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}