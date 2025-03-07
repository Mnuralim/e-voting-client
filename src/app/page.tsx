import Image from "next/image";
import HomeButton from "./_components/home-button";
import { HomeAsset, HomeVector } from "../../public/image";

export default function Home() {
  return (
    <main className="grid md:grid-cols-2 relative gap-x-16 w-full max-w-7xl mx-auto text-white md:h-[calc(100vh-90px)] md:mt-[90px] h-[calc(100vh-80px)] mt-[80px] px-4">
      <div className="flex flex-col gap-y-3 md:gap-y-8 justify-center order-2 md:order-1">
        <h1 className="font-bold text-2xl xl:text-5xl xl:leading-16">
          Pemilihan ORMAWA USN Kolaka 2025
        </h1>
        <p className="font-medium text-xs xl:text-base">
          Waktunya menentukan pemimpin yang akan membawa perubahan! Pilih
          kandidat terbaik untuk organisasi mahasiswa USN Kolaka dengan sistem
          e-voting berbasis blockchain yang transparan, aman, dan terpercaya.
        </p>
        <HomeButton />
      </div>
      <div className="flex items-center justify-center order-1 md:order-2">
        <Image
          alt="ilustration"
          src={HomeAsset}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="absolute bottom-[45%] md:bottom-0 -z-10 ">
        <Image
          src={HomeVector}
          alt="home-vector"
          className="w-full h-full object-cover"
        />
      </div>
    </main>
  );
}
