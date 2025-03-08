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
    { label: "1 Hari", value: 86400 },
    { label: "2 Hari", value: 2 * 86400 },
    { label: "3 Hari", value: 3 * 86400 },
    { label: "5 Hari", value: 5 * 86400 },
    { label: "7 Hari", value: 7 * 86400 },
  ];

  return {
    duration,
    setDuration,
    account,
    isVotingActive,
    durationOptions,
  };
};
