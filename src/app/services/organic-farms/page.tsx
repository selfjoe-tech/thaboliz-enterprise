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

function SoftCard({
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
        "group relative overflow-hidden rounded-none",
        "border border-white/10",
        "transition-transform duration-200 hover:-translate-y-[2px]",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,.14),0_18px_60px_rgba(0,0,0,.55)]",
        pad,
        className,
      ].join(" ")}
    >
      {/* Blue theme (you asked all cards blue) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#9cecfb_0%,#65c7f7_45%,#0052d4_100%)] opacity-[0.55]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/70" />
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
    <div className="relative min-h-[420px] overflow-hidden rounded-[50px] border border-white/10">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
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
      title: "Organic-aligned crop production (where certified/verified)",
      desc: "Produce with traceability and integrity when certification/verification is pursued.",
    },
    {
      icon: <Recycle className="h-4 w-4" />,
      title: "Regenerative practices",
      desc: "Soil rehabilitation, composting, and crop rotation to restore land health.",
    },
    {
      icon: <Package className="h-4 w-4" />,
      title: "Agro-processing pathways",
      desc: "Packaging, grading, and basic value-add to improve market readiness.",
    },
    {
      icon: <Store className="h-4 w-4" />,
      title: "Market linkages",
      desc: "Retail, food service, and community supply partnerships for consistent demand.",
    },
  ];

  const ventures = [
    {
      icon: <Network className="h-4 w-4" />,
      title: "Traceable “farm-to-market” pilots",
      desc: "Integrated supply chain pilots with Logistics + Tech for visibility and quality control.",
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
      desc: "Crop selection based on local climate, buyer demand, and operational feasibility.",
      badge: "Crop strategy",
    },
    {
      icon: <Warehouse className="h-4 w-4" />,
      title: "Greenhouse development",
      desc: "Controlled environments for consistency, season extension, and quality outcomes.",
      badge: "Greenhouses",
    },
    {
      icon: <Globe2 className="h-4 w-4" />,
      title: "Non-indigenous crops (where feasible)",
      desc: "Strategic cultivation of select non-indigenous crops for improved availability and supply.",
      badge: "Supply expansion",
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
            <span className="text-white/80">Organic Farms</span>
          </Reveal>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
                  <Leaf className="h-4 w-4 text-white/80" />
                  Organic Farms
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Sustainable food production with{" "}
                  <span className="text-brand-gradient">traceability and stewardship</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We pursue climate-smart, organic-aligned farming with soil health, responsible water
                  stewardship, and practical market pathways, focused on resilient operations and
                  high-quality food outcomes.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Discuss a farming venture</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none border-white/15 bg-transparent text-white hover:bg-white/5"
                  >
                    <Link href="/services">View all services</Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delayMs={120} className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  { value: "Traceability", label: "From field to market visibility" },
                  { value: "Soil health", label: "Regenerative land practices" },
                  { value: "Water stewardship", label: "Responsible planning and authorisations" },
                  { value: "Market pathways", label: "Demand-linked operations" },
                ].map((s) => (
                  <SoftCard key={s.label} size="sm">
                    <div className="text-sm font-semibold text-white">{s.value}</div>
                    <div className="mt-1 text-xs text-white/70">{s.label}</div>
                  </SoftCard>
                ))}
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <MediaSlot label="Organic farms hero image" src="/illustrations/farms.png" />
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* STICKY QUICK LINKS */}
      <section className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
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

      {/* POSITIONING + VISION */}
      <Section
        eyebrow="Overview"
        title="Positioning and vision"
        subtitle="Resilient, organic-aligned, climate-smart farming that restores land while producing quality food."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="grid gap-6">
            <Reveal>
              <SoftCard className="h-full">
                <div id="positioning" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Positioning
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  We pursue sustainable food production with traceability, soil health, and responsible
                  water stewardship.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Traceability", "Soil health", "Regenerative", "Water stewardship"].map((x) => (
                    <Badge
                      key={x}
                      variant="outline"
                      className="rounded-none border-white/15 text-white/80"
                    >
                      {x}
                    </Badge>
                  ))}
                </div>
              </SoftCard>
            </Reveal>

            <Reveal delayMs={120}>
              <SoftCard className="h-full">
                <div id="vision" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Vision
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  To develop resilient, organic, climate-smart farming operations that produce
                  high-quality food while restoring land.
                </p>
              </SoftCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Farms overview image" src="/illustrations/industry.png" />
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Farm operations and pathways"
        subtitle="Production, regenerative practices, processing readiness, and market linkage."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {whatWeDo.map((x, i) => (
            <Reveal key={x.title} delayMs={i * 70}>
              <SoftCard className="h-full p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
                    {x.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/70">{x.desc}</div>
                  </div>
                </div>
              </SoftCard>
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
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <SoftCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Certification-ready mindset
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    South Africa’s organic space often uses sector standards and certification schemes,
                    such as SAOSO’s standard for organic production and processing (where certification
                    is pursued). We structure operations around traceability, documented practices, and
                    audit-friendly record keeping.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Traceability records", "Inputs control", "Farm logs", "Processing hygiene"].map(
                      (x) => (
                        <Badge
                          key={x}
                          variant="outline"
                          className="rounded-none border-white/15 text-white/80"
                        >
                          {x}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            </SoftCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Standards image" src="/illustrations/working.png" />
          </Reveal>
        </div>
      </Section>

      {/* WATER STEWARDSHIP */}
      <Section
        id="water"
        eyebrow="Water stewardship"
        title="Responsible water planning"
        subtitle="Where authorisation is required, planning aligns with DWS processes and the applicable legal framework."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <SoftCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
                  <Droplets className="h-4 w-4" />
                </span>
                <div>
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
                        className="rounded-none border-white/15 text-white/80"
                      >
                        {x}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SoftCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Water stewardship image" src="/illustrations/office.png" />
          </Reveal>
        </div>
      </Section>

      {/* VENTURES */}
      <Section
        id="ventures"
        eyebrow="Ventures we’re pursuing"
        title="Growth pathways"
        subtitle="Traceability pilots, community networks, and region-specific crop strategy, supported by infrastructure."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ventures.map((v, i) => (
            <Reveal key={v.title} delayMs={i * 70}>
              <SoftCard className="h-full">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
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
              </SoftCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SoftCard size="lg">
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
                <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-white/15 bg-transparent text-white hover:bg-white/5"
                >
                  <Link href="/services">Browse services</Link>
                </Button>
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
