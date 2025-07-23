import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainContainer from "./components/Layout/MainContainer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "osu! Speedtrainer",
  description: "train speed osu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#111111] text-[#e5e5e5] antialiased`}
      >
        
        <MainContainer>
          {children}
        </MainContainer>
      </body>
    </html>
  );
}
