"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ColdRoomCarouselItem = {
  image: string;
  title: string;
  description: string;
};

type Props = {
  items: ColdRoomCarouselItem[];
};

export default function ColdRoomCarousel({ items }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = trackRef.current;
    if (!container) return;

    const amount = Math.min(container.clientWidth * 0.9, 420);
    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-[#c9a86a]/40 hover:bg-white/[0.08]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-[#c9a86a]/40 hover:bg-white/[0.08]"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="min-w-[280px] max-w-[280px] snap-start overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] sm:min-w-[340px] sm:max-w-[340px] lg:min-w-[380px] lg:max-w-[380px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="p-6">
              <h4 className="font-serif text-2xl leading-snug text-white">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}