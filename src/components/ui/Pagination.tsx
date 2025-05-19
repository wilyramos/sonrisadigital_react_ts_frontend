interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

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

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pageNumbers = getPageNumbers(currentPage, totalPages);

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                ‹
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition
            ${currentPage === page
                            ? 'bg-teal-500 text-white border-teal-500'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                ›
            </button>
        </div>
    );
}
