"use client";

import * as React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
  logoText?: string; // placeholder like "Webflow"
};

const DATA: Testimonial[] = [
  {
    quote:
      "Thaboliz doesn't just deliver projects. They deliver peace of mind. That matters when you're building something that has to last.",
    name: "James Mthembu",
    role: "Infrastructure director, Public works",
    company: "Webflow",
    logoText: "Webflow",
  },
  {
    quote:
      "They showed up, did the work, and finished when they said they would. In this business, that's everything.",
    name: "Sarah Khumalo",
    role: "Operations manager, Mining sector",
    company: "Webflow",
    logoText: "Webflow",
  },
  {
    quote:
      "Clear communication, strong execution, and a team that takes responsibility end-to-end.",
    name: "Kabelo Dlamini",
    role: "Project lead, Logistics",
    company: "Webflow",
    logoText: "Webflow",
  },
  {
    quote:
      "They combine technical depth with real-world delivery discipline. The results were measurable.",
    name: "Nandi Mokoena",
    role: "Technology partner",
    company: "Webflow",
    logoText: "Webflow",
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1 text-white">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-white text-white" />
      ))}
    </div>
  );
}

function Dots({
  count,
  active,
  onPick,
}: {
  count: number;
  active: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onPick(i)}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition",
            i === active ? "bg-primary" : "bg-white/25 hover:bg-white/40"
          )}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slides = React.useMemo(() => {
    // Pair into 2-up slides (like your wireframe: two testimonials side-by-side)
    const out: Testimonial[][] = [];
    for (let i = 0; i < DATA.length; i += 2) out.push(DATA.slice(i, i + 2));
    return out;
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            What clients say about working with us
          </h2>
          
        </div>

        {/* Carousel */}
        <div className="mt-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="relative"
          >
            <CarouselContent>
              {slides.map((pair, slideIdx) => (
                <CarouselItem key={slideIdx} className="basis-full">
                  <div className="grid gap-8 md:grid-cols-2">
                    {pair.map((t, idx) => (
                      <article
                        key={idx}
                        className={cn(
                          "rounded-none border border-white/10 bg-white/[0.02] p-6",
                          "hover:bg-white/[0.03] transition-colors"
                        )}
                      >
                        <Stars />
                        <div className="mt-5 flex gap-3">
                          <Quote className="mt-0.5 h-5 w-5 text-primary" />
                          <p className="text-sm leading-relaxed text-white/85">
                            “{t.quote}”
                          </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10" />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-white">
                                {t.name}
                              </div>
                              <div className="text-xs text-white/60">
                                {t.role}
                              </div>
                            </div>
                          </div>

                          {/* Logo placeholder */}
                          <div className="flex items-center gap-3 text-white/70">
                            <span className="h-6 w-px bg-white/10 hidden sm:block" />
                            <span className="text-sm font-semibold">
                              {t.logoText ?? t.company ?? "Client"}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Bottom controls row like the wireframe */}
            <div className="mt-6 flex items-center justify-between">
              <Dots
                count={slides.length}
                active={index}
                onPick={(i) => api?.scrollTo(i)}
              />

              <div className="flex items-center gap-2">
                <CarouselPrevious className="static translate-y-0 rounded-full border-white/15 bg-black/40 text-white hover:bg-white/5" />
                <CarouselNext className="static translate-y-0 rounded-full border-white/15 bg-black/40 text-white hover:bg-white/5" />
              </div>
            </div>
          </Carousel>
        </div>

        {/* Optional: small CTA under it (matches your site tone) */}
        
      </div>
    </section>
  );
}
