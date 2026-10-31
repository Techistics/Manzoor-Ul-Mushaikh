import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { siteConfig } from "@/src/config/site";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
