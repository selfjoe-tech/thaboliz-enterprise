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
import HowWeWorkMasonry from "./HowWeWorkMasonry";
import WhatMakesUsDifferentCarousel from "./WhatMakesUsDifferentCarousel";
import ServicesShowcaseCarousel from "./ServicesShowcaseCarousel ";

type Stat = { value: string; label: string };

type ValueCard = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  img?: string;
};

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
                

                <h1 className="mt-4 text-7xl font-semibold leading-[1.05] tracking-tight text-white sm:text-9xl">
                  About Us
                </h1>

                <p className="mt-5 max-w-xl text-md leading-relaxed text-white/170 sm:text-[15px]">
                  Thaboliz operates across infrastructure
                  and sustainable development, delivering integrated solutions with
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
      <ServicesShowcaseCarousel />

      {/* VISION / MISSION */}
      <>
  {/* Vision: text left, image right */}
  <section id="vision" className="scroll-mt-24">
    <div className="grid min-h-[100vh] lg:grid-cols-2">
      <Reveal>
        <div className="flex h-full items-center bg-[#625d69] px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-semibold leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Vision
            </h2>

            <p className="mt-8 text-base leading-relaxed text-white/90 sm:text-lg lg:text-[1.35rem] lg:leading-[1.45]">
              To become a trusted delivery partner for projects that strengthen
              everyday life: reliable infrastructure, efficient supply chains,
              secure systems, and resilient energy.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={120}>
        <div className="relative min-h-[60vh] lg:min-h-[100vh]">
          <Image
            src="/stock/about/pic-2.avif"
            alt="Vision"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </Reveal>
    </div>
  </section>

  {/* Mission: image left, text right */}
  <section id="mission" className="scroll-mt-24">
    <div className="grid min-h-[72vh] lg:grid-cols-2">
      <Reveal>
        <div className="relative min-h-[42vh] lg:min-h-[100vh]">
          <Image
            src="/stock/about/pic-3.jpg"
            alt="Mission"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Reveal>

      <Reveal delayMs={120}>
        <div className="flex h-full items-center bg-[#e9e6e1] px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-semibold leading-[0.9] tracking-tight text-black sm:text-6xl lg:text-7xl">
              Mission
            </h2>

            <p className="mt-8 text-base leading-relaxed text-black/75 sm:text-lg lg:text-[1.35rem] lg:leading-[1.45]">
              To plan, build, and operate practical solutions across
              high-impact sectors by combining skilled teams, disciplined
              project controls, and modern technology.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</>


      {/* HOW WE WORK */}
      <HowWeWorkMasonry />

      {/* DIFFERENTIATORS */}
      <WhatMakesUsDifferentCarousel />

      {/* VALUES */}
      <ValuesEditorial values={values} />






      {/* PARTNERSHIPS */}

<section id="partnerships" className="bg-[#f2f2f0]">
  <div className="grid min-h-[72vh] lg:grid-cols-2">
    {/* Left: image */}
    <Reveal>
      <div className="flex h-full items-center justify-center bg-[#e8e8e5] px-6 py-10 sm:px-10 lg:px-12">
        <div className="w-full max-w-[780px]">
          <Image
            src="/illustrations/partner.png"
            alt="Partnerships"
            width={1400}
            height={1000}
            className="block h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </Reveal>

    {/* Right: text */}
    <Reveal delayMs={120}>
      <div className="flex h-full items-center bg-[#f7f7f5] px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-semibold leading-[0.9] tracking-tight text-black sm:text-6xl lg:text-7xl">
            Ecosystem
            <br />
            Of
            <br />
            Specialists
            </h2>

          <p className="mt-8 text-base leading-relaxed text-black/90 sm:text-lg lg:text-[1.35rem] lg:leading-[1.45]">
            We pursue partnerships to deliver complex outcomes and accelerate
            innovation aligned with South Africa’s innovation-led development.
            We collaborate with specialist contractors, OEMs, and research
            institutions to expand delivery capacity and bring the best tools
            and expertise to each project.
          </p>
        </div>
      </div>
    </Reveal>
  </div>
</section>







      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="rounded-none border border-white/10 bg-white/[0.02] p-8 sm:p-10">
              
              <h2 className="text-6xl font-semibold   text-white sm:text-7xl lg:text-[6.5rem] xl:text-6xl mb-5">
              Need assistance? We&apos;re here to help
              <br />
             
            </h2>

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
                Core values
                
              </h2>

              <p className="mt-8 max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
                We turn values into action through disciplined execution,
                accountability, safety, craftsmanship, continuous improvement,
                and respect for people, communities, and the environment.
              </p>
            </div>
          </Reveal>

          {/* Right side */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            {values.map((value, index) => (
              <Reveal key={value.title} delayMs={index * 70}>
                <article className="border-b border-white/10 pb-5 sm:pb-6 lg:pb-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 shrink-0 text-3xl font-semibold leading-none tracking-tight text-white sm:w-12 sm:text-4xl lg:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>

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

