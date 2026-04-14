import type { Metadata } from "next";
import EnterprisePage from "./EnterprisePage";

const siteUrl = "https://thaboliz.co.za";
const pageUrl = `${siteUrl}/enterprise`;

export const metadata: Metadata = {
  title: "Thaboliz Enterprise | General Supply, Procurement & Cold Rooms",
  description:
    "Thaboliz Enterprise provides general supply and procurement support across office equipment, technology, industrial supply, facilities support, refrigeration, and cold room solutions in South Africa.",
  alternates: {
    canonical: "/enterprise",
  },
  openGraph: {
    title: "Thaboliz Enterprise | General Supply, Procurement & Cold Rooms",
    description:
      "General supply and procurement support across office equipment, technology, industrial supply, facilities support, refrigeration, and cold room solutions.",
    url: "/enterprise",
    siteName: "Thaboliz",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/logo/t-logo.png",
        width: 1200,
        height: 630,
        alt: "Thaboliz Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thaboliz Enterprise | General Supply, Procurement & Cold Rooms",
    description:
      "General supply and procurement support across office equipment, technology, industrial supply, facilities support, refrigeration, and cold room solutions.",
    images: [
      {
        url: "/logo/t-logo.png",
        alt: "Thaboliz Enterprise",
      },
    ],
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Enterprise", item: pageUrl },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Enterprise | Thaboliz",
    url: pageUrl,
    description:
      "Thaboliz Enterprise provides general supply, procurement support, refrigeration, and cold room solutions in South Africa.",
    inLanguage: "en-ZA",
    isPartOf: {
      "@type": "WebSite",
      url: siteUrl,
      name: "Thaboliz",
    },
    breadcrumb: breadcrumbJsonLd,
  };

  const enterpriseServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Enterprise Supply and Procurement",
    serviceType: "General Supply and Procurement Services",
    url: pageUrl,
    description:
      "General supply, procurement support, refrigeration, and cold room solutions for business, project, and operational environments in South Africa.",
    provider: {
      "@type": "Organization",
      name: "Thaboliz",
      url: siteUrl,
      logo: `${siteUrl}/logo/t-logo.png`,
      email: "info@thaboliz.co.za",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ZA",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Thaboliz Enterprise Offer Catalog",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General Business Supply",
            description:
              "Supply support for business essentials, consumables, and general operational requirements.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Office Equipment and Workplace Solutions",
            description:
              "Office furniture, workstations, storage, printers, and workplace support equipment.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT and Technology Supply",
            description:
              "Laptops, desktops, monitors, accessories, networking items, and selected technology equipment.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Industrial and Site Supply",
            description:
              "Products, materials, and equipment required for sites, projects, and industrial activity.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refrigeration and Cold Room Supply",
            description:
              "Cold room and refrigeration solutions for temperature-controlled storage and operations.",
          },
        },
      ],
    },
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
          __html: JSON.stringify(enterpriseServiceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <EnterprisePage />
    </>
  );
}