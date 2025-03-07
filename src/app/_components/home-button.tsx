"use client";
import { contract } from "@/lib/contract";
import Link from "next/link";
import React from "react";
import { useReadContract } from "thirdweb/react";

const HomeButton = () => {
  const { data: isVotingActive } = useReadContract({
    contract,
    method: "isVotingActive",
  });

  return (
    <div className="flex items-center gap-x-4">
      <Link
        href={"/tutorial"}
        className="border-2 font-bold border-[#FFFF00] xl:text-lg  rounded-lg text-sm py-2 px-10 text-white"
      >
        Tutorial
      </Link>
      <Link
        href={isVotingActive ? "/vote" : "/whitelist"}
        className="border-2 border-[#FFFF00] font-bold text-[#090909] rounded-lg py-2 text-sm bg-[#FFFF00] px-10 xl:text-lg "
      >
        {isVotingActive ? "Vote Now" : "Whitelist"}
      </Link>
    </div>
  );
};

export default HomeButton;
