"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Warehouse,
  CheckCircle2,
  GraduationCap,
  HardHat,
} from "lucide-react";

type IconKey =
  | "Building2"
  | "Warehouse"
  | "CheckCircle2"
  | "GraduationCap"
  | "HardHat";

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  Building2,
  Warehouse,
  CheckCircle2,
  GraduationCap,
  HardHat,
};

export type SectorSlide = {
  id: string;
  label: string;
  icon: IconKey;
  bgSrc: string;
  tag?: string;
  cta?: string;
  href?: string;
};

export default function SectorsCarousel({
  eyebrow = "",
  title = "Where we deliver",
  subtitle = "Public infrastructure, industrial facilities, commercial builds, and community developments.",
  slides,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  slides: SectorSlide[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const syncButtons = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    syncButtons();
    emblaApi.on("select", syncButtons);
    emblaApi.on("reInit", syncButtons);
    return () => {
      emblaApi.off("select", syncButtons);
      emblaApi.off("reInit", syncButtons);
    };
  }, [emblaApi, syncButtons]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="grid gap-10">
      {/* header + top-right controls */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
            {eyebrow}
          </div>
          <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="lg:col-span-4 lg:justify-self-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canPrev}
              className={[
                "grid h-10 w-10 place-items-center rounded-full",
                "border border-white/10 bg-white/5 text-white/80",
                "transition hover:bg-white/10",
                !canPrev ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              disabled={!canNext}
              className={[
                "grid h-10 w-10 place-items-center rounded-full",
                "border border-white/10 bg-white/5 text-white/80",
                "transition hover:bg-white/10",
                !canNext ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* embla viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden touch-pan-y"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* container: GPU + will-change improves drag smoothness */}
        <div className="flex gap-5 will-change-transform transform-gpu">
          {slides.map((s, i) => {
            const Icon = ICONS[s.icon];
            const Card = s.href ? "a" : "div";

            return (
              <Card
                key={s.id}
                {...(s.href ? { href: s.href } : {})}
                className={[
                  // keep it lighter on mobile, fancy on desktop
                  "relative overflow-hidden bg-black",
                  "transform-gpu will-change-transform",
                  "min-w-[86%] sm:min-w-[52%] lg:min-w-[36%]",
                  "h-[260px] sm:h-[320px]",
                  // expensive effects only on desktop where hover exists
                  "lg:transition-transform lg:duration-200 lg:hover:-translate-y-[2px]",
                ].join(" ")}
              >
                {/* background image (opt: only first is priority) */}
                <div className="absolute inset-0">
                  <Image
                    src={s.bgSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 36vw, (min-width: 640px) 52vw, 86vw"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    quality={70}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
                </div>

                {/* white square text panel */}
                <div className="relative flex h-full items-center px-5 sm:px-6">
                  <div className="w-full max-w-[460px] bg-white p-20 sm:p-20 lg:shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
                    <div className="inline-flex items-center gap-2">
                      

                      
                    </div>

                    <div className="mt-3 text-lg sm:text-xl font-semibold leading-snug text-black">
                      {s.label}
                    </div>

                    
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}