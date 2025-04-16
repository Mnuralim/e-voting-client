import React from "react";

export const NotFoundData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-[3px] border-[#111111] bg-[#12E193] shadow-[4px_4px_0px_#111111] mx-auto my-6 relative">
      <div className="absolute -top-4 right-4 bg-[#FFE962] border-[3px] border-[#111111] px-3 py-1 rotate-[2deg] shadow-[2px_2px_0px_#111111] z-10">
        <span className="font-bold text-black text-sm">KOSONG</span>
      </div>

      <svg
        className="w-16 h-16 text-black mb-4 p-2 border-[3px] border-[#111111] bg-white shadow-[3px_3px_0px_#111111]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>

      <h3 className="text-center text-black font-bold text-xl mb-2">
        Data tidak ditemukan
      </h3>

      <div className="w-full max-w-sm mx-auto">
        <p className="text-center text-black text-base font-medium mt-2 p-2 border-[3px] border-dashed border-[#111111] bg-[#FFFF00] shadow-[2px_2px_0px_#111111]">
          Coba gunakan filter atau kata kunci pencarian yang berbeda
        </p>
      </div>
    </div>
  );
};
