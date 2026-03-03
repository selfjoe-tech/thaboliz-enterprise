"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { Orbit } from "./Orbit";

export function Hero({
  brand,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: {
  brand: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  const [selected, setSelected] = useState<string>("Downstream");

  return (
    <section className="relative overflow-hidden">
      {/* background: use a video if you want, otherwise this gradient stands in */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 20%, rgba(200,162,74,.18), transparent 60%), radial-gradient(900px 520px at 80% 70%, rgba(255,77,46,.10), transparent 55%), linear-gradient(#070707, #050505)",
        }}
      />
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[rgba(200,162,74,.95)]" />
                {brand}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                {title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
                {subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="#contact"
                  className="rounded-full bg-[rgba(200,162,74,.95)] px-5 py-3 text-sm font-semibold text-black hover:bg-[rgba(200,162,74,.85)] transition"
                >
                  {ctaPrimary}
                </Link>
                <Link
                  href="#services"
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 transition"
                >
                  {ctaSecondary}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <div className="text-xs tracking-[0.22em] text-white/55 uppercase">
                  Selected focus
                </div>
                <div className="mt-2 text-lg font-semibold">{selected}</div>
                <div className="mt-2 text-sm text-white/65">
                  Explore the value-chain node on the right. Each node deep-links into a dedicated subpage for detail.
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <Orbit onSelect={(v) => setSelected(v)} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}