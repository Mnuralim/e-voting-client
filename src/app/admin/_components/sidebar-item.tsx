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
      <div className="flex flex-col mb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`py-3 px-4 border-[3px] shadow-[4px_4px_0px_#111111] transition-all cursor-pointer duration-200 flex items-center justify-between gap-3 ${
            pathName === `/admin/${item.key.toLowerCase()}`
              ? "bg-[#12E193] border-[#111111] text-[#111111] font-bold transform rotate-[-1deg]"
              : "bg-white border-[#111111] hover:bg-[#FFE962] text-[#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#111111]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`transition-all ${
                pathName === `/admin/${item.key.toLowerCase()}`
                  ? "text-[#111111]"
                  : "text-[#111111]"
              }`}
            >
              <Icon />
            </span>
            <span className="text-base font-bold">{item.name}</span>
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
              className="text-[#111111]"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>
        <div
          className={`ml-10 flex flex-col gap-2 mt-2 overflow-hidden transition-all duration-200 ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {item.subitems &&
            item.subitems.map((subitem) => (
              <Link
                key={subitem.name}
                href={`/admin/${
                  item.key === "faculty"
                    ? "faculty"
                    : item.key === "program"
                    ? "program"
                    : item.key === "dpm"
                    ? "dpm"
                    : "departement"
                }?election=${subitem.id}`}
                className={`py-2 px-4 border-[2px] border-[#111111] transition-all duration-200 text-sm font-bold ${
                  electionId === subitem.id.toString() &&
                  pathName === `/admin/${item.key.toLowerCase()}`
                    ? "bg-[#FF6B6B] text-[#111111] shadow-[3px_3px_0px_#111111] transform rotate-[-1deg]"
                    : "bg-white hover:bg-[#FFE962] text-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px]"
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
      className={`py-3 px-4 mb-3 border-[3px] transition-all duration-200 flex items-center gap-3 shadow-[4px_4px_0px_#111111] ${
        item.key !== ""
          ? pathName === `/admin/${item.key.toLowerCase()}`
            ? "bg-[#12E193] border-[#111111] text-[#111111] font-bold transform rotate-[-1deg]"
            : "bg-white border-[#111111] hover:bg-[#FFE962] text-[#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#111111]"
          : pathName === item.href
          ? "bg-[#12E193] border-[#111111] text-[#111111] font-bold transform rotate-[-1deg]"
          : "bg-white border-[#111111] hover:bg-[#FFE962] text-[#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#111111]"
      }`}
    >
      <span className="text-[#111111]">
        <Icon />
      </span>
      <span className="text-base font-bold">{item.name}</span>
    </Link>
  ) : null;
};
