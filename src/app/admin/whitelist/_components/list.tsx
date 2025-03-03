"use client";
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
    return <div>Loading...</div>;
  }
  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">List Whitelist</h2>
        </div>
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
                header: "Owner",
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
