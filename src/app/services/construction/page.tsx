import type { Metadata } from "next";
import ConstructionServicePage from "./ConstructionServicePage";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Thaboliz Construction Services | General Building, Aluminium Works and Services in South Africa";

  const description =
    "Thaboliz Construction delivers building works, aluminium windows and doors, roofing, paving, tiling, painting, brick laying, leveling, foundations and related construction services in South Africa.";

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
      siteName: "Thaboliz Construction",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-construction-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Construction delivers building works, aluminium windows and doors, roofing, paving, tiling, painting, brick laying, leveling, foundations and related construction services in South Africa."

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
          alt: "Thaboliz Construction delivers building works, aluminium windows and doors, roofing, paving, tiling, painting, brick laying, leveling, foundations and related construction services in South Africa.",
        },
      ],
    },
  };
}



export default function Page() {


  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz Construction",
    url: "https://thaboliz.co.za/construction",
    logo: "https://thaboliz.co.za/logo/t-construction-logo.png",
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
        name: "Thaboliz Construction",
        item: "https://thaboliz.co.za/services/construction",
      },
    ],
  };


  return <>
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
    <ConstructionServicePage />;

  </>
  
}