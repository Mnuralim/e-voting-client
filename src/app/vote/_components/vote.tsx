"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { toBigInt } from "ethers";
import { contract } from "@/lib/contract";
import Image from "next/image";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { ethers } from "ethers";
import { useRouter, useSearchParams } from "next/navigation";
import { ElectionList } from "./election-list";
import Countdown from "@/app/_components/countdown";
// import { CandidateCard } from "./candidate-card";

export function VotingComponent() {
  const [selectedCandidate, setSelectedCandidate] = useState<null | number>(
    null
  );
  const [signedCandidate, setSignedCandidate] = useState<null | number>(null);
  const [signature, setSignature] = useState<`0x${string}` | null>(null);
  const account = useActiveAccount();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSelectElection = (id: number) => {
    replace(`/vote?election=${id}`);
  };

  const selectedElection = searchParams.get("election") || 0;

  const { data: candidates, isLoading } = useReadContract({
    contract,
    method: "getAllCandidates",
    params: [toBigInt(selectedElection)],
  });

  const { data: isVotingActive } = useReadContract({
    contract,
    method: "isVotingActive",
  });

  const { data: nonce } = useReadContract({
    contract,
    method: "nonces",
    params: [account?.address as string],
  });

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidate(id);

    if (signedCandidate !== id) {
      setSignature(null);
      setSignedCandidate(null);
    }
  };

  const handleSignMessage = async () => {
    if (account?.address && selectedCandidate !== null) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256"],
        [account.address, selectedElection, selectedCandidate, nonce]
      );

      const messageHashBytes = ethers.getBytes(messageHash);
      const signature = (await signer.signMessage(
        messageHashBytes
      )) as `0x${string}`;
      setSignature(signature);
      setSignedCandidate(selectedCandidate);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white  items-center justify-center">
      <ElectionList
        handleSelectElection={handleSelectElection}
        selectedElection={selectedElection as string}
      />
      <h1 className="font-bold text-lg my-7">Vote Now</h1>
      <Countdown />
      <div className="grid mt-5 gap-10 w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          candidates?.map((candidate, index) => (
            // <CandidateCard
            //   key={index}
            //   image={candidate.image}
            //   name={candidate.name}
            //   vision={candidate.vision}
            //   voteCount={Number(candidate.voteCount)}
            // />
            <div
              onClick={() =>
                handleSelectCandidate(parseInt(candidate.id.toString()))
              }
              key={index}
              className={`flex flex-col items-center justify-between p-5 rounded-md border hover:bg-gray-800 border-gray-800 aspect-[3/4] w-72 cursor-pointer ${
                selectedCandidate === parseInt(candidate.id.toString())
                  ? "bg-gray-800"
                  : ""
              }`}
            >
              <div className="flex flex-col items-center gap-y-3">
                <Image
                  src={candidate.image}
                  alt={candidate.image}
                  width={128}
                  height={128}
                  className="w-32 h-32 aspect-square object-cover rounded-full "
                />
                <h2 className="font-bold text-lg">{candidate.name}</h2>
                <p className="text-center">{candidate.vision}</p>
              </div>
              <p>{candidate.voteCount.toString()} votes</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-10">
        {isVotingActive ? (
          <>
            <div className="flex justify-center items-center flex-col gap-y-5">
              {!signature ? (
                <button
                  onClick={handleSignMessage}
                  disabled={selectedCandidate === null}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Sign Message
                </button>
              ) : (
                <TransactionButton
                  disabled={selectedCandidate === null || !signature}
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
                    setSignature(null);
                    setSignedCandidate(null);
                    setSelectedCandidate(null);
                  }}
                >
                  Submit Vote
                </TransactionButton>
              )}
            </div>
          </>
        ) : (
          <p>Voting belum aktif.</p>
        )}
      </div>
    </div>
  );
}
