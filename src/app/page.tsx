import Image from "next/image";
import HomeButton from "./_components/home-button";
import { HomeAsset } from "../../public/image";

export default function Home() {
  return (
    <main className="grid md:grid-cols-2 gap-x-16 w-full max-w-7xl mx-auto text-white md:h-[calc(100vh-90px)] md:mt-[90px] h-[calc(100vh-80px)] mt-[80px] px-4">
      <div className="flex flex-col gap-y-3 md:gap-y-8 justify-center order-2 md:order-1">
        <h1 className="font-bold text-2xl xl:text-5xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing.
        </h1>
        <p className="font-medium text-xs xl:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          voluptatibus inventore excepturi officia voluptate maiores aut
          recusandae provident quo asperiores.
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
    </main>
  );
}
