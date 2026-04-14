import Link from "next/link";
import { notFound } from "next/navigation";
import { OIL_GAS_SUBPAGES } from "../_content";
import { Reveal } from "@/components/oil-gas/Reveal";

export function generateStaticParams() {
  return OIL_GAS_SUBPAGES.map((p) => ({ slug: p.slug }));
}

export default function OilGasSubpage({ params }: { params: { slug: string } }) {
  const page = OIL_GAS_SUBPAGES.find((p) => p.slug === params.slug);
  if (!page) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
        <div className="text-xs tracking-[0.24em] text-white/55 uppercase">{page.kicker}</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-white/70">{page.summary}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <div className="text-sm font-semibold">Operational notes</div>
              <p className="mt-3 text-sm text-white/70">
                This page is designed as a deep dive: you can expand it later with case studies, tender readiness,
                governance artifacts, or partner capability summaries without changing the visual system.
              </p>

              {page.bullets?.length ? (
                <ul className="mt-6 grid gap-2 text-sm text-white/75">
                  {page.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[rgba(200,162,74,.95)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="text-xs tracking-[0.24em] text-white/55 uppercase">Navigate</div>
              <div className="mt-4 grid gap-3">
                <Link href="/services/oil-and-gas" className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:border-white/30 transition">
                  Back to overview <span className="text-white/60">[↩]</span>
                </Link>

                <Link href="/services/oil-and-gas/regulatory" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm hover:border-white/20 transition">
                  Regulatory deep dive <span className="text-white/60">[↗]</span>
                </Link>
                <Link href="/services/oil-and-gas/sustainability" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm hover:border-white/20 transition">
                  ESG approach <span className="text-white/60">[↗]</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}