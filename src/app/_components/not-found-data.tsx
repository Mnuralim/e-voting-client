import React from "react";

export const NotFoundData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-gray-800 rounded-lg bg-[#1A1A1A]">
      <svg
        className="w-16 h-16 text-gray-600 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <p className="text-center text-gray-400 text-lg">Data tidak ditemukan</p>
      <p className="text-center text-gray-500 mt-2">
        Coba gunakan filter atau kata kunci pencarian yang berbeda
      </p>
    </div>
  );
};
