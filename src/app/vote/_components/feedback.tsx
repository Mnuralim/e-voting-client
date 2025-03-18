import Link from "next/link";
import React from "react";

interface FeedbackProps {
  txHash: string;
}

export const Feedback = ({ txHash }: FeedbackProps) => {
  return (
    <div className="bg-[#1A1A1A] border-2 border-[#FFFF00] w-full rounded-lg p-6 my-8 max-w-md mx-auto text-center shadow-lg shadow-[#FFFF00]/10">
      <div className="flex justify-center mb-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="#1A1A1A"
            stroke="#FFFF00"
            strokeWidth="2"
          />
          <path
            d="M8 12L10.5 14.5L16 9"
            stroke="#FFFF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-[#FFFF00] font-bold text-xl mb-3">
        Terimakasih anda sudah melakukan vote!
      </h3>
      <p className="text-white mb-4">
        Partisipasi Anda sangat berarti untuk kemajuan bersama.
      </p>

      <div className="bg-[#111111] p-3 rounded-md border border-[#FFFF00]/30 mb-4">
        <p className="text-white text-sm mb-1">Transaction Hash:</p>
        <div className="flex items-center justify-between">
          <Link
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFFF00] text-xs truncate hover:underline flex-grow"
            title="View transaction in explorer"
          >
            {txHash}
          </Link>
          <button
            onClick={() => navigator.clipboard.writeText(txHash)}
            className="text-white hover:text-[#FFFF00] ml-2 flex-shrink-0"
            title="Copy to clipboard"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6"
                y="6"
                width="12"
                height="12"
                rx="1"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M17 6V5C17 3.89543 16.1046 3 15 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H6"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-[#111111] p-4 rounded-md border border-[#FFFF00]/30">
        <p className="text-white mb-2">Silakan isi form feedback berikut:</p>
        <Link
          target="_blank"
          href={"/"}
          className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#111111] px-4 py-2 rounded-md font-bold hover:bg-[#D1BF00] transition-colors"
        >
          <span>Isi Feedback</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
