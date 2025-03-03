"use client";

import { getLoginPayload, isLoggedIn, login, logout } from "@/lib/api";
import { client } from "@/lib/thirdweb-client";
import { supportedWallets } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import type { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { arbitrumSepolia } from "thirdweb/chains";
const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false }
);

interface Props {
  admin?: boolean;
}

export const WalletConnectButton = ({ admin = false }: Props) => {
  const router = useRouter();
  return (
    <div>
      <ConnectButton
        wallets={supportedWallets}
        chain={arbitrumSepolia}
        theme={"dark"}
        client={client}
        auth={{
          getLoginPayload: async (params: {
            address: string;
          }): Promise<LoginPayload> => {
            return await getLoginPayload({
              params: {
                address: params.address,
                chainId: arbitrumSepolia.id.toString(),
              },
            });
          },

          doLogin: async (params: VerifyLoginPayloadParams) => {
            const response = await login({
              params,
            });

            if (response.ok) {
              if (admin) {
                router.push("/admin");
              }
            }
          },

          isLoggedIn: async () => {
            return await isLoggedIn();
          },

          doLogout: async () => {
            const response = await logout();
            if (admin) {
              if (response.ok) {
                router.push("/login");
              }
            }
          },
        }}
        connectButton={{
          style: {
            paddingTop: "8px",
            paddingBottom: "8px",
            backgroundColor: "#FFFF00",
            color: "#090909",
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          },
        }}
      />
    </div>
  );
};
