import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sivasavarapu.com"),
  title: "Siva Nagendra Savarapu — Pipeline Engineer & Generative AI Specialist",
  description:
    "Senior Pipeline Engineer and Generative AI specialist with 10+ years at Epic Games, Sony Pictures Imageworks, Animal Logic, and MPC. Expert in OpenUSD, Python/C++, Unreal Engine, and agentic 3D systems.",
  keywords: [
    "Pipeline Engineer",
    "Generative AI",
    "OpenUSD",
    "Unreal Engine",
    "VFX",
    "3D",
    "MCP",
    "Epic Games",
    "Sony Pictures Imageworks",
  ],
  authors: [{ name: "Siva Nagendra Savarapu" }],
  openGraph: {
    title: "Siva Nagendra Savarapu — Pipeline Engineer & Generative AI",
    description:
      "Senior Pipeline Engineer and Generative AI specialist with 10+ years at top-tier VFX and game studios.",
    url: "https://sivasavarapu.com",
    siteName: "Siva Nagendra Savarapu",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Siva Nagendra Savarapu portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siva Nagendra Savarapu — Pipeline Engineer & Generative AI",
    description:
      "Senior Pipeline Engineer and Generative AI specialist at the intersection of AI and 3D/VFX production.",
    images: ["/twitter-image"],
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
    <html lang="en" className={`${spaceGrotesk.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-bg text-fore antialiased" suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
