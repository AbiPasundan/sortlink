import { FiChevronRight } from "react-icons/fi"; 
import { FiChevronLeft } from "react-icons/fi"; 
import { useState } from "react";

function DashboardPagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    return (
        <div className="flex items-center justify-between mt-8">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition" >
                <FiChevronLeft />
                Prev Page
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-semibold text-sm">
                    {currentPage}
                </span>
                <span className="text-gray-400">of</span>
                <span className="font-semibold text-gray-600">{totalPages}</span>
            </div>

            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition" >
                Next Page
                <FiChevronRight />
            </button>
        </div>
    )
}

export default DashboardPagination