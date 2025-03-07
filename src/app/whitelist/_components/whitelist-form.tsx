"use client";
import { WalletConnectButton } from "@/app/_components/connect-button";
import { useWhitelist } from "../hooks/use-whitelist";

export const WhitelistForm = () => {
  const {
    isLoading,
    token,
    email,
    account,
    isWhitelisted,
    setToken,
    setEmail,
    handleWhitelistAddress,
  } = useWhitelist();

  return (
    <div className="flex flex-col justify-center items-center md:w-2/5 gap-5 w-full">
      <h1 className="text-xl md:text-3xl font-bold text-center">
        Whitelist Your Address
      </h1>
      <div className="md:w-36 mb-5">
        <WalletConnectButton />
      </div>
      {account && !isWhitelisted?.find((w) => w.holder === account?.address) ? (
        <>
          <input
            type="text"
            placeholder="Token ID"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#74580F] text-[#F6F6F6] placeholder:text-[#B0B0B0] rounded-lg border border-[#74580F] focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#74580F] text-[#F6F6F6] placeholder:text-[#B0B0B0] rounded-lg border border-[#74580F] focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          <button
            onClick={handleWhitelistAddress}
            disabled={isLoading}
            className="px-4 w-3/4 py-2 bg-white border-[3px] cursor-pointer hover:bg-[#D1BF00] border-[#D1BF00] rounded-lg text-black font-bold"
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
