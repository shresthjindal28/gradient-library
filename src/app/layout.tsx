import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

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
  title: "Gradient Library | Beautiful Gradients Collection",
  description: "Explore and download beautiful gradient images for your projects",
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
          <div className="gradient-bg-animation"></div>
          <SmoothScroll>
            {children}
            <Analytics />
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
