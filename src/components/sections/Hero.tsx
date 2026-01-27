import { Button } from "@/components/ui/button";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="pt-8 pb-16">
      <div className="border border-white/10 bg-black shadow-soft-dark">
        <div className="min-h-[380px] flex items-center justify-center px-6 py-14">
          <div className="max-w-2xl text-center">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                Built to deliver across
                <br />
                <span className="text-primary">essential industries</span>
              </h1>
            </Reveal>

            <Reveal delayMs={90}>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                Thaboliz Enterprise combines engineering, technology, logistics, and impact.
                We build, move, power and grow with discipline and purpose.
              </p>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button className="rounded-none bg-primary text-white hover:opacity-90 transition">
                  Explore
                </Button>

                <Button
                  variant="outline"
                  className="rounded-none border-white/15 text-white hover:bg-white/5 transition"
                >
                  Learn more
                </Button>
              </div>
            </Reveal>

            <Reveal delayMs={220}>
              <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-white/60">
                <span className="border border-white/10 px-3 py-1">Construction</span>
                <span className="border border-white/10 px-3 py-1">Technology</span>
                <span className="border border-white/10 px-3 py-1">Mining</span>
                <span className="border border-white/10 px-3 py-1">Logistics</span>
                <span className="border border-white/10 px-3 py-1">Green Energy</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
