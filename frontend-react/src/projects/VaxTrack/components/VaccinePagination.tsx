import { Icon } from "@iconify/react";

interface PaginationProps{
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    numberOfPages: number
}

const VaccinePagination = ({ currentPage, setCurrentPage, numberOfPages}: PaginationProps) => {
    return(
        <>
            {/**Desktop Pagination */}
            <div className="hidden sm:flex gap-2 justify-center items-center mt-6">
                <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)} className="px-3 py-1.5 rounded text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150">
                    <Icon icon="akar-icons:arrow-left"></Icon>
                </button>
                {Array.from({length: numberOfPages!}, (_, index) => (
                    <div key={`page-${index+1}`}>
                        <button onClick={() => setCurrentPage(index)} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${index === currentPage ? "bg-blue-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                            {index + 1}
                        </button>
                    </div>
                ))}
                <button disabled={currentPage === numberOfPages! - 1} onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-1.5 rounded text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150">
                    <Icon icon="akar-icons:arrow-right"></Icon>
                </button>
            </div>
            
            {/**Mobile Pagination */}
            <div className="flex sm:hidden gap-2 justify-center items-center mt-6">
                <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)} className="px-3 py-1.5 rounded text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150">
                    <Icon icon="akar-icons:arrow-left"></Icon>
                </button>
                {Array.from({ length: Math.min(3, numberOfPages!)}, (_, index) => {
                    const startPage = Math.min(Math.max(currentPage - 1, 0), numberOfPages! - 3);
                    const pageIndex = startPage + index;
                    return(
                        <button key={`mobilePage-${index}`} onClick={() => setCurrentPage(pageIndex)} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${pageIndex === currentPage? "bg-blue-500 text-white": "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                            {pageIndex + 1}
                        </button>
                    );
                })}
                <button disabled={currentPage === numberOfPages! - 1} onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-1.5 rounded text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150">
                    <Icon icon="akar-icons:arrow-right"></Icon>
                </button>
            </div>
        </>
    );
}

export default VaccinePagination;