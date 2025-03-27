import React from "react";
import { StudentList } from "./_components/student-list";
import {
  getAllDepartements,
  getAllFaculties,
  getAllPrograms,
  getAllStudents,
} from "@/lib/api";
import { cookies } from "next/headers";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const jwt = (await cookieStore).get("jwt")?.value;
  const { search = undefined, tokenStatus = undefined } = await searchParams;

  const [students, faculties, programs, departements] = await Promise.all([
    getAllStudents(search, tokenStatus),
    getAllFaculties(),
    getAllPrograms(),
    getAllDepartements(),
  ]);

  return (
    <div className="p-8">
      <StudentList
        jwt={jwt!}
        adminSection={true}
        students={students}
        faculties={faculties}
        programs={programs}
        departements={departements}
      />
    </div>
  );
};

export default Page;
