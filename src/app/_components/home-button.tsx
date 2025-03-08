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
    <div className="flex items-center gap-x-4">
      <Link
        href={"/tutorial"}
        className="border-2 font-bold border-[#FFFF00] xl:text-lg md:text-base rounded-lg text-sm py-2 px-10 text-white"
      >
        Panduan
      </Link>
      <Link
        href={isVotingActive ? "/vote" : "/whitelist"}
        className="border-2 border-[#FFFF00] font-bold text-[#090909] md:text-base rounded-lg py-2 text-sm bg-[#FFFF00] px-10 xl:text-lg "
      >
        {isVotingActive ? "Vote Now" : "Whitelist"}
      </Link>
    </div>
  );
};
