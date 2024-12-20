import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { headers } from "next/headers";
import { Navigation } from "@/components/Navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path") || "/";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased bg-gray-100`}
      >
        <header className="w-full bg-blue-600 text-white p-4 text-xl  transition-all">
          <div className="container flex items-center justify-between">
            <Link
              href="/"
              className={`transition-all duration-300 hover:text-blue-800`}
            >
              LOGO
            </Link>
            <Navigation pathname={pathname} />
          </div>
        </header>
        <main className="flex-grow ">{children}</main>
        <footer className="w-full bg-blue-600 text-white text-xl text-center transition-all">
          <div className="container py-4"> @2025 Budget Tracker</div>
        </footer>
      </body>
    </html>
  );
}
