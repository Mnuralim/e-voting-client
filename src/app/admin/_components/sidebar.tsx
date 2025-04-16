"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useActiveAccount, useReadContract } from "thirdweb/react";
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

const roles = [
  { id: 1, name: "KPURM_UNIVERSITY", faculty: "" },
  { id: 2, name: "PAWASRA", faculty: "" },
  {
    id: 3,
    name: "KPURM_FAKULTAS_SAINS_DAN_TEKNOLOGI",
    faculty: "fakultas sains dan teknologi",
  },
  {
    id: 4,
    name: "KPURM_FAKULTAS_TEKNOLOGI_INFORMASI",
    faculty: "fakultas teknologi informasi",
  },
  {
    id: 5,
    name: "KPURM_FAKULTAS_ILMU_SOSIAL_DAN_POLITIK",
    faculty: "fakultas ilmu sosial dan politik",
  },
  {
    id: 6,
    name: "KPURM_FAKULTAS_KEGURUAN_DAN_ILMU_PENDIDIKAN",
    faculty: "fakultas keguruan dan ilmu pendidikan",
  },
  {
    id: 7,
    name: "KPURM_FAKULTAS_PERTANIAN_PERIKANAN_DAN_PETERNAKAN",
    faculty: "fakultas pertanian perikanan dan peternakan",
  },
  { id: 8, name: "KPURM_FAKULTAS_HUKUM", faculty: "fakultas hukum" },
];

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
            departement: string;
            dpm: string;
            kpurmFaculty: string;
          }[]
        | undefined;
    };

export const Sidebar = () => {
  const pathName = usePathname();
  const { data: elections } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const { data: admin } = useReadContract({
    contract,
    method: "admin",
  });

  const account = useActiveAccount();

  const { data: getRole } = useReadContract({
    contract,
    method: "getRole",
    params: [account?.address as string],
  });

  const isAdmin = admin === account?.address;
  const isKpurmUniv = getRole === 1;
  const isPawasra = getRole === 2;
  const isFacultyRole = (getRole as number) >= 3 && (getRole as number) <= 8;

  const filterElectionsByRole = (electionType: number) => {
    if (isAdmin || isPawasra) {
      return elections?.filter((e) => e.electionType === electionType) || [];
    }

    if (isFacultyRole) {
      const userFaculty = roles[(getRole as number) - 1]?.faculty;
      return (
        elections?.filter(
          (e) =>
            e.electionType === electionType && e.kpurmFaculty === userFaculty
        ) || []
      );
    }

    return [];
  };

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
      show: isAdmin,
    },
    {
      name: "Pemilihan",
      key: "election",
      href: "/admin/election",
      icon: StatisticSVG,
      show: isAdmin,
    },
    {
      name: "BEM",
      key: "bem",
      href: `/admin/bem?election=${
        elections?.find((e) => e.electionType === 0)?.id
      }`,
      icon: BemSVG,
      show:
        !!elections?.find((e) => e.electionType === 0) &&
        (isKpurmUniv || isAdmin || isPawasra),
    },
    {
      name: "MPM",
      key: "mpm",
      href: `/admin/mpm?election=${
        elections?.find((e) => e.electionType === 4)?.id
      }`,
      icon: MpmSVG,
      show:
        !!elections?.find((e) => e.electionType === 4) &&
        (isKpurmUniv || isAdmin || isPawasra),
    },
    {
      name: "DPM",
      key: "dpm",
      subitems: filterElectionsByRole(3),
      show:
        !!elections?.find((e) => e.electionType === 3) &&
        (isAdmin || isPawasra || isFacultyRole) &&
        !isKpurmUniv,
      icon: DpmSVG,
    },
    {
      name: "BEM Fakultas",
      key: "faculty",
      icon: FacultySVG,
      subitems: filterElectionsByRole(1),
      show:
        !!elections?.find((e) => e.electionType === 1) &&
        (isAdmin || isPawasra || isFacultyRole) &&
        !isKpurmUniv,
    },
    {
      name: "HMJ",
      key: "departement",
      icon: FacultySVG,
      subitems: filterElectionsByRole(5),
      show:
        !!elections?.find((e) => e.electionType === 5) &&
        (isAdmin || isPawasra || isFacultyRole) &&
        !isKpurmUniv,
    },
    {
      name: "HMPS",
      key: "program",
      icon: ProgramSVG,
      subitems: filterElectionsByRole(2),
      show:
        !!elections?.find((e) => e.electionType === 2) &&
        (isAdmin || isPawasra || isFacultyRole) &&
        !isKpurmUniv,
    },
    {
      name: "Whitelist",
      key: "whitelist",
      href: "/admin/whitelist",
      icon: WhitelistSVG,
      show: true,
    },
    {
      name: "Manajemen Role",
      key: "role",
      href: "/admin/role",
      icon: ActivitySVG,
      show: isAdmin,
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
      href: "/admin/setting",
      icon: SettingSVG,
      show: true,
    },
  ];

  return (
    <aside className="h-screen sticky top-0 w-1/6 bg-white border-r-[3px] border-[#111111] overflow-y-auto custom-scrollbar">
      <div className="mt-8 flex items-center px-4 gap-1 justify-center">
        <div className="bg-[#FF3A5E] p-3 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] transform rotate-[-2deg]">
          <Image src={Logo} alt="logo-icon" className="object-contain" />
        </div>
      </div>
      <div className="flex flex-col mt-12 pb-8 px-3">
        {siderBarItems.map((item) => (
          <SidebarItem key={item.name} item={item} pathName={pathName} />
        ))}
      </div>
    </aside>
  );
};
