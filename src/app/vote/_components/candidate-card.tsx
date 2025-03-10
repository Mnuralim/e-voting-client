import Image from "next/image";
import React from "react";

interface Props {
  id: number;
  name: string;
  image: string;
  vision: string;
  voteCount: number;
  selectedId: number;
  handleSelectCandidate: (id: number) => void;
}

export const CandidateCard = ({
  image,
  name,
  vision,
  voteCount,
  selectedId,
  id,
  handleSelectCandidate,
}: Props) => {
  return (
    <div
      data-testid="candidate-card"
      onClick={() => handleSelectCandidate(id)}
      className={`flex flex-col justify-between cursor-pointer rounded-2xl p-5 w-[80%] aspect-[226/290] items-center mx-auto shadow-amber-300 shadow-md ${
        selectedId === id ? "bg-[#FFFF00]" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="bg-[#E7E7E7] w-full aspect-[18/13] h-full rounded-md">
          <Image
            data-testid="candidate-image"
            alt={name}
            src={image}
            width={400}
            height={300}
            className="object-center object-contain w-full aspect-[18/13] h-auto "
          />
        </div>
        <h1
          data-testid="candidate-name"
          className="text-[#A68B02] text-lg font-bold"
        >
          {name}
        </h1>
        <p
          data-testid="candidate-vision"
          className="text-sm text-[#3D3D3D] font-semibold"
        >
          {vision}
        </p>
      </div>
      <p
        data-testid="candidate-vote-count"
        className="text-[#13E800] text-sm font-bold text-center"
      >
        {voteCount} Votes
      </p>
    </div>
  );
};
