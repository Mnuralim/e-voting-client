import { contract } from "@/lib/contract";
import { useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export const useVotingManagement = () => {
  const [duration, setDuration] = useState<string>("");
  const account = useActiveAccount();
  const { data: isVotingActive } = useReadContract({
    contract,
    method: "getGlobalVotingPeriod",
  });

  const durationOptions = [
    { label: "1 Day", value: 86400 },
    { label: "2 Days", value: 2 * 86400 },
    { label: "3 Days", value: 3 * 86400 },
    { label: "5 Days", value: 5 * 86400 },
    { label: "7 Days", value: 7 * 86400 },
  ];

  return {
    duration,
    setDuration,
    account,
    isVotingActive,
    durationOptions,
  };
};
