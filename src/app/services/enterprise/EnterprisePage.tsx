import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  ClipboardList,
  MonitorCheck,
  HardHat,
  ShieldCheck,
  Warehouse,
  Snowflake,
  Cog,
  Store,
  Package,
  Hospital,
  Leaf,
} from "lucide-react";

import EnterpriseSupplyCards from "@/components/enterprise/EnterpriseSupplyCards";
import EnterpriseVenturesCarousel from "@/components/enterprise/EnterpriseVenturesCarousel";
import AluminumCategoryCarousel from "@/components/aluminum/AluminumCategoryCarousel";

const supplyItems = [
  {
    title: "General Business Supply",
    desc: "We support day-to-day operational requirements through the supply of essential items that keep businesses running efficiently. This includes general-use products, consumables, and practical business necessities that form part of everyday operations.",
    img: "/enterprise/pic-10.jpg",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Office Equipment and Workplace Solutions",
    desc: "We supply office equipment and workplace support items that help organisations maintain productive, functional, and professional environments. This includes furniture, workstations, storage solutions, printers, and related workplace essentials.",
    img: "/enterprise/pic-4.jpg",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "IT and Technology Supply",
    desc: "We assist businesses with the supply of technology products required for modern operations. This includes laptops, desktops, monitors, accessories, networking items, peripherals, and selected technical equipment for commercial use.",
    img: "/enterprise/pic-5.jpg",
    icon: <MonitorCheck className="h-5 w-5" />,
  },
  {
    title: "Industrial and Site Supply",
    desc: "We source and supply products required for project environments, site activity, maintenance operations, and light industrial use. Our role is to support operational continuity with practical supply solutions aligned to the realities of working environments.",
    img: "/enterprise/pic-6.jpg",
    icon: <HardHat className="h-5 w-5" />,
  },
  {
    title: "Electrical and Mechanical Components",
    desc: "We support the procurement of selected electrical and mechanical items used in installations, operational upgrades, repairs, and technical maintenance requirements. This offering is structured around dependable sourcing and commercially sound supply support.",
    img: "/enterprise/pic-7.jpg",
    icon: <Cog className="h-5 w-5" />,
  },
  {
    title: "Safety, PPE, and Compliance Supply",
    desc: "We supply safety-related products that support responsible working environments across sectors. This includes PPE, signage, and essential compliance-support items required for daily operations, site readiness, and workplace protection.",
    img: "/enterprise/pic-8.jpg",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Facilities and Operational Support Supply",
    desc: "We help organisations source products that support the smooth running of their premises and operational spaces. This includes cleaning materials, utility items, storage products, and facility-use equipment needed for organised, efficient environments.",
    img: "/enterprise/pic-9.jpg",
    icon: <Warehouse className="h-5 w-5" />,
  },
  {
    title: "Refrigeration and Cold Room Supply",
    desc: "We supply refrigeration solutions and cold room systems for clients who require dependable temperature-controlled environments. These solutions can support food-related operations, hospitality, retail, agriculture, healthcare, storage, and other business applications where controlled refrigeration is essential.",
    img: "/enterprise/pic-11.jpg",
    icon: <Snowflake className="h-5 w-5" />,
  },
];

const coldRoomVentures = [
  {
    title: "Modular Commercial Cold Rooms",
    desc: "Flexible cold room solutions for hospitality, retail, food service, and commercial operations that need dependable refrigerated storage.",
    image: "/enterprise/pic-12.jpg",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Walk-In Freezer Rooms",
    desc: "Heavy-duty freezer room solutions for frozen stock, back-of-house operations, and high-volume storage requirements.",
    image: "/enterprise/pic-13.jpg",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Produce and Agricultural Cold Storage",
    desc: "Temperature-controlled cold storage suited to fresh produce, agricultural goods, and perishable stock.",
    image: "/enterprise/pic-14.jpg",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Retail and Hospitality Cold Rooms",
    desc: "Cold storage solutions for restaurants, hotels, supermarkets, and service environments that need organised refrigeration.",
    image: "/enterprise/pic-15.jpg",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Pharmaceutical and Specialised Storage Rooms",
    desc: "Controlled refrigeration environments for healthcare and specialised applications where temperature-sensitive products require dependable handling.",
    image: "/enterprise/pic-16.jpg",
    icon: <Hospital className="h-5 w-5" />,
  },
  {
    title: "Custom Cold Room Configurations",
    desc: "Cold room layouts configured around size, access, storage volume, and intended operational use.",
    image: "/enterprise/pic-18.jpg",
    icon: <Snowflake className="h-5 w-5" />,
  },
];

const industries = [
  {
    title: "Corporate offices and business operations",
    desc: "Supply support for workplaces that require dependable sourcing across office equipment, technology, facility-use items, and day-to-day operational requirements.",
  },
  {
    title: "Construction and project environments",
    desc: "Procurement support for project-driven environments that need site-ready materials, operational products, equipment coordination, and responsive supply execution.",
  },
  {
    title: "Industrial and light manufacturing operations",
    desc: "Supply solutions for working environments that depend on continuity, practical sourcing, and reliable access to technical, mechanical, and operational support items.",
  },
  {
    title: "Retail and hospitality businesses",
    desc: "Support for customer-facing operations that require organised procurement across equipment, storage, refrigeration, and day-to-day commercial supply needs.",
  },
  {
    title: "Agricultural and food-related enterprises",
    desc: "Supply coordination for operations that rely on dependable sourcing, storage support, refrigeration, and practical procurement aligned to perishable environments.",
  },
  {
    title: "Schools, institutions, and organisations",
    desc: "General and operational supply support for institutions that value structured procurement, functional environments, and dependable fulfilment across varied requirements.",
  },
  {
    title: "Warehousing and logistics operations",
    desc: "Operational supply solutions for environments that depend on movement, storage, continuity, and dependable access to support equipment and facility-use products.",
  },
  {
    title: "Healthcare and specialised facilities",
    desc: "Supply support for environments that require controlled conditions, dependable procurement, and greater attention to specialised operational needs.",
  },
];

export default function EnterprisePage() {
  return (
    <main className="site-bg">
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0">
          
        </div>

        

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[72vh] gap-10 lg:grid-cols-[1fr_minmax(520px,760px)] lg:items-center">
            <div className="hidden lg:block" />

            <div className="relative z-10 py-8 lg:py-16">
              <Reveal>
                <h1 className="max-w-[11ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[6.15rem]">
                  Supply Made Easy
                  
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
                  Thaboliz Enterprise supports organisations that need a dependable
                  procurement and supply partner across a wide range of business,
                  technical, and operational requirements. From office and technology
                  supply to industrial products, facilities support, refrigeration,
                  and cold room solutions, we help clients source what matters with
                  structure and clarity.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    className="h-12 rounded-md border-0 bg-blue-500 px-7 text-white hover:opacity-90"
                  >
                    <Link href="/#contact">Contact us</Link>
                  </Button>

                  <Link
                    href="#what-we-supply"
                    className="inline-flex items-center gap-2 text-base font-medium text-white underline decoration-white/25 underline-offset-4 transition hover:decoration-white"
                  >
                    Explore enterprise supply
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        id="positioning"
        className="scroll-mt-32 border-y border-white/10 bg-black"
      >
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(320px,1.05fr)_minmax(320px,0.8fr)] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="max-w-[8ch] text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl">
                  We simplify supply.
                </h2>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div>
                <p className="text-md leading-relaxed text-white sm:text-base">
                  Thaboliz Enterprise is positioned as a practical supply partner
                  for businesses, institutions, contractors, and operating teams
                  that need dependable sourcing across multiple categories. The
                  division is intentionally broad, but the way we work is structured,
                  responsive, and commercially grounded.
                </p>

                <p className="mt-6 text-sm leading-relaxed text-white sm:text-base">
                  We are built for varied requirements, from routine procurement to
                  more specialised supply requests, without losing clarity, delivery
                  discipline, or procurement confidence.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="overview" className="scroll-mt-32 py-14 sm:py-18 bg-white">
  <div className="mx-auto max-w-6xl px-4">
    <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
      <Reveal className="lg:col-span-6">
        <ConstructionCard className="h-full p-7 sm:p-9">
          <h2 className="text-5xl font-bold leading-[0.95] tracking-tight text-black sm:text-6xl">
            A dependable
            <br />
            partner for
            <br />
            diverse business
            <br />
            needs
          </h2>

          <p className="mt-5 max-w-xl text-md leading-relaxed text-black sm:text-base">
            Thaboliz Enterprise exists to simplify supply for businesses,
            institutions, contractors, and growing operations that need more
            than a once-off vendor. We support procurement across general,
            technical, operational, and specialised categories, helping
            clients secure the right products, equipment, and materials with
            confidence.
          </p>

          <p className="mt-5 max-w-xl text-md leading-relaxed text-black sm:text-base">
            Our approach is flexible enough to handle varied requirements, yet
            structured enough to protect delivery quality. Whether the need is
            routine, urgent, scaled, or highly specific, we work to source
            efficiently, quote clearly, and coordinate supply with
            professionalism from start to finish.
          </p>

          <div className="mt-8 h-px w-24 bg-black/10" />
        </ConstructionCard>
      </Reveal>

      <Reveal delayMs={140} className="lg:col-span-6">
        <ConstructionCard className="h-full p-2 sm:p-2.5">
          <div className="relative overflow-hidden ">
            <div className="relative aspect-[9/16] w-full">
              <Image
                src="/enterprise/pic-19.jpg"
                alt="Enterprise supply operations by Thaboliz"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </ConstructionCard>
      </Reveal>
    </div>
  </div>
</section>

      <section id="what-we-supply" className="scroll-mt-32 py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                What we supply
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
                Our supply capability is intentionally broad because real
                operations require more than one category of support. Thaboliz
                Enterprise serves clients who need a reliable source for everyday
                procurement, technical requirements, specialised equipment, and
                business-critical supply coordination.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            <EnterpriseSupplyCards items={supplyItems} />
          </div>

          <div className="mt-24">
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Cold room solutions we can supply
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                    Our refrigeration supply capability includes a range of cold
                    room formats suited to different industries, scales, and
                    operating environments. From commercial storage to
                    specialised controlled-temperature spaces, we help clients
                    source solutions that align with practical business use.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
  <AluminumCategoryCarousel
    autoPlayMs={6000}
    slides={coldRoomVentures.map((item, index) => ({
      id: `cold-room-${index + 1}`,
      title: item.title,
      description: item.desc,
      image: {
        src: item.image,
        alt: item.title,
      },
    }))}
  />
</div>
          </div>
        </div>
      </section>

      <ValuesEditorial values={industries} />

      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(201,168,106,0.10),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]" />

              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Let’s supply what your business needs
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                  Whether you are sourcing office equipment, technical products,
                  industrial requirements, operational support items, refrigeration,
                  or cold room solutions, Thaboliz Enterprise is ready to assist.
                  Reach out to discuss your requirement and begin the supply
                  conversation with our team.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="h-12 rounded-md border-0 bg-blue-500 px-8 text-white hover:opacity-90"
                  >
                    <Link href="/#contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}


function ConstructionCard({
  children,
  className = "",
  bgSrc,
  bgAlt = "",
  bgOpacity = 0.22,
}: {
  children: React.ReactNode;
  className?: string;
  bgSrc?: string;
  bgAlt?: string;
  bgOpacity?: number;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden ",
        
        
        className,
      ].join(" ")}
    >

      {bgSrc ? (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={bgSrc}
            alt={bgAlt}
            fill
            className="object-cover"
            style={{ opacity: bgOpacity }}
          />
        </div>
      ) : null}

      

      <div className="relative">{children}</div>
    </div>
  );
}

type ValueCard = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  img?: string;
};

function ValuesEditorial({ values }: { values: ValueCard[] }) {
  return (
    <section
      id="values"
      className=" bg-black py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.15fr)] lg:gap-24">
          {/* Left side */}
          <Reveal>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="max-w-[8ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[4.75rem]">
                Industries We Serve
                
              </h2>

              <p className="mt-8 max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
                Thaboliz Enterprise supports a broad range of industries
              </p>
            </div>
          </Reveal>

          {/* Right side */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            {values.map((value, index) => (
              <Reveal key={value.title} delayMs={index * 70}>
                <article className="border-b border-white/10 pb-5 sm:pb-6 lg:pb-7">
                  <div className="flex items-start gap-4">
                    

                    <div className="min-w-0">
                      <h3 className="text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
                        {value.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

