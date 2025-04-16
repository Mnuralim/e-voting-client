"use client";
import { contract } from "@/lib/contract";
import { useState, useRef, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useReadContract } from "thirdweb/react";
import { toBigInt } from "ethers";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  studentCount: IstudentCount;
}

export const AdminDashboard = ({ studentCount }: Props) => {
  const [activeElectionId, setActiveElectionId] = useState<string>("0");
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const { data: elections, isLoading: electionsLoading } = useReadContract({
    contract,
    method: "getAllElections",
  });

  const { data: candidates, isLoading: candidatesLoading } = useReadContract({
    contract,
    method: "getAllCandidates",
    params: [toBigInt(parseInt(activeElectionId))],
  });

  const { data: isVotingActive } = useReadContract({
    contract,
    method: "getGlobalVotingPeriod",
  });

  useEffect(() => {
    if (tabsRef.current) {
      const tabsContainer = tabsRef.current;
      const activeTabElement = tabsContainer.querySelector(
        `[data-id="${activeElectionId}"]`
      ) as HTMLElement;

      if (activeTabElement) {
        const containerWidth = tabsContainer.offsetWidth;
        const scrollLeft =
          activeTabElement.offsetLeft -
          containerWidth / 2 +
          activeTabElement.offsetWidth / 2;

        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeElectionId]);

  const calculateTotalVotes = (): number => {
    if (!candidates || candidates.length === 0) return 0;

    return candidates.reduce((total, candidate) => {
      return total + Number(candidate.voteCount);
    }, 0);
  };

  const getActiveElectionData = () => {
    if (!elections || elections.length === 0) {
      return {
        id: "0",
        name: "Loading...",
        totalVoters: 0,
        hasVoted: 0,
        hasNotVoted: 0,
      };
    }

    const activeElection = elections[parseInt(activeElectionId)];
    const totalVoters = studentCount[activeElectionId] || 0;
    const hasVoted = calculateTotalVotes();

    return {
      id: activeElectionId,
      name: activeElection.name,
      totalVoters: totalVoters,
      hasVoted: hasVoted,
      hasNotVoted: totalVoters - hasVoted,
    };
  };

  const activeElection = getActiveElectionData();
  const participationData: PieChartData[] = [
    {
      name: "Sudah Memilih",
      value: activeElection.hasVoted,
      color: "#12E193", // Neobrutalism green
    },
    {
      name: "Belum Memilih",
      value: activeElection.hasNotVoted,
      color: "#FF3A5E", // Neobrutalism red
    },
  ];

  const formatPercentage = (value: number, total: number): string => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  };

  if (electionsLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="bg-[#FFFF00] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] py-4 px-8 rotate-[-1deg]">
          <div className="text-[#111111] text-xl font-bold">
            Loading election data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-[#111111] text-2xl font-black rotate-[-1deg]">
          DASHBOARD ADMIN
        </h1>

        <div
          className={`px-4 py-2 border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] rotate-[1deg] transition-all hover:rotate-[0deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] ${
            isVotingActive?.[0] ? "bg-[#12E193]" : "bg-[#FF3A5E]"
          }`}
        >
          <span className="font-bold text-[#111111]">Status Pemilihan:</span>
          {isVotingActive?.[0] ? (
            <span className="ml-2 font-black text-[#111111]">AKTIF</span>
          ) : (
            <span className="ml-2 font-black text-[#111111]">TIDAK AKTIF</span>
          )}
        </div>
      </div>

      <div className="relative mb-8">
        <div className="bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-2">
          <div
            ref={tabsRef}
            className="flex overflow-x-auto py-1 px-2 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {elections &&
              elections.map((election, index: number) => (
                <button
                  key={index}
                  data-id={index.toString()}
                  className={`mx-2 px-4 py-2 font-bold text-[#111111] border-[3px] cursor-pointer border-[#111111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] ${
                    activeElectionId === index.toString()
                      ? `bg-[#FF6B6B] shadow-[4px_4px_0px_#111111] rotate-[-1deg]`
                      : `bg-white shadow-[3px_3px_0px_#111111]`
                  }`}
                  onClick={() => setActiveElectionId(index.toString())}
                >
                  {election.name.substring(0, 16)}...
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 rotate-[1deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all">
          <div className="absolute -top-3 -left-2 bg-[#FFE962] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] px-3 py-1 rotate-[-3deg]">
            <h3 className="text-[#111111] text-sm font-bold">TOTAL PEMILIH</h3>
          </div>
          <div className="pt-6">
            <div className="text-3xl font-black text-[#111111]">
              {activeElection.totalVoters.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 rotate-[-1deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all">
          <div className="absolute -top-3 -left-2 bg-[#12E193] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] px-3 py-1 rotate-[2deg]">
            <h3 className="text-[#111111] text-sm font-bold">SUDAH MEMILIH</h3>
          </div>
          <div className="pt-6">
            <div className="flex justify-between items-end">
              <div className="text-3xl font-black text-[#111111]">
                {activeElection.hasVoted.toLocaleString()}
              </div>
              <div className="text-xl font-bold text-[#111111] bg-[#12E193] px-2 border-[2px] border-[#111111]">
                {formatPercentage(
                  activeElection.hasVoted,
                  activeElection.totalVoters
                )}
                %
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 rotate-[1deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all">
          <div className="absolute -top-3 -left-2 bg-[#FF3A5E] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] px-3 py-1 rotate-[-2deg]">
            <h3 className="text-[#111111] text-sm font-bold">BELUM MEMILIH</h3>
          </div>
          <div className="pt-6">
            <div className="flex justify-between items-end">
              <div className="text-3xl font-black text-[#111111]">
                {activeElection.hasNotVoted.toLocaleString()}
              </div>
              <div className="text-xl font-bold text-[#111111] bg-[#FF3A5E] px-2 border-[2px] border-[#111111]">
                {formatPercentage(
                  activeElection.hasNotVoted,
                  activeElection.totalVoters
                )}
                %
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 rotate-[-0.5deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all">
          <div className="absolute -top-4 -left-2 bg-[#FFFF00] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] px-4 py-1 rotate-[2deg]">
            <h2 className="text-lg text-[#111111] font-bold">
              PARTISIPASI - {activeElection.name}
            </h2>
          </div>
          <div className="flex justify-center pt-8">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      name,
                      percent,
                    }: {
                      name: string;
                      percent: number;
                    }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {participationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => value.toLocaleString()}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 rotate-[0.5deg] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all">
          <div className="absolute -top-4 -left-2 bg-[#FF6B6B] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] px-4 py-1 rotate-[-1deg]">
            <h2 className="text-lg text-[#111111] font-bold">
              STATISTIK - {activeElection.name}
            </h2>
          </div>
          <div className="flex flex-col justify-center h-full pt-8">
            <div className="text-center mb-6">
              <h3 className="text-xl text-[#111111] font-bold rotate-[-1deg]">
                RINGKASAN PARTISIPASI
              </h3>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-6">
              <div className="text-center bg-[#12E193] border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] p-3 rotate-[-1deg]">
                <div className="text-4xl font-black text-[#111111]">
                  {activeElection.hasVoted.toLocaleString()}
                </div>
                <div className="text-[#111111] font-bold mt-2">
                  SUDAH MEMILIH
                </div>
              </div>
              <div className="text-center bg-[#FF3A5E] border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] p-3 rotate-[1deg]">
                <div className="text-4xl font-black text-[#111111]">
                  {activeElection.hasNotVoted.toLocaleString()}
                </div>
                <div className="text-[#111111] font-bold mt-2">
                  BELUM MEMILIH
                </div>
              </div>
            </div>

            <div className="mt-6 mb-4">
              <div className="bg-[#EEEEEE] border-[3px] border-[#111111] h-8 w-full relative">
                <div
                  className="bg-[#12E193] h-full flex items-center justify-center text-[#111111] text-sm font-bold border-r-[3px] border-[#111111]"
                  style={{
                    width: `${
                      activeElection.totalVoters > 0
                        ? (activeElection.hasVoted /
                            activeElection.totalVoters) *
                          100
                        : 0
                    }%`,
                  }}
                >
                  {activeElection.totalVoters > 0 &&
                  (activeElection.hasVoted / activeElection.totalVoters) * 100 >
                    15
                    ? `${formatPercentage(
                        activeElection.hasVoted,
                        activeElection.totalVoters
                      )}%`
                    : ""}
                </div>
              </div>
              <div className="text-[#111111] mt-2 text-center font-bold">
                Total Partisipasi:{" "}
                {formatPercentage(
                  activeElection.hasVoted,
                  activeElection.totalVoters
                )}
                %
              </div>
            </div>

            <div className="mt-4 bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 rotate-[-1deg]">
              <div className="text-[#111111] text-center mb-2 font-bold">
                STATUS PEMILIHAN
              </div>
              <div className="text-center">
                {activeElection.hasVoted > activeElection.hasNotVoted ? (
                  <div className="text-[#111111] font-black text-lg bg-[#12E193] border-[2px] border-[#111111] inline-block px-4 py-1">
                    MAYORITAS SUDAH MEMILIH
                  </div>
                ) : (
                  <div className="text-[#111111] font-black text-lg bg-[#FF3A5E] border-[2px] border-[#111111] inline-block px-4 py-1">
                    PARTISIPASI MASIH DIPERLUKAN
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!candidatesLoading && candidates && candidates.length > 0 && (
        <div className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-6 mb-8 rotate-[0.3deg]">
          <div className="absolute -top-4 -left-2 bg-[#12E193] border-[3px] border-[#111111] shadow-[2px_2px_0px_#111111] px-4 py-1 rotate-[-1deg]">
            <h2 className="text-lg text-[#111111] font-bold">
              KANDIDAT - {activeElection.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {candidates.map((candidate, index: number) => (
              <div
                key={index}
                className={`bg-white border-[3px] border-[#111111] shadow-[3px_3px_0px_#111111] p-4 ${
                  index % 3 === 0
                    ? "rotate-[-1deg]"
                    : index % 3 === 1
                    ? "rotate-[1deg]"
                    : "rotate-[-0.5deg]"
                } hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] transition-all`}
              >
                <div className="text-[#111111] font-black">
                  {candidate.name}
                </div>
                <div className="text-[#111111] font-bold mt-2 bg-[#FFE962] border-[2px] border-[#111111] p-1 inline-block rotate-[-1deg]">
                  Jumlah Suara: {Number(candidate.voteCount).toLocaleString()}
                </div>
                {activeElection.totalVoters > 0 && (
                  <div className="mt-4">
                    <div className="bg-[#EEEEEE] border-[2px] border-[#111111] h-4 w-full relative">
                      <div
                        className="bg-[#12E193] h-full border-r-[2px] border-[#111111]"
                        style={{
                          width: `${
                            (Number(candidate.voteCount) /
                              activeElection.totalVoters) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-[#111111] font-bold text-sm mt-1">
                      {formatPercentage(
                        Number(candidate.voteCount),
                        activeElection.totalVoters
                      )}
                      %
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
