import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GridPattern } from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "AI Twitter Bio Generator: Stand Out in Seconds",
  description:
    "Generate unique and creative Twitter bios in seconds using AI. Perfect for personal branding, social media, and more!",
  keywords: [
    "Twitter bios",
    "AI bios",
    "social media branding",
    "AI-powered bios",
    "Twitter profile generator",
  ],
  authors: [{ name: "Dali012", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "AI Twitter Bio Generator: Stand Out in Seconds",
    description:
      "Generate unique and creative Twitter bios in seconds using AI. Perfect for personal branding, social media, and more!",
    url: "https://yourwebsite.com",
    siteName: "BiosAI",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "AI Bios Generator Stand Out in Seconds",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Twitter Bios in Seconds!",
    description:
      "Generate unique and creative Twitter bios in seconds using AI. Perfect for personal branding, social media, and more!",
    images: ["https://yourwebsite.com/twitter-card-image.png"], // Replace with your actual Twitter card image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, "font-sans antialiased")}>
        <GridPattern width={60} height={60} className="-z-10 opacity-70" />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
