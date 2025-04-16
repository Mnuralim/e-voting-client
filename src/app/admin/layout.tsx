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
      <div className="lg:hidden xl:hidden 2xl:hidden p-6 text-center bg-[#111111] border-[3px] border-[#FFFF00] shadow-[4px_4px_0px_#FFFF00] hover:shadow-[6px_6px_0px_#FFFF00] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300">
        <p className="text-[#FFFF00] font-bold text-lg transform rotate-[-1deg]">
          Maaf, tampilan ini tidak tersedia untuk perangkat dengan layar kecil.
        </p>
      </div>
      <div className="min-h-screen hidden lg:flex">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden border-r-[3px] border-[#111111]">
          <Navbar />
          <main className="p-4">{children}</main>
          <div className="my-5 bg-[#FFE962] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] p-4 mx-12 rotate-[0.5deg]">
            <p className="text-center font-bold text-[#111111]">
              © 2025 VOTING SYSTEM
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
