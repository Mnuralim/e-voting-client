"use client";

import { contract } from "@/lib/contract";
import React, { useState } from "react";
import { TransactionButton, useReadContract } from "thirdweb/react";
import Modal from "../../_components/modal";
import { prepareContractCall } from "thirdweb";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { Table } from "@/app/_components/table";
import Image from "next/image";
import { CircleLoading } from "../../../../../public/image";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<number>(0);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [program, setProgram] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<number | null>(null);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const { data: elections, isLoading } = useReadContract({
    contract,
    method: "getAllElections",
  });

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

  const handleSelectType = (type: number) => {
    setProgram(null);
    setFaculty(null);
    setType(type);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleFilter = (value: string) => {
    setFilterType(value === "" ? null : Number(value));
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
    }, 1000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredElections = elections?.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === null || e.electionType === filterType;

    return matchesSearch && matchesType;
  });

  const filteredFaculties = faculties.filter(
    (f) =>
      !elections?.find((e) => e.faculty.toLowerCase() === f.name.toLowerCase())
  );
  const filteredPrograms = programs.filter(
    (p) => !elections?.find((e) => e.program === p.name)
  );

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">List Election</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <input
                type="text"
                defaultValue={search}
                value={search}
                autoFocus
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
                {
                  header: "Election ID",
                  key: "id",
                },
                {
                  header: "Name",
                  key: "name",
                },
                {
                  header: "Type",
                  key: "type",
                },
                {
                  header: "Faculty",
                  key: "faculty",
                },
                {
                  header: "Program",
                  key: "program",
                },
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
          <div className="mb-4">
            <label className="block mb-2 text-white">Name</label>
            <input
              type={"text"}
              name={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded peer text-black"
            />
            <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
              Name is required
            </p>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <select
              name="type"
              id="type"
              required
              defaultValue={"select"}
              value={type}
              onChange={(e) => handleSelectType(parseInt(e.target.value))}
              className="w-full p-2 border rounded peer text-black"
            >
              <option value={"select"} disabled>
                Select Type
              </option>
              {electionType.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
              Type is required
            </p>
          </div>
          {type === 1 ? (
            <div className="mb-4">
              <label className="block mb-2">Faculty</label>
              <select
                name="faculty"
                id="faculty"
                required
                defaultValue={"select"}
                value={faculty as string}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full p-2 border rounded peer text-black"
              >
                <option value={"select"} disabled>
                  Select Faculty
                </option>
                {filteredFaculties.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
                Faculty is required
              </p>
            </div>
          ) : null}
          {type === 2 ? (
            <div className="mb-4">
              <label className="block mb-2">Program</label>
              <select
                name="program"
                id="program"
                required
                defaultValue={"select"}
                value={program as string}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full p-2 border rounded peer text-black"
              >
                <option value={"select"} disabled>
                  Select Program
                </option>
                {filteredPrograms.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
                Program is required
              </p>
            </div>
          ) : null}
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
                setOpenModal(false);
                onSuccessAlert("Election created!");
                setFaculty(null);
                setProgram(null);
                setName("");
                setType(0);
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
