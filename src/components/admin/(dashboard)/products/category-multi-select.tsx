"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Search, X } from "lucide-react";
import { createCategoryAction } from "@/app/lib/actions/dashboard-info/product";

export type CategoryOption = {
  id: string;
  name: string;
};

type Props = {
  options: CategoryOption[];
  value: string[];
  onChange: (next: string[]) => void;
  onOptionsChange?: (next: CategoryOption[]) => void;
};

export default function CategoryMultiSelect({
  options,
  value,
  onChange,
  onOptionsChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;

    return options.filter((option) => option.name.toLowerCase().includes(q));
  }, [options, search]);

  const hasExactMatch = options.some(
    (option) => option.name.toLowerCase() === search.trim().toLowerCase(),
  );

  const toggleValue = (name: string) => {
    if (value.includes(name)) {
      onChange(value.filter((entry) => entry !== name));
      return;
    }

    onChange([...value, name]);
  };

  const removeChip = (name: string) => {
    onChange(value.filter((entry) => entry !== name));
  };

  const handleCreate = async () => {
    const name = search.trim();
    if (!name) return;

    setIsCreating(true);
    try {
      const res = await createCategoryAction(name);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to create category");
      }

      const created = {
        id: res.category.id,
        name: res.category.name,
      };

      if (onOptionsChange) {
        const exists = options.some((o) => o.name === created.name);
        if (!exists) {
          onOptionsChange([...options, created].sort((a, b) => a.name.localeCompare(b.name)));
        }
      }

      if (!value.includes(created.name)) {
        onChange([...value, created.name]);
      }

      setSearch("");
      setOpen(true);
    } catch (error: any) {
      alert(error?.message ?? "Could not create category");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-800">
        Categories
      </label>

      <div className="rounded-xl border border-slate-300 bg-white p-3">
        <div className="mb-3 flex min-h-11 flex-wrap gap-2">
          {value.length > 0 ? (
            value.map((entry) => (
              <span
                key={entry}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800"
              >
                {entry}
                <button
                  type="button"
                  onClick={() => removeChip(entry)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-500">
              No categories selected
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-50"
        >
          {open ? "Close category picker" : "Select categories"}
        </button>

        {open ? (
          <div className="mt-3 rounded-xl border border-slate-300 bg-white p-3 shadow-sm">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-slate-200">
              {filtered.length > 0 ? (
                filtered.map((option) => {
                  const selected = value.includes(option.name);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleValue(option.name)}
                      className="flex w-full items-center justify-between border-b border-slate-200 px-3 py-2 text-left text-sm text-slate-900 last:border-b-0 hover:bg-slate-50"
                    >
                      <span>{option.name}</span>
                      {selected ? <Check className="h-4 w-4" /> : null}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-3 text-sm text-slate-500">
                  No matching categories
                </div>
              )}
            </div>

            {search.trim() && !hasExactMatch ? (
              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 hover:bg-slate-50 disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                {isCreating ? "Creating..." : `Add "${search.trim()}"`}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}