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
    <div className="p-6 rounded-xl bg-gray-950">
      <div className="bg-[#111111] p-6 rounded-lg shadow-lg border border-gray-800">
        <h2 className="text-white font-bold text-2xl flex items-center">
          <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
          Kontrol Voting
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Durasi Voting:</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="p-3 rounded-lg border border-gray-700 bg-[#222222] text-white focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent transition-all duration-200"
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
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract,
                method: "startGlobalVoting",
                params: [toBigInt(duration)],
              })
            }
            disabled={isVotingActive?.[0] || !account?.address || !duration}
            style={{
              pointerEvents: isVotingActive?.[0] ? "none" : "auto",
              opacity:
                isVotingActive?.[0] || !account?.address || !duration ? 0.5 : 1,
              cursor:
                isVotingActive?.[0] || !account?.address || !duration
                  ? "not-allowed"
                  : "pointer",
              userSelect: isVotingActive?.[0] ? "none" : "auto",
              WebkitUserSelect: isVotingActive?.[0] ? "none" : "auto",
              backgroundColor: "#FFFF00",
              color: "#111111",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 6px rgba(255, 255, 0, 0.1)",
            }}
            onError={(error) => onErrorAlert(`${error.message}`)}
            onTransactionConfirmed={() => {
              onSuccessAlert("Voting dimulai!");
              setDuration("");
            }}
          >
            Mulai Voting
          </TransactionButton>
        </div>
      </div>
      <div className="bg-[#111111] p-6 mt-5 rounded-lg shadow-lg border border-gray-800 flex items-center gap-3">
        <p className="text-[#FFFF00] font-bold text-xl">Status Voting:</p>
        <div className="flex items-center">
          <span
            className={`h-3 w-3 rounded-full mr-2 ${
              isVotingActive?.[0] ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <p
            className={`font-bold text-xl ${
              isVotingActive?.[0] ? "text-green-500" : "text-red-500"
            }`}
          >
            {isVotingActive?.[0] ? "Aktif" : "Tidak Aktif"}
          </p>
        </div>
      </div>
    </div>
  );
};
