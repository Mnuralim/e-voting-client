import Link from "next/link";
import React, { useState } from "react";

interface FeedbackProps {
  txHash: string;
}

export const Feedback = ({ txHash }: FeedbackProps) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const googleFormUrl = "https://forms.gle/DPAou44Yf4ibr6vb9";

  const handleFeedbackComplete = () => {
    setShowThankYou(true);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <div className="bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-6 rotate-[-1deg]">
        <div className="flex justify-center mb-4">
          <div className="bg-[#12E193] rounded-full w-16 h-16 flex items-center justify-center border-[3px] border-[#111111] transform rotate-[2deg]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12L10.5 14.5L16 9"
                stroke="#111111"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-[#111111] font-bold text-xl mb-3 text-center transform rotate-[1deg]">
          Terimakasih anda sudah melakukan vote!
        </h3>

        <p className="text-[#111111] mb-6 text-center">
          Partisipasi Anda sangat berarti untuk kemajuan bersama.
        </p>

        <div className="bg-white border-[3px] border-[#111111] p-4 mb-6 shadow-[4px_4px_0px_#111111] rotate-[-1deg]">
          <p className="text-[#111111] font-bold mb-2">Transaction Hash:</p>
          <div className="flex items-center justify-between">
            <Link
              href={`https://base-sepolia.blockscout.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF3A5E] text-sm truncate hover:underline flex-grow font-medium"
              title="View transaction in explorer"
            >
              {txHash}
            </Link>
            <button
              onClick={() => navigator.clipboard.writeText(txHash)}
              className="bg-[#FF3A5E] text-white p-2 border-[2px] border-[#111111] ml-2 flex-shrink-0 shadow-[2px_2px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111111] transition-all"
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

        <div className="mt-4">
          <div className="flex flex-col items-center">
            <p className="text-[#111111] text-center mb-3">
              Berikan umpan balik Anda untuk membantu kami meningkatkan layanan
            </p>
            <Link
              href={`${googleFormUrl}?entry.123456=${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFeedbackComplete}
              className="bg-[#FF3A5E] text-white py-2 px-4 border-[2px] border-[#111111] shadow-[3px_3px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111111] transition-all font-bold"
            >
              Berikan Feedback
            </Link>
          </div>

          {showThankYou ? (
            <div className="bg-[#12E193] p-3 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] mt-2">
              <p className="text-[#111111] text-center font-bold">
                Terima kasih atas feedback Anda!
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
