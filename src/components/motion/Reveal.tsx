"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
};

type ObsEntry = {
  el: Element;
  setInView: React.Dispatch<React.SetStateAction<boolean>>;
};

let sharedIO: IntersectionObserver | null = null;
let sharedReduce = false;
let entries = new Map<Element, React.Dispatch<React.SetStateAction<boolean>>>();

function getSharedIO() {
  if (typeof window === "undefined") return null;

  // respect reduced motion once
  sharedReduce =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (sharedReduce) return null;

  if (sharedIO) return sharedIO;

  sharedIO = new IntersectionObserver(
    (ioEntries) => {
      // batch updates in the same frame
      for (const entry of ioEntries) {
        if (!entry.isIntersecting) continue;
        const setter = entries.get(entry.target);
        if (setter) setter(true);
        entries.delete(entry.target);
        sharedIO?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  return sharedIO;
}

export default function Reveal({
  children,
  className,
  as: Comp = "div",
  delayMs = 0,
}: RevealProps) {
  const [inView, setInView] = React.useState(false);

  const ref = React.useCallback((node: HTMLElement | null) => {
    if (!node) return;

    // reduced motion: reveal immediately, no observers
    const io = getSharedIO();
    if (!io) {
      setInView(true);
      return;
    }

    // register this element
    entries.set(node, setInView);
    io.observe(node);
  }, []);

  return (
    <Comp
      ref={ref as any}
      className={cn("reveal", inView && "reveal-in", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}

