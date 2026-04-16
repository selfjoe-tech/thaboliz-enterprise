"use client";

import { useEffect, useRef, useState } from "react";

export default function QuestionTooltip({
  text,
  label,
}: {
  text: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <span className="relative inline-flex">
      <button
        ref={wrapperRef}
        type="button"
        title={text}
        aria-label={label ?? text}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
      >
        ?
      </button>

      {open ? (
        <span className="absolute left-1/2 top-7 z-30 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700 shadow-lg">
          {text}
        </span>
      ) : null}
    </span>
  );
}