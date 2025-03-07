import Image from "next/image";
import type { TutorialStep } from "@/lib/data";
import Link from "next/link";

interface Props {
  step: TutorialStep;
  index: number;
}

export const Step = ({ step, index }: Props) => (
  <div className="bg-[#6D6D6D] p-5 rounded-md">
    <div className="flex items-center gap-x-3 mb-3">
      <div className="rounded-full flex items-center justify-center w-8 h-8 bg-[#D1D1D1] font-bold text-black aspect-square">
        {index + 1}
      </div>
      <h3 className="font-semibold text-sm">{step.title}</h3>
    </div>
    {step.image && (
      <div className="flex items-center justify-center">
        <Image
          src={step.image}
          alt={step.title}
          width={400}
          height={200}
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    )}
    {step.description && (
      <p className="font-medium text-sm my-3">{step.description}</p>
    )}
    {step.link && (
      <Link
        href={step.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-bold hover:underline mt-2 block"
      >
        Click Here
      </Link>
    )}
  </div>
);
