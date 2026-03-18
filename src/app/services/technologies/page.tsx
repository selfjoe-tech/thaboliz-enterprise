import type { Metadata } from "next";
import TechnologiesServicePage from "./TechnologiesServicePage";

const siteUrl = "https://thaboliz.co.za";
const pageUrl = `${siteUrl}/services/technologies`;

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Technology Services | Web Apps, Automation, Dashboards & Cybersecurity | Thaboliz";
  const description =
    "Thaboliz Technologies provides web apps, dashboards, workflow automation, cybersecurity, surveillance systems, and operational technology services in South Africa for clearer, safer, and more measurable business operations.";

  return {
    title,
    description,
    alternates: {
      canonical: "/services/technologies",
    },
    openGraph: {
      title,
      description,
      url: "/services/technologies",
      siteName: "Thaboliz",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-technologies.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Technologies — Web Apps, Automation, Dashboards and Cybersecurity in South Africa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/logo/t-technologies.png",
          alt: "Thaboliz Technologies — Web Apps, Automation, Dashboards and Cybersecurity in South Africa",
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
      { "@type": "ListItem", position: 2, name: "Technologies", item: pageUrl },
    ],
  };

  // ── WebPage ────────────────────────────────────────────────────────────────
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Technology Services | Thaboliz",
    url: pageUrl,
    description:
      "Thaboliz Technologies provides web apps, dashboards, workflow automation, cybersecurity, and surveillance systems in South Africa.",
    inLanguage: "en-ZA",
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "Thaboliz" },
    breadcrumb: breadcrumbJsonLd,
  };

  // ── Primary Service ────────────────────────────────────────────────────────
  const techServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technology Services",
    serviceType: "Information Technology Services",
    url: pageUrl,
    description:
      "Operational technology services for modern businesses in South Africa including web applications, dashboards, workflow automation, cybersecurity, and 24/7 surveillance systems.",
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
      name: "Thaboliz Technologies Offer Catalog",
      itemListElement: [
        // ── Core tech services ─────────────────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Application Development",
            description:
              "Custom operational web apps and internal tools built around how teams actually work.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dashboards, Reporting and Analytics",
            description:
              "Performance visibility through clean metrics, KPIs, and data dashboards tailored to business operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Workflow Automation",
            description:
              "System integration, manual step removal, and operational speed improvements through tailored workflow automation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cybersecurity",
            description:
              "Secure baselines, threat detection, and response-minded security upgrades for South African businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "24/7 Surveillance Systems",
            description:
              "CCTV setup, monitoring readiness, and operational reliability for continuous site surveillance.",
          },
        },
        // ── Compliance & delivery approach ────────────────────────────────
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "POPIA-Aligned Data Handling",
            description:
              "Data handling practices designed around South Africa's POPIA privacy framework with audit-friendly operational workflows.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Staged Technology Delivery",
            description:
              "Milestone-driven iterative delivery with clear requirements, documented assumptions, and risk-controlled rollouts.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technology Documentation and Handover",
            description:
              "Runbooks, access and architecture documentation, and change history so systems survive team turnover.",
          },
        },
      ],
    },
  };

  // ── SoftwareApplication — covers the web app and dashboard offerings ───────
  // Adds a typed software entity that Google indexes separately from the service.
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Thaboliz Custom Web Applications and Dashboards",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Custom web applications, operational dashboards, and automated workflows built by Thaboliz Technologies for businesses in South Africa.",
    offers: {
      "@type": "Offer",
      seller: {
        "@type": "Organization",
        name: "Thaboliz",
        url: siteUrl,
      },
    },
    provider: {
      "@type": "Organization",
      name: "Thaboliz",
      url: siteUrl,
    },
  };

  // ── FAQ ────────────────────────────────────────────────────────────────────
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technology services does Thaboliz offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz Technologies offers custom web application development, dashboards and reporting, workflow automation, cybersecurity, 24/7 CCTV surveillance systems, POPIA-aligned data handling, and staged technology delivery with full documentation and handover.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz build custom web apps and internal business tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz Technologies builds operational web applications and internal tools tailored to how a specific team works, with a focus on clarity, measurable workflows, and performance visibility through dashboards and reporting.",
        },
      },
      {
        "@type": "Question",
        name: "Does Thaboliz provide cybersecurity services in South Africa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz Technologies provides cybersecurity services including secure baselines, detection, and response-minded upgrades. Operations are designed for South Africa's POPIA privacy and cybercrime environment with audit-friendly data handling and incident readiness built into delivery.",
        },
      },
      {
        "@type": "Question",
        name: "Can Thaboliz set up CCTV and surveillance systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thaboliz Technologies provides 24/7 surveillance system setup including CCTV installation, monitoring readiness, and ongoing operational reliability for business and site security.",
        },
      },
      {
        "@type": "Question",
        name: "Is Thaboliz's technology delivery POPIA compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thaboliz Technologies structures data handling practices around South Africa's POPIA framework. POPIA-aligned data handling and incident readiness are treated as part of the delivery process, not an afterthought, with reusable patterns, sensible defaults, and audit-friendly design.",
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
          __html: JSON.stringify(techServiceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TechnologiesServicePage />
    </>
  );
}