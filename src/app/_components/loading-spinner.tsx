import React from "react";

export const LoadingSpinner = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
    >
      <div className="relative w-32 h-32 border-[6px] border-[#111111] bg-white shadow-[8px_8px_0px_#111111] rotate-[3deg]">
        <div className="absolute -top-5 -left-4 bg-[#FF3A5E] border-[3px] border-[#111111] px-3 py-1 shadow-[2px_2px_0px_#111111] rotate-[-4deg]">
          <span className="font-bold text-white text-sm">LOADING</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-24 h-24 border-[5px] border-[#111111] border-t-[#FFFF00] rounded-none animate-spin"></div>
          <div
            className="absolute w-16 h-16 border-[5px] border-[#111111] border-t-[#12E193] rounded-none animate-spin animate-delay-150"
            style={{ animationDirection: "reverse" }}
          ></div>
          <div className="absolute w-6 h-6 bg-[#111111]"></div>
        </div>
      </div>
    </div>
  );
};
