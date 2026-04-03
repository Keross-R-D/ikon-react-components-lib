import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function DataTablePagination({ totalPages, currentPage }: PaginationProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    // Create a new URLSearchParams instance from the current ones
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("page", newPage.toString());
    
    // React Router navigation instead of Next.js router.push
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-9 px-3 py-1 text-sm font-medium border border-border rounded-md bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-sm text-muted-foreground px-2">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{Math.max(totalPages, 1)}</span>
      </span>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-9 px-3 py-1 text-sm font-medium border border-border rounded-md bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}