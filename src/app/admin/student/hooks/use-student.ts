import React, { useState } from "react";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import {
  createStudent,
  deleteStudent,
  generateBulkToken,
  generateSingleToken,
  updateStudent,
} from "@/lib/api";
import { customRevalidation } from "@/actions";

export const useStudent = (jwt: string, students: IStudent[]) => {
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

  return {
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
  };
};
