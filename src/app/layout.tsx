import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/lib/api";
import { Toaster } from "react-hot-toast";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর এক জায়গায়।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getAllProducts();

  return (
    <html
      lang="bn"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={hind.variable}
    >
      <body className="flex min-h-screen flex-col bg-base-200 font-sans">
        <Navbar />
        <Ticker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}