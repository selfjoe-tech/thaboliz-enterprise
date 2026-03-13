"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  title: string;
  desc: string;
  image?: string; // optional background image
};

function pickGradient(seed: string, index: number) {
  const grads = [
    "bg-gradient-to-br from-indigo-500/40 via-sky-500/25 to-emerald-500/35",
    "bg-gradient-to-br from-fuchsia-500/35 via-rose-500/25 to-amber-500/30",
    "bg-gradient-to-br from-emerald-500/35 via-teal-500/25 to-cyan-500/30",
    "bg-gradient-to-br from-amber-500/35 via-orange-500/25 to-red-500/30",
    "bg-gradient-to-br from-slate-500/35 via-zinc-500/25 to-stone-500/30",
    "bg-gradient-to-br from-violet-500/35 via-indigo-500/25 to-sky-500/30",
  ];
  let h = index;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return grads[h % grads.length];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return isMobile;
}

export default function WhatWeDoCarousel({
  items,
  className,
}: {
  items: Slide[];
  className?: string;
}) {
  const isMobile = useIsMobile();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    skipSnaps: false,
    loop: false,
  });

  const [selected, setSelected] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;

    let raf = 0;
    const onSelect = () => {
      // batch state updates for smoother drag on mobile
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSelected(emblaApi.selectedScrollSnap());
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
      });
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const active = items[Math.min(selected, items.length - 1)];
  const activeGradient = pickGradient(active?.title ?? "active", selected);

  return (
    <div className={cn("relative", className)}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden w-full">
        <div className="absolute inset-0 bg-black/70" />

        {/* hue blob (mobile-safe) */}
        <div
          className={cn(
            "absolute -left-24 top-1/2 -translate-y-1/2 rounded-full opacity-55",
            // ✅ reduce blur on mobile, keep your heavy blur on desktop
            "h-[360px] w-[360px] blur-xl",
            "sm:h-[520px] sm:w-[520px] sm:blur-3xl",
            active?.image ? "" : activeGradient
          )}
          style={
            active?.image
              ? isMobile
                ? {
                    // ✅ MOBILE: no extra filter blur (this was the biggest lag source)
                    backgroundImage: `url(${active.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {
                    // ✅ DESKTOP: keep your original look
                    backgroundImage: `url(${active.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(60px) saturate(160%)",
                  }
              : undefined
          }
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={emblaRef}
          className={cn(
            // ✅ mobile: overflow-hidden reduces repaint region while dragging
            "sm:overflow-visible",
            isMobile ? "overflow-hidden touch-pan-y" : "overflow-visible"
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div
            className={cn(
              "flex will-change-transform transform-gpu [backface-visibility:hidden]",
              "[--slide-gap:22px] [--slide-size:90%]",
              "sm:[--slide-gap:34px] sm:[--slide-size:80%]",
              "lg:[--slide-gap:44px] lg:[--slide-size:70%]",
              "xl:[--slide-gap:54px] xl:[--slide-size:75%]",
              "gap-[var(--slide-gap)]",
              "pl-[calc((100%-var(--slide-size))/2)] pr-[calc((100%-var(--slide-size))/2)]"
            )}
          >
            {items.map((s, i) => {
              const fallback = pickGradient(s.title, i);
              return (
                <div
                  key={`${s.title}-${i}`}
                  className={cn(
                    "flex-[0_0_90%] sm:flex-[0_0_78%] lg:flex-[0_0_66%] xl:flex-[0_0_80%]"
                  )}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white/5">
                    {/* Background image or gradient */}
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.title + "by Thaboliz technologies"}
                        fill
                        priority={i === 0}
                        loading={i === 0 ? "eager" : "lazy"}
                        quality={isMobile ? 55 : 75} // ✅ lighter decode on mobile
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 66vw, 60vw"
                      />
                    ) : (
                      <div className={cn("absolute inset-0", fallback)} />
                    )}

                    {/* Readability overlays (keep) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0" />
                    <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_30%,rgba(255,255,255,0.10),transparent_60%)]" />

                    {/* Desc (top-right) */}
                    <div
                      className={cn(
                        "absolute right-5 top-5 max-w-[55%] text-right",
                        // ✅ remove expensive backdrop blur on mobile
                        "bg-black/20 rounded-md px-2 py-1",
                        "sm:bg-transparent sm:rounded-none sm:px-0 sm:py-0 sm:backdrop-blur"
                      )}
                    >
                      <div className="text-xs font-medium tracking-tight text-white/90 sm:text-xl">
                        {s.desc}
                      </div>
                    </div>

                    {/* Title (bottom-left) */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="font-bold text-xl leading-[0.95] tracking-tight text-white drop-shadow-sm sm:text-6xl md:text-7xl">
                        {s.title}
                      </div>
                      <div className="flex">
                        <div className="mt-6 h-1 w-16 bg-white/85" />
                        <div className="mt-4 h-3 w-16 bg-white/85" />
                        <div className="mt-6 h-1 w-16 bg-white/85" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90",
              // ✅ remove backdrop blur on mobile (keep on desktop if you want)
              "sm:backdrop-blur",
              !canPrev && "opacity-40"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90",
              "sm:backdrop-blur",
              !canNext && "opacity-40"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}