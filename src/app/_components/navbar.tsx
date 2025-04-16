"use client";

import { contract } from "@/lib/contract";
import Link from "next/link";
import React, { useState } from "react";
import { useReadContract } from "thirdweb/react";
import { usePathname } from "next/navigation";
import { WalletConnectButton } from "./connect-button";
import Image from "next/image";
import { CloseIcon, HamburgerIcon, Logo } from "../../../public/image";

const navItems = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Panduan",
    href: "/tutorial",
  },
  {
    name: "Voting",
    href: "/vote",
  },
  {
    name: "Mahasiswa",
    href: "/student",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const { data: isVotingActive } = useReadContract({
    contract,
    method: "isVotingActive",
  });

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  if (pathName.startsWith("/admin") || pathName.startsWith("/login")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-20 border-b-[3px] border-[#111111]">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-5 bg-white">
        <div className="flex items-center gap-2 justify-between w-full px-4">
          <Link
            href={"/"}
            className="bg-[#FFE962] p-2 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]"
          >
            <Image
              src={Logo}
              alt="logo"
              draggable={false}
              className="w-[120px]"
            />
          </Link>
          <button
            onClick={handleOpen}
            className="lg:hidden cursor-pointer bg-[#FF6B6B] p-2 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]"
          >
            <Image
              src={isOpen ? CloseIcon : HamburgerIcon}
              alt="hamburger-icon"
              className="w-[24px] h-[24px] object-contain"
              draggable={false}
            />
          </button>
        </div>
        <div
          className={`fixed lg:static w-full bg-white border-b-[3px] border-[#111111] lg:border-b-0 z-10 duration-300 transform transition-all ease-linear ${
            isOpen ? "top-[76px]" : "-top-full"
          }`}
        >
          <div className="items-center lg:gap-x-4 gap-y-4 px-6 py-6 lg:py-0 md:px-0 flex lg:flex-row flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href === "/vote" ? "/vote?election=0" : item.href}
                onClick={() => setIsOpen(false)}
                className={`font-bold hover:bg-[#FFE962] px-4 py-2 border-[3px] w-full text-center lg:w-auto ${
                  pathName === item.href
                    ? "bg-[#FFFF00] border-[#111111] shadow-[4px_4px_0px_#111111]"
                    : "bg-white border-[#111111] hover:shadow-[4px_4px_0px_#111111] transition-all"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isVotingActive ? null : (
              <Link
                onClick={() => setIsOpen(false)}
                href={"/whitelist"}
                className={`font-bold px-4 py-2 border-[3px] w-full text-center lg:w-auto hover:bg-[#FFE962] ${
                  pathName === "/whitelist"
                    ? "bg-[#FFFF00] border-[#111111] shadow-[4px_4px_0px_#111111]"
                    : "bg-white border-[#111111] hover:shadow-[4px_4px_0px_#111111] transition-all"
                }`}
              >
                Whitelist
              </Link>
            )}
            <div className="lg:ml-2">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
