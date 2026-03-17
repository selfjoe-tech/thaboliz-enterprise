import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Warehouse,
  Snowflake,
  Globe2,
  ClipboardCheck,
  ShieldCheck,
  Map,
  Route,
  FileText,
  BadgeCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import LogisticsHoverCards from "@/components/logistics/LogisticsHoverCards";

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-14 sm:py-18">
      <div className="px-10 w-full">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
              {subtitle}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/** Logistics gets a “route + tracking” card (dotted map + lane marks) */
function LogisticsCard({
  children,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pad =
    size === "sm" ? "p-4" : size === "lg" ? "p-8 sm:p-10" : "p-6";

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.03]",
        "transition-transform duration-200 hover:-translate-y-[2px]",
        pad,
        className,
      ].join(" ")}
    >
      {/* blue wash (still “blue cards”), but different pattern from construction */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[linear-gradient(90deg,rgba(0,82,212,.40)_0%,rgba(101,199,247,.22)_55%,rgba(0,195,255,.18)_100%)]" />

      {/* dotted “map” texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle,rgba(255,255,255,.22)_1px,transparent_1px)] bg-[size:18px_18px]" />

      {/* lane marks */}
      <div className="pointer-events-none absolute -left-10 top-1/2 h-[220%] w-[120px] -translate-y-1/2 rotate-12 opacity-[0.20] bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,.7)_0px,rgba(255,255,255,.7)_10px,transparent_10px,transparent_22px)]" />

      {/* readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/75" />

      {/* hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.22),transparent_55%)]" />

      <div className="relative">{children}</div>
    </div>
  );
}

function MediaSlot({
  label = "Illustration / image slot",
  src,
}: {
  label?: string;
  src?: string;
}) {
  return (
    <div className="relative overflow-hidden ">
      <div className="relative aspect-[16/11] w-full">
        {src ? (
          <Image src={src} alt={label + "by Thaboliz Logistics"} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-white/80">{label}</div>
              <div className="mt-1 text-xs text-white/50">
                Replace with a real image later (keeps layout stable now).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function LogisticsServicePage() {
  

  const whatWeDo = [
    {
      icon: <Route className="h-4 w-4" />,
      title: "Distribution planning and delivery operations",
      desc: "Predictable routes, delivery discipline, and visible service levels.",
      lane: "Linehaul + last-mile",
      img: "/stock/pic-29.jpg"
    },
    {
      icon: <Warehouse className="h-4 w-4" />,
      title: "Warehousing support and inventory movement",
      desc: "Receiving, storage movement, and dispatch readiness support.",
      lane: "Warehouse ops",
      img: "/stock/pic-30.jpg"

    },
    {
      icon: <Snowflake className="h-4 w-4" />,
      title: "Cold-chain support (where applicable)",
      desc: "Temperature-aware movement for agriculture and perishables.",
      lane: "Cold-chain",
      img: "/stock/pic-31.jpg"

    },
    {
      icon: <Globe2 className="h-4 w-4" />,
      title: "Cross-border import/export support",
      desc: "Documentation readiness for compliant cross-border movement.",
      lane: "Cross-border readiness",
      img: "/stock/pic-32.jpg"

    },
  ];

  const ventures = [
  {
    icon: <Map className="h-4 w-4" />,
    title: "National distribution hub model",
    desc: "Warehouse + route optimisation to increase predictability and control costs.",
    badge: "Hub + optimisation",
    img: "/stock/pic-42.avif",
  },
  {
    icon: <Snowflake className="h-4 w-4" />,
    title: "Cold storage micro-hubs near production areas",
    desc: "Shorten time-to-cold and improve quality for perishables.",
    badge: "Cold-chain",
    img: "/stock/pic-43.avif",
  },
];


  return (
    <main className="site-bg">
      {/* HERO (route + tracking layout) */}
      

      {/* STICKY QUICK LINKS (wraps on mobile) */}
      

      {/* OVERVIEW */}
      

{/* POSITIONING (UI like image #1) */}
<section className="relative overflow-hidden pt-16 sm:pt-20">
  {/* background image */}
  <div className="absolute inset-0">
    <Image
      src="/log/pic-1.jpg"
      alt=""
      fill
      className="object-cover object-center"
      sizes="100vw"
      priority
    />
  </div>

  {/* soft background atmosphere */}
  
  <div className="relative mx-auto max-w-6xl px-4">
    <div className="py-16 sm:py-20">
      <Reveal>
        <div className="flex w-full flex-col items-center justify-center">
          <div>
            <h1 className="mt-8 max-w-5xl text-6xl font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Reliable
              <br />
              movement
              <br />
              with control
            </h1>

            <p className="mt-8 max-w-3xl text-md leading-relaxed text-white sm:text-base">
              We move goods reliably and safely with a focus on predictable service levels, cost control,
              and compliance-aware operations. Delivery stays visible from dispatch to proof of delivery.
            </p>

            <div className="mt-8">
              <Button
                asChild
                className="h-12 rounded-none bg-[#2563eb] px-8 text-white transition hover:opacity-90"
              >
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </div>

  <Separator className="bg-white/10" />
</section>

{/* VISION (UI like image #2: text left, image right) */}
<section id="vision" className="scroll-mt-32 py-14 sm:py-18">
  <div className="mx-auto max-w-6xl px-4">
    

    <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
      {/* Left: vision text block */}
      <Reveal className="lg:col-span-6">
        <div className="h-full overflow-hidden ">
          <div className="p-8 sm:p-10">
            <div className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Vision
            </div>

            <div className="mt-6 h-1 w-28 bg-white" />

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              To become a high-trust logistics partner in Southern Africa for time-sensitive and
              high-accountability deliveries. We aim to be known for on-time performance, clear
              communication, and dependable proof of delivery.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Right: image card */}
      <Reveal delayMs={140} className="lg:col-span-6">
        <div className="h-full overflow-hidden border border-white/10 bg-white/[0.02]">
          <div className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
            <Image
              src="/stock/pic-28.jpg"
              alt="Logistics vision illustration by Thaboliz Logistics"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
          </div>
        </div>
      </Reveal>
    </div>
  </div>

  {/* divider under the split sections */}
  <div className="mx-auto max-w-6xl px-4 mt-14">
    <Separator className="bg-white/10" />
  </div>
</section>

      {/* WHAT WE DO (unique layout: lane labels + action row) */}
      <Section
        id="what-we-do"
        
      >
        <div className="flex flex-col w-full items-center justify-center">
          <div className=" flex flex-col gap-7 w-full justify-center">
            <h1 className=" mt-4 mb-4 max-w-5xl text-6xl font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-6xl">
                Logistic Services
 
              </h1>

            <LogisticsHoverCards items={whatWeDo} />

              
        </div>
        </div>
      </Section>

      {/* COMPLIANCE (unique: checklist board) */}
      <Section
        id="compliance"
      >
  {/* Centered header (no eyebrow) */}
  <div className="text-center">
    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
      Roadworthy operations and documentation discipline
    </h2>
    <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
      We treat compliance as operational readiness: vehicles, processes, and paperwork that stand up
      to scrutiny.
    </p>
  </div>

  {(() => {
    const complianceItems = [
      {
        icon: <ShieldCheck className="h-4 w-4" />,
        title: "Roadworthiness expectations",
        desc: "Vehicle readiness aligned to relevant categories and testing requirements where applicable.",
      },
      {
        icon: <FileText className="h-4 w-4" />,
        title: "Customs documentation preparedness",
        desc: "Processes aligned to SARS import/export frameworks for compliant cross-border movement.",
      },
    ];

    return (
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* LEFT: illustration */}
        <Reveal className="lg:col-span-5">
          <MediaSlot label="Compliance image" src="/illustrations/logistics-3.png" />
        </Reveal>

        {/* RIGHT: explanations stacked in a column (no cards) */}
        <Reveal delayMs={120} className="lg:col-span-7">
          <div className="grid gap-10">
            {complianceItems.map((c) => (
              <div key={c.title} className="max-w-2xl">
                {/* Icon in outlined circle */}
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
                  {/* normalize icon size inside circle */}
                  <span className="[&_*]:h-6 [&_*]:w-6">{c.icon}</span>
                </div>

                <div className="text-2xl font-semibold text-white">{c.title}</div>

                <p className="mt-3 text-sm leading-relaxed text-white/70">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Optional tags row (not bullet points) */}
          
        </Reveal>
      </div>
    )
  })()}
</Section>

      {/* VENTURES */}
      <section id="ventures" className="scroll-mt-32 py-16 sm:py-20">
  <div className="mx-auto max-w-6xl px-4">
    <Reveal>
      {/* Header (no eyebrow) */}
      <div>
        <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Growth models
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Infrastructure and optimisation models aimed at higher predictability and better unit economics.
        </p>
      </div>

      {/* Cards row: image on top, explanation directly underneath */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {ventures.map((v, i) => (
          <div key={v.title}>
            {/* Image */}
            <div className="overflow-hidden ">
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={(v as any).img ?? `/illustrations/gradient-${(i % 4) + 1}.avif`}
                  alt={v.title + "by Thaboliz Logistics"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            </div>

            {/* Explanation (directly under image) */}
            <div className="mt-6">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
                <span className="[&_*]:h-6 [&_*]:w-6">{v.icon}</span>
              </div>

              <div className="text-xl font-semibold text-white">{v.title}</div>

              <p className="mt-3 text-sm leading-relaxed text-white/90">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  </div>
</section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <LogisticsCard size="lg">
              

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share the lanes, volumes, service level expectations, and any cold-chain or cross-border
                constraints. We’ll propose a disciplined plan for predictable delivery.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/#contact">Contact Us</Link>
                </Button>
                
              </div>
            </LogisticsCard>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
