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
    "overflow-hidden rounded-2xl bg-white/[0.03]",
    className,
  ].join(" ")}
  onMouseEnter={() => setHoverPause(true)}
  onMouseLeave={() => setHoverPause(false)}
>
  <div ref={emblaRef} className="overflow-hidden">
    <div className="flex">
      {slides.map((s) => (
        <div key={s.id} className="min-w-0 flex-[0_0_100%]">
          <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[300px] lg:min-h-[420px]">
            {/* image */}
            <div className="md:col-span-5 lg:col-span-6">
              <div className="relative h-full bg-black">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.10),transparent_55%),linear-gradient(135deg,rgba(16,86,160,.18),rgba(0,0,0,.9))]" />

                <div className="p-3 lg:p-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/30 md:h-[300px] md:aspect-auto lg:h-[420px]">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* text */}
            <div className="md:col-span-7 lg:col-span-6">
              <div className="flex h-full flex-col justify-center p-5 sm:p-7 md:min-h-[300px] lg:min-h-[420px] lg:p-10">
                <h3 className="text-3xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {s.title}
                </h3>

                {s.description ? (
                  <p className="mt-3 max-w-xl text-xl text-white">
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

  <div className="relative z-10 bg-white px-3 py-3 backdrop-blur-sm sm:px-5">
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => setIsPlaying((v) => !v)}
        className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-white/10 bg-black text-white transition hover:bg-white/10"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <div className="hidden flex-1 items-center justify-center gap-1.5 sm:flex">
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

      <div className="flex flex-none items-center gap-2">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          className={[
            "grid h-10 w-10 place-items-center rounded-xl border border-white/10",
            "bg-[#2563eb] text-white transition hover:opacity-90",
            !canPrev ? "cursor-not-allowed opacity-50" : "",
          ].join(" ")}
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="min-w-[52px] text-center text-sm font-semibold text-black">
          {selected + 1}/{slides.length}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          className={[
            "grid h-10 w-10 place-items-center rounded-xl border border-white/10",
            "bg-[#2563eb] text-white transition hover:opacity-90",
            !canNext ? "cursor-not-allowed opacity-50" : "",
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