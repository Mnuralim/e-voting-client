"use client";

import React, { useState } from "react";
import Modal from "../../_components/modal";
import Image from "next/image";
import { CircleLoading } from "../../../../../public/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Table } from "@/app/_components/table";
import { Form } from "@/app/_components/form";
import { useStudent } from "../hooks/use-student";
import { NotFoundData } from "@/app/_components/not-found-data";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";

const roles = [
  { id: 1, name: "KPURM_UNIVERSITY", faculty: "" },
  { id: 2, name: "PAWASRA", faculty: "" },
  {
    id: 3,
    name: "KPURM_FAKULTAS_SAINS_DAN_TEKNOLOGI",
    faculty: "fakultas sains dan teknologi",
  },
  {
    id: 4,
    name: "KPURM_FAKULTAS_TEKNOLOGI_INFORMASI",
    faculty: "fakultas teknologi informasi",
  },
  {
    id: 5,
    name: "KPURM_FAKULTAS_ILMU_SOSIAL_DAN_POLITIK",
    faculty: "fakultas ilmu sosial dan politik",
  },
  {
    id: 6,
    name: "KPURM_FAKULTAS_KEGURUAN_DAN_ILMU_PENDIDIKAN",
    faculty: "fakultas keguruan dan ilmu pendidikan",
  },
  {
    id: 7,
    name: "KPURM_FAKULTAS_PERTANIAN_PERIKANAN_DAN_PETERNAKAN",
    faculty: "fakultas pertanian perikanan dan peternakan",
  },
  { id: 8, name: "KPURM_FAKULTAS_HUKUM", faculty: "fakultas hukum" },
];

interface Props {
  students: IStudent[];
  faculties: IFaculty[];
  programs: IProgram[];
  departements: IDepartement[];
  jwt: string;
  adminSection?: boolean;
}

export const StudentList = ({
  students,
  faculties,
  programs,
  jwt,
  departements,
  adminSection = false,
}: Props) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const {
    openModal,
    selectedId,
    name,
    nim,
    email,
    programId,
    facultyId,
    loading,
    loadingDelete,
    loadingGenerate,
    handleOpenModal,
    handleCloseModal,
    handleCreateStudent,
    handleUpdateStudent,
    handleDeleteStudent,
    handleGenerateSingleToken,
    handleGenerateBulkToken,
    setName,
    setNim,
    setEmail,
    setProgramId,
    setFacultyId,
    setDepartementId,
    departementId,
  } = useStudent(jwt, students);

  const account = useActiveAccount();
  const { data: getRole } = useReadContract({
    contract: contract,
    method: "userRoles",
    params: [account?.address as string],
  });

  const { data: admin } = useReadContract({
    contract: contract,
    method: "admin",
  });
  const isPawasra = getRole === 2;
  const isKpurmFaculty = (getRole as number) > 2 && (getRole as number) < 9;

  const getRoleName = roles.find((role) => role.id === getRole)?.faculty;
  const filterStudent = adminSection
    ? account?.address === admin || getRole === 1 || getRole === 2
      ? students
      : students.filter(
          (student) =>
            student.faculty.name.toLowerCase() === getRoleName?.toLowerCase()
        )
    : students;

  const handleSearch = useDebouncedCallback((searchValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }
    replace(`${adminSection ? "/admin" : ""}/student?${newParams.toString()}`);
    setIsSearching(false);
  }, 500);

  const handleFilter = (status: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (status) {
      newParams.set("tokenStatus", status);
    } else {
      newParams.delete("tokenStatus");
    }
    replace(`/admin/student?${newParams.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setIsSearching(true);
    handleSearch(value);
  };

  return (
    <div className="p-8 bg-white">
      <div className="border-[3px] border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111] relative">
        <div className="absolute -top-5 -left-3 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">MAHASISWA</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-[#111111] font-bold text-3xl rotate-[-1deg]">
            Daftar Mahasiswa
          </h2>

          <div className="flex flex-wrap items-center gap-4 my-6">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                autoFocus
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-[3px] border-[#111111] bg-[#FFE962] text-black font-bold text-base placeholder-gray-700 focus:outline-none shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rotate-[-1deg]"
                placeholder="Cari mahasiswa..."
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

            {adminSection ? (
              <>
                <div className="w-full md:w-auto rotate-[1deg]">
                  <select
                    className="w-full px-4 py-3 appearance-none border-[3px] border-[#111111] bg-[#12E193] text-black font-bold text-base focus:outline-none shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value="">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Tidak Aktif</option>
                    <option value="used">Digunakan</option>
                  </select>
                  <div className="absolute pointer-events-none right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {isPawasra ? null : (
                  <>
                    {isKpurmFaculty ? null : (
                      <button
                        onClick={() => handleOpenModal()}
                        className="w-full md:w-auto bg-[#FF6B6B] border-[3px] border-[#111111] px-5 py-3 text-black font-bold text-base shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 rotate-[-2deg]"
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Tambah Mahasiswa
                      </button>
                    )}

                    <button
                      disabled={loadingGenerate}
                      onClick={() => handleGenerateBulkToken()}
                      className="w-full md:w-auto bg-[#FFFF00] border-[3px] border-[#111111] px-5 py-3 text-black font-bold text-base shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rotate-[1deg]"
                    >
                      {loadingGenerate ? (
                        <Image
                          alt="circle-loading"
                          src={CircleLoading}
                          width={24}
                          height={24}
                          className="animate-spin"
                        />
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                          </svg>
                          Generate Token Massal
                        </>
                      )}
                    </button>
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-5 rounded-lg overflow-hidden">
          {filterStudent.length === 0 ? (
            <NotFoundData />
          ) : (
            <Table
              showNumber
              adminSection={adminSection}
              data={filterStudent}
              loadingDelete={loadingDelete}
              loadingGenerate={loadingGenerate}
              onDelete={
                isPawasra || isKpurmFaculty ? undefined : handleDeleteStudent
              }
              onGenerateToken={
                isPawasra ? undefined : handleGenerateSingleToken
              }
              onUpdate={
                isPawasra || isKpurmFaculty ? undefined : handleOpenModal
              }
              columns={[
                {
                  header: "Nama",
                  key: "name",
                },
                {
                  header: "Email",
                  key: "email",
                },
                {
                  header: "NIM",
                  key: "nim",
                },
                {
                  header: "Fakultas",
                  key: "faculty",
                  render: (item) => item.faculty.name,
                },
                {
                  header: "Jurusan",
                  key: "departement",
                  render: (item) =>
                    item.departement ? item.departement.name : "-",
                },
                {
                  header: "Program Studi",
                  key: "program",
                  render: (item) => item.program.name,
                },
              ]}
            />
          )}
        </div>
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <Form
          loading={loading}
          title={selectedId ? "Perbarui Mahasiswa" : "Tambah Mahasiswa"}
          onSubmit={selectedId ? handleUpdateStudent : handleCreateStudent}
          buttonText="Kirim"
          fields={[
            {
              type: "text",
              name: "name",
              label: "Nama",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
            },
            {
              type: "email",
              name: "email",
              label: "Email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
            },
            {
              type: "text",
              name: "nim",
              label: "NIM",
              value: nim,
              onChange: (e) => setNim(e.target.value),
              required: true,
            },
            {
              type: "select",
              name: "faculty",
              label: "Fakultas",
              value: facultyId,
              onChange: (e) => setFacultyId(e.target.value),
              required: true,
              options: faculties.map((faculty) => ({
                value: faculty.id,
                label: faculty.name,
              })),
            },
            {
              type: "select",
              name: "departement",
              label: "Jurusan",
              value: departementId || "",
              onChange: (e) => setDepartementId(e.target.value),
              options: [
                {
                  label: "Kosongkan",
                  value: "",
                },
                ...departements.map((departement) => ({
                  value: departement.id,
                  label: departement.name,
                })),
              ],
            },
            {
              type: "select",
              name: "program",
              label: "Program Studi",
              value: programId,
              onChange: (e) => setProgramId(e.target.value),
              required: true,
              options: programs.map((program) => ({
                value: program.id,
                label: program.name,
              })),
            },
          ]}
        />
      </Modal>
    </div>
  );
};
