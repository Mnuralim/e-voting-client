"use client";

import { contract } from "@/lib/contract";
import { TransactionButton } from "thirdweb/react";
import Modal from "../../_components/modal";
import { prepareContractCall } from "thirdweb";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { Table } from "@/app/_components/table";
import Image from "next/image";
import { CircleLoading } from "../../../../../public/image";
import { useElection } from "../hooks/use-selection";
import { InputField } from "./input-field";
import { SelectField } from "./select-field";
import { LoadingSpinner } from "@/app/_components/loading-spinner";
import { NotFoundData } from "@/app/_components/not-found-data";
import { ArrowRightIcon, PlusIcon, SearchIcon } from "../../_components/svg";

interface Props {
  faculties: IFaculty[];
  programs: IProgram[];
}

const electionType = [
  {
    id: 0,
    name: "BEM",
  },
  {
    id: 1,
    name: "BEM_FAKULTAS",
  },
  {
    id: 2,
    name: "HMPS",
  },
  {
    id: 3,
    name: "DPM",
  },
  {
    id: 4,
    name: "MPM",
  },
];

export const ElectionList = ({ faculties, programs }: Props) => {
  const {
    openModal,
    selectedId,
    name,
    type,
    faculty,
    program,
    search,
    isSearching,
    filterType,
    isFiltering,
    isLoading,
    filteredElections,
    filteredFaculties,
    filteredPrograms,
    handleOpenModal,
    handleCloseModal,
    handleSelectType,
    handleSearch,
    handleFilter,
    setName,
    setFaculty,
    setProgram,
    handleReset,
  } = useElection(faculties, programs);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-2xl flex items-center">
            <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
            Daftar Pemilihan
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={search}
                autoFocus
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#222222] border border-gray-700 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent"
                placeholder="Cari pemilihan..."
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Image
                    alt="circle-loading"
                    src={CircleLoading}
                    width={20}
                    height={20}
                    className="animate-spin"
                  />
                </div>
              )}
            </div>
            <div>
              <select
                className="w-full px-4 py-2.5 cursor-pointer rounded-lg bg-[#222222] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent appearance-none"
                onChange={(e) => handleFilter(e.target.value)}
                value={filterType === null ? "" : filterType}
              >
                <option value="">Semua Jenis</option>
                {electionType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="w-full md:w-auto cursor-pointer hover:bg-[#E6E600] bg-[#FFFF00] text-black font-medium rounded-lg px-5 py-2.5 transition-colors flex items-center justify-center gap-2"
            >
              <PlusIcon />
              Tambah Pemilihan
            </button>
          </div>
        </div>
        <div className="mt-5">
          {isSearching || isFiltering ? (
            <div className="w-full flex items-center justify-center">
              <Image
                alt="circle-loading"
                src={CircleLoading}
                width={30}
                height={30}
                className="animate-spin filter invert"
              />
            </div>
          ) : filteredElections?.length && filteredElections?.length > 0 ? (
            <Table
              data={
                filteredElections?.map((election) => ({
                  id: election.id.toString(),
                  name: election.name,
                  type: electionType.find(
                    (type) => type.id === election.electionType
                  )?.name,
                  faculty: election.faculty,
                  program: election.program,
                })) || []
              }
              columns={[
                { header: "ID Pemilihan", key: "id" },
                { header: "Nama", key: "name" },
                { header: "Jenis", key: "type" },
                { header: "Fakultas", key: "faculty" },
                { header: "Program Studi", key: "program" },
              ]}
            />
          ) : (
            <NotFoundData />
          )}
        </div>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div className="w-full p-16 overflow-y-auto h-full ">
          <h1 className="font-bold text-2xl text-white mb-6 flex items-center">
            <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
            {selectedId ? "Edit Pemilihan" : "Tambah Pemilihan"}
          </h1>
          <InputField
            type="text"
            name="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <SelectField
            name="Jenis"
            value={type}
            options={electionType}
            onChange={(e) => handleSelectType(parseInt(e.target.value))}
            required
          />
          {type === 1 && (
            <SelectField
              name="Fakultas"
              value={faculty as string}
              options={filteredFaculties}
              onChange={(e) => setFaculty(e.target.value)}
              required
            />
          )}
          {type === 2 && (
            <SelectField
              name="Program Studi"
              value={program as string}
              options={filteredPrograms}
              onChange={(e) => setProgram(e.target.value)}
              required
            />
          )}
          <div className="flex justify-end mt-10">
            <TransactionButton
              transaction={async () =>
                prepareContractCall({
                  contract,
                  method: "createElection",
                  params: [name, type, faculty || "", program || ""],
                })
              }
              disabled={!name || !type || !faculty || !program}
              unstyled
              className="bg-[#FFFF00] hover:bg-[#E6E600] text-black font-medium rounded-lg py-2.5 px-5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              onError={(error) => onErrorAlert(`${error.message}`)}
              onTransactionConfirmed={() => {
                onSuccessAlert("Pemilihan berhasil dibuat!");
                handleReset();
              }}
            >
              <span className="flex items-center justify-center gap-x-2">
                <span>Kirim</span>
                <ArrowRightIcon />
              </span>
            </TransactionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
