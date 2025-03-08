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
    <nav className="fixed top-0 left-0 w-full z-20">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-5 bg-[#111111]">
        <div className="flex items-center gap-2 justify-between w-full px-4">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" draggable={false} />
          </Link>
          <button onClick={handleOpen} className="lg:hidden cursor-pointer">
            <Image
              src={isOpen ? CloseIcon : HamburgerIcon}
              alt="hamburger-icon"
              className="w-[30px] h-[30px] object-contain"
              draggable={false}
            />
          </button>
        </div>
        <div
          className={`fixed lg:static w-full bg-[#111111] rounded-b-xl shadow-amber-300 lg:shadow-none lg:rounded-b-none shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3)] z-10 duration-300 transform transition-all ease-linear ${
            isOpen ? "top-[76px]" : "-top-full"
          }`}
        >
          <div className="items-center lg:gap-x-10 gap-y-2 px-4 py-4 lg:py-0 md:px-0 flex lg:flex-row flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href === "/vote" ? "/vote?election=0" : item.href}
                onClick={() => setIsOpen(false)}
                className={`font-bold bg-[#1C1C1C] hover:text-[#D1BF00]  w-full text-center rounded-md md:rounded-none py-2 lg:bg-transparent ${
                  pathName === item.href ? "text-[#D1BF00]" : "text-[#E7E7E7] "
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isVotingActive ? null : (
              <Link
                onClick={() => setIsOpen(false)}
                href={"/whitelist"}
                className={`font-bold bg-[#1C1C1C] hover:text-[#D1BF00] w-full text-center rounded-md lg:rounded-none py-2 lg:bg-transparent ${
                  pathName === "/whitelist"
                    ? "text-[#D1BF00]"
                    : "text-[#E7E7E7]"
                }`}
              >
                Whitelist
              </Link>
            )}
            <div>
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
