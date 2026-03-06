import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Cpu,
  ShieldCheck,
  BarChart3,
  Webhook,
  Workflow,
  Lock,
  MonitorCheck,
  FileText,
  Gauge,
  Database,
  ChevronRight,
  TerminalSquare,
  Layers,
  Sparkles,
  Radar,
  ArrowRight,
} from "lucide-react";

import { WavyBackground } from "@/components/ui/wavy-background";

import WhatWeDoCarousel from "@/components/technologies/WhatWeDoCarousel";


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
      <div className="mx-auto max-w-7xl">
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
          <span className="mr-1 inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            Quick links
          </span>
          {items.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-none border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Tech card: gridlines + “dashboard glow” (still blue, but unique style) */
function TechCard({
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
        "hover:shadow-[0_0_0_1px_rgba(120,190,255,.22),0_18px_60px_rgba(0,0,0,.55)]",
        pad,
        className,
      ].join(" ")}
    >
      {/* Blue glow base */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[radial-gradient(circle_at_20%_10%,rgba(0,195,255,.30),transparent_55%),radial-gradient(circle_at_90%_70%,rgba(0,82,212,.40),transparent_55%),linear-gradient(90deg,rgba(0,82,212,.25),rgba(101,199,247,.12),rgba(0,195,255,.14))]" />

      {/* Gridlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/75" />

      {/* Hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.20),transparent_55%)]" />

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
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <div className="relative aspect-[16/11] w-full">
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

function TerminalPanel() {
  return (
    <TechCard className="p-0">
      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            <TerminalSquare className="h-4 w-4 text-white/70" />
            Delivery console
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70">
            staged rollout
          </span>
        </div>
      </div>

      <div className="px-4 py-4 font-mono text-[12px] leading-relaxed">
        <div className="text-white/60">{"$"} define_scope --stakeholders --kpis</div>
        <div className="text-white/80">✓ requirements locked</div>
        <div className="text-white/60 mt-2">{"$"} ship_mvp --auth --audit-logs --dashboards</div>
        <div className="text-white/80">✓ milestone demo scheduled</div>
        <div className="text-white/60 mt-2">{"$"} harden_security --least-priv --monitoring</div>
        <div className="text-white/80">✓ incident readiness baseline</div>
        <div className="text-white/60 mt-2">{"$"} integrate_systems --webhooks --workflows</div>
        <div className="text-white/80">✓ automation map approved</div>
      </div>
    </TechCard>
  );
}

export default function TechnologiesServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Positioning", "#positioning"],
    ["Vision", "#vision"],
    ["What we do", "#what-we-do"],
    ["Compliance", "#compliance"],
    ["What to expect", "#expect"],
  ];

  // “bento” cards (unique layout vs other pages)
  const whatWeDo = [
    {
      icon: <Cpu className="h-4 w-4" />,
      title: "Web Apps",
      desc: "Operational tools that match how teams actually work.",
      span: "lg:col-span-2",
      image: "/stock/pic-33.jpg",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Dashboards, reporting, & analytics",
      desc: "Make performance visible with clean metrics and KPIs.",
      span: "lg:col-span-1",
      image: "/stock/pic-34.jpg",

    },
    {
      icon: <Workflow className="h-4 w-4" />,
      title: "Custom Workflows",
      desc: "Connect systems, remove manual steps, speed operations.",
      span: "lg:col-span-1",
      image: "/stock/pic-37.jpg",

    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Cybersecurity",
      desc: "Secure baselines, detection, and response-minded upgrades.",
      span: "lg:col-span-2",
      image: "/stock/pic-35.jpg",

    },
    {
      icon: <MonitorCheck className="h-4 w-4" />,
      title: "24/7 surveillance system",
      desc: "CCTV setup, monitoring readiness, and operational reliability.",
      span: "lg:col-span-3",
      image: "/stock/pic-36.jpg",

    },
  ];


  const GLASS_TILES = Array.from({ length: 20 }, (_, i) => {
  const slice = 100 / 20;

  return {
    left: `calc(${i * slice}% - clamp(10px, 1vw, 18px))`,
    width: `calc(${slice}% + clamp(20px, 2vw, 38px))`,
    opacity: [0.14, 0.22, 0.18, 0.26][i % 4],
    blur: [12, 16, 20, 14][i % 4],
    skew: [-6, -3, -5, -2][i % 4],
    glow: [0.08, 0.14, 0.1, 0.16][i % 4],
  };
});

  const expectations = [
    {
      icon: <FileText className="h-4 w-4" />,
      title: "Clear requirements",
      bullets: ["Scope defined early", "Assumptions documented", "Stakeholders aligned"],
    },
    {
      icon: <Gauge className="h-4 w-4" />,
      title: "Staged delivery",
      bullets: ["Milestones and demos", "Iterative rollouts", "Risk controlled"],
    },
    {
      icon: <Database className="h-4 w-4" />,
      title: "Measurable performance",
      bullets: ["Dashboards where it matters", "Logging and traceability", "Operational KPIs"],
    },
    {
      icon: <Webhook className="h-4 w-4" />,
      title: "Documentation that survives turnover",
      bullets: ["Runbooks + handover notes", "Access + architecture docs", "Change history"],
    },
  ];

  return (
    <main className="site-bg">
      {/* HERO (dashboard / product-studio vibe) */}
   
<section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Wavy canvas background */}
      <div className="absolute inset-0 -z-20">
        <WavyBackground
          containerClassName="absolute inset-0 h-full w-full !min-h-0 !rounded-none bg-[#020617]"
          className="h-full w-full"
          backgroundFill="rgb(2 6 23)"
          colors={["#0f172a", "#172554", "#1d4ed8", "#2563eb", "#38bdf8"]}
          waveWidth={52}
          blur={12}
          speed="slow"
          waveOpacity={0.18}
        >
          <div className="h-full w-full" />
        </WavyBackground>
      </div>

      {/* Glass / fractal overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.28))]" />

        {/* Subtle ribs */}
        

        {/* 20 wider blurred glass tiles */}
        

        {/* Fine grain */}
        
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              We're Here
              <br />
              To Make Your
              <br />
              Tech Experience Easier
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              We build the operational systems behind modern businesses. Your team gets measurable workflows,
              clearer ownership, and safer delivery without constant developer bottlenecks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild className="h-12 rounded-none bg-[#2563eb] px-8 text-white hover:opacity-90">
                <Link href="/#contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 h-px w-full bg-white/10" />
      </div>
    </section>
      {/* STICKY QUICK LINKS */}

      {/* POSITIONING + VISION */}


{/* POSITIONING (big headline left, paragraph right) */}
<section id="positioning" className="scroll-mt-32 py-14 sm:py-18">
  <div className="mx-auto max-w-6xl px-4">
    

    <div className="mt-10">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: big statement */}
          <div className="lg:col-span-7">
            <h3 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
              Positioning
            </h3>

            <div className="mt-10 h-px w-28 bg-white/10" />
          </div>

          {/* Right: paragraph (no card, like the reference) */}
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              We build the operational systems behind modern businesses: software, data,
              automation, and secure digital infrastructure. The goal is clarity, control,
              and performance across your workflows.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
</section>

{/* VISION (left text block + right image card) */}
<section id="vision" className="scroll-mt-32 py-14 sm:py-18">
  <div className="mx-auto max-w-6xl px-4">
    

    <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
      {/* Left: vision text (matches the "Turn design vision..." style) */}
      <Reveal className="lg:col-span-6">
        <div className="h-full overflow-hidden">
          <div className="p-8 sm:p-10">
            <h3 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
              Vision
            </h3>
            

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              To make operations measurable, secure, and scalable. We help teams build reliable
              foundations with automation, data discipline, and security-first engineering so growth
              doesn’t break execution.
            </p>

            <div className="mt-10 h-px w-28 bg-white/10" />
          </div>
        </div>
      </Reveal>

      {/* Right: image card */}
      <Reveal delayMs={140} className="lg:col-span-6">
        <div className="h-full overflow-hidden border border-white/10 bg-white/[0.02]">
          <div className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
            <Image
              src="/stock/pic-4.jpg"
              alt="Technology overview image"
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

  <div className="mx-auto max-w-6xl px-4 mt-14">
    <Separator className="bg-white/10" />
  </div>
</section>

      {/* WHAT WE DO (bento grid, unique) */}
      <Section
        id="what-we-do"
        
      >

        <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Practical technology services
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base mb-5">
          From internal systems to security and monitoring, built for real operations.
        </p>
      </div>
        <WhatWeDoCarousel
          items={whatWeDo}
          className="rounded-3xl p-4 sm:p-6"
        />
      </Section>

      {/* COMPLIANCE */}


<section id="compliance" className="scroll-mt-32 py-16 sm:py-20">
  <div className="mx-auto max-w-6xl px-4">
    <Reveal>
      {/* Centered heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Designed for South Africa’s privacy{" "}
          <span className="text-[#3b82f6]">and cybercrime</span> environment
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
          POPIA-aligned data handling and incident readiness are treated as part of delivery, not an
          afterthought.
        </p>
      </div>

      {/* Large image */}
      <div className="mt-10 overflow-hidden rounded-2xl  ">
        <div className="relative h-[260px] w-full sm:h-[360px] lg:h-[560px]">
          <Image
            src="/illustrations/tech-4.png"
            alt="Security and compliance"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1100px, 100vw"
            priority
          />
        </div>
      </div>

      {/* Bottom explanation row */}
      <div className="mt-10 border-t border-white/10 pt-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Column 1 */}
          <div>
            <div className="text-lg font-semibold text-white">Automate the busywork</div>
            <p className="mt-3 text-md leading-relaxed text-white/90">
              Data handling stays consistent through reusable patterns, sensible defaults, and clear
              operational workflows. Less manual overhead, more reliability.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <div className="inline-flex items-center gap-2">
              
              <div className="text-lg font-semibold text-white">
                Generate content, sections, and components
              </div>
            </div>

            <p className="mt-3 text-md leading-relaxed text-white/90">
              Build repeatable structures for dashboards, admin screens, and internal tools while keeping
              your security posture intact through access controls and audit-friendly design.
            </p>
          </div>

          {/* Column 3 */}
          <div>
            <div className="text-lg font-semibold text-white">Extend your security workflow</div>
            <p className="mt-3 text-md leading-relaxed text-white/90">
              Logging, monitoring, and incident readiness are part of the system, not add-ons. You get
              better traceability, faster response, and fewer blind spots when things go wrong.
            </p>
          </div>
        </div>

        {/* optional: subtle tags row (not bullets) */}
        
      </div>
    </Reveal>
  </div>
</section>

      {/* EXPECTATIONS (pipeline feel) */}
      

<section id="expect" className="scroll-mt-32 py-16 sm:py-20">
  <div className="mx-auto max-w-6xl px-4">
    <Reveal>
      {/* Top row */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left: big heading */}
        <div className="lg:col-span-8">
          

          <h2 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Clear delivery.
            <br />
            Measurable outcomes.
          </h2>

          
        </div>

        {/* Right: CTA */}
        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <Button
            asChild
            className="h-12 rounded-none bg-[#2563eb] px-8 text-white hover:opacity-90 transition"
          >
            <Link href="/#contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      {/* Bottom row: 3 columns like the screenshot */}
      <div className="mt-14 grid gap-10 lg:grid-cols-3">
        {expectations.slice(0, 3).map((e) => (
          <div key={e.title}>
            {/* Icon in outlined circle */}
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
              {e.icon}
            </div>

            <div className="text-xl font-semibold text-white">{e.title}</div>

            {/* NO bullets: turn bullets into a single paragraph */}
            <p className="mt-3 text-md leading-relaxed text-white/90">
              {Array.isArray(e.bullets) ? e.bullets.join(" ") : e.desc}
            </p>
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
            <TechCard size="lg">
              

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                What&apos;s Next?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share the current workflow, systems involved, your goals, and any compliance needs.
                We’ll propose a staged delivery plan with clear milestones and measurable outcomes.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/#contact">Contact Us</Link>
                </Button>
                
              </div>
            </TechCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
