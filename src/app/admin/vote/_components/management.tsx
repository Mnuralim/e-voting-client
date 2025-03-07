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
    <div className="p-10">
      <div className="bg-[#111111] p-5">
        <h2 className="text-[#A1A1A1] font-bold text-xl">Voting Control</h2>
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-2">
            <label className="text-[#A1A1A1] font-bold">Voting Duration:</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="p-2 rounded-lg border border-gray-600 bg-[#222222] text-white focus:outline-none"
              disabled={isVotingActive?.[0]}
            >
              <option value="" disabled>
                Select duration
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
              backgroundColor: "#16a34a",
              color: "white",
              fontWeight: "bold",
            }}
            onError={(error) => onErrorAlert(`${error.message}`)}
            onTransactionConfirmed={() => {
              onSuccessAlert("Voting started!");
              setDuration("");
            }}
          >
            Start Vote
          </TransactionButton>
        </div>
      </div>
      <div className="bg-[#111111] p-5 mt-5 flex items-center gap-2">
        <p className="text-[#A1A1A1] font-bold text-xl">Voting Status:</p>
        <p
          className={`font-bold text-xl ${
            isVotingActive?.[0] ? "text-green-600" : "text-red-600"
          }`}
        >
          {isVotingActive?.[0] ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};
