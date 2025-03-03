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
    name: "Home",
    href: "/",
  },
  {
    name: "Tutorial",
    href: "/tutorial",
  },
  {
    name: "Vote",
    href: "/vote",
  },
  {
    name: "Students",
    href: "/student",
  },
];

const Navbar = () => {
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
    <nav className="fixed top-0 left-0 w-full">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-5 bg-[#111111]">
        <div className="flex items-center gap-2 justify-between w-full px-4">
          <Image src={Logo} alt="logo" draggable={false} />
          <button onClick={handleOpen} className="md:hidden">
            <Image
              src={isOpen ? CloseIcon : HamburgerIcon}
              alt="hamburger-icon"
              className="w-[30px] h-[30px] object-contain"
              draggable={false}
            />
          </button>
        </div>
        <div
          className={`fixed md:static w-full bg-[#111111] z-10 duration-300 transform transition-all ease-linear ${
            isOpen ? "top-[76px]" : "-top-full"
          }`}
        >
          <div className="items-center md:gap-x-10 gap-y-2 px-4 py-4 md:py-0 md:px-0 flex md:flex-row flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-bold bg-[#1C1C1C] w-full text-center rounded-md md:rounded-none py-2 md:bg-transparent ${
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
                className={`font-bold bg-[#1C1C1C] w-full text-center rounded-md md:rounded-none py-2 md:bg-transparent ${
                  pathName === "/whitelist"
                    ? "text-[#D1BF00]"
                    : "text-[#E7E7E7]"
                }`}
              >
                Register
              </Link>
            )}
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
