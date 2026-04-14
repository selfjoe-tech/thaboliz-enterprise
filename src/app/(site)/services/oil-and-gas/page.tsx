import Link from "next/link";
import { OIL_GAS, OIL_GAS_SUBPAGES } from "./_content";
import { Hero } from "@/components/oil-gas/Hero";
import { Reveal } from "@/components/oil-gas/Reveal";

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs tracking-[0.24em] text-white/55 uppercase">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {sub ? <p className="mt-3 max-w-2xl text-white/70">{sub}</p> : null}
    </div>
  );
}

export default function OilAndGasPage() {
  return (
    <main>
      <Hero
        brand={OIL_GAS.brand}
        title={OIL_GAS.heroTitle}
        subtitle={OIL_GAS.heroSubtitle}
        ctaPrimary={OIL_GAS.ctaPrimary}
        ctaSecondary={OIL_GAS.ctaSecondary}
      />

      {/* Executive summary + UPRDA callout */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionTitle
                  eyebrow="Executive summary"
                  title="Positioned in Sandton. Built for the next energy chapter."
                  sub={OIL_GAS.executiveSummary}
                />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.06}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                  <div className="text-xs tracking-[0.24em] text-white/55 uppercase">Market inflection</div>
                  <div className="mt-3 text-xl font-semibold">UPRDA + Gas-to-Power</div>
                  <p className="mt-3 text-sm text-white/70">
                    South Africa’s evolving upstream framework and gas-to-power momentum create a rare window:
                    bankable projects require compliant operators, credible logistics, and partner-ready execution.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="text-xs text-white/55 uppercase tracking-[0.22em]">Our role</div>
                      <div className="mt-2 text-sm text-white/75">
                        Bridge resource potential and market delivery through governance, distribution capability, and partner-led specialist execution.
                      </div>
                    </div>

                    <Link
                      href="/services/oil-and-gas/regulatory"
                      className="inline-flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:border-white/30 transition"
                    >
                      Explore regulatory readiness
                      <span className="text-white/60">[↗]</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Vision & mission"
              title="Operational integrity, transformation, and sustainable growth."
              sub={OIL_GAS.vision}
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-4">
            {OIL_GAS.mission.map((m, idx) => (
              <Reveal key={m.label} delay={0.03 * idx}>
                <div className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:border-white/20 transition">
                  <div className="text-xs tracking-[0.24em] text-white/55 uppercase">{m.label}</div>
                  <p className="mt-3 text-sm text-white/75">{m.text}</p>
                  <div className="mt-6 h-[1px] w-10 bg-[rgba(200,162,74,.75)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sandton Advantage */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Strategic location"
              title="Sandton advantage"
              sub='Operating from Sandton, often called “Africa’s Richest Square Mile,” positions us at the center of capital, regulation, and execution networks.'
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-4">
                {OIL_GAS.sandtonAdvantages.map((a, idx) => (
                  <Reveal key={a.title} delay={0.04 * idx}>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:border-white/20 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold">{a.title}</div>
                          <p className="mt-2 text-sm text-white/70">{a.text}</p>
                        </div>
                        <div className="text-white/60">[↗]</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-xs tracking-[0.24em] text-white/55 uppercase">Map pulse</div>
                  <div className="mt-3 text-xl font-semibold">Sandton, Johannesburg</div>
                  <p className="mt-2 text-sm text-white/70">
                    A deal flow environment: finance, legal, regulators, and enterprise clients within immediate reach.
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6">
                    {/* abstract “map” */}
                    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-black/10">
                      <div
                        className="absolute inset-0 opacity-70"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 28% 60%, rgba(255,255,255,.14), transparent 45%), radial-gradient(circle at 74% 30%, rgba(200,162,74,.18), transparent 50%)",
                        }}
                      />
                      <div className="absolute left-[58%] top-[46%] h-3 w-3 rounded-full bg-[rgba(200,162,74,.95)] shadow-[0_0_0_10px_rgba(200,162,74,.14)]" />
                      <div className="absolute left-[58%] top-[46%] h-3 w-3 rounded-full bg-[rgba(200,162,74,.95)] animate-ping opacity-30" />
                    </div>

                    <div className="mt-4 text-xs text-white/55">
                      Tip: replace this abstract card with a custom SVG map or a static branded map image when ready.
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Core services"
              title="A multi-faceted approach across the value chain"
              sub="Choose a pillar to go deeper. Each opens a dedicated subpage with more detail."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {OIL_GAS_SUBPAGES.slice(0, 4).map((p, idx) => (
              <Reveal key={p.slug} delay={0.03 * idx}>
                <Link
                  href={`/services/oil-and-gas/${p.slug}`}
                  className="group rounded-3xl border border-white/10 bg-black/30 p-6 hover:border-[rgba(200,162,74,.45)] hover:bg-[rgba(200,162,74,.07)] transition"
                >
                  <div className="text-xs tracking-[0.24em] text-white/55 uppercase">{p.kicker}</div>
                  <div className="mt-3 text-xl font-semibold">{p.title}</div>
                  <p className="mt-3 text-sm text-white/70">{p.summary}</p>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold">
                    <span className="text-[rgba(200,162,74,.95)]">Explore</span>
                    <span className="text-white/55 group-hover:text-white/70">[↗]</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory + Compliance */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Regulatory & compliance"
              title="Built to scale with transparent governance"
              sub="We operate aligned with South Africa’s regulatory environment, and we treat compliance as an asset, not paperwork."
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {OIL_GAS.compliance.map((c, idx) => (
              <Reveal key={c.title} delay={0.03 * idx}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:border-white/20 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold">{c.title}</div>
                      <p className="mt-2 text-sm text-white/70">{c.text}</p>
                      <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                        {c.tag}
                      </div>
                    </div>
                    <div className="text-white/60">[⟂]</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <Reveal delay={0.08}>
              <Link
                href="/services/oil-and-gas/regulatory"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:border-white/30 transition"
              >
                See full regulatory deep dive <span className="text-white/60">[↗]</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ESG */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Sustainability & the energy transition"
              title="A practical ESG posture for real-world energy constraints"
              sub="We prioritize safety, gas-led transition pathways, and community impact while keeping reliability at the center."
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-3">
            {OIL_GAS.esg.map((e, idx) => (
              <Reveal key={e.title} delay={0.03 * idx}>
                <div className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:border-white/20 transition">
                  <div className="text-lg font-semibold">{e.title}</div>
                  <p className="mt-2 text-sm text-white/70">{e.text}</p>
                  <div className="mt-6 h-[1px] w-12 bg-white/15" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Partnership"
              title="Why partner with Thabolize Oil & Gas?"
              sub="A focused operator model that combines local understanding, fast execution, and governance suited for tenders and enterprise work."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {OIL_GAS.whyPartner.map((w, idx) => (
              <Reveal key={w.title} delay={0.03 * idx}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:border-[rgba(200,162,74,.35)] transition">
                  <div className="text-lg font-semibold">{w.title}</div>
                  <p className="mt-2 text-sm text-white/70">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <SectionTitle
              eyebrow="Contact"
              title="Let’s discuss supply, logistics, or partnership pathways."
              sub="Replace placeholders below when your contact details are final."
            />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <div className="grid gap-6 lg:grid-cols-3">
                <div>
                  <div className="text-sm font-semibold">{OIL_GAS.contact.name}</div>
                  <p className="mt-2 text-sm text-white/70">{OIL_GAS.contact.address}</p>
                </div>
                <div>
                  <div className="text-xs tracking-[0.24em] text-white/55 uppercase">Email</div>
                  <p className="mt-2 text-sm text-white/70">{OIL_GAS.contact.email}</p>
                </div>
                <div>
                  <div className="text-xs tracking-[0.24em] text-white/55 uppercase">Phone</div>
                  <p className="mt-2 text-sm text-white/70">{OIL_GAS.contact.phone}</p>

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-between rounded-2xl bg-[rgba(200,162,74,.95)] px-5 py-3 text-sm font-semibold text-black hover:bg-[rgba(200,162,74,.85)] transition"
                    >
                      Open contact form <span>[↗]</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}