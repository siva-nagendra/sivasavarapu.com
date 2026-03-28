import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://sivasavarapu.com";
const SITE_NAME = "Siva Nagendra Savarapu";
const SITE_TITLE =
  "Siva Nagendra Savarapu | Senior Pipeline Engineer and Generative AI";
const SITE_DESCRIPTION =
  "Portfolio of Siva Nagendra Savarapu, a senior pipeline engineer building production-grade OpenUSD, Unreal Engine, generative AI, and agentic 3D systems for films, games, and real-time content teams.";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  classification: "Portfolio",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Siva Nagendra Savarapu",
    "Pipeline Engineer",
    "Generative AI",
    "OpenUSD",
    "Unreal Engine",
    "VFX",
    "3D",
    "3D Pipelines",
    "Real-Time Pipelines",
    "PyTorch",
    "TensorFlow",
    "Computer Vision",
    "USD Stage",
    "MCP",
    "Epic Games",
    "Sony Pictures Imageworks",
    "Animal Logic",
    "MPC Film",
  ],
  authors: [{ name: "Siva Nagendra Savarapu" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1224,
        height: 682,
        alt: "Siva Nagendra Savarapu portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "v0NDdVy08RhG5VDSdXkVpJtluhSPXH1PI3VHB4dAZ5I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-bg text-fore antialiased" suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
