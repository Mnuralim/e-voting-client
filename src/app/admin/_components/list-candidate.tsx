"use client";

import { contract } from "@/lib/contract";
import React, { useState } from "react";
import { TransactionButton, useReadContract } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import { client } from "@/lib/thirdweb-client";
import { prepareContractCall } from "thirdweb";
import Image from "next/image";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { toBigInt } from "ethers";
import Modal from "./modal";
import { Table } from "@/app/_components/table";
import { Form } from "@/app/_components/form";

interface Props {
  electionId: string;
}

export const ListCandidate = ({ electionId }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [vision, setVision] = useState<string>("");
  const [mission, setMission] = useState<string>("");
  const { data: candidates, isLoading } = useReadContract({
    contract,
    method: "getAllCandidates",
    params: [toBigInt(electionId)],
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenModal = (id?: string) => {
    setOpenModal(true);
    if (id) {
      setSelectedId(id);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedId(null);
  };

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
                setOpenModal(false);
                onSuccessAlert("Candidate added!");
                setImagePreview(null);
                setName("");
                setVision("");
                setMission("");
                setSelectedId(null);
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
