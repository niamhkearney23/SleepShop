import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Merritt — Brand and business development for boutique law firms",
  description:
    "Cross-border counsel for firms building profile across Australia and Malaysia.",
  openGraph: {
    title: "Merritt — Brand and business development for boutique law firms",
    description:
      "Cross-border counsel for firms building profile across Australia and Malaysia.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  metadataBase: new URL("https://merritt.co"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
