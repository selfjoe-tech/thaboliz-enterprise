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

import VenturesCarousel from "@/components/organic-farms/VenturesCarousel";





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






export default function OrganicFarmsServicePage() {
  

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
      <section className="relative overflow-hidden   pt-16 sm:pt-20 lg:pt-24">
  {/* soft texture */}

  <div className="absolute inset-0">
      <Image
        src="/int/pic-1.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
    </div>
  <div className="pointer-events-none absolute inset-0 opacity-[0.1]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(74,222,128,0.18),transparent_34%),radial-gradient(circle_at_78%_14%,rgba(120,53,15,0.12),transparent_32%),radial-gradient(circle_at_65%_70%,rgba(163,230,53,0.08),transparent_28%)]" />
  </div>

  <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
    <div className="grid min-h-[72vh] gap-10 lg:grid-cols-[1fr_minmax(520px,760px)] lg:items-center">
      {/* empty left side to preserve the same spacious composition */}
      <div className="hidden lg:block" />

      {/* right content */}
      <div className="relative z-10 py-8 lg:py-16">
        <Reveal>
          <h1 className="max-w-[12ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[6.25rem]">
            Climate-smart
            <br />
            farming with{" "}
            <span className="bg-gradient-to-r from-[#6fcf7a] via-[#c8e97a] to-[#f0a24a] bg-clip-text text-transparent [filter:drop-shadow(0_0_14px_rgba(180,220,120,0.22))]">
  Resilient outcomes.
</span>
           
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
            We pursue sustainable food production built on soil health, responsible water
            planning, and practical market pathways, structured for resilient operations and
            high-quality outcomes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="h-12 rounded-md border-0 bg-[#3f7c47] px-7 text-white hover:bg-[#36683c]"
            >
              <Link href="/#contact">Contact us</Link>
            </Button>

            <Link
              href="#what-we-do"
              className="inline-flex items-center gap-2 text-base font-medium text-white underline decoration-black/25 underline-offset-4 transition hover:decoration-black"
            >
              Explore Farm Operations
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
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
      alt="Thaboliz Integrated Farms vision sectoion background image"
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
                alt="Farm vision illustration by Thaboliz Integrated Farms"
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
      <section
  id="standards"
  className="border-y border-white/10 bg-black"
>
  <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
    <div className="grid gap-10 lg:grid-cols-[minmax(420px,1.15fr)_minmax(320px,0.95fr)] lg:items-center lg:gap-16">
      {/* Left: image */}
      <Reveal delayMs={120}>
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/illustrations/farm-3.jpg"
              alt="Standards and certification operations illustration by ThaboliZ Integrated Farms"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 760px"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </Reveal>

      {/* Right: text */}
      <Reveal>
        <div className="max-w-xl lg:ml-auto">
          <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Standards-aware
            <br />
            operations
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
            South Africa’s organic space often uses sector standards and
            certification schemes, such as SAOSO’s standard for organic
            production and processing (where certification is pursued). We
            structure operations around traceability, documented practices, and
            audit-friendly record keeping.
          </p>
        </div>
      </Reveal>
    </div>
  </div>
</section>

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
            alt="Water stewardship illustration by Thaboliz Integrated Farms"
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
        <div className="flex justify-center flex-col items-center">
          <div className="h-px w-full bg-black/12" />
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
            <Gauge className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-black">
            Efficient irrigation
          </h3>

          <p className="mt-3 text-black text-center">
            Reduce irrigation waste through better scheduling, monitoring, and
            more deliberate water-use planning.
          </p>
          
        </div>
      </Reveal>

      <Reveal delayMs={220}>
        <div className="flex justify-center flex-col items-center">
          <div className="h-px w-full bg-black/12" />
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-black">
            Record readiness
          </h3>
          <p className="mt-3 text-base leading-relaxed text-black/90 text-center">
            Keep operational and compliance records clear, current, and ready
            for planning, oversight, and formal processes where needed.
          </p>
        </div>
      </Reveal>

      <Reveal delayMs={280}>
        <div className="flex justify-center flex-col items-center">
          <div className="h-px w-full bg-black/12" />
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-black">
            Resilient practices
          </h3>
          <p className="mt-3 text-base leading-relaxed text-black/90 text-center">
            Design water practices for resilience, predictability, and lower
            operational risk across changing conditions.
          </p>
        </div>
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
                  <Link href="/#contact">Contact Us</Link>
                </Button>
                
              </div>
            </FarmCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}




