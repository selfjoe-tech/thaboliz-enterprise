import { requireTenantContext } from "@/app/lib/server/current-tenant";

export type CatalogProduct = {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  href: string;
  categories: string[];
  purchaseMode: "internal" | "external";
  inventoryMode: "tracked" | "untracked";
  stockQuantity: number | null;
  stockStatus: "in_stock" | "out_of_stock" | "preorder";
  storeName: string;
};

export type CatalogCategory = {
  id: string;
  name: string;
  created_at: string;
};

export async function listCatalogProducts({
  cursor,
  search = "",
  category = "All",
  limit = 12,
}: {
  cursor?: string | null;
  search?: string;
  category?: string;
  limit?: number;
}) {
  const { supabase, tenantId } = await requireTenantContext();

  const pageSize = Math.max(1, Math.min(limit, 50));
  const queryLimit = pageSize + 1;

  let query = supabase
    .from("products")
    .select(
      `
        id,
        title,
        price,
        compare_at_price,
        cover_image_url,
        external_url,
        purchase_mode,
        inventory_mode,
        stock_quantity,
        stock_status,
        categories,
        created_at,
        store:stores(name, slug)
      `,
    )
    .eq("tenant_id", tenantId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(queryLimit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  if (search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  if (category !== "All") {
    query = query.contains("categories", [category]);
  }

  const { data, error } = await query;

  if (error) throw error;

  const rows = data ?? [];
  const hasMore = rows.length > pageSize;
  const sliced = hasMore ? rows.slice(0, pageSize) : rows;

  const items: CatalogProduct[] = sliced.map((row: any) => ({
    id: row.id,
    title: row.title,
    price: Number(row.price ?? 0),
    compareAtPrice: row.compare_at_price ?? null,
    image: row.cover_image_url ?? "/placeholder.png",
    href:
      row.purchase_mode === "external" && row.external_url
        ? row.external_url
        : `/products/${row.id}`,
    categories: Array.isArray(row.categories) ? row.categories : [],
    purchaseMode: row.purchase_mode,
    inventoryMode: row.inventory_mode,
    stockQuantity: row.stock_quantity ?? null,
    stockStatus: row.stock_status ?? "in_stock",
    storeName: row.store?.name ?? null,
  }));

  return {
    items,
    nextCursor: sliced.length ? sliced[sliced.length - 1].created_at : null,
    hasMore,
  };
}

export async function listCatalogCategories({
  cursor,
  limit = 10,
}: {
  cursor?: string | null;
  limit?: number;
}) {
  const { supabase, tenantId } = await requireTenantContext();

  const pageSize = Math.max(1, Math.min(limit, 50));
  const queryLimit = pageSize + 1;

  let query = supabase
    .from("categories")
    .select("id, name, created_at")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false })
    .limit(queryLimit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error) throw error;

  const rows = data ?? [];
  const hasMore = rows.length > pageSize;
  const sliced = hasMore ? rows.slice(0, pageSize) : rows;

  const items: CatalogCategory[] = sliced.map((row: any) => ({
    id: row.id,
    name: row.name,
    created_at: row.created_at,
  }));

  return {
    items,
    nextCursor: sliced.length ? sliced[sliced.length - 1].created_at : null,
    hasMore,
  };
}