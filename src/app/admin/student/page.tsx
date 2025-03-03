import React from "react";
import { StudentList } from "./_components/student-list";
import { getAllFaculties, getAllPrograms, getAllStudents } from "@/lib/api";
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

  const [students, faculties, programs] = await Promise.all([
    getAllStudents(search, tokenStatus),
    getAllFaculties(),
    getAllPrograms(),
  ]);

  return (
    <div className="p-8">
      <StudentList
        jwt={jwt!}
        adminSection={true}
        students={students}
        faculties={faculties}
        programs={programs}
      />
    </div>
  );
};

export default Page;
