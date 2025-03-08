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
      className={`bg-black/30 w-full h-screen fixed lg:static top-[76px] left-0 backdrop-blur-md transform transition-all duration-300 lg:backdrop-blur-none ease-linear lg:bg-transparent ${
        isMenuOpen ? "left-0" : "left-[-100%]"
      } lg:left-0`}
    >
      <div className="bg-[#1C1C1C] w-4/5 lg:w-full px-4 h-full overflow-y-auto max-h-screen lg:max-h-[calc(100vh-120px)]">
        <div className="flex items-center justify-between py-3 lg:hidden">
          <p></p>
          <p className="font-bold text-lg">Tutorial</p>
          <button onClick={handleOpenMenu}>
            <Image
              alt="close-button"
              src={CloseIcon}
              className="w-6 h-6"
              draggable={false}
            />
          </button>
        </div>

        <div className="py-4 h-full overflow-y-auto">
          {tutorials.map((tutorial, index) => (
            <div key={tutorial.title} className="mb-4">
              <button
                onClick={() => toggleSubmenu(index)}
                className="bg-[#F4FFC1] cursor-pointer w-full py-2.5 text-[#443004] text-left px-4 font-bold rounded-md mb-2 hover:bg-[#E4EFB1] transition-colors"
              >
                {tutorial.title}
              </button>

              {openTutorialIndex === index && tutorial.tutorials && (
                <div className="pl-4 space-y-2 mb-2">
                  {tutorial.tutorials.map((subTutorial, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubTutorialSelect(subTutorial)}
                      className={`w-full py-2 text-left px-4 rounded-md hover:text-[#D1BF00] transition-colors cursor-pointer ${
                        activeSubTutorial === subTutorial.title
                          ? "text-[#D1BF00]"
                          : "text-white"
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
