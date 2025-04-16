"use client";
import { WalletConnectButton } from "@/app/_components/connect-button";
import { contract } from "@/lib/contract";
import React from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const roles = [
  { id: 1, name: "KPURM_UNIVERSITY" },
  { id: 2, name: "PAWASRA" },
  { id: 3, name: "KPURM_FAKULTAS_SAINS_DAN_TEKNOLOGI" },
  { id: 4, name: "KPURM_FAKULTAS_TEKNOLOGI_INFORMASI" },
  { id: 5, name: "KPURM_FAKULTAS_ILMU_SOSIAL_DAN_POLITIK" },
  { id: 6, name: "KPURM_FAKULTAS_KEGURUAN_DAN_ILMU_PENDIDIKAN" },
  { id: 7, name: "KPURM_FAKULTAS_PERTANIAN_PERIKANAN_DAN_PETERNAKAN" },
  { id: 8, name: "KPURM_FAKULTAS_HUKUM" },
];

export const Navbar = () => {
  const account = useActiveAccount();
  const { data: role } = useReadContract({
    contract,
    method: "userRoles",
    params: [account?.address as string],
  });

  const findRoleName = (roleId: number) => {
    return roles.find((role) => role.id === roleId)?.name;
  };

  return (
    <nav className="relative px-6 py-4 bg-white border-b-[3px] border-[#111111] shadow-[0px_4px_0px_#111111]">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <div className="bg-[#FF3A5E] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] px-4 py-2 rotate-[-1deg]">
            <h1 className="font-black text-xl text-white">E-VOTING ADMIN</h1>
          </div>

          <div className="ml-4 bg-[#FFE962] border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] px-3 py-1 rotate-[1deg]">
            <span className="font-bold text-[#111111]">
              Hi, Admin {findRoleName(role as number)}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="transform rotate-[-1deg]">
            <WalletConnectButton admin />
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 left-12 bg-[#12E193] w-6 h-6 border-[2px] border-[#111111] rotate-[15deg]"></div>
      <div className="absolute top-2 right-24 bg-[#FF6B6B] w-4 h-4 border-[2px] border-[#111111] rotate-[25deg]"></div>
    </nav>
  );
};
