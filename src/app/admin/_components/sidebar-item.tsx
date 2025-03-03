import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SidebarType } from "./sidebar";
import { ChevronDownIcon } from "../../../../public/image";
import { useSearchParams } from "next/navigation";

interface Props {
  item: SidebarType;
  pathName: string;
}

export const SidebarItem = ({ item, pathName }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const electionId = searchParams.get("election") || 0;

  if (item.subitems && item.show) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`py-2.5 px-4 rounded-lg hover:bg-[#FFFFFF0F] flex items-center justify-between gap-3 ${
            pathName === `/admin/${item.name.toLowerCase()}` && "bg-[#FFFFFF0F]"
          }`}
        >
          <div className="flex items-center gap-3">
            <Image
              alt={item.name}
              src={item.icon}
              draggable={false}
              className="w-7 h-7"
            />
            <span className="text-lg font-semibold text-[#A1A1A1]">
              {item.name}
            </span>
          </div>
          {isOpen ? (
            <Image
              alt="chevron"
              src={ChevronDownIcon}
              className="rotate-180 transform"
              width={18}
              draggable={false}
            />
          ) : (
            <Image
              alt="chevron"
              src={ChevronDownIcon}
              width={18}
              draggable={false}
            />
          )}
        </button>
        {isOpen && item.subitems && (
          <div className="ml-12 flex flex-col gap-2 mt-2">
            {item.subitems.map((subitem) => (
              <Link
                key={subitem.name}
                href={`/admin/${
                  item.name === "Faculty" ? "faculty" : "program"
                }?election=${subitem.id}`}
                className={`py-2 px-4 rounded-lg hover:bg-[#FFFFFF0F] ${
                  electionId === subitem.id.toString() && "bg-[#FFFFFF0F]"
                }`}
              >
                <span className="text-base text-[#A1A1A1]">{subitem.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return item.href && item.show ? (
    <Link
      href={item.searcParams ? item.href + item.searcParams : item.href}
      className={`py-2.5 px-4 rounded-lg hover:bg-[#FFFFFF0F] flex items-center gap-3 ${
        pathName === item.href && "bg-[#FFFFFF0F]"
      }`}
    >
      <Image
        alt={item.name}
        src={item.icon}
        draggable={false}
        className="w-7 h-7"
      />
      <span className="text-lg font-semibold text-[#A1A1A1]">{item.name}</span>
    </Link>
  ) : null;
};
