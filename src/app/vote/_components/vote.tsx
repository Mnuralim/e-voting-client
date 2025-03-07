"use client";
import Countdown from "@/app/_components/countdown";
import { ElectionList } from "./election-list";
import { CandidateCard } from "./candidate-card";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/contract";
import { toBigInt } from "ethers";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { useVoting } from "../hooks/use-voting";

export function VotingComponent() {
  const {
    selectedCandidate,
    signature,
    handleReset,
    selectedElection,
    candidates,
    isLoading,
    isVotingActive,
    handleSelectElection,
    handleSelectCandidate,
    handleSignMessage,
  } = useVoting();

  return (
    <div className="flex flex-col min-h-screen text-white items-center justify-center">
      <ElectionList
        handleSelectElection={handleSelectElection}
        selectedElection={selectedElection as string}
      />
      <h1 className="font-bold text-xl my-7">Vote Now</h1>
      <Countdown />
      <div className="grid mt-10 gap-10 w-full xl:grid-cols-2 xl:max-w-[40%]">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          candidates?.map((candidate, index) => (
            <CandidateCard
              handleSelectCandidate={handleSelectCandidate}
              selectedId={selectedCandidate!}
              key={index}
              id={Number(candidate.id)}
              image={candidate.image}
              name={candidate.name}
              vision={candidate.vision}
              voteCount={Number(candidate.voteCount)}
            />
          ))
        )}
      </div>

      <div className="mt-10">
        <div className="flex justify-center items-center flex-col gap-y-5">
          {!signature ? (
            <button
              onClick={handleSignMessage}
              disabled={selectedCandidate === null}
              className={`px-4 py-2 bg-white border-[3px] hover:bg-[#D1BF00] border-[#D1BF00] rounded-lg text-black font-bold ${
                selectedCandidate === null
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Sign Message
            </button>
          ) : (
            <TransactionButton
              disabled={
                selectedCandidate === null || !signature || !isVotingActive
              }
              transaction={() =>
                prepareContractCall({
                  contract,
                  method: "vote",
                  params: [
                    toBigInt(selectedElection),
                    toBigInt(selectedCandidate!),
                    signature,
                  ],
                })
              }
              onError={(error) => onErrorAlert(`Error: ${error.message}`)}
              onTransactionConfirmed={async () => {
                onSuccessAlert("You have successfully voted.");
                handleReset();
              }}
              unstyled
              className={`px-4 py-2 bg-white border-[3px]  hover:bg-[#D1BF00] border-[#D1BF00] rounded-lg text-black font-bold ${
                selectedCandidate === null || !signature || !isVotingActive
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isVotingActive ? "Vote" : "Voting is not active"}
            </TransactionButton>
          )}
        </div>
      </div>
    </div>
  );
}
