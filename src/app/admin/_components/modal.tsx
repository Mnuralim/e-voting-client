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
      <div className="modal-content relative bg-white border-[4px] border-[#111111] w-11/12 md:w-4/5 lg:w-3/5 h-auto max-h-[90vh] flex flex-col rounded-none shadow-[8px_8px_0px_#111111] overflow-hidden transform scale-100 transition-transform duration-300 rotate-[-0.5deg] transform-gpu">
        <div className="flex justify-between items-center p-4 border-b-[3px] border-[#111111] bg-[#FF3A5E]">
          <div className="w-4 h-4 rounded-none border-[2px] border-[#111111] bg-[#FFFF00] rotate-[15deg] transform-gpu"></div>
          <h2 className="font-bold text-lg text-[#111111] absolute left-1/2 transform -translate-x-1/2 rotate-[-1deg] transform-gpu">
            FORM KANDIDAT
          </h2>
          <button
            type="button"
            className="text-[#111111] cursor-pointer hover:rotate-[15deg] transition-transform duration-200 transform-gpu"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
        <div className="p-4 border-t-[3px] border-[#111111] flex justify-end bg-[#FFE962] rotate-[0.3deg] transform-gpu">
          <button
            type="button"
            className="bg-white text-[#111111] cursor-pointer border-[3px] border-[#111111] hover:bg-[#12E193] px-4 py-2 font-bold transition-all duration-200 shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none rotate-[-1deg] transform-gpu"
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
