import React from "react";
import { WhitelistForm } from "./_components/whitelist-form";

async function Page() {
  return (
    <main className="w-full max-w-7xl mx-auto text-white h-[calc(100vh-90px)] mt-[90px] flex items-center justify-center px-4">
      <WhitelistForm />
    </main>
  );
}

export default Page;
