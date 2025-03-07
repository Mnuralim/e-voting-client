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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">List Election</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full p-2 border rounded bg-[#333333] text-white text-sm placeholder-gray-400"
                placeholder="Search"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
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
                className="w-full p-2 border rounded bg-[#333333] text-white text-sm"
                onChange={(e) => handleFilter(e.target.value)}
                value={filterType === null ? "" : filterType}
              >
                <option value="">All Types</option>
                {electionType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="border-[#444444] bg-[#444444] font-semibold text-white border-opacity-20 rounded-lg py-2 px-3 hover:bg-[#555555] transition-colors"
            >
              Add Election
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
                { header: "Election ID", key: "id" },
                { header: "Name", key: "name" },
                { header: "Type", key: "type" },
                { header: "Faculty", key: "faculty" },
                { header: "Program", key: "program" },
              ]}
            />
          ) : (
            <div className="text-center py-4 text-[#A1A1A1]">
              Data tidak ditemukan
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div className="w-full p-16 overflow-y-auto h-full ">
          <h1 className="font-bold text-xl mb-8">
            {selectedId ? "Edit Election" : "Add Election"}
          </h1>
          <InputField
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <SelectField
            name="Type"
            value={type}
            options={electionType}
            onChange={(e) => handleSelectType(parseInt(e.target.value))}
            required
          />
          {type === 1 && (
            <SelectField
              name="Faculty"
              value={faculty as string}
              options={filteredFaculties}
              onChange={(e) => setFaculty(e.target.value)}
              required
            />
          )}
          {type === 2 && (
            <SelectField
              name="Program"
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
              className="bg-red-600 px-5 font-bold py-2.5 rounded-lg"
              onError={(error) => onErrorAlert(`${error.message}`)}
              onTransactionConfirmed={() => {
                onSuccessAlert("Election created!");
                handleReset();
              }}
            >
              Submit
            </TransactionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
