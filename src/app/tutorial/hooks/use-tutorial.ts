"use client";
import { useState, useMemo } from "react";
import { SubTutorial, tutorials } from "@/lib/data";

export const useTutorial = () => {
  const [selectedSubTutorial, setSelectedSubTutorial] =
    useState<SubTutorial | null>(null);
  const [activeParentIndex, setActiveParentIndex] = useState<number | null>(
    null
  );

  const allSubTutorials = useMemo(
    () => tutorials.flatMap((tutorial) => tutorial.tutorials),
    []
  );

  const findParentTutorialIndex = (subTutorial: SubTutorial): number => {
    return tutorials.findIndex((tutorial) =>
      tutorial.tutorials.some((st) => st.title === subTutorial.title)
    );
  };

  const handleSubTutorialSelect = (subTutorial: SubTutorial) => {
    setSelectedSubTutorial(subTutorial);
    const parentIndex = findParentTutorialIndex(subTutorial);
    setActiveParentIndex(parentIndex);
    window.scrollTo(0, 0);
  };

  const handleParentTutorialSelect = (tutorialIndex: number) => {
    const firstSubTutorial = tutorials[tutorialIndex].tutorials[0];
    if (firstSubTutorial) {
      handleSubTutorialSelect(firstSubTutorial);
      setActiveParentIndex(tutorialIndex);
    }
  };

  const currentIndex = useMemo(
    () =>
      selectedSubTutorial
        ? allSubTutorials.findIndex(
            (st) => st.title === selectedSubTutorial.title
          )
        : -1,
    [selectedSubTutorial, allSubTutorials]
  );

  const prevSubTutorial =
    currentIndex > 0 ? allSubTutorials[currentIndex - 1] : null;
  const nextSubTutorial =
    currentIndex < allSubTutorials.length - 1
      ? allSubTutorials[currentIndex + 1]
      : null;

  return {
    selectedSubTutorial,
    activeParentIndex,
    handleSubTutorialSelect,
    handleParentTutorialSelect,
    prevSubTutorial,
    nextSubTutorial,
    allSubTutorials,
  };
};
