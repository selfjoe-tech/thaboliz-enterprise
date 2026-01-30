import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  HardHat,
  Building2,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Hammer,
  Droplets,
  Warehouse,
  GraduationCap,
  Hospital,
  ChevronRight,
} from "lucide-react";

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
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.03]",
        "transition-transform duration-200 hover:-translate-y-[2px]",
        "hover:shadow-[0_0_0_1px_rgba(120,190,255,.22),0_18px_60px_rgba(0,0,0,.55)]",
        className,
      ].join(" ")}
    >
      {/* subtle blue wash */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[linear-gradient(90deg,rgba(16,86,160,.35)_0%,rgba(20,120,200,.22)_55%,rgba(0,82,212,.28)_100%)]" />
      {/* grid texture (very subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />

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

      {/* readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/75" />

      {/* hover sheen */}
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
      </div>
    </div>
  );
}

export default function ConstructionServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Overview", "#overview"],
    ["What we do", "#what-we-do"],
    ["Sectors", "#sectors"],
    ["Delivery", "#delivery"],
    ["Compliance", "#compliance"],
    ["Ventures", "#ventures"],
  ];

  const whatWeDo = [
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "Civil & building works",
      desc: "New builds, upgrades, and enabling works.",
      img: "/illustrations/gradient-1.avif",
    },
    {
      icon: <Hammer className="h-4 w-4" />,
      title: "Earthworks & concrete",
      desc: "Site establishment, drainage, and structural works.",
      img: "/illustrations/gradient-2.avif",
    },
    {
      icon: <Wrench className="h-4 w-4" />,
      title: "Fit-out & refurbishment",
      desc: "Interior fit-outs, remedial works, and upgrades.",
      img: "/illustrations/gradient-3.avif",
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Maintenance programs",
      desc: "Planned maintenance for facilities and infrastructure.",
      img: "/illustrations/gradient-4.avif",
    },
  ];

  const sectors = [
    { icon: <Building2 className="h-4 w-4" />, label: "Public infrastructure" },
    { icon: <Warehouse className="h-4 w-4" />, label: "Industrial facilities" },
    { icon: <CheckCircle2 className="h-4 w-4" />, label: "Commercial builds" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Community developments" },
    { icon: <HardHat className="h-4 w-4" />, label: "Energy & logistics enabling works" },
  ];

  const delivery = [
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Feasibility and constructability",
      bullets: [
        "Feasibility, design coordination, constructability input",
        "Scope clarity and measurable outcomes",
      ],
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Project controls",
      bullets: [
        "Project management, cost control, procurement",
        "Contractor coordination and milestone tracking",
      ],
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Safety-led execution",
      bullets: [
        "Structured health & safety file approach aligned to SA requirements",
        "Quality checks throughout delivery",
      ],
    },
  ];

  const ventures = [
    {
      title: "Rapid-turnaround refurbishment unit",
      desc: "Fast upgrades for schools, clinics, and offices with disciplined scope and quality checks.",
      badge: "Refurb & upgrades",
      icon: <Hospital className="h-4 w-4" />,
    },
    {
      title: "Industrial parks and warehousing shells",
      desc: "Small-to-mid shells and enabling infrastructure for logistics and light industrial growth.",
      badge: "Industrial & logistics",
      icon: <Warehouse className="h-4 w-4" />,
    },
    {
      title: "Water resilience projects",
      desc: "Leakage reduction, pump station upgrades, and borehole infrastructure (with required authorisations where applicable).",
      badge: "Water resilience",
      icon: <Droplets className="h-4 w-4" />,
    },
  ];

  return (
    <main className="site-bg">
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 sm:pt-18">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-white/35" />
            <span className="text-white/80">Construction</span>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
                  <HardHat className="h-4 w-4 text-white/80" />
                  Construction services
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  End-to-end delivery with{" "}
                  <span className="text-brand-gradient">disciplined controls</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We deliver construction with scope clarity, schedule integrity, quality assurance,
                  and safety-led execution, built for long-term durability and cost-effective operation.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Request a scope call</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none border-white/15 bg-transparent text-white hover:bg-white/5"
                  >
                    <Link href="#what-we-do">See services</Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delayMs={120} className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  { value: "Scope clarity", label: "Clear deliverables" },
                  { value: "Schedule integrity", label: "Milestone discipline" },
                  { value: "Quality assurance", label: "Built to last" },
                  { value: "Safety-led", label: "Controls first" },
                ].map((s) => (
                  <ConstructionCard key={s.label} className="p-4">
                    <div className="text-sm font-semibold text-white">{s.value}</div>
                    <div className="mt-1 text-xs text-white/70">{s.label}</div>
                  </ConstructionCard>
                ))}
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <div className="grid gap-4">
                <MediaSlot
                  label="Construction hero image"
                  src="/illustrations/construction-1.png"
                />
                <ConstructionCard className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                    Typical outcomes
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      Disciplined scope and cost control
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      Safer sites and cleaner handovers
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      Durable builds, reduced rework
                    </div>
                  </div>
                </ConstructionCard>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* STICKY QUICK LINKS (mobile + desktop safe) */}
      <section className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Reveal className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Quick links
            </span>

            {quickLinks.map(([label, href]) => (
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

      {/* OVERVIEW */}
      <Section
        id="overview"
        eyebrow="Overview"
        title="Positioning and vision"
        subtitle="Disciplined delivery, safe execution, and build quality that stands up over time."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6">
            <Reveal>
              <ConstructionCard className="p-6">
                <div id="positioning" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Positioning
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  We deliver end-to-end construction services with disciplined controls: scope clarity,
                  schedule integrity, quality assurance, and safety-led execution.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Scope clarity", "Schedule integrity", "Quality assurance", "Safety-led"].map((x) => (
                    <Badge
                      key={x}
                      variant="outline"
                      className="rounded-none border-white/15 text-white/80"
                    >
                      {x}
                    </Badge>
                  ))}
                </div>
              </ConstructionCard>
            </Reveal>

            <Reveal delayMs={120}>
              <ConstructionCard className="p-6">
                <div id="vision" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Vision
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  To build infrastructure that lasts, is safe to operate, and is cost-effective to maintain.
                </p>
              </ConstructionCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Positioning image" src="/illustrations/construction-2.png" />
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE DO (no overflow; mobile-first grid) */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Core construction services"
        subtitle="Civil and building works, upgrades, refurbishments, and maintenance programs."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((x, i) => (
            <Reveal key={x.title} delayMs={i * 60}>
              <ConstructionCard className="h-full p-5" bgSrc={x.img} bgAlt={x.title} bgOpacity={0.18}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                    {x.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/70">{x.desc}</div>
                  </div>
                </div>
              </ConstructionCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTORS */}
      <Section
        id="sectors"
        eyebrow="Sectors we serve"
        title="Where we deliver"
        subtitle="Public infrastructure, industrial facilities, commercial builds, community developments, and enabling works."
      >
        <Reveal>
          <ConstructionCard className="p-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                    {s.icon}
                  </span>
                  <div className="text-sm text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          </ConstructionCard>
        </Reveal>
      </Section>

      {/* DELIVERY (step cards - stable everywhere) */}
      <Section
        id="delivery"
        eyebrow="How we deliver"
        title="Controls-led execution"
        subtitle="From feasibility to handover, we keep delivery visible through planning, governance, and safety practices."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {delivery.map((d, i) => (
            <Reveal key={d.title} delayMs={i * 80}>
              <ConstructionCard className="h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                      {d.icon}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{d.title}</div>
                      <div className="mt-1 text-xs text-white/60">Step {i + 1}</div>
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-white/75">
                  {d.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </ConstructionCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* COMPLIANCE */}
      <Section
        id="compliance"
        eyebrow="Assurance and compliance"
        title="Capability, track record, and aligned standards"
        subtitle="We align delivery practices to best-practice requirements appropriate to client and project context."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <ConstructionCard className="h-full p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">Public-sector alignment</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Where public-sector work applies, we align to the CIDB contractor grading environment and
                    best-practice requirements for contractor capability and track record.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Quality checks", "Documentation", "Milestones", "HSE file approach"].map((x) => (
                      <Badge
                        key={x}
                        variant="outline"
                        className="rounded-none border-white/15 text-white/80"
                      >
                        {x}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ConstructionCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Compliance image" src="/illustrations/construction-3.png" />
          </Reveal>
        </div>
      </Section>

      {/* VENTURES */}
      <Section
        id="ventures"
        eyebrow="Ventures we’re pursuing"
        title="Focus areas for growth"
        subtitle="Practical projects that match market demand and improve infrastructure outcomes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {ventures.map((v, i) => (
            <Reveal key={v.title} delayMs={i * 80}>
              <ConstructionCard className="h-full p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/90">
                    {v.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{v.title}</div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">{v.desc}</p>
                    <div className="mt-4">
                      <Badge variant="outline" className="rounded-none border-white/15 text-white/80">
                        {v.badge}
                      </Badge>
                    </div>
                  </div>
                </div>
              </ConstructionCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <ConstructionCard className="p-8 sm:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Next step
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tell us what you’re building and we’ll scope it properly.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share the site location, required outcomes, constraints, and target timeline. We’ll respond
                with a structured approach to scope, schedule, and delivery controls.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/#contact">Contact Thaboliz</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-white/15 bg-transparent text-white hover:bg-white/5"
                >
                  <Link href="/services">Browse services</Link>
                </Button>
              </div>
            </ConstructionCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
