import type { SubTutorial } from "@/lib/data";

interface Props {
  prev: SubTutorial | null;
  next: SubTutorial | null;
  onSelect: (subTutorial: SubTutorial) => void;
}

export const Pagination = ({ prev, next, onSelect }: Props) => (
  <div className="flex flex-col mt-6 mb-8 md:flex-row md:justify-between gap-x-4">
    {prev && (
      <button
        onClick={() => onSelect(prev)}
        className="text-sm py-2 rounded-md flex items-center cursor-pointer"
      >
        <span className="mr-2">←</span>
        <span>{prev.title}</span>
      </button>
    )}
    {next && (
      <button
        onClick={() => onSelect(next)}
        className="text-sm py-2 rounded-md flex items-end justify-end cursor-pointer"
      >
        <span>{next.title}</span>
        <span className="ml-2">→</span>
      </button>
    )}
  </div>
);
