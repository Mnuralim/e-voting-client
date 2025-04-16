"use client";
import { useState } from "react";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { contract } from "@/lib/contract";
import { prepareContractCall } from "thirdweb";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

interface Role {
  id: number;
  name: string;
}

interface UserRole {
  address: string;
  roleId: number;
}

const ROLES: Role[] = [
  { id: 1, name: "KPURM_UNIVERSITY" },
  { id: 2, name: "PAWASRA" },
  { id: 3, name: "KPURM_FAKULTAS_SAINS_DAN_TEKNOLOGI" },
  { id: 4, name: "KPURM_FAKULTAS_TEKNOLOGI_INFORMASI" },
  { id: 5, name: "KPURM_FAKULTAS_ILMU_SOSIAL_DAN_POLITIK" },
  { id: 6, name: "KPURM_FAKULTAS_KEGURUAN_DAN_ILMU_PENDIDIKAN" },
  { id: 7, name: "KPURM_FAKULTAS_PERTANIAN_PERIKANAN_DAN_PETERNAKAN" },
  { id: 8, name: "KPURM_FAKULTAS_HUKUM" },
];

export const RoleManagement: React.FC = () => {
  const [addressInput, setAddressInput] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const account = useActiveAccount();
  const currentUserAddress = account?.address;

  const { data: userRolesData, isLoading: isLoadingRoles } = useReadContract({
    contract,
    method: "getAllUsersWithRoles",
  });

  const getRoleName = (roleId: number): string => {
    const role = ROLES.find((r) => r.id === roleId);
    return role ? role.name : `Unknown Role (${roleId})`;
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddressInput(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedRole(e.target.value);
  };

  const validateEthereumAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const processUserRoles = (): UserRole[] => {
    if (!userRolesData) return [];

    if (
      Array.isArray(userRolesData) &&
      userRolesData.length >= 2 &&
      Array.isArray(userRolesData[0]) &&
      Array.isArray(userRolesData[1])
    ) {
      const addresses = userRolesData[0];
      const roles = userRolesData[1];

      return addresses.map((address, index) => ({
        address,
        roleId: Number(roles[index]),
      }));
    } else if (
      userRolesData &&
      "users" in userRolesData &&
      "roles" in userRolesData &&
      Array.isArray(userRolesData.users) &&
      Array.isArray(userRolesData.roles)
    ) {
      return userRolesData.users.map((address, index) => ({
        address,
        roleId: Number((userRolesData.roles as Role[])[index]),
      }));
    }

    return [];
  };

  const userRolesList = processUserRoles();

  return (
    <div className="p-8 bg-white">
      <div className="relative mb-12 border-[3px] border-[#111111] bg-white p-6 shadow-[4px_4px_0px_#111111]">
        <div className="absolute -top-5 -left-3 bg-[#FF3A5E] border-[3px] border-[#111111] px-4 py-1 rotate-[-2deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">MANAJEMEN</span>
        </div>

        <h2 className="text-[#111111] font-bold text-3xl mb-8 mt-3 rotate-[-1deg]">
          Manajemen Role
        </h2>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="absolute -top-3 -left-2 bg-[#12E193] border-[2px] border-[#111111] px-3 py-0.5 rotate-[1deg] shadow-[2px_2px_0px_#111111]">
              <span className="font-bold text-sm text-[#111111]">WALLET</span>
            </div>

            <div className="border-[3px] border-[#111111] p-5 pt-6 bg-[#FFE962] shadow-[4px_4px_0px_#111111]">
              <input
                type="text"
                value={addressInput}
                onChange={handleAddressChange}
                placeholder="0x..."
                className="w-full p-3 border-[3px] border-[#111111] bg-white font-medium text-[#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 -left-2 bg-[#FF6B6B] border-[2px] border-[#111111] px-3 py-0.5 rotate-[-1deg] shadow-[2px_2px_0px_#111111]">
              <span className="font-bold text-sm text-white">ROLE</span>
            </div>

            <div className="border-[3px] border-[#111111] p-5 pt-6 bg-white shadow-[4px_4px_0px_#111111]">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full p-3 border-[3px] border-[#111111] bg-[#FFE962] font-medium text-[#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus:outline-none"
              >
                <option value="" disabled>
                  Pilih role
                </option>
                {ROLES.map((role) => (
                  <option key={role.id} value={role.id.toString()}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract,
                method: "assignRole",
                params: [addressInput, parseInt(selectedRole)],
              })
            }
            disabled={
              !validateEthereumAddress(addressInput) ||
              !selectedRole ||
              !currentUserAddress
            }
            className={`w-full border-[3px] border-[#111111] font-bold text-xl p-4 mt-2 shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all ${
              !validateEthereumAddress(addressInput) ||
              !selectedRole ||
              !currentUserAddress
                ? "bg-gray-300 text-[#555555]"
                : "bg-[#FFFF00] text-[#111111]"
            }`}
            onError={(error) => onErrorAlert(`${error.message}`)}
            onTransactionConfirmed={() => {
              onSuccessAlert("Role berhasil ditetapkan!");
              setAddressInput("");
              setSelectedRole("");
            }}
          >
            TETAPKAN ROLE
          </TransactionButton>
        </div>
      </div>

      <div className="relative border-[3px] border-[#111111] bg-white p-6 pt-10 shadow-[4px_4px_0px_#111111]">
        <div className="absolute -top-5 -left-3 bg-[#12E193] border-[3px] border-[#111111] px-4 py-1 rotate-[1deg] shadow-[2px_2px_0px_#111111]">
          <span className="font-bold text-white">DAFTAR</span>
        </div>

        <h3 className="text-[#111111] font-bold text-2xl mb-8 mt-0 rotate-[-1deg]">
          Daftar Role Aktif
        </h3>

        {isLoadingRoles ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#111111]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FF3A5E]">
                  <th className="px-4 py-3 text-left border-b-[3px] border-r-[3px] border-[#111111] font-bold text-white">
                    ALAMAT
                  </th>
                  <th className="px-4 py-3 text-left border-b-[3px] border-[#111111] font-bold text-white">
                    ROLE
                  </th>
                </tr>
              </thead>
              <tbody>
                {userRolesList && userRolesList.length > 0 ? (
                  userRolesList.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-[#FFE962]"
                      }`}
                    >
                      <td className="px-4 py-3 border-r-[3px] border-b-[3px] border-[#111111] font-mono font-medium text-[#111111]">
                        {item.address}
                      </td>
                      <td className="px-4 py-3 border-b-[3px] border-[#111111] font-medium text-[#111111]">
                        {getRoleName(item.roleId)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-8 text-center border-b-[3px] border-[#111111] bg-white font-medium text-[#111111]"
                    >
                      {userRolesData
                        ? "Belum ada role yang ditetapkan"
                        : "Error loading data"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
