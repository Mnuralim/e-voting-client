import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  image: string;
  vision: string;
  voteCount: number;
}

export const CandidateCard = ({ image, name, vision, voteCount }: Props) => {
  return (
    <div className="bg-white flex flex-col justify-between p-5 w-[80%] items-center mx-auto">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="bg-[#E7E7E7] w-full aspect-[4/3] h-full">
          <Image
            alt={name}
            src={image}
            width={400}
            height={300}
            className="object-center object-cover w-full h-full"
          />
        </div>
        <h1 className="text-[#A68B02] text-lg font-bold">{name}</h1>
        <p className="text-sm text-[#3D3D3D] font-semibold">{vision}</p>
      </div>
      <p className="text-[#13E800] text-sm font-bold text-center">
        {voteCount} Votes
      </p>
    </div>
  );
};
