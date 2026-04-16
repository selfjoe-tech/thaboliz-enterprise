"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";

type StoreItem = {
  id: string;
  name: string;
  slug: string;
  website_url: string | null;
};

export default function StoreAutocomplete({
  value,
  onChange,
  disabled,
  label = "Store",
  placeholder = "Search store name...",
}: {
  value: StoreItem | null;
  onChange: (store: StoreItem | null) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(value?.name ?? "");
  const [items, setItems] = useState<StoreItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value?.name ?? "");
  }, [value?.name]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      if (disabled) return;

      const q = query.trim();

      setLoading(true);
      try {
        const url = new URL("/api/stores/search", window.location.origin);
        if (q) url.searchParams.set("q", q);
        url.searchParams.set("limit", "10");

        const res = await fetch(url.toString(), {
          signal: controller.signal,
          cache: "no-store",
        });

        const json = await res.json();

        if (!json?.success) {
          throw new Error(json?.error || "Failed to search stores");
        }

        setItems(json.items ?? []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query, disabled]);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-800">
        {label}
      </label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          disabled={disabled}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-100"
        />

        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setQuery("");
              setOpen(true);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {open ? (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg">
          {loading ? (
            <div className="px-3 py-3 text-sm text-slate-500">Searching...</div>
          ) : items.length > 0 ? (
            <div className="max-h-64 overflow-auto">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChange(item);
                    setQuery(item.name);
                    setOpen(false);
                  }}
                  className="block w-full border-b border-slate-100 px-3 py-3 text-left text-sm text-slate-900 last:border-b-0 hover:bg-slate-50"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.website_url ?? item.slug}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-3 text-sm text-slate-500">No stores found</div>
          )}
        </div>
      ) : null}
    </div>
  );
}