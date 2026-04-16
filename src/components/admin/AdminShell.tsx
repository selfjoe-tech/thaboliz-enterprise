"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import MobileSidebar from "./mobile-sidebar";
import TenantSwitcher from "@/components/admin/tenant-switcher";

type AdminLink = {
  href: string;
  label: string;
  icon: "package" | "grid" | "cart" | "users";
};

type TenantEntry = {
  tenantId: string;
  role: "owner" | "admin" | "manager" | "staff";
  tenant: {
    id: string;
    name: string;
    slug: string;
  };
};

export default function AdminShell({
  children,
  userEmail,
  currentTenantId,
  currentTenantName,
  tenants,
  links,
}: {
  children: React.ReactNode;
  userEmail: string;
  currentTenantId: string;
  currentTenantName: string;
  tenants: TenantEntry[];
  links: AdminLink[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar links={links} />
        </div>

        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          links={links}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-white px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <TenantSwitcher
                currentTenantId={currentTenantId}
                currentTenantName={currentTenantName}
                tenants={tenants}
              />
            </div>

            <div className="hidden text-sm text-neutral-600 md:block">
              {userEmail}
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 text-neutral-900 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}