"use client";

import { Button } from "@/components/ui/button";
import Reveal from "@/components/motion/Reveal";
import { GitHubGlobe } from "@/components/globe/GitHubGlobe";

export function HeroGlobe() {
  return (
<section className="relative overflow-hidden border-b border-white/10 min-h-[100svh] md:min-h-0">
      {/* Background gradient like GitHub, with red hue */}
      <div className="absolute inset-0 hero-bg" />

      {/* Globe sits BEHIND the text */}
      <div className="pointer-events-auto absolute inset-0">
        {/* Position the globe more to the right like GitHub */}
        <div className="absolute right-[-12%] top-[-8%] h-[120%] w-[120%] md:right-[-20%] md:w-[110%]">
          <GitHubGlobe className="h-full w-full" />
        </div>

        {/* dark overlay to make text readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
      </div>

      {/* Content */}
<div className="relative mx-auto max-w-6xl px-6 py-12 min-h-[100svh] flex items-center md:py-16 md:min-h-0">
        <div className="max-w-2xl">
          <Reveal className="space-y-6">
            <h1 className="text-4xl font-semibold leading-[1.03] tracking-tight sm:text-6xl">
              Built to deliver across{" "}
              <span className="text-primary">essential industries</span>
            </h1>

            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Thaboliz Enterprise unites construction, technology, logistics, energy, mining,
              and sustainable development under one group to solve real problems with
              precision and accountability.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              
              <Button
                variant="outline"
                className="border-white/15 bg-white/5 hover:bg-white/10"
              >
                Learn more
              </Button>
            </div>

            {/* Stats row like GitHub */}
            <div className="grid grid-cols-3 gap-6 pt-8 text-sm">
              <div className="border-t border-white/10 pt-4">
                <div className="text-white text-2xl font-semibold">250+</div>
                <div className="text-white/60">Projects completed</div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-white text-2xl font-semibold">15</div>
                <div className="text-white/60">Years of experience</div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-white text-2xl font-semibold">8</div>
                <div className="text-white/60">Industries served</div>
              </div>
            </div>

            
          </Reveal>
        </div>
      </div>
    </section>
  );
}
