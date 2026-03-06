"use client";


import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  Sprout,
  Droplets,
  Recycle,
  Package,
  Store,
  Users,
  Network,
  Globe2,
  ShieldCheck,
  ClipboardList,
  ChevronRight,
  Warehouse,
  CheckCircle2,
  MapPinned,
  Gauge,
  FileCheck2,
} from "lucide-react";
import FieldPathCarousel from "@/components/organic-farms/VenturesCarousel";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft } from "lucide-react";
import VenturesCarousel from "@/components/organic-farms/VenturesCarousel";


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
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4">
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

function StickyQuickLinks({ items }: { items: Array<[string, string]> }) {
  return (
    <section className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <Reveal className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
            Quick links
          </span>
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Blue card (as requested), but with an “organic notebook” feel:
 * - rounded corners
 * - subtle dot pattern
 * - soft highlight on hover
 */
function FarmCard({
  children,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pad =
    size === "sm" ? "p-4" : size === "lg" ? "p-8 sm:p-10" : "p-6";

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10",
        "transition-transform duration-200 hover:-translate-y-[2px]",
        "hover:shadow-[0_0_0_1px_rgba(120,190,255,.22),0_18px_60px_rgba(0,0,0,.55)]",
        "bg-white/[0.02]",
        pad,
        className,
      ].join(" ")}
    >
      {/* Blue theme base */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#9cecfb_0%,#65c7f7_45%,#0052d4_100%)] opacity-[0.52]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/75" />

      {/* Notebook dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Soft hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.18),transparent_55%)]" />

      <div className="relative">{children}</div>
    </div>
  );
}

function MediaSlot({
  label = "Image slot",
  src,
}: {
  label?: string;
  src?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-[4/3] sm:aspect-[16/11]">
        {src ? (
          <Image src={src} alt={label} fill className="object-cover" />
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />
      </div>
    </div>
  );
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((x) => (
        <Badge
          key={x}
          variant="outline"
          className="rounded-full border-white/15 text-white/80"
        >
          {x}
        </Badge>
      ))}
    </div>
  );
}



export default function OrganicFarmsServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Positioning", "#positioning"],
    ["Vision", "#vision"],
    ["What we do", "#what-we-do"],
    ["Standards", "#standards"],
    ["Water", "#water"],
    ["Ventures", "#ventures"],
  ];

  const whatWeDo = [
    {
      icon: <Sprout className="h-10 w-10" />,
      title: "Organic-aligned crop production",
      desc: "Traceability and integrity when certification/verification is pursued.",
    },
    {
      icon: <Recycle className="h-10 w-10" />,
      title: "Regenerative practices",
      desc: "Soil rehabilitation, composting, crop rotation, and resilience building.",
    },
    {
      icon: <Package className="h-10 w-10" />,
      title: "Agro-processing pathways",
      desc: "Packaging, grading, and basic value-add to improve market readiness.",
    },
    {
      icon: <Store className="h-10 w-10" />,
      title: "Market linkages",
      desc: "Retail, food service, and community supply partnerships for stable demand.",
    },
  ];

  const ventures = [
  {
    icon: <Sprout className="h-5 w-5" />,
    title: "Traceability pilots",
    desc: "Pilot systems that improve product visibility, documentation discipline, and confidence in quality assurance across the value chain.",
    badge: "TRACEABILITY",
    image: "/stock/pic-44.avif",
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: "Community networks",
    desc: "Local grower and buyer relationships that strengthen supply participation, regional coordination, and practical market linkage.",
    badge: "COMMUNITY",
    image: "/stock/pic-45.jpg",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Region-specific crop strategy",
    desc: "Crop planning shaped around local conditions, demand patterns, and infrastructure realities to improve long-term viability.",
    badge: "STRATEGY",
    image: "/stock/pic-46.avif",
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Processing readiness",
    desc: "Early preparation for grading, packaging, and quality presentation so supply can move with better structure and consistency.",
    badge: "READINESS",
    image: "/stock/pic-47.avif",
  },
  {
    icon: <Store className="h-5 w-5" />,
    title: "Market pathways",
    desc: "Commercial routes into retail, community, and food service channels supported by disciplined operational planning.",
    badge: "MARKET",
    image: "/stock/pic-48.jpg",
  },
];

  return (
    <main className="site-bg">
      {/* HERO (unique “field page” feel) */}
      <section className="relative overflow-hidden pt-14 sm:pt-18">
        {/* soft background texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_10%_20%,rgba(156,236,251,.35),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(0,82,212,.35),transparent_55%)]" />

        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-white/35" />
            <span className="text-white/80">Organic Farms</span>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
                  <Leaf className="h-4 w-4 text-white/80" />
                  Organic Farms
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Climate-smart farming with{" "}
                  <span className="text-brand-gradient">traceability and stewardship</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We pursue sustainable food production built on soil health, responsible water
                  planning, and practical market pathways, structured for resilient operations and
                  high-quality outcomes.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Contact Us</Link>
                  </Button>
                  
                </div>

                
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <MediaSlot label="Organic farms hero image" src="/illustrations/farm-2.jpg" />
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* STICKY QUICK LINKS */}

      {/* POSITIONING + VISION (two clean cards + image) */}
<section
  id="positioning"
  className="scroll-mt-32 border-y border-white/10 bg-black"
>
  <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div className="grid gap-8 lg:grid-cols-[minmax(320px,1.05fr)_minmax(320px,0.8fr)] lg:gap-16">
      <Reveal>
        <div>
          <h2 className="max-w-[7ch] text-5xl font-semibold  text-white sm:text-6xl lg:text-7xl">
            What We Pursue
          </h2>
        </div>
      </Reveal>

      <Reveal delayMs={100}>
        <div className="max-w-xl lg:pt-2">
          <p className="text-lg leading-relaxed text-white/90 sm:text-[22px] sm:leading-[1.45]">
            We pursue sustainable food production with traceability, soil
            health, and responsible water stewardship. Our approach is built to
            support resilient operations, better land outcomes, and
            higher-confidence supply readiness over time.
          </p>
        </div>
      </Reveal>
    </div>
  </div>
</section>

<section
  id="vision"
  className=" relative overflow-hidden"
>
  {/* section background image */}
  <div className="absolute inset-0">
    <Image
      src="/stock/pic-50.jpg"
      alt=""
      fill
      className="object-cover"
      sizes="100vw"
    />
    
  </div>

  <div className="relative mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div className="grid gap-10 lg:grid-cols-[minmax(300px,0.95fr)_minmax(420px,1.15fr)] lg:items-center lg:gap-16">
      <div className="flex min-h-[420px] flex-col justify-between">
        <Reveal>
          <div>
            <h2 className="max-w-[6ch] text-5xl font-semibold leading-[0.92] tracking-tight sm:text-black sm:text-6xl lg:text-7xl">
              Vision
            </h2>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="max-w-md">
            <div className="h-2 w-full bg-black/70" />
            <p className="mt-7 text-xl font-semibold leading-relaxed sm:text-black sm:text-[21px] sm:leading-[1.5]">
              To develop resilient, organic, climate-smart farming operations
              that produce high-quality food while restoring land and supporting
              long-term agricultural value.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delayMs={180}>
        <div className="relative ml-auto w-full max-w-[700px]">
          <div className="  p-3 ">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/90">
              <Image
                src="/stock/pic-27.jpg"
                alt="Farm vision"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
</section>

      {/* PATHWAY (unique UI) */}
      
            {/* <Reveal>
              <FieldPathCarousel />
            </Reveal> */}

      {/* WHAT WE DO (bento-ish but calm) */}
      <section id="what-we-do" className="relative  bg-green-500">
  <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="grid gap-16 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.35fr)] lg:gap-24">
      {/* Left title */}
      <Reveal>
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="max-w-sm text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Farm operations
            <br />
            and pathways
          </h2>
        </div>
      </Reveal>

      {/* Right items */}
      <div className="space-y-14">
        {whatWeDo.map((x, i) => (
          <Reveal key={x.title} delayMs={i * 70}>
            <article className="grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-6">
              {/* Icon */}
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#ffffffff] text-[#ffffff]">
                {x.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {x.title}
                </h3>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {"bullets" in x && Array.isArray(x.bullets)
                    ? x.bullets.join(" ")
                    : x.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* STANDARDS */}
      <Section
        id="standards"
        eyebrow="Standards and certification approach"
        title="Standards-aware operations"
        subtitle="Designed for traceability and compliance where certification/verification is pursued."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <FarmCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">
                    Certification-ready mindset
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    South Africa’s organic space often uses sector standards and certification schemes,
                    such as SAOSO’s standard for organic production and processing (where certification
                    is pursued). We structure operations around traceability, documented practices, and
                    audit-friendly record keeping.
                  </p>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {[
                      "Inputs control and supplier discipline",
                      "Farm logs and batch traceability",
                      "Processing hygiene and handling",
                      "Audit-friendly records and SOPs",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/70" />
                        <div className="text-xs leading-relaxed text-white/75">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FarmCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Standards image" src="/illustrations/farm-3.jpg" />
          </Reveal>
        </div>
      </Section>

      {/* WATER */}
      <section id="water" 
      className="border-y border-black/10 bg-white [background:linear-gradient(180deg,#bcdcff_10%,#eaf3ff_80%,#ffffff_100%)]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    {/* Heading */}
    <div className="max-w-4xl">
      <Reveal>
        <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Responsible water planning
        </h2>
      </Reveal>

      <Reveal delayMs={80}>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-black sm:text-lg">
          Where farming operations require authorisation, we align planning with
          the DWS water use authorisation process and the applicable legal
          framework. The goal is practical stewardship: efficient irrigation,
          risk reduction, and compliance readiness.
        </p>
      </Reveal>
    </div>

    {/* Large image */}
    <Reveal delayMs={120}>
      <div className="mt-12 overflow-hidden rounded-2xl border border-black/10 bg-[#f4f4f2]">
        <div className="relative aspect-[16/7] w-full">
          <Image
            src="/stock/pic-52.jpg"
            alt="Water stewardship"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </Reveal>

    {/* Bottom row */}
    <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
      <Reveal delayMs={160}>
        <article>
          <div className="h-px w-full bg-black/12" />
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
            <Gauge className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-black">
            Efficient irrigation
          </h3>
          <p className="mt-3 text-base leading-relaxed text-black/72">
            Reduce irrigation waste through better scheduling, monitoring, and
            more deliberate water-use planning.
          </p>
        </article>
      </Reveal>

      <Reveal delayMs={220}>
        <article>
          <div className="h-px w-full bg-black/12" />
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-black">
            Record readiness
          </h3>
          <p className="mt-3 text-base leading-relaxed text-black/72">
            Keep operational and compliance records clear, current, and ready
            for planning, oversight, and formal processes where needed.
          </p>
        </article>
      </Reveal>

      <Reveal delayMs={280}>
        <article>
          <div className="h-px w-full bg-black/12" />
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-black">
            Resilient practices
          </h3>
          <p className="mt-3 text-base leading-relaxed text-black/72">
            Design water practices for resilience, predictability, and lower
            operational risk across changing conditions.
          </p>
        </article>
      </Reveal>
    </div>
  </div>
</section>

      {/* VENTURES (unique: scroll-snap on mobile, grid on desktop) */}
      <Reveal>
        <VenturesCarousel ventures={ventures} />
      </Reveal>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <FarmCard size="lg">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Next step
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Want a traceable farm-to-market pilot or a scalable grower network?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share your target region, crop goals, required compliance level, and intended buyers.
                We’ll propose a practical plan for resilient farming operations and market access.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/#contact">Contact Thaboliz</Link>
                </Button>
                
              </div>
            </FarmCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}




