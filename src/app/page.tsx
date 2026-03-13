import type { Metadata } from "next";
import { HeroGlobe } from "@/components/sections/HeroGlobe";
import BuildOnTabs from "@/components/sections/BuildOnTabs";
import Testimonials from "@/components/sections/Testimonials";
import Numbers from "@/components/sections/Numbers";
import Faq from "@/components/sections/Faq";
import ReadyCta from "@/components/sections/ReadyCta";
import ContactDetails from "@/components/sections/ContactDetails";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Thaboliz | Construction, Technology, Logistics and Integrated Farming in South Africa";
  const description =
    "Thaboliz Group delivers construction, technology, logistics and integrated farming services in South Africa. Explore our divisions and contact the team for projects, partnerships, and enquiries.";

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Thaboliz Group",
      locale: "en_ZA",
      type: "website",
      images: [
        {
          url: "/logo/t-logo.png",
          width: 1200,
          height: 630,
          alt: "Thaboliz services across construction, technology, logistics and integrated farming",
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
          alt: "Thaboliz Group services across construction, technology, logistics and integrated farming",
        },
      ],
    },
  };
}

export default function HomePage() {

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thaboliz",
    url: "https://thaboliz.co.za",
    logo: "https://thaboliz.co.za/logo/t-logo.png",
    email: "info@thaboliz.co.za",
    telephone: "+27100000000",
    sameAs: [
      // add your real profiles only
      // "https://www.linkedin.com/company/...",
      // "https://www.facebook.com/...",
      // "https://www.instagram.com/...",
    ],
  };
  return (
    <main className="min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroGlobe />
      <BuildOnTabs />
      {/* <Testimonials /> */}
      {/* <Numbers /> */}
      <Faq />
      {/* <ReadyCta /> */}
      <ContactDetails />
    </main>
  );
}