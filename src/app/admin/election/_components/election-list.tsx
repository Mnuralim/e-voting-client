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
import { customRevalidation } from "@/actions";

interface Props {
  faculties: IFaculty[];
  programs: IProgram[];
  departements: IDepartement[];
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
  {
    id: 5,
    name: "HMJ",
  },
];

export const ElectionList = ({ faculties, programs, departements }: Props) => {
  const {
    openModal,
    name,
    type,
    faculty,
    program,
    departement,
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
    handleSearch,
    handleFilter,
    handleReset,
    filteredDepartements,
    filteredDpm,
    dpm,
    handleNameChange,
    handleTypeChange,
    handleFacultyChange,
    handleProgramChange,
    handleDepartementChange,
    handleDpmChange,
  } = useElection(faculties, programs, departements);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8 bg-white">
      <div className="border-[3px] border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111] relative">
        <div className="absolute -top-5 -left-3 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">PEMILIHAN</span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-[#111111] font-bold text-3xl rotate-[-1deg]">
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
                className="w-full pl-12 pr-4 py-3 border-[3px] border-[#111111] bg-[#FFE962] text-black font-bold text-base placeholder-gray-700 focus:outline-none shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rotate-[-1deg]"
                placeholder="Cari pemilihan..."
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Image
                    alt="circle-loading"
                    src={CircleLoading}
                    width={24}
                    height={24}
                    className="animate-spin border-[2px] border-[#111111] rounded-full rotate-[3deg]"
                  />
                </div>
              )}
            </div>
            <div>
              <select
                className="w-full px-4 py-3 appearance-none border-[3px] border-[#111111] bg-[#12E193] text-black font-bold text-base focus:outline-none shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
              className="border-[3px] border-[#111111] bg-[#FFFF00] px-4 py-2 font-bold text-[#111111] shadow-[3px_3px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] transition-all flex items-center gap-2"
            >
              <PlusIcon />
              TAMBAH PEMILIHAN
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
                  departement: election.departement,
                })) || []
              }
              columns={[
                { header: "ID Pemilihan", key: "id" },
                { header: "Nama", key: "name" },
                { header: "Jenis", key: "type" },
                { header: "Fakultas", key: "faculty" },
                { header: "Jurusan", key: "departement" },
                { header: "Program Studi", key: "program" },
              ]}
            />
          ) : (
            <NotFoundData />
          )}
        </div>
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div className="w-full p-6 md:p-8 overflow-y-auto bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rotate-[-0.5deg] transform-gpu">
          <h1 className="font-bold text-2xl text-[#111111] mb-6 flex items-center rotate-[-1deg] transform-gpu">
            <span className="w-4 h-8 bg-[#FF3A5E] mr-3 rotate-[2deg] transform-gpu border-[2px] border-[#111111]"></span>
            Tambah Pemilihan
          </h1>
          <InputField
            type="text"
            name="Nama"
            value={name}
            onChange={handleNameChange}
            required
          />
          <SelectField
            name="Jenis"
            value={type === null ? "" : type}
            options={electionType}
            onChange={handleTypeChange}
            required
          />
          {type !== null && type !== 0 && type !== 4 && (
            <SelectField
              name="Fakultas"
              value={faculty === null ? "" : faculty}
              options={type === 1 ? filteredFaculties : faculties}
              onChange={handleFacultyChange}
              required
            />
          )}
          {type === 2 && (
            <SelectField
              name="Program Studi"
              value={program === null ? "" : program}
              options={filteredPrograms}
              onChange={handleProgramChange}
              required
            />
          )}
          {type === 3 && (
            <SelectField
              name="DPM"
              value={dpm === null ? "" : dpm}
              options={filteredDpm}
              onChange={handleDpmChange}
              required
            />
          )}
          {type === 5 && (
            <SelectField
              name="Jurusan"
              value={departement === null ? "" : departement}
              options={filteredDepartements}
              onChange={handleDepartementChange}
              required
            />
          )}
          <div className="flex justify-end mt-10">
            <TransactionButton
              transaction={async () =>
                prepareContractCall({
                  contract,
                  method: "createElection",
                  params: [
                    name,
                    type || 0,
                    faculty?.toLowerCase() || "",
                    program?.toLowerCase() || "",
                    departement?.toLowerCase() || "",
                    dpm?.toLowerCase() || "",
                  ],
                })
              }
              disabled={
                !name ||
                type === null ||
                (type === 1 && !faculty) ||
                (type === 2 && !program) ||
                (type === 3 && !dpm) ||
                (type === 5 && !departement)
              }
              unstyled
              className="bg-[#FFFF00] hover:bg-[#E6E600] text-black cursor-pointer font-medium rounded-lg py-2.5 px-5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              onError={(error) => onErrorAlert(`${error.message}`)}
              onTransactionConfirmed={() => {
                onSuccessAlert("Pemilihan berhasil dibuat!");
                handleReset();
                handleCloseModal();
                customRevalidation("/admin");
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
