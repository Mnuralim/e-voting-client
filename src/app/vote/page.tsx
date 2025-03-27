import React, { Suspense } from "react";
import { VotingComponent } from "./_components/vote";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Pilih Sekarang",
  description: "",
};

function Page() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-[76px] md:mt-[120px] px-4">
      <Suspense>
        <VotingComponent />
      </Suspense>
    </div>
  );
}

export default Page;
