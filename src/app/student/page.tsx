import React from "react";
import {
  getAllDepartements,
  getAllFaculties,
  getAllPrograms,
  getAllStudents,
} from "@/lib/api";
import { cookies } from "next/headers";
import { StudentList } from "../admin/student/_components/student-list";

export const metadata = {
  title: "Daftar mahasiswa",
  description: "",
};

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

async function Page({ searchParams }: Props) {
  const cookieStore = cookies();
  const jwt = (await cookieStore).get("jwt")?.value;
  const { search = "", tokenStatus = "" } = await searchParams;
  const [students, faculties, programs, departements] = await Promise.all([
    getAllStudents(search, tokenStatus),
    getAllFaculties(),
    getAllPrograms(),
    getAllDepartements(),
  ]);

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto">
      <StudentList
        jwt={jwt!}
        students={students}
        faculties={faculties}
        programs={programs}
        departements={departements}
      />
    </div>
  );
}

export default Page;
