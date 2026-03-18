import type { Metadata } from "next";
import OrganicFarmsServicePage from "./OrganicFarmsServicePage";

const siteUrl = "https://thaboliz.co.za";
const pageUrl = `${siteUrl}/services/integrated-farms`;

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Integrated Farms | Climate-Smart Farming & Farm-to-Market Operations | Refining Farm Goods | Thaboliz";
  const description =
    "Thaboliz Integrated Farms develops climate-smart farming operations in South Africa with traceability, soil health, responsible water planning, regenerative practices, agro-processing readiness, and market pathways.";

  return {
    title,
    description,
    alternates: {
      canonical: "/services/integrated-farms",
    },
    openGraph: {
      title,
      description,
      url: "/services/integrated-farms",
      siteName: "Thaboliz",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-intfarms-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Integrated Farms — Climate-Smart Farming Operations in South Africa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/logo/t-intfarms-logo.png",
          alt: "Thaboliz Integrated Farms — Climate-Smart Farming Operations in South Africa",
        },
      ],
    },
  };
}

export default function Page() {
  // ── Breadcrumb ─────────────────────────────────────────────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Integrated Farms", item: pageUrl },
    ],
  };

  // ── WebPage ────────────────────────────────────────────────────────────────
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Integrated Farms | Thaboliz",
    url: pageUrl,
    description:
      "Thaboliz Integrated Farms develops climate-smart farming operations in South Africa with traceability, soil health, responsible water planning, regenerative practices, agro-processing readiness, and market pathways.",
    inLanguage: "en-ZA",
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "Thaboliz" },
    breadcrumb: breadcrumbJsonLd,
  };

  // ── Primary Service ────────────────────────────────────────────────────────
  const farmServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Integrated Farming",
    serviceType: "Agricultural Services",
    url: pageUrl,
    description:
      "Climate-smart, organic-aligned farming operations including crop production, regenerative soil practices, agro-processing pathways, and farm-to-market linkages across South Africa.",
    provider: {
      "@type": "Organization",
      name: "Thaboliz",
      url: siteUrl,
      logo: `${siteUrl}/logo/t-logo.png`,
      email: "info@thaboliz.co.za",
      telephone: "+27100000000",
      address: { "@type": "PostalAddress", addressCountry: "ZA" },
    },
    areaServed: { "@type": "Country", name: "South Africa" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Thaboliz Integrated Farms Offer Catalog",
      itemListElement: [
        // ── Core farm operations ───────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Organic-Aligned Crop Production",
            description:
              "Crop production with traceability and integrity, supporting certification and verification where pursued.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Regenerative Farming Practices",
            description:
              "Soil rehabilitation, composting, crop rotation, and resilience-building for long-term land health.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Agro-Processing Pathways",
            description:
              "Packaging, grading, and basic value-add to improve market readiness and supply consistency.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Market Linkages",
            description:
              "Retail, food service, and community supply partnerships providing stable and structured demand channels.",
          },
        },
        // ── Ventures / pilots ──────────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Traceability Pilots",
            description:
              "Pilot systems that improve product visibility, documentation discipline, and quality assurance confidence across the value chain.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Community Grower Networks",
            description:
              "Local grower and buyer relationships that strengthen supply participation, regional coordination, and practical market linkage.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Region-Specific Crop Strategy",
            description:
              "Crop planning shaped around local conditions, demand patterns, and infrastructure realities to improve long-term viability.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Processing Readiness",
            description:
              "Early preparation for grading, packaging, and quality presentation so supply can move with better structure and consistency.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Market Pathway Development",
            description:
              "Commercial routes into retail, community, and food service channels supported by disciplined operational planning.",
          },
        },
        // ── Water & standards ──────────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Responsible Water Planning",
            description:
              "Water use planning aligned to DWS authorisation processes, efficient irrigation scheduling, record readiness, and resilient water practices.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standards-Aware Farm Operations",
            description:
              "Operations structured around SAOSO organic production standards, traceability documentation, and audit-friendly record keeping.",
          },
        },
      ],
    },
  };

  // ── FAQ ────────────────────────────────────────────────────────────────────
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Thaboliz Integrated Farms do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz Integrated Farms develops climate-smart, organic-aligned farming operations in South Africa, focusing on crop production, regenerative soil practices, agro-processing readiness, traceability, responsible water planning, and farm-to-market linkages.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz use GMOs or chemical fertilisers on its farms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Thaboliz Integrated Farms operates without GMOs and without chemical fertilisers. The approach is built on clean, organic-aligned farming practices that respect the land and support long-term soil health.",
        },
      },
      {
        "@type": "Question",
        name: "How does Thaboliz handle water use on its farms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Where farming operations require authorisation, Thaboliz aligns planning with the South African Department of Water and Sanitation (DWS) water use authorisation process. The focus is on efficient irrigation scheduling, compliance record keeping, and resilient water practices.",
        },
      },
      {
        "@type": "Question",
        name: "What organic standards does Thaboliz Integrated Farms align to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Where certification is pursued, Thaboliz structures operations around SAOSO's standard for organic production and processing. Operations are built around traceability, documented practices, and audit-friendly record keeping.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz offer farm-to-market supply or retail partnerships?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz Integrated Farms develops market pathways into retail, food service, and community supply channels. This includes traceability pilots, community grower networks, and processing readiness preparation to support structured, consistent supply.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(farmServiceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <OrganicFarmsServicePage />
    </>
  );
}