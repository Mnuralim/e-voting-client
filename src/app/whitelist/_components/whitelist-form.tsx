"use client";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { contract } from "@/lib/contract";
import { client } from "@/lib/thirdweb-client";
import { supportedWallets } from "@/lib/utils";
import React, { useState } from "react";
import { arbitrumSepolia } from "thirdweb/chains";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

const WhitelistForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const account = useActiveAccount();
  const { data: isWhitelisted } = useReadContract({
    contract,
    method: "getNFTHolders",
  });

  const handleWhitelistAddress = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/whitelist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAddress: account?.address,
            token,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      onSuccessAlert("Address whitelisted successfully");
    } catch (error) {
      onErrorAlert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-2/5 gap-4">
      <h1 className="text-3xl font-bold text-center">Whitelist Your Address</h1>

      <ConnectButton
        client={client}
        autoConnect={false}
        wallets={supportedWallets}
        chain={arbitrumSepolia}
        theme={"dark"}
        signInButton={{
          style: {
            width: "60%",
          },
        }}
      />
      {account && !isWhitelisted?.find((w) => w.holder === account?.address) ? (
        <>
          <input
            type="text"
            placeholder="Token ID"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleWhitelistAddress}
            disabled={isLoading}
            className="border-white font-semibold bg-white text-black border-opacity-20 rounded-lg py-2.5 px-3 w-3/5"
          >
            {isLoading ? "Whitelisting..." : "Whitelist"}
          </button>
        </>
      ) : (
        account?.address && (
          <p className="text-center text-sm text-[#A1A1A1]">
            You are already whitelisted
          </p>
        )
      )}
    </div>
  );
};

export default WhitelistForm;
