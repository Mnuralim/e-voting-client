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
    <div>
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">List Students</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={search}
                autoFocus
                onChange={handleInputChange}
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
            {adminSection ? (
              <>
                <div>
                  <select
                    className="w-full p-2 border rounded bg-[#333333] text-white text-sm"
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                <button
                  onClick={() => handleOpenModal()}
                  className="border-[#444444] bg-[#444444] font-semibold text-white border-opacity-20 rounded-lg py-2 px-3 hover:bg-[#555555] transition-colors"
                >
                  Add Student
                </button>
                <button
                  disabled={loadingGenerate}
                  onClick={() => handleGenerateBulkToken()}
                  className="border-green-500 bg-green-500 font-semibold text-white border-opacity-20 rounded-lg py-2 px-3 hover:bg-green-600 transition-colors"
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
                    "Generate Bulk Token"
                  )}
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="mt-5">
          {students.length === 0 ? (
            <p className="text-center py-4 text-[#A1A1A1]">
              Data tidak ditemukan
            </p>
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
                  header: "Name",
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
                  header: "Faculty",
                  key: "faculty",
                  render: (item) => item.faculty.name,
                },
                {
                  header: "Program",
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
          title={selectedId ? "Update Student" : "Add Student"}
          onSubmit={selectedId ? handleUpdateStudent : handleCreateStudent}
          buttonText="Submit"
          fields={[
            {
              type: "text",
              name: "name",
              label: "Name",
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
              label: "Faculty",
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
              label: "Program",
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
