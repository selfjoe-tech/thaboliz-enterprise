"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export type AluminumSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  image: { src: string; alt: string };
};

export default function AluminumCategoryCarousel({
  slides,
  autoPlayMs = 6500,
  className = "",
}: {
  slides: AluminumSlide[];
  autoPlayMs?: number;
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [hoverPause, setHoverPause] = React.useState(false);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi || !isPlaying || hoverPause) return;

    const t = window.setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayMs);

    return () => window.clearInterval(t);
  }, [emblaApi, isPlaying, hoverPause, autoPlayMs]);

  if (!slides?.length) return null;

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
        className,
      ].join(" ")}
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
    >
      {/* viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((s) => (
            <div key={s.id} className="min-w-0 flex-[0_0_100%]">
              {/* ✅ Always a ROW (12-col grid at all sizes) */}
              <div className="grid grid-cols-12 min-h-[240px] sm:min-h-[300px] lg:min-h-[420px]">
                {/* image */}
                <div className="col-span-5 sm:col-span-6">
                  <div className="relative h-full min-h-[240px] sm:min-h-[300px] lg:min-h-[420px] bg-black">
                    {/* Frame + subtle backdrop so contain looks premium */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.10),transparent_55%),linear-gradient(135deg,rgba(16,86,160,.18),rgba(0,0,0,.9))]" />

                    <div className="absolute inset-0 p-2 sm:p-3 lg:p-0">
                      <div className="relative h-full w-full border border-white/10 bg-black/30">
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          fill
                          className={[
                            // ✅ Mobile: fit the whole image (no zoom)
                            "object-contain object-center",
                            // ✅ Desktop: keep your premium full-bleed look
                            "lg:object-cover",
                          ].join(" ")}
                          sizes="(min-width: 1024px) 50vw, 45vw"
                        />

                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* text */}
                <div className="col-span-7 sm:col-span-6">
                  <div className="flex h-full min-h-[240px] flex-col justify-center p-4 sm:p-7 lg:min-h-[420px] lg:p-10">
                    <h3 className="text-xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                      {s.title}
                    </h3>

                    {s.description ? (
                      <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/70 sm:text-base">
                        {s.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ control bar (no wrap on mobile so arrows always show) */}
      <div className="relative z-10 border-t border-white/10 bg-black/35 px-3 py-3 backdrop-blur-sm sm:px-5">
        <div className="flex items-center justify-between gap-3">
          {/* Left: play/pause */}
          <button
            type="button"
            onClick={() => setIsPlaying((v) => !v)}
            className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          {/* Middle: dots (hide on mobile to keep space clean) */}
          <div className="hidden sm:flex flex-1 items-center justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={[
                  "h-2 w-2 rounded-full border border-white/20 transition",
                  i === selected ? "bg-white/80" : "bg-white/10 hover:bg-white/20",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Right: prev / count / next (always visible) */}
          <div className="flex flex-none items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canPrev}
              className={[
                "grid h-10 w-10 place-items-center rounded-xl border border-white/10",
                "bg-[#2563eb] text-white transition hover:opacity-90",
                !canPrev ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="min-w-[52px] text-center text-sm font-semibold text-white/80">
              {selected + 1}/{slides.length}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              disabled={!canNext}
              className={[
                "grid h-10 w-10 place-items-center rounded-xl border border-white/10",
                "bg-[#2563eb] text-white transition hover:opacity-90",
                !canNext ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}