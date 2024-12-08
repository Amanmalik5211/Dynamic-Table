import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  // Manage screen width for responsive behavior
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pagesToShow = getDisplayedPages();
    setVisiblePages(pagesToShow);
  }, [screenWidth, currentPage, totalPages]);

  // Get the pages to be displayed based on the screen size and current page
  const getDisplayedPages = () => {
    const pages = [];
    let startPage = Math.floor((currentPage - 1) / getPageRangeSize()) * getPageRangeSize() + 1;
    let endPage = Math.min(startPage + getPageRangeSize() - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Determine the range size based on screen size
  const getPageRangeSize = () => {
    if (screenWidth >= 1280) {
      // For lg and xlg screens, show 10 pages
      return 10;
    } else if (screenWidth >= 1024) {
      // For medium screens, show 5 pages
      return 5;
    } else {
      // For small screens, show 3 pages
      return 3;
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300"
      >
        Previous
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg text-sm ${
            page === currentPage
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
