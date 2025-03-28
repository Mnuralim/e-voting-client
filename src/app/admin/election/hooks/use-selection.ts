import { contract } from "@/lib/contract";
import { useState } from "react";
import { useReadContract } from "thirdweb/react";

export const useElection = (
  faculties: IFaculty[],
  programs: IProgram[],
  departements: IDepartement[]
) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<number | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [program, setProgram] = useState<string | null>(null);
  const [departement, setDepartement] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<number | null>(null);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const { data: elections, isLoading } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const handleOpenModal = (id?: string) => {
    setOpenModal(true);
    if (id) {
      setSelectedId(id);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedId(null);
  };

  const handleSelectType = (type: number) => {
    setProgram(null);
    setFaculty(null);
    setDepartement(null);
    setType(type);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleFilter = (value: string) => {
    setFilterType(value === "" ? null : Number(value));
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
    }, 1000);
  };

  const filteredElections = elections?.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === null || e.electionType === filterType;

    return matchesSearch && matchesType;
  });

  const filteredFaculties = faculties.filter(
    (f) =>
      !elections?.find((e) => e.faculty.toLowerCase() === f.name.toLowerCase())
  );
  const filteredPrograms = programs.filter(
    (p) =>
      !elections?.find((e) => e.program.toLowerCase() === p.name.toLowerCase())
  );

  const filteredDepartements = departements.filter(
    (d) =>
      !elections?.find(
        (e) => e.departement.toLowerCase() === d.name.toLowerCase()
      )
  );

  console.log("elections", elections);
  console.log("filteredDepartements", filteredDepartements);
  console.log("departements", departements);

  const handleReset = () => {
    setFaculty(null);
    setProgram(null);
    setDepartement(null);
    setName("");
    setType(0);
    setOpenModal(false);
  };

  return {
    openModal,
    selectedId,
    name,
    type,
    faculty,
    program,
    departement,
    search,
    isSearching,
    filterType,
    isFiltering,
    elections,
    isLoading,
    filteredElections,
    filteredFaculties,
    filteredPrograms,
    filteredDepartements,
    handleOpenModal,
    handleCloseModal,
    handleSelectType,
    handleSearch,
    handleFilter,
    setName,
    setType,
    setFaculty,
    setProgram,
    setDepartement,
    handleReset,
  };
};
