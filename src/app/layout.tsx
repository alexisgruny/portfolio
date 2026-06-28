import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Alexis Gruny — Développeur Web Fullstack",
  description:
    "Portfolio d'Alexis Gruny, développeur web fullstack React, Next.js & Node.js. Basé à Tokyo 🇯🇵, disponible en remote.",
  openGraph: {
    title: "Alexis Gruny — Développeur Web Fullstack",
    description:
      "Portfolio d'Alexis Gruny, développeur web fullstack React, Next.js & Node.js. Basé à Tokyo 🇯🇵, disponible en remote.",
    url: "https://alexisgrunyportfolio.vercel.app",
    siteName: "Alexis Gruny",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alexis Gruny — Développeur Web Fullstack",
    description:
      "Portfolio d'Alexis Gruny, développeur web fullstack React, Next.js & Node.js. Basé à Tokyo 🇯🇵, disponible en remote.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
