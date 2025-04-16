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

  const eligibleElections = elections?.filter((election) => {
    if (
      parseInt(election.electionType.toString()) === 0 ||
      parseInt(election.electionType.toString()) === 4
    ) {
      return true;
    }

    if (!nftData || !account) return false;
    const [userFaculty, userProgram, userDepartement, userDpm, , ,] = nftData;

    const facultyLower = userFaculty?.toLowerCase() || "";
    const programLower = userProgram?.toLowerCase() || "";
    const departementLower = userDepartement?.toLowerCase() || "";
    const userDpmLower = userDpm?.toLowerCase() || "";

    if (parseInt(election.electionType.toString()) === 1) {
      const electionFaculty = election.faculty.toLowerCase();
      return facultyLower === electionFaculty;
    }

    if (parseInt(election.electionType.toString()) === 2) {
      const electionProgram = election.program.toLowerCase();
      return programLower === electionProgram;
    }

    if (parseInt(election.electionType.toString()) === 3) {
      const electionDpm = election.dpm.toLowerCase();
      return userDpmLower === electionDpm;
    }

    if (parseInt(election.electionType.toString()) === 5) {
      const electionDepartement = election.departement.toLowerCase();
      return departementLower === electionDepartement;
    }

    return false;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      data-testid="election-list"
      className="border-[3px] border-[#111111] bg-[#FF6B6B] p-6 shadow-[4px_4px_0px_#111111] flex gap-4 rounded-none flex-wrap justify-center"
    >
      {eligibleElections?.map((election) => (
        <button
          data-testid="election-option"
          key={election.id}
          onClick={() => handleSelectElection(parseInt(election.id.toString()))}
          className={`px-4 py-2 text-[#111111] text-base font-bold transform border-[3px] border-[#111111] transition-all ${
            selectedElection === election.id.toString()
              ? "bg-[#FFFF00] shadow-[4px_4px_0px_#111111] rotate-[-1deg]"
              : "bg-white hover:bg-[#FFE962] shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#111111]"
          }`}
          style={{
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {election.electionType === 1
            ? `BEM ${election.name}`
            : election.electionType === 2
            ? `HMPS ${election.name}`
            : election.electionType === 5
            ? `HMJ ${election.name}`
            : election.name}
        </button>
      ))}
    </div>
  );
};
