import React from "react";
import { ListCandidate } from "../_components/list-candidate";

interface Props {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}

async function Page({ searchParams }: Props) {
  const { election = "" } = await searchParams;
  return (
    <div>
      <ListCandidate electionId={election} />
    </div>
  );
}

export default Page;
