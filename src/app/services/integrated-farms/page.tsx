import type { Metadata } from "next";
import OrganicFarmsServicePage from "./OrganicFarmsServicePage";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Thaboliz Integrated Farms | Climate-Smart Farming and Farm-to-Market Operations in South Africa";

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
      siteName: "Thaboliz Integrated Farms",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-intfarms-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Integrated Farms climate-smart farming operations in South Africa",
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
          alt: "Thaboliz Integrated Farms climate-smart farming operations in South Africa",
        },
      ],
    },
  };
}

export default function Page() {

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz Integrated Farms",
    url: "https://thaboliz.co.za/integrated-farms",
    logo: "https://thaboliz.co.za/logo/t-intfarms-logo.png",
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
        name: "Thaboliz Integrated Farms",
        item: "https://thaboliz.co.za/services/integrated-farms",
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
  
  <OrganicFarmsServicePage />;
  </>)
}