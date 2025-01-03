import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <Pagination className="pagination-component mt-4">
      <PaginationContent className="text-[0.775rem] flex flex-row items-center gap-1">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            } text-[0.775rem] bg-background border-primary/20 hover:bg-primary/5 hover:border-primary/30`}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum, index) =>
          pageNum === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis className="text-[0.775rem]" />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === currentPage}
                onClick={() => onPageChange(pageNum)}
                className={`cursor-pointer text-[0.775rem] ${
                  pageNum === currentPage
                    ? "bg-background border-primary/30 pointer-events-none"
                    : "bg-background border-primary/20 hover:bg-primary/5 hover:border-primary/30"
                }`}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`${
              currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
            } text-[0.775rem] bg-background border-primary/20 hover:bg-primary/5 hover:border-primary/30`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};