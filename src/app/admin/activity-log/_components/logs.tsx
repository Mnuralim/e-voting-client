"use client";

import { Table } from "@/app/_components/table";
import { contract } from "@/lib/contract";
import React from "react";
import { useContractEvents } from "thirdweb/react";

export const Logs = () => {
  const { data: events } = useContractEvents({
    contract,
    blockRange: 10000000,
  });

  console.log(events);

  return (
    <div>
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
            render: (item) => ` ${item.activity}`,
          },
          {
            header: "Transaction Hash",
            key: "hash",
            render: (item) => item.hash,
          },
        ]}
      />
    </div>
  );
};
