import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-t-transparent border-[#FFFF00] rounded-full animate-spin animate-delay-150"></div>
      </div>
    </div>
  );
};
