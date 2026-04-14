import { requireTenantContext } from "@/app/lib/server/current-tenant";

export type ProductListItem = {
  id: string;
  title: string;
  categories: string[];
  categoryName: string;
  price: number | null;
  stockQuantity: number | null;
  stockStatus: "in_stock" | "out_of_stock" | "preorder";
  status: "draft" | "active" | "archived";
  purchaseMode: "internal" | "external";
  inventoryMode: "tracked" | "untracked";
  coverImageUrl: string | null;
  externalUrl: string | null;
  sku: string | null;
};

export type CategoryOption = {
  label: string;
  value: string;
};

export async function listProductsPaged(
  page = 1,
  pageSize = 10,
  search = "",
  category = "all",
  status = "all",
) {
  const { supabase, tenantId } = await requireTenantContext();

  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.max(1, Number(pageSize) || 10);

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  let query = supabase
    .from("products")
    .select(
      `
        id,
        title,
        categories,
        price,
        stock_quantity,
        stock_status,
        status,
        purchase_mode,
        inventory_mode,
        cover_image_url,
        external_url,
        sku
      `,
      { count: "exact" },
    )
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: false });

  if (search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  if (category !== "all") {
    query = query.contains("categories", [category]);
  }

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  const items: ProductListItem[] = (data ?? []).map((row: any) => {
    const categories = Array.isArray(row.categories)
      ? row.categories.filter(Boolean)
      : [];

    return {
      id: row.id,
      title: row.title,
      categories,
      categoryName: categories.length > 0 ? categories.join(", ") : "Uncategorised",
      price: row.price != null ? Number(row.price) : null,
      stockQuantity: row.stock_quantity,
      stockStatus: row.stock_status,
      status: row.status,
      purchaseMode: row.purchase_mode,
      inventoryMode: row.inventory_mode,
      coverImageUrl: row.cover_image_url ?? null,
      externalUrl: row.external_url ?? null,
      sku: row.sku ?? null,
    };
  });

  return {
    items,
    total: count ?? 0,
  };
}

export async function listCategories(): Promise<CategoryOption[]> {
  const { supabase, tenantId } = await requireTenantContext();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("tenant_id", tenantId)
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((item: any) => ({
    label: item.name,
    value: item.name,
  }));
}

export async function createCategoryAction(name: string) {
  const res = await fetch("/api/categories/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  return res.json();
}

export async function deleteProductAction(id: string) {
  const res = await fetch("/api/products/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  return res.json();
}

export async function togglePublishStatus(id: string, publish: boolean) {
  const res = await fetch("/api/products/toggle-publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, publish }),
  });

  return res.json();
}

export async function createProductAction(payload: {
  title: string;
  description?: string | null;
  categories?: string[];
  externalUrl?: string | null;
  price?: number | null;
  compareAtPrice?: number | null;
  inventoryMode?: "tracked" | "untracked";
  stockQuantity?: number | null;
  stockStatus?: "in_stock" | "out_of_stock" | "preorder" | null;
  status?: "draft" | "active" | "archived";
  coverImageUrl?: string | null;
  sku?: string | null;
  purchaseMode?: "internal" | "external";
}) {
  const res = await fetch("/api/products/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function updateProductAction(payload: {
  id: string;
  title: string;
  description?: string | null;
  categories?: string[];
  externalUrl?: string | null;
  price?: number | null;
  compareAtPrice?: number | null;
  inventoryMode?: "tracked" | "untracked";
  stockQuantity?: number | null;
  stockStatus?: "in_stock" | "out_of_stock" | "preorder" | null;
  status?: "draft" | "active" | "archived";
  coverImageUrl?: string | null;
  sku?: string | null;
  purchaseMode?: "internal" | "external";
}) {
  const res = await fetch("/api/products/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function getProductById(id: string) {
  const { supabase, tenantId } = await requireTenantContext();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}