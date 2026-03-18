import type { Metadata } from "next";
import ConstructionServicePage from "./ConstructionServicePage";

const siteUrl = "https://thaboliz.co.za";
const pageUrl = `${siteUrl}/services/construction`;

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Construction Services | General Building, Aluminium Works & More | Thaboliz";
  const description =
    "Thaboliz Construction delivers building works, aluminium windows and doors, roofing, paving, tiling, painting, brick laying, leveling, and foundations across South Africa.";

  return {
    title,
    description,
    alternates: {
      canonical: "/services/construction",
    },
    openGraph: {
      title,
      description,
      url: "/services/construction",
      siteName: "Thaboliz",      // ← consistent with root layout
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-construction-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Construction — Building Works, Aluminium, Roofing and More in South Africa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/logo/t-construction-logo.png",
          alt: "Thaboliz Construction — Building Works, Aluminium, Roofing and More in South Africa",
        },
      ],
    },
  };
}

export default function Page() {
  // ── Breadcrumb ────────────────────────────────────────────────────────────
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Construction", item: pageUrl },
    ],
  };

  // ── WebPage — topical context for this route ──────────────────────────────
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Construction Services | Thaboliz",
    url: pageUrl,
    description:
      "Thaboliz Construction delivers building works, aluminium windows and doors, roofing, paving, tiling, painting, brick laying, leveling, and foundations across South Africa.",
    inLanguage: "en-ZA",
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "Thaboliz" },
    breadcrumb: breadcrumbJsonLd,
  };

  // ── Primary Service — the construction division itself ────────────────────
  const constructionServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Construction Services",
    serviceType: "Construction",
    url: pageUrl,
    description:
      "End-to-end construction services including civil and building works, earthworks, fit-out, refurbishment, and planned maintenance programs.",
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
      name: "Thaboliz Construction Offer Catalog",
      // Each itemListElement is a sub-service or product category
      itemListElement: [
        // ── Core construction ──────────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Civil & Building Works",
            description: "New builds, upgrades, and enabling works.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Earthworks & Concrete",
            description: "Site establishment, drainage, and structural works.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fit-out & Refurbishment",
            description: "Interior fit-outs, remedial works, and upgrades.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Maintenance Programs",
            description: "Planned maintenance for facilities and infrastructure.",
          },
        },
        // ── Aluminium products ─────────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Windows",
            description:
              "Awning, casement, sliding, pane, turn & tilt, triple, and fixed aluminium windows.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Doors",
            description:
              "Sliding, hinged, folding/stacking, pivot, and stable aluminium doors.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Louvre Windows & Shutters",
            description:
              "Adjustable louvre windows and shutters for ventilation and shading control.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Shades",
            description:
              "Shading solutions for patios, verandas, and outdoor areas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Gates & Fences",
            description:
              "Secure perimeter solutions with consistent detailing and neat finishing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Kitchens",
            description:
              "Durable kitchen cabinetry structures with modern lines and easy maintenance.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Ceilings",
            description:
              "Commercial ceiling systems with durable, easy-maintenance materials.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminium Roofing",
            description:
              "Roofing installation and repair focused on weather protection and long-term performance.",
          },
        },
        // ── Additional / support services ─────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tiling",
            description:
              "Floor and wall tiling with clean alignment and consistent finish.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Paving",
            description: "Driveways, walkways, and external paving works.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Painting",
            description:
              "Interior and exterior painting with proper surface prep practices.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Foundation Works",
            description:
              "Foundation setting-out, formwork, reinforcement placement, and concrete preparation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General Roofing",
            description:
              "Roof installation and repairs including sheeting, flashing, and waterproofing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wood Works",
            description:
              "Carpentry and timber works including doors, frames, skirting, and custom wood finishes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brick Laying",
            description:
              "Brickwork for walls, partitions, and structural elements.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Leveling",
            description:
              "Surface leveling and screeding for floors and bases.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Electrical Wiring",
            description:
              "Electrical wiring and fitment support (project dependent).",
          },
        },
      ],
    },
  };

  // ── FAQ — picks up common questions from the page content ─────────────────
  // Google can render these as expandable rich results directly in SERPs.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What construction services does Thaboliz offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz Construction offers civil and building works, earthworks, fit-out and refurbishment, maintenance programs, aluminium windows and doors, roofing, tiling, paving, painting, brick laying, leveling, foundations, wood works, and electrical wiring support.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz supply and install aluminium windows and doors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz Construction supplies and installs a full range of aluminium windows (awning, casement, sliding, pane, turn & tilt, triple, fixed) and doors (sliding, hinged, folding/stacking, pivot, stable) across South Africa.",
        },
      },
      {
        "@type": "Question",
        name: "Which sectors does Thaboliz Construction serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz Construction serves public infrastructure, industrial facilities, commercial builds, community developments, and energy and logistics enabling works across South Africa.",
        },
      },
      {
        "@type": "Question",
        name: "Is a construction catalogue available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. A PDF catalogue covering Thaboliz Construction's aluminium products and construction services is available to download or view directly on the construction services page at thaboliz.co.za/services/construction.",
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
          __html: JSON.stringify(constructionServiceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ConstructionServicePage />
    </>
  );
}