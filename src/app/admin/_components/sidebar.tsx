"use client";
import React from "react";
import {
  ActivityIcon,
  CandidateIcon,
  GridIcon,
  Logo,
  SettingIcon,
  StatisticIcon,
  VoteIcon,
  WhitelistIcon,
} from "../../../../public/image";
import { usePathname } from "next/navigation";
import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { SidebarItem } from "./sidebar-item";
import type { StaticImageData } from "next/image";
import Image from "next/image";

export type SidebarType =
  | {
      name: string;
      href: string;
      searcParams?: string;
      icon: StaticImageData;
      show: boolean;
      subitems?: undefined;
    }
  | {
      name: string;
      href?: string;
      searcParams?: string;
      icon: StaticImageData;
      show: boolean;
      subitems:
        | {
            id: bigint;
            name: string;
            electionType: number;
            faculty: string;
            program: string;
            candidateCount: bigint;
          }[]
        | undefined;
    };

const Sidebar = () => {
  const pathName = usePathname();

  const { data: elections } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const siderBarItems: SidebarType[] = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: GridIcon,
      show: true,
    },
    {
      name: "Student Management",
      href: "/admin/student",
      icon: VoteIcon,
      show: true,
    },
    {
      name: "Voting Management",
      href: "/admin/vote",
      icon: VoteIcon,
      show: true,
    },

    {
      name: "Election",
      href: "/admin/election",
      icon: StatisticIcon,
      show: true,
    },
    {
      name: "BEM",
      href: `/admin/bem`,
      searcParams: `?election=${
        elections?.find((e) => e.electionType === 0)?.id
      }`,
      icon: CandidateIcon,
      show: elections?.find((e) => e.electionType === 0) ? true : false,
    },
    {
      name: "MPM",
      href: `/admin/mpm`,
      searcParams: `?election=${
        elections?.find((e) => e.electionType === 4)?.id
      }`,
      icon: CandidateIcon,
      show: elections?.find((e) => e.electionType === 4) ? true : false,
    },
    {
      name: "DPM",
      href: `/admin/dpm`,
      searcParams: `?election=${
        elections?.find((e) => e.electionType === 3)?.id
      }`,
      icon: CandidateIcon,
      show: elections?.find((e) => e.electionType === 3) ? true : false,
    },
    {
      name: "Faculty",
      icon: CandidateIcon,
      subitems: elections?.filter((e) => e.electionType === 1),
      show: elections?.find((e) => e.electionType === 1) ? true : false,
    },
    {
      name: "Program",
      icon: CandidateIcon,
      subitems: elections?.filter((e) => e.electionType === 2),
      show: elections?.find((e) => e.electionType === 2) ? true : false,
    },
    {
      name: "Whitelist",
      href: "/admin/whitelist",
      icon: WhitelistIcon,
      show: true,
    },

    {
      name: "Activity Log",
      href: "/admin/activity-log",
      icon: ActivityIcon,
      show: true,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: SettingIcon,
      show: true,
    },
  ];

  return (
    <aside className="h-full col-span-1 border-r border-r-[#A1A1A1] border-r-opacity-30">
      <div className="mt-10 flex items-center px-4 gap-1 justify-center">
        <Image src={Logo} alt="logo-icon" className="object-contain" />
      </div>
      <div className="flex flex-col mt-12">
        {siderBarItems.map((item) => (
          <SidebarItem key={item.name} item={item} pathName={pathName} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
