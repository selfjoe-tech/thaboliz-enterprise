"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, Plus } from "lucide-react";

type TenantEntry = {
  tenantId: string;
  role: "owner" | "admin" | "manager" | "staff";
  tenant: {
    id: string;
    name: string;
    slug: string;
  };
};

export default function TenantSwitcher({
  currentTenantId,
  currentTenantName,
  tenants,
}: {
  currentTenantId: string;
  currentTenantName: string;
  tenants: TenantEntry[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");

  const handleSwitch = async (tenantId: string) => {
    if (tenantId === currentTenantId) {
      setOpen(false);
      return;
    }

    setIsSwitching(true);

    try {
      const res = await fetch("/api/tenants/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId }),
      });

      const json = await res.json();

      if (!json?.success) {
        throw new Error(json?.error || "Failed to switch company");
      }

      setOpen(false);
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      alert(error?.message || "Failed to switch company");
    } finally {
      setIsSwitching(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch("/api/tenants/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const json = await res.json();

      if (!json?.success) {
        throw new Error(json?.error || "Failed to create organization");
      }

      const switchRes = await fetch("/api/tenants/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId: json.tenantId }),
      });

      const switchJson = await switchRes.json();

      if (!switchJson?.success) {
        throw new Error(switchJson?.error || "Failed to switch organization");
      }

      setName("");
      setShowCreate(false);
      setOpen(false);
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      alert(error?.message || "Failed to create organization");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        <span className="max-w-[220px] truncate">{currentTenantName}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Organizations
          </div>

          <div className="space-y-1">
            {tenants.map((entry) => {
              const active = entry.tenantId === currentTenantId;

              return (
                <button
                  key={entry.tenantId}
                  type="button"
                  disabled={isSwitching}
                  onClick={() => handleSwitch(entry.tenantId)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-slate-900 hover:bg-slate-50 disabled:opacity-60"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{entry.tenant.name}</div>
                    <div className="truncate text-xs text-slate-500 capitalize">
                      {entry.role}
                    </div>
                  </div>

                  {active ? <Check className="h-4 w-4 shrink-0" /> : null}
                </button>
              );
            })}
          </div>

          <div className="mt-2 border-t border-slate-200 pt-2">
            {!showCreate ? (
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm text-slate-900 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Add organization
              </button>
            ) : (
              <form onSubmit={handleCreate} className="space-y-2 px-1 pb-1">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Organization name"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  autoFocus
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={creating}
                    className="h-11 flex-1 rounded-xl bg-slate-900 px-3 text-sm font-medium text-white disabled:opacity-60"
                  >
                    {creating ? "Creating..." : "Create"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="h-11 rounded-xl border border-slate-300 px-3 text-sm text-slate-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}