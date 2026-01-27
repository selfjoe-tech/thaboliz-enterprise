"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function Reveal({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          if (once) io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "120px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
