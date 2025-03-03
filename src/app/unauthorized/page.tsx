import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">UNAUTHORIZED</h1>
      <p className="mb-8 text-gray-400">
        You do not have permission to access this page.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Page;
