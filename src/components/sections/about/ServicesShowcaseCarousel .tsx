"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const serviceSlides = [
  {
    title: "Construction",
    href: "/services/construction",
    image: "/companies/construction (1).jpg",
  },
  {
    title: "Logistics",
    href: "/services/logistics",
    image: "/companies/logistics.jpg",
  },
  {
    title: "Technologies",
    href: "/services/technologies",
    image: "/companies/tech.jpg",
  },
  {
    title: "Integrated Farms",
    href: "/services/integrated-farms",
    image: "/illustrations/farm-2.jpg",
  },
];

export default function ServicesShowcaseCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  const activeSlide = serviceSlides[selectedIndex];

  return (
    <section
      id="overview"
      className="overflow-hidden border-y border-white/10 bg-black py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.25fr)] lg:items-start lg:gap-12">
          {/* Left side */}
          <Reveal>
            <div className="flex h-full flex-col justify-between">
              <div>
                <h2 className="max-w-[8ch] text-4xl font-semibold leading-[0.92] tracking-tight text-white sm:text-5xl lg:text-[5rem]">
                  Our Services
                </h2>
              </div>

              <div className="mt-8 max-w-md lg:mt-16">
                <p className="text-base font-medium leading-relaxed text-white/85 sm:text-lg">
                  We combine expertise across construction, logistics,
                  technologies, and agriculture to deliver integrated solutions
                  with clearer accountability and disciplined execution.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right side */}
          <Reveal delayMs={120}>
            <div>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="-ml-4 flex sm:-ml-5 lg:-ml-6">
                  {serviceSlides.map((slide) => (
                    <div
                      key={slide.href}
                      className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_72%] sm:pl-5 lg:flex-[0_0_72%] lg:pl-6"
                    >
                      <Link href={slide.href} className="group block">
                        <div className="relative aspect-[16/9] overflow-hidden bg-[#111]">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 72vw"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={activeSlide.href}
                  className="inline-flex items-center gap-2 text-xl font-semibold uppercase tracking-tight text-white underline underline-offset-4 transition hover:text-white/80 sm:text-2xl"
                >
                  {activeSlide.title}
                  <ArrowUpRight className="h-5 w-5" />
                </Link>

                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(serviceSlides.length).padStart(2, "0")}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous slide"
                      onClick={() => emblaApi?.scrollPrev()}
                      disabled={!canPrev}
                      className="inline-flex h-10 w-10 items-center justify-center text-white transition hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    <button
                      type="button"
                      aria-label="Next slide"
                      onClick={() => emblaApi?.scrollNext()}
                      disabled={!canNext}
                      className="inline-flex h-10 w-10 items-center justify-center text-white transition hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}