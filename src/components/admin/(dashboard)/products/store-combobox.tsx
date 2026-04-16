"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Plus } from "lucide-react";

type Store = {
  id: string;
  name: string;
};

export default function StoreCombobox({
  value,
  onChange,
}: {
  value: Store | null;
  onChange: (store: Store) => void;
}) {
  const [query, setQuery] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const [recentStores, setRecentStores] = useState<Store[]>([]);



  const fetchRecent = async () => {
  try {
    const res = await fetch("/api/stores/recent");
    const json = await res.json();
    setStores(json?.data ?? []);
  } catch {
    setStores([]);
  }
};


  useEffect(() => {
  const delay = setTimeout(async () => {
    if (!query.trim()) {
      fetchRecent(); // 👈 key change
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/stores/search?q=${encodeURIComponent(query)}`
      );
      const json = await res.json();
      setStores(json?.data ?? []);
    } catch {
      setStores([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  return () => clearTimeout(delay);
}, [query]);



  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query.trim()) {
        setStores([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `/api/stores/search?q=${encodeURIComponent(query)}`
        );
        const json = await res.json();
        setStores(json?.data ?? []);
      } catch {
        setStores([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const exactMatch = stores.find(
    (s) => s.name.toLowerCase() === query.toLowerCase()
  );

  const handleCreate = async () => {
    if (!query.trim()) return;

    setCreating(true);

    try {
      const res = await fetch("/api/stores/create", {
        method: "POST",
        body: JSON.stringify({ name: query.trim() }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (!json?.success) {
        throw new Error(json?.error || "Failed to create store");
      }

      onChange(json.store);
      setQuery(json.store.name);
      setOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search or create store..."
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
      />

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg">
          {loading && (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </div>
          )}

          {!loading && stores.length > 0 && (
            <div className="max-h-60 overflow-auto">
              {stores.map((store) => (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => {
                    onChange(store);
                    setQuery(store.name);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-slate-100"
                >
                  {store.name}
                  {value?.id === store.id && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* CREATE OPTION */}
          {!loading && query.trim() && !exactMatch && (
            <button
              type="button"
              onClick={handleCreate}
              disabled={creating}
              className="flex w-full items-center gap-2 border-t px-3 py-2 text-sm text-blue-600 hover:bg-slate-50 disabled:opacity-60"
            >
              {creating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Create "{query}"
            </button>
          )}

          {!loading && !query && recentStores.length > 0 && (
            <div>
                <div className="px-3 py-2 text-xs text-slate-500">
                Recent stores
                </div>

                {recentStores.map((store) => (
                <button
                    key={store.id}
                    type="button"
                    onClick={() => {
                    onChange(store);
                    setQuery(store.name);
                    setOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-100"
                >
                    {store.name}
                </button>
                ))}
            </div>
            )}
        </div>
      )}
    </div>
  );
}