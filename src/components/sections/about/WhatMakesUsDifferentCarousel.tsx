"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Reveal from "@/components/motion/Reveal";
import { Pause, Play } from "lucide-react";


const differentSlides = [
  {
    title: "Integrated capabilities",
    desc: "Deliver more under one umbrella, with fewer handovers, tighter coordination, and clearer ownership across the work.",
    image: "/stock/about/pic-13.avif",
  },
  {
    title: "Technology embedded",
    desc: "Tracking, reporting, monitoring, and analytics are designed into delivery so decisions stay faster and more visible.",
    image: "/stock/about/pic-15.jpg",
  },
  {
    title: "Risk-managed execution",
    desc: "Controls and compliance are built around each sector in a way that protects delivery without slowing momentum.",
    image: "/stock/about/pic-14.jpg",
  },
];

export default function WhatMakesUsDifferentCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  React.useEffect(() => {
  if (!emblaApi || !isPlaying) return;

  const id = window.setInterval(() => {
    emblaApi.scrollNext();
  }, 7500);

  return () => window.clearInterval(id);
}, [emblaApi, isPlaying]);

  const active = differentSlides[selectedIndex];

  return (
    <section
      id="different"
      className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.95fr)_minmax(420px,1fr)] lg:items-start lg:gap-12">
          {/* Left side */}
          <Reveal>
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-5 sm:space-y-6">
                {differentSlides.map((slide, index) => {
                  const isActive = index === selectedIndex;

                  return (
                    <button
                      key={slide.title}
                      type="button"
                        onClick={() => {
                        scrollTo(index);
                        setIsPlaying(false);
                        }}                      
                        className="block text-left"
                    >
                      <div
                        className={[
                          "text-2xl font-semibold leading-[1] tracking-tight transition-colors sm:text-2xl lg:text-3xl",
                          isActive ? "text-white" : "text-white/35 hover:text-white/55",
                        ].join(" ")}
                      >
                        {slide.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 lg:mt-60">
                <p className="max-w-lg text-base leading-relaxed text-white/80 sm:text-md">
                  {active.desc}
                </p>

                <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center gap-2">
                    {differentSlides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => {
                        scrollTo(index);
                        setIsPlaying(false);
                        }}
                        className={[
                        "h-1.5 rounded-full transition-all",
                        index === selectedIndex
                            ? "w-10 bg-white"
                            : "w-2 bg-white/30 hover:bg-white/50",
                        ].join(" ")}
                    />
                    ))}
                </div>

                <button
                    type="button"
                    aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
                >
                    {isPlaying ? (
                    <Pause className="h-4 w-4" />
                    ) : (
                    <Play className="ml-0.5 h-4 w-4" />
                    )}
                </button>
                </div>




              </div>
            </div>
          </Reveal>

          {/* Right side */}
          <Reveal delayMs={120}>
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {differentSlides.map((slide) => (
                  <div
                    key={slide.title}
                    className="min-w-0 flex-[0_0_100%]"
                  >
                    <div className="relative overflow-hidden bg-black">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="block h-auto w-full"
                        />


                        
                        </div>




                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}