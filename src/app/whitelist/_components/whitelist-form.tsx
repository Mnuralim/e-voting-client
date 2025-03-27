"use client";
import { WalletConnectButton } from "@/app/_components/connect-button";
import { useWhitelist } from "../hooks/use-whitelist";
import Link from "next/link";
import { NFTContractAddress } from "@/lib/constant";

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
    <div className="flex flex-col justify-center items-center md:w-4/5 xl:w-2/5 gap-5 w-full">
      {!isWhitelisted?.find((w) => w.holder === account?.address) ? (
        account ? (
          <>
            <h1 className="text-xl md:text-3xl font-bold text-center">
              Daftarkan Alamat Dompet Anda
            </h1>
            <div className="md:w-36 mb-5">
              <WalletConnectButton />
            </div>
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
              disabled={isLoading || !token || !email}
              className={`px-4 w-3/4 py-2 bg-white border-[3px] cursor-pointer hover:bg-[#D1BF00] border-[#D1BF00] rounded-lg text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed `}
            >
              {isLoading ? "Proses Whitelist..." : "Whitelist"}
            </button>
          </>
        ) : (
          <div className="md:w-36 mb-5">
            <WalletConnectButton />
          </div>
        )
      ) : (
        <div className="bg-[#1A1A1A] border-2 border-[#FFFF00] w-full rounded-lg p-6 my-8 mx-auto text-center shadow-lg shadow-[#FFFF00]/10">
          <div className="flex justify-center mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="#1A1A1A"
                stroke="#FFFF00"
                strokeWidth="2"
              />
              <path
                d="M8 12L10.5 14.5L16 9"
                stroke="#FFFF00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-[#FFFF00] font-bold text-xl mb-3">
            Selamat! NFT Anda Berhasil di-Mint
          </h3>
          <p className="text-white mb-4">
            Anda telah berhasil melakukan minting NFT sebagai persyaratan untuk
            voting tanggal 20 Maret 2025.
          </p>

          <div className="bg-[#111111] p-3 rounded-md border border-[#FFFF00]/30 mb-4">
            <p className="text-white text-sm mb-1">Detail NFT:</p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Status:</span>
                <span className="text-[#FFFF00]">Berhasil di-mint</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">NFT Anda:</span>
                <Link
                  href={`https://base-sepolia.blockscout.com/token/${NFTContractAddress}?a=${account?.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFFF00] underline hover:text-[#D1BF00] truncate ml-2 max-w-[180px]"
                >
                  Lihat di explorer
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Eligible Voting:</span>
                <span className="text-[#FFFF00]">✅ Ya</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] p-4 rounded-md border border-[#FFFF00]/30 mb-4">
            <p className="text-white mb-2 font-bold">Langkah Selanjutnya:</p>
            <ul className="text-left text-white text-sm space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-[#FFFF00] mr-2">•</span>
                <span>Voting akan dibuka pada tanggal 20 Maret 2025</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFFF00] mr-2">•</span>
                <span>
                  Pastikan wallet Anda tetap terkoneksi saat melakukan voting
                  nanti
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFFF00] mr-2">•</span>
                <span>
                  NFT harus tetap berada di wallet Anda hingga proses voting
                  selesai
                </span>
              </li>
            </ul>
            <Link
              href={"/tutorial"}
              className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#111111] px-4 py-2 rounded-md font-bold hover:bg-[#D1BF00] transition-colors"
            >
              <span>Panduan Voting</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
