"use client";
import { LoadingSpinner } from "@/app/_components/loading-spinner";
import { Table } from "@/app/_components/table";
import { contract } from "@/lib/contract";
import React from "react";
import { useReadContract } from "thirdweb/react";

export const AddressWhitelist = () => {
  const { data: holders, isLoading } = useReadContract({
    contract,
    method: "getNFTHolders",
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-8 bg-white">
      <div className="border-[3px] border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111] relative">
        <div className="absolute -top-5 -left-3 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">WHITELIST</span>
        </div>
        <h2 className="text-[#111111] font-bold text-3xl rotate-[-1deg]">
          Daftar Whitelist
        </h2>
        <div className="mt-5">
          <Table
            showNumber
            data={
              holders?.map((holder, index) => ({
                id: (index + 1).toString(),
                holder: holder.holder,
                tokenIds: holder.tokenIds
                  .map((tokenId) => tokenId.toString())
                  .join(", "),
              })) || []
            }
            columns={[
              {
                header: "Pemilik",
                key: "holder",
              },
              {
                header: "Token ID",
                key: "tokenIds",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
