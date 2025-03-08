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
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead>
          <tr>
            {showNumber && (
              <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-400 bg-[#191919]">
                No
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-400 bg-[#191919]"
              >
                {column.header}
              </th>
            ))}
            {adminSection && (
              <>
                <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-400 bg-[#191919]">
                  Status Token
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-400 bg-[#191919]">
                  Aksi
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-[#171717]">
          {data.map((item, index) => (
            <tr key={item.id} className="transition-colors hover:bg-[#1E1E1E]">
              {showNumber && (
                <td className="px-4 py-3.5 text-sm text-gray-300 whitespace-nowrap">
                  {index + 1}
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-3.5 text-sm text-gray-300 whitespace-nowrap"
                >
                  {column.render
                    ? column.render(item, index)
                    : (item[column.key] as React.ReactNode)?.toString() || ""}
                </td>
              ))}
              {adminSection && (
                <>
                  <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                    {(item as { accessToken?: { status: string } })?.accessToken
                      ?.status ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (item as { accessToken?: { status: string } })
                            ?.accessToken?.status === "active"
                            ? "bg-green-900 text-green-300"
                            : (item as { accessToken?: { status: string } })
                                ?.accessToken?.status === "used"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {
                          (item as { accessToken?: { status: string } })
                            ?.accessToken?.status
                        }
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-sm">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {onUpdate && (
                        <button
                          className="flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded bg-[#2D2D2D] text-white hover:bg-[#3D3D3D] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-[#FFFF00]"
                          onClick={() => onUpdate(item.id)}
                        >
                          <svg
                            className="w-3.5 h-3.5 mr-1"
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
                          className="flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded bg-red-900 text-red-200 hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => onDelete(item.id)}
                        >
                          {loadingDelete ? (
                            <Image
                              alt="circle-loading"
                              src={CircleLoading}
                              width={16}
                              height={16}
                              className="animate-spin"
                            />
                          ) : (
                            <>
                              <svg
                                className="w-3.5 h-3.5 mr-1"
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
                            className="flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded bg-[#FFFF00] text-black hover:bg-[#E6E600] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-[#FFFF00] disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onGenerateToken(item.id)}
                          >
                            {loadingGenerate ? (
                              <Image
                                alt="circle-loading"
                                src={CircleLoading}
                                width={16}
                                height={16}
                                className="animate-spin"
                              />
                            ) : (
                              <>
                                <svg
                                  className="w-3.5 h-3.5 mr-1"
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
