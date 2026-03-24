"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";

type Item = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  img?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useCanHover() {
  const [canHover, setCanHover] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return canHover;
}

function EnterpriseSupplyCard({ item, index }: { item: Item; index: number }) {
  const [open, setOpen] = React.useState(false);
  const canHover = useCanHover();

  const bgFallback = `/illustrations/gradient-${(index % 4) + 1}.avif`;
  const bgSrc = item.img ?? bgFallback;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "transform-gpu will-change-transform",
        "h-[420px]"
      )}
      onMouseEnter={canHover ? () => setOpen(true) : undefined}
      onMouseLeave={canHover ? () => setOpen(false) : undefined}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={bgSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          quality={70}
          loading={index === 0 ? "eager" : "lazy"}
          priority={index === 0}
          draggable={false}
        />
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-6",
          "lg:bg-black/35 lg:backdrop-blur-sm",
          "transition-[height] duration-200 ease-out",
          open ? "h-[250px]" : "h-[152px]"
        )}
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {item.icon ? (
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  {item.icon}
                </div>
              ) : null}

              <div className="text-2xl font-semibold leading-tight text-white">
                {item.title}
              </div>
            </div>

            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              aria-label={open ? "Collapse" : "Expand"}
              aria-expanded={open}
              className={cn(
                "relative z-10",
                "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                "bg-black text-white",
                "transition hover:bg-white/20"
              )}
            >
              {open ? (
                <ChevronUp className="h-7 w-7" />
              ) : (
                <ChevronDown className="h-7 w-7" />
              )}
            </button>
          </div>

          {open ? (
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {item.desc}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function EnterpriseSupplyCards({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <EnterpriseSupplyCard key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}