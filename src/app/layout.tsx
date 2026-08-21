import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HARJOKUNCARAN - Website Desa Harjokuncaran",
  description: "Website resmi Desa Harjokuncaran, Kecamatan Sumbermanjing Wetan, Kabupaten Malang.",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <Navbar />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );

}
