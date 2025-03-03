"use client";

import { WalletConnectButton } from "@/app/_components/connect-button";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-3 border-b border-b-[#A1A1A1]">
      <h1 className="font-bold text-2xl">Hi, Admin</h1>
      <WalletConnectButton admin />
    </nav>
  );
};
