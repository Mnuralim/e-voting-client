import React, { useEffect } from "react";
import { CloseIcon } from "./svg";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.classList.remove("overflow-hidden");
      onClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-md transition-all duration-300">
      <div className="modal-content relative bg-[#111111] border border-[#FFFF00] w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90vh] flex flex-col rounded-lg shadow-2xl shadow-[#FFFF00]/20 overflow-hidden transform scale-100 transition-transform duration-300">
        <div className="flex justify-between items-center p-4 border-b border-[#FFFF00]/30">
          <div className="w-3 h-3 rounded-full bg-[#FFFF00]"></div>
          <button
            type="button"
            className="text-[#FFFF00] cursor-pointer hover:text-white transition-colors duration-200"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
        <div className="p-4 border-t border-[#FFFF00]/30 flex justify-end">
          <button
            type="button"
            className="bg-[#111111] text-[#FFFF00] cursor-pointer border border-[#FFFF00] hover:bg-[#FFFF00] hover:text-[#111111] px-4 py-2 rounded-md font-medium transition-all duration-200"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
