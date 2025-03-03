import React from "react";
import Image from "next/image";
import { CircleLoading } from "../../../public/image";

// Tipe data untuk kolom
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
    <table className="min-w-full rounded-lg shadow-lg">
      <thead>
        <tr>
          {showNumber && (
            <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
              No
            </th>
          )}
          {columns.map((column, index) => (
            <th
              key={index}
              className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]"
            >
              {column.header}
            </th>
          ))}
          {adminSection && (
            <>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                Token Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                Action
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="border-b">
            {showNumber && (
              <td className="px-6 py-4 text-sm font-semibold">{index + 1}</td>
            )}
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 text-sm font-semibold">
                {column.render
                  ? column.render(item, index)
                  : (item[column.key] as React.ReactNode)?.toString() || ""}
              </td>
            ))}
            {adminSection && (
              <>
                <td className="px-6 py-4 text-sm">
                  {(item as { accessToken?: { status: string } })?.accessToken
                    ?.status || "Inactive"}
                </td>
                <td className="grid gap-1 py-2 h-full">
                  {onUpdate && (
                    <button
                      className="bg-blue-500 text-white font-semibold py-1 px-1 rounded-lg"
                      onClick={() => onUpdate(item.id)}
                    >
                      Update
                    </button>
                  )}
                  {onDelete && (
                    <button
                      disabled={loadingDelete}
                      className="bg-red-600 text-white font-semibold py-1 px-1 rounded-lg flex items-center justify-center"
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
                        "Delete"
                      )}
                    </button>
                  )}
                  {onGenerateToken &&
                    !(item as { accessToken?: unknown })?.accessToken && (
                      <button
                        disabled={loadingGenerate}
                        className="bg-green-500 text-white font-semibold py-1 px-1 rounded-lg flex items-center justify-center"
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
                          "Generate"
                        )}
                      </button>
                    )}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
