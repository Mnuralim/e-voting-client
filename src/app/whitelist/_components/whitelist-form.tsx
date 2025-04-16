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
          <div className="bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-6 w-full rotate-[-1deg]">
            <div className="bg-[#FF3A5E] p-3 w-fit mx-auto rotate-[2deg] mb-6">
              <h1 className="text-xl md:text-3xl font-bold text-white text-center">
                Daftarkan Alamat Dompet Anda
              </h1>
            </div>

            <div className="flex justify-center mb-6">
              <div className="md:w-36 transform rotate-[1deg]">
                <WalletConnectButton />
              </div>
            </div>

            <div className="mb-4 transform rotate-[-1deg]">
              <input
                type="text"
                placeholder="Token ID"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white text-[#111111] placeholder:text-[#666666] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] focus:outline-none"
              />
            </div>

            <div className="mb-6 transform rotate-[1deg]">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white text-[#111111] placeholder:text-[#666666] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] focus:outline-none"
              />
            </div>

            <div className="flex justify-center transform rotate-[-1deg]">
              <button
                onClick={handleWhitelistAddress}
                disabled={isLoading || !token || !email}
                className={`px-6 py-3 bg-[#12E193] text-[#111111] border-[3px] border-[#111111] font-bold shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all ${
                  isLoading || !token || !email
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isLoading ? "Proses Whitelist..." : "Whitelist"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-8 rotate-[-1deg]">
            <div className="md:w-36 transform rotate-[1deg]">
              <WalletConnectButton />
            </div>
          </div>
        )
      ) : (
        <div className="w-full max-w-md mx-auto my-8">
          <div className="bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-6 rotate-[-1deg]">
            <div className="flex justify-center mb-4">
              <div className="bg-[#12E193] rounded-full w-16 h-16 flex items-center justify-center border-[3px] border-[#111111] transform rotate-[2deg]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12L10.5 14.5L16 9"
                    stroke="#111111"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-[#FF3A5E] p-3 w-fit mx-auto rotate-[2deg] mb-6">
              <h3 className="font-bold text-xl text-white">
                Selamat! NFT Anda Berhasil di-Mint
              </h3>
            </div>

            <p className="text-[#111111] mb-6 text-center">
              Anda telah berhasil melakukan minting NFT sebagai persyaratan
              untuk voting tanggal 20 Maret 2025.
            </p>

            <div className="bg-white border-[3px] border-[#111111] p-4 mb-6 shadow-[4px_4px_0px_#111111] rotate-[-1deg]">
              <p className="text-[#111111] font-bold mb-2">Detail NFT:</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span className="text-[#111111] font-medium">Status:</span>
                  <span className="text-[#FF3A5E] font-bold">
                    Berhasil di-mint
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#111111] font-medium">NFT Anda:</span>
                  <Link
                    href={`https://base-sepolia.blockscout.com/token/${NFTContractAddress}?a=${account?.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#12E193] font-bold hover:underline truncate ml-2 max-w-[180px]"
                  >
                    Lihat di explorer
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#111111] font-medium">
                    Eligible Voting:
                  </span>
                  <span className="text-[#12E193] font-bold">✅ Ya</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FF6B6B] border-[3px] border-[#111111] p-4 shadow-[4px_4px_0px_#111111] rotate-[1deg]">
              <p className="text-[#111111] font-bold mb-2">
                Langkah Selanjutnya:
              </p>
              <ul className="text-left text-[#111111] space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>Voting akan dibuka pada tanggal 20 Maret 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>
                    Pastikan wallet Anda tetap terkoneksi saat melakukan voting
                    nanti
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>
                    NFT harus tetap berada di wallet Anda hingga proses voting
                    selesai
                  </span>
                </li>
              </ul>
              <div className="flex justify-center">
                <Link
                  href={"/tutorial"}
                  className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#111111] px-5 py-3 border-[3px] border-[#111111] font-bold shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all"
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
          </div>
        </div>
      )}
    </div>
  );
};
