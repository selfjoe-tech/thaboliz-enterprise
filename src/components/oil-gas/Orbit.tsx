"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Node = {
  label: string;
  sub: string;
};

const nodes: Node[] = [
  { label: "Downstream", sub: "Wholesale refined fuels" },
  { label: "Midstream", sub: "Storage + logistics" },
  { label: "Upstream", sub: "Future exploration" },
  { label: "Energy Services", sub: "Systems + compliance" },
];

export function Orbit({
  onSelect,
}: {
  onSelect?: (label: string) => void;
}) {
  const [active, setActive] = useState(nodes[0].label);

  const rings = useMemo(
    () => [
      { size: 420, speed: 26, opacity: 0.25 },
      { size: 320, speed: 18, opacity: 0.18 },
      { size: 220, speed: 12, opacity: 0.12 },
    ],
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* glow */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(200,162,74,.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,77,46,.22), transparent 55%)",
        }}
      />

      {/* rings */}
      {rings.map((r, idx) => (
        <motion.div
          key={idx}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/15"
          style={{
            width: r.size,
            height: r.size,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
            opacity: r.opacity,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: r.speed, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* center */}
      <div className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
        <div className="text-center">
          <div className="text-xs tracking-[0.22em] text-white/60 uppercase">Value Chain</div>
          <div className="mt-2 text-2xl font-semibold">Oil & Gas</div>
          <div className="mt-1 text-xs text-white/60">Click a node</div>
        </div>
      </div>

      {/* nodes */}
      {nodes.map((n, i) => {
        const angle = (i / nodes.length) * Math.PI * 2;
        const radius = 190;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = active === n.label;

        return (
          <button
            key={n.label}
            onClick={() => {
              setActive(n.label);
              onSelect?.(n.label);
            }}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className={[
                "rounded-2xl border px-4 py-3 text-left backdrop-blur",
                isActive
                  ? "border-[rgba(200,162,74,.55)] bg-[rgba(200,162,74,.10)]"
                  : "border-white/15 bg-white/5 hover:border-white/30",
              ].join(" ")}
            >
              <div className="text-sm font-semibold">{n.label}</div>
              <div className="text-xs text-white/65">{n.sub}</div>
              <div className="mt-2 h-[1px] w-10 bg-white/20" />
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}