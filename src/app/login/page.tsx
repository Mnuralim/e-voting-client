import React from "react";
import { WalletConnectButton } from "../_components/connect-button";

function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <WalletConnectButton admin />
    </div>
  );
}

export default Page;
