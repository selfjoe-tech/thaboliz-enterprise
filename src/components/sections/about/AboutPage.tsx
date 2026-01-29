"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import {
  ShieldCheck,
  ClipboardList,
  BarChart3,
  HardHat,
  Handshake,
  Leaf,
  Pickaxe,
  Cpu,
  Truck,
  Flame,
  Wind,
  Microscope,
  Link2,
  LinkIcon,
} from "lucide-react";

type Stat = { value: string; label: string };
type ValueCard = { title: string; desc: string; icon: React.ReactNode };

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
    <section id={id} className="scroll-mt-24 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/150">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-md leading-relaxed text-white/170 sm:text-[15px]">
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
  bgOpacity = 0.35, // image strength
  overlay = true,   // add dark overlay for readability
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  bgSrc?: string;
  bgAlt?: string;
  bgOpacity?: number;
  overlay?: boolean;
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
      {/* Background image */}
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
          {/* optional contrast overlay */}
          
          {/* soft sheen */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.22),transparent_55%)]" />
        </div>
      ) : null}

      {/* Content */}
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
    <div className="relative min-h-[450px] w-full flex ">
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover rounded-[10px]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="text-center">
            <div className="text-md font-semibold text-white/180">{label}</div>
            <div className="mt-1 text-xs text-white/150">
              Replace with a real image later (keeps layout stable now).
            </div>
          </div>
        </div>
      )}

      {/* subtle overlay so text can sit on top if needed */}
    </div>
  );
}

export default function AboutPage() {
  const stats: Stat[] = [
    { value: "Multi-sector", label: "Delivery across essential industries" },
    { value: "High-accountability", label: "Clear scope, visible performance" },
    { value: "Safety-first", label: "HSE + quality controls baked in" },
    { value: "Local impact", label: "Skills, suppliers, sustainable participation" },
  ];

  const values: ValueCard[] = [
    { title: "Integrity", desc: "Do the right work, the right way.", 
      icon: <ShieldCheck className="h-4 w-4" />, 
      img: "/illustrations/gradient-6.avif"

     },
    { title: "Safety", desc: "Protect people, sites, and communities.", icon: <HardHat className="h-4 w-4" /> 
       ,img: "/illustrations/gradient-7.avif"

    },
    { title: "Craftsmanship", desc: "Build and operate to last.", icon: <ClipboardList className="h-4 w-4" /> 
      ,img: "/illustrations/gradient-8.avif"
    },
    { title: "Continuous improvement", desc: "Measure, learn, refine.", icon: <BarChart3 className="h-4 w-4" /> 
      ,img: "/illustrations/gradient-9.avif"
    },
    { title: "Respect", desc: "For people and the environment.", icon: <Leaf className="h-4 w-4" /> 
      ,img: "/illustrations/gradient-6.avif"
    },
    { title: "Partnership", desc: "Specialists + shared outcomes.", icon: <Handshake className="h-4 w-4" /> 
      ,img: "/illustrations/gradient-6.avif"
    },
  ];

  return (
    <main className="site-bg">
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 sm:pt-18">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10">
              <Reveal>
                

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  A diversified group built for{" "}
                  <span className="text-brand-gradient">visible delivery</span>
                </h1>

                <p className="mt-5 max-w-xl text-md leading-relaxed text-white/170 sm:text-[15px]">
                  Thaboliz Enterprise operates across infrastructure, logistics, technology, energy,
                  mining, and sustainable development, delivering integrated solutions with
                  disciplined execution and measurable outcomes.
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

            {/* Media / illustration slot */}
            <Reveal delayMs={140} className="relative">
              <MediaSlot label="Hero illustration / photo" src={"/illustrations/office.png"} />
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* QUICK NAV */}
      


      {/* OVERVIEW */}
      <Section
        id="overview"
        eyebrow="Overview"
        title="End-to-end services across high-impact sectors"
        subtitle="We combine expertise in each sector to deliver integrated solutions tailored to client needs, with disciplined governance and clear accountability."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <SoftCard>
              <p className="text-md leading-relaxed text-white/500">
                Thaboliz focuses on high-accountability execution: clear scope, measurable outcomes,
                and systems that make performance visible.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { label: "Construction", icon: <HardHat className="h-3.5 w-3.5" /> },
                  { label: "Technology", icon: <Cpu className="h-3.5 w-3.5" /> },
                  { label: "Logistics", icon: <Truck className="h-3.5 w-3.5" /> },
                  { label: "Mining", icon: <Pickaxe className="h-3.5 w-3.5" /> },
                  { label: "Oil & gas", icon: <Flame className="h-3.5 w-3.5" /> },
                  { label: "Green energy", icon: <Wind className="h-3.5 w-3.5" /> },
                  { label: "Research", icon: <Microscope className="h-3.5 w-3.5" /> },
                ].map((x) => (
                  <span
                    key={x.label}
                    className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/200"
                  >
                    <span className="text-white/80">{x.icon}</span>
                    {x.label}
                  </span>
                ))}
              </div>
            </SoftCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Overview image slot" src={"/illustrations/industry.png"} />
          </Reveal>
        </div>
      </Section>

      {/* VISION / MISSION */}
      <Section
  eyebrow="Direction"
  title="A clear vision and mission"
  subtitle="The kind that guides day-to-day decisions, not just the slide deck."
>
  <div className="flex flex-col w-full gap-15">

    <div className="flex w-full gap-3">
<Reveal>
      <SoftCard className="h-full" bgSrc={"/illustrations/gradient-1.avif"}>
        <div id="vision" className="scroll-mt-24" />
        <div className="text-xl font-semibold uppercase tracking-[0.22em] text-white/500">
          Vision
        </div>
        <p className="mt-3 text-md leading-relaxed text-white/75">
          To become a trusted delivery partner for projects that strengthen everyday life:
          reliable infrastructure, efficient supply chains, secure systems, and resilient
          energy.
        </p>
      </SoftCard>
    </Reveal>

    <Reveal delayMs={120}>
      <SoftCard className="h-full" bgSrc={"/illustrations/gradient-2.avif"}>
        <div id="mission" className="scroll-mt-24" />
        <div className="text-xl font-semibold uppercase tracking-[0.22em] text-white/500">
          Mission
        </div>
        <p className="mt-3 text-md leading-relaxed text-white/75">
          To plan, build, and operate practical solutions across high-impact sectors by
          combining skilled teams, disciplined project controls, and modern technology.
        </p>
      </SoftCard>
    </Reveal>

    </div>
    

    
  </div>
</Section>


      {/* HOW WE WORK */}
      <Section
        id="how-we-work"
        eyebrow="How we work"
        title="Disciplined delivery, from discovery to operations"
        subtitle="We keep execution visible through governance, HSE planning, and quality checks throughout."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <MediaSlot label="Process illustration slot" src={"/illustrations/working.png"} />
          </Reveal>

          <div className="grid gap-4">
            {[
              {
                title: "Discovery to delivery",
                icon: <ClipboardList className="h-4 w-4" />,
                bullets: [
                  "Requirements, feasibility, cost, schedule, risk",
                  "Clear scope and measurable outcomes",
                ],
              },
              {
                title: "Governance",
                icon: <BarChart3 className="h-4 w-4" />,
                bullets: [
                  "Transparent reporting and milestone-based progress",
                  "Auditable documentation and decisions",
                ],
              },
              {
                title: "Safety and quality first",
                icon: <HardHat className="h-4 w-4" />,
                bullets: [
                  "Structured HSE planning and regulatory compliance",
                  "Quality checks throughout, especially construction/mining",
                ],
              },
              {
                title: "Local impact",
                icon: <Handshake className="h-4 w-4" />,
                bullets: [
                  "Training, subcontractor development, and procurement",
                  "Sustainable local participation where we operate",
                ],
              },
            ].map((s, idx) => (
              <Reveal key={s.title} delayMs={idx * 60}>
                <SoftCard className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/185">
                      {s.icon}
                    </span>
                    <div>
                      <div className="text-md font-semibold text-white">{s.title}</div>
                      <ul className="mt-2 space-y-1 text-xs leading-relaxed text-white/165">
                        {s.bullets.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SoftCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* DIFFERENTIATORS */}
      <Section
        id="different"
        eyebrow="What makes us different"
        title="One group, many capabilities"
        subtitle="Fewer handovers, faster decisions, and clearer accountability, with technology embedded into operations."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Integrated capabilities",
              desc: "Deliver more under one umbrella, with fewer handovers and tighter coordination.",
              img: "/illustrations/gradinet-6.avif"
            },
            {
              title: "Technology embedded",
              desc: "Tracking, reporting, monitoring, and analytics designed into delivery.",
              img: "/illustrations/gradinet-7.avif"

            },
            {
              title: "Risk-managed execution",
              desc: "Controls and compliance appropriate to each sector, without slowing delivery.",
              img: "/illustrations/gradinet-8.avif"

            },
          ].map((c, i) => (
            <Reveal key={c.title} delayMs={i * 80}>
              <SoftCard className="h-full" bgSrc={"/illustrations/gradient-3.avif"}> 
                <div className="text-md font-semibold text-white">{c.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-white/165">{c.desc}</p>
              </SoftCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* VALUES */}
      <Section
        id="values"
        eyebrow="Values"
        title="How we show up"
        subtitle="Integrity, safety, craftsmanship, continuous improvement, and respect for communities and the environment."
      >
        <ValuesCarousel values={values} />
      </Section>


      {/* PARTNERSHIPS */}
      <Section
        id="partnerships"
        eyebrow="Partnerships"
        title="Specialists, OEMs, and research institutions"
        subtitle="We pursue partnerships to deliver complex outcomes and accelerate innovation aligned with South Africa’s innovation-led development."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SoftCard>
              <p className="text-md leading-relaxed text-white/175">
                We collaborate with specialist contractors, OEMs, and research institutions to
                expand delivery capacity and bring the best tools and expertise to each project.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Specialist contractors", "OEM partners", "Research institutions", "Local suppliers"].map(
                  (x) => (
                    <span
                      key={x}
                      className="rounded-none border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/170"
                    >
                      {x}
                    </span>
                  )
                )}
              </div>
            </SoftCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Partnerships image slot" src={"/illustrations/partner.png"}/>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="rounded-none border border-white/10 bg-white/[0.02] p-8 sm:p-10">
              
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                If you have a project, operational challenge, or tender opportunity,{" "}
                <span className="text-brand-gradient">let’s scope it properly</span>.
              </h3>

              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/170">
                Contact us for a scoped proposal and delivery plan with clear milestones,
                governance, and outcomes.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/#contact">Contact us</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-white/15 bg-transparent text-white hover:bg-white/5"
                >
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}



function ValuesCarousel({ values }: { values: ValueCard[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1, // move 1 at a time
    dragFree: false,
  });

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-none border border-white/10 bg-black/60 p-2 text-white/80 backdrop-blur hover:bg-black/80 hover:text-white"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-none border border-white/10 bg-black/60 p-2 text-white/80 backdrop-blur hover:bg-black/80 hover:text-white"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="
                pl-4
                flex-[0_0_100%]
                sm:flex-[0_0_50%]
                lg:flex-[0_0_25%]
              "
            >
              <Reveal delayMs={i * 50}>
                <SoftCard className="h-70 p-5" bgSrc={v.img}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/85">
                      {v.icon}
                    </span>
                    <div>
                      <div className="text-md font-semibold text-white">{v.title}</div>
                      <div className="mt-1 text-xs leading-relaxed text-white/65">{v.desc}</div>
                    </div>
                  </div>
                </SoftCard>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}