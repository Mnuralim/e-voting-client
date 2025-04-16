import Image from "next/image";
import React from "react";

interface Props {
  id: number;
  name: string;
  image: string;
  vision: string;
  mission: string;
  voteCount: number;
  selectedId: number;
  handleSelectCandidate: (id: number) => void;
}

export const CandidateCard = ({
  image,
  name,
  vision,
  mission,
  voteCount,
  selectedId,
  id,
  handleSelectCandidate,
}: Props) => {
  return (
    <div
      data-testid="candidate-card"
      onClick={() => handleSelectCandidate(id)}
      className={`flex flex-col justify-between cursor-pointer p-5 w-full md:max-w-[40%] mx-auto transition-all duration-300 border-[3px] border-[#111111] ${
        selectedId === id
          ? "bg-[#FFFF00] shadow-[6px_6px_0px_#111111] rotate-[-1deg]"
          : "bg-white shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px]"
      }`}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="relative bg-white w-full aspect-[18/13] overflow-hidden border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111]">
          <Image
            data-testid="candidate-image"
            alt={name}
            src={image}
            width={400}
            height={300}
            className="object-center object-contain w-full h-full"
          />
          {selectedId === id && (
            <div className="absolute top-2 right-2 bg-[#FF3A5E] text-white text-sm font-bold py-1 px-4 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] transform rotate-[-3deg]">
              DIPILIH
            </div>
          )}
        </div>

        <h1
          data-testid="candidate-name"
          className={`text-[#111111] text-xl font-bold tracking-tight bg-[#12E193] py-1 px-4 ${
            selectedId === id ? "transform rotate-[-2deg]" : ""
          }`}
        >
          {name}
        </h1>

        <div className="w-full space-y-4">
          <div className="relative">
            <div className="absolute -left-2 -top-2 bg-[#FF3A5E] text-white text-sm font-bold py-1 px-4 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] transform rotate-[-3deg]">
              VISI
            </div>
            <div
              className={`w-full bg-white p-4 pt-6 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] ${
                selectedId === id ? "bg-[#FFE962]" : ""
              }`}
            >
              <p
                data-testid="candidate-vision"
                className="text-sm text-[#111111] leading-relaxed"
              >
                {vision}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-2 -top-2 bg-[#FF3A5E] text-white text-sm font-bold py-1 px-4 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] transform rotate-[-3deg]">
              MISI
            </div>
            <div
              className={`w-full bg-white p-4 pt-6 border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] ${
                selectedId === id ? "bg-[#FFE962]" : ""
              }`}
            >
              <p
                data-testid="candidate-mission"
                className="text-sm text-[#111111] leading-relaxed"
              >
                {mission}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        data-testid="candidate-vote-count"
        className={`mt-6 py-2 px-4 text-base font-bold text-center border-[3px] border-[#111111] ${
          selectedId === id
            ? "bg-[#111111] text-white shadow-[2px_2px_0px_#111111] transform rotate-[-1deg]"
            : "bg-[#12E193] text-[#111111] shadow-[2px_2px_0px_#111111]"
        }`}
      >
        {voteCount} Suara
      </div>
    </div>
  );
};
