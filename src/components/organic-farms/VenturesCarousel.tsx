"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { MoveLeft, MoveRight } from "lucide-react";

type VentureItem = {
  title: string;
  desc: string;
  badge: string;
  icon: React.ReactNode;
  image: string;
};

function VenturesCarousel({ ventures }: { ventures: VentureItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="ventures"
      className="relative overflow-hidden bg-black"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            

            <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ventures We&apos;re Pursuing
            </h2>

            
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white text-black transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black bg-white text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MoveRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {ventures.map((venture) => (
              <div
                key={venture.title}
                className="min-w-0 flex-[0_0_86%] sm:flex-[0_0_58%] lg:flex-[0_0_42%] xl:flex-[0_0_32%]"
              >
                <article className="group relative min-h-[430px] overflow-hidden rounded-2xl border border-black/10 bg-white/[0.03]">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={venture.image}
                      alt={venture.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 58vw, (max-width: 1280px) 42vw, 32vw"
                    />
                  </div>

                  {/* Stacked sheets */}
                  <div className="absolute left-5 top-8 h-[62%] w-[82%] rounded-md bg-white/70 blur-[0.5px] opacity-30" />
                  <div className="absolute left-7 top-10 h-[62%] w-[82%] rounded-md bg-white/85 blur-[0.5px] opacity-60" />

                  {/* White content card */}
                  <div className="absolute left-4 right-4 top-6 z-10 rounded-md bg-[#f4f4f2] p-5 text-black shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:left-6 sm:right-10 sm:top-6 sm:p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
                      {venture.icon}
                    </div>

                    

                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-black">
                      {venture.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-black/75 sm:text-[15px]">
                      {venture.desc}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenturesCarousel;