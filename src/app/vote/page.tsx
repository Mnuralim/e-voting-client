import React, { Suspense } from "react";
import { VotingComponent } from "./_components/vote";

export const dynamic = "force-dynamic";

function Page() {
  return (
    <div className="mt-20 px-4 xl:mt-0 py-20 xl:py-0">
      <Suspense>
        <VotingComponent />
      </Suspense>
    </div>
  );
}

export default Page;
