import { Container } from "../Container";
import Reveal from "../ui/Reveal";

export function CompanyIdentitySection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(900px_circle_at_20%_20%,rgba(59,130,246,0.16),transparent_60%),radial-gradient(800px_circle_at_85%_30%,rgba(124,58,237,0.12),transparent_55%)]" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">

          
          {/* Left: company identity block */}
          <Reveal from="left">
            <div className="lg:col-span-5">
               <div className="h-[3px] w-10 rounded-full bg-[#3b82f6]" />

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Thaboliz Holdings (Pty) Ltd
              </h2>

              <div className="mt-8 space-y-4 bg-white/[0.04] p-8 backdrop-blur-md">
                <div>
                  <div className="text-xs uppercase tracking-[0.32em] text-white/50">
                    Registration Number
                  </div>
                  <div className="mt-2 text-lg text-white/90">
                    [Insert registration number]
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div>
                  <div className="text-xs uppercase tracking-[0.32em] text-white/50">
                    Location
                  </div>
                  <div className="mt-2 text-lg text-white/90">
                    Johannesburg, South Africa
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div>
                  <div className="text-xs uppercase tracking-[0.32em] text-white/50">
                    Short Description
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    A multi-sector holding company focused on building structured,
                    scalable businesses across selected operating divisions.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: who we are */}
          <Reveal from="right" delay={80}>
            <div className="lg:col-span-7">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white/[0.04] p-8 backdrop-blur-md">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    Who We Are
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Thaboliz is a holding company built to unify and govern multiple
                    business interests under one structured platform.
                  </p>
                </div>

                <div className="bg-white/[0.04] p-8 backdrop-blur-md">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Landmark className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    Multi-Sector Structure
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Our model supports multiple sectors through a disciplined group
                    structure, enabling clear oversight, efficient execution, and
                    long-term value creation.
                  </p>
                </div>

                <div className="md:col-span-2 bg-white/[0.04] p-8 backdrop-blur-md">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    The Problem We Solve
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
                    We bring structure to ambition. Many growing businesses struggle
                    with fragmented operations, weak governance, and unclear strategic
                    direction. Thaboliz exists to organise these moving parts into a
                    coherent platform that can grow with discipline, credibility, and
                    accountability.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}