import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/app/(auth)/actions";

export const dynamic = "force-dynamic";

type ProductRow = {
  id: string;
  title: string;
  price: number | null;
  stock_quantity: number | null;
  stock_status: string;
  status: string;
  purchase_mode: string;
  inventory_mode: string;
};

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membership, error: membershipError } = await supabase
    .from("tenant_memberships")
    .select("tenant_id, role")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (membershipError || !membership) {
    redirect("/login?error=No active company membership found.");
  }

  const { data: tenant } = await supabase
    .from("tenants")
    .select("id, name, slug")
    .eq("id", membership.tenant_id)
    .single();

  const { data: products } = await supabase
    .from("products")
    .select(
      "id, title, price, stock_quantity, stock_status, status, purchase_mode, inventory_mode",
    )
    .eq("tenant_id", membership.tenant_id)
    .order("created_at", { ascending: false });

  const rows = (products ?? []) as ProductRow[];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">
              Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {tenant?.name ?? "Workspace"}
            </h1>
            <p className="mt-2 text-sm text-white/55">
              Role: <span className="capitalize text-white">{membership.role}</span> ·{" "}
              {user.email}
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm font-medium text-white transition hover:border-white/25"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Products</p>
            <p className="mt-2 text-3xl font-semibold">{rows.length}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Workspace slug</p>
            <p className="mt-2 text-2xl font-semibold">{tenant?.slug ?? "-"}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Inventory model</p>
            <p className="mt-2 text-2xl font-semibold">Tenant-owned</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Products</h2>
              <p className="mt-1 text-sm text-white/55">
                Only this tenant’s products are shown here.
              </p>
            </div>

            <a
              href="/admin/products/new"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Add product
            </a>
          </div>

          {rows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-14 text-center">
              <h3 className="text-xl font-medium">No products yet</h3>
              <p className="mt-2 text-sm text-white/55">
                Your workspace is ready. Add products and they will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white/[0.04] text-white/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Purchase</th>
                      <th className="px-4 py-3 font-medium">Inventory</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((product) => (
                      <tr key={product.id} className="border-t border-white/10">
                        <td className="px-4 py-4">{product.title}</td>
                        <td className="px-4 py-4 capitalize">{product.status.replaceAll("_", " ")}</td>
                        <td className="px-4 py-4 capitalize">{product.purchase_mode}</td>
                        <td className="px-4 py-4 capitalize">{product.inventory_mode}</td>
                        <td className="px-4 py-4">
                          {product.inventory_mode === "tracked"
                            ? product.stock_quantity ?? 0
                            : product.stock_status.replaceAll("_", " ")}
                        </td>
                        <td className="px-4 py-4">
                          {product.price != null ? `R${product.price}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}