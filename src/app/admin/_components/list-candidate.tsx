"use client";

import { contract } from "@/lib/contract";
import React from "react";
import { TransactionButton } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import { client } from "@/lib/thirdweb-client";
import { prepareContractCall } from "thirdweb";
import Image from "next/image";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { toBigInt } from "ethers";
import Modal from "./modal";
import { Table } from "@/app/_components/table";
import { Form } from "@/app/_components/form";
import { useCandidate } from "./hooks/use-candidate";

interface Props {
  electionId: string;
}

export const ListCandidate = ({ electionId }: Props) => {
  const {
    openModal,
    selectedId,
    image,
    imagePreview,
    name,
    vision,
    mission,
    candidates,
    isLoading,
    handleChangeImage,
    handleOpenModal,
    handleCloseModal,
    setName,
    setVision,
    setMission,
  } = useCandidate(electionId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">List Candidate</h2>
          <button
            onClick={() => handleOpenModal()}
            className="border-white bg-white font-semibold text-black border-opacity-20 rounded-lg py-2.5 px-3"
          >
            Add Candidate
          </button>
        </div>
        <div className="mt-5">
          <Table
            data={
              candidates?.map((candidate) => ({
                ...candidate,
                id: candidate.id.toString(),
                voteCount: candidate.voteCount.toString(),
              })) || []
            }
            columns={[
              {
                header: "No",
                key: "id",
                render: (item) => item.id.toString(),
              },
              {
                header: "Image",
                key: "image",
                render: (item) => (
                  <Image
                    width={800}
                    height={800}
                    src={item.image}
                    alt={item.name}
                    className="rounded-full aspect-square w-20 h-auto object-cover object-center"
                  />
                ),
              },
              {
                header: "Name",
                key: "name",
              },
              {
                header: "Vision",
                key: "vision",
              },
              {
                header: "Vote Count",
                key: "voteCount",
              },
            ]}
          />
        </div>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <Form
          title={selectedId ? "Edit Candidate" : "Add Candidate"}
          transactionButton={
            <TransactionButton
              type="button"
              transaction={async () =>
                prepareContractCall({
                  contract,
                  method: "addCandidate",
                  params: [
                    toBigInt(electionId),
                    name,
                    image
                      ? await upload({ client, files: [image] }).then((uri) =>
                          resolveScheme({ uri, client })
                        )
                      : "",
                    vision,
                    mission,
                  ],
                })
              }
              className="bg-red-600 px-5 font-bold py-2.5 rounded-lg"
              onError={(error) => onErrorAlert(`${error.message}`)}
              onTransactionConfirmed={() => {
                handleCloseModal();
                onSuccessAlert("Candidate added!");
                setName("");
                setVision("");
                setMission("");
              }}
            >
              Submit
            </TransactionButton>
          }
          fields={[
            {
              label: "Name",
              type: "text",
              name: "name",
              value: name,
              required: true,
              onChange: (e) => setName(e.target.value),
            },
            {
              label: "Image",
              type: "file",
              name: "image",
              preview: imagePreview as string,
              onChange(e) {
                handleChangeImage(e as React.ChangeEvent<HTMLInputElement>);
              },
              accept: "image/*",
              required: true,
            },
            {
              label: "Vision",
              type: "text",
              name: "vision",
              value: vision,
              required: true,
              onChange: (e) => setVision(e.target.value),
            },
            {
              label: "Mission",
              type: "text",
              name: "mission",
              value: mission,
              required: true,
              onChange: (e) => setMission(e.target.value),
            },
          ]}
        />
      </Modal>
    </div>
  );
};
