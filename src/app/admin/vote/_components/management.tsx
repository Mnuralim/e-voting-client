"use client";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { contract } from "@/lib/contract";
import { toBigInt } from "ethers";
import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { useVotingManagement } from "../hooks/use-voting";

export const Management = () => {
  const { duration, setDuration, account, isVotingActive, durationOptions } =
    useVotingManagement();

  return (
    <div className="p-8 bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] relative">
      <div className="absolute -top-4 -left-2 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
        <span className="font-bold text-white">KONTROL</span>
      </div>

      <h2 className="text-[#111111] font-bold text-3xl mt-4 mb-6 rotate-[-1deg]">
        Kontrol Voting
      </h2>

      <div className="flex flex-col gap-5 mt-6">
        <div className="flex flex-col gap-2 relative">
          <div className="absolute -top-3 -left-2 bg-[#12E193] border-[2px] border-[#111111] px-3 py-0.5 rotate-[-1deg] shadow-[2px_2px_0px_#111111]">
            <span className="font-bold text-sm text-[#111111]">DURASI</span>
          </div>

          <div className="bg-[#FFE962] border-[3px] border-[#111111] p-4 pt-6 shadow-[4px_4px_0px_#111111]">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border-[3px] border-[#111111] bg-white font-medium text-[#111111] focus:outline-none hover:bg-[#FFFF00] transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
              disabled={isVotingActive?.[0]}
            >
              <option value="" disabled>
                Pilih durasi
              </option>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2">
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract,
                method: "startGlobalVoting",
                params: [toBigInt(duration)],
              })
            }
            disabled={isVotingActive?.[0] || !account?.address || !duration}
            className={`w-full border-[3px] border-[#111111] font-bold text-xl p-4 shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all ${
              isVotingActive?.[0] || !account?.address || !duration
                ? "bg-gray-300 text-[#555555]"
                : "bg-[#FFFF00] text-[#111111]"
            }`}
            onError={(error) => onErrorAlert(`${error.message}`)}
            onTransactionConfirmed={() => {
              onSuccessAlert("Voting dimulai!");
              setDuration("");
            }}
          >
            MULAI VOTING
          </TransactionButton>
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="absolute -top-3 -left-2 bg-[#FF6B6B] border-[2px] border-[#111111] px-3 py-0.5 rotate-[1deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-sm text-white">STATUS</span>
        </div>

        <div className="flex items-center gap-4 bg-white border-[3px] border-[#111111] p-4 shadow-[4px_4px_0px_#111111]">
          <div
            className={`h-6 w-6 rounded-full border-[2px] border-[#111111] ${
              isVotingActive?.[0] ? "bg-[#12E193]" : "bg-[#FF3A5E]"
            }`}
          ></div>
          <p className="font-bold text-xl text-[#111111]">
            {isVotingActive?.[0] ? "AKTIF" : "TIDAK AKTIF"}
          </p>
        </div>
      </div>
    </div>
  );
};
