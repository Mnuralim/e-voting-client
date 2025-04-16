import { contract } from "@/lib/contract";
import { useState } from "react";
import { useReadContract } from "thirdweb/react";

export const useElection = (
  faculties: IFaculty[],
  programs: IProgram[],
  departements: IDepartement[]
) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<number | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [program, setProgram] = useState<string | null>(null);
  const [departement, setDepartement] = useState<string | null>(null);
  const [dpm, setDpm] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterType, setFilterType] = useState<number | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const { data: elections, isLoading } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
    handleReset();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    handleReset();
  };

  const handleSelectType = (type: number) => {
    // Reset related fields when election type changes
    setProgram(null);
    setFaculty(null);
    setDepartement(null);
    setDpm(null);
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

  const filteredDpm = faculties.filter(
    (f) => !elections?.find((e) => e.dpm.toLowerCase() === f.name.toLowerCase())
  );

  const handleReset = () => {
    setFaculty(null);
    setProgram(null);
    setDepartement(null);
    setDpm(null);
    setName("");
    setType(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    handleSelectType(value);
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFaculty(e.target.value);
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgram(e.target.value);
  };

  const handleDepartementChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartement(e.target.value);
  };

  const handleDpmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDpm(e.target.value);
  };

  return {
    openModal,
    name,
    type,
    faculty,
    program,
    departement,
    dpm,
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
    filteredDpm,
    handleOpenModal,
    handleCloseModal,
    handleSearch,
    handleFilter,
    handleReset,
    handleNameChange,
    handleTypeChange,
    handleFacultyChange,
    handleProgramChange,
    handleDepartementChange,
    handleDpmChange,
  };
};
