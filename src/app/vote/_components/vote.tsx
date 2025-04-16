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
      className="flex flex-col min-h-screen items-center justify-center"
    >
      <div className="bg-[#FF3A5E] p-3 w-fit rotate-[-2deg] mb-6">
        <h1 className="font-bold text-2xl text-white">PILIH KANDIDAT</h1>
      </div>

      <div className="w-full mb-8">
        <ElectionList
          handleSelectElection={handleSelectElection}
          selectedElection={selectedElection as string}
        />
      </div>

      <div className="border-[3px] border-[#111111] bg-[#FFE962] py-3 px-6 shadow-[4px_4px_0px_#111111] transform rotate-[1deg] mb-8 w-fit">
        <h1 className="font-bold text-2xl text-[#111111]">
          Lakukan Voting Sekarang
        </h1>
      </div>

      <div className="mb-10">
        <Countdown />
      </div>

      <div className="flex flex-wrap flex-col md:flex-row mt-4 gap-10 w-full xl:max-w-[80%] justify-center">
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

      <div className="mt-12 mb-10">
        {isVotingActive && !hasVotedInCurrentElection && (
          <div className="flex justify-center items-center flex-col gap-y-5">
            {!signature ? (
              <button
                onClick={handleSignMessage}
                disabled={isSignButtonDisabled}
                className={`px-6 py-3 bg-[#12E193] text-[#111111] border-[3px] border-[#111111] font-bold shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all ${
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
                className={`px-6 py-3 bg-[#FFFF00] text-[#111111] border-[3px] border-[#111111] font-bold shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all ${
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
          <div className="bg-[#FF3A5E] p-3 w-fit mx-auto rotate-[-2deg] mb-6">
            <h2 className="text-2xl font-bold text-white">
              Konfirmasi Pilihan
            </h2>
          </div>

          <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-5 mb-6">
            <p className="text-[#111111] text-lg mb-6 font-bold">
              Apakah Anda yakin memilih kandidat ini?
            </p>

            {selectedCandidateData && (
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]">
                  <Image
                    src={selectedCandidateData.image || "/image.png"}
                    width={400}
                    height={400}
                    draggable={false}
                    alt="Foto Kandidat"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold text-xl text-[#111111] mb-4 bg-[#FFE962] p-2 transform rotate-[1deg]">
                  {selectedCandidateData.name}
                </h3>

                <div className="w-full max-w-md mx-auto">
                  <div className="bg-[#12E193] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 mb-5">
                    <h4 className="text-[#111111] font-bold mb-2 transform rotate-[-1deg]">
                      Visi:
                    </h4>
                    <p className="text-[#111111] text-sm">
                      {selectedCandidateData.vision}
                    </p>
                  </div>

                  {selectedCandidateData.mission && (
                    <div className="bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 mb-5">
                      <h4 className="text-[#111111] font-bold mb-2 transform rotate-[-1deg]">
                        Misi:
                      </h4>
                      <p className="text-[#111111] text-sm">
                        {selectedCandidateData.mission}
                      </p>
                    </div>
                  )}

                  <div className="bg-[#FF6B6B] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4">
                    <h4 className="text-white font-bold mb-2 transform rotate-[-1deg]">
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
            <button
              onClick={handleCloseModal}
              className="bg-white border-[3px] border-[#111111] text-[#111111] font-bold px-6 py-3 shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all"
            >
              Batalkan
            </button>

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
              className={`bg-[#FFFF00] border-[3px] border-[#111111] text-[#111111] font-bold px-6 py-3 shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all ${
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
