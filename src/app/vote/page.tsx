import React, { Suspense } from "react";
import { VotingComponent } from "./_components/vote";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div className="mt-20 px-4">
      <Suspense>
        <VotingComponent />
      </Suspense>
    </div>
  );
};

export default Page;
