"use client";
import { contract } from "@/lib/contract";
import Link from "next/link";
import React from "react";
import { useReadContract } from "thirdweb/react";
import { LoadingSpinner } from "./loading-spinner";

export const HomeButton = () => {
  const { data: isVotingActive, isLoading } = useReadContract({
    contract,
    method: "isVotingActive",
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex items-center gap-x-6 mt-4">
      <Link
        href={"/tutorial"}
        className="border-[3px] font-bold border-[#111111] xl:text-lg md:text-base rounded-none text-base py-3 px-8 bg-[#FF6B6B] text-[#111111] shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all"
      >
        Panduan
      </Link>
      <Link
        href={isVotingActive ? "/vote" : "/whitelist"}
        className="border-[3px] border-[#111111] font-bold text-[#111111] md:text-base rounded-none py-3 text-base bg-[#FFFF00] px-8 xl:text-lg shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all"
      >
        {isVotingActive ? "Vote Now" : "Whitelist"}
      </Link>
    </div>
  );
};
