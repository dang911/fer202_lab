import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechPulse Store — Premium Gear & Next-Gen Tech",
  description:
    "Explore our curated collection of premium tech gadgets, accessories, and audio gear.",
  keywords: ["tech", "gadgets", "audio", "store", "nextjs", "shadcn"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060911",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#060911] text-slate-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
