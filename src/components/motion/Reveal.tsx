// "use client";

// import * as React from "react";
// import { cn } from "@/lib/utils";

// export default function Reveal({
//   children,
//   className,
//   once = true,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   once?: boolean;
// }) {
//   const ref = React.useRef<HTMLDivElement | null>(null);

//   React.useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           el.classList.add("reveal-in");
//           if (once) io.disconnect();
//         }
//       },
//       { threshold: 0.15, rootMargin: "120px 0px" }
//     );

//     io.observe(el);
//     return () => io.disconnect();
//   }, [once]);

//   return (
//     <div ref={ref} className={cn("reveal", className)}>
//       {children}
//     </div>
//   );
// }


"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
};

export default function Reveal({
  children,
  className,
  as: Comp = "div",
  delayMs = 0,
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Uses your .reveal + .reveal-in classes from globals.css
  return (
    <Comp
      ref={(node) => {
        ref.current = node as any;
      }}
      className={cn("reveal", inView && "reveal-in", className)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </Comp>
  );
}

