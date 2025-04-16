"use client";

import { Table } from "@/app/_components/table";
import { contract } from "@/lib/contract";
import Link from "next/link";
import React from "react";
import { useContractEvents } from "thirdweb/react";

export const Logs = () => {
  const { data: events } = useContractEvents({
    contract,
    blockRange: 10000000,
  });

  return (
    <div className="p-8">
      <div className="border-[3px] border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111] relative">
        <div className="absolute -top-5 -left-3 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">AKTIFITAS</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-[#111111] font-bold text-3xl rotate-[-1deg]">
            Daftar Aktifitas
          </h2>
        </div>
        <Table
          showNumber
          data={
            events?.map((event, index) => ({
              id: index.toString(),
              activity: event.eventName,
              hash: event.transactionHash,
              args: event.args,
            })) || []
          }
          columns={[
            {
              header: "Aktifitas",
              key: "activity",
              render: (item) => (
                <span className="font-bold text-black">{item.activity}</span>
              ),
            },
            {
              header: "Transaction Hash",
              key: "hash",
              render: (item) => (
                <Link
                  href={`https://base-sepolia.blockscout.com/tx/${item.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white border-[2px] border-[#111111] px-3 py-1 font-bold text-black hover:bg-[#FFE962] hover:translate-x-[1px] hover:translate-y-[1px] transition-all shadow-[2px_2px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] truncate max-w-xs"
                  title={item.hash}
                >
                  {item.hash.substring(0, 16)}...
                  {item.hash.substring(item.hash.length - 4)}
                </Link>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
