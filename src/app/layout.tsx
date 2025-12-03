import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Latijn Leren - Naamvallen",
  description: "Leer de Latijnse naamvallen met interactieve oefeningen voor VWO klas 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Navigation />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
        <footer className="text-center py-6 text-sm opacity-70">
          Gemaakt voor VWO klas 2 leerlingen
        </footer>
      </body>
    </html>
  );
}
