import type { Metadata } from "next";
import { Navbar } from "./_components/navbar";
import { Suspense } from "react";
import { Sidebar } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "USN Vote | Admin",
  description: "Halaman admin",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <div className="lg:hidden xl:hidden 2xl:hidden p-6 text-center bg-[#111111] border-2 border-[#FFFF00] rounded-lg shadow-lg hover:bg-[#222222] transition-all duration-300">
        <p className="text-[#FFFF00] font-semibold text-lg">
          Maaf, tampilan ini tidak tersedia untuk perangkat dengan layar kecil.
        </p>
      </div>
      <div className="min-h-screen hidden lg:flex">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    </Suspense>
  );
}
