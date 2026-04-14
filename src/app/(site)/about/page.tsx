import type { Metadata } from "next";
import AboutPage from "@/components/sections/about/AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "About Thaboliz in South Africa";
  const description =
    "Learn about Thaboliz, our vision, mission, core values, and multi-sector work across construction, technology, logistics, and integrated farming in South Africa.";

  return {
    title,
    description,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title,
      description,
      url: "/about",
      siteName: "Thaboliz Group",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-logo.png",
          width: 1200,
          height: 630,
          alt: "About Thaboliz",
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
          alt: "About Thaboliz",
        },
      ],
    },
  };
}

export default function Page() {

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz",
    url: "https://thaboliz.co.za/about",
    logo: "https://thaboliz.co.za/logo/t-logo.png",
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
        name: "About",
        item: "https://thaboliz.co.za/about",
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
    <AboutPage />
  
  </>;
}