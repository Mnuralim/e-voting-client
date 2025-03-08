import Link from "next/link";
import { useState } from "react";
import type { SidebarType } from "./sidebar";
import { useSearchParams } from "next/navigation";

interface Props {
  item: SidebarType;
  pathName: string;
}

export const SidebarItem = ({ item, pathName }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const electionId = searchParams.get("election") || 0;
  const Icon = item.icon;

  if (item.subitems && item.show) {
    return (
      <div className="flex flex-col mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`py-3 px-4 rounded-lg transition-all cursor-pointer duration-200 flex items-center justify-between gap-3 ${
            pathName === `/admin/${item.key.toLowerCase()}`
              ? "bg-[#222222] text-[#FFFF00]"
              : "hover:bg-[#222222] text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`transition-all ${
                pathName === `/admin/${item.key.toLowerCase()}`
                  ? "text-[#FFFF00]"
                  : "text-gray-400"
              }`}
            >
              <Icon />
            </span>
            <span className="text-base font-medium">{item.name}</span>
          </div>
          <div
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${
                pathName === `/admin/${item.key.toLowerCase()}`
                  ? "text-[#FFFF00]"
                  : "text-gray-400"
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>
        <div
          className={`ml-10 flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-200 ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {item.subitems &&
            item.subitems.map((subitem) => (
              <Link
                key={subitem.name}
                href={`/admin/${
                  item.key === "faculty" ? "faculty" : "program"
                }?election=${subitem.id}`}
                className={`py-2 px-4 rounded-lg transition-all duration-200 text-sm ${
                  electionId === subitem.id.toString()
                    ? "bg-[#222222] text-[#FFFF00]"
                    : "hover:bg-[#222222] text-white opacity-80 hover:opacity-100"
                }`}
              >
                {subitem.name}
              </Link>
            ))}
        </div>
      </div>
    );
  }

  return item.href && item.show ? (
    <Link
      href={item.searchParams ? item.href + item.searchParams : item.href}
      className={`py-3 px-4 rounded-lg mb-1 transition-all duration-200 flex items-center gap-3 ${
        item.key !== ""
          ? pathName === `/admin/${item.key.toLowerCase()}`
            ? "bg-[#222222] text-[#FFFF00]"
            : "hover:bg-[#222222] text-white"
          : pathName === item.href
          ? "bg-[#222222] text-[#FFFF00]"
          : "hover:bg-[#222222] text-white"
      }`}
    >
      <span
        className={`transition-all ${
          (item.key !== "" &&
            pathName === `/admin/${item.key.toLowerCase()}`) ||
          (item.key === "" && pathName === item.href)
            ? "text-[#FFFF00]"
            : "text-gray-400"
        }`}
      >
        <Icon />
      </span>
      <span className="text-base font-medium">{item.name}</span>
    </Link>
  ) : null;
};
