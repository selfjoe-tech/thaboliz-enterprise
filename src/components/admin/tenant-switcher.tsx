"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";

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

  const handleSwitch = async (tenantId: string) => {
    if (tenantId === currentTenantId) {
      setOpen(false);
      return;
    }

    setIsSwitching(true);

    try {
      const res = await fetch("/api/tenants/switch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-black hover:bg-white/10"
      >
        <span className="max-w-[220px] truncate">{currentTenantName}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-neutral-900 p-2 shadow-2xl">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/45">
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
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-white hover:bg-white/5 disabled:opacity-60"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{entry.tenant.name}</div>
                    <div className="truncate text-xs text-white/45 capitalize">
                      {entry.role}
                    </div>
                  </div>

                  {active ? <Check className="h-4 w-4 shrink-0" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}