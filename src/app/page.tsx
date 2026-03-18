import type { Metadata } from "next";
import { HeroGlobe } from "@/components/sections/HeroGlobe";
import BuildOnTabs from "@/components/sections/BuildOnTabs";
import Testimonials from "@/components/sections/Testimonials";
import Numbers from "@/components/sections/Numbers";
import Faq from "@/components/sections/Faq";
import ReadyCta from "@/components/sections/ReadyCta";
import ContactDetails from "@/components/sections/ContactDetails";

const siteUrl = "https://thaboliz.co.za";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Thaboliz | Construction, Technology, Logistics and Integrated Farming in South Africa";
  const description =
    "Thaboliz delivers construction, technology, logistics and integrated farming services in South Africa. Explore our divisions and contact the team for projects, partnerships, and enquiries.";

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Thaboliz",         // ← was "Thaboliz Group"
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz — Construction, Technology, Logistics and Integrated Farming",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/logo/t-logo.png",
          alt: "Thaboliz — Construction, Technology, Logistics and Integrated Farming",
        },
      ],
    },
  };
}

export default function HomePage() {
  // ── Organization ────────────────────────────────────────────────────────────
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz",
    url: siteUrl,
    logo: `${siteUrl}/logo/t-logo.png`,
    email: "info@thaboliz.co.za",
    telephone: "+27100000000",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
    },
    sameAs: [
      // "https://www.linkedin.com/company/...",
      // "https://www.facebook.com/...",
    ],
  };

  // ── Service list — lets Google show rich service snippets ───────────────────
  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Thaboliz Services",
    description: "Core service divisions offered by Thaboliz across South Africa",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Construction",
          description:
            "Infrastructure planning, delivery, and project execution built around quality and safety.",
          url: `${siteUrl}/services/construction`,
          provider: { "@type": "Organization", name: "Thaboliz" },
          areaServed: { "@type": "Country", name: "South Africa" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Technology",
          description:
            "IT services and technology product supply tailored to business needs.",
          url: `${siteUrl}/services/technologies`,
          provider: { "@type": "Organization", name: "Thaboliz" },
          areaServed: { "@type": "Country", name: "South Africa" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Integrated Farming",
          description:
            "No GMOs, no chemical fertilisers. Clean, integrated farming practices that respect the land.",
          url: `${siteUrl}/services/integrated-farms`,
          provider: { "@type": "Organization", name: "Thaboliz" },
          areaServed: { "@type": "Country", name: "South Africa" },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Logistics",
          description:
            "Reliable transport and logistics built for efficiency and trust.",
          url: `${siteUrl}/services/logistics`,
          provider: { "@type": "Organization", name: "Thaboliz" },
          areaServed: { "@type": "Country", name: "South Africa" },
        },
      },
    ],
  };

  // ── WebPage — reinforces page-level topical context ─────────────────────────
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Thaboliz | Construction, Technology, Logistics and Integrated Farming",
    url: siteUrl,
    description:
      "Thaboliz delivers construction, technology, logistics and integrated farming services across South Africa.",
    inLanguage: "en-ZA",
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "Thaboliz" },
    about: { "@type": "Organization", name: "Thaboliz" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ],
    },
  };

  return (
    <main className="min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroGlobe />
      <BuildOnTabs />
      {/* <Testimonials /> */}
      {/* <Numbers /> */}
      <Faq />
      {/* <ReadyCta /> */}
      <ContactDetails />
    </main>
  );
}