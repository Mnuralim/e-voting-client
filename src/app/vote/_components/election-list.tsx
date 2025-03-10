import { LoadingSpinner } from "@/app/_components/loading-spinner";
import { contract, nftContract } from "@/lib/contract";
import React from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

interface Props {
  handleSelectElection: (id: number) => void;
  selectedElection: string;
}

export const ElectionList = ({
  handleSelectElection,
  selectedElection,
}: Props) => {
  const account = useActiveAccount();

  const { data: elections, isLoading } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const { data: nftData } = useReadContract({
    contract: nftContract,
    method: "getNFTData",
    params: [account?.address ? account.address : ""],
  });

  const eligibleElections = elections?.filter(
    (item) =>
      ["BEM", "DPM", "MPM"].includes(item.name) || nftData?.includes(item.name)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      data-testid="election-list"
      className="flex space-x-4 p-4 bg-[#74580F] rounded-md"
    >
      {eligibleElections?.map((election) => (
        <button
          data-testid="election-option"
          key={election.id}
          onClick={() => handleSelectElection(parseInt(election.id.toString()))}
          className={`px-4 py-2 rounded-md text-black text-sm font-bold ${
            selectedElection === election.id.toString()
              ? "bg-[#FFFF00]"
              : "bg-[#F4FFC1] hover:bg-gray-600"
          }`}
          style={{
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          {election.name}
        </button>
      ))}
    </div>
  );
};
