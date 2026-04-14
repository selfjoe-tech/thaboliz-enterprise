"use client";

import React, { useMemo, useState } from "react";
import { Check, Plus, Search, X } from "lucide-react";
import AddCategoryDialog from "@/components/admin/(dashboard)/categories/add-category-dialog";

export type CategoryOption = {
  id: string;
  name: string;
  slug?: string;
};

type Props = {
  options: CategoryOption[];
  value: string[];
  onChange: (next: string[]) => void;
};

export default function CategoryMultiSelect({
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;

    return options.filter((option) =>
      option.name.toLowerCase().includes(q)
    );
  }, [options, search]);

  const hasExactMatch = options.some(
    (option) => option.name.toLowerCase() === search.trim().toLowerCase()
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

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium">Categories</label>

      <div className="rounded-md border border-input bg-background p-2">
        <div className="mb-2 flex flex-wrap gap-2">
          {value.length > 0 ? (
            value.map((entry) => (
              <span
                key={entry}
                className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs"
              >
                {entry}
                <button
                  type="button"
                  onClick={() => removeChip(entry)}
                  className="text-muted-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No categories selected
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full rounded-md border border-border px-3 py-2 text-left text-sm"
        >
          {open ? "Close category picker" : "Select categories"}
        </button>

        {open ? (
          <div className="mt-3 rounded-md border border-border bg-background p-3 shadow-sm">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories"
                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm"
              />
            </div>

            <div className="mt-3 max-h-64 overflow-y-auto rounded-md border border-border">
              {filtered.length > 0 ? (
                filtered.map((option) => {
                  const selected = value.includes(option.name);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleValue(option.name)}
                      className="flex w-full items-center justify-between border-b border-border px-3 py-2 text-left text-sm last:border-b-0 hover:bg-muted/40"
                    >
                      <span>{option.name}</span>
                      {selected ? <Check className="h-4 w-4" /> : null}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-3 text-sm text-muted-foreground">
                  No matching categories
                </div>
              )}
            </div>

            {search.trim() && !hasExactMatch ? (
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                Add "{search.trim()}" as a new category
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <AddCategoryDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        initialName={search.trim()}
        onCreated={(category) => {
          onChange(
            value.includes(category.name) ? value : [...value, category.name]
          );
          setSearch("");
          setShowAdd(false);
        }}
      />
    </div>
  );
}