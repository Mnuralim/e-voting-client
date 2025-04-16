import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CloseIcon } from "../../../../public/image";
import { tutorials, SubTutorial } from "@/lib/data";

interface Props {
  isMenuOpen: boolean;
  handleOpenMenu: () => void;
  onSubTutorialSelect: (subTutorial: SubTutorial) => void;
  isMobile: boolean;
  activeParentIndex: number | null;
}

export const Menu = ({
  isMenuOpen,
  handleOpenMenu,
  onSubTutorialSelect,
  isMobile,
  activeParentIndex,
}: Props) => {
  const [openTutorialIndex, setOpenTutorialIndex] = useState<number | null>(
    null
  );
  const [activeSubTutorial, setActiveSubTutorial] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (activeParentIndex !== null) {
      setOpenTutorialIndex(activeParentIndex);
    }
  }, [activeParentIndex]);

  const toggleSubmenu = (index: number) => {
    setOpenTutorialIndex(openTutorialIndex === index ? null : index);
  };

  const handleSubTutorialSelect = (subTutorial: SubTutorial) => {
    setActiveSubTutorial(subTutorial.title);
    onSubTutorialSelect(subTutorial);
    if (isMobile) {
      handleOpenMenu();
    }
  };

  return (
    <div
      className={`bg-black/30 w-full h-screen fixed lg:static top-[95px] left-0 backdrop-blur-md transform transition-all duration-300 lg:backdrop-blur-none ease-linear lg:bg-transparent ${
        isMenuOpen ? "left-0" : "left-[-100%]"
      } lg:left-0`}
    >
      <div className="bg-[#FFE962] w-4/5 lg:w-full lg:p-0 h-full overflow-y-auto max-h-screen lg:max-h-[calc(100vh-120px)] lg:bg-white border-r-[3px] lg:border-r-0 border-[#111111]">
        <div className="flex items-center justify-between py-3 px-4 border-b-[3px] border-[#111111] lg:hidden">
          <div className="w-6"></div>
          <p className="font-bold text-lg text-[#111111]">Tutorial</p>
          <button
            onClick={handleOpenMenu}
            className="bg-[#FF3A5E] p-1 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]"
          >
            <Image
              alt="close-button"
              src={CloseIcon}
              className="w-5 h-5"
              draggable={false}
            />
          </button>
        </div>

        <div className="py-4 px-4 h-full overflow-y-auto">
          {tutorials.map((tutorial, index) => (
            <div key={tutorial.title} className="mb-6">
              <button
                onClick={() => toggleSubmenu(index)}
                className="bg-[#FF3A5E] cursor-pointer w-full py-3 text-white text-left px-4 font-bold border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] mb-3 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#111111] transition-all"
              >
                {tutorial.title}
              </button>

              {openTutorialIndex === index && tutorial.tutorials && (
                <div className="pl-4 space-y-3 mb-2">
                  {tutorial.tutorials.map((subTutorial, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubTutorialSelect(subTutorial)}
                      className={`w-full py-2 text-left px-4 rounded-none border-b-2 border-[#111111] transition-all cursor-pointer hover:bg-[#12E193] ${
                        activeSubTutorial === subTutorial.title
                          ? "bg-[#12E193] text-[#111111] font-bold"
                          : "text-[#111111] bg-transparent"
                      }`}
                    >
                      {subTutorial.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
