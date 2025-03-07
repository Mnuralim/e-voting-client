import { contract } from "@/lib/contract";
import React, { useState } from "react";
import { useReadContract } from "thirdweb/react";
import { toBigInt } from "ethers";

export const useCandidate = (electionId: string) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [vision, setVision] = useState<string>("");
  const [mission, setMission] = useState<string>("");

  const { data: candidates, isLoading } = useReadContract({
    contract,
    method: "getAllCandidates",
    params: [toBigInt(electionId)],
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenModal = (id?: string) => {
    setOpenModal(true);
    if (id) {
      setSelectedId(id);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedId(null);
    setImage(null);
    setImagePreview(null);
  };

  return {
    openModal,
    selectedId,
    image,
    imagePreview,
    name,
    vision,
    mission,
    candidates,
    isLoading,
    handleChangeImage,
    handleOpenModal,
    handleCloseModal,
    setName,
    setVision,
    setMission,
  };
};
