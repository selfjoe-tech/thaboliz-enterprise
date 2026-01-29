import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Pickaxe,
  ShieldCheck,
  HardHat,
  BarChart3,
  ClipboardList,
  Wrench,
  Truck,
  Recycle,
  FileText,
  Scale,
  MapPinned,
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
    <div className="relative min-h-[420px] overflow-hidden rounded-[10px] ">
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

export default function MiningServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Positioning", "#positioning"],
    ["Vision", "#vision"],
    ["What we do", "#what-we-do"],
    ["Safety", "#safety"],
    ["Permitting", "#permitting"],
  ];

  const whatWeDo = [
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Site establishment and operational support",
      desc: "Set up and support site operations with disciplined controls and visibility.",
    },
    {
      icon: <Wrench className="h-4 w-4" />,
      title: "Maintenance planning and shutdown support",
      desc: "Plan maintenance work and support shutdown windows to reduce downtime surprises.",
    },
    {
      icon: <Truck className="h-4 w-4" />,
      title: "Materials handling support (where contracted)",
      desc: "Support handling and movement processes within defined scope and contract terms.",
    },
    {
      icon: <Recycle className="h-4 w-4" />,
      title: "Rehabilitation and closure-aligned support (where required)",
      desc: "Support rehabilitation activities aligned to closure readiness and site requirements.",
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
            <span className="text-white/80">Mining</span>
          </Reveal>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
                  <Pickaxe className="h-4 w-4 text-white/80" />
                  Mining services
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Responsible mining support with{" "}
                  <span className="text-brand-gradient">safety-led execution</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We support mining operations through disciplined project delivery, safety-led site
                  practices, and operational support that improves uptime and output predictability.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Discuss a mining scope</Link>
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
                  { value: "Safety-led", label: "Controls first, always" },
                  { value: "Uptime focus", label: "Maintenance and shutdown discipline" },
                  { value: "Operational support", label: "Site services where contracted" },
                  { value: "Regulatory-aware", label: "Plan within the permitting landscape" },
                ].map((s) => (
                  <SoftCard key={s.label} size="sm">
                    <div className="text-sm font-semibold text-white">{s.value}</div>
                    <div className="mt-1 text-xs text-white/70">{s.label}</div>
                  </SoftCard>
                ))}
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <MediaSlot label="Mining hero image" src="/illustrations/mining-1.png" />
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
        subtitle="Operational partnership that improves safety, uptime, and predictable output."
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
                  We support responsible mining operations through disciplined project delivery,
                  safety-led site practices, and operational support.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Safety-led", "Disciplined delivery", "Operational support", "Uptime"].map((x) => (
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
                  To be a trusted operational partner that improves safety, uptime, and output
                  predictability.
                </p>
              </SoftCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Mining overview image" src="/illustrations/industry.png" />
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Operational support services"
        subtitle="Site support, maintenance discipline, and rehabilitation-aligned assistance where required."
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

      {/* SAFETY + REGULATORY AWARENESS */}
      <Section
        id="safety"
        eyebrow="Safety and regulatory awareness"
        title="Controls-first mindset on mining sites"
        subtitle="Mining environments require strict controls and a safe working environment duty mindset."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <SoftCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
                  <HardHat className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Mine Health and Safety Act duty mindset
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Mining environments require strict controls and a safety-first approach. We plan
                    work with clear responsibilities, documented checks, and practical site discipline
                    aligned to the Mine Health and Safety Act.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["HSE planning", "Risk controls", "Toolbox talks", "Permit-to-work discipline"].map(
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
            <MediaSlot label="Safety image" src="/illustrations/working.png" />
          </Reveal>
        </div>
      </Section>

      {/* PERMITTING AWARENESS */}
      <Section
        id="permitting"
        eyebrow="Permitting awareness"
        title="Plan within the DMRE rights and permitting landscape"
        subtitle="Project planning respects regulated rights, approvals, and constraints."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <SoftCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center border border-white/10 bg-white/5 text-white/90">
                  <Scale className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    DMRE-administered permitting landscape
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Mining activities operate within a regulated rights and permitting environment
                    administered by the DMRE. We plan delivery with permitting awareness to reduce
                    risk, delays, and scope conflicts.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Rights-aware planning", "Site constraints", "Documentation", "Stakeholder alignment"].map(
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
            <MediaSlot label="Permitting image" src="/illustrations/office.png" />
          </Reveal>
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
                Need disciplined mining support on site or during shutdown windows?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Share the site context, scope, constraints, and desired outcomes. We’ll propose a
                practical approach that strengthens safety, uptime, and predictable delivery.
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
