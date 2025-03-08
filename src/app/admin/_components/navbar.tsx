"use client";
import { WalletConnectButton } from "@/app/_components/connect-button";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#111111] border-b border-gray-800 shadow-md">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl text-[#FFFF00]">Hi, Admin</h1>
      </div>
      <div className="w-40">
        <WalletConnectButton admin />
      </div>
    </nav>
  );
};
