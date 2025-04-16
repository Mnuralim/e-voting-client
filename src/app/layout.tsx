import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pemilihan ORMAWA USN Kolaka 2025",
  description:
    " Waktunya menentukan pemimpin yang akan membawa perubahan! Pilih kandidat terbaik untuk organisasi mahasiswa USN Kolaka dengan sistem e-voting berbasis blockchain yang transparan, aman, dan terpercaya.",
  icons: "/image/crop-logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-[#111111]`}
      >
        <ThirdwebProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
