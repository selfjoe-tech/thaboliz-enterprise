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

function FieldPath() {
  const steps = [
    {
      icon: <Sprout className="h-4 w-4" />,
      title: "Production",
      desc: "Organic-aligned growing practices and inputs control.",
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Records",
      desc: "Farm logs, traceability, and audit-friendly documentation.",
    },
    {
      icon: <Package className="h-4 w-4" />,
      title: "Processing",
      desc: "Grading, packaging, and basic value-add readiness.",
    },
    {
      icon: <Store className="h-4 w-4" />,
      title: "Market",
      desc: "Retail, food service, and community supply pathways.",
    },
    {
      icon: <Network className="h-4 w-4" />,
      title: "Distribution",
      desc: "Farm-to-market pilots with Logistics + Tech.",
    },
  ];

  return (
    <div className="grid gap-4">
      {/* Desktop: 5 columns. Mobile: horizontal snap row */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
        {steps.map((s) => (
          <FarmCard key={s.title} className="p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                {s.icon}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{s.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">
                  {s.desc}
                </div>
              </div>
            </div>
          </FarmCard>
        ))}
      </div>

      <div className="lg:hidden -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="flex gap-3 snap-x snap-mandatory">
          {steps.map((s) => (
            <div key={s.title} className="min-w-[78%] snap-start sm:min-w-[58%]">
              <FarmCard className="p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{s.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/70">
                      {s.desc}
                    </div>
                  </div>
                </div>
              </FarmCard>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/55">
        Tip: On mobile, swipe the cards sideways to follow the pathway.
      </p>
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
      icon: <Sprout className="h-4 w-4" />,
      title: "Organic-aligned crop production",
      desc: "Traceability and integrity when certification/verification is pursued.",
    },
    {
      icon: <Recycle className="h-4 w-4" />,
      title: "Regenerative practices",
      desc: "Soil rehabilitation, composting, crop rotation, and resilience building.",
    },
    {
      icon: <Package className="h-4 w-4" />,
      title: "Agro-processing pathways",
      desc: "Packaging, grading, and basic value-add to improve market readiness.",
    },
    {
      icon: <Store className="h-4 w-4" />,
      title: "Market linkages",
      desc: "Retail, food service, and community supply partnerships for stable demand.",
    },
  ];

  const ventures = [
    {
      icon: <Network className="h-4 w-4" />,
      title: "Traceable farm-to-market pilots",
      desc: "Integrated pilots with Logistics + Tech for visibility and quality control.",
      badge: "Traceability",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Community grower networks",
      desc: "Shared compliance support and market access to strengthen small growers.",
      badge: "Community",
    },
    {
      icon: <Leaf className="h-4 w-4" />,
      title: "High-value crops per region",
      desc: "Crop selection by climate, buyer demand, and feasibility.",
      badge: "Crop strategy",
    },
    {
      icon: <Warehouse className="h-4 w-4" />,
      title: "Greenhouse development",
      desc: "Controlled environments for consistency, season extension, and quality.",
      badge: "Greenhouses",
    },
    {
      icon: <Globe2 className="h-4 w-4" />,
      title: "Non-indigenous crops (where feasible)",
      desc: "Strategic selection to improve supply availability (region-by-region).",
      badge: "Supply expansion",
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
      <Section
        eyebrow="Overview"
        title="Positioning and vision"
        subtitle="Resilient, organic-aligned, climate-smart farming that restores land while producing quality food."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6">
            <Reveal>
              <FarmCard className="h-full">
                <div id="positioning" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Positioning
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  We pursue sustainable food production with traceability, soil health, and responsible
                  water stewardship.
                </p>
                <ChipRow items={["Traceability", "Soil health", "Regenerative", "Water stewardship"]} />
              </FarmCard>
            </Reveal>

            <Reveal delayMs={120}>
              <FarmCard className="h-full">
                <div id="vision" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Vision
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  To develop resilient, organic, climate-smart farming operations that produce
                  high-quality food while restoring land.
                </p>
              </FarmCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Farms overview image" src="/illustrations/farm-1.jpg" />
          </Reveal>
        </div>
      </Section>

      {/* PATHWAY (unique UI) */}
      <Section
        eyebrow="Field-to-market"
        title="A practical pathway from production to buyers"
        subtitle="We structure operations so quality, traceability, and market readiness stay visible."
      >
        <Reveal>
          <FieldPath />
        </Reveal>
      </Section>

      {/* WHAT WE DO (bento-ish but calm) */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Farm operations and pathways"
        subtitle="Production, regenerative practices, processing readiness, and market linkage."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {whatWeDo.map((x, i) => (
            <Reveal key={x.title} delayMs={i * 70}>
              <FarmCard className="h-full p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    {x.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/70">{x.desc}</div>
                  </div>
                </div>
              </FarmCard>
            </Reveal>
          ))}
        </div>
      </Section>

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
      <Section
        id="water"
        eyebrow="Water stewardship"
        title="Responsible water planning"
        subtitle="Where authorisation is required, planning aligns with DWS processes and the applicable legal framework."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <FarmCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                  <Droplets className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">
                    DWS-aligned authorisation awareness
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Where farming operations require authorisation, we align planning with the DWS
                    water use authorisation process and the applicable legal framework. The goal is
                    practical stewardship: efficient irrigation, risk reduction, and compliance readiness.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Water use planning", "Efficient irrigation", "Records", "Risk controls"].map((x) => (
                      <Badge
                        key={x}
                        variant="outline"
                        className="rounded-full border-white/15 text-white/80"
                      >
                        {x}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
                      <MapPinned className="h-4 w-4 text-white/60" />
                      Stewardship focus
                    </div>
                    <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                      <li>• Reduce irrigation waste through scheduling and monitoring</li>
                      <li>• Keep records ready for operations and compliance</li>
                      <li>• Design water practices for resilience and predictability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </FarmCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Water stewardship image" src="/illustrations/farm-4.png" />
          </Reveal>
        </div>
      </Section>

      {/* VENTURES (unique: scroll-snap on mobile, grid on desktop) */}
      <Section
        id="ventures"
        eyebrow="Ventures we’re pursuing"
        title="Growth pathways"
        subtitle="Traceability pilots, community networks, and region-specific crop strategy, supported by infrastructure."
      >
        <div className="hidden lg:grid gap-4 lg:grid-cols-3">
          {ventures.map((v, i) => (
            <Reveal key={v.title} delayMs={i * 60}>
              <FarmCard className="h-full">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    {v.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{v.title}</div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">{v.desc}</p>
                    <div className="mt-4">
                      <Badge variant="outline" className="rounded-full border-white/15 text-white/80">
                        {v.badge}
                      </Badge>
                    </div>
                  </div>
                </div>
              </FarmCard>
            </Reveal>
          ))}
        </div>

        <div className="lg:hidden -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          <div className="flex gap-3 snap-x snap-mandatory">
            {ventures.map((v, i) => (
              <div key={v.title} className="min-w-[86%] snap-start sm:min-w-[62%]">
                <Reveal delayMs={i * 60}>
                  <FarmCard className="h-full">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                        {v.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white">{v.title}</div>
                        <p className="mt-2 text-xs leading-relaxed text-white/70">{v.desc}</p>
                        <div className="mt-4">
                          <Badge
                            variant="outline"
                            className="rounded-full border-white/15 text-white/80"
                          >
                            {v.badge}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </FarmCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>

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
