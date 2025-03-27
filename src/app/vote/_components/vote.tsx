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
import { LoadingSpinner } from "@/app/_components/loading-spinner";
import Modal from "@/app/admin/_components/modal";
import Image from "next/image";
import { Feedback } from "./feedback";

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
    openModal,
    handleOpenModal,
    handleCloseModal,
    hasVoted,
    addVoteToStorage,
  } = useVoting();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const selectedCandidateData =
    selectedCandidate !== null && candidates
      ? candidates.find((c) => Number(c.id) === selectedCandidate)
      : null;

  const hasVotedInCurrentElection = hasVoted.find(
    (v) => v.electionId.toString() === selectedElection.toString()
  );

  const isSignButtonDisabled = selectedCandidate === null;
  const isVoteButtonDisabled = selectedCandidate === null || !signature;

  const shouldShowConfirmModal =
    openModal &&
    selectedCandidate !== null &&
    signature !== null &&
    isVotingActive;

  return (
    <div
      data-testid="voting-component"
      className="flex flex-col min-h-screen text-white items-center justify-center"
    >
      <ElectionList
        handleSelectElection={handleSelectElection}
        selectedElection={selectedElection as string}
      />
      <h1 className="font-bold text-xl my-7">Lakukan Voting Sekarang</h1>
      <Countdown />

      <div className="flex flex-wrap flex-col md:flex-row mt-10 gap-y-10 w-full xl:max-w-[70%]">
        {candidates?.map((candidate, index) => (
          <CandidateCard
            handleSelectCandidate={handleSelectCandidate}
            selectedId={selectedCandidate!}
            key={index}
            mission={candidate.mission}
            id={Number(candidate.id)}
            image={candidate.image}
            name={candidate.name}
            vision={candidate.vision}
            voteCount={Number(candidate.voteCount)}
          />
        ))}
      </div>

      <div className="mt-10">
        {isVotingActive && !hasVotedInCurrentElection && (
          <div className="flex justify-center items-center flex-col gap-y-5">
            {!signature ? (
              <button
                onClick={handleSignMessage}
                disabled={isSignButtonDisabled}
                className={`px-4 py-2 bg-white border-[3px] hover:bg-[#D1BF00] border-[#D1BF00] rounded-lg text-black font-bold ${
                  isSignButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Tanda Tangani Pesan
              </button>
            ) : (
              <button
                onClick={handleOpenModal}
                disabled={isVoteButtonDisabled}
                className={`px-4 py-2 bg-white border-[3px] hover:bg-[#D1BF00] border-[#D1BF00] rounded-lg text-black font-bold ${
                  isVoteButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Pilih
              </button>
            )}
          </div>
        )}
      </div>

      {hasVotedInCurrentElection && (
        <div className="px-4 w-full">
          <Feedback txHash={hasVotedInCurrentElection.txHash} />
        </div>
      )}

      <Modal
        isOpen={shouldShowConfirmModal as boolean}
        onClose={handleCloseModal}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#FFFF00] mb-6">
            Konfirmasi Pilihan
          </h2>

          <div className="bg-[#1A1A1A] border border-[#FFFF00]/30 rounded-lg p-5 mb-6">
            <p className="text-white text-lg mb-4">
              Apakah Anda yakin memilih kandidat ini?
            </p>

            {selectedCandidateData && (
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-[#FFFF00] shadow-lg shadow-[#FFFF00]/20">
                  <Image
                    src={selectedCandidateData.image || "/image.png"}
                    width={400}
                    height={400}
                    draggable={false}
                    alt="Foto Kandidat"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold text-xl text-[#FFFF00] mb-2">
                  {selectedCandidateData.name}
                </h3>

                <div className="w-full max-w-md mx-auto">
                  <div className="bg-[#222222] rounded-lg p-4 mb-3">
                    <h4 className="text-[#FFFF00] font-medium mb-2">Visi:</h4>
                    <p className="text-gray-300 text-sm">
                      {selectedCandidateData.vision}
                    </p>
                  </div>

                  {selectedCandidateData.mission && (
                    <div className="bg-[#222222] rounded-lg p-4 mb-3">
                      <h4 className="text-[#FFFF00] font-medium mb-2">Misi:</h4>
                      <p className="text-gray-300 text-sm">
                        {selectedCandidateData.mission}
                      </p>
                    </div>
                  )}

                  <div className="bg-[#222222] rounded-lg p-4">
                    <h4 className="text-[#FFFF00] font-medium mb-2">
                      Perolehan Suara Saat Ini:
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {Number(selectedCandidateData.voteCount)} suara
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <TransactionButton
              disabled={isVoteButtonDisabled || !isVotingActive}
              transaction={() =>
                prepareContractCall({
                  contract,
                  method: "vote",
                  params: [
                    toBigInt(selectedElection),
                    toBigInt(selectedCandidate!),
                    signature!,
                  ],
                })
              }
              onError={(error) => onErrorAlert(error.message)}
              onTransactionConfirmed={async (tx) => {
                onSuccessAlert("Anda telah berhasil memberikan suara.");
                handleReset();
                addVoteToStorage(
                  selectedElection.toString(),
                  tx.transactionHash
                );
              }}
              theme={"light"}
              unstyled
              className={`bg-[#111111] cursor-pointer text-[#FFFF00] flex items-center justify-center border border-[#FFFF00] hover:bg-[#FFFF00] hover:text-[#111111] px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                isVoteButtonDisabled || !isVotingActive
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Konfirmasi
            </TransactionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
