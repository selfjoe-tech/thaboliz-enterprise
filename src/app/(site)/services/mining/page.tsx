import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Pickaxe,
  HardHat,
  ClipboardList,
  Wrench,
  Truck,
  Recycle,
  Scale,
  ChevronRight,
  AlertTriangle,
  BadgeCheck,
  Activity,
  ArrowRight,
  FileText,
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

/** Mining-specific card: “ore texture + control-room panel” (still blue) */
function MineCard({
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
        "hover:shadow-[0_0_0_1px_rgba(120,190,255,.20),0_18px_60px_rgba(0,0,0,.55)]",
        pad,
        className,
      ].join(" ")}
    >
      {/* Blue base */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] bg-[linear-gradient(90deg,rgba(0,82,212,.38)_0%,rgba(101,199,247,.18)_55%,rgba(0,195,255,.16)_100%)]" />

      {/* “Ore” grain texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.25)_0px,rgba(255,255,255,.25)_1px,transparent_1px,transparent_10px)]" />

      {/* Readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/58 to-black/78" />

      {/* Hover sheen */}
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

        {/* hazard stripe accent */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 opacity-[0.22] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.8)_0px,rgba(255,255,255,.8)_8px,transparent_8px,transparent_18px)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />
      </div>
    </div>
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

function StatusChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
        <span className="text-white/65">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

export default function MiningServicePage() {
  const quickLinks: Array<[string, string]> = [
    ["Overview", "#overview"],
    ["What we do", "#what-we-do"],
    ["Safety", "#safety"],
    ["Permitting", "#permitting"],
  ];

  const whatWeDo = [
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Site establishment and operational support",
      desc: "Set up and support site operations with disciplined controls and visibility.",
      tag: "Site support",
    },
    {
      icon: <Wrench className="h-4 w-4" />,
      title: "Maintenance planning and shutdown support",
      desc: "Plan maintenance work and support shutdown windows to reduce downtime surprises.",
      tag: "Shutdown windows",
    },
    {
      icon: <Truck className="h-4 w-4" />,
      title: "Materials handling support (where contracted)",
      desc: "Support handling and movement processes within defined scope and contract terms.",
      tag: "Handling",
    },
    {
      icon: <Recycle className="h-4 w-4" />,
      title: "Rehabilitation and closure-aligned support (where required)",
      desc: "Support rehabilitation activities aligned to closure readiness and site requirements.",
      tag: "Rehab-ready",
    },
  ];

  return (
    <main className="site-bg">
      {/* HERO (control-room vibe) */}
      <section className="relative overflow-hidden pt-14 sm:pt-18">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_15%_20%,rgba(0,195,255,.30),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(0,82,212,.32),transparent_55%)]" />

        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-white/35" />
            <span className="text-white/80">Mining</span>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70">
                  <Pickaxe className="h-4 w-4 text-white/80" />
                  Mining services
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Site support built around{" "}
                  <span className="text-brand-gradient">safety, uptime, and control</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We support responsible mining operations through disciplined delivery, safety-led
                  site practices, and operational support designed to improve predictability.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-none">
                    <Link href="/#contact">Contact Us</Link>
                  </Button>
                  
                </div>
              </Reveal>

              {/* Shift panel (unique element vs other pages) */}
              <Reveal delayMs={140} className="mt-10">
                <MineCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                        Shift panel
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white">
                        Controls-first site support
                      </div>
                      <div className="mt-1 text-xs text-white/70">
                        Disciplined work packaging, checks, and documentation that hold up on site.
                      </div>
                    </div>

                    
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-4">
                    <StatusChip icon={<HardHat className="h-4 w-4" />} label="Safety" value="Strict" />
                    <StatusChip icon={<Activity className="h-4 w-4" />} label="Uptime" value="Priority" />
                    <StatusChip icon={<FileText className="h-4 w-4" />} label="Docs" value="Ready" />
                    <StatusChip icon={<MapPinned className="h-4 w-4" />} label="Site" value="Aligned" />
                  </div>
                </MineCard>
              </Reveal>
            </div>

            <Reveal delayMs={160}>
              <div className="grid gap-4">
                <MediaSlot label="Mining hero image" src="/illustrations/mining-1.png" />

                <MineCard className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                      <AlertTriangle className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Controls before speed</div>
                      <div className="mt-1 text-xs leading-relaxed text-white/70">
                        We prioritize safe execution and predictable outcomes over rushed activity.
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Risk controls", "Permit-to-work", "Checks", "Clear scope"].map((x) => (
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
                </MineCard>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Separator className="bg-white/10" />
        </div>
      </section>

      {/* STICKY QUICK LINKS */}

      {/* OVERVIEW */}
      <Section
        id="overview"
        eyebrow="Overview"
        title="Positioning and vision"
        subtitle="Operational partnership that improves safety, uptime, and predictable output."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6">
            <Reveal>
              <MineCard className="h-full">
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
              </MineCard>
            </Reveal>

            <Reveal delayMs={120}>
              <MineCard className="h-full">
                <div id="vision" className="scroll-mt-32" />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Vision
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  To be a trusted operational partner that improves safety, uptime, and output
                  predictability.
                </p>
              </MineCard>
            </Reveal>
          </div>

          <Reveal delayMs={160}>
            <MediaSlot label="Mining overview image" src="/illustrations/mining-2.png" />
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE DO (unique: “work packages” layout) */}
      <Section
        id="what-we-do"
        eyebrow="What we do"
        title="Operational support services"
        subtitle="Site support, maintenance discipline, and rehabilitation-aligned assistance where required."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {whatWeDo.map((x, i) => (
            <Reveal key={x.title} delayMs={i * 70}>
              <MineCard className="h-full">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    {x.icon}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-white">{x.title}</div>
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/75">
                        {x.tag}
                      </span>
                    </div>

                    <div className="mt-1 text-xs leading-relaxed text-white/70">{x.desc}</div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <ClipboardList className="h-4 w-4 text-white/50" />
                        Work package + checks
                      </div>
                    </div>
                  </div>
                </div>
              </MineCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SAFETY */}
      <Section
        id="safety"
        eyebrow="Safety and regulatory awareness"
        title="Controls-first mindset on mining sites"
        subtitle="Mining environments require strict controls and a safe working environment duty mindset."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <MineCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                  <HardHat className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">
                    Mine Health and Safety Act duty mindset
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Mining environments require strict controls and a safety-first approach. We plan
                    work with clear responsibilities, documented checks, and practical site discipline.
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
            </MineCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Safety image" src="/illustrations/mining-3.png" />
          </Reveal>
        </div>
      </Section>

      {/* PERMITTING */}
      <Section
        id="permitting"
        eyebrow="Permitting awareness"
        title="Plan within the DMRE rights and permitting landscape"
        subtitle="Project planning respects regulated rights, approvals, and constraints."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <MineCard className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                  <Scale className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">
                    DMRE-administered rights and permitting awareness
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Mining activities operate within a regulated rights and permitting environment.
                    We plan delivery with permitting awareness to reduce delays and scope conflicts.
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
            </MineCard>
          </Reveal>

          <Reveal delayMs={120}>
            <MediaSlot label="Permitting image" src="/illustrations/mining-4.png" />
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <MineCard size="lg">
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
                
              </div>
            </MineCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
