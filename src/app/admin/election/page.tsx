import React from "react";
import { ElectionList } from "./_components/election-list";
import { getAllFaculties, getAllPrograms } from "@/lib/api";

const Page = async () => {
  const [faculties, programs] = await Promise.all([
    getAllFaculties(),
    getAllPrograms(),
  ]);
  return (
    <main>
      <ElectionList faculties={faculties} programs={programs} />
    </main>
  );
};

export default Page;
