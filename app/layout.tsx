import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/topNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenGuessr",
  description: "GenGuessr: A Game by Gendo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-[#232323] text-white">
          <div className="flex">
            <TopBar />
          </div>
          <div className="flex flex-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
