"use client";
import { tutorials } from "@/lib/data";
import { useTutorial } from "../hooks/use-tutorial";
import NavbarTutorial from "./navbar";
import { Pagination } from "./pagination";
import { Step } from "./step";

export const Tutorial = () => {
  const {
    selectedSubTutorial,
    activeParentIndex,
    handleSubTutorialSelect,
    handleParentTutorialSelect,
    prevSubTutorial,
    nextSubTutorial,
  } = useTutorial();

  return (
    <div className="grid md:grid-cols-6">
      <NavbarTutorial
        onSubTutorialSelect={handleSubTutorialSelect}
        activeParentIndex={activeParentIndex}
        selectedSubTutorial={selectedSubTutorial}
      />

      {selectedSubTutorial ? (
        <div className="p-4 md:col-span-5 md:col-start-2 md:ml-64 md:pl-8">
          <h2 className="text-2xl font-bold mb-4 text-[#F6F6F6] mt-1">
            {selectedSubTutorial.title}
            <hr className="my-2 text-[#888888]" />
          </h2>
          <p className="text-[#E7E7E7] mb-4">
            {selectedSubTutorial.description}
          </p>
          <div className="space-y-6">
            {selectedSubTutorial.tutorials.map((step, index) => (
              <Step key={index} step={step} index={index} />
            ))}
          </div>
          <Pagination
            prev={prevSubTutorial}
            next={nextSubTutorial}
            onSelect={handleSubTutorialSelect}
          />
        </div>
      ) : (
        <div className="p-4 md:col-span-5 md:col-start-2 md:ml-64 md:pl-8">
          <h2 className="text-2xl font-bold mb-4 text-[#F6F6F6] mt-12">
            Getting Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="w-full border border-[#4F4F4F] rounded-md p-4"
              >
                <button
                  onClick={() => handleParentTutorialSelect(index)}
                  className="mb-2 text-lg font-semibold text-[#D1BF00] hover:text-white cursor-pointer"
                >
                  {tutorial.title}
                </button>
                <p className="text-[#E7E7E7] text-sm">{tutorial.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
