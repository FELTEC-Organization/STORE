interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶
      </button>
    </div>
  );
}
