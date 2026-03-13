import type { Metadata } from "next";
import TechnologiesServicePage from "./TechnologiesServicePage";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Thaboliz Technologies Services | Web Apps, Automation, Dashboards and Cybersecurity in South Africa";

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
      siteName: "Thaboliz Technologies",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-technologies.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz Technologies web apps, automation, dashboards and cybersecurity services",
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
          alt: "Thaboliz Technologies web apps, automation, dashboards and cybersecurity services",
        },
      ],
    },
  };
}

export default function Page() {

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz Technologies",
    url: "https://thaboliz.co.za/technologies",
    logo: "https://thaboliz.co.za/logo/t-technologies-logo.png",
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
        name: "Thaboliz Technologies",
        item: "https://thaboliz.co.za/services/technologies",
      },
    ],
  };
  return (

    <>
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

    <TechnologiesServicePage />;
    </>
  ) 
}