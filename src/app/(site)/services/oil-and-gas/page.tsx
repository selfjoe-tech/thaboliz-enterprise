"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight, BadgeCheck, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";


import { OIL_GAS, OIL_GAS_SUBPAGES } from "./_content";
import { Button } from "@/components/ui/button";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const NAVY = "#0F1E2E";
const ORANGE = "#E84B1A";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
};

type HoverItem = {
  title: string;
  desc: string;
  kicker?: string;
  img?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Section({ id, title, subtitle, children, dark = false }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-32 py-14 sm:py-18">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className={cn("text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-[#111111]") }>
            {title}
          </h2>
          {subtitle ? (
            <p className={cn("mt-4 text-sm leading-relaxed sm:text-[15px]", dark ? "text-white/70" : "text-[#4d4d4d]") }>
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function CardShell({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-[2px]",
        dark ? "border border-white/10 bg-white/[0.03]" : "border border-black/10 bg-white",
        className
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0", dark ? "bg-[linear-gradient(90deg,rgba(0,82,212,.32)_0%,rgba(101,199,247,.16)_55%,rgba(0,195,255,.12)_100%)]" : "bg-transparent")} />
      <div className={cn("pointer-events-none absolute inset-0", dark ? "opacity-[0.16] bg-[radial-gradient(circle,rgba(255,255,255,.22)_1px,transparent_1px)] bg-[size:18px_18px]" : "")} />
      <div className={cn("pointer-events-none absolute inset-0", dark ? "bg-gradient-to-b from-black/15 via-black/35 to-black/70" : "bg-transparent")} />
      <div className="relative">{children}</div>
    </div>
  );
}

function MediaSlot({
  src,
  label,
  aspect = "aspect-[16/11]",
}: {
  src?: string;
  label: string;
  aspect?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]", aspect)}>
      {src ? (
        <Image src={src} alt={label} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="text-center">
            <div className="text-sm font-semibold text-white/80">{label}</div>
            <div className="mt-1 text-xs text-white/50">Image slot</div>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
    </div>
  );
}

function HoverCards({ items }: { items: HoverItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const open = canHover ? openIndex === index : index === 0;
        return (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            onMouseEnter={canHover ? () => setOpenIndex(index) : undefined}
            onMouseLeave={canHover ? () => setOpenIndex(0) : undefined}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[linear-gradient(90deg,rgba(0,82,212,.36)_0%,rgba(101,199,247,.18)_55%,rgba(0,195,255,.12)_100%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle,rgba(255,255,255,.22)_1px,transparent_1px)] bg-[size:18px_18px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/80" />

            <div className="relative h-[420px]">
              <Image
                src={item.img || "/oil/3.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={index === 0}
              />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {item.kicker ? (
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                        {item.kicker}
                      </div>
                    ) : null}
                    <div className="mt-2 text-2xl font-semibold leading-tight text-white">{item.title}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? 0 : index)}
                    aria-label={open ? "Collapse" : "Expand"}
                    aria-expanded={open}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white transition hover:bg-white/15"
                  >
                    {open ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                  </button>
                </div>

                <div className={cn("overflow-hidden transition-all duration-200", open ? "mt-4 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0")}>
                  <p className="text-sm leading-relaxed text-white/75">{item.desc}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function OilAndGasPage() {
  const nav = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Compliance", href: "#compliance" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <main className={`${jakarta.variable} bg-[#06111d] text-white`} style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif" }}>
     

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/oil/1.jpg" alt="Oil and gas facility" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,17,29,.92)_0%,rgba(6,17,29,.62)_52%,rgba(6,17,29,.28)_100%)]" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-8xl">
              {OIL_GAS.heroTitle}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">
              {OIL_GAS.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
              asChild
              className="h-12 rounded-none bg-blue-500 px-8 text-white hover:text-black hover:bg-white/90"
            >
              <Link href="/#contact">Contact Us</Link>
            </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / TRUST */}
      <Section
  id="about"
  dark
>
  <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.15fr)] lg:gap-24">
    
    {/* LEFT: Sticky block */}
    <Reveal>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="max-w-[10ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[4.75rem]">
          Mission & Vision
        </h2>

        

        {/* Image under text (your requirement) */}
        <div className="mt-10">
          <MediaSlot
            src="/oil/2.jpg"
            label="Sandton energy hub"
            aspect="aspect-[4/5]"
          />
        </div>
      </div>
    </Reveal>

    {/* RIGHT: Mission items */}
    <div className="space-y-6 sm:space-y-7">
      {OIL_GAS.mission.map((item, index) => (
        <Reveal key={item.label} delayMs={index * 70}>
          <article className="border-b border-white/10 pb-6">
            <h3 className="text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
              {item.label}
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              {item.text}
            </p>

            {/* Optional: subtle tag styling (keeps it premium) */}
            {/* <div className="mt-4 text-xs uppercase tracking-wider text-white/40">
              Core principle
            </div> */}
          </article>
        </Reveal>
      ))}

      {/* Vision as final block */}
      <Reveal delayMs={OIL_GAS.mission.length * 70}>
        <article className="pt-4">
          <h3 className="text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
            Vision
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            {OIL_GAS.vision}
          </p>
        </article>
      </Reveal>
    </div>
  </div>
</Section>

      {/* SERVICES / TRADING CATEGORIES */}
      <Section
      id="services"
      title="Trading categories"
      dark={true}
      
      >
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {OIL_GAS_SUBPAGES.slice(0, 4).map((x, i) => {
      const gradients = [
        "bg-[linear-gradient(135deg,rgba(37,99,235,.28),rgba(0,0,0,.92))]",
        "bg-[linear-gradient(135deg,rgba(245,158,11,.22),rgba(0,0,0,.92))]",
        "bg-[linear-gradient(135deg,rgba(34,197,94,.18),rgba(0,0,0,.92))]",
        "bg-[linear-gradient(135deg,rgba(168,85,247,.20),rgba(0,0,0,.92))]",
      ];

      const textBg = gradients[i % gradients.length];
      const imageSrc = ["/oil/3.jpg", "/oil/4.jpg", "/oil/5.jpg", "/oil/10.jpg"][i];

      return (
        <Reveal key={x.slug} delayMs={i * 60}>
          <div
            className={[
              "group overflow-hidden border border-white/10 bg-black",
              "transition-transform duration-200 hover:-translate-y-[2px]",
              "hover:shadow-[0_0_0_1px_rgba(255,255,255,.12),0_22px_70px_rgba(0,0,0,.55)]",
              "min-h-[360px] sm:min-h-[420px]",
              "flex flex-col",
            ].join(" ")}
          >
            <div className={["relative p-6", textBg].join(" ")}>
              <div className="pointer-events-none absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />

              <div className="relative flex items-start gap-3">
                

                <div className="min-w-0">
                  <div className="text-lg font-semibold leading-snug text-white">
                    {x.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {x.summary}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-black">
              <div className="relative min-h-[170px] sm:min-h-[210px]">
                <Image
                  src={imageSrc}
                  alt={x.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  priority={i < 2}
                />
              </div>
            </div>
          </div>
        </Reveal>
      );
    })}
  </div>
</Section>

      {/* COMPLIANCE */}
      <Section
        id="compliance"
        dark
        
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.15fr)] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="max-w-[10ch] text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[4.75rem]">
              Compliance
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-white/72 sm:text-lg">
              {OIL_GAS.compliance[0]?.text}
            </p>

            <div className="mt-10">
              <MediaSlot label="Compliance image" src="/oil/8.jpg" aspect="aspect-[4/5]" />
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            {OIL_GAS.compliance.map((item, index) => (
              <article key={item.title} className="border-b border-white/10 pb-5 sm:pb-6 lg:pb-7">
                <div className="flex items-start gap-4">
                  <div className="min-w-0">
                    <h3 className="text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                      {item.text}
                    </p>

                    
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* SUSTAINABILITY */}
      <Section
  id="sustainability"
  dark
  
>
  <Reveal>
    <div className="text-center">
      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        A practical ESG posture for real-world energy
      </h2>

      
    </div>

    <div className="mt-10 overflow-hidden rounded-2xl">
      <div className="relative h-[260px] w-full sm:h-[360px] lg:h-[560px]">
        <Image
          src="/oil/9.jpg"
          alt="Sustainable energy and operations by Thabolize Oil & Gas"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 1100px, 100vw"
          priority
        />
      </div>
    </div>

    <div className="mt-10 border-t border-white/10 pt-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div>
          <div className="text-lg font-semibold text-white">
            {OIL_GAS.esg[0].title}
          </div>
          <p className="mt-3 text-md leading-relaxed text-white/90">
            {OIL_GAS.esg[0].text}
          </p>
        </div>

        <div>
          <div className="text-lg font-semibold text-white">
            {OIL_GAS.esg[1].title}
          </div>
          <p className="mt-3 text-md leading-relaxed text-white/90">
            {OIL_GAS.esg[1].text}
          </p>
        </div>

        <div>
          <div className="text-lg font-semibold text-white">
            {OIL_GAS.esg[2].title}
          </div>
          <p className="mt-3 text-md leading-relaxed text-white/90">
            {OIL_GAS.esg[2].text}
          </p>
        </div>
      </div>
    </div>
  </Reveal>
</Section>

      {/* WHY PARTNER */}
     <section id="why-partner" className="scroll-mt-32 py-16 sm:py-20">
  <div className="mx-auto max-w-6xl px-4">
    <Reveal>
      {/* Top row */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left: big heading */}
        <div className="lg:col-span-8">
          <h2 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Why partner
            <br />
            with Us.
          </h2>
        </div>

        {/* Right: CTA */}
        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <Button
              asChild
              className="h-12 rounded-none bg-blue-500 px-8 text-white hover:text-black hover:bg-white/90"
            >
              <Link href="/#contact">Contact Us</Link>
            </Button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-14 grid gap-10 lg:grid-cols-3">
        {OIL_GAS.whyPartner.slice(0, 3).map((item) => (
          <div key={item.title}>
            {/* Icon circle */}
            

            <div className="text-xl font-semibold text-white">
              {item.title}
            </div>

            <p className="mt-3 text-md leading-relaxed text-white/90">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  </div>
</section>

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CardShell dark>
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready?</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Share your requirements, volumes, or project scope. The contact block stays lightweight and consistent with the reference structure.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="h-12 rounded-none bg-blue-500 px-8 text-white hover:text-black hover:bg-white/90"
                  >
                    <Link href="/#contact">Contact Us</Link>
                  </Button>
                  
                </div>
              </div>

              
            </div>
          </CardShell>
        </div>
      </section>
    </main>
  );
}
