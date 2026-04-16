import { Suspense } from "react";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import TopLoader from "@/components/TopLoader";


const siteUrl = "https://thaboliz.co.za";
const siteName = "Thaboliz";
const defaultTitle =
  "Thaboliz | Construction, Technology, Logistics and Farming in South Africa";
const defaultDescription =
  "Thaboliz delivers construction, technology, logistics and integrated farming services across South Africa. Trusted by clients nationwide for quality and reliability.";

// ─── Viewport (extracted from metadata per Next.js 14+ recommendation) ────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ── Titles ──────────────────────────────────────────────────────────────────
  title: {
    default: defaultTitle,
    template: "%s | Thaboliz",
  },

  // ── Core ────────────────────────────────────────────────────────────────────
  description: defaultDescription,
  applicationName: siteName,

  // Keywords help with topical relevance signals
  keywords: [
    "construction South Africa",
    "technology services South Africa",
    "logistics South Africa",
    "integrated farming South Africa",
    "Thaboliz",
    "South African construction company",
    "agri-logistics",
    "civil construction",
    "infrastructure development",
    "aluminum",
    "aluminum windows",
    "aluminum doors"
  ],

  // Authorship / publisher signals
  authors: [{ name: "Thaboliz", url: siteUrl }],
  creator: "Thaboliz",
  publisher: "Thaboliz",

  // Category signals for directory crawlers
  category: "Business",

  // ── Canonical & Alternates ───────────────────────────────────────────────────
  alternates: {
    canonical: "/",
    // Add hreflang alternates here if you ever add Zulu / Afrikaans pages
    // languages: { af: '/af', zu: '/zu' },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        // Use a 1200×630 OG-specific image rather than your logo for better link previews
        url: "/logo/t-logo.png",
        width: 1200,
        height: 630,
        alt: "Thaboliz — Construction, Technology, Logistics & Farming",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo/t-logo.png"], // same 1200×630 image
    // creator: "@thaboliz",   // uncomment when you have a Twitter handle
    // site: "@thaboliz",
  },

  // ── Favicons & App Icons (Next.js will auto-pick up /app/icon.* files,
  //    but explicit entries silence crawlers that look for <link rel="icon">) ──
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      
    ],
    apple: "/logo/t-logo.png",
    shortcut: "/favicon.png",
  },

  // ── Web-app manifest (for PWA signals & home-screen installs) ─────────────


  // ── Robots ────────────────────────────────────────────────────────────────
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

  // ── Verification (preferred over raw <meta> in <head>) ────────────────────
  
};

// ─── Organisation JSON-LD (injected once at root, inherited by every page) ───
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Thaboliz",
  alternateName: "Thaboliz Enterprise",
  url: siteUrl,
  logo: `${siteUrl}/logo/t-logo.png`,
  description: defaultDescription,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
    // Fill in once you have a physical address to publish:
    // streetAddress: "123 Example Street",
    addressLocality: "Johannesburg",
    addressRegion: "Gauteng",
    // postalCode: "2000",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English"],
    // telephone: "+27-XX-XXX-XXXX",   // add when ready
  },
  sameAs: [
    // Add your verified social profiles so Google links them to this entity:
    // "https://www.facebook.com/thaboliz",
    // "https://www.linkedin.com/company/thaboliz",
    // "https://twitter.com/thaboliz",
  ],
};

// ─── Website JSON-LD (enables Sitelinks Searchbox if Google grants it) ───────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    
  return (
    <html lang="en">
          <head>
            {/* JSON-LD structured data — two separate scripts keeps validators happy */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
          </head>
    
      <body>
        <Suspense>
                  <TopLoader />
                </Suspense>
        
        
        
        {children}</body>
    </html>
  );
}

