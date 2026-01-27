import SiteHeader from "@/components/sections/SiteHeader";
import { HeroGlobe } from "@/components/sections/HeroGlobe";
import BuildOnTabs from "@/components/sections/BuildOnTabs";
import Testimonials from "@/components/sections/Testimonials";
import Numbers from "@/components/sections/Numbers";
import Faq from "@/components/sections/Faq";
import ReadyCta from "@/components/sections/ReadyCta";
import SiteFooter from "@/components/sections/SiteFooter";
import ContactDetails from "@/components/sections/ContactDetails";

export default function HomePage() {
  return (
    <main className="min-h-screen text-foreground">

      <HeroGlobe />
      <div className="mx-auto max-w-6xl px-4">
        

        <BuildOnTabs />
        <Testimonials />
        <Numbers />
        <Faq />
        <ReadyCta />
                <ContactDetails />

      </div>

      <SiteFooter />
    </main>
  );
}
