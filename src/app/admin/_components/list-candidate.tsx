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
import { LoadingSpinner } from "@/app/_components/loading-spinner";
import { ArrowRightIcon, PlusIcon } from "./svg";

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
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-2xl flex items-center">
            <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
            Daftar Kandidat
          </h2>

          <button
            onClick={() => handleOpenModal()}
            className="w-full md:w-auto cursor-pointer hover:bg-[#E6E600] bg-[#FFFF00] text-black font-medium rounded-lg px-5 py-2.5 transition-colors flex items-center justify-center gap-2"
          >
            <PlusIcon />
            Tambah Kandidat
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
                header: "Foto",
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
                header: "Nama",
                key: "name",
              },
              {
                header: "Visi",
                key: "vision",
              },
              {
                header: "Misi",
                key: "mission",
              },
              {
                header: "Jumlah Suara",
                key: "voteCount",
              },
            ]}
          />
        </div>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <Form
          title={selectedId ? "Edit Kandidat" : "Tambah Kandidat"}
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
              unstyled
              disabled={!name || !vision || !mission}
              className="bg-[#FFFF00] hover:bg-[#E6E600] text-black font-medium rounded-lg py-2.5 px-5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              onError={(error) => onErrorAlert(`${error.message}`)}
              onTransactionConfirmed={() => {
                handleCloseModal();
                onSuccessAlert("Kandidat berhasil ditambahkan!");
                setName("");
                setVision("");
                setMission("");
              }}
            >
              <span className="flex items-center justify-center gap-x-2">
                <span>Kirim</span>
                <ArrowRightIcon />
              </span>
            </TransactionButton>
          }
          fields={[
            {
              label: "Nama",
              type: "text",
              name: "name",
              value: name,
              required: true,
              onChange: (e) => setName(e.target.value),
            },
            {
              label: "Foto",
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
              label: "Visi",
              type: "text",
              name: "vision",
              value: vision,
              required: true,
              onChange: (e) => setVision(e.target.value),
            },
            {
              label: "Misi",
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
