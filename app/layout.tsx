import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Inter } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://betareadr.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "betaReadr | AI Feedback Without AI Ghostwriting",
    template: "%s | betaReadr",
  },
  description:
    "Get thoughtful, workshop-style feedback on your writing. betaReadr identifies strengths, weaknesses, reader reactions, and revision priorities without rewriting your work.",
  openGraph: {
    title: "betaReadr | AI Feedback Without AI Ghostwriting",
    description:
      "Get thoughtful, workshop-style feedback on your writing. betaReadr identifies strengths, weaknesses, reader reactions, and revision priorities without rewriting your work.",
    url: siteUrl,
    siteName: "betaReadr",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "betaReadr | AI Feedback Without AI Ghostwriting",
    description: "AI feedback without AI ghostwriting.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSerif.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="app-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
