import { supabase } from "@/app/lib/supabaseClient";
import type { CatalogueCategory } from "@/app/lib/definitions/catalogue";

export async function listCatalogueCategories(): Promise<CatalogueCategory[]> {
  const { data, error } = await supabase
    .from("catalogue_categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as CatalogueCategory[];
}

export async function listCatalogueCategoriesPaged(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("catalogue_categories")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (search?.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error, count } = await query.range(from, to);
  if (error) throw error;

  return {
    items: (data ?? []) as CatalogueCategory[],
    total: typeof count === "number" ? count : 0,
  };
}

export async function createCatalogueCategoryAction(payload: {
  name: string;
  slug?: string;
  description?: string;
  sort_order?: number;
}) {
  const res = await fetch("/api/admin/catalogue/categories/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateCatalogueCategoryAction(payload: {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}) {
  const res = await fetch("/api/admin/catalogue/categories/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteCatalogueCategoryAction(id: string) {
  const res = await fetch("/api/admin/catalogue/categories/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function toggleCatalogueCategoryActiveAction(id: string) {
  const res = await fetch("/api/admin/catalogue/categories/toggle-active", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}