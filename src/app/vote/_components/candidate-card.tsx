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
      className={`flex flex-col justify-between cursor-pointer rounded-2xl p-5 w-[80%] aspect-[226/290] items-center mx-auto transition-all duration-300 shadow-lg hover:shadow-xl ${
        selectedId === id
          ? "bg-gradient-to-br from-[#FFFF00] to-[#FFD700] border-2 border-[#A68B02]"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="relative bg-[#E7E7E7] w-full aspect-[18/13] overflow-hidden rounded-lg shadow-md">
          <Image
            data-testid="candidate-image"
            alt={name}
            src={image}
            width={400}
            height={300}
            className="object-center object-contain w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {selectedId === id && (
            <div className="absolute top-2 right-2 bg-[#A68B02] text-white text-xs font-bold py-1 px-2 rounded-full">
              Dipilih
            </div>
          )}
        </div>

        <h1
          data-testid="candidate-name"
          className="text-[#A68B02] text-lg font-bold tracking-tight"
        >
          {name}
        </h1>

        <div className="w-full space-y-3">
          <div className="relative">
            <div className="absolute -left-2 top-0 bg-[#A68B02] text-white text-xs font-bold py-1 px-2 rounded-r-md">
              VISI
            </div>
            <div
              className={`w-full bg-gray-100 p-3 pt-6 rounded-md ${
                selectedId === id ? "bg-white/80" : ""
              }`}
            >
              <p
                data-testid="candidate-vision"
                className="text-sm text-[#3D3D3D] leading-relaxed"
              >
                {vision}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-2 top-0 bg-[#A68B02] text-white text-xs font-bold py-1 px-2 rounded-r-md">
              MISI
            </div>
            <div
              className={`w-full bg-gray-100 p-3 pt-6 rounded-md ${
                selectedId === id ? "bg-white/80" : ""
              }`}
            >
              <p
                data-testid="candidate-mission"
                className="text-sm text-[#3D3D3D] leading-relaxed"
              >
                {mission}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        data-testid="candidate-vote-count"
        className={`mt-4 px-3 py-1 text-sm font-bold text-center rounded-full ${
          selectedId === id
            ? "bg-[#A68B02] text-white"
            : "bg-[#E9F9E7] text-[#13E800]"
        }`}
      >
        {voteCount} Suara
      </div>
    </div>
  );
};
