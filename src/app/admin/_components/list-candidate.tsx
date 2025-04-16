"use client";

import { contract } from "@/lib/contract";
import React from "react";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
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
  const account = useActiveAccount();
  const { data: getRole } = useReadContract({
    contract,
    method: "getRole",
    params: [account?.address as string],
  });

  const isPawasra = getRole === 2;
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
    <div className="p-8 bg-white">
      <div className="border-[3px] border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111] relative">
        <div className="absolute -top-5 -left-3 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">KANDIDAT</span>
        </div>

        <div className="flex items-center justify-between mb-8 mt-3">
          <h2 className="text-[#111111] font-bold text-3xl rotate-[-1deg]">
            Daftar Kandidat
          </h2>

          {!isPawasra && (
            <button
              onClick={() => handleOpenModal()}
              className="border-[3px] border-[#111111] bg-[#FFFF00] px-4 py-2 font-bold text-[#111111] shadow-[3px_3px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] transition-all flex items-center gap-2"
            >
              <PlusIcon />
              TAMBAH KANDIDAT
            </button>
          )}
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
                header: "NO",
                key: "id",
                render: (item) => item.id.toString(),
              },
              {
                header: "FOTO",
                key: "image",
                render: (item) => (
                  <div className="border-[3px] border-[#111111] overflow-hidden w-20 h-20 shadow-[2px_2px_0px_#111111]">
                    <Image
                      width={800}
                      height={800}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ),
              },
              {
                header: "NAMA",
                key: "name",
              },
              {
                header: "VISI",
                key: "vision",
              },
              {
                header: "MISI",
                key: "mission",
              },
              {
                header: "JUMLAH SUARA",
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
              className="bg-[#FFFF00] text-[#111111] font-bold border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rounded-none py-2.5 px-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rotate-[1deg] transform-gpu"
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
