"use server";

import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function searchStores(query: string) {
  if (!query) return { success: true, data: [] };

  const { data, error } = await supabaseAdmin
    .from("stores")
    .select("id, name")
    .ilike("name", `%${query}%`)
    .limit(10);

  if (error) return { success: false, error: error.message };

  return { success: true, data };
}

export async function createStore(name: string) {
  const clean = name.trim();

  if (!clean) {
    return { success: false, error: "Store name required" };
  }

  const slug = clean.toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabaseAdmin
    .from("stores")
    .insert({ name: clean, slug })
    .select("id, name")
    .single();

  if (error) {
    // handle duplicate gracefully
    if (error.code === "23505") {
      const { data: existing } = await supabaseAdmin
        .from("stores")
        .select("id, name")
        .eq("name", clean)
        .single();

      return { success: true, data: existing };
    }

    return { success: false, error: error.message };
  }

  return { success: true, data };
}