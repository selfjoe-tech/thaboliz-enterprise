import type { Metadata } from "next";
import SiteHeader from "@/components/sections/SiteHeader";
import "./globals.css";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";
import SiteFooter from "@/components/sections/SiteFooter";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const siteUrl = "https://thaboliz.co.za";
const siteName = "Thaboliz";
const defaultTitle =
  "Thaboliz | Construction, Technology, Logistics and Farming in South Africa";
const defaultDescription =
  "Thaboliz delivers construction, technology, logistics and integrated farming services across South Africa.";
 
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: "%s | Thaboliz Group",
  },

  description: defaultDescription,

  applicationName: siteName,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/t-logo.png",
        width: 1200,
        height: 630,
        alt: "Thaboliz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      "/logo/t-logo.png",
    ],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-background text-foreground">
        <Suspense>
          <TopLoader />
        </Suspense>

        <SiteHeader />

        <div className="fixed -z-10 site-bg" />
        <div className="fixed -z-10 pointer-events-none bg-gradient-to-b from-black/0 via-black/35 to-black/85" />

        {children}

        <SiteFooter />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}