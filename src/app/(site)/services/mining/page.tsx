// app/services/mining/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Pickaxe,
  HardHat,
  ClipboardList,
  BarChart3,
  Handshake,
  Leaf,
  Truck,
  Factory,
  ShieldCheck,
  ClipboardCheck,
  MapPinned,
  Layers3,
  AlertTriangle,
  Users,
  TimerReset,
  Scale,
  Recycle,
  FileText,
  ChevronRight,
  Activity,
  Boxes,
  Wrench,
  Route,
  RadioTower,
} from "lucide-react";

import MiningHoverCards from "./MiningHoverCards";
import WhatMakesUsDifferentCarousel from "./WhatMakesUsDifferentCarousel";

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

function SoftCard({
  children,
  className = "",
  size = "md",
  bgSrc,
  bgAlt = "",
  bgOpacity = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  bgSrc?: string;
  bgAlt?: string;
  bgOpacity?: number;
}) {
  const pad =
    size === "sm" ? "p-4" : size === "lg" ? "p-8 sm:p-10" : "p-6";

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-none",
        "border border-white/10",
        "bg-black/30",
        "transition-transform duration-200 hover:-translate-y-[2px]",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,.14),0_18px_60px_rgba(0,0,0,.55)]",
        pad,
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
            priority={false}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.22),transparent_55%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
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
    <div className="relative overflow-hidden">
      <div className="relative aspect-[16/11] w-full">
        {src ? (
          <Image
            src={src}
            alt={`${label} by Thaboliz`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-white/80">{label}</div>
              <div className="mt-1 text-xs text-white/50">
                Replace with a real image later.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiningStatsStrip() {
  const stats = [
    { value: "Site support", label: "Mining operations assistance" },
    { value: "Safety-first", label: "HSE built into delivery" },
    { value: "Controls-led", label: "Clear scope and supervision" },
    { value: "Local impact", label: "Skills and participation" },
  ];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.value} delayMs={index * 60}>
              <SoftCard size="sm" className="h-full">
                <div className="text-2xl font-semibold tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">
                  {stat.label}
                </div>
              </SoftCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiningVisionSection() {
  return (
    <section id="vision" className="scroll-mt-32 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="lg:col-span-6">
            <div className="h-full overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Vision
                </div>

                <div className="mt-6 h-1 w-28 bg-white" />

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  To become a trusted support partner for mining environments where safety,
                  uptime, and disciplined execution matter every day.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={140} className="lg:col-span-6">
            <div className="h-full overflow-hidden border border-white/10 bg-white/[0.02]">
              <div className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
                <Image
                  src="/illustrations/mining-2.png"
                  alt="Mining vision by Thaboliz"
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

      <div className="mx-auto mt-14 max-w-6xl px-4">
        <Separator className="bg-white/10" />
      </div>
    </section>
  );
}

function MiningMissionSection() {
  return (
    <section id="mission" className="scroll-mt-32 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          




          <Reveal delayMs={140} className="lg:col-span-6">
            <div className="h-full overflow-hidden border border-white/10 bg-white/[0.02]">
              <div className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
                <Image
                  src="/illustrations/mining-3.png"
                  alt="Mining vision by Thaboliz"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6">
            <div className="h-full overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Mission
                </div>

                <div className="mt-6 h-1 w-28 bg-white" />

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  To support mining operations with practical site services, structured controls,
                  and reliable teams that help clients maintain safety, visibility, and operational
                  continuity.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiningProcessMasonry() {
  const workCards = [
    {
      title: "Scope and site alignment",
      desc: "We define the work area, access rules, reporting line, and task boundaries before work begins.",
      image: "/mining/pic-10.jpg",
      width: 1200,
      height: 1600,
    },
    {
      title: "Safety and quality first",
      desc: "Structured HSE planning, task controls, and quality checks remain active throughout execution.",
      image: "/mining/pic-9.jpg",
      width: 1200,
      height: 700,
    },
    {
      title: "Governance",
      desc: "Transparent reporting and milestone-based progress keep delivery visible and easy to manage.",
      image: "/mining/pic-11.jpg",
      width: 1200,
      height: 900,
    },
    {
      title: "Local impact",
      desc: "Training, subcontractor development, procurement discipline, and local participation are built in.",
      image: "/mining/pic-8.jpg",
      width: 1200,
      height: 1500,
    },
  ];

  return (
    <section
      id="how-we-work"
      className="relative overflow-hidden border-y border-black/10 bg-gradient-to-b from-[#f8f8f6] via-[#ececea] to-[#d9d9d4] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.95),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(180,180,180,0.18),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_38%,rgba(120,120,120,0.06)_100%)]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(320px,0.95fr)_minmax(320px,0.9fr)] lg:items-start lg:gap-16">
          <Reveal>
            <h2 className="max-w-[9ch] text-4xl font-semibold leading-[0.92] tracking-tight text-black sm:text-5xl lg:text-6xl">
              Our process
            </h2>
          </Reveal>

          <Reveal delayMs={80}>
            <p className="max-w-2xl text-base leading-relaxed text-black/90 sm:text-lg">
              We keep execution visible through scope control, HSE planning, and quality checks.
              The process is designed to stay clear, accountable, and practical from early planning
              through live operations.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 columns-1 gap-6 lg:columns-2 [column-fill:_balance]">
          {workCards.map((card, idx) => (
            <div key={card.title} className="mb-6 break-inside-avoid">
              <Reveal delayMs={idx * 70}>
                <article className="group relative overflow-hidden rounded-xl bg-white/5">
                  <div className="relative">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={card.width}
                      height={card.height}
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.28)_24%,rgba(0,0,0,0.62)_100%)]" />

                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8">
                      <div className="max-w-[28rem]">
                        <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                          {card.title}
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiningValuesEditorial({ values }: { values: ValueCard[] }) {
  return (
    <section id="values" className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.15fr)] lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="max-w-[8ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[4.75rem]">
                Core values
              </h2>

              <p className="mt-8 max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
                We turn values into action through disciplined execution, accountability, safety,
                craftsmanship, continuous improvement, and respect for people, communities, and
                the environment.
              </p>
            </div>
          </Reveal>

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

function MiningComplianceSection() {
  const items = [
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Site controls",
      desc: "Work is planned inside client-site rules, with access control, task checks, and supervision visible from the start.",
    },
    {
      icon: <ClipboardCheck className="h-4 w-4" />,
      title: "Documentation discipline",
      desc: "Daily logs, scope notes, and handover records keep delivery auditable and reduce confusion across teams.",
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "Risk management",
      desc: "Hazards, changes, and unsafe conditions are escalated immediately with stop-work authority where needed.",
    },
  ];

  return (
    <section id="compliance" className="scroll-mt-32 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Working within regulated mining environments
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            This section builds trust without implying you hold mining rights. It shows that the
            business understands controlled site delivery.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <MediaSlot label="Compliance image" src="/illustrations/mining-4.png" />
          </Reveal>

          <Reveal delayMs={120} className="lg:col-span-7">
            <div className="grid gap-10">
              {items.map((item) => (
                <div key={item.title} className="max-w-2xl">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white">
                    <span className="[&_*]:h-6 [&_*]:w-6">{item.icon}</span>
                  </div>

                  <div className="text-2xl font-semibold text-white">{item.title}</div>

                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiningEnvironmentsSection() {
  const environments = [
    {
      title: "Open-cast support areas",
      desc: "Support functions around access, coordination, and site movement.",
      image: "/mining/pic-12.jpg",
    },
    {
      title: "Shutdown windows",
      desc: "Short-duration work with clear sequencing, reporting, and close-out.",
      image: "/mining/pic-14.jpg",
    },
    {
      title: "Plant-adjacent work zones",
      desc: "Practical support around controlled operational areas and maintenance activity.",
      image: "/mining/pic-13.jpg",
    },
  ];

  return (
    <section id="environments" className="scroll-mt-32 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Typical work environments
            </h2>
            
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {environments.map((item, i) => (
            <Reveal key={item.title} delayMs={i * 70}>
              <div>
                <div className="overflow-hidden">
                  <div className="relative aspect-[9/16] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={i === 0}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xl font-semibold text-white">{item.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/90">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MiningServicePage() {
  const values: ValueCard[] = [
    {
      title: "Integrity",
      desc: "Do the right work, the right way.",
      icon: <ShieldCheck className="h-4 w-4" />,
      img: "/illustrations/gradient-6.avif",
    },
    {
      title: "Safety",
      desc: "Protect people, sites, and communities.",
      icon: <HardHat className="h-4 w-4" />,
      img: "/illustrations/gradient-7.avif",
    },
    {
      title: "Craftsmanship",
      desc: "Deliver with care, structure, and consistency.",
      icon: <ClipboardList className="h-4 w-4" />,
      img: "/illustrations/gradient-8.avif",
    },
    {
      title: "Governance",
      desc: "Keep work visible, accountable, and auditable.",
      icon: <BarChart3 className="h-4 w-4" />,
      img: "/illustrations/gradient-9.avif",
    },
    {
      title: "Respect",
      desc: "For people, site rules, and the environment.",
      icon: <Leaf className="h-4 w-4" />,
      img: "/illustrations/gradient-6.avif",
    },
    {
      title: "Partnership",
      desc: "Work as a reliable support partner to clients.",
      icon: <Handshake className="h-4 w-4" />,
      img: "/illustrations/gradient-6.avif",
    },
  ];

  return (
    <main className="site-bg">
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 sm:pt-18">
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10">
              <Reveal>
                

                <h1 className="mt-4 text-7xl font-semibold leading-[1.05] tracking-tight text-white sm:text-9xl">
                  Mining
                </h1>

                <p className="mt-5 max-w-xl text-md leading-relaxed text-white/170 sm:text-[15px]">
                  Thaboliz supports mining operations through disciplined site execution,
                  maintenance support, logistics coordination, and rehabilitation-aligned work.
                  This page is intentionally contractor-led, not rights-holder led.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-none border-white/15 text-white hover:bg-white/5"
                  >
                    <Link href="/#contact">Contact us</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={140} className="relative">
              <div className="relative">
                <Image
                  src="/mining/pic-15.jpg"
                  alt="Mining hero by Thaboliz"
                  width={1800}
                  height={1400}
                  className="block h-auto w-full"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* <MiningStatsStrip /> */}

      {/* OVERVIEW CAROUSEL */}
      <section className="py-4 justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Mining services
          </h2>
          <p className="mx-auto mb-15 mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            The page should feel structured, editorial, and premium, while still making the scope obvious.
          </p>
        </div>




        <MiningHoverCards
          items={[
            {
              title: "Site support and operational assistance",
              desc: "Predictable site support with visible controls, supervision, and task discipline.",
              lane: "Site support",
              img: "/mining/pic-1.jpg",
            },
            {
              title: "Shutdown and maintenance support",
              desc: "Planned support for maintenance windows with sequencing, checks, and close-out.",
              lane: "Shutdown windows",
              img: "/mining/pic-3.jpg",
            },
            {
              title: "Materials handling support",
              desc: "Movement and handling support within the client’s controlled operating environment.",
              lane: "Handling",
              img: "/mining/pic-2.jpg",
            },

            {
              title: "Contract mining and mineral extraction",
              desc: "Controlled extraction activities executed within defined scopes, with attention to safety, environmental considerations, and production discipline.",
              lane: "Extraction",
              img: "/mining/pic-6.jpg",
            },
            {
              title: "Ore handling and stockpile management",
              desc: "Structured movement, separation, and stockpile control aligned to site production and dispatch requirements.",
              lane: "Ore flow",
              img: "/mining/pic-7.jpg",
            },
          ]}
        />


      </section>

      {/* VISION / MISSION */}
      <MiningVisionSection />
      <MiningMissionSection />

      {/* PROCESS */}
      <MiningProcessMasonry />

      {/* DIFFERENTIATORS */}
     

      {/* COMPLIANCE */}
      <MiningComplianceSection />

      {/* ENVS */}
      <MiningEnvironmentsSection />

      {/* VALUES */}
      {/* <MiningValuesEditorial values={values} /> */}

      {/* PARTNERSHIP */}
      {/* <WhatMakesUsDifferentCarousel /> */}

      {/* CTA */}
      <section className="bg-black py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <div>
                <h2 className="max-w-[10ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[4.75rem]">
                  Begin Your Mining Journey With Us
                </h2>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild className="rounded-md bg-[#1f6fff] px-6 py-6 text-base font-semibold text-white hover:bg-[#195ee0]">
                    <Link href="/#contact">Contact Us</Link>
                  </Button>

                  
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="max-w-xl text-3xl leading-[1.25] tracking-tight text-white sm:text-4xl">
                Contact us for enquiries and partnerships
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}