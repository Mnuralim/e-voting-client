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
  const [departementId, setDepartementId] = useState<string | null>(null);
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
        if (student.departement_id) {
          setDepartementId(student.departement_id);
        }
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
        facultyId,
        departementId === "" ? null : departementId
      );
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      onSuccessAlert("Sukses menambahkan mahasiswa");
      setEmail("");
      setName("");
      setNim("");
      setProgramId("");
      setFacultyId("");
      setDepartementId(null);
      handleCloseModal();
      customRevalidation("/admin/student");
      customRevalidation("/student");
    } catch (error: unknown) {
      if (error instanceof Error) {
        onErrorAlert(error.message, false);
      } else {
        onErrorAlert("Terjadi kesalahan", false);
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
        facultyId,
        departementId === "" ? null : departementId
      );
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      onSuccessAlert("Sukses mengubah data mahasiswa");
      handleCloseModal();
      customRevalidation("/admin/student");
      setEmail("");
      setName("");
      setNim("");
      setProgramId("");
      setFacultyId("");
      setDepartementId(null);
      setSelectedId(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        onErrorAlert(error.message, false);
      } else {
        onErrorAlert("Terjadi kesalahan", false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    setLoadingDelete(true);
    try {
      const response = await deleteStudent(jwt, id);
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      customRevalidation("/admin/student");
      onSuccessAlert("Sukses menghapus data mahasiswa");
    } catch (error) {
      if (error instanceof Error) {
        onErrorAlert(error.message, false);
      } else {
        onErrorAlert("Terjadi kesalahan", false);
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
      onSuccessAlert("Sukses generate token");
    } catch (error) {
      if (error instanceof Error) {
        onErrorAlert(error.message, false);
      } else {
        onErrorAlert("Terjadi kesalahan", false);
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
      onSuccessAlert("Sukses generate token");
    } catch (error) {
      if (error instanceof Error) {
        onErrorAlert(error.message, false);
      } else {
        onErrorAlert("Terjadi kesalahan", false);
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
    departementId,
    setDepartementId,
  };
};
