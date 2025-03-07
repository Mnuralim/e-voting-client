import type { SubTutorial } from "@/lib/data";

interface Props {
  prev: SubTutorial | null;
  next: SubTutorial | null;
  onSelect: (subTutorial: SubTutorial) => void;
}

export const Pagination = ({ prev, next, onSelect }: Props) => (
  <div className="flex justify-between mt-6 mb-8 items-center">
    {prev && (
      <button
        onClick={() => onSelect(prev)}
        className="px-4 py-2 rounded-md flex items-center cursor-pointer"
      >
        <span className="mr-2">←</span>
        <span>{prev.title}</span>
      </button>
    )}
    {next && (
      <button
        onClick={() => onSelect(next)}
        className="px-4 py-2 rounded-md ml-auto flex items-center cursor-pointer"
      >
        <span>{next.title}</span>
        <span className="ml-2">→</span>
      </button>
    )}
  </div>
);
