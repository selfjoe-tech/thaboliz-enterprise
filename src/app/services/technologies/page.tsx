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
      title: "Custom web apps and internal portals",
      desc: "Operational tools that match how teams actually work.",
      span: "lg:col-span-2",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Dashboards, reporting, and analytics",
      desc: "Make performance visible with clean metrics and KPIs.",
      span: "lg:col-span-1",
    },
    {
      icon: <Workflow className="h-4 w-4" />,
      title: "Integrations and workflow digitisation",
      desc: "Connect systems, remove manual steps, speed operations.",
      span: "lg:col-span-1",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Cybersecurity hardening and monitoring",
      desc: "Secure baselines, detection, and response-minded upgrades.",
      span: "lg:col-span-2",
    },
    {
      icon: <MonitorCheck className="h-4 w-4" />,
      title: "24/7 surveillance system installation",
      desc: "CCTV setup, monitoring readiness, and operational reliability.",
      span: "lg:col-span-3",
    },
  ];

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
      <section className="relative overflow-hidden pt-14 sm:pt-18">
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_15%_20%,rgba(0,195,255,.35),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(0,82,212,.38),transparent_55%)]" />

        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-white/35" />
            <span className="text-white/80">Technologies</span>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
                  <Cpu className="h-4 w-4 text-white/80" />
                  Technologies
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Build operations you can{" "}
                  <span className="text-brand-gradient">measure, secure, and scale</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We build software, data layers, automation, and secure digital infrastructure that
                  turns day-to-day operations into something you can improve and scale.
                </p>

                

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Contact Us</Link>
                  </Button>
                  
                </div>
              </Reveal>

              {/* Unique “ops tiles” */}
              <Reveal delayMs={140} className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
                    <Layers className="h-4 w-4 text-white/60" />
                    Systems
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">Operational</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
                    <Radar className="h-4 w-4 text-white/60" />
                    Visibility
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">Measurable</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
                    <Sparkles className="h-4 w-4 text-white/60" />
                    Delivery
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">Staged</div>
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <div className="grid gap-4">
                <MediaSlot label="Technology hero image" src="/illustrations/tech-2.png" />
              </div>
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
        subtitle="Build systems that are measurable, secure, and scalable."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6">
            <Reveal>
              <TechCard className="h-full">
                <div id="positioning" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Positioning
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  We build the operational systems behind modern businesses: software, data,
                  automation, and secure digital infrastructure.
                </p>
              </TechCard>
            </Reveal>

            <Reveal delayMs={120}>
              <TechCard className="h-full">
                <div id="vision" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Vision
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  To make operations measurable, secure, and scalable.
                </p>
              </TechCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Technology overview image" src="/illustrations/tech-3.png" />
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE DO (bento grid, unique) */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Practical technology services"
        subtitle="From internal systems to security and monitoring, built for real operations."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {whatWeDo.map((x, i) => (
            <Reveal key={x.title} delayMs={i * 60}>
              <TechCard className={["h-full", "p-5", x.span].join(" ")}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    {x.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/70">{x.desc}</div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="text-xs text-white/70">Specs + scope</div>
                    </div>
                  </div>
                </div>
              </TechCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* COMPLIANCE */}
      <Section
        id="compliance"
        eyebrow="Compliance mindset"
        title="Designed for South Africa’s privacy and cybercrime environment"
        subtitle="POPIA-aligned data handling and incident readiness are treated as part of delivery, not an afterthought."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <TechCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                  <Lock className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">POPIA-aligned and incident-ready</div>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                    <li>• Data minimisation and access control by default</li>
                    <li>• Audit-friendly logging and accountability</li>
                    <li>• Secure handling of credentials and secrets</li>
                    <li>• Monitoring, alerts, and response basics</li>
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Least privilege", "Logging", "Backups", "Change control", "Monitoring"].map((x) => (
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
            </TechCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Security image" src="/illustrations/tech-4.png" />
          </Reveal>
        </div>
      </Section>

      {/* EXPECTATIONS (pipeline feel) */}
      <Section
        id="expect"
        eyebrow="What clients can expect"
        title="Clear delivery, measurable outcomes"
        subtitle="Requirements, staged rollout, performance visibility, and documentation that survives staff turnover."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expectations.map((e, i) => (
            <Reveal key={e.title} delayMs={i * 70}>
              <TechCard className="h-full p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    {e.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{e.title}</div>
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-white/70">
                      {e.bullets.map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TechCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <TechCard size="lg">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Next step
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tell us what you need to measure, automate, or secure.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share the current workflow, systems involved, your goals, and any compliance needs.
                We’ll propose a staged delivery plan with clear milestones and measurable outcomes.
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
            </TechCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
