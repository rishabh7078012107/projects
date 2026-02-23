import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Agar koi items hi nahi → pagination mat dikhana
  if (totalPages === 0) return null;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-8 h-8 rounded-full text-white font-bold transition-all ${
            currentPage === index + 1
              ? "bg-purple-700"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
