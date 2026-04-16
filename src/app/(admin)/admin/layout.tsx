import { redirect } from "next/navigation";
import { requireTenantContext } from "@/app/lib/server/current-tenant";
import AdminShell from "@/components/admin/AdminShell";
import {
  Package,
  LayoutGrid,
  ShoppingCart,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

type AdminLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

function getVisibleLinks(role: "owner" | "admin" | "manager" | "staff"): AdminLink[] {
  if (role === "owner" || role === "admin") {
    return [
      { href: "/admin/products", label: "Products", icon: "package" },
      { href: "/admin/categories", label: "Categories", icon: "grid" },
      { href: "/admin/orders", label: "Orders", icon: "cart" },
      { href: "/admin/employees", label: "Employees", icon: "users" },
    ];
  }

  if (role === "manager") {
    return [
      { href: "/admin/products", label: "Products", icon: "package" },
      { href: "/admin/categories", label: "Categories", icon: "grid" },
      { href: "/admin/orders", label: "Orders", icon: "cart" },
    ];
  }

  return [
    { href: "/admin/products", label: "Products", icon: "package" },
    { href: "/admin/orders", label: "Orders", icon: "cart" },
  ];
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { user, role, tenant, tenantId, accessibleTenants } =
      await requireTenantContext();

    return (
      <AdminShell
        userEmail={user.email ?? "Admin"}
        currentTenantId={tenantId}
        currentTenantName={tenant.name}
        tenants={accessibleTenants}
        links={getVisibleLinks(role)}
      >
        {children}
      </AdminShell>
    );
  } catch {
    redirect("/login");
  }
}