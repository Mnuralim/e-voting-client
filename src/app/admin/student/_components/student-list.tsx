"use client";

import React, { useState } from "react";
import Modal from "../../_components/modal";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import {
  createStudent,
  deleteStudent,
  generateBulkToken,
  generateSingleToken,
  updateStudent,
} from "@/lib/api";
import Image from "next/image";
import { CircleLoading } from "../../../../../public/image";
import { customRevalidation } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Table } from "@/app/_components/table";
import { Form } from "@/app/_components/form";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [nim, setNim] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [programId, setProgramId] = useState<string>("");
  const [facultyId, setFacultyId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingGenerate, setLoadingGenerate] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleOpenModal = (id?: string) => {
    setOpenModal(true);
    if (id) {
      setSelectedId(id);
      const student = students.find((student) => student.id === id);
      if (student) {
        setName(student.name);
        setNim(student.nim);
        setEmail(student.email);
        setProgramId(student.program_id);
        setFacultyId(student.faculty_id);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedId(null);
  };

  const handleCreateStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createStudent(
        jwt,
        name,
        nim,
        email,
        programId,
        facultyId
      );
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      onSuccessAlert("Success add student");
      setEmail("");
      setName("");
      setNim("");
      setProgramId("");
      setFacultyId("");
      handleCloseModal();
      customRevalidation("/admin/student");
    } catch (error: unknown) {
      if (error instanceof Error) {
        onErrorAlert(error.message);
      } else {
        onErrorAlert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateStudent(
        jwt,
        selectedId!,
        name,
        nim,
        email,
        programId,
        facultyId
      );
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      onSuccessAlert("Success update student");
      handleCloseModal();
      customRevalidation("/admin/student");
      setEmail("");
      setName("");
      setNim("");
      setProgramId("");
      setFacultyId("");
      setSelectedId(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        onErrorAlert(error.message);
      } else {
        onErrorAlert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    setLoadingDelete(true);
    try {
      const response = await deleteStudent(jwt, id);
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      customRevalidation("/admin/student");
      onSuccessAlert("Success delete student");
    } catch (error) {
      if (error instanceof Error) {
        onErrorAlert(error.message);
      } else {
        onErrorAlert("Something went wrong");
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleGenerateSingleToken = async (id: string) => {
    setLoadingGenerate(true);
    try {
      const response = await generateSingleToken(jwt, id);
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      customRevalidation("/admin/student");
      onSuccessAlert("Success generate token");
    } catch (error) {
      if (error instanceof Error) {
        onErrorAlert(error.message);
      } else {
        onErrorAlert("Something went wrong");
      }
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleGenerateBulkToken = async () => {
    setLoadingGenerate(true);
    try {
      const response = await generateBulkToken(jwt);
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      customRevalidation("/admin/student");
      onSuccessAlert("Success generate token");
    } catch (error) {
      if (error instanceof Error) {
        onErrorAlert(error.message);
      } else {
        onErrorAlert("Something went wrong");
      }
    } finally {
      setLoadingGenerate(false);
    }
  };

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
