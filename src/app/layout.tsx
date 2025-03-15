import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "../../MyComponents/Header/Header";
import Footer from "../../MyComponents/Footer/Footer";
import { Providers } from "./providers";
import LinearProgress from "@mui/material/LinearProgress";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import React from "react";
import FetchGlobalData from "../../MyComponents/GlobalComponents/FetchGlobalData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hush Catties",
  description:
    "Welcome to Hush Catties – your destination for elegant and contemporary modest fashion in the UK. We believe that style and modesty can coexist, offering a curated collection that combines fashion-forward designs with a commitment to modesty. We are committed to closing the gap in the fashion industry for those who wish to combine traditional Eastern styles with the latest fashion trends for women from the West. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <React.Suspense fallback={<LinearProgress />}>
            <Providers>
              <Header />
              {children}
              <Footer />
              <Toaster />
              <FetchGlobalData />
            </Providers>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
