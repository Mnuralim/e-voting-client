import React, { Suspense } from "react";
import { VotingComponent } from "./_components/vote";

export const dynamic = "force-dynamic";

function Page() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-[76px] md:mt-[120px]">
      <Suspense>
        <VotingComponent />
      </Suspense>
    </div>
  );
}

export default Page;
