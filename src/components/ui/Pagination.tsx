interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function getPageNumbers (currentPage: number, totalPages: number): number[] {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show

    let startPage: number;
    let endPage: number;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const halfMaxVisible = Math.floor(maxVisiblePages / 2);
        if (currentPage <= halfMaxVisible) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + halfMaxVisible >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfMaxVisible;
            endPage = currentPage + halfMaxVisible;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return pageNumbers;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = getPageNumbers(currentPage, totalPages);
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
                Anterior
            </button>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === page ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    );
};
