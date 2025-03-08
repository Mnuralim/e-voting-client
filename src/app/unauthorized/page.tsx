import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">AKSES DITOLAK</h1>
      <p className="mb-8 text-gray-400">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-300"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default Page;
