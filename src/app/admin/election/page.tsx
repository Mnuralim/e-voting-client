import React from "react";
import { ElectionList } from "./_components/election-list";
import { getAllDepartements, getAllFaculties, getAllPrograms } from "@/lib/api";

const Page = async () => {
  const [faculties, programs, departements] = await Promise.all([
    getAllFaculties(),
    getAllPrograms(),
    getAllDepartements(),
  ]);
  return (
    <main>
      <ElectionList
        faculties={faculties}
        programs={programs}
        departements={departements}
      />
    </main>
  );
};

export default Page;
