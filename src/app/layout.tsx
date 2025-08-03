import type { Metadata } from "next";
import { auth } from "@/lib/auth"
import { Geist, Geist_Mono } from "next/font/google";
import MainContainer from "./components/Layout/MainContainer";
import { ToastContainer } from "react-toastify";
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
  description: "Train your streaming or singletapping speed",
};

async function fetchColorData() {
  const session = await auth();
  if (!session || !session.user) {
    return
  }
  console.log("Session User:", session.user);
  return session.user.colorScheme || "dark";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const colorData = await fetchColorData()

  console.log("Color Data:", colorData);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${colorData ? colorData : "dark"} dark bg-bg-primary text-text-primary antialiased`}
      >
        <ToastContainer/>
        <MainContainer>
          {children}
        </MainContainer>
      </body>
    </html>
  );
}
