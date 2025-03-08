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

interface Props {
  students: IStudent[];
  faculties: IFaculty[];
  programs: IProgram[];
  jwt: string;
  adminSection?: boolean;
}

export const StudentList = ({
  students,
  faculties,
  programs,
  jwt,
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
  } = useStudent(jwt, students);

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
    <div className="bg-[#111111]">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-white font-bold text-2xl flex items-center">
            <span className="w-1 h-8 bg-[#FFFF00] mr-3 rounded-full"></span>
            Daftar Mahasiswa
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                autoFocus
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#222222] border border-gray-700 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent"
                placeholder="Cari mahasiswa..."
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

            {adminSection ? (
              <>
                <div className="w-full md:w-auto">
                  <select
                    className="w-full px-4 py-2.5 rounded-lg bg-[#222222] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent appearance-none"
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value="">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Tidak Aktif</option>
                    <option value="used">Digunakan</option>
                  </select>
                </div>

                <button
                  onClick={() => handleOpenModal()}
                  className="w-full md:w-auto bg-[#222222] hover:bg-[#333333] text-white font-medium rounded-lg px-5 py-2.5 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Tambah Mahasiswa
                </button>

                <button
                  disabled={loadingGenerate}
                  onClick={() => handleGenerateBulkToken()}
                  className="w-full md:w-auto bg-[#FFFF00] hover:bg-[#E6E600] text-black font-medium rounded-lg px-5 py-2.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingGenerate ? (
                    <Image
                      alt="circle-loading"
                      src={CircleLoading}
                      width={20}
                      height={20}
                      className="animate-spin"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      Generate Token Massal
                    </>
                  )}
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-5 bg-[#111111] rounded-lg overflow-hidden">
          {students.length === 0 ? (
            <NotFoundData />
          ) : (
            <Table
              showNumber
              adminSection={adminSection}
              data={students}
              loadingDelete={loadingDelete}
              loadingGenerate={loadingGenerate}
              onDelete={handleDeleteStudent}
              onGenerateToken={handleGenerateSingleToken}
              onUpdate={handleOpenModal}
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
        <div className="bg-[#111111] p-6 rounded-xl w-full">
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
        </div>
      </Modal>
    </div>
  );
};
