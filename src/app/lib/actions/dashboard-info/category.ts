// app/data/category.ts
import { supabase } from "@/app/lib/supabaseClient";
import type { Category } from "@/app/definitions/category";

/**
 * listCategories — server-side helper returning all categories
 * (used in server components)
 */
export async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listCategories error:", error);
    throw error;
  }
  return (data ?? []) as Category[];
}

/**
 * getCategoryById — server helper
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
  if (error) {
    console.error("getCategoryById error:", error);
    throw error;
  }
  return data ?? null;
}


export async function createNewCategory(payload: { name: string; description?: string; status?: string }) {
  const res = await fetch("/api/categories/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateCategoryAction(id: string, payload: { name: string; description?: string; status?: string }) {
  const res = await fetch("/api/categories/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...payload }),
  });
  return res.json();
}

export async function deleteCategoryAction(id: string) {
  const res = await fetch("/api/categories/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function togglePublishCategoryAction(id: string) {
  const res = await fetch("/api/categories/toggle-publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function listCategoriesPaged(page = 1, pageSize = 10, search?: string) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("categories")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search?.trim()) {
    const pattern = `%${search.trim()}%`;
    query = query.ilike("name", pattern);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("listCategoriesPaged error:", error);
    throw error;
  }

  return {
    items: (data ?? []) as Category[],
    total: typeof count === "number" ? count : data?.length ?? 0,
  };
}