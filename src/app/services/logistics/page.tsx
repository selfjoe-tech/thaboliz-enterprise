import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Warehouse,
  Snowflake,
  Globe2,
  ClipboardCheck,
  ShieldCheck,
  Map,
  Route,
  FileText,
  BadgeCheck,
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
      {/* Blue theme */}
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
    <div className="relative min-h-[420px] overflow-hidden rounded-[10px]">
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
    </div>
  );
}

export default function LogisticsServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Positioning", "#positioning"],
    ["Vision", "#vision"],
    ["What we do", "#what-we-do"],
    ["Compliance", "#compliance"],
    ["Ventures", "#ventures"],
  ];

  const whatWeDo = [
    {
      icon: <Route className="h-4 w-4" />,
      title: "Distribution planning and delivery operations",
      desc: "Predictable routes, delivery discipline, and visible service levels.",
    },
    {
      icon: <Warehouse className="h-4 w-4" />,
      title: "Warehousing support and inventory movement",
      desc: "Practical support for receiving, storage movement, and dispatch readiness.",
    },
    {
      icon: <Snowflake className="h-4 w-4" />,
      title: "Cold-chain support (where applicable)",
      desc: "Temperature-aware movement for agriculture and perishables.",
    },
    {
      icon: <Globe2 className="h-4 w-4" />,
      title: "Cross-border import/export support",
      desc: "Documentation readiness and compliant process support for cross-border movement.",
    },
  ];

  const ventures = [
    {
      icon: <Map className="h-4 w-4" />,
      title: "National distribution hub model",
      desc: "Warehouse + route optimisation to increase predictability and control costs.",
      badge: "Hub + optimisation",
    },
    {
      icon: <Snowflake className="h-4 w-4" />,
      title: "Cold storage micro-hubs near production areas",
      desc: "Shorten time-to-cold and improve quality for perishables.",
      badge: "Cold-chain",
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
            <span className="text-white/80">Logistics</span>
          </Reveal>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
                  <Truck className="h-4 w-4 text-white/80" />
                  Logistics services
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Reliable movement with{" "}
                  <span className="text-brand-gradient">visibility and control</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We move goods reliably and safely with a focus on predictable service levels, cost
                  control, and compliance-aware operations.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Plan a delivery scope</Link>
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

              
            </div>

            <Reveal delayMs={160}>
              <MediaSlot label="Logistics hero image" src="/illustrations/logistics-1.png" />
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* STICKY QUICK LINKS */}

      {/* POSITIONING + VISION */}
      <Section
        eyebrow="Overview"
        title="Positioning and vision"
        subtitle="High-trust logistics for time-sensitive and high-accountability deliveries."
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
                  We move goods reliably, safely, and with visibility. Our focus is predictable service
                  levels, cost control, and compliance-aware operations.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Visibility", "Predictable SLAs", "Cost control", "Compliance-aware"].map((x) => (
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
                  To become a high-trust logistics partner in Southern Africa for time-sensitive and
                  high-accountability deliveries.
                </p>
              </SoftCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Logistics overview image" src="/illustrations/logistics-2.png" />
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Logistics services"
        subtitle="Distribution, warehousing support, cold-chain readiness, and compliant cross-border support."
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

      {/* COMPLIANCE */}
      <Section
        id="compliance"
        eyebrow="Compliance and readiness"
        title="Roadworthy operations and documentation discipline"
        subtitle="We treat compliance as operational readiness: vehicles, processes, and paperwork that stand up to scrutiny."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <SoftCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">Operational readiness</div>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                    <li>• Roadworthiness expectations for relevant vehicle categories and annual testing where applicable</li>
                    <li>• Customs processes and documentation preparedness aligned to SARS import/export frameworks</li>
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Vehicle checks", "Documentation", "Traceability", "Delivery proofs"].map((x) => (
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
            <MediaSlot label="Compliance image" src="/illustrations/logistics-3.png" />
          </Reveal>
        </div>
      </Section>

      {/* VENTURES */}
      <Section
        id="ventures"
        eyebrow="Ventures we’re pursuing"
        title="Growth models"
        subtitle="Infrastructure and optimisation models aimed at higher predictability and better unit economics."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {ventures.map((v, i) => (
            <Reveal key={v.title} delayMs={i * 90}>
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
                Need time-sensitive delivery with accountability and visibility?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share the lanes, volumes, service level expectations, and any cold-chain or cross-border
                constraints. We’ll propose a disciplined plan for predictable delivery.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/#contact">Contact Thaboliz</Link>
                </Button>
                
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
