import Image from "next/image";
import { HomeButton } from "./_components/home-button";
import { HomeAsset } from "../../public/image";

export default function Home() {
  return (
    <main className="grid lg:grid-cols-2 relative gap-x-8 w-full max-w-7xl mx-auto md:h-[calc(100vh-90px)] lg:mt-[90px] h-[calc(100vh-80px)] mt-[110px] px-6">
      <div className="flex flex-col gap-y-5 md:gap-y-8 justify-center order-2 lg:order-1">
        <div className="bg-[#FF3A5E] p-2 w-fit rotate-[-2deg] mt-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12l6 6L20 6"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="font-bold text-3xl md:text-4xl xl:text-6xl transform rotate-[-1deg] text-[#111111]">
          Pemilihan <span className="text-[#FFE962]">ORMAWA</span> USN Kolaka
          <span className="text-[#FFE962]"> 2025</span>
        </h1>
        <p className="font-medium text-sm md:text-base xl:text-lg bg-[#12E193] p-3 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] rotate-[1deg]">
          Waktunya menentukan pemimpin yang akan membawa perubahan! Pilih
          kandidat terbaik untuk organisasi mahasiswa USN Kolaka dengan sistem
          e-voting berbasis blockchain yang transparan, aman, dan terpercaya.
        </p>
        <HomeButton />
      </div>
      <div className="flex items-center justify-center order-1 lg:order-2 bg-[#FFE962] border-[3px] border-[#111111] shadow-[8px_8px_0px_#111111] m-4 p-4 transform rotate-[1deg]">
        <Image
          alt="ilustration"
          src={HomeAsset}
          className="w-full h-full object-contain transform rotate-[-2deg]"
          draggable={false}
        />
      </div>
    </main>
  );
}
