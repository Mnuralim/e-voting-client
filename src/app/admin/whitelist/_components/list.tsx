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
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <h2 className="text-white font-bold text-2xl flex items-center">
          <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
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
