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
      className="rounded-2xl border border-dashed border-[#4F4F4F] bg-[#111111] w-full md:px-10 md:w-fit py-3"
    >
      {isVotingActive?.[0] ? (
        <h2 className="text-xl font-bold text-[#D1D1D1] text-center">
          {timeLeft === "Voting telah berakhir"
            ? null
            : "Voting Berakhir Dalam:"}
        </h2>
      ) : null}
      <p
        className={`text-lg font-bold text-center ${
          isVotingActive?.[0] ? "text-[#FFFF00]" : "text-red-500"
        }`}
      >
        {timeLeft}
      </p>
    </div>
  );
};

export default Countdown;
