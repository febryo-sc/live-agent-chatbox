import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";
import { BackgroundProvider } from "@/providers/wallpaper-provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SunBox",
  description: "Chat Box Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.variable} inline antialiased`}>
          <BackgroundProvider>{children}</BackgroundProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
