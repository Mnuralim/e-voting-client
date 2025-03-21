import { useEffect, useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { toBigInt } from "ethers";
import { contract } from "@/lib/contract";
import { ethers } from "ethers";
import { useRouter, useSearchParams } from "next/navigation";

export const useVoting = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<null | number>(
    null
  );
  const [signedCandidate, setSignedCandidate] = useState<null | number>(null);
  const [signature, setSignature] = useState<`0x${string}` | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alreadyVoted, setAlreadyVoted] = useState<null | string>(null);
  const [hasVoted, setHasVoted] = useState<
    Array<{ electionId: string; txHash: string }>
  >([]);

  const account = useActiveAccount();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSelectElection = (id: number) => {
    replace(`/vote?election=${id}`);
    setSelectedCandidate(null);
    setSignedCandidate(null);
    setSignature(null);
    setOpenModal(false);
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

  const handleReset = () => {
    setSelectedCandidate(null);
    setSignedCandidate(null);
    setSignature(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVotedId = localStorage.getItem("hasVoted");
      setHasVoted(savedVotedId ? JSON.parse(savedVotedId) : []);
    }
  }, []);

  const saveVotedIdToStorage = (
    newArrayVote: Array<{ electionId: string; txHash: string }>
  ) => {
    if (typeof window !== "undefined") {
      setHasVoted(newArrayVote);
      localStorage.setItem("hasVoted", JSON.stringify(newArrayVote));
    }
  };

  const addVoteToStorage = (electionId: string, txHash: string) => {
    const newVote = {
      electionId,
      txHash,
    };
    saveVotedIdToStorage([...hasVoted, newVote]);
  };

  return {
    selectedCandidate,
    signedCandidate,
    signature,
    account,
    selectedElection,
    candidates,
    isLoading,
    isVotingActive,
    nonce,
    handleSelectElection,
    handleSelectCandidate,
    handleSignMessage,
    setSignature,
    handleReset,
    openModal,
    handleOpenModal,
    handleCloseModal,
    alreadyVoted,
    setAlreadyVoted,
    hasVoted,
    addVoteToStorage,
  };
};
