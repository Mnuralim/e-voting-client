import React from "react";
import Image from "next/image";
import { CircleLoading } from "../../../public/image";

interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface TableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  showNumber?: boolean;
  adminSection?: boolean;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGenerateToken?: (id: string) => void;
  loadingDelete?: boolean;
  loadingGenerate?: boolean;
}

export const Table = <T extends { id: string }>({
  columns,
  data,
  showNumber = false,
  adminSection = false,
  onUpdate,
  onDelete,
  onGenerateToken,
  loadingDelete = false,
  loadingGenerate = false,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto border-[3px] border-[#111111] rounded-none shadow-[4px_4px_0px_#111111] bg-white  transform-gpu">
      <table className="min-w-full divide-y divide-[#111111] border-collapse">
        <thead>
          <tr className="bg-[#FF3A5E] rotate-[0.3deg] transform-gpu">
            {showNumber && (
              <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-black border-b-[3px] border-r-[3px] border-[#111111]">
                <div className="rotate-[-1deg] transform-gpu">No</div>
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-4 text-left font-bold uppercase tracking-wider text-black border-b-[3px] border-r-[3px] border-[#111111]"
              >
                <div className="rotate-[-1deg] transform-gpu">
                  {column.header}
                </div>
              </th>
            ))}
            {adminSection && (
              <>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-black border-b-[3px] border-r-[3px] border-[#111111]">
                  <div className="rotate-[-1deg] transform-gpu">
                    Status Token
                  </div>
                </th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-black border-b-[3px] border-[#111111]">
                  <div className="rotate-[-1deg] transform-gpu">Aksi</div>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#111111] bg-white">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-[#FFE962] transition-all duration-100"
            >
              {showNumber && (
                <td className="px-4 py-3.5 text-sm font-medium text-[#111111] border-r-[3px] border-[#111111]">
                  {index + 1}
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-3.5 text-sm font-medium text-[#111111] border-r-[3px] border-[#111111]"
                >
                  {column.render
                    ? column.render(item, index)
                    : (item[column.key] as React.ReactNode)?.toString() || ""}
                </td>
              ))}
              {adminSection && (
                <>
                  <td className="px-4 py-3.5 text-sm font-medium border-r-[3px] border-[#111111]">
                    {(item as { accessToken?: { status: string } })?.accessToken
                      ?.status ? (
                      <span
                        className={`px-2 py-1 border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] inline-block rotate-[-1deg] transform-gpu ${
                          (item as { accessToken?: { status: string } })
                            ?.accessToken?.status === "active"
                            ? "bg-[#12E193] text-black"
                            : (item as { accessToken?: { status: string } })
                                ?.accessToken?.status === "used"
                            ? "bg-[#6B66FF] text-black"
                            : "bg-[#D3D3D3] text-black"
                        }`}
                      >
                        {
                          (item as { accessToken?: { status: string } })
                            ?.accessToken?.status
                        }
                      </span>
                    ) : (
                      <span className="px-2 py-1 rotate-[-1deg] transform-gpu border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111] inline-block bg-[#D3D3D3] text-black">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      {onUpdate && (
                        <button
                          className="flex items-center justify-center px-3 py-2 font-bold border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] bg-[#12E193] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                          onClick={() => onUpdate(item.id)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Perbarui
                        </button>
                      )}
                      {onDelete && (
                        <button
                          disabled={loadingDelete}
                          className="flex items-center justify-center px-3 py-2 font-bold border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] bg-[#FF6B6B] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => onDelete(item.id)}
                        >
                          {loadingDelete ? (
                            <Image
                              alt="circle-loading"
                              src={CircleLoading}
                              width={20}
                              height={20}
                              className="animate-spin"
                            />
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Hapus
                            </>
                          )}
                        </button>
                      )}
                      {onGenerateToken &&
                        !(item as { accessToken?: unknown })?.accessToken && (
                          <button
                            disabled={loadingGenerate}
                            className="flex items-center justify-center px-3 py-2 font-bold border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] bg-[#FFFF00] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed rotate-[1deg] transform-gpu"
                            onClick={() => onGenerateToken(item.id)}
                          >
                            {loadingGenerate ? (
                              <Image
                                alt="circle-loading"
                                src={CircleLoading}
                                width={20}
                                height={20}
                                className="animate-spin"
                              />
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4 mr-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                  />
                                </svg>
                                Generate
                              </>
                            )}
                          </button>
                        )}
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
