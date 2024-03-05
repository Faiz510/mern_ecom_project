import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface PaginationProp {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  getPageNumbers: () => number[];
}

const Pagination: React.FC<PaginationProp> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  getPageNumbers,
}) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // scorll to when pages changes
  }, [pathname, currentPage]);

  const arrowBtnCl =
    "text-black bg-custom-primary text-med rounded-full w-10 h-10 lg:w-10 lg:h-10 p-1 mx-1 md:p-1 md:mx-1  flex items-center justify-center opacity-90"; // style for arrow btns

  const whileHoverOnBtnsAnimation = {
    opacity: 0.7,
    scale: 1.05,
    color: "white",
    backgroundColor: "#9A9A9A",
    transition: { duration: 0.3, type: "just", stiffness: 800 },
  };

  // displaying page number function
  const displayingPageNumbers = (pageNumber: number) => {
    return (
      <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        className={`${
          currentPage === pageNumber
            ? "bg-custom-font_primary text-white scale-110"
            : ""
        } focus:outline-none text-black bg-custom-primary text-med rounded-full w-10 h-10 lg:w-10 lg:h-10 p-1 mx-1 md:p-1 md:mx-1 opacity-90 hover:bg-[#9A9A9A] hover:text-white hover:opacity-70 transform hover:scale-105 transition duration-300 ease-in-out`}
        disabled={currentPage === pageNumber}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className="bottom-0 flex items-center  md:gap-4 w-full justify-center mt-10 mb-5 sm:gap-1">
      {/* Pagination controls */}

      <motion.button
        whileHover={whileHoverOnBtnsAnimation}
        className={`${currentPage === 1 ? "hidden" : arrowBtnCl} `}
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
      >
        <FaArrowLeft />
      </motion.button>

      {/* Display current page and total pages */}
      <div>
        {getPageNumbers().map((pageNumber) =>
          displayingPageNumbers(pageNumber)
        )}
      </div>

      <motion.button
        whileHover={whileHoverOnBtnsAnimation}
        className={`${currentPage === totalPages ? "hidden" : arrowBtnCl}`}
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
        <FaArrowRight />
      </motion.button>
    </div>
  );
};

export default Pagination;
