"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useReadContract } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import { Logo } from "../../../../public/image";
import {
  GridSVG,
  StudentSVG,
  VoteSVG,
  ActivitySVG,
  BemSVG,
  DpmSVG,
  FacultySVG,
  MpmSVG,
  ProgramSVG,
  SettingSVG,
  StatisticSVG,
  WhitelistSVG,
} from "./svg";

export type SidebarType =
  | {
      name: string;
      href: string;
      key: string;
      searchParams?: string;
      icon: React.FC;
      show: boolean;
      subitems?: undefined;
    }
  | {
      name: string;
      key: string;
      href?: string;
      searchParams?: string;
      icon: React.FC;
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

export const Sidebar = () => {
  const pathName = usePathname();
  const { data: elections } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const siderBarItems: SidebarType[] = [
    {
      name: "Beranda",
      key: "",
      href: "/admin",
      icon: GridSVG,
      show: true,
    },
    {
      name: "Manajemen Mahasiswa",
      key: "student",
      href: "/admin/student",
      icon: StudentSVG,
      show: true,
    },
    {
      name: "Manajemen Voting",
      key: "vote",
      href: "/admin/vote",
      icon: VoteSVG,
      show: true,
    },
    {
      name: "Pemilihan",
      key: "election",
      href: "/admin/election",
      icon: StatisticSVG,
      show: true,
    },
    {
      name: "BEM",
      key: "bem",
      href: `/admin/bem?election=${
        elections?.find((e) => e.electionType === 0)?.id
      }`,
      icon: BemSVG,
      show: !!elections?.find((e) => e.electionType === 0),
    },
    {
      name: "MPM",
      key: "mpm",
      href: `/admin/mpm?election=${
        elections?.find((e) => e.electionType === 4)?.id
      }`,
      icon: MpmSVG,
      show: !!elections?.find((e) => e.electionType === 4),
    },
    {
      name: "DPM",
      key: "dpm",
      href: `/admin/dpm?election=${
        elections?.find((e) => e.electionType === 3)?.id
      }`,
      icon: DpmSVG,
      show: !!elections?.find((e) => e.electionType === 3),
    },
    {
      name: "Fakultas",
      key: "faculty",
      icon: FacultySVG,
      subitems: elections?.filter((e) => e.electionType === 1) ?? [],
      show: !!elections?.find((e) => e.electionType === 1),
    },
    {
      name: "Program Studi",
      key: "program",
      icon: ProgramSVG,
      subitems: elections?.filter((e) => e.electionType === 2) ?? [],
      show: !!elections?.find((e) => e.electionType === 2),
    },
    {
      name: "Whitelist",
      key: "whitelist",
      href: "/admin/whitelist",
      icon: WhitelistSVG,
      show: true,
    },
    {
      name: "Log Aktivitas",
      key: "activity-log",
      href: "/admin/activity-log",
      icon: ActivitySVG,
      show: true,
    },
    {
      name: "Pengaturan",
      key: "settings",
      href: "/admin/settings",
      icon: SettingSVG,
      show: true,
    },
  ];

  return (
    <aside className="h-screen sticky top-0 w-1/6 bg-[#111111] border-r border-gray-800 overflow-y-auto custom-scrollbar shadow-md">
      <div className="mt-8 flex items-center px-4 gap-1 justify-center">
        <Image src={Logo} alt="logo-icon" className="object-contain" />
      </div>
      <div className="flex flex-col mt-12 pb-8 px-3">
        {siderBarItems.map((item) => (
          <SidebarItem key={item.name} item={item} pathName={pathName} />
        ))}
      </div>
    </aside>
  );
};
