

import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import ClientRoot from "../components/ClientRoot";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gradora | Beautiful Gradients Collection",
  description: "Explore and download beautiful gradient images for your projects",
  icons:{
    icon: "/Logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${poppins.variable} antialiased`}>
          <ClientRoot>{children}</ClientRoot>
        </body>
      </html>
    </ClerkProvider>
  );
}
