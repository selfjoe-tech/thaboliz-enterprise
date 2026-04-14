import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireTenantContext } from "@/app/lib/server/current-tenant";
import TenantSwitcher from "@/components/admin/tenant-switcher";


export const dynamic = "force-dynamic";

type AdminLink = {
  href: string;
  label: string;
};

function getVisibleLinks(role: "owner" | "admin" | "manager" | "staff"): AdminLink[] {
  if (role === "owner" || role === "admin") {
    return [
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/orders", label: "Orders" },
      { href: "/admin/employees", label: "Employees" },
    ];
  }

  if (role === "manager") {
    return [
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/orders", label: "Orders" },
    ];
  }

  return [
    { href: "/admin/products", label: "Products" },
    { href: "/admin/orders", label: "Orders" },
  ];
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { user, role, tenant, tenantId, accessibleTenants } = await requireTenantContext();

    const visibleLinks = getVisibleLinks(role);

    return (
      <div className="min-h-screen bg-neutral-900 text-white">
        <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
          <AdminSidebar userName={user.email ?? "Admin"} links={visibleLinks} />

          <main className="min-w-0 bg-neutral-100 text-black">
            <div className="border-b border-black/10 bg-white px-6 py-4">
            <TenantSwitcher
              currentTenantId={tenantId}
              currentTenantName={tenant.name}
              tenants={accessibleTenants}
            />
              <div className="text-sm text-neutral-500">Signed in as</div>
              <div className="font-medium">{user.email}</div>
            </div>

            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    );
  } catch {
    redirect("/login");
  }
}