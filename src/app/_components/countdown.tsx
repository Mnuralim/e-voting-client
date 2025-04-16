"use client";
import { contract } from "@/lib/contract";
import React, { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";

const Countdown = () => {
  const { data: isVotingActive } = useReadContract({
    contract,
    method: "globalVotingPeriod",
  });

  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (isVotingActive?.[0] && isVotingActive[2]) {
      const interval = setInterval(() => {
        const now = BigInt(Math.floor(Date.now() / 1000));
        const remainingTime = BigInt(isVotingActive[2]) - now;

        if (remainingTime <= BigInt(0)) {
          setTimeLeft("Voting telah berakhir");
          clearInterval(interval);
        } else {
          const days = remainingTime / BigInt(24 * 60 * 60);
          const hours =
            (remainingTime % BigInt(24 * 60 * 60)) / BigInt(60 * 60);
          const minutes = (remainingTime % BigInt(60 * 60)) / BigInt(60);
          const seconds = remainingTime % BigInt(60);

          setTimeLeft(`${days}h : ${hours}j : ${minutes}m : ${seconds}d`);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft("Voting belum dimulai");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVotingActive?.[0], isVotingActive?.[2]]);

  return (
    <div
      data-testid="countdown"
      className="border-[3px] border-[#111111] bg-white p-4 shadow-[4px_4px_0px_#111111] w-full md:w-fit"
    >
      {isVotingActive?.[0] ? (
        <h2 className="text-xl font-bold text-[#111111] text-center transform rotate-[-1deg]">
          {timeLeft === "Voting telah berakhir"
            ? null
            : "Voting Berakhir Dalam:"}
        </h2>
      ) : null}
      <p
        className={`text-2xl font-bold text-center ${
          isVotingActive?.[0]
            ? "bg-[#FFFF00] p-2 border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] inline-block mt-2"
            : "bg-[#FF3A5E] p-2 text-white border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] inline-block mt-2"
        }`}
      >
        {timeLeft}
      </p>
    </div>
  );
};

export default Countdown;
