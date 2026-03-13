import type { Metadata } from "next";
import LogisticsServicePage from "./LogisticsServicePage";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Thaboliz Logistics Services | Delivery, Warehousing, Cold-Chain and Cross-Border Support in South Africa";

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
      siteName: "Thaboliz Logistics",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-logistics-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Logistics delivery, warehousing, cold-chain and cross-border support",
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
          alt: "Thaboliz Logistics delivery, warehousing, cold-chain and cross-border support",
        },
      ],
    },
  };
}

export default function Page() {


  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz Logistics",
    url: "https://thaboliz.co.za/logistics",
    logo: "https://thaboliz.co.za/logo/t-logistics-logo.png",
    email: "info@thaboliz.co.za",
    telephone: "",
    sameAs: [
      // add your real profiles only
      // "https://www.linkedin.com/company/...",
      // "https://www.facebook.com/...",
      // "https://www.instagram.com/...",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thaboliz.co.za/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Thaboliz Logistics",
        item: "https://thaboliz.co.za/services/logistics",
      },
    ],
  };


  return (<>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
  
        <LogisticsServicePage />;
      </>

  ) 
}