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
    <div className="grid lg:grid-cols-6">
      <NavbarTutorial
        onSubTutorialSelect={handleSubTutorialSelect}
        activeParentIndex={activeParentIndex}
        selectedSubTutorial={selectedSubTutorial}
      />

      {selectedSubTutorial ? (
        <div className="p-4 lg:col-span-5 lg:col-start-2 lg:ml-64 lg:pl-8">
          <div className="bg-[#FF3A5E] p-3 w-fit transform rotate-[-1deg] mb-4">
            <h2 className="text-2xl font-bold text-white">
              {selectedSubTutorial.title}
            </h2>
          </div>

          <div className="border-[3px] border-[#111111] bg-white shadow-[4px_4px_0px_#111111] p-6 mb-6 transform rotate-[0.5deg]">
            <p className="text-[#111111] mb-4">
              {selectedSubTutorial.description}
            </p>
          </div>

          <div className="space-y-8">
            {selectedSubTutorial.tutorials.map((step, index) => (
              <Step key={index} step={step} index={index} />
            ))}
          </div>

          <div className="mt-8 transform rotate-[-0.5deg]">
            <Pagination
              prev={prevSubTutorial}
              next={nextSubTutorial}
              onSelect={handleSubTutorialSelect}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 lg:col-span-5 lg:col-start-2 lg:ml-64 lg:pl-8">
          <div className="bg-[#FF3A5E] p-3 w-fit transform rotate-[-1deg] mb-6 mt-8">
            <h2 className="text-2xl font-bold text-white">Mulai Sekarang</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="border-[3px] border-[#111111] bg-[#FFE962] shadow-[4px_4px_0px_#111111] p-5 transform rotate-[0.5deg]"
              >
                <button
                  onClick={() => handleParentTutorialSelect(index)}
                  className="mb-2 text-lg font-bold text-[#111111] hover:text-[#FF3A5E] transition-colors cursor-pointer"
                >
                  {tutorial.title}
                </button>
                <p className="text-[#111111]">{tutorial.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
