import { supabase } from "@/app/lib/supabaseClient";
import type { CatalogueCategory, CatalogueProductRow } from "@/app/lib/definitions/catalogue";

export async function listCatalogueProductsPaged(
  page = 1,
  pageSize = 10,
  search?: string,
  categoryName?: string,
  retailer?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("catalogue_products")
    .select(
      `
      *,
      category:catalogue_categories (
        id,
        name,
        slug
      )
    `,
      { count: "exact" }
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (search?.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  if (categoryName && categoryName !== "all") {
    query = query.contains("category_names", [categoryName]);
  }

  if (retailer && retailer !== "all") {
    query = query.eq("retailer", retailer);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  return {
    items: data ?? [],
    total: count ?? 0,
  };
}

function isUsableId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim() !== "" &&
    value !== "undefined" &&
    value !== "null"
  );
}

export async function getCatalogueProductById(id: string) {
  if (!isUsableId(id)) {
    throw new Error(`Invalid product id: ${String(id)}`);
  }

  const { data, error } = await supabase
    .from("catalogue_products")
    .select("*", { count: "exact" })
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function listCatalogueCategoryOptions(): Promise<CatalogueCategory[]> {
  const { data, error } = await supabase
    .from("catalogue_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as CatalogueCategory[];
}

export async function createCatalogueProductAction(payload: any) {
  const res = await fetch("/api/admin/catalogue/products/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateCatalogueProductAction(payload: any) {
  const res = await fetch("/api/admin/catalogue/products/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteCatalogueProductAction(id: string) {
  const res = await fetch("/api/admin/catalogue/products/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function toggleCatalogueProductPublishAction(id: string) {
  const res = await fetch("/api/admin/catalogue/products/toggle-publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}