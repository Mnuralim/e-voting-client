"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HamburgerWhiteIcon } from "../../../../public/image";
import { Menu } from "./menu";
import { SubTutorial, tutorials } from "@/lib/data";

interface NavbarTutorialProps {
  onSubTutorialSelect: (subTutorial: SubTutorial) => void;
  activeParentIndex: number | null;
  selectedSubTutorial: SubTutorial | null;
}

export const NavbarTutorial = ({
  onSubTutorialSelect,
  activeParentIndex,
}: NavbarTutorialProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024);
      setIsMenuOpen(window.innerWidth >= 1024);

      const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (!mobile) {
          setIsMenuOpen(true);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleOpenMenu = () => {
    if (isMobile) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  return (
    <nav className="lg:w-96 top-[95px] lg:top-[120px] sticky lg:fixed lg:h-[calc(100vh-120px)] lg:overflow-hidden lg:border-r-[3px] border-[#111111] z-10">
      <div className="flex items-center justify-between px-4 py-3 bg-[#FF3A5E] border-b-[3px] border-[#111111] lg:hidden">
        <button
          onClick={handleOpenMenu}
          className="bg-[#FFE962] p-1 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]"
        >
          <Image
            alt="hamburger-white"
            src={HamburgerWhiteIcon}
            className="w-[24px] h-[24px]"
          />
        </button>
        <p className="font-bold text-white">
          {activeParentIndex !== null
            ? tutorials[activeParentIndex].title
            : "Tutorial"}
        </p>
        <div className="w-[30px]"></div> {/* Empty div for flex spacing */}
      </div>
      <Menu
        isMenuOpen={isMenuOpen}
        handleOpenMenu={handleOpenMenu}
        onSubTutorialSelect={onSubTutorialSelect}
        isMobile={isMobile}
        activeParentIndex={activeParentIndex}
      />
    </nav>
  );
};

export default NavbarTutorial;
