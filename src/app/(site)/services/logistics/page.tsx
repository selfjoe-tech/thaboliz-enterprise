import type { Metadata } from "next";
import LogisticsServicePage from "./LogisticsServicePage";

const siteUrl = "https://thaboliz.co.za";
const pageUrl = `${siteUrl}/services/logistics`;

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Logistics Services | Delivery, Warehousing, Cold-Chain & Cross-Border Support | Export & Import | Thaboliz";
  const description =
    "Thaboliz Logistics provides delivery operations, warehousing support, cold-chain support, and cross-border import and export support in South Africa with a focus on visibility, control, and compliance-aware operations.";

  return {
    title,
    description,
    alternates: {
      canonical: "/services/logistics",
    },
    openGraph: {
      title,
      description,
      url: "/services/logistics",
      siteName: "Thaboliz",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-logistics-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Logistics — Delivery, Warehousing, Cold-Chain and Cross-Border Support in South Africa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/logo/t-logistics-logo.png",
          alt: "Thaboliz Logistics — Delivery, Warehousing, Cold-Chain and Cross-Border Support in South Africa",
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
      { "@type": "ListItem", position: 2, name: "Logistics", item: pageUrl },
    ],
  };

  // ── WebPage ────────────────────────────────────────────────────────────────
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Logistics Services | Thaboliz",
    url: pageUrl,
    description:
      "Thaboliz Logistics provides delivery operations, warehousing support, cold-chain support, and cross-border import and export support in South Africa.",
    inLanguage: "en-ZA",
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "Thaboliz" },
    breadcrumb: breadcrumbJsonLd,
  };

  // ── Primary Service ────────────────────────────────────────────────────────
  const logisticsServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Logistics Services",
    serviceType: "Freight and Logistics",
    url: pageUrl,
    description:
      "Reliable transport and logistics operations across South Africa including distribution planning, warehousing support, cold-chain movement, and cross-border import/export support.",
    provider: {
      "@type": "Organization",
      name: "Thaboliz",
      url: siteUrl,
      logo: `${siteUrl}/logo/t-logo.png`,
      email: "info@thaboliz.co.za",
      telephone: "+27100000000",
      address: { "@type": "PostalAddress", addressCountry: "ZA" },
    },
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Place", name: "Southern Africa" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Thaboliz Logistics Offer Catalog",
      itemListElement: [
        // ── Core logistics services ────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Distribution Planning and Delivery Operations",
            description:
              "Predictable routes, delivery discipline, and visible service levels for linehaul and last-mile delivery.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Warehousing Support and Inventory Movement",
            description:
              "Receiving, storage movement, and dispatch readiness support for warehouse operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cold-Chain Support",
            description:
              "Temperature-aware movement for agriculture and perishable goods where cold-chain handling applies.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cross-Border Import/Export Support",
            description:
              "Documentation readiness aligned to SARS import/export frameworks for compliant cross-border movement.",
          },
        },
        // ── Compliance ────────────────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Roadworthiness and Fleet Compliance",
            description:
              "Vehicle readiness aligned to relevant roadworthiness categories and testing requirements.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Customs Documentation Preparedness",
            description:
              "Processes aligned to SARS import/export frameworks for compliant and audit-ready cross-border operations.",
          },
        },
        // ── Growth models / ventures ──────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "National Distribution Hub Model",
            description:
              "Warehouse and route optimisation to increase delivery predictability and control logistics costs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cold Storage Micro-Hubs",
            description:
              "Cold storage infrastructure near production areas to shorten time-to-cold and improve quality for perishables.",
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
        name: "What logistics services does Thaboliz offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz Logistics offers distribution planning and delivery operations, warehousing support, cold-chain movement for perishables, and cross-border import/export support with customs documentation readiness across South Africa and Southern Africa.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz provide cold-chain logistics in South Africa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz provides cold-chain support for temperature-sensitive goods including agricultural produce and perishables. The service focuses on temperature-aware movement and reducing time-to-cold through strategically located cold storage micro-hubs near production areas.",
        },
      },
      {
        "@type": "Question",
        name: "Can Thaboliz handle cross-border logistics and import/export documentation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz Logistics provides cross-border import and export support with documentation readiness aligned to SARS frameworks for compliant movement across Southern African borders.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz offer warehousing services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz provides warehousing support including receiving, storage movement, and dispatch readiness. The national distribution hub model combines warehouse and route optimisation to improve predictability and reduce logistics costs.",
        },
      },
      {
        "@type": "Question",
        name: "How does Thaboliz ensure compliance in its logistics operations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz treats compliance as operational readiness. This includes vehicle roadworthiness aligned to relevant testing requirements, customs documentation preparedness aligned to SARS import/export frameworks, and disciplined proof-of-delivery processes.",
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
          __html: JSON.stringify(logisticsServiceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LogisticsServicePage />
    </>
  );
}